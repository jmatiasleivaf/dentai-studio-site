import * as React from "react";
import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Tabela comparativa "antes (jeito antigo) vs depois (com SuperClini)".
 * Útil em landings de feature para destacar dor → solução.
 */
export function Comparison({
  eyebrow,
  title,
  beforeHeader,
  afterHeader,
  rows,
}: {
  eyebrow?: string;
  title: string;
  beforeHeader: string;
  afterHeader: string;
  rows: { topic: string; before: string; after: string }[];
}) {
  return (
    <Section tone="default">
      <Container size="md">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="mt-12 overflow-x-auto rounded-3xl border border-ink-100 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-900">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink-100 dark:border-ink-800">
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-ink-500 dark:text-ink-400"
                >
                  &nbsp;
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-sm font-bold text-ink-700 dark:text-ink-300"
                >
                  <span className="inline-flex items-center gap-2">
                    <X className="h-4 w-4 text-rose-500" aria-hidden />
                    {beforeHeader}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-sm font-bold text-brand-700 dark:text-brand-300"
                >
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" aria-hidden />
                    {afterHeader}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.topic}
                  className="border-t border-ink-50 dark:border-ink-900"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 text-left font-semibold text-ink-800 dark:text-ink-200"
                  >
                    {row.topic}
                  </th>
                  <td className="px-5 py-4 text-ink-600 dark:text-ink-400">{row.before}</td>
                  <td className="px-5 py-4 font-medium text-ink-800 dark:text-ink-200">
                    {row.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
