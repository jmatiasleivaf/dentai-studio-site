"use client";

import * as React from "react";
import { Search, FileText, FolderOpen, CornerDownLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { normalize } from "@/lib/help/normalize";
import type { SearchEntry } from "@/lib/help";

/**
 * Busca do Centro de Ayuda — instantânea, 100% client-side sobre um índice
 * gerado no server (buildSearchIndex). Sem dependências: tokeniza a query e
 * casa cada token contra o haystack normalizado de cada entrada.
 */
export function HelpSearch({
  index,
  placeholder,
  ariaLabel,
  popular,
  noResults,
  searchLabel,
}: {
  index: SearchEntry[];
  placeholder: string;
  ariaLabel: string;
  popular: string[];
  noResults: string;
  searchLabel: string;
}) {
  const [query, setQuery] = React.useState("");
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

  const results = React.useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    const tokens = q.split(/\s+/).filter(Boolean);
    return index
      .map((entry) => {
        let score = 0;
        for (const tk of tokens) {
          if (!entry.haystack.includes(tk)) return { entry, score: -1 };
          score += normalize(entry.title).includes(tk) ? 3 : 1;
        }
        if (entry.kind === "article") score += 0.5;
        return { entry, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.entry);
  }, [query, index]);

  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={ref} className="relative mx-auto mt-8 max-w-2xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_24px_64px_-32px_rgba(15,23,42,0.5)]"
      >
        <Search className="h-5 w-5 flex-shrink-0 text-ink-400" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete="off"
          className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-base text-ink-800 outline-none placeholder:text-ink-400"
        />
        <span className="hidden flex-shrink-0 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-brand sm:inline">
          {searchLabel}
        </span>
      </form>

      {/* Chips populares */}
      {!showPanel ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {popular.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                setOpen(true);
              }}
              className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-[13px] text-white/85 transition-colors hover:border-white/40 hover:bg-white/[0.12]"
            >
              {term}
            </button>
          ))}
        </div>
      ) : null}

      {/* Painel de resultados */}
      {showPanel ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-2xl border border-ink-100 bg-white text-left shadow-2xl dark:border-ink-800 dark:bg-ink-900">
          {results.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-ink-500 dark:text-ink-400">{noResults}</p>
          ) : (
            <ul className="max-h-[22rem] overflow-y-auto py-2">
              {results.map((entry) => (
                <li key={`${entry.categorySlug}/${entry.articleSlug ?? ""}`}>
                  <Link
                    href={
                      (entry.articleSlug
                        ? `/ayuda/${entry.categorySlug}/${entry.articleSlug}`
                        : `/ayuda/${entry.categorySlug}`) as never
                    }
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-ink-50 dark:hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300">
                      {entry.kind === "article" ? (
                        <FileText className="h-4 w-4" aria-hidden />
                      ) : (
                        <FolderOpen className="h-4 w-4" aria-hidden />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink-900 dark:text-white">
                        {entry.title}
                      </span>
                      <span className="block truncate text-xs text-ink-500 dark:text-ink-400">{entry.categoryName}</span>
                    </span>
                    <CornerDownLeft className="h-3.5 w-3.5 flex-shrink-0 text-ink-300" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
