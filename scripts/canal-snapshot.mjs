/**
 * Snapshot diário do canal LLM: transforma a medição pontual em série temporal.
 *
 * POR QUE EXISTE
 * O `canal-llm.mjs` mede bem, mas é efêmero: roda manual, imprime no terminal,
 * não guarda nada. Rodar amanhã sobre outro dump não se compara com hoje. E o
 * log do nginx retém ~4,5 dias, então sem captura a janela some. Este script
 * corre por cron, agrega a mesma lógica e grava UMA linha por dia num JSONL
 * durável, para comparar contra a linha de base 15-19/07 (SITE-STATUS).
 *
 * O QUE GRAVA (nada novo, nada de dispositivo de ninguém: mesma matéria-prima
 * do canal-llm, o log de acesso já existente). Só os números que interessam
 * para a série, não o relatório inteiro:
 *   retrieval / index / training, pageviews, sessões (piso), referrer de LLM,
 *   entrada direta em página profunda (teto), e o breakdown de bots.
 *
 * USO (na VPS, por cron)
 *   docker logs --since 24h dentai-nginx 2>/dev/null | node scripts/canal-snapshot.mjs
 *   node scripts/canal-snapshot.mjs /caminho/log.txt          (arquivo)
 *   node scripts/canal-snapshot.mjs --stdout < log            (imprime, não grava)
 *
 * O arquivo é o mesmo padrão do help-feedback: JSONL em volume /data, uma
 * linha por execução, append. O endpoint GET /api/canal-stats lê e serve.
 */
import { createInterface } from "node:readline";
import { createReadStream } from "node:fs";
import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { agregar } from "./canal-llm.mjs";

const FILE = process.env.CANAL_STATS_FILE || "/data/canal.jsonl";
const SO_STDOUT = process.argv.includes("--stdout");

// primeiro argumento posicional que não seja uma flag = caminho do log
const CAMINHO = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? null;

async function* linhas() {
  const fonte = CAMINHO ? createReadStream(CAMINHO) : process.stdin;
  const rl = createInterface({ input: fonte, crlfDelay: Infinity });
  for await (const l of rl) yield l;
}

function topN(mapa, n = 8) {
  return [...mapa.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k, v]) => ({ k, v }));
}

async function main() {
  const r = await agregar(linhas());

  const snap = {
    // stamp de captura (dia da execução), não da janela do log
    capturadoEm: new Date().toISOString(),
    janela: { de: r.primeiroTs, ate: r.ultimoTs },
    linhas: r.totalLinhas,
    // o canal chegando: os três tipos de bot
    retrieval: r.totalRetrieval,
    index: r.totalIndex,
    training: r.totalTraining,
    // gente no site
    pageviews: r.pageviews,
    sessoesPiso: r.sessoes.size,
    referrerLlm: r.comReferrerLlm,
    referrerBuscador: r.comReferrerBuscador,
    semReferrer: r.semReferrer,
    // teto do canal não atribuído
    diretoFundo: r.diretoFundo,
    diretoHome: r.diretoHome,
    // breakdown para inspeção
    bots: topN(r.botHits, 12),
    paginasTop: topN(r.paginas, 8),
  };

  const linha = JSON.stringify(snap);

  if (SO_STDOUT) {
    console.log(linha);
    return;
  }

  // stdout sempre (durável via docker logs, sobrevive a volume ausente)
  console.log("[canal-snapshot]", linha);
  try {
    await mkdir(dirname(FILE), { recursive: true });
    await appendFile(FILE, linha + "\n", "utf8");
    console.error(`snapshot gravado em ${FILE}`);
  } catch (e) {
    console.error(`volume ausente (${e.code}); ficou só o stdout`);
  }
}

main().catch((err) => {
  console.error("canal-snapshot falhou:", err.message);
  process.exit(1);
});
