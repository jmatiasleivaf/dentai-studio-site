import type { CountryCode } from "./countries";

/**
 * Single Source of Truth dos canais de contato diretos do site.
 *
 * O número NUNCA vive em `messages/*.json`: pela regra de SSoT do projeto,
 * fato é dado, não string de UI. Isso tem um efeito colateral que vale
 * registrar, porque é o que torna a validação confiável: o next-intl embute
 * TODAS as mensagens no HTML de TODA página, então qualquer string de i18n
 * aparece pelo menos 1x mesmo onde não renderiza. Como este número vem daqui,
 * contar ocorrências no HTML distingue render real de bundle sem ambiguidade.
 *
 * Escopo por PAÍS, não por host. Um chileno que chega em `superclini.com/es`
 * pelo Google tem host falso e país CL: é justamente ele que precisa do canal.
 * A resolução de país é a mesma que governa o preço (`country-server.ts` no
 * servidor, `useCountry()` no cliente).
 */
export const WHATSAPP_SALES = {
  /** E.164 sem separadores, formato exigido pelo wa.me. */
  e164: "+56936994987",
  /** Formato humano chileno, para exibição. */
  display: "+56 9 3699 4987",
  /** Linha comercial (ventas) do Chile. Não é suporte a clientes, nem a Sofía. */
  role: "sales",
} as const;

/**
 * Países que veem o canal. Hoje só o Chile: é a única linha que existe, e
 * publicá-la em BR ou MX criaria expectativa de atendimento com custo
 * internacional para quem escreve e fuso do Chile.
 */
const WHATSAPP_COUNTRIES: readonly CountryCode[] = ["CL"];

export function isWhatsappCountry(country: CountryCode): boolean {
  return WHATSAPP_COUNTRIES.includes(country);
}

/**
 * URL de conversa do WhatsApp. O wa.me exige o E.164 sem "+" nem separadores.
 * `prefill` entra como texto já digitado na conversa, que é o que dá contexto
 * a quem atende sem obrigar o visitante a se explicar.
 */
export function whatsappUrl(prefill?: string): string {
  const digits = WHATSAPP_SALES.e164.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return prefill ? `${base}?text=${encodeURIComponent(prefill)}` : base;
}
