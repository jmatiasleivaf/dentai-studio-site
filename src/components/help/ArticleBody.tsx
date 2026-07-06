import * as React from "react";
import { Info, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Block } from "@/lib/help/types";
import { slugify } from "@/lib/help";
import { BodyIllustration } from "./illustrations";

const CALLOUT_STYLES = {
  info: {
    wrap: "border-brand-200 bg-brand-50/60 dark:border-brand-500/30 dark:bg-brand-500/10",
    icon: "text-brand-600 dark:text-brand-400",
    Icon: Info,
  },
  success: {
    wrap: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/30 dark:bg-emerald-500/10",
    icon: "text-emerald-600 dark:text-emerald-400",
    Icon: CheckCircle2,
  },
  warn: {
    wrap: "border-amber-200 bg-amber-50/70 dark:border-amber-500/30 dark:bg-amber-500/10",
    icon: "text-amber-600 dark:text-amber-400",
    Icon: AlertTriangle,
  },
} as const;

export function ArticleBody({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="mb-4 text-[15.5px] leading-relaxed text-ink-700 dark:text-ink-300">
                {block.text[locale]}
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                id={slugify(block.text[locale])}
                className="mb-3 mt-8 scroll-mt-24 font-display text-xl font-extrabold tracking-tight text-ink-900 dark:text-white"
              >
                {block.text[locale]}
              </h2>
            );

          case "list":
            return (
              <ul key={i} className="mb-5 flex flex-col gap-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[15px] text-ink-700 dark:text-ink-300">
                    <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gradient" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            );

          case "steps":
            return (
              <ol key={i} className="mb-5 flex flex-col gap-3">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="relative rounded-2xl border border-ink-200 bg-ink-50 py-3.5 pl-14 pr-4 text-[14.5px] text-ink-700 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300"
                  >
                    <span className="absolute left-3.5 top-3 grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient text-sm font-extrabold text-white">
                      {j + 1}
                    </span>
                    {item[locale]}
                  </li>
                ))}
              </ol>
            );

          case "callout": {
            const s = CALLOUT_STYLES[block.tone ?? "info"];
            return (
              <div key={i} className={`mb-5 flex gap-3.5 rounded-2xl border p-4 ${s.wrap}`}>
                <s.Icon className={`h-5 w-5 flex-shrink-0 ${s.icon}`} aria-hidden />
                <div>
                  {block.title ? (
                    <p className="mb-1 text-sm font-bold text-ink-900 dark:text-white">{block.title[locale]}</p>
                  ) : null}
                  <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">{block.text[locale]}</p>
                </div>
              </div>
            );
          }

          case "illustration":
            return (
              <figure
                key={i}
                className="mb-6 overflow-hidden rounded-2xl border border-ink-200 bg-gradient-to-br from-white to-ink-50 dark:border-ink-800 dark:from-ink-900 dark:to-ink-950"
              >
                <div className="p-4 sm:p-6">
                  <BodyIllustration illustration={block.illustration} />
                </div>
                {block.caption ? (
                  <figcaption className="border-t border-ink-200 bg-white px-4 py-2.5 text-xs text-ink-500 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400">
                    {block.caption[locale]}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "faq":
            return (
              <div key={i} className="mb-5 flex flex-col gap-2.5">
                {block.items.map((item, j) => (
                  <details
                    key={j}
                    className="group rounded-2xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900"
                  >
                    <summary className="cursor-pointer list-none text-[15px] font-semibold text-ink-900 marker:hidden dark:text-white">
                      {item.q[locale]}
                    </summary>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{item.a[locale]}</p>
                  </details>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
