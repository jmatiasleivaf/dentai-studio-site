import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CountryProvider } from "@/contexts/CountryContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { routing, type Locale } from "@/i18n/routing";
import { COUNTRIES, type CountryCode } from "@/lib/countries";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `https://superclini.com/${l}`])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": "https://superclini.com/en",
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("title"),
      description: t("description"),
      siteName: t("siteName"),
      locale: locale === "pt" ? "pt_BR" : locale === "en" ? "en_US" : "es_CL",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <CountryProvider defaultCountry={defaultCountry}>
          <div className="flex min-h-screen flex-col bg-white text-ink-900 transition-colors dark:bg-ink-950 dark:text-ink-50">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CountryProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
