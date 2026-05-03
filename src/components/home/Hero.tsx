"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ContactCTAButton } from "@/components/landing/ContactCTAButton";
import { ShinyText } from "@/components/landing/ShinyText";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

// Cenas narrativas do video Runway (Kling 3.0 Pro · 15s · 4 cenas):
// 0 = WhatsApp Sofía → 1 = Totem recepção → 2 = Secretária IA → 3 = Dentista no box
const SCENE_KEYS = ["whatsapp", "totem", "sofia", "dentista"] as const;
const SCENE_COUNT = SCENE_KEYS.length;
const VIDEO_FALLBACK_DURATION_S = 15;
const STATIC_CYCLE_INTERVAL_MS = 4000;

/**
 * Decide se carrega video (desktop, sem save-data, rede OK) e expõe
 * o ref + estado de play pra que o Hero possa sincronizar copy.
 */
function useVideoBgPolicy() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

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
    if (!shouldPlay) {
      setIsPlaying(false);
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // autoplay bloqueado — silently ignore (poster continua visível)
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [shouldPlay]);

  return { videoRef, shouldPlay, isPlaying };
}

/**
 * Mapeia o tempo atual do video pra cena 0–3.
 * Fallback: cycle a cada 4s quando video não toca (mobile, save-data, paused).
 * Reduced motion: trava na cena 0.
 */
function useHeroScene(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isPlaying: boolean
): number {
  const reducedMotion = useReducedMotion();
  const [scene, setScene] = React.useState(0);

  React.useEffect(() => {
    if (reducedMotion) {
      setScene(0);
      return;
    }

    if (isPlaying && videoRef.current) {
      const video = videoRef.current;
      let rafId = 0;
      let lastIdx = -1;

      const tick = () => {
        if (!video.paused && !video.ended) {
          const dur = video.duration || VIDEO_FALLBACK_DURATION_S;
          const sceneDur = dur / SCENE_COUNT;
          const idx =
            Math.floor((video.currentTime % dur) / sceneDur) % SCENE_COUNT;
          if (idx !== lastIdx) {
            lastIdx = idx;
            setScene(idx);
          }
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }

    const id = setInterval(
      () => setScene((s) => (s + 1) % SCENE_COUNT),
      STATIC_CYCLE_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [reducedMotion, isPlaying, videoRef]);

  return scene;
}

const SCENE_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

export function Hero() {
  const t = useTranslations("hero");
  const { videoRef, shouldPlay, isPlaying } = useVideoBgPolicy();
  const sceneIdx = useHeroScene(videoRef, isPlaying);
  const sceneKey = SCENE_KEYS[sceneIdx];

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-ink-950">
      {/* Video background com perf best practices (mobile-off, save-data, reduced-motion, IntersectionObserver) */}
      <HeroVideo videoRef={videoRef} shouldPlay={shouldPlay} />

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
          {/* Eyebrow rotativo sincronizado com a narrativa do video */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="flex h-5 items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 sm:h-6 sm:text-xs lg:text-sm"
          >
            <span className="font-mono tabular-nums text-white/55">
              {String(sceneIdx + 1).padStart(2, "0")}/
              {String(SCENE_COUNT).padStart(2, "0")}
            </span>
            <span aria-hidden className="text-white/30">
              ·
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`label-${sceneKey}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={SCENE_TRANSITION}
                className="inline-block whitespace-nowrap"
              >
                {t(`scenes.${sceneKey}.label`)}
              </motion.span>
            </AnimatePresence>
            <span aria-hidden className="hidden text-white/30 sm:inline">
              ·
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`metric-${sceneKey}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={SCENE_TRANSITION}
                className="hidden whitespace-nowrap font-semibold text-white sm:inline-block"
              >
                {t(`scenes.${sceneKey}.metric`)}
              </motion.span>
            </AnimatePresence>
          </div>

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

          {/* Scene progress indicator — 4 barrinhas que pulsam pra cena ativa */}
          <div className="mt-8 flex items-center gap-1.5" aria-hidden>
            {SCENE_KEYS.map((key, idx) => {
              const isActive = idx === sceneIdx;
              return (
                <span
                  key={key}
                  className={`h-[2px] rounded-full transition-all duration-500 ${
                    isActive ? "w-8 bg-white" : "w-4 bg-white/30"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* BOTTOM — CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:border-white hover:text-white"
          >
            <a href="#ai">{t("ctaSecondary")}</a>
          </Button>
        </div>

        {/* Trust items minimal abaixo dos CTAs */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70">
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
