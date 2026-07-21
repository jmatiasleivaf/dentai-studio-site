import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";

/**
 * Série temporal do canal de recomendação por LLM.
 *
 * Lê o JSONL que o cron alimenta (scripts/canal-snapshot.mjs, uma linha por dia)
 * e serve a série agregada. Mesmo padrão do /api/help-feedback: token por env,
 * 404 se desligado, 403 se token errado. Nada de PII, nada de cookie: os números
 * vêm do log de acesso do nginx, o mesmo regime LGPD-safe do resto.
 *
 * A série existe para comparar contra a linha de base 15-19/07 (SITE-STATUS):
 * 10 hits de retrieval, 659 pageviews, 141 sessões em página profunda. Depois
 * do destravamento do Cloudflare (19/07) a medição de 20/07 já mostrou 32 hits
 * de retrieval; esta rota torna essa comparação contínua em vez de pontual.
 *
 * LIMITAÇÃO HERDADA: enquanto o log_format da VPS não tiver CF-Connecting-IP,
 * `sessoesPiso` é PISO, não medida (o IP é o de borda do Cloudflare). Pageview
 * e contagem de bot não sofrem disso. O campo se chama `sessoesPiso` de propósito.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE = process.env.CANAL_STATS_FILE || "/data/canal.jsonl";
const TOKEN = process.env.CANAL_STATS_TOKEN;

type Snap = {
  capturadoEm: string;
  janela: { de: string | null; ate: string | null };
  retrieval: number;
  index: number;
  training: number;
  pageviews: number;
  sessoesPiso: number;
  referrerLlm: number;
  referrerBuscador: number;
  semReferrer: number;
  diretoFundo: number;
  diretoHome: number;
  bots?: { k: string; v: number }[];
  paginasTop?: { k: string; v: number }[];
};

export async function GET(req: Request) {
  if (!TOKEN) return NextResponse.json({ error: "disabled" }, { status: 404 });
  const url = new URL(req.url);
  if (url.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let raw = "";
  try {
    raw = await readFile(FILE, "utf8");
  } catch {
    return NextResponse.json({ dias: 0, serie: [], baseline: BASELINE });
  }

  const serie: Snap[] = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      serie.push(JSON.parse(line) as Snap);
    } catch {
      /* ignora linha malformada */
    }
  }

  // Totais acumulados, para um número rápido no topo do painel.
  const soma = serie.reduce(
    (acc, s) => ({
      retrieval: acc.retrieval + (s.retrieval ?? 0),
      pageviews: acc.pageviews + (s.pageviews ?? 0),
      referrerLlm: acc.referrerLlm + (s.referrerLlm ?? 0),
      diretoFundo: acc.diretoFundo + (s.diretoFundo ?? 0),
    }),
    { retrieval: 0, pageviews: 0, referrerLlm: 0, diretoFundo: 0 }
  );

  return NextResponse.json({
    dias: serie.length,
    acumulado: soma,
    baseline: BASELINE,
    serie,
  });
}

/** Linha de base 15-19/07/2026, congelada. Toda comparação de ganho é contra ela. */
const BASELINE = {
  janela: "2026-07-15 a 2026-07-19 (4,5 dias)",
  retrieval: 10,
  referrerLlm: 0,
  pageviews: 659,
  semReferrerPct: 68.9,
  diretoFundo: 141,
  nota: "sessão é piso enquanto o log não tiver CF-Connecting-IP",
};
