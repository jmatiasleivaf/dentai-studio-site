import { getTranslations } from "next-intl/server";

type FAQItem = { q: string; a: string };

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
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
