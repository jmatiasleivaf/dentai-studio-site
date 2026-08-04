import { useTranslations } from "next-intl";
import { Building2, GitBranch, Database, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Seção 4: por que coisas se ganha comissão.
 *
 * Sem percentuais e sem montos, por decisão comercial de 2026-08-04: os
 * números são passados pelo manager da SuperClini na primeira conversa. A
 * seção continua respondendo à pergunta que o candidato tem ("de que vive um
 * asociado"), sem publicar a estrutura de custo do canal.
 */
export function ComoGanas() {
  const t = useTranslations("asociadosPage.earn");

  const items = [
    { key: "membership", Icon: Building2 },
    { key: "branch", Icon: GitBranch },
    { key: "migration", Icon: Database },
    { key: "renewal", Icon: RefreshCw },
  ] as const;

  return (
    <Section tone="default">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <ul className="mx-auto mt-14 max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-200 bg-white dark:divide-ink-800 dark:border-ink-800 dark:bg-ink-900">
          {items.map(({ key, Icon }) => (
            <li key={key} className="flex items-start gap-4 p-6 sm:p-7">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink-950 dark:text-white">
                  {t(`items.${key}.title` as never)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                  {t(`items.${key}.body` as never)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 max-w-3xl space-y-3 rounded-2xl border border-ink-100 bg-ink-50 p-6 dark:border-ink-800 dark:bg-ink-900/60">
          <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">{t("detailNote")}</p>
          <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">{t("cleanNote")}</p>
        </div>
      </Container>
    </Section>
  );
}
