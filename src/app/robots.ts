import type { MetadataRoute } from "next";
import { isChileSite, MAIN_ORIGIN, CHILE_ORIGIN } from "@/lib/site-host";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = (await isChileSite()) ? CHILE_ORIGIN : MAIN_ORIGIN;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
