import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";

const BASE = "https://superclini.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.map((locale) => ({
    url: `${BASE}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "es" ? 1.0 : 0.9,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}`])),
    },
  }));
}
