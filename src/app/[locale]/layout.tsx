import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Inter, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CountryProvider } from "@/contexts/CountryContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { routing, type Locale } from "@/i18n/routing";
import { COUNTRIES, COUNTRY_LIST, type CountryCode } from "@/lib/countries";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

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
 * Hreflang multi-país: cada país-com-idioma vira uma tag apontando para a URL
 * do seu locale base. Google entende e serve a versão certa por geo. Quando
 * tivermos subpastas por país (Wave 5), trocamos para URLs distintas.
 */
function buildLanguageAlternates(): Record<string, string> {
  const entries: [string, string][] = [];
  for (const country of COUNTRY_LIST) {
    entries.push([country.intlLocale, `https://superclini.com/${country.locale}`]);
  }
  for (const locale of routing.locales) {
    entries.push([locale, `https://superclini.com/${locale}`]);
  }
  entries.push(["x-default", "https://superclini.com/en"]);
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

  const canonical = `https://superclini.com/${locale}`;
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

function buildJsonLd(locale: string, description: string) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SuperClini",
    url: "https://superclini.com",
    logo: "https://superclini.com/logo-superclini.svg",
    description,
    foundingDate: String(SUPERCLINI_FACTS.foundedYear),
    areaServed: COUNTRY_LIST.map((c) => c.code),
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
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "29",
      highPrice: "249",
      offerCount: String(SUPERCLINI_FACTS.tiersCount),
      url: `https://superclini.com/${locale}#pricing`,
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
  const jsonLd = buildJsonLd(locale, description);

  const cookieStore = await cookies();
  const cookieCountry = cookieStore.get("NEXT_COUNTRY")?.value?.toUpperCase();
  const defaultCountry =
    cookieCountry && (COUNTRIES as Record<string, unknown>)[cookieCountry]
      ? (cookieCountry as CountryCode)
      : locale === "pt"
      ? "BR"
      : locale === "en"
      ? "US"
      : "CL";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <CountryProvider defaultCountry={defaultCountry}>
              <div className="flex min-h-screen flex-col bg-white text-ink-900 transition-colors dark:bg-ink-950 dark:text-ink-50">
                <NavBar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              {jsonLd.map((schema, idx) => (
                <script
                  key={idx}
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
              ))}
            </CountryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
