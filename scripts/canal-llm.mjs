#!/usr/bin/env node
/**
 * Relatório do canal de aquisição por recomendação de LLM.
 *
 * POR QUE EXISTE
 * Em 19/07/2026 descobrimos que 3 das 6 pessoas que viraram lead chegaram com
 * `utmSource=chatgpt.com`. O canal nunca foi medido. Este script é o
 * instrumento de medição, e ele existe porque as alternativas não servem:
 * o site não tem (nem vai ter) analytics de cliente sem consentimento, e o
 * referrer praticamente não chega.
 *
 * O QUE ELE LÊ
 * O log de acesso do nginx, que já existe e não grava nada no dispositivo de
 * ninguém. Nenhum cookie, nenhum identificador, nenhuma coleta nova.
 *
 * LIMITAÇÃO QUE VOCÊ PRECISA SABER ANTES DE ACREDITAR NO NÚMERO
 * O tráfego passa por Cloudflare, então `$remote_addr` é o IP de BORDA do
 * Cloudflare, não o do visitante. Agrupar sessão por ele funde visitantes
 * distintos que saíram pelo mesmo nó. Enquanto o `log_format` da VPS não
 * incluir `CF-Connecting-IP`, toda contagem de SESSÃO aqui é um PISO, não um
 * número exato. Contagem de PAGEVIEW e de bot não sofre disso.
 *
 * USO
 *   # na VPS, com o log já extraído para um arquivo
 *   node scripts/canal-llm.mjs /tmp/ng.log
 *   # ou por stdin
 *   docker logs dentai-nginx 2>/dev/null | node scripts/canal-llm.mjs
 */

import { createInterface } from "node:readline";
import { createReadStream } from "node:fs";

/**
 * Bots que alimentam recomendação de LLM, separados por FUNÇÃO, porque a
 * distinção decide o que fazer com cada um:
 *
 *  - retrieval: busca a página AO VIVO durante a conversa de alguém. É o canal
 *    de recomendação acontecendo em tempo real. Cada hit aqui é uma pessoa
 *    perguntando algo a um modelo que decidiu ler o nosso site para responder.
 *  - index: monta o índice de busca que o modelo consulta. Efeito indireto,
 *    prazo médio.
 *  - training: coleta corpus para treino. Efeito difuso, prazo longo.
 *
 * Bloquear `training` não fecha o canal. Bloquear `retrieval` fecha.
 */
const LLM_BOTS = [
  { re: /ChatGPT-User/i, nome: "ChatGPT-User", tipo: "retrieval", dono: "OpenAI" },
  { re: /OAI-SearchBot/i, nome: "OAI-SearchBot", tipo: "index", dono: "OpenAI" },
  { re: /GPTBot/i, nome: "GPTBot", tipo: "training", dono: "OpenAI" },
  { re: /Claude-User/i, nome: "Claude-User", tipo: "retrieval", dono: "Anthropic" },
  { re: /Claude-SearchBot/i, nome: "Claude-SearchBot", tipo: "index", dono: "Anthropic" },
  { re: /ClaudeBot/i, nome: "ClaudeBot", tipo: "training", dono: "Anthropic" },
  { re: /Perplexity-User/i, nome: "Perplexity-User", tipo: "retrieval", dono: "Perplexity" },
  { re: /PerplexityBot/i, nome: "PerplexityBot", tipo: "index", dono: "Perplexity" },
  { re: /Google-Extended/i, nome: "Google-Extended", tipo: "training", dono: "Google" },
  { re: /Bytespider/i, nome: "Bytespider", tipo: "training", dono: "ByteDance" },
  { re: /meta-externalagent/i, nome: "meta-externalagent", tipo: "training", dono: "Meta" },
  { re: /Amazonbot/i, nome: "Amazonbot", tipo: "training", dono: "Amazon" },
  { re: /Applebot-Extended/i, nome: "Applebot-Extended", tipo: "training", dono: "Apple" },
  { re: /CCBot/i, nome: "CCBot", tipo: "training", dono: "Common Crawl" },
  { re: /DuckAssistBot/i, nome: "DuckAssistBot", tipo: "index", dono: "DuckDuckGo" },
  { re: /MistralAI/i, nome: "MistralAI", tipo: "training", dono: "Mistral" },
  { re: /YouBot/i, nome: "YouBot", tipo: "index", dono: "You.com" },
  { re: /cohere-ai/i, nome: "cohere-ai", tipo: "training", dono: "Cohere" },
];

/** Domínios de LLM que aparecem como referrer quando ele sobrevive. */
const LLM_REFERRER = /chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google|copilot\.microsoft|you\.com|poe\.com/i;

/** Buscadores clássicos, para servir de baseline de comparação. */
const BUSCADOR_REFERRER = /google\.|bing\.com|duckduckgo\.com|yahoo\.|yandex\./i;

/** Tudo que não é gente. Mantido largo de propósito: contar bot como humano
 *  infla o canal e é exatamente o erro que este relatório precisa não cometer. */
const BOT_GENERICO = /bot|crawler|spider|slurp|preview|monitor|lighthouse|headless|curl|wget|python-requests|axios|go-http|java\/|scrapy|semrush|ahrefs|mj12|dotbot|petalbot/i;

const ASSET = /\.(js|css|png|jpe?g|webp|avif|svg|ico|woff2?|ttf|mp4|webm|map|json|xml|txt)$/i;

/**
 * Dois formatos convivem, porque o log muda de formato no meio da série e
 * jogar fora o histórico anterior seria perder a linha de base:
 *
 *  - `combined`: o padrão do nginx. O primeiro campo é o IP, e sob Cloudflare
 *    esse IP é o da BORDA, não o do visitante. Não tem o host, então site, app
 *    e CRM ficam misturados.
 *  - `canal`: o formato novo. Primeiro campo é o `$host` (separa os três) e o
 *    segundo é o IP do visitante já truncado em /24.
 *
 * A distinção entre os dois é posicional: `combined` tem `- -` (ident e user
 * do protocolo, sempre vazios) antes do colchete da data; `canal` não tem.
 */
const COMBINED =
  /^(\S+) \S+ \S+ \[([^\]]+)\] "(\w+) (\S+) [^"]*" (\d{3}) (\d+|-) "([^"]*)" "([^"]*)"/;
const CANAL =
  /^(\S+) (\S+) \[([^\]]+)\] "(\w+) (\S+) [^"]*" (\d{3}) (\d+|-) "([^"]*)" "([^"]*)"/;

function parseLinha(raw) {
  // O log chega ou cru, ou embrulhado no JSON do docker (`{"log":"..."}`).
  let linha = raw;
  if (raw.startsWith("{")) {
    try {
      linha = JSON.parse(raw).log ?? "";
    } catch {
      return null;
    }
  }

  const mc = COMBINED.exec(linha);
  if (mc) {
    const [, ip, ts, metodo, alvo, status, , referrer, ua] = mc;
    return montar({ host: null, ip, ts, metodo, alvo, status, referrer, ua });
  }

  const mn = CANAL.exec(linha);
  if (mn) {
    const [, host, ip, ts, metodo, alvo, status, , referrer, ua] = mn;
    return montar({ host, ip, ts, metodo, alvo, status, referrer, ua });
  }

  return null;
}

function montar({ host, ip, ts, metodo, alvo, status, referrer, ua }) {
  return {
    host,
    ip,
    ts,
    metodo,
    caminho: alvo.split("?")[0],
    query: alvo.includes("?") ? alvo.slice(alvo.indexOf("?") + 1) : "",
    status: Number(status),
    referrer: referrer === "-" ? "" : referrer,
    ua,
  };
}

/** Só o site institucional. O app e o CRM entopem o mesmo log e não são o canal. */
const ROTA_SITE = /^\/(es|pt|en)(\/|$)/;
const HOST_SITE = /^(www\.)?superclini\.com$/i;

/**
 * Com o formato `canal` dá para filtrar pelo host, que é exato. Com o
 * `combined` antigo o host não existe na linha, e sobra só o prefixo de
 * idioma como aproximação. Por isso a função aceita host nulo: é a série
 * histórica, e descartá-la custaria a linha de base.
 */
function ehPaginaDoSite(caminho, host) {
  if (host && !HOST_SITE.test(host)) return false;
  if (!ROTA_SITE.test(caminho)) return false;
  if (ASSET.test(caminho)) return false;
  if (caminho.startsWith("/_next")) return false;
  return true;
}

/** Home de qualquer idioma. Entrar aqui é ambíguo; entrar fundo, não. */
const HOME = /^\/(es|pt|en)$/;

function identificarBot(ua) {
  for (const b of LLM_BOTS) if (b.re.test(ua)) return b;
  return null;
}

async function* linhas(caminhoArquivo) {
  const entrada = caminhoArquivo ? createReadStream(caminhoArquivo) : process.stdin;
  const rl = createInterface({ input: entrada, crlfDelay: Infinity });
  for await (const l of rl) if (l.trim()) yield l;
}

function pct(parte, total) {
  if (!total) return "0,0%";
  return `${((parte / total) * 100).toFixed(1).replace(".", ",")}%`;
}

function tabela(titulo, mapa, limite = 15) {
  const linhasOrdenadas = [...mapa.entries()].sort((a, b) => b[1] - a[1]).slice(0, limite);
  console.log(`\n${titulo}`);
  if (linhasOrdenadas.length === 0) {
    console.log("  (nenhum)");
    return;
  }
  const larg = Math.max(...linhasOrdenadas.map(([k]) => k.length));
  for (const [k, v] of linhasOrdenadas) {
    console.log(`  ${String(v).padStart(6)}  ${k.padEnd(larg)}`);
  }
}

async function main() {
  const arquivo = process.argv[2];

  let totalLinhas = 0;
  let naoParseadas = 0;
  let primeiroTs = null;
  let ultimoTs = null;

  // Bots de LLM
  const botHits = new Map();
  const botPaginas = new Map();
  const botPorTipo = new Map();
  const baselineBuscador = new Map();

  // Humanos no site
  let pageviews = 0;
  const paginas = new Map();
  const referrersExternos = new Map();
  let comReferrerLlm = 0;
  let comReferrerBuscador = 0;
  let semReferrer = 0;

  // Sessões (piso, ver aviso do topo)
  const sessoes = new Map();

  for await (const raw of linhas(arquivo)) {
    totalLinhas++;
    const e = parseLinha(raw);
    if (!e) {
      naoParseadas++;
      continue;
    }
    if (!primeiroTs) primeiroTs = e.ts;
    ultimoTs = e.ts;

    // ── Trilha 1: bots de LLM (qualquer rota, inclusive robots/sitemap) ──
    const bot = identificarBot(e.ua);
    if (bot) {
      const chave = `${bot.nome} (${bot.tipo})`;
      botHits.set(chave, (botHits.get(chave) ?? 0) + 1);
      botPorTipo.set(bot.tipo, (botPorTipo.get(bot.tipo) ?? 0) + 1);
      if (ehPaginaDoSite(e.caminho, e.host)) {
        botPaginas.set(`${bot.nome} ${e.caminho}`, (botPaginas.get(`${bot.nome} ${e.caminho}`) ?? 0) + 1);
      }
      continue;
    }

    if (/googlebot|bingbot/i.test(e.ua)) {
      const q = /googlebot/i.test(e.ua) ? "Googlebot" : "bingbot";
      baselineBuscador.set(q, (baselineBuscador.get(q) ?? 0) + 1);
      continue;
    }

    // ── Trilha 2: gente no site ──
    if (BOT_GENERICO.test(e.ua)) continue;
    if (!ehPaginaDoSite(e.caminho, e.host)) continue;
    if (e.status !== 200) continue;

    pageviews++;
    paginas.set(e.caminho, (paginas.get(e.caminho) ?? 0) + 1);

    const refExterno = e.referrer && !/superclini\.com/i.test(e.referrer);
    if (!e.referrer) semReferrer++;
    else if (refExterno) {
      try {
        referrersExternos.set(new URL(e.referrer).hostname, (referrersExternos.get(new URL(e.referrer).hostname) ?? 0) + 1);
      } catch {
        referrersExternos.set(e.referrer.slice(0, 60), (referrersExternos.get(e.referrer.slice(0, 60)) ?? 0) + 1);
      }
      if (LLM_REFERRER.test(e.referrer)) comReferrerLlm++;
      else if (BUSCADOR_REFERRER.test(e.referrer)) comReferrerBuscador++;
    }

    // UTM na query também conta como sinal direto, e é o que salvou os 3 leads.
    if (/utm_source=(chatgpt|perplexity|claude|copilot|gemini)/i.test(e.query)) {
      comReferrerLlm++;
    }

    const chaveSessao = `${e.ip}|${e.ua.slice(0, 80)}`;
    if (!sessoes.has(chaveSessao)) {
      sessoes.set(chaveSessao, { entrada: e.caminho, referrer: e.referrer, query: e.query });
    }
  }

  // ── Sinal indireto: entrada direta em página profunda ──
  // Ninguém digita /es/ayuda/imagenes-ia/visor-dicom-3d de cabeça. Sem
  // referrer e entrando fundo, alguém passou o link. Pode ter sido um LLM,
  // pode ter sido WhatsApp. É teto, não medida.
  let diretoFundo = 0;
  let diretoHome = 0;
  const paginasFundo = new Map();
  for (const s of sessoes.values()) {
    const externo = s.referrer && !/superclini\.com/i.test(s.referrer);
    if (externo) continue;
    if (s.referrer) continue;
    if (HOME.test(s.entrada)) diretoHome++;
    else {
      diretoFundo++;
      paginasFundo.set(s.entrada, (paginasFundo.get(s.entrada) ?? 0) + 1);
    }
  }

  const totalRetrieval = botPorTipo.get("retrieval") ?? 0;
  const totalIndex = botPorTipo.get("index") ?? 0;
  const totalTraining = botPorTipo.get("training") ?? 0;

  console.log("=".repeat(64));
  console.log("CANAL LLM — RELATÓRIO DE MEDIÇÃO");
  console.log("=".repeat(64));
  console.log(`Janela          : ${primeiroTs ?? "?"}  ate  ${ultimoTs ?? "?"}`);
  console.log(`Linhas lidas    : ${totalLinhas} (${naoParseadas} fora do formato combined)`);

  console.log("\n" + "-".repeat(64));
  console.log("1. BOTS DE LLM — o canal chegando ate nos");
  console.log("-".repeat(64));
  console.log(`Recuperacao ao vivo (alguem perguntou agora) : ${totalRetrieval}`);
  console.log(`Indexacao de busca                          : ${totalIndex}`);
  console.log(`Coleta para treino                          : ${totalTraining}`);
  tabela("Hits por bot:", botHits);
  tabela("Paginas que os bots de LLM realmente leram:", botPaginas, 20);
  tabela("Baseline buscador classico:", baselineBuscador);
  if (totalIndex > 0 && botPaginas.size === 0) {
    console.log(
      "\n  ATENCAO: bot de indexacao apareceu mas nao leu pagina nenhuma.\n" +
        "  Sinal tipico de bloqueio em robots.txt ou no WAF. Conferir o\n" +
        "  robots.txt SERVIDO (nao o do repo): curl -s https://superclini.com/robots.txt"
    );
  }

  console.log("\n" + "-".repeat(64));
  console.log("2. GENTE NO SITE");
  console.log("-".repeat(64));
  console.log(`Pageviews              : ${pageviews}`);
  console.log(`Sessoes (PISO)         : ${sessoes.size}`);
  console.log(`  sem referrer nenhum  : ${semReferrer} (${pct(semReferrer, pageviews)} dos pageviews)`);
  console.log(`  referrer de LLM      : ${comReferrerLlm}`);
  console.log(`  referrer de buscador : ${comReferrerBuscador}`);
  tabela("Referrers externos:", referrersExternos);
  tabela("Paginas mais vistas:", paginas);

  console.log("\n" + "-".repeat(64));
  console.log("3. SINAL INDIRETO — entrada direta em pagina profunda");
  console.log("-".repeat(64));
  console.log(`Entrou direto na home          : ${diretoHome}`);
  console.log(`Entrou direto em pagina profunda: ${diretoFundo}  <- teto do canal nao atribuido`);
  console.log(
    `\n  Leia assim: ${diretoFundo} e o TETO, nao a medida. Sem referrer tambem\n` +
      "  chegam WhatsApp, bookmark, aba anonima e app nativo. O piso e zero.\n" +
      "  O que o numero prova e quanta entrada esta inatribuida hoje."
  );
  tabela("Paginas de entrada profunda:", paginasFundo, 20);

  console.log("\n" + "=".repeat(64));
  console.log("VEREDITO");
  console.log("=".repeat(64));
  if (totalRetrieval > 0) {
    console.log(`Recuperacao ao vivo CONFIRMADA: ${totalRetrieval} hits. Modelos estao lendo`);
    console.log("o site durante conversas de usuarios. O canal esta ativo.");
  } else {
    console.log("Nenhuma recuperacao ao vivo na janela. Ou o trafego e baixo demais,");
    console.log("ou os bots de retrieval estao bloqueados. Conferir robots.txt servido.");
  }
  if (comReferrerLlm === 0 && pageviews > 0) {
    console.log("\nZero referrer de LLM preservado. A medicao por referrer esta cega:");
    console.log("o tamanho do canal NAO pode ser afirmado a partir dela.");
  }
  console.log("");
}

main().catch((err) => {
  console.error("Falhou:", err.message);
  process.exit(1);
});
