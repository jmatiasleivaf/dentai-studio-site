import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/**
 * Bloco de CTA final em fundo gradient brand.
 * - `primaryCta` e `secondaryCta` são ReactNodes (geralmente ContactDialog
 *   instanciado no page.tsx que renderiza Button como trigger).
 */
export function LandingCTA({
  title,
  sub,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  sub: string;
  primaryCta: React.ReactNode;
  secondaryCta?: React.ReactNode;
}) {
  return (
    <Section tone="brand" className="py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay"
      />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-fluid-3xl font-extrabold leading-tight">{title}</h2>
          <p className="mt-4 text-fluid-base text-white/85">{sub}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            {primaryCta}
            {secondaryCta}
          </div>
        </div>
      </Container>
    </Section>
  );
}
