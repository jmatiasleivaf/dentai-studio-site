import * as React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg width="32" height="32" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="sc-logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="52" height="52" rx="14" fill="url(#sc-logo-g)" />
        <path
          d="M34 16C34 16 28 14 23 17C18 20 19 25 24 27C29 29 33 30 33 34C33 38 28 41 22 39"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M18 43C22 47 34 47 38 43"
          stroke="#a7f3d0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tight",
          onDark ? "text-white" : "text-ink-900"
        )}
      >
        Super<span className="bg-brand-gradient bg-clip-text text-transparent">Clini</span>
      </span>
    </span>
  );
}
