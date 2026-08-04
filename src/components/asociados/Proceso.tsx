import { useTranslations } from "next-intl";
import { Receipt } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/** Seção 9: os cinco passos, e como o asociado cobra. */
export function Proceso() {
  const t = useTranslations("asociadosPage.process");
  const steps = ["apply", "talk", "train", "sign", "sell"] as const;

  return (
    <Section tone="default">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((key, i) => (
            <li
              key={key}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-ink-950 dark:text-white">
                {t(`steps.${key}.title` as never)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {t(`steps.${key}.body` as never)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-12 flex max-w-3xl items-start gap-4 rounded-2xl border border-ink-100 bg-ink-50 p-6 dark:border-ink-800 dark:bg-ink-900/60">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-ink-600 shadow-sm dark:bg-ink-800 dark:text-ink-300">
            <Receipt className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-ink-950 dark:text-white">
              {t("paymentTitle")}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              {t("paymentBody")}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
