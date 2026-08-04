import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  postulacionSchema,
  PERFIL_LABEL_ES,
  CLINICAS_LABEL_ES,
  DISPONIBILIDAD_LABEL_ES,
  REGION_LABEL,
} from "@/lib/postulacion-schema";

/**
 * Proxy server-side da postulación de asociado para o CRM.
 *
 * POR QUE NÃO REUSA `/api/lead`: aquela rota existe para o lead de clínica e
 * envia o payload sem intenção, ou seja, o CRM o cria como `CLIENTE`. Um
 * candidato a asociado precisa nascer com `intencao = PARCEIRO`, senão o botão
 * de converter em parceiro nem aparece na ficha e a pessoa entra na esteira de
 * vendas errada. Além disso a atribuição de campos é outra: o "cargo" é o
 * perfil comercial, a "empresa" pode não existir, e a zona de trabalho precisa
 * chegar legível ao operador.
 *
 * O token de ingestão do CRM é server-to-server e não pode ir para o browser,
 * por isso a página posta aqui, na própria origem, e este handler repassa.
 *
 * FALHA VISÍVEL, NUNCA SILENCIOSA: sem env configurada, ou com o CRM fora do
 * ar, esta rota devolve erro e o formulário mostra a falha. Não existe destino
 * secundário. Perder a postulação avisando é melhor que engolir e dizer que
 * deu certo. Também não gravamos o payload em log: são dados de contato
 * identificáveis e o stdout do container não é lugar para PII.
 */

const TIMEOUT_MS = 12_000;

export async function POST(req: Request) {
  const url = process.env.SUPERCLINI_CRM_URL?.replace(/\/$/, "");
  const token = process.env.SUPERCLINI_CRM_INBOUND_TOKEN;
  if (!url || !token) {
    return NextResponse.json({ ok: false, error: "crm inbound disabled" }, { status: 503 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const body = (raw ?? {}) as Record<string, unknown>;

  // Honeypot: bot preenche, humano não. Responde ok e não cria nada. Devolver
  // erro aqui só ensinaria o bot a acertar no próximo envio.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  // Revalidação server-side. O schema do cliente não é garantia de nada.
  const parsed = postulacionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", detail: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }
  const d = parsed.data;

  const perfil = PERFIL_LABEL_ES[d.perfil];
  const region = REGION_LABEL[d.region] ?? d.region;

  // `empresa` é obrigatória no CRM (mín. 2 chars) e é metade da chave de
  // deduplicação. Quem não tem empresa recebe um valor derivado e estável,
  // que ainda informa o operador. Duas pessoas distintas não colapsam num só
  // lead porque a chave inclui o nome e o email.
  const empresaInformada = typeof d.empresa === "string" ? d.empresa.trim() : "";
  const empresa = empresaInformada.length >= 2 ? empresaInformada : `${perfil} · ${region}`;

  // O que o contrato do CRM não tem campo para receber vai como nota inicial,
  // que é o que o operador lê ao abrir a ficha.
  const mensajeLibre = typeof d.mensaje === "string" ? d.mensaje.trim() : "";
  const mensagem = [
    `Postulación al Programa de Asociados (Chile)`,
    `Perfil: ${perfil}`,
    `Zona: ${d.comuna}, ${region}`,
    `Clínicas dentales que visita hoy: ${CLINICAS_LABEL_ES[d.clinicas]}`,
    `Disponibilidad: ${DISPONIBILIDAD_LABEL_ES[d.disponibilidad]}`,
    ...(mensajeLibre ? ["", mensajeLibre] : []),
  ].join("\n");

  // IP real do visitante, para o CRM registrar a origem da submissão.
  const h = await headers();
  const ip =
    h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${url}/api/inbound/site-lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pulsar-inbound-token": token,
        ...(ip ? { "x-forwarded-for": ip } : {}),
      },
      body: JSON.stringify({
        nome: d.nombre,
        empresa,
        email: d.email,
        telefone: d.telefono,
        cargo: perfil,
        mensagem,
        interesse: "asociado_cl",
        // O CRM prefixa "Site · " e trunca em 120. Mantido curto de propósito.
        origemDetalhe: `Asociados CL · ${region}`,
        // Aqui está o ponto inteiro desta rota. Sem isto o lead nasce CLIENTE.
        intencao: "PARCEIRO",
        atribuicao: body.atribuicao,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const json = (await res.json().catch(() => ({}))) as { duplicate?: boolean; error?: string };

    // Duplicado não é erro para quem postulou: a pessoa preencheu de novo e,
    // do ponto de vista dela, deu certo.
    if (res.ok) return NextResponse.json({ ok: true, duplicate: json?.duplicate === true });

    return NextResponse.json(
      { ok: false, error: json?.error ?? "upstream" },
      { status: res.status }
    );
  } catch {
    clearTimeout(timer);
    return NextResponse.json({ ok: false, error: "upstream unreachable" }, { status: 502 });
  }
}
