import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { HelpGradientDefs } from "@/components/help/illustrations";
import { ArticleBody } from "@/components/help/ArticleBody";
import { Feedback } from "@/components/help/Feedback";
import { routing, type Locale } from "@/i18n/routing";
import { getArticle, getAllArticlePaths, getHeadings, getRelatedArticles } from "@/lib/help";

const DATE_LOCALE: Record<Locale, string> = { es: "es-CL", pt: "pt-BR", en: "en-US" };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllArticlePaths().map(({ categorySlug, articleSlug }) => ({
      locale,
      category: categorySlug,
      slug: articleSlug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const found = getArticle(category, slug);
  if (!found || !routing.locales.includes(locale as Locale)) return {};
  const loc = locale as Locale;
  const canonical = `https://superclini.com/${locale}/ayuda/${category}/${slug}`;
  return {
    title: `${found.article.title[loc]} — SuperClini`,
    description: found.article.excerpt[loc],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://superclini.com/${l}/ayuda/${category}/${slug}`])
      ),
    },
    openGraph: { type: "article", url: canonical, title: found.article.title[loc], description: found.article.excerpt[loc] },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);
  const found = getArticle(category, slug);
  if (!found) notFound();
  const { article, category: cat } = found;
  const loc = locale as Locale;
  const t = await getTranslations("help");

  const headings = getHeadings(article, loc);
  const related = getRelatedArticles(article);
  const updatedDate = new Intl.DateTimeFormat(DATE_LOCALE[loc], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(article.updated));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[loc],
    description: article.excerpt[loc],
    inLanguage: loc,
    dateModified: article.updated,
    author: { "@type": "Organization", name: t("article.author") },
    publisher: { "@type": "Organization", name: "SuperClini", logo: { "@type": "ImageObject", url: "https://superclini.com/logo-superclini.svg" } },
    mainEntityOfPage: `https://superclini.com/${locale}/ayuda/${category}/${slug}`,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `https://superclini.com/${locale}/ayuda` },
      { "@type": "ListItem", position: 2, name: cat.name[loc], item: `https://superclini.com/${locale}/ayuda/${category}` },
      { "@type": "ListItem", position: 3, name: article.title[loc], item: `https://superclini.com/${locale}/ayuda/${category}/${slug}` },
    ],
  };

  return (
    <div className="bg-white dark:bg-ink-950">
      <HelpGradientDefs />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Container className="py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400">
          <Link href={"/ayuda" as never} className="hover:text-brand-600">
            {t("breadcrumb.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-ink-300" aria-hidden />
          <Link href={`/ayuda/${cat.slug}` as never} className="hover:text-brand-600">
            {cat.name[loc]}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-ink-300" aria-hidden />
          <span className="truncate font-semibold text-ink-800 dark:text-ink-200">{article.title[loc]}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[210px_minmax(0,1fr)_240px]">
          {/* TOC */}
          <nav className="hidden lg:block lg:sticky lg:top-24 lg:self-start" aria-label={t("article.toc")}>
            {headings.length > 0 ? (
              <>
                <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-400">
                  {t("article.toc")}
                </div>
                <ul className="flex flex-col gap-1 border-l-2 border-ink-200 text-[13.5px] dark:border-ink-800">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-ink-500 hover:border-brand-400 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </nav>

          {/* Corpo */}
          <article className="min-w-0 max-w-2xl">
            <div className="mb-3 flex items-center gap-2.5">
              <Link
                href={`/ayuda/${cat.slug}` as never}
                className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-700 hover:bg-brand-500/20 dark:text-brand-300"
              >
                {cat.name[loc]}
              </Link>
            </div>
            <h1 className="font-display text-[28px] font-extrabold leading-[1.1] tracking-tight text-ink-900 dark:text-white sm:text-[36px]">
              {article.title[loc]}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-1 border-b border-ink-200 pb-5 text-[13px] text-ink-500 dark:border-ink-800 dark:text-ink-400">
              <span className="flex items-center gap-2 font-semibold text-ink-700 dark:text-ink-300">
                <span aria-hidden className="h-6 w-6 rounded-full bg-brand-gradient" />
                {t("article.author")}
              </span>
              <span aria-hidden>·</span>
              <span>{t("article.updated")} {updatedDate}</span>
              <span aria-hidden>·</span>
              <span>{t("article.reading", { count: article.readingMinutes })}</span>
            </div>

            <div className="mt-7">
              <ArticleBody blocks={article.body} locale={loc} />
            </div>

            <Feedback
              question={t("article.feedbackQuestion")}
              yes={t("article.feedbackYes")}
              no={t("article.feedbackNo")}
              thanks={t("article.feedbackThanks")}
              slug={article.slug}
              category={cat.slug}
              locale={loc}
            />
          </article>

          {/* Aside: relacionados + soporte */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            {related.length > 0 ? (
              <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5 dark:border-ink-800 dark:bg-ink-900">
                <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-400">
                  {t("article.related")}
                </div>
                <ul className="flex flex-col">
                  {related.map(({ article: r, category: rc }) => (
                    <li key={r.slug}>
                      <Link
                        href={`/ayuda/${rc.slug}/${r.slug}` as never}
                        className="block border-b border-ink-200 py-2.5 text-[13.5px] font-semibold text-ink-700 last:border-0 hover:text-brand-600 dark:border-ink-800 dark:text-ink-300"
                      >
                        {r.title[loc]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border-0 bg-gradient-to-br from-ink-900 to-ink-950 p-5">
              <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-500">
                {t("article.stillTitle")}
              </div>
              <p className="mb-4 text-[13.5px] text-white/80">{t("article.stillSub")}</p>
              <a
                href="https://wa.me/message"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t("support.whatsapp")}
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
