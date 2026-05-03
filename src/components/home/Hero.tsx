"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ContactCTAButton } from "@/components/landing/ContactCTAButton";
import { ShinyText } from "@/components/landing/ShinyText";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HeroDashboard } from "@/components/home/HeroDashboard";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

/**
 * Política de carga do video bg — desktop only, save-data-aware.
 *
 * Mobile (<768px): nunca carrega video nem assets derivados. Hero vira
 * texto + CTAs centrados sobre fundo dark gradient (sem dashboard preview).
 *
 * O `videoRef` e `shouldPlay` são consumidos pelo <HeroVideo>; o Hero não
 * lê mais `currentTime` (tracker de cenas removido — ver SITE-STATUS Wave 4).
 */
function useVideoBgPolicy() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);

  React.useEffect(() => {
    const decide = () => {
      if (window.matchMedia("(max-width: 767px)").matches) return false;
      const conn = (
        navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }
      ).connection;
      if (conn?.saveData) return false;
      if (
        conn?.effectiveType === "slow-2g" ||
        conn?.effectiveType === "2g" ||
        conn?.effectiveType === "3g"
      ) {
        return false;
      }
      return true;
    };
    setShouldPlay(decide());
  }, []);

  React.useEffect(() => {
    if (!shouldPlay) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldPlay]);

  return { videoRef, shouldPlay };
}

const FADE_TRANSITION = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function Hero() {
  const t = useTranslations("hero");
  const reducedMotion = useReducedMotion();
  const { videoRef, shouldPlay } = useVideoBgPolicy();

  const fade = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { ...FADE_TRANSITION, delay },
  });

  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      {/* Background video — desktop only, mobile-off pela policy */}
      <HeroVideo videoRef={videoRef} shouldPlay={shouldPlay} />

      {/* Overlay principal: dark cinematográfico mantendo legibilidade */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/85 via-ink-950/65 to-ink-950/95"
      />
      {/* Top scrim — protege o navbar de cenas claras do video */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink-950 via-ink-950/70 to-transparent"
      />
      {/* Brand radial accent — ciano sutil atrás do conteúdo central */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-[120px]"
      />
      {/* Noise texture pra quebrar bandinhas do gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.04] mix-blend-overlay"
      />

      <Container className="relative z-10 flex min-h-screen max-w-6xl flex-col items-center justify-center pb-12 pt-28 text-center sm:pt-32 lg:pt-36">
        {/* Eyebrow pill */}
        <motion.div
          {...fade(0)}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md sm:text-sm"
        >
          <Sparkles
            className="h-3.5 w-3.5 text-brand-400"
            strokeWidth={2}
            aria-hidden
          />
          <span>
            {t("eyebrow", { countries: SUPERCLINI_FACTS.countriesCount })}
          </span>
        </motion.div>

        {/* Headline — 1 linha conceitual, palavra-destaque em italic + shine */}
        <motion.h1
          {...fade(0.1)}
          className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <span>{t("h1Prefix")} </span>
          <span className="italic">
            <ShinyText speedSeconds={4} spreadDeg={100}>
              {t("h1Highlight")}
            </ShinyText>
          </span>
          <span>{t("h1Suffix")}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fade(0.2)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          {t("sub", { countries: SUPERCLINI_FACTS.countriesCount })}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.3)}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
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
            className="group h-11 gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-white backdrop-blur-md hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <a href="#ai">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90">
                <Play
                  className="h-3 w-3 translate-x-[1px] fill-ink-950 text-ink-950"
                  aria-hidden
                />
              </span>
              {t("ctaSecondary")}
            </a>
          </Button>
        </motion.div>

        {/* Trust items */}
        <motion.ul
          {...fade(0.4)}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/60"
        >
          {(["noCard", "setup", "cancel"] as const).map((k) => (
            <li key={k} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full bg-emerald-400"
              />
              {t(`trustItems.${k}`)}
            </li>
          ))}
        </motion.ul>

        {/* Dashboard preview — desktop only, clipped por baixo via section overflow-hidden */}
        <HeroDashboard alt={t("dashboardAlt")} />
      </Container>
    </section>
  );
}
