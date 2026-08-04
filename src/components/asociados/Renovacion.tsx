import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Seção 5: a renda que fica.
 *
 * Só a mecânica da renovação. O exemplo numérico que existia no deck (a conta
 * das clínicas do ano 1) saiu junto com os montos: publicar a projeção sem o
 * valor unitário deixaria uma conta pela metade, que confunde mais que ajuda.
 */
export function Renovacion() {
  const t = useTranslations("asociadosPage.renewal");
  const rules = ["automatic", "noSupport", "stayActive", "yours"] as const;

  return (
    <Section tone="dark">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          sub={<span className="text-ink-300">{t("subtitle")}</span>}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {rules.map((key, i) => (
            <article
              key={key}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
            >
              <span className="font-display text-sm font-bold text-brand-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                {t(`rules.${key}.title` as never)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {t(`rules.${key}.body` as never)}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-400">
          {t("note")}
        </p>
      </Container>
    </Section>
  );
}
