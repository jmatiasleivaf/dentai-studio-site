import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Cards de "para quem é esta feature". 3 perfis típicos de clínica.
 * Cada caso tem persona + dor concreta + benefit narrativo.
 */
export type UseCaseItem = {
  persona: string;
  pain: string;
  benefit: string;
  Icon: LucideIcon;
};

export function UseCases({
  eyebrow,
  title,
  sub,
  cases,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  cases: UseCaseItem[];
}) {
  return (
    <Section tone="default">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map(({ persona, pain, benefit, Icon }) => (
            <article
              key={persona}
              className="rounded-3xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold leading-tight">{persona}</h3>
              <p className="mt-3 text-sm font-semibold text-rose-600 dark:text-rose-400">
                {pain}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {benefit}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
