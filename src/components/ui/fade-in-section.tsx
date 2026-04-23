"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade-up on scroll — reusável em qualquer seção.
 * Respeita `prefers-reduced-motion` automaticamente (sem animação se o
 * usuário pediu).
 *
 * Uso:
 *   <FadeInSection>...</FadeInSection>
 *   <FadeInSection delay={0.1} y={12}>...</FadeInSection>
 */
export function FadeInSection({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
