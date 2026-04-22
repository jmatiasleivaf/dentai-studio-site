import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "dark" | "brand";

export function Section({
  className,
  children,
  tone = "default",
  id,
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: Tone; id?: string }) {
  const toneMap: Record<Tone, string> = {
    default: "bg-white text-ink-900 dark:bg-ink-950 dark:text-ink-50",
    muted: "bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-50",
    dark: "bg-ink-950 text-white",
    brand: "bg-brand-gradient text-white",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden py-20 sm:py-24 lg:py-28",
        toneMap[tone],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  className,
  align = "center",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <h2 className="mt-5 font-display text-fluid-3xl font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h2>
      ) : null}
      {sub ? (
        <p className="mt-5 text-fluid-base leading-relaxed text-ink-600 dark:text-ink-400">
          {sub}
        </p>
      ) : null}
    </header>
  );
}
