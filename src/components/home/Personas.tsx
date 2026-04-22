"use client";

import * as React from "react";
import { Check, User, Users, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

const TABS = [
  { id: "solo", Icon: User },
  { id: "clinic", Icon: Users },
  { id: "network", Icon: Building2 },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Personas() {
  const t = useTranslations("personas");
  const [active, setActive] = React.useState<TabId>("clinic");

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />

        <div
          role="tablist"
          aria-label={t("eyebrow")}
          className="mx-auto mt-10 flex w-full max-w-2xl flex-wrap justify-center gap-2 rounded-2xl border border-ink-100 bg-white p-1.5 dark:border-ink-800 dark:bg-ink-900"
        >
          {TABS.map(({ id, Icon }) => {
            const selected = active === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={selected}
                aria-controls={`persona-panel-${id}`}
                id={`persona-tab-${id}`}
                onClick={() => setActive(id)}
                className={
                  selected
                    ? "flex min-h-touch flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-brand"
                    : "flex min-h-touch flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-ink-600 hover:text-brand-600 dark:text-ink-400"
                }
              >
                <Icon className="h-4 w-4" aria-hidden />
                {t(`tabs.${id}`)}
              </button>
            );
          })}
        </div>

        {TABS.map(({ id }) => {
          const selected = active === id;
          const highlights = t.raw(`content.${id}.highlights`) as string[];
          return (
            <div
              key={id}
              role="tabpanel"
              id={`persona-panel-${id}`}
              aria-labelledby={`persona-tab-${id}`}
              hidden={!selected}
              className="mx-auto mt-10 max-w-3xl rounded-3xl border border-ink-100 bg-white p-8 shadow-sm sm:p-10 dark:border-ink-800 dark:bg-ink-900"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-ink-500">
                {t(`content.${id}.pain`)}
              </p>
              <p className="mt-3 font-display text-fluid-xl font-bold leading-tight text-ink-900 dark:text-ink-50">
                {t(`content.${id}.benefit`)}
              </p>
              <ul className="mt-6 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-ink-700 dark:text-ink-300">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
