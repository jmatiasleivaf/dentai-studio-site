import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";
import { getCategories, getAllArticlePaths } from "@/lib/help";
import { isChileSite, MAIN_ORIGIN, CHILE_ORIGIN } from "@/lib/site-host";

const BASE = MAIN_ORIGIN;

/**
 * Alternates de idioma por rota. É o MESMO conjunto servido pelos dois hosts,
 * como o Google espera. `es-CL` aponta para o subdomínio dedicado do Chile.
 */
function alternatesFor(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of LOCALES) langs[l] = `${MAIN_ORIGIN}/${l}${path}`;
  langs["es-CL"] = `${CHILE_ORIGIN}/es${path}`;
  return langs;
}

/**
 * Rotas do site organizadas por prioridade SEO.
 * - "" = home (priority 1.0)
 * - landings de feature (priority 0.9), ranqueiam para keywords de produto
 * - utility/legal (priority 0.5), necessárias mas baixo CTR
 *
 * Ao criar nova landing, adicionar aqui + verificar messages/*.json.
 */
const ROUTES: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/sofia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ia-clinica", priority: 0.9, changeFrequency: "weekly" },
  { path: "/clinico", priority: 0.9, changeFrequency: "weekly" },
  { path: "/totem", priority: 0.9, changeFrequency: "weekly" },
  { path: "/automatizacoes", priority: 0.9, changeFrequency: "weekly" },
  // Pricing saiu da home em 2026-07-20 e virou página própria.
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contato", priority: 0.7, changeFrequency: "monthly" },
  // Prioridade alta: é a página de conversão do funil self-service.
  { path: "/registro", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacidade", priority: 0.4, changeFrequency: "monthly" },
  // Centro de Ayuda
  { path: "/ayuda", priority: 0.8, changeFrequency: "weekly" },
  ...getCategories().map((c) => ({
    path: `/ayuda/${c.slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
  })),
  ...getAllArticlePaths().map(({ categorySlug, articleSlug }) => ({
    path: `/ayuda/${categorySlug}/${articleSlug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  })),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const chile = await isChileSite();

  // O subdomínio do Chile é mono-idioma (es): serve só as URLs es do próprio
  // host. O domínio principal serve os três idiomas. Ambos declaram o mesmo
  // conjunto de alternates (com es-CL apontando para o subdomínio).
  if (chile) {
    return ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${CHILE_ORIGIN}/es${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: alternatesFor(path) },
    }));
  }

  return LOCALES.flatMap((locale) =>
    ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: alternatesFor(path) },
    }))
  );
}
