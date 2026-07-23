"use client";

import * as React from "react";

const STORAGE_KEY = "superclini-theme";

/**
 * Tema travado em CLARO (2026-07-23): o seletor de tema foi removido do site.
 * O Provider agora só garante que nenhuma classe `dark` persista (ex.: valor
 * antigo em localStorage de visitante recorrente) e que o site renderize sempre
 * claro. As variantes `dark:` do Tailwind seguem no código, mas ficam inertes
 * porque a classe `dark` nunca entra no <html>.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* privacy mode */
    }
  }, []);

  return <>{children}</>;
}
