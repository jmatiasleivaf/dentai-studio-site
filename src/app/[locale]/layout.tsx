import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CountryProvider } from "@/contexts/CountryContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { SiteProvider } from "@/contexts/SiteContext";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { routing, type Locale } from "@/i18n/routing";
import { COUNTRY_LIST } from "@/lib/countries";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";
import { isChileSite, CHILE_ORIGIN, MAIN_ORIGIN } from "@/lib/site-host";
import { resolveCountryServer } from "@/lib/country-server";
import { MEMBRESIA_CL } from "@/lib/pricing";
import { WHATSAPP_SALES } from "@/lib/contact-channels";
import { WhatsAppFab } from "@/components/contact/WhatsAppFab";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Hreflang multi-país. O conjunto é o MESMO em todas as páginas (principal e
 * Chile), como o Google espera: cada variante lista todas as outras.
 * O Chile ganhou URL própria (subdomínio dedicado), então `es-CL` aponta para
 * `cl.superclini.com/es`; os demais países-com-idioma seguem no domínio
 * principal. `x-default` aponta para o apex, que é o redirecionador por geo
 * (antes apontava para /en, o que não faz sentido para público hispano-LATAM).
 */
function buildLanguageAlternates(): Record<string, string> {
  const entries: [string, string][] = [];
  for (const country of COUNTRY_LIST) {
    const href =
      country.code === "CL"
        ? `${CHILE_ORIGIN}/es`
        : `${MAIN_ORIGIN}/${country.locale}`;
    entries.push([country.intlLocale, href]);
  }
  for (const locale of routing.locales) {
    entries.push([locale, `${MAIN_ORIGIN}/${locale}`]);
  }
  entries.push(["x-default", `${MAIN_ORIGIN}/`]);
  return Object.fromEntries(entries);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  const isChile = await isChileSite();
  // No Chile a versão é sempre es; canonical aponta para o próprio subdomínio.
  const canonical = isChile ? `${CHILE_ORIGIN}/es` : `${MAIN_ORIGIN}/${locale}`;
  const description = t("description", { countries: SUPERCLINI_FACTS.countriesCount });

  return {
    title: t("title"),
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("title"),
      description,
      siteName: t("siteName"),
      locale: locale === "pt" ? "pt_BR" : locale === "en" ? "en_US" : "es_CL",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description,
    },
  };
}

function buildJsonLd(locale: string, description: string, isChile: boolean) {
  const origin = isChile ? CHILE_ORIGIN : MAIN_ORIGIN;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SuperClini",
    url: `${origin}${isChile ? "/es" : ""}`,
    logo: `${MAIN_ORIGIN}/logo-superclini.svg`,
    description,
    foundingDate: String(SUPERCLINI_FACTS.foundedYear),
    // No Chile o schema declara só CL; no principal, todos os países atendidos.
    areaServed: isChile ? ["CL"] : COUNTRY_LIST.map((c) => c.code),
    // Telefone só no host do Chile: é uma linha comercial chilena, e declará-la
    // no schema do domínio principal a ofereceria como canal dos 9 mercados.
    // Aqui a decisão é por HOST de propósito, porque JSON-LD é identidade de
    // URL indexada, não conteúdo servido por geo (que a busca não vê).
    ...(isChile
      ? {
          telephone: WHATSAPP_SALES.e164,
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              telephone: WHATSAPP_SALES.e164,
              areaServed: "CL",
              availableLanguage: ["es"],
            },
          ],
        }
      : {}),
  };
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SuperClini",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Dental Practice Management",
    operatingSystem: "Web, iOS PWA, Android PWA",
    description,
    inLanguage: locale,
    // Chile deixou de ter faixa de preço em 2026-08-04: é uma membresía anual
    // única, então o schema é um Offer só, com o preço NETO da campanha e a
    // data em que ela termina. AggregateOffer aqui declararia planos que não
    // existem mais nesse mercado.
    offers: isChile
      ? {
          "@type": "Offer",
          priceCurrency: "CLP",
          price: String(MEMBRESIA_CL.promo),
          priceValidUntil: MEMBRESIA_CL.campaignEndsAt,
          availability: "https://schema.org/InStock",
          url: `${CHILE_ORIGIN}/es/precios`,
        }
      : {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "29",
          highPrice: "249",
          offerCount: String(SUPERCLINI_FACTS.tiersCount),
          url: `${MAIN_ORIGIN}/${locale}/precios`,
        },
  };
  return [organization, softwareApp];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });
  const description = t("description", { countries: SUPERCLINI_FACTS.countriesCount });
  const isChile = await isChileSite();
  const jsonLd = buildJsonLd(locale, description, isChile);

  // Resolução de país centralizada em country-server.ts: host CL, depois cookie
  // do picker, depois geo do edge, depois idioma. O passo do geo entrou junto
  // com a membresía do Chile, senão a PRIMEIRA visita renderizava a vitrine
  // errada no servidor e só o efeito do cliente corrigia.
  const defaultCountry = await resolveCountryServer(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <SiteProvider isChile={isChile}>
            <CountryProvider defaultCountry={defaultCountry}>
              <ConsentProvider>
                <div className="flex min-h-screen flex-col bg-white text-ink-900 transition-colors dark:bg-ink-950 dark:text-ink-50">
                  <NavBar />
                  <main className="flex-1">{children}</main>
                  <Footer isChile={isChile} />
                </div>
                <CookieBanner />
                {/* Dentro do ConsentProvider: o FAB sobe enquanto o banner
                    de cookies estiver ocupando o rodapé. */}
                <WhatsAppFab />
              </ConsentProvider>
              {jsonLd.map((schema, idx) => (
                <script
                  key={idx}
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
              ))}
            </CountryProvider>
            </SiteProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
