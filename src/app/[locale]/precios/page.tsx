import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Pricing } from "@/components/home/Pricing";
import { PricingMatrix } from "@/components/home/PricingMatrix";
import { CtaFinal } from "@/components/home/CtaFinal";
import { routing, type Locale } from "@/i18n/routing";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

/**
 * /precios — criada em 2026-07-20.
 *
 * O pricing saiu da home porque somava ~160 unidades de informação (4 cards,
 * 39 bullets, matriz de 25 linhas × 4 colunas) numa página cuja tese é outra.
 * A matriz também exigia scroll horizontal em mobile, que é 70% do tráfego LATAM.
 *
 * URL nova, não renomeada: nenhum 301 é necessário. As âncoras antigas
 * (`/#pricing`, `/#plan-matrix`) passaram a apontar para cá.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "pricing" });

  const canonical = `https://superclini.com/${locale}/precios`;
  return {
    title: t("meta.title"),
    description: t("meta.description", {
      countries: SUPERCLINI_FACTS.countriesCount,
      tiers: SUPERCLINI_FACTS.tiersCount,
    }),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://superclini.com/${l}/precios`])
      ),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description", {
        countries: SUPERCLINI_FACTS.countriesCount,
        tiers: SUPERCLINI_FACTS.tiersCount,
      }),
      url: canonical,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Pricing />
      <PricingMatrix />
      <CtaFinal />
    </>
  );
}
