import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight, FileText, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { HelpGradientDefs, CategoryIllustration } from "@/components/help/illustrations";
import { HelpSearch } from "@/components/help/HelpSearch";
import { routing, type Locale } from "@/i18n/routing";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";
import {
  getCategories,
  getFeaturedArticles,
  countArticles,
  buildSearchIndex,
  pick,
} from "@/lib/help";
import type { Localized } from "@/lib/help";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "help.meta" });
  const canonical = `https://superclini.com/${locale}/ayuda`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `https://superclini.com/${l}/ayuda`])),
    },
    openGraph: { type: "website", url: canonical, title: t("title"), description: t("description") },
  };
}

const NOVEDADES: Array<{ date: Localized; title: Localized; desc: Localized; tone: "new" | "improved" | "fix" }> = [
  {
    tone: "new",
    date: { es: "2 jul 2026", pt: "2 jul 2026", en: "Jul 2, 2026" },
    title: {
      es: "Retención de obra social (Argentina)",
      pt: "Retenção de obra social (Argentina)",
      en: "Social insurance withholding (Argentina)",
    },
    desc: {
      es: "Configura el nomenclador y la retención por profesional en cada cobro.",
      pt: "Configure o nomenclador e a retenção por profissional em cada cobrança.",
      en: "Set up the nomenclator and per-professional withholding on each payment.",
    },
  },
  {
    tone: "improved",
    date: { es: "28 jun 2026", pt: "28 jun 2026", en: "Jun 28, 2026" },
    title: {
      es: "Agenda pública con horizonte de 60 días",
      pt: "Agenda pública com horizonte de 60 dias",
      en: "Public agenda with a 60-day horizon",
    },
    desc: {
      es: "El paciente reserva más adelante, siempre respetando tus bloqueos.",
      pt: "O paciente reserva mais adiante, sempre respeitando seus bloqueios.",
      en: "Patients book further ahead, always respecting your blocks.",
    },
  },
  {
    tone: "fix",
    date: { es: "25 jun 2026", pt: "25 jun 2026", en: "Jun 25, 2026" },
    title: {
      es: "Recordatorios sin duplicados",
      pt: "Lembretes sem duplicados",
      en: "Reminders without duplicates",
    },
    desc: {
      es: "Blindaje del envío para que nadie reciba el mismo mensaje dos veces.",
      pt: "Blindagem do envio para ninguém receber a mesma mensagem duas vezes.",
      en: "Hardened delivery so no one gets the same message twice.",
    },
  },
];

const PILL_STYLES = {
  new: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  improved: "bg-brand-500/10 text-brand-700 dark:text-brand-300",
  fix: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
} as const;

export default async function HelpHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("help");
  const loc = locale as Locale;

  const categories = getCategories();
  const featured = getFeaturedArticles();
  const index = buildSearchIndex(loc);
  const popular = t.raw("hero.popular") as string[];
  const pillLabel = {
    new: { es: "Nuevo", pt: "Novo", en: "New" },
    improved: { es: "Mejorado", pt: "Melhorado", en: "Improved" },
    fix: { es: "Corrección", pt: "Correção", en: "Fix" },
  } as const;

  return (
    <>
      <HelpGradientDefs />

      {/* HERO com busca (header é sólido em página interna, sem overlay) */}
      <section className="bg-gradient-to-b from-[#0b1220] to-ink-950 py-16 text-white sm:py-20">
        <Container className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold text-brand-200">
            {t("hero.eyebrow", { countries: SUPERCLINI_FACTS.countriesCount })}
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            {t("hero.q1")}{" "}
            <span className="bg-gradient-to-r from-brand-400 to-accent-500 bg-clip-text text-transparent">
              {t("hero.qHi")}
            </span>
            ?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">{t("hero.sub")}</p>
          <HelpSearch
            index={index}
            placeholder={t("hero.searchPlaceholder")}
            ariaLabel={t("hero.searchAria")}
            searchLabel={t("hero.searchButton")}
            noResults={t("hero.noResults")}
            popular={popular}
          />
        </Container>
      </section>

      {/* COLECCIONES */}
      <section className="bg-white py-16 dark:bg-ink-950 sm:py-20">
        <Container>
          <div className="mb-10">
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              {t("collections.eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
              {t("collections.title")}
            </h2>
            <p className="mt-2 max-w-2xl text-ink-500 dark:text-ink-400">{t("collections.sub")}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const n = countArticles(c.id);
              const countColor =
                c.accent === "violet"
                  ? "text-violet-600 dark:text-violet-300"
                  : c.accent === "green"
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-brand-600 dark:text-brand-300";
              const tile =
                c.accent === "violet"
                  ? "from-violet-500/10 to-violet-500/5"
                  : c.accent === "green"
                    ? "from-emerald-500/10 to-emerald-500/5"
                    : "from-brand-500/10 to-accent-500/5";
              return (
                <Link
                  key={c.id}
                  href={`/ayuda/${c.slug}` as never}
                  className="group flex flex-col rounded-3xl border border-ink-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900"
                >
                  <span className={`mb-4 grid h-[68px] w-[68px] place-items-center rounded-2xl bg-gradient-to-br ${tile}`}>
                    <CategoryIllustration illustration={c.illustration} accent={c.accent} />
                  </span>
                  <h3 className="font-display text-[17px] font-bold text-ink-900 dark:text-white">{c.name[loc]}</h3>
                  <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-ink-500 dark:text-ink-400">
                    {c.description[loc]}
                  </p>
                  <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${countColor}`}>
                    {t("article.count", { count: n })}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* DESTACADOS */}
      <section className="border-y border-ink-200 bg-ink-50 py-16 dark:border-ink-800 dark:bg-ink-900 sm:py-20">
        <Container>
          <div className="mb-8">
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              {t("featured.eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
              {t("featured.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {featured.map(({ article, category }) => (
              <Link
                key={article.slug}
                href={`/ayuda/${category.slug}/${article.slug}` as never}
                className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 dark:border-ink-800 dark:bg-ink-950"
              >
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300">
                  <FileText className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-ink-900 dark:text-white">{article.title[loc]}</span>
                  <span className="mt-1 flex items-center gap-2 text-[12.5px] text-ink-500 dark:text-ink-400">
                    <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                      {category.name[loc]}
                    </span>
                    · {t("article.reading", { count: article.readingMinutes })}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* NOVEDADES */}
      <section className="bg-white py-16 dark:bg-ink-950 sm:py-20">
        <Container>
          <div className="mb-8">
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              {t("novedades.eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
              {t("novedades.title")}
            </h2>
            <p className="mt-2 text-ink-500 dark:text-ink-400">{t("novedades.sub")}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {NOVEDADES.map((n) => (
              <article
                key={n.title.es}
                className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm dark:border-ink-800 dark:bg-ink-900"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                  {pick(n.date, loc)}
                </div>
                <h3 className="mt-2 font-display text-[15.5px] font-bold text-ink-900 dark:text-white">
                  {n.title[loc]}
                </h3>
                <p className="mt-1.5 text-[13px] text-ink-500 dark:text-ink-400">{n.desc[loc]}</p>
                <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${PILL_STYLES[n.tone]}`}>
                  {pillLabel[n.tone][loc]}
                </span>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* SOPORTE */}
      <section className="bg-white pb-20 dark:bg-ink-950">
        <Container>
          <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[30px] bg-ink-900 p-10 sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/25 blur-[90px]" />
            <div className="relative z-10 max-w-lg">
              <h2 className="font-display text-2xl font-extrabold text-white">{t("support.title")}</h2>
              <p className="mt-3 text-white/70">{t("support.sub")}</p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3">
              <a
                href="https://wa.me/message"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {t("support.whatsapp")}
              </a>
              <Link
                href={"/contato" as never}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/[0.08] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                {t("support.ticket")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
