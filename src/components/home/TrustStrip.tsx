import { ShieldCheck, Globe2, Activity, Database, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

/**
 * Franja de confiança: de uma linha de texto plano para tarjetas com ícone,
 * título e detalhe (jerarquia + ar). Cada tile tem uma dimensão distinta.
 *
 * O tile "pruebas automatizadas" saiu em 2026-07-20 (contagem de teste é conversa
 * de engenharia). No site dedicado do Chile NÃO entra referência a outros
 * mercados: sai "países/moedas" e entram sinais locais (Ley 20.584 + respaldo
 * cifrado + uptime). O fato de países/moedas segue no SSoT (superclini.facts).
 */
type Item = { key: string; Icon: LucideIcon; values?: Record<string, number> };

export function TrustStrip({ isChile = false }: { isChile?: boolean }) {
  const t = useTranslations("trustStrip");

  const items: Item[] = isChile
    ? [
        { key: "complianceChile", Icon: ShieldCheck },
        { key: "backup", Icon: Database },
        { key: "uptime", Icon: Activity },
      ]
    : [
        { key: "compliance", Icon: ShieldCheck },
        {
          key: "countries",
          Icon: Globe2,
          values: {
            countries: SUPERCLINI_FACTS.countriesCount,
            currencies: SUPERCLINI_FACTS.currenciesCount,
          },
        },
        { key: "uptime", Icon: Activity },
      ];

  return (
    <section className="border-y border-ink-100 bg-ink-50 py-12 dark:border-ink-800 dark:bg-ink-900/60">
      <Container>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400">
          {isChile ? t("titleChile") : t("title")}
        </p>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {items.map(({ key, Icon, values }) => (
            <div
              key={key}
              className="flex items-start gap-3.5 rounded-2xl border border-ink-100 bg-white p-4 transition-colors hover:border-brand-300 dark:border-ink-800 dark:bg-ink-950/40 dark:hover:border-brand-500/40"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-brand"
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold leading-tight text-ink-950 dark:text-white">
                  {t(`items.${key}.label`, values)}
                </p>
                <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">
                  {t(`items.${key}.detail`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
