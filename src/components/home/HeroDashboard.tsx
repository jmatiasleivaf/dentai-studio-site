"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * Dashboard preview do hero — clipped por baixo via overflow-hidden do parent.
 *
 * Decisões:
 * - DESKTOP-ONLY (`hidden md:block`) — em mobile o hero é texto + CTAs
 *   ocupando o viewport, sem distração visual.
 * - Glassmorphism wrapper sobre fundo dark cinematográfico — borda branca
 *   translúcida + shadow profundo dá a cara "asset levitando" Apple/Linear.
 * - Recebe `src` para permitir trocar placeholder por screenshot real
 *   (1440×900 lógico, idealmente 2880×1800 retina, WebP qualidade 85).
 * - Animação fade+rise discreta no mount, respeita `prefers-reduced-motion`.
 *
 * Quando substituir o placeholder pelo screenshot real:
 *   1. Salvar como `public/showcase/hero-saas-1440.webp` (≤200 KB)
 *   2. Trocar `defaultSrc` abaixo
 *   3. Manter aspect 16:10 (1440×900) — qualquer outro aspect quebra o clip
 */
type Props = {
  src?: string;
  alt?: string;
};

const DEFAULT_SRC = "/showcase/hero-saas-placeholder.svg";

export function HeroDashboard({
  src = DEFAULT_SRC,
  alt = "SuperClini dashboard preview",
}: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-10 hidden w-full max-w-5xl px-2 md:block lg:mt-14"
      aria-hidden="true"
    >
      {/* Glow ring sutil atrás do dashboard pra "elevá-lo" do video */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 -top-6 -z-10 h-32 rounded-full bg-brand-500/20 blur-3xl"
      />

      {/* Frosted glass wrapper */}
      <div
        className="overflow-hidden rounded-2xl border border-white/15 p-2 backdrop-blur-md md:p-3"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          boxShadow:
            "0 30px 90px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
        }}
      >
        <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={900}
            priority
            className="h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  );
}
