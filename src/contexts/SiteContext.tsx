"use client";

import * as React from "react";

/**
 * Expõe ao cliente se estamos na versão dedicada do Chile (cl.superclini.com).
 * O valor é decidido no servidor pelo host (ver `@/lib/site-host`) e injetado
 * pelo layout. Componentes client (NavBar, LocaleSwitcher, Pricing) usam isto
 * para travar o país e esconder o que não faz sentido num site mono-país.
 */
type SiteCtx = { isChile: boolean };

const SiteContext = React.createContext<SiteCtx>({ isChile: false });

export function SiteProvider({
  isChile,
  children,
}: {
  isChile: boolean;
  children: React.ReactNode;
}) {
  const value = React.useMemo<SiteCtx>(() => ({ isChile }), [isChile]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteCtx {
  return React.useContext(SiteContext);
}
