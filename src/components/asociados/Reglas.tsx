import { useTranslations } from "next-intl";
import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Seção 10: as regras do programa.
 *
 * As quatro negativas não são retórica: são as travas que separam um canal de
 * vendas de um esquema de pirâmide (zero custo de adesão, zero compra de
 * estoque, zero ganho por recrutar pessoas, saída livre). Ficam publicadas de
 * propósito, para que sejam oponíveis.
 */
export function Reglas() {
  const t = useTranslations("asociadosPage.rules");

  const nots = ["noEntryFee", "noStock", "noRecruiting", "noExclusivity"] as const;
  const yeses = ["onlyOnSale", "transparent", "leaveAnytime", "published"] as const;

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-ink-200 bg-white p-7 dark:border-ink-800 dark:bg-ink-900 sm:p-9">
            <h3 className="font-display text-lg font-bold text-ink-950 dark:text-white">
              {t("notTitle")}
            </h3>
            <ul className="mt-6 space-y-4">
              {nots.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
                    <X className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                    {t(`not.${key}` as never)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-ink-200 bg-white p-7 dark:border-ink-800 dark:bg-ink-900 sm:p-9">
            <h3 className="font-display text-lg font-bold text-ink-950 dark:text-white">
              {t("yesTitle")}
            </h3>
            <ul className="mt-6 space-y-4">
              {yeses.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                    {t(`yes.${key}` as never)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
