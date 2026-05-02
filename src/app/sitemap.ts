import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";

const BASE = "https://superclini.com";

/**
 * Rotas do site organizadas por prioridade SEO.
 * - "" = home (priority 1.0)
 * - landings de feature (priority 0.9) — ranqueiam para keywords de produto
 * - utility/legal (priority 0.5) — necessárias mas baixo CTR
 *
 * Ao criar nova landing, adicionar aqui + verificar messages/*.json.
 */
const ROUTES: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/sofia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ia-clinica", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contato", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacidade", priority: 0.4, changeFrequency: "monthly" },
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
