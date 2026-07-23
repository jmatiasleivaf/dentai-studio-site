import { headers } from "next/headers";

/**
 * SSoT do host: distingue o site principal (superclini.com, multi-país) do
 * site dedicado do Chile (cl.superclini.com). O mesmo app Next serve os dois;
 * o nginx roteia ambos para o container e repassa o header Host. Toda decisão
 * "sou a versão Chile?" nasce daqui, para não espalhar strings de host pelo código.
 */
export const CHILE_HOST = "cl.superclini.com";
export const MAIN_ORIGIN = "https://superclini.com";
export const CHILE_ORIGIN = "https://cl.superclini.com";

/** Normaliza o header Host: tira porta, espaços e caixa. */
export function normalizeHost(host: string | null | undefined): string {
  return (host || "").split(":")[0].trim().toLowerCase();
}

/** Puro, testável e usável no middleware (que tem req.headers). */
export function isChileHostname(host: string | null | undefined): boolean {
  return normalizeHost(host) === CHILE_HOST;
}

/** Server-only: lê o Host do request atual (RSC, generateMetadata, sitemap). */
export async function isChileSite(): Promise<boolean> {
  const h = await headers();
  return isChileHostname(h.get("host"));
}

/** Origem canônica conforme o host. */
export function siteOrigin(isChile: boolean): string {
  return isChile ? CHILE_ORIGIN : MAIN_ORIGIN;
}
