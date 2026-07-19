"use client";

import { useTranslations } from "next-intl";
import { useConsent } from "@/contexts/ConsentContext";

/**
 * Link permanente no rodapé. Revogar tem que ser tão fácil quanto consentir
 * (RGPD art. 7(3)) — sem ele, o consentimento dado pelo banner é frágil.
 */
export function CookiePreferencesButton({ className }: { className?: string }) {
  const t = useTranslations("consent");
  const { openBanner } = useConsent();

  return (
    <button type="button" onClick={openBanner} className={className}>
      {t("preferences")}
    </button>
  );
}
