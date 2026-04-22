import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em]",
  {
    variants: {
      tone: {
        brand: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
        onBrand: "bg-white/15 text-white backdrop-blur",
        success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
        warn: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
        ai: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
        neutral: "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-300",
      },
    },
    defaultVariants: { tone: "brand" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}
