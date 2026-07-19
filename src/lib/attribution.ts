/**
 * Envelope de atribuição do primeiro toque.
 *
 * Responde "que campanha gerou esta clínica pagante" meses depois da visita.
 * Sem isso, Meta e Google só conseguem otimizar por formulário preenchido, que
 * traz volume ruim; com isso passam a otimizar por receita.
 *
 * ARQUITETURA EM CAMADAS — cada uma com um regime legal diferente:
 *
 *  Camada 0 (memória): capturado da URL no mount e carregado pela navegação
 *    interna em memória React. Morre ao fechar a aba. NÃO é armazenamento em
 *    equipamento terminal, então fica fora do art. 5(3) da ePrivacy e não
 *    exige consentimento. Já resolve a jornada de sessão única, que é a
 *    maioria esmagadora do tráfego pago mobile em LATAM.
 *
 *  Camada 1 (server): o middleware injeta os valores da URL como props. Mesmo
 *    regime da Camada 0 — vinculado ao ciclo da requisição, nada persiste.
 *
 *  Camada 2 (cookie `_sc_attr`, 90 dias): só existe com consentimento de
 *    marketing explícito. É o que permite atribuir uma conversão que acontece
 *    dias depois do clique no anúncio.
 *
 * O envelope é FIRST-TOUCH: o primeiro toque vence. Se a pessoa chega por um
 * anúncio do Google e volta depois por busca orgânica, o crédito é do anúncio.
 * Sobrescrever com o último toque apagaria a origem que de fato pagou.
 */

import { ATTRIBUTION_COOKIE, type ConsentStatus, hasMarketingConsent } from "./consent";

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  /** Click id do Google Ads. Identificador de rastreio: só com consentimento. */
  gclid?: string;
  /** Click id do Meta. Identificador de rastreio: só com consentimento. */
  fbclid?: string;
  landingPath?: string;
  referrer?: string;
  /** Código do parceiro que indicou. Atribuição de comissão. */
  canalRef?: string;
  firstSeenAt?: string;
};

const MAX_LEN = 200;
const ATTR_MAX_AGE = 60 * 60 * 24 * 90;

function trim(v: string | null | undefined): string | undefined {
  const s = (v ?? "").trim();
  if (!s) return undefined;
  return s.slice(0, MAX_LEN);
}

function isEmpty(a: Attribution): boolean {
  return !Object.values(a).some((v) => typeof v === "string" && v.length > 0);
}

/** Lê o envelope dos parâmetros da URL. Puro — serve em server e client. */
export function fromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
  opts: { pathname?: string; referrer?: string } = {},
): Attribution {
  const get = (k: string): string | undefined => {
    if (params instanceof URLSearchParams) return trim(params.get(k));
    const raw = params[k];
    return trim(Array.isArray(raw) ? raw[0] : raw);
  };

  const a: Attribution = {
    utmSource: get("utm_source"),
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    utmContent: get("utm_content"),
    utmTerm: get("utm_term"),
    gclid: get("gclid"),
    fbclid: get("fbclid"),
    // Aceita `ref` e `partner` como aliases do código de parceiro: o material
    // do canal circula com as duas formas.
    canalRef: get("canal_ref") ?? get("ref") ?? get("partner"),
    landingPath: trim(opts.pathname),
    referrer: trim(opts.referrer),
  };

  if (isEmpty(a)) return {};
  return { ...a, firstSeenAt: new Date().toISOString() };
}

/**
 * Funde dois envelopes com regra first-touch: o que já existe vence.
 * Só preenche buraco, nunca sobrescreve.
 */
export function mergeFirstTouch(existing: Attribution, incoming: Attribution): Attribution {
  if (isEmpty(existing)) return incoming;
  const out: Attribution = { ...existing };
  for (const [k, v] of Object.entries(incoming) as [keyof Attribution, string | undefined][]) {
    if (v && !out[k]) out[k] = v;
  }
  return out;
}

export function readAttributionCookie(): Attribution {
  if (typeof document === "undefined") return {};
  const match = document.cookie.match(/(?:^|;\s*)_sc_attr=([^;]+)/);
  if (!match?.[1]) return {};
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as Attribution;
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Persiste o envelope — SOMENTE com consentimento de marketing.
 * Chamar sem consentimento é no-op silencioso, por desenho: nenhum caminho de
 * código consegue gravar tracking por engano.
 */
export function persistAttribution(a: Attribution, consent: ConsentStatus): void {
  if (typeof document === "undefined") return;
  if (!hasMarketingConsent(consent)) return;
  if (isEmpty(a)) return;
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  const value = encodeURIComponent(JSON.stringify(a));
  document.cookie = `${ATTRIBUTION_COOKIE}=${value}; path=/; max-age=${ATTR_MAX_AGE}; samesite=lax${secure}`;
}

/**
 * Envelope que pode ser ENVIADO ao servidor no submit do formulário.
 *
 * O envio acontece sob o consentimento explícito do próprio formulário (o
 * checkbox obrigatório), então os UTMs — que são metadados de campanha
 * próprios — vão sempre. Os click ids, não: `gclid`/`fbclid` existem para
 * re-vincular a pessoa ao perfil publicitário dela no Google e na Meta, e
 * enviá-los alimenta a finalidade publicitária. Essa finalidade é outra, e
 * precisa do consentimento de marketing.
 */
export function forTransmission(a: Attribution, consent: ConsentStatus): Attribution {
  if (hasMarketingConsent(consent)) return a;
  const { gclid: _gclid, fbclid: _fbclid, ...rest } = a;
  return rest;
}
