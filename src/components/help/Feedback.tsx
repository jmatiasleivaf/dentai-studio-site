"use client";

import * as React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

/**
 * "¿Te resultó útil?" — feedback local do artigo. Fase 1: estado visual + agradecimento.
 * Fase 2: persistir o voto (endpoint/analytics) para medir qualidade do conteúdo.
 */
export function Feedback({
  question,
  yes,
  no,
  thanks,
}: {
  question: string;
  yes: string;
  no: string;
  thanks: string;
}) {
  const [voted, setVoted] = React.useState<"yes" | "no" | null>(null);

  return (
    <div className="mt-9 flex flex-wrap items-center gap-4 rounded-2xl border border-ink-200 bg-ink-50 px-6 py-5 dark:border-ink-800 dark:bg-ink-900">
      <span className="text-[15px] font-bold text-ink-800 dark:text-ink-100">{question}</span>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setVoted("yes")}
          aria-pressed={voted === "yes"}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
            voted === "yes"
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-ink-300 bg-white text-ink-700 hover:border-brand-400 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-300"
          }`}
        >
          <ThumbsUp className="h-4 w-4" aria-hidden />
          {yes}
        </button>
        <button
          type="button"
          onClick={() => setVoted("no")}
          aria-pressed={voted === "no"}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
            voted === "no"
              ? "border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300"
              : "border-ink-300 bg-white text-ink-700 hover:border-brand-400 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-300"
          }`}
        >
          <ThumbsDown className="h-4 w-4" aria-hidden />
          {no}
        </button>
      </div>
      {voted ? <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{thanks}</span> : null}
    </div>
  );
}
