import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  interactive,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-ink-100 bg-white p-8 shadow-sm transition-all duration-300 dark:border-ink-800 dark:bg-ink-900",
        interactive && "hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover dark:hover:border-brand-500/40",
        className
      )}
      {...props}
    />
  );
}
