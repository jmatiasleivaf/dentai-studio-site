import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * "Como funciona" em N passos (3-4 ideal). Numerado, com ícone + título + desc.
 */
export type HowItWorksStep = {
  title: string;
  desc: string;
  Icon: LucideIcon;
};

export function HowItWorks({
  eyebrow,
  title,
  sub,
  steps,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  steps: HowItWorksStep[];
}) {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, desc, Icon }, idx) => (
            <li
              key={title}
              className="relative rounded-3xl border border-ink-100 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-extrabold text-white shadow-brand">
                  {idx + 1}
                </span>
                <Icon className="h-5 w-5 text-brand-500" aria-hidden />
              </div>
              <h3 className="font-display text-base font-bold leading-tight text-ink-900 dark:text-ink-50">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
