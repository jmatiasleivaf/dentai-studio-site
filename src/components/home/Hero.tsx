import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { HeroStage } from "@/components/home/HeroStage";
import type { Locale } from "@/i18n/routing";

/**
 * Hero da tese agêntica, Direção B (2026-07-23): editorial e com calor humano.
 *
 * - Split: à esquerda a mensagem (tipografia harmônica, escala nova `display-1`,
 *   não mais o billboard `fluid-5xl`); à direita o rosto real + prova de produto
 *   (HeroStage). Resolve os três pedidos do Matias de uma vez.
 * - Fundo navy mantido de propósito: o NavBar entra em overlay (texto branco)
 *   na home no topo e assume hero escuro. Trocar para claro exigiria mexer no
 *   NavBar (compartilhado). O retrato claro e os cartões de vidro brancos
 *   ganham contraste premium sobre o navy.
 * - H1 em duas linhas fixas: cabe em 375px sem quebra acidental. Copy afinada
 *   para o Chile ("andar detrás", "hora" = cita no sub), ver i18n.
 */
export function Hero({ isChile = false }: { isChile?: boolean }) {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const sub = isChile ? t("subChile") : t("sub");

  return (
    <section className="relative isolate -mt-nav overflow-hidden bg-ink-950">
      {/* Acento radial da marca + leve gradiente para profundidade no navy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[620px] w-[820px] rounded-full bg-brand-500/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/40 via-ink-950 to-ink-950"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.04] mix-blend-overlay"
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-14 pb-24 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-28 lg:pt-40">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-fluid-xs font-medium text-white/85 backdrop-blur-md">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t("eyebrow")}
          </p>

          <h1 className="mt-6 font-display text-display-1 font-medium text-white text-balance">
            <span className="block">{t("h1Line1")}</span>
            <span className="block text-brand-300">{t("h1Line2")}</span>
          </h1>

          <p className="mt-6 max-w-lg text-lead text-white/75">{sub}</p>

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
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="min-h-touch-lg gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 text-white backdrop-blur-md hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <a href="#agentes">{t("ctaSecondary")}</a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-fluid-xs text-white/60">
            {(["noCard", "setup", "cancel"] as const).map((k) => (
              <li key={k} className="flex items-center gap-1.5">
                <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-emerald-400" />
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
