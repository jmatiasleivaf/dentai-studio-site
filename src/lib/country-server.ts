import { cookies, headers } from "next/headers";
import { COUNTRIES, type CountryCode } from "./countries";
import { isChileHostname } from "./site-host";

/**
 * Resolve o país NO SERVIDOR, com a mesma precedência que o cliente
 * (`CountryContext`) e o `middleware` usam. Existe porque o modelo comercial
 * do Chile (membresía anual única) é decidido por PAÍS, não por host: o
 * dentista chileno que cai em superclini.com/es/precios pelo Google precisa
 * ver o mesmo que vê em cl.superclini.com.
 *
 * Precedência:
 *   1. host cl.superclini.com  → sempre CL
 *   2. cookie NEXT_COUNTRY     → escolha explícita anterior (picker)
 *   3. header de geo do edge   → cf-ipcountry (Cloudflare) ou x-vercel-ip-country
 *   4. idioma da URL           → pt = BR, en = US, es = CL
 *
 * O passo 3 importa: na PRIMEIRA visita o cookie que o middleware acabou de
 * gravar ainda não está no request, então sem ele o SSR renderizaria o país
 * errado e só o efeito do cliente corrigiria, com troca visível de conteúdo.
 */
export async function resolveCountryServer(locale: string): Promise<CountryCode> {
  const h = await headers();
  if (isChileHostname(h.get("host"))) return "CL";

  const cookieStore = await cookies();
  const fromCookie = cookieStore.get("NEXT_COUNTRY")?.value?.toUpperCase();
  if (fromCookie && fromCookie in COUNTRIES) return fromCookie as CountryCode;

  const fromGeo = (
    h.get("cf-ipcountry") ||
    h.get("x-vercel-ip-country") ||
    ""
  ).toUpperCase();
  if (fromGeo && fromGeo in COUNTRIES) return fromGeo as CountryCode;

  return locale === "pt" ? "BR" : locale === "en" ? "US" : "CL";
}
