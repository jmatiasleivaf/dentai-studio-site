"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/i18n/routing";

const LABEL: Record<Locale, string> = {
  es: "ES",
  pt: "PT",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function pick(next: Locale) {
    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    }
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-touch-md items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
      >
        <Globe className="h-4 w-4" aria-hidden />
        {LABEL[locale]}
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-ink-100 bg-white shadow-lg dark:border-ink-800 dark:bg-ink-900"
        >
          {LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => pick(l)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink-800 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
              >
                <span>{LABEL[l]}</span>
                {l === locale ? (
                  <span className="text-brand-600 dark:text-brand-400">●</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
