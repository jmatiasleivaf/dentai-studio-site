import { ShieldCheck, Globe2, Activity, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function TrustStrip() {
  const t = useTranslations("trustStrip");

  const items = [
    { key: "tests", Icon: CheckCircle2 },
    { key: "compliance", Icon: ShieldCheck },
    { key: "countries", Icon: Globe2 },
    { key: "uptime", Icon: Activity },
  ] as const;

  return (
    <section className="border-y border-ink-100 bg-ink-50 py-10 dark:border-ink-800 dark:bg-ink-900">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400">
          {t("title")}
        </p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex items-center justify-center gap-2.5 text-sm font-medium text-ink-700 dark:text-ink-300"
            >
              <Icon className="h-5 w-5 text-brand-500" aria-hidden />
              <span>{t(`items.${key}`)}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
