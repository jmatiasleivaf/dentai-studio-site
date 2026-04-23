"use client";

import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Toggle de tema com 3 estados: light / dark / system. Segmented control.
 * Desktop: pill horizontal. Mobile: mostra só o ícone atual e cicla ao clicar.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  };

  const label =
    theme === "light" ? "Tema claro" : theme === "dark" ? "Tema escuro" : "Tema automático";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50 ${className}`}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}
