"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCountry } from "@/contexts/CountryContext";
import { isWhatsappCountry, whatsappUrl } from "@/lib/contact-channels";

/**
 * Botão de WhatsApp do Centro de Ayuda. Substitui o `https://wa.me/message`
 * que estava vivo em produção desde sempre: sem ID, esse link cai numa página
 * genérica do WhatsApp, ou seja era um CTA quebrado nos dois hosts, nos 3
 * idiomas, na home do Centro e nos 54 artigos.
 *
 * Fora do Chile o botão não aparece, porque a linha é chilena e prometer
 * atendimento por ela a um brasileiro é promessa que ninguém cumpre.
 * `ticketFallback` existe porque no aside do artigo o WhatsApp é o ÚNICO CTA:
 * sem substituto, o card ficaria órfão. Na home do Centro o botão de ticket já
 * existe ao lado, então lá o fallback fica desligado para não duplicar.
 */
export function WhatsAppSupportCta({
  className,
  ticketClassName,
  ticketFallback = false,
}: {
  className: string;
  ticketClassName?: string;
  ticketFallback?: boolean;
}) {
  // Sem gate de `ready`: o país já vem resolvido do servidor. Esperar a
  // hidratação aqui trocaria o botão na cara do visitante (ticket vira
  // WhatsApp), que é pior do que o caso raro de cookie divergente.
  const { country } = useCountry();
  const t = useTranslations("help.support");
  const tw = useTranslations("whatsapp");

  if (isWhatsappCountry(country.code)) {
    return (
      <a
        href={whatsappUrl(tw("prefillSupport"))}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
        {t("whatsapp")}
      </a>
    );
  }

  if (!ticketFallback) return null;

  return (
    <Link href={"/contato" as never} className={ticketClassName ?? className}>
      {t("ticket")}
    </Link>
  );
}
