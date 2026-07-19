/**
 * Consentimento de armazenamento no dispositivo (ePrivacy art. 5(3), RGPD,
 * LGPD art. 8º, Ley 21.719 CL).
 *
 * Por que este módulo existe: gravar `gclid`/`fbclid` no dispositivo é
 * tracking, não medição funcional. O art. 5(3) da ePrivacy regula o ATO DE
 * GRAVAR, e é neutro quanto a quem grava — "é first-party" não é defesa. O
 * site serve Espanha e Portugal com páginas ativas, então RGPD e ePrivacy
 * incidem diretamente. Consentimento posterior (o checkbox do formulário) não
 * convalida coleta anterior, porque a gravação já foi o tratamento.
 *
 * Regras de ouro que este módulo impõe:
 *  1. Antes da interação com o banner, NADA além de estritamente necessário é
 *     gravado. Nem cookie, nem localStorage, nem sessionStorage (todos caem
 *     no art. 5(3)).
 *  2. Recusar é tão fácil quanto aceitar. Nada vem pré-marcado.
 *  3. Revogar APAGA o que já foi gravado — não basta parar de gravar.
 *  4. O consentimento é versionado: mudou a política, pergunta de novo.
 *
 * O próprio registro de consentimento é estritamente necessário (é a prova de
 * que a escolha foi respeitada), então ele pode ser gravado sem consentimento.
 * É a única exceção, e é reconhecida pelas autoridades.
 */

/** Versão da política. Incrementar SEMPRE que as finalidades mudarem. */
export const CONSENT_POLICY_VERSION = "2026-07-19";

/** Cookie do registro de escolha. Estritamente necessário. */
export const CONSENT_COOKIE = "_sc_consent";

/** Cookie do envelope de atribuição. Só existe com consentimento de marketing. */
export const ATTRIBUTION_COOKIE = "_sc_attr";

/** 6 meses. Depois disso perguntamos de novo, como recomendam as autoridades. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

export type ConsentCategory = "essential" | "marketing";

export type ConsentState = {
  /** Versão da política aceita. */
  v: string;
  /** ISO 8601, quando a escolha foi feita. */
  ts: string;
  /**
   * Atribuição de campanha e publicidade. Cobre o cookie `_sc_attr` (incluindo
   * gclid/fbclid) e, quando existir, o envio de conversões a Meta e Google.
   */
  marketing: boolean;
};

/** Sem escolha registrada ainda. Não é "recusou": é "não perguntamos". */
export type ConsentStatus = ConsentState | null;

function isSecureContext(): boolean {
  if (typeof window === "undefined") return true;
  return window.location.protocol === "https:";
}

/**
 * `Secure` sempre que possível. Em dev (http://localhost) o browser rejeita
 * cookie Secure, então ele é omitido — só ali.
 */
function cookieAttrs(maxAge: number): string {
  const base = `path=/; max-age=${maxAge}; samesite=lax`;
  return isSecureContext() ? `${base}; secure` : base;
}

export function readConsent(): ConsentStatus {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)_sc_consent=([^;]+)/);
  if (!match?.[1]) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as Partial<ConsentState>;
    if (typeof parsed.marketing !== "boolean" || typeof parsed.v !== "string") return null;
    // Política mudou: a escolha antiga não vale para as finalidades novas.
    if (parsed.v !== CONSENT_POLICY_VERSION) return null;
    return {
      v: parsed.v,
      ts: typeof parsed.ts === "string" ? parsed.ts : new Date().toISOString(),
      marketing: parsed.marketing,
    };
  } catch {
    return null;
  }
}

export function writeConsent(marketing: boolean): ConsentState {
  const state: ConsentState = {
    v: CONSENT_POLICY_VERSION,
    ts: new Date().toISOString(),
    marketing,
  };
  if (typeof document !== "undefined") {
    const value = encodeURIComponent(JSON.stringify(state));
    document.cookie = `${CONSENT_COOKIE}=${value}; ${cookieAttrs(CONSENT_MAX_AGE)}`;
    // Revogação tem que APAGAR o que já existe, não só parar de gravar.
    if (!marketing) eraseAttributionCookie();
  }
  return state;
}

/** Apaga o envelope persistido. Usado na revogação. */
export function eraseAttributionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ATTRIBUTION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function hasMarketingConsent(state: ConsentStatus): boolean {
  return state?.marketing === true;
}
