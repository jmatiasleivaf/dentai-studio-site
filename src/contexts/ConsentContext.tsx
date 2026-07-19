"use client";

import * as React from "react";
import {
  type Attribution,
  fromSearchParams,
  mergeFirstTouch,
  persistAttribution,
  readAttributionCookie,
} from "@/lib/attribution";
import {
  type ConsentStatus,
  eraseAttributionCookie,
  readConsent,
  writeConsent,
} from "@/lib/consent";

type Ctx = {
  /** null = ainda não perguntamos. Não confundir com "recusou". */
  consent: ConsentStatus;
  /** true depois de ler o cookie no cliente (evita flash do banner). */
  ready: boolean;
  /** Banner aberto? Também abre pelo link "Preferências" do rodapé. */
  bannerOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
  decide: (marketing: boolean) => void;
  /** Envelope em memória — sempre disponível, com ou sem consentimento. */
  attribution: Attribution;
};

const ConsentContext = React.createContext<Ctx | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // Initializers estáveis: regra inviolável do projeto (hydration mismatch).
  const [consent, setConsent] = React.useState<ConsentStatus>(null);
  const [ready, setReady] = React.useState(false);
  const [bannerOpen, setBannerOpen] = React.useState(false);
  const [attribution, setAttribution] = React.useState<Attribution>({});

  React.useEffect(() => {
    const stored = readConsent();
    setConsent(stored);

    // CAMADA 0 — captura da URL para a memória. Não é armazenamento em
    // equipamento terminal, logo não depende de consentimento.
    const url = new URLSearchParams(window.location.search);
    const fresh = fromSearchParams(url, {
      pathname: window.location.pathname,
      referrer: document.referrer || undefined,
    });

    // CAMADA 2 — o cookie só é lido se houver consentimento vigente. Sem ele,
    // um cookie remanescente de antes da revogação é ignorado e apagado.
    const persisted = stored?.marketing ? readAttributionCookie() : {};
    if (!stored?.marketing) eraseAttributionCookie();

    const merged = mergeFirstTouch(persisted, fresh);
    setAttribution(merged);
    persistAttribution(merged, stored);

    // Só abre o banner se houver escolha pendente.
    if (!stored) setBannerOpen(true);
    setReady(true);
  }, []);

  const decide = React.useCallback(
    (marketing: boolean) => {
      const next = writeConsent(marketing);
      setConsent(next);
      setBannerOpen(false);
      // Aceitou agora: o que estava só em memória pode ser persistido.
      if (marketing) persistAttribution(attribution, next);
    },
    [attribution],
  );

  const value = React.useMemo<Ctx>(
    () => ({
      consent,
      ready,
      bannerOpen,
      openBanner: () => setBannerOpen(true),
      closeBanner: () => setBannerOpen(false),
      decide,
      attribution,
    }),
    [consent, ready, bannerOpen, decide, attribution],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): Ctx {
  const ctx = React.useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent precisa estar dentro de <ConsentProvider>");
  return ctx;
}
