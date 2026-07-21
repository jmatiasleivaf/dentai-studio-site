import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { HelpGradientDefs, CategoryIllustration } from "@/components/help/illustrations";
import { routing, type Locale } from "@/i18n/routing";
import { getCategories, getCategoryBySlug, getArticlesByCategory } from "@/lib/help";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCategories().map((c) => ({ locale, category: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat || !routing.locales.includes(locale as Locale)) return {};
  const loc = locale as Locale;
  const canonical = `https://superclini.com/${locale}/ayuda/${cat.slug}`;
  return {
    title: `${cat.name[loc]} · SuperClini`,
    description: cat.description[loc],
    alternates: {
      canonical,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://superclini.com/${l}/ayuda/${cat.slug}`])),
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  const loc = locale as Locale;
  const t = await getTranslations("help");
  const articles = getArticlesByCategory(cat.id);
  const others = getCategories().filter((c) => c.id !== cat.id);

  const tile =
    cat.accent === "violet"
      ? "from-violet-500/10 to-violet-500/5"
      : cat.accent === "green"
        ? "from-emerald-500/10 to-emerald-500/5"
        : "from-brand-500/10 to-accent-500/5";

  return (
    <div className="bg-white dark:bg-ink-950">
      <HelpGradientDefs />
      <Container className="py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400">
          <Link href={"/ayuda" as never} className="hover:text-brand-600">
            {t("breadcrumb.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-ink-300" aria-hidden />
          <span className="font-semibold text-ink-800 dark:text-ink-200">{cat.name[loc]}</span>
        </nav>

        {/* Hero da categoria */}
        <div className="mt-8 flex items-start gap-5">
          <span className={`hidden h-20 w-20 flex-shrink-0 place-items-center rounded-3xl bg-gradient-to-br ${tile} sm:grid`}>
            <CategoryIllustration illustration={cat.illustration} accent={cat.accent} className="h-11 w-11" />
          </span>
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              {cat.name[loc]}
            </h1>
            <p className="mt-3 max-w-2xl text-ink-600 dark:text-ink-400">{cat.description[loc]}</p>
            <p className="mt-2 text-sm font-semibold text-brand-600 dark:text-brand-300">
              {t("article.count", { count: articles.length })}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          {/* Lista de artigos */}
          <div>
            <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.15em] text-ink-400">
              {t("inCollection")}
            </h2>
            <ul className="flex flex-col gap-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/ayuda/${cat.slug}/${a.slug}` as never}
                    className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900"
                  >
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300">
                      <FileText className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-ink-900 dark:text-white">{a.title[loc]}</span>
                      <span className="mt-0.5 block truncate text-[13.5px] text-ink-500 dark:text-ink-400">
                        {a.excerpt[loc]}
                      </span>
                    </span>
                    <span className="hidden flex-shrink-0 text-xs text-ink-400 sm:block">
                      {t("article.reading", { count: a.readingMinutes })}
                    </span>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Outras coleções */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5 dark:border-ink-800 dark:bg-ink-900">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.1em] text-ink-400">
                {t("collections.title")}
              </h2>
              <ul className="flex flex-col">
                {others.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/ayuda/${c.slug}` as never}
                      className="flex items-center gap-3 border-b border-ink-200 py-2.5 text-sm font-semibold text-ink-700 last:border-0 hover:text-brand-600 dark:border-ink-800 dark:text-ink-300"
                    >
                      <CategoryIllustration illustration={c.illustration} accent={c.accent} className="h-6 w-6 flex-shrink-0" />
                      {c.name[loc]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
