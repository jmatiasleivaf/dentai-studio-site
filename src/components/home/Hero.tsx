import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ContactCTAButton } from "@/components/landing/ContactCTAButton";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

/**
 * Hero da tese agêntica (2026-07-20).
 *
 * Mudanças estruturais em relação à Wave 4:
 *  - Server Component. O hero deixou de precisar de estado: o vídeo de fundo
 *    saiu (custava 1,9 MB a 4,3 MB, era desktop-only e o conteúdo era genérico),
 *    e com ele saíram `useVideoBgPolicy`, o IntersectionObserver e o framer-motion.
 *  - A prova visual passou a ser o produto real, na faixa dos agentes logo abaixo.
 *  - H1 em duas linhas fixas: estabelece o sujeito (os três agentes) antes do
 *    predicado, e cabe em 375px sem quebra acidental.
 *  - A subheadline carrega os três verbos específicos. É o bloco mais denso da
 *    página e fica alto de propósito: posição no documento é um dos dois fatores
 *    robustos de citação por LLM (arXiv 2607.14035 §7.1).
 */
export function Hero({ isChile = false }: { isChile?: boolean }) {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate -mt-nav overflow-hidden bg-ink-950">
      {/* Ilustração de fundo: fitas de seda translúcidas em azul sobre navy.
          Abstração de atmosfera, gerada por IA. Nunca simula tela do produto.
          Escurecida na exportação; o scrim abaixo garante o contraste do texto. */}
      <Image
        src="/showcase/hero-ribbon.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-right opacity-90 -z-10 sm:block"
      />
      <Image
        src="/showcase/hero-ribbon-mobile.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-right opacity-80 -z-10 sm:hidden"
      />
      {/* Acento radial da marca, some sobre as fitas para dar profundidade. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[120px]"
      />
      {/* Scrim: branco sobre o azul das fitas reprova em AA (marca.css mede
          2,8:1 a 3,7:1). Esta camada leva a zona central de texto a ~5:1. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-ink-950/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.04] mix-blend-overlay"
      />

      <Container className="relative z-10 flex min-h-[88vh] max-w-5xl flex-col items-center justify-center pb-20 pt-28 text-center sm:pt-32 lg:pt-36">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md sm:text-sm">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
          />
          {isChile
            ? t("eyebrowChile")
            : t("eyebrow", { countries: SUPERCLINI_FACTS.countriesCount })}
        </p>

        <h1 className="mt-7 max-w-4xl font-display text-fluid-5xl font-medium leading-[0.95] tracking-tighter text-white">
          <span className="block">{t("h1Line1")}</span>
          <span className="block bg-gradient-to-r from-brand-300 via-accent-500 to-brand-400 bg-clip-text text-transparent">
            {t("h1Line2")}
          </span>
        </h1>

        <p className="mt-7 max-w-3xl text-balance text-base leading-relaxed text-white/75 md:text-lg">
          {t("sub")}
        </p>

        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <ContactCTAButton
            defaultInteresse="trial_profesional"
            variant="primary"
            size="lg"
          >
            {t("ctaPrimary")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </ContactCTAButton>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="group h-11 min-h-touch gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-white backdrop-blur-md hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <a href="#agentes">{t("ctaSecondary")}</a>
          </Button>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/60">
          {(["noCard", "setup", "cancel"] as const).map((k) => (
            <li key={k} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full bg-emerald-400"
              />
              {t(`trustItems.${k}`)}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
