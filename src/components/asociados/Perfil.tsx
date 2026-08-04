import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Seção 8: a quem o programa se dirige e o que se pede.
 *
 * A nota de posicionamento é obrigatória e não sai daqui: isto é renda
 * complementar para quem já circula na odontologia, nunca uma carreira de
 * vendas nem promessa de sueldo. Prometer o contrário atrai o candidato
 * errado e vira reclamação no terceiro mês.
 */
export function Perfil() {
  const t = useTranslations("asociadosPage.profile");

  const who = ["supplies", "equipment", "lab", "accountant"] as const;
  const asks = ["access", "sii", "training", "brand"] as const;

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {who.map((key) => (
            <article
              key={key}
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900"
            >
              <h3 className="font-display text-base font-bold text-ink-950 dark:text-white">
                {t(`who.${key}.title` as never)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {t(`who.${key}.body` as never)}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-ink-200 bg-white p-7 dark:border-ink-800 dark:bg-ink-900 sm:p-9">
          <h3 className="font-display text-xl font-bold text-ink-950 dark:text-white">
            {t("asksTitle")}
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {asks.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                  {t(`asks.${key}` as never)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/60 dark:bg-amber-950/30">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            {t("honestTitle")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-800 dark:text-amber-300/90">
            {t("honestBody")}
          </p>
        </div>
      </Container>
    </Section>
  );
}
