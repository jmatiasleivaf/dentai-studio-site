import { useTranslations } from "next-intl";
import { Sparkles, Tag, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/** Seção 2: por que este é o momento. Três argumentos de mercado, sem cifras. */
export function PorQueAhora() {
  const t = useTranslations("asociadosPage.why");

  const items = [
    { key: "market", Icon: Users },
    { key: "product", Icon: Sparkles },
    { key: "price", Icon: Tag },
  ] as const;

  return (
    <Section tone="default">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map(({ key, Icon }) => (
            <article
              key={key}
              className="rounded-3xl border border-ink-100 bg-white p-7 shadow-sm dark:border-ink-800 dark:bg-ink-900"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-950 dark:text-white">
                {t(`items.${key}.title` as never)}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {t(`items.${key}.body` as never)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
