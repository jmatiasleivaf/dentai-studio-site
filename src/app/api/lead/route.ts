import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * Proxy server-side do formulário de contato para o CRM.
 *
 * POR QUE EXISTE: o endpoint de ingestão do CRM
 * (`crm.superclini.com/api/inbound/site-lead`) é server-to-server e autentica
 * por `x-pulsar-inbound-token`. Esse token NÃO pode ir para o browser — se o
 * formulário postasse direto do cliente, o segredo estaria no bundle e
 * qualquer um poderia injetar leads no CRM.
 *
 * Então o navegador posta aqui, na própria origem (sem CORS, sem token
 * exposto), e este handler repassa com o segredo pelo lado do servidor.
 *
 * Sem `SUPERCLINI_CRM_URL` + `SUPERCLINI_CRM_INBOUND_TOKEN` configurados,
 * responde 503 e o formulário cai no destino antigo (o app), que continua
 * funcionando. Nenhum lead se perde durante a transição.
 */

const TIMEOUT_MS = 12_000;

export async function POST(req: Request) {
  const url = process.env.SUPERCLINI_CRM_URL?.replace(/\/$/, "");
  const token = process.env.SUPERCLINI_CRM_INBOUND_TOKEN;
  if (!url || !token) {
    return NextResponse.json({ ok: false, error: "crm inbound disabled" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const s = (v: unknown): string | undefined => {
    const t = typeof v === "string" ? v.trim() : "";
    return t.length ? t : undefined;
  };

  const nome = s(body.nome);
  const email = s(body.email);
  const telefone = s(body.telefone);

  if (!nome || (!email && !telefone)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // `empresa` é obrigatória no CRM (mín. 2 chars) e é metade da chave de
  // deduplicação. O formulário deixa a clínica opcional, então quem não
  // preenche recebe um marcador explícito em vez de string vazia: dois leads
  // sem clínica não podem colapsar num só por acidente.
  const clinica = s(body.clinica);
  const empresa = clinica && clinica.length >= 2 ? clinica : `${nome} (sin clínica informada)`;

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
        nome,
        empresa,
        email,
        telefone,
        cargo: s(body.cargo),
        mensagem: s(body.mensagem),
        interesse: s(body.interesse),
        origemDetalhe: s(body.pais),
        // O envelope de atribuição segue como veio do cliente. O CRM é quem
        // deriva a origem a partir dele (click id vence utm_source), para a
        // classificação não depender do que o site declara.
        atribuicao: body.atribuicao,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const json = await res.json().catch(() => ({}));
    // Duplicado NÃO é erro para o visitante: ele preencheu de novo, e do ponto
    // de vista dele deu certo.
    if (res.ok) return NextResponse.json({ ok: true, duplicate: json?.duplicate === true });

    return NextResponse.json({ ok: false, error: json?.error ?? "upstream" }, { status: res.status });
  } catch {
    clearTimeout(timer);
    return NextResponse.json({ ok: false, error: "upstream unreachable" }, { status: 502 });
  }
}
