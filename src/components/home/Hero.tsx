"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ContactCTAButton } from "@/components/landing/ContactCTAButton";
import { ShinyText } from "@/components/landing/ShinyText";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-ink-950">
      {/* Video background com perf best practices (mobile-off, save-data, reduced-motion, IntersectionObserver) */}
      <HeroVideo />

      {/* Overlay escuro para contraste do texto branco */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay bg-noise"
      />

      <Container className="relative z-10 flex min-h-screen max-w-7xl flex-col pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
        {/* TOP SECTION — 2 colunas com pitch + stat */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <p className="max-w-md text-sm leading-relaxed text-white/80 lg:text-base">
            {t("topPitch")}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-white/80 lg:ml-auto lg:text-right lg:text-base">
            {t("topStat", { count: SUPERCLINI_FACTS.countriesCount })}
          </p>
        </div>

        {/* HERO CENTER */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-xs lg:text-sm">
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 font-display text-5xl font-medium leading-[0.85] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            <span className="block">{t("h1Line1")}</span>
            <span className="mt-2 block">
              <ShinyText speedSeconds={3} spreadDeg={100}>
                {t("h1Line2")}
              </ShinyText>
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-fluid-base leading-relaxed text-white/85">
            {t("sub")}
          </p>
        </div>

        {/* BOTTOM — CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ContactCTAButton defaultInteresse="trial_profesional" variant="primary" size="lg">
            {t("ctaPrimary")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </ContactCTAButton>
          <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:border-white hover:text-white">
            <a href="#ai">{t("ctaSecondary")}</a>
          </Button>
        </div>

        {/* Trust items minimal abaixo dos CTAs */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70">
          {(["noCard", "setup", "cancel"] as const).map((k) => (
            <li key={k} className="flex items-center gap-1.5">
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-emerald-400" />
              {t(`trustItems.${k}`)}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
