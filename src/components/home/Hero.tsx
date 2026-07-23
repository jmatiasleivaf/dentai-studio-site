import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { HeroStage } from "@/components/home/HeroStage";
import type { Locale } from "@/i18n/routing";

/**
 * Hero da tese agêntica, Direção B (2026-07-23): editorial, CLARO e com calor
 * humano. Split: à esquerda a mensagem (escala tipográfica harmônica `display-1`,
 * não mais o billboard `fluid-5xl`); à direita o rosto real + prova de produto.
 *
 * Fundo claro: o NavBar virou sólido em vidro (sem overlay branco), então o hero
 * não usa mais `-mt-nav`. H1 afinado para o Chile (ver i18n).
 */
export function Hero({ isChile = false }: { isChile?: boolean }) {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const sub = isChile ? t("subChile") : t("sub");

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-ink-50 to-white dark:from-ink-950 dark:to-ink-950">
      {/* Acento radial suave da marca. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[560px] w-[760px] rounded-full bg-brand-400/15 blur-[130px]"
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-14 pb-20 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-28 lg:pt-32">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-1.5 text-fluid-xs font-medium text-ink-600 shadow-sm dark:border-white/12 dark:bg-white/[0.04] dark:text-white/85">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t("eyebrow")}
          </p>

          <h1 className="mt-6 font-display text-display-1 font-medium text-ink-950 text-balance dark:text-white">
            <span className="block">{t("h1Line1")}</span>
            <span className="block text-brand-600 dark:text-brand-300">{t("h1Line2")}</span>
          </h1>

          <p className="mt-6 max-w-lg text-lead text-ink-600 dark:text-ink-300">{sub}</p>

          <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild variant="primary" size="lg" className="group">
              <Link href="/registro">
                {t("ctaPrimary")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#agentes">{t("ctaSecondary")}</a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-fluid-xs text-ink-500 dark:text-white/60">
            {(["noCard", "setup", "cancel"] as const).map((k) => (
              <li key={k} className="flex items-center gap-1.5">
                <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-500" />
                {t(`trustItems.${k}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 lg:mb-0">
          <HeroStage locale={locale} />
        </div>
      </Container>
    </section>
  );
}
