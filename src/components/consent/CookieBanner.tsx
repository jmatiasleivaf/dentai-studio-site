"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Cookie, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/contexts/ConsentContext";
import { cn } from "@/lib/utils";

/**
 * Banner de consentimento.
 *
 * Regras que a UI precisa respeitar, e que não são estéticas:
 *  - "Recusar" tem o MESMO peso visual de "Aceitar". Botão de recusa apagado
 *    ou escondido é dark pattern e invalida o consentimento (RGPD art. 7(2)).
 *  - Nada vem pré-marcado. O toggle de marketing nasce desligado.
 *  - Fechar no X equivale a recusar, nunca a aceitar. Silêncio não é consentimento.
 *  - Sem cookie-wall: o site funciona inteiro sem aceitar nada.
 */
export function CookieBanner() {
  const t = useTranslations("consent");
  const { ready, bannerOpen, consent, decide, closeBanner } = useConsent();
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  // Reabrindo pelo rodapé, o toggle reflete a escolha vigente.
  React.useEffect(() => {
    if (bannerOpen) setMarketing(consent?.marketing ?? false);
  }, [bannerOpen, consent]);

  if (!ready || !bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="sc-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-ink-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-ink-700 dark:bg-ink-900/95 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 hidden shrink-0 rounded-lg bg-brand-50 p-2 text-brand-600 dark:bg-ink-800 dark:text-brand-400 sm:block">
            <Cookie className="h-5 w-5" aria-hidden />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h2
                id="sc-consent-title"
                className="text-sm font-semibold text-ink-900 dark:text-ink-50"
              >
                {t("title")}
              </h2>
              {/* Fechar = recusar. Nunca aceitar por omissão. */}
              <button
                type="button"
                onClick={() => {
                  decide(false);
                  closeBanner();
                }}
                aria-label={t("actions.close")}
                className="-mr-1 -mt-1 flex h-touch w-touch shrink-0 items-center justify-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800 dark:hover:text-ink-200"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <p className="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {t("body")}{" "}
              <Link
                href="/privacidade"
                className="font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
              >
                {t("policyLink")}
              </Link>
            </p>

            {detailsOpen && (
              <div className="mt-4 space-y-3 rounded-xl bg-ink-50 p-3 dark:bg-ink-800/60">
                {/* Essenciais: travado, informativo. */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-900 dark:text-ink-50">
                      {t("categories.essential.name")}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                      {t("categories.essential.desc")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-ink-200 px-2.5 py-1 text-xs font-medium text-ink-600 dark:bg-ink-700 dark:text-ink-300">
                    {t("categories.essential.always")}
                  </span>
                </div>

                {/* Marketing: nasce desligado, sempre. */}
                <div className="flex items-start justify-between gap-3 border-t border-ink-200 pt-3 dark:border-ink-700">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-900 dark:text-ink-50">
                      {t("categories.marketing.name")}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                      {t("categories.marketing.desc")}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketing}
                    aria-label={t("categories.marketing.name")}
                    onClick={() => setMarketing((v) => !v)}
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      marketing ? "bg-brand-500" : "bg-ink-300 dark:bg-ink-600",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        marketing ? "translate-x-[22px]" : "translate-x-0.5",
                      )}
                    />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              {/* Recusar e aceitar com o MESMO peso visual. */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => decide(false)}
                className="w-full sm:w-auto"
              >
                {t("actions.reject")}
              </Button>

              {detailsOpen ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => decide(marketing)}
                  className="w-full sm:w-auto"
                >
                  {t("actions.save")}
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDetailsOpen(true)}
                  className="w-full sm:w-auto"
                >
                  {t("actions.customize")}
                </Button>
              )}

              <Button
                variant="secondary"
                size="sm"
                onClick={() => decide(true)}
                className="w-full sm:ml-auto sm:w-auto"
              >
                {t("actions.accept")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
