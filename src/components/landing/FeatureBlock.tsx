import * as React from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Bloco de feature com texto de um lado + visual do outro.
 * Use side="right" para visual à direita; "left" inverte (alternar a cada bloco
 * cria ritmo visual em landing pages longas).
 */
export function FeatureBlock({
  eyebrow,
  title,
  description,
  bullets,
  visual,
  side = "right",
  tone = "default",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  bullets?: string[];
  visual: React.ReactNode;
  side?: "right" | "left";
  tone?: "default" | "muted";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={cn("order-2", side === "left" ? "lg:order-2" : "lg:order-1")}>
            {eyebrow ? (
              <span className="inline-block rounded-full bg-brand-100 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-4 font-display text-fluid-2xl font-extrabold leading-tight tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-fluid-base leading-relaxed text-ink-600 dark:text-ink-400">
                {description}
              </p>
            ) : null}
            {bullets && bullets.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-ink-700 dark:text-ink-200">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className={cn("order-1", side === "left" ? "lg:order-1" : "lg:order-2")}>
            {visual}
          </div>
        </div>
      </Container>
    </Section>
  );
}
