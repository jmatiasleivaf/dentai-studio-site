"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carrossel/slider reutilizável e acessível.
 *
 * Os slides são renderizados no SERVIDOR e passados como children: assim os
 * mockups do produto (pesados) e as fotos não entram no bundle client; este
 * controlador só decide qual mostrar. Respeita prefers-reduced-motion, pausa no
 * hover/foco, tem setas + pontos com alvo de toque >= 44px, e usa `inert` para
 * tirar do foco os slides fora de tela.
 *
 * `progress`: mostra uma barra de avanço do autoplay (congela no hover/foco,
 * reseta a cada slide). Só aparece quando há autoplay e sem reduce-motion.
 */
function useReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduce;
}

export function Slider({
  children,
  label,
  autoMs = 0,
  progress = false,
}: {
  children: React.ReactNode;
  label?: string;
  autoMs?: number;
  progress?: boolean;
}) {
  const slides = React.Children.toArray(children);
  const n = slides.length;
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();
  const startX = React.useRef<number | null>(null);
  const barRef = React.useRef<HTMLSpanElement>(null);
  const pausedRef = React.useRef(false);

  const go = React.useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  React.useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  React.useEffect(() => {
    if (!autoMs || reduce || paused || n < 2) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % n), autoMs);
    return () => window.clearInterval(id);
  }, [autoMs, reduce, paused, n]);

  // Barra de progresso: rAF que congela no pause e reinicia a cada slide (dep `i`).
  React.useEffect(() => {
    if (!progress || !autoMs || reduce || n < 2) return;
    if (barRef.current) barRef.current.style.width = "0%";
    let raf = 0;
    let startTs: number | null = null;
    let banked = 0;
    let wasPaused = false;
    const loop = (ts: number) => {
      if (pausedRef.current) {
        if (!wasPaused) {
          if (startTs != null) banked += ts - startTs;
          startTs = null;
          wasPaused = true;
        }
        raf = requestAnimationFrame(loop);
        return;
      }
      if (wasPaused) {
        wasPaused = false;
        startTs = ts;
      }
      if (startTs == null) startTs = ts;
      const elapsed = banked + (ts - startTs);
      const p = Math.min(1, elapsed / autoMs);
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [i, progress, autoMs, reduce, n]);

  if (n === 0) return null;

  const showProgress = progress && !!autoMs && !reduce && n > 1;

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${i * 100}%)`,
            transition: reduce ? "none" : "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
          onPointerDown={(e) => {
            startX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
            startX.current = null;
          }}
        >
          {slides.map((s, idx) => (
            <div
              key={idx}
              className="w-full shrink-0"
              inert={idx !== i}
              aria-hidden={idx !== i}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {n > 1 ? (
        <div className="mt-7 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label={label ? `${label}: anterior` : "Anterior"}
            onClick={() => go(-1)}
            className="grid h-touch w-touch place-items-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex items-center">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Ir al ${idx + 1} de ${n}`}
                aria-current={idx === i}
                onClick={() => setI(idx)}
                className="grid h-touch min-w-touch place-items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    idx === i ? "w-7 bg-brand-500" : "w-2 bg-ink-300 dark:bg-ink-700"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={label ? `${label}: siguiente` : "Siguiente"}
            onClick={() => go(1)}
            className="grid h-touch w-touch place-items-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}

      {showProgress ? (
        <div
          aria-hidden
          className="mx-auto mt-4 h-[3px] w-full max-w-[320px] overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800"
        >
          <span
            ref={barRef}
            className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
            style={{ width: "0%" }}
          />
        </div>
      ) : null}
    </div>
  );
}
