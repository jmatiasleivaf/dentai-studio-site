import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AsociadosHero } from "@/components/asociados/AsociadosHero";
import { PorQueAhora } from "@/components/asociados/PorQueAhora";
import { RepartoTrabajo } from "@/components/asociados/RepartoTrabajo";
import { ComoGanas } from "@/components/asociados/ComoGanas";
import { Renovacion } from "@/components/asociados/Renovacion";
import { Bonos } from "@/components/asociados/Bonos";
import { LoQueTeDamos } from "@/components/asociados/LoQueTeDamos";
import { Perfil } from "@/components/asociados/Perfil";
import { Proceso } from "@/components/asociados/Proceso";
import { Reglas } from "@/components/asociados/Reglas";
import { Postulacion } from "@/components/asociados/Postulacion";
import { isChileSite, CHILE_ORIGIN, MAIN_ORIGIN } from "@/lib/site-host";

/**
 * /asociados, recrutamento do Programa de Asociados de Chile.
 *
 * A URL é a que já circula no material comercial (superclini.com/asociados),
 * por isso o path não muda.
 *
 * MONO-IDIOMA POR DECISÃO: o programa existe só no Chile. Publicar a página em
 * pt e en indexaria em mercados onde ninguém pode ser aceito e geraria
 * candidatura que só rende uma recusa. `/pt/asociados` e `/en/asociados`
 * devolvem 301 para `/es/asociados`, preservando qualquer link que já tenha
 * sido compartilhado nesses prefixos.
 *
 * As chaves i18n existem nos três `messages/*.json` mesmo assim. Se um dia o
 * redirect sair, o build continua passando e a página renderiza, em vez de
 * quebrar em runtime com MISSING_MESSAGE, que é o modo de falha que este
 * projeto já teve.
 */

const LOCALE = "es";

export function generateStaticParams() {
  return [{ locale: LOCALE }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: LOCALE, namespace: "asociadosPage.meta" });
  const origin = (await isChileSite()) ? CHILE_ORIGIN : MAIN_ORIGIN;
  const canonical = `${origin}/${LOCALE}/asociados`;

  return {
    title: t("title"),
    description: t("description"),
    // Uma única URL canônica: a página só existe em espanhol, então declarar
    // alternates pt e en apontaria o Google para URLs que redirecionam.
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    // Enquanto o locale não for es o conteúdo servido é um redirect, mas se
    // algum crawler chegar antes de segui-lo, não vale indexar.
    robots: locale === LOCALE ? undefined : { index: false, follow: true },
  };
}

export default async function AsociadosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== LOCALE) permanentRedirect(`/${LOCALE}/asociados`);

  setRequestLocale(LOCALE);

  return (
    <>
      <AsociadosHero />
      <PorQueAhora />
      <RepartoTrabajo />
      <ComoGanas />
      <Renovacion />
      <Bonos />
      <LoQueTeDamos />
      <Perfil />
      <Proceso />
      <Reglas />
      <Postulacion />
    </>
  );
}
