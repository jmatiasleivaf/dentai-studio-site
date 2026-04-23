"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "superclini-theme";

interface ThemeContextValue {
  theme: Theme;
  resolved: "light" | "dark"; // Valor concreto após resolver "system"
  setTheme: (t: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function resolveSystem(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyToDocument(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

/**
 * Provider SSR-safe: inicia com "system" fixo e só lê localStorage dentro do
 * useEffect. Isso garante que server e client renderizam o mesmo HTML na
 * primeira passada — o <ThemeBootstrap> no <head> aplica a classe `dark`
 * antes do React hidratar para evitar FOUC.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("system");
  const [resolved, setResolved] = React.useState<"light" | "dark">("light");

  // Lê localStorage + subscreve mudanças no prefers-color-scheme
  React.useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
    setThemeState(stored);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const current = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
      const r = current === "system" ? (mq.matches ? "dark" : "light") : current;
      setResolved(r as "light" | "dark");
      applyToDocument(r as "light" | "dark");
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* privacy mode */
    }
    const r = t === "system" ? resolveSystem() : t;
    setResolved(r);
    applyToDocument(r);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
