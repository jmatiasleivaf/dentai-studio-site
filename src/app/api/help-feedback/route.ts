import { NextResponse } from "next/server";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";

/**
 * Métrica de qualidade do Centro de Ayuda: registra o voto "¿fue útil?".
 * 100% anônimo (sem PII, sem cookies) — LGPD-safe.
 *
 * Durabilidade: SEMPRE loga em stdout (`[help-feedback] {...}` — visível em
 * `docker logs dentai-site`, sobrevive a restart). Também tenta gravar num
 * arquivo JSONL; se `/data` for um volume Docker, persiste entre deploys.
 * Leitura agregada: GET com ?token= (env HELP_FEEDBACK_TOKEN).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE = process.env.HELP_FEEDBACK_FILE || "/data/help-feedback.jsonl";
const TOKEN = process.env.HELP_FEEDBACK_TOKEN;

function str(v: unknown, max: number): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= max;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const { slug, category, locale, helpful } = (body ?? {}) as Record<string, unknown>;
  if (!str(slug, 80) || !str(category, 40) || !str(locale, 5) || typeof helpful !== "boolean") {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const entry = { ts: new Date().toISOString(), slug, category, locale, helpful };
  // stdout — durável via logs do container
  console.log("[help-feedback]", JSON.stringify(entry));
  // arquivo — durável se /data for volume; best-effort
  try {
    await mkdir(dirname(FILE), { recursive: true });
    await appendFile(FILE, JSON.stringify(entry) + "\n", "utf8");
  } catch {
    /* volume ausente: fica só o stdout, sem quebrar o voto */
  }

  return new NextResponse(null, { status: 204 });
}

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
    return NextResponse.json({ total: 0, byArticle: {} });
  }

  const byArticle: Record<string, { helpful: number; unhelpful: number }> = {};
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const e = JSON.parse(line) as { slug: string; category: string; helpful: boolean };
      const key = `${e.category}/${e.slug}`;
      byArticle[key] ??= { helpful: 0, unhelpful: 0 };
      if (e.helpful) byArticle[key].helpful++;
      else byArticle[key].unhelpful++;
    } catch {
      /* ignora linha malformada */
    }
  }

  return NextResponse.json({ total: Object.keys(byArticle).length, byArticle });
}
