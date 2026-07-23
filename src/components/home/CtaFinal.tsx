"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { ContactDialog } from "@/components/home/ContactDialog";

/**
 * Finale único (Direção B, 2026-07-23): substitui a antiga banda escura do Closing
 * + o bloco de CTA em degradê neon (que o Matias marcou como legado e feio) por um
 * painel claro premium. Carrega a assinatura da marca (closing.*) e a conversão
 * (ctaFinal.*) num só lugar, sem o corte cromático agressivo.
 */
export function CtaFinal() {
  const t = useTranslations("ctaFinal");
  const tc = useTranslations("closing");
  const th = useTranslations("hero");

  return (
    <Section tone="default" className="py-24 sm:py-28">
      <Container>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-16 text-center shadow-[0_30px_80px_-40px_rgba(14,165,233,0.4)] dark:border-brand-500/20 dark:from-brand-500/10 dark:via-ink-900 dark:to-ink-900 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl"
          />
          <div className="relative">
            <h2 className="font-display text-display-1 font-semibold text-ink-950 text-balance dark:text-white">
              <span className="block">{tc("title")}</span>
              <span className="block text-brand-600 dark:text-brand-300">{tc("highlight")}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lead text-ink-600 dark:text-ink-300">
              {t("sub")}
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="primary" size="lg" className="group">
                <Link href="/registro">
                  {t("ctaPrimary")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Button>
              <ContactDialog
                trigger={({ onClick }) => (
                  <Button size="lg" variant="outline" onClick={onClick}>
                    <MessageSquare className="h-4 w-4" aria-hidden />
                    {t("ctaSecondary")}
                  </Button>
                )}
              />
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-fluid-xs text-ink-500 dark:text-ink-400">
              {(["noCard", "setup", "cancel"] as const).map((k) => (
                <li key={k} className="flex items-center gap-1.5">
                  <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-500" />
                  {th(`trustItems.${k}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
