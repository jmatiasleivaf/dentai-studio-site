"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

type Item = { q: string; a: string };

/**
 * FAQ acordeão configurável por namespace i18n. Reusa entre home e landings.
 * Para Schema.org FAQPage, usar <LandingFAQSchema namespace={...} /> em paralelo
 * (server component) — JS não roda em crawlers.
 */
export function LandingFAQ({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as Item[];
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <Section tone="muted">
      <Container size="md">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />

        <ul className="mt-12 space-y-3">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-2xl border border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="flex min-h-touch-md w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink-900 hover:bg-ink-50 dark:text-ink-50 dark:hover:bg-ink-800"
                >
                  <span className="flex-1">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform ${
                      open ? "rotate-180 text-brand-500" : "text-ink-400"
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
