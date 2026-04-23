"use client";

import { Check, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { PLAN_MATRIX, PLAN_ORDER, type MatrixValue, type PlanId } from "@/lib/pricing";

const TIER_COLORS: Record<PlanId, { header: string; cell: string }> = {
  esencial: {
    header: "text-ink-700 dark:text-ink-200",
    cell: "bg-white dark:bg-ink-900",
  },
  profesional: {
    header: "text-brand-700 dark:text-brand-300",
    cell: "bg-brand-50/50 dark:bg-brand-950/30",
  },
  avanzado: {
    header: "text-ink-700 dark:text-ink-200",
    cell: "bg-white dark:bg-ink-900",
  },
  enterprise: {
    header: "text-violet-700 dark:text-violet-300",
    cell: "bg-violet-50/40 dark:bg-violet-950/20",
  },
};

export function PricingMatrix() {
  const t = useTranslations("pricing");
  const tMatrix = useTranslations("pricing.matrix");
  const tRows = useTranslations("pricing.matrix.rows");
  const tValues = useTranslations("pricing.matrix.values");
  const tGroups = useTranslations("pricing.matrix.groups");

  const renderValue = (v: MatrixValue, planId: PlanId) => {
    if (v === "yes") {
      return <Check className="mx-auto h-4 w-4 text-emerald-500" aria-label={tValues("full")} />;
    }
    if (v === "no") {
      return <Minus className="mx-auto h-4 w-4 text-ink-300 dark:text-ink-700" aria-label="—" />;
    }
    const resolved = (() => {
      try {
        return tValues(v as never);
      } catch {
        return v;
      }
    })();
    return (
      <span
        className={
          planId === "enterprise"
            ? "font-semibold text-violet-700 dark:text-violet-300"
            : planId === "profesional"
              ? "font-semibold text-brand-700 dark:text-brand-300"
              : "text-ink-700 dark:text-ink-200"
        }
      >
        {resolved}
      </span>
    );
  };

  return (
    <Section id="plan-matrix" tone="default" className="py-20 sm:py-24">
      <Container>
        <SectionHeader eyebrow={tMatrix("sub")} title={tMatrix("title")} />

        <div className="mt-10 overflow-x-auto rounded-3xl border border-ink-100 bg-white shadow-card-hover dark:border-ink-800 dark:bg-ink-900">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            {/* Header sticky */}
            <thead>
              <tr className="border-b border-ink-100 dark:border-ink-800">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-white px-5 py-5 text-left text-xs font-extrabold uppercase tracking-[0.2em] text-ink-500 dark:bg-ink-900 dark:text-ink-400"
                >
                  &nbsp;
                </th>
                {PLAN_ORDER.map((planId) => (
                  <th
                    key={planId}
                    scope="col"
                    className={`px-4 py-5 text-center ${TIER_COLORS[planId].cell}`}
                  >
                    <div className="flex flex-col items-center">
                      <span className={`font-display text-base font-bold ${TIER_COLORS[planId].header}`}>
                        {t(`plans.${planId}.name`)}
                      </span>
                      {planId === "profesional" ? (
                        <span className="mt-1 inline-block rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          {t("popular")}
                        </span>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {PLAN_MATRIX.map((row) => (
                <>
                  {row.groupKey ? (
                    <tr key={`group-${row.groupKey}`} className="border-t border-ink-100 dark:border-ink-800">
                      <td
                        colSpan={5}
                        className="sticky left-0 bg-ink-50 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.15em] text-ink-500 dark:bg-ink-950 dark:text-ink-400"
                      >
                        {tGroups(row.groupKey as never)}
                      </td>
                    </tr>
                  ) : null}
                  <tr
                    key={row.key}
                    className="border-t border-ink-50 transition-colors hover:bg-ink-50/50 dark:border-ink-900 dark:hover:bg-ink-800/30"
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white px-5 py-3 text-left text-sm font-medium text-ink-800 dark:bg-ink-900 dark:text-ink-200"
                    >
                      {tRows(row.key as never)}
                    </th>
                    {PLAN_ORDER.map((planId) => (
                      <td
                        key={`${row.key}-${planId}`}
                        className={`px-4 py-3 text-center text-xs ${TIER_COLORS[planId].cell}`}
                      >
                        {renderValue(row.values[planId], planId)}
                      </td>
                    ))}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
