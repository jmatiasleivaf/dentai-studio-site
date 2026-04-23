"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContactDialog } from "@/components/home/ContactDialog";

export function CtaFinal() {
  const t = useTranslations("ctaFinal");

  return (
    <Section tone="brand" className="py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay"
      />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-fluid-3xl font-extrabold leading-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-fluid-base text-white/85">{t("sub")}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <ContactDialog
              defaultInteresse="trial_profesional"
              trigger={({ onClick }) => (
                <Button size="lg" variant="secondary" onClick={onClick}>
                  {t("ctaPrimary")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              )}
            />
            <ContactDialog
              trigger={({ onClick }) => (
                <Button size="lg" variant="dark" onClick={onClick}>
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  {t("ctaSecondary")}
                </Button>
              )}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
