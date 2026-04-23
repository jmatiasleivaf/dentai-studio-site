"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade-up on scroll — reusável em qualquer seção.
 * Respeita `prefers-reduced-motion` automaticamente.
 *
 * Defesa importante: SSR/pré-hidratação renderizam o conteúdo sem motion
 * (opacity 1), e só depois de mount no cliente o motion assume com
 * initial `opacity: 0` disparando whileInView. Isso evita que o usuário
 * caia numa janela onde o JS não rodou e os filhos fiquem presos em
 * opacity 0 (bug visto em navegação via anchor `/es#features`).
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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + pré-hidratação + prefers-reduced-motion → renderiza direto visível
  if (reduce || !mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
