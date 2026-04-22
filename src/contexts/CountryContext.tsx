"use client";

import * as React from "react";
import { COUNTRIES, type CountryCode, type CountryConfig } from "@/lib/countries";

type Ctx = {
  country: CountryConfig;
  setCountry: (code: CountryCode) => void;
  ready: boolean;
};

const CountryContext = React.createContext<Ctx | null>(null);

const COOKIE_NAME = "NEXT_COUNTRY";
const COOKIE_MAXAGE = 60 * 60 * 24 * 30;

function readCookie(): CountryCode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)NEXT_COUNTRY=([^;]+)/);
  const raw = match?.[1]?.toUpperCase() as CountryCode | undefined;
  return raw && COUNTRIES[raw] ? raw : null;
}

function writeCookie(code: CountryCode) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${code}; path=/; max-age=${COOKIE_MAXAGE}; samesite=lax`;
}

export function CountryProvider({
  children,
  defaultCountry = "CL",
}: {
  children: React.ReactNode;
  defaultCountry?: CountryCode;
}) {
  // Padrão SSR-safe (regra inviolável do app: initializer estável).
  const [code, setCode] = React.useState<CountryCode>(defaultCountry);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const fromCookie = readCookie();
    if (fromCookie && fromCookie !== code) setCode(fromCookie);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCountry = React.useCallback((next: CountryCode) => {
    setCode(next);
    writeCookie(next);
  }, []);

  const value = React.useMemo<Ctx>(
    () => ({ country: COUNTRIES[code], setCountry, ready }),
    [code, setCountry, ready]
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry(): Ctx {
  const ctx = React.useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used inside <CountryProvider>");
  return ctx;
}
