import * as React from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

export function Proof() {
  const t = useTranslations("proof");
  const format = useFormatter();

  const stats = [
    {
      key: "tests",
      value: format.number(SUPERCLINI_FACTS.testsCount),
    },
    {
      key: "countries",
      value: format.number(SUPERCLINI_FACTS.countriesCount),
    },
    {
      key: "currencies",
      value: format.number(SUPERCLINI_FACTS.currenciesCount),
    },
    {
      key: "ai",
      value: format.number(SUPERCLINI_FACTS.aiProviders.length),
    },
  ] as const;

  const complianceFlags = [
    ...SUPERCLINI_FACTS.compliance.LATAM,
    ...SUPERCLINI_FACTS.compliance.EU,
    ...SUPERCLINI_FACTS.compliance.US,
  ];

  return (
    <Section tone="default">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              {t("eyebrow")}
            </span>
            <h2 className="mt-6 font-display text-fluid-3xl font-extrabold leading-[1.02] tracking-tight">
              {t("title")}
            </h2>
          </div>

          {/* Stats grid: 4 telemetry tiles dirigidos por SUPERCLINI_FACTS */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-200 bg-ink-200 dark:border-ink-800 dark:bg-ink-800 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.key}
                className="flex flex-col items-center justify-center gap-2 bg-white px-4 py-8 text-center dark:bg-ink-950 sm:py-10"
              >
                <span className="font-display text-4xl font-bold tabular-nums leading-none tracking-tighter text-ink-950 dark:text-white sm:text-5xl">
                  {s.value}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
                  {t(`stats.${s.key}`)}
                </span>
              </div>
            ))}
          </div>

          {/* AI providers row */}
          <dl className="mt-10 space-y-3 text-center text-sm">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                {t("providersLabel")}
              </dt>
              {SUPERCLINI_FACTS.aiProviders.map((p, i) => (
                <React.Fragment key={p}>
                  {i > 0 && (
                    <span aria-hidden className="text-ink-300 dark:text-ink-700">
                      ·
                    </span>
                  )}
                  <dd className="text-ink-700 dark:text-ink-300">{p}</dd>
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                {t("complianceLabel")}
              </dt>
              {complianceFlags.map((c, i) => (
                <React.Fragment key={c}>
                  {i > 0 && (
                    <span aria-hidden className="text-ink-300 dark:text-ink-700">
                      ·
                    </span>
                  )}
                  <dd className="text-ink-700 dark:text-ink-300">{c}</dd>
                </React.Fragment>
              ))}
            </div>
          </dl>

          <p className="mt-10 text-center text-sm leading-relaxed text-ink-600 dark:text-ink-400">
            {t("founded", { year: SUPERCLINI_FACTS.foundedYear })}
          </p>
        </div>
      </Container>
    </Section>
  );
}
