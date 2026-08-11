import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Pricing } from "@/components/home/Pricing";
import { CtaFinal } from "@/components/home/CtaFinal";
import { routing, type Locale } from "@/i18n/routing";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";
import { isChileSite, CHILE_ORIGIN, MAIN_ORIGIN } from "@/lib/site-host";

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
  const tm = await getTranslations({ locale, namespace: "membresia" });
  const isChile = await isChileSite();

  // O host do Chile mantém canonical próprio: a URL é outra e o snippet fala
  // ao mercado chileno em CLP. Canonical apontando para o principal diria ao
  // Google que este conteúdo é duplicata.
  const canonical = isChile
    ? `${CHILE_ORIGIN}/es/precios`
    : `${MAIN_ORIGIN}/${locale}/precios`;

  // Desde 2026-08-10 os 9 mercados vendem a mesma membresía anual, então o
  // snippet é um só. O host CL conserva o título e a descrição próprios, que
  // já estão indexados e nomeiam o mercado e a moeda.
  const title = isChile ? tm("meta.titleCL") : tm("meta.title");
  const description = isChile
    ? tm("meta.descriptionCL")
    : tm("meta.description", { countries: SUPERCLINI_FACTS.countriesCount });

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

  // A matriz comparativa dos 3 planos saiu da página em 2026-08-10: com uma
  // membresía única não há colunas a comparar. O componente segue no repo.
  return (
    <>
      <Pricing />
      <CtaFinal />
    </>
  );
}
