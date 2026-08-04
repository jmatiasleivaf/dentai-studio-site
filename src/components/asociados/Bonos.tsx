import { useTranslations } from "next-intl";
import { Rocket, UserPlus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Seção 6: bônus de ativação e de referência.
 *
 * Os critérios ficam explícitos porque são a parte que gera disputa depois
 * (um paciente solto não é pacote; referir alguém só paga quando essa pessoa
 * fecha uma clínica de verdade). Os valores não são publicados.
 */
export function Bonos() {
  const t = useTranslations("asociadosPage.bonus");
  const items = [
    { key: "activation", Icon: Rocket },
    { key: "referral", Icon: UserPlus },
  ] as const;

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map(({ key, Icon }) => (
            <article
              key={key}
              className="rounded-3xl border border-ink-200 bg-white p-7 shadow-sm dark:border-ink-800 dark:bg-ink-900 sm:p-9"
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

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-medium leading-relaxed text-ink-700 dark:text-ink-300">
          {t("note")}
        </p>
      </Container>
    </Section>
  );
}
