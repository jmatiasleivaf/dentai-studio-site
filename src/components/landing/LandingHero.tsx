import * as React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

/**
 * Hero padrão de landing page de feature.
 *
 * - `title` aceita ReactNode para permitir gradiente em parte do título.
 * - `primaryCta` e `secondaryCta` recebem ReactNode (geralmente um <ContactDialog />
 *   client component instanciado no page.tsx, que injeta um <Button> como trigger).
 * - `visual` é o lado direito (mockup, screenshot, ilustração). Em mobile fica abaixo.
 */
export function LandingHero({
  badge,
  title,
  sub,
  primaryCta,
  secondaryCta,
  visual,
}: {
  badge?: string;
  title: React.ReactNode;
  sub: string;
  primaryCta: React.ReactNode;
  secondaryCta?: React.ReactNode;
  visual?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] bg-ink-radial"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] mix-blend-overlay bg-noise dark:opacity-[0.04]"
      />

      <Container>
        <div
          className={
            visual
              ? "grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20 xl:gap-24"
              : "mx-auto max-w-3xl text-center"
          }
        >
          <div className={visual ? "text-center lg:text-left" : ""}>
            {badge ? (
              <div
                className={
                  visual
                    ? "flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                    : "flex flex-wrap items-center justify-center gap-2"
                }
              >
                <Badge tone="brand">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  {badge}
                </Badge>
              </div>
            ) : null}

            <h1
              className={`mt-6 font-display text-fluid-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50`}
            >
              {title}
            </h1>

            <p
              className={`mx-auto mt-6 max-w-xl text-fluid-base leading-relaxed text-ink-600 dark:text-ink-400 ${
                visual ? "lg:mx-0" : ""
              }`}
            >
              {sub}
            </p>

            <div
              className={`mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row ${
                visual ? "lg:justify-start" : ""
              }`}
            >
              {primaryCta}
              {secondaryCta}
            </div>
          </div>

          {visual ? <div className="relative">{visual}</div> : null}
        </div>
      </Container>
    </section>
  );
}
