import { ShieldCheck, Globe2, Activity, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

export function TrustStrip() {
  const t = useTranslations("trustStrip");

  const items = [
    { key: "tests", Icon: CheckCircle2, values: { count: SUPERCLINI_FACTS.testsCount } },
    { key: "compliance", Icon: ShieldCheck, values: undefined },
    {
      key: "countries",
      Icon: Globe2,
      values: {
        countries: SUPERCLINI_FACTS.countriesCount,
        currencies: SUPERCLINI_FACTS.currenciesCount,
      },
    },
    { key: "uptime", Icon: Activity, values: undefined },
  ];

  return (
    <section className="border-y border-ink-100 bg-ink-50 py-10 dark:border-ink-800 dark:bg-ink-900">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400">
          {t("title")}
        </p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(({ key, Icon, values }) => (
            <div
              key={key}
              className="flex items-center justify-center gap-2.5 text-sm font-medium text-ink-700 dark:text-ink-300"
            >
              <Icon className="h-5 w-5 text-brand-500" aria-hidden />
              <span>{t(`items.${key}`, values)}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
