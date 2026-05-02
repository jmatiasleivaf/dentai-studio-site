"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * ShinyText: efeito de gradiente que varre o texto continuamente.
 * Inspirado no padrão MotionSites — adaptado para o brand do SuperClini
 * (gradient brand-400 → white → brand-400 ao invés do azul genérico).
 *
 * Respeita `prefers-reduced-motion`: estático no idioma do usuário sem motion.
 */
export function ShinyText({
  children,
  className,
  baseColor = "#38bdf8", // brand-400
  shineColor = "#ffffff",
  speedSeconds = 3,
  spreadDeg = 100,
}: {
  children: React.ReactNode;
  className?: string;
  baseColor?: string;
  shineColor?: string;
  speedSeconds?: number;
  spreadDeg?: number;
}) {
  const reduced = useReducedMotion();

  const gradient = `linear-gradient(${spreadDeg}deg, ${baseColor} 0%, ${baseColor} 40%, ${shineColor} 50%, ${baseColor} 60%, ${baseColor} 100%)`;

  if (reduced) {
    return (
      <span
        className={className}
        style={{
          color: baseColor,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: gradient,
        backgroundSize: "300% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        display: "inline-block",
      }}
      animate={{
        backgroundPosition: ["200% 50%", "-100% 50%"],
      }}
      transition={{
        duration: speedSeconds,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
