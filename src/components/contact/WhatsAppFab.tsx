"use client";

import { useTranslations } from "next-intl";
import { useCountry } from "@/contexts/CountryContext";
import { isWhatsappCountry, whatsappUrl } from "@/lib/contact-channels";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

/**
 * Canal de WhatsApp persistente, visível em todas as páginas para quem é do
 * Chile. Decide por PAÍS (`useCountry`), não por host: quem cai em
 * `superclini.com/es` pelo Google também é chileno e também precisa do canal.
 * O padrão de client component por país é o mesmo de `PricingMatrix`.
 *
 * Três detalhes de camada que não são óbvios:
 * 1. `z-30` deixa o FAB ATRÁS do drawer do NavBar (z-40) e do Dialog (z-50).
 *    Um FAB flutuando por cima de um modal aberto é defeito clássico.
 * 2. O CookieBanner ocupa a faixa inteira do rodapé em z-[60] e em mobile come
 *    quase meia tela. O FAB sobe pela altura VIVA que o banner publica em
 *    `--sc-consent-h`, não por um offset chutado: com valor fixo o botão
 *    sumia atrás do banner, e some de novo quando o banner cresce no
 *    "Personalizar". Sem banner a variável não existe e o fallback é 0px.
 * 3. O gate NÃO espera o `ready` do CountryContext. O `defaultCountry` já vem
 *    resolvido do servidor e o HTML é servido por requisição (as rotas saem
 *    com `private, no-cache`, verificado em produção), então esperar a
 *    hidratação só atrasaria o botão e o esconderia de quem está sem JS.
 */
export function WhatsAppFab() {
  const { country } = useCountry();
  const t = useTranslations("whatsapp");

  if (!isWhatsappCountry(country.code)) return null;

  return (
    <a
      href={whatsappUrl(t("prefillSales"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("fabAria")}
      title={t("hours")}
      style={{
        bottom: "calc(var(--sc-consent-h, 0px) + env(safe-area-inset-bottom) + 1rem)",
      }}
      className={[
        "fixed right-4 z-30 flex items-center gap-3 rounded-full bg-[#25D366] text-white",
        "shadow-[0_12px_40px_-8px_rgba(37,211,102,0.65)] transition-[bottom,transform] duration-300",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
        // Tap target: 56px em mobile (círculo), pill a partir de sm.
        "h-14 w-14 justify-center sm:h-auto sm:w-auto sm:justify-start sm:py-3 sm:pl-4 sm:pr-5",
      ].join(" ")}
    >
      <WhatsAppGlyph className="h-7 w-7 shrink-0 sm:h-6 sm:w-6" />
      <span className="hidden text-left leading-tight sm:block">
        <span className="block text-sm font-bold">{t("fabLabel")}</span>
        <span className="block text-[11px] font-medium text-white/85">{t("hours")}</span>
      </span>
    </a>
  );
}
