import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PostulacionForm } from "@/components/forms/PostulacionForm";

/**
 * Seção 11: o formulário.
 *
 * Recebe o id `postular`, que é o alvo do CTA do hero. Em mobile a coluna de
 * contexto fica acima do formulário: quem chega por um link de WhatsApp
 * precisa entender o que está preenchendo antes de digitar.
 */
export function Postulacion() {
  const t = useTranslations("asociadosPage.apply");
  const points = ["zones", "answer", "noCost"] as const;

  return (
    <Section id="postular" tone="default" className="scroll-mt-nav">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              {t("eyebrow")}
            </span>
            <h2 className="mt-5 font-display text-display-2 font-bold text-balance text-ink-950 dark:text-white">
              {t("title")}
            </h2>
            <p className="mt-5 text-lead text-ink-600 dark:text-ink-400">{t("subtitle")}</p>

            <ul className="mt-8 space-y-3">
              {points.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                    {t(`points.${key}` as never)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xl dark:border-ink-700 dark:bg-ink-900 sm:p-8">
            <PostulacionForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
