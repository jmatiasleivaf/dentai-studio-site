"use client";

import { IdCard, CalendarCheck, Fingerprint } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { useCountry } from "@/contexts/CountryContext";

const STEPS = [
  { id: "identify", Icon: IdCard },
  { id: "schedule", Icon: CalendarCheck },
  { id: "checkin", Icon: Fingerprint },
] as const;

export function Totem() {
  const t = useTranslations("totem");
  const locale = useLocale();
  const { country } = useCountry();
  void locale;

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map(({ id, Icon }, i) => (
            <article key={id} className="group text-center">
              <div className="relative mx-auto mb-5 inline-block">
                <div
                  aria-hidden
                  className="absolute -inset-2 -z-10 rounded-[2.5rem] bg-brand-gradient opacity-20 blur-xl"
                />
                <div className="relative mx-auto flex h-40 w-32 flex-col items-center justify-center rounded-[2rem] border-[6px] border-ink-900 bg-white p-3 shadow-2xl dark:bg-ink-800">
                  <span className="absolute left-1/2 top-2 h-1 w-8 -translate-x-1/2 rounded-full bg-ink-700" />
                  <Icon className="h-10 w-10 text-brand-500" aria-hidden />
                  <span className="absolute bottom-2 left-1/2 block h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink-700" />
                </div>
              </div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-600 dark:text-brand-400">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-display text-lg font-bold">
                {t(`steps.${id}.title`)}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {t(`steps.${id}.desc`, { taxId: country.taxIdLabel })}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
