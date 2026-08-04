import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/** Seção 3: duas colunas, tu trabajo e nuestro trabajo. */
export function RepartoTrabajo() {
  const t = useTranslations("asociadosPage.split");

  const yours = ["visit", "demo", "register", "close"] as const;
  const ours = ["migrate", "train", "support", "billing"] as const;

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Column
            title={t("yoursTitle")}
            items={yours.map((k) => t(`yours.${k}` as never))}
            accent
          />
          <Column title={t("oursTitle")} items={ours.map((k) => t(`ours.${k}` as never))} />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-600 dark:text-ink-400">
          {t("note")}
        </p>
      </Container>
    </Section>
  );
}

function Column({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-3xl border border-brand-200 bg-white p-7 shadow-sm dark:border-brand-500/30 dark:bg-ink-900 sm:p-9"
          : "rounded-3xl border border-ink-200 bg-white p-7 shadow-sm dark:border-ink-800 dark:bg-ink-900 sm:p-9"
      }
    >
      <h3 className="font-display text-xl font-bold text-ink-950 dark:text-white">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={
                accent
                  ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"
                  : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400"
              }
            >
              <Check className="h-3 w-3" aria-hidden />
            </span>
            <span className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
