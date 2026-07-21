import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";
import { getCategories, getAllArticlePaths } from "@/lib/help";

const BASE = "https://superclini.com";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}${path}`])),
      },
    }))
  );
}
