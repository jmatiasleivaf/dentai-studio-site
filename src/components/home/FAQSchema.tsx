import { getTranslations } from "next-intl/server";
import { resolveCountryServer } from "@/lib/country-server";
import { isMembresiaCountry } from "@/lib/pricing";

/**
 * `aCL` é a resposta para os mercados de membresía (Chile). Só existe nos itens
 * cuja resposta cita plano por nome ou cota mensal, que lá não existem.
 */
type FAQItem = { q: string; a: string; qCL?: string; aCL?: string };

/**
 * Renderiza Schema.org FAQPage como JSON-LD para o Google entender a FAQ
 * e mostrar rich snippets nos resultados de busca. Server component porque
 * precisa rodar em SSR (crawlers não executam JS).
 *
 * Uso: <FAQSchema locale={locale} /> ao lado do <FAQ />.
 * Para FAQs específicas de landing pages, passar `namespace`.
 */
export async function FAQSchema({
  locale,
  namespace = "faq",
}: {
  locale: string;
  namespace?: string;
}) {
  const t = await getTranslations({ locale, namespace });
  const items = t.raw("items") as FAQItem[];
  const membresia = isMembresiaCountry(await resolveCountryServer(locale));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: membresia && item.qCL ? item.qCL : item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: membresia && item.aCL ? item.aCL : item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
