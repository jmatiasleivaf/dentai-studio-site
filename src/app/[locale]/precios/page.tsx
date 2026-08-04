import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Pricing } from "@/components/home/Pricing";
import { PricingMatrix } from "@/components/home/PricingMatrix";
import { CtaFinal } from "@/components/home/CtaFinal";
import { routing, type Locale } from "@/i18n/routing";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";
import { isChileSite, CHILE_ORIGIN, MAIN_ORIGIN } from "@/lib/site-host";
import { resolveCountryServer } from "@/lib/country-server";
import { isMembresiaCountry, isNoTrialCountry } from "@/lib/pricing";

/**
 * /precios, criada em 2026-07-20.
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
  const tm = await getTranslations({ locale, namespace: "membresia" });
  const isChile = await isChileSite();

  // No host do Chile a página deixou de ser a mesma coisa em outra moeda: é
  // outro modelo comercial (membresía anual única). Canonical apontando para o
  // principal diria ao Google que este conteúdo é duplicata de uma página que
  // vende outra coisa, então aqui o canonical é próprio.
  const canonical = isChile
    ? `${CHILE_ORIGIN}/es/precios`
    : `${MAIN_ORIGIN}/${locale}/precios`;

  // Título e descrição seguem o PAÍS (o chileno no domínio principal também
  // recebe o snippet da membresía); canonical e alternates seguem o HOST,
  // porque são identidade de URL, não de mercado.
  const membresia = isMembresiaCountry(await resolveCountryServer(locale));

  const title = membresia ? tm("meta.title") : t("meta.title");
  const description = membresia
    ? tm("meta.description")
    : t("meta.description", {
        countries: SUPERCLINI_FACTS.countriesCount,
        tiers: SUPERCLINI_FACTS.tiersCount,
      });

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: isChile
        ? { es: `${CHILE_ORIGIN}/es/precios` }
        : Object.fromEntries(
            routing.locales.map((l) => [l, `${MAIN_ORIGIN}/${l}/precios`])
          ),
    },
    openGraph: {
      title,
      description,
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
  const noTrial = isNoTrialCountry(await resolveCountryServer(locale));

  return (
    <>
      <Pricing />
      <PricingMatrix />
      <CtaFinal noTrial={noTrial} />
    </>
  );
}
