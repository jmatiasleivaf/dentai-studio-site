import type { Locale } from "@/i18n/routing";

export type CountryCode =
  | "CL"
  | "BR"
  | "CO"
  | "AR"
  | "MX"
  | "PE"
  | "US"
  | "ES"
  | "PT";

export type CurrencyCode =
  | "CLP"
  | "BRL"
  | "COP"
  | "ARS"
  | "MXN"
  | "PEN"
  | "USD"
  | "EUR";

export type CountryConfig = {
  code: CountryCode;
  name: Record<Locale, string>;
  flag: string;
  locale: Locale;
  intlLocale: string; // tag BCP-47 para Intl.NumberFormat/DateTimeFormat
  currency: CurrencyCode;
  currencyDecimals: 0 | 2;
  taxIdLabel: string; // RUT / CPF / NIT / etc.
  paymentMethods: string[]; // keys em messages (paymentMethods.*)
};

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  CL: {
    code: "CL",
    name: { es: "Chile", pt: "Chile", en: "Chile" },
    flag: "🇨🇱",
    locale: "es",
    intlLocale: "es-CL",
    currency: "CLP",
    currencyDecimals: 0,
    taxIdLabel: "RUT",
    paymentMethods: ["cash", "transfer", "credit", "debit", "check"],
  },
  BR: {
    code: "BR",
    name: { es: "Brasil", pt: "Brasil", en: "Brazil" },
    flag: "🇧🇷",
    locale: "pt",
    intlLocale: "pt-BR",
    currency: "BRL",
    currencyDecimals: 2,
    taxIdLabel: "CPF",
    paymentMethods: ["cash", "pix", "credit", "debit", "boleto", "transfer"],
  },
  CO: {
    code: "CO",
    name: { es: "Colombia", pt: "Colômbia", en: "Colombia" },
    flag: "🇨🇴",
    locale: "es",
    intlLocale: "es-CO",
    currency: "COP",
    currencyDecimals: 0,
    taxIdLabel: "NIT",
    paymentMethods: ["cash", "transfer", "pse", "credit", "debit"],
  },
  AR: {
    code: "AR",
    name: { es: "Argentina", pt: "Argentina", en: "Argentina" },
    flag: "🇦🇷",
    locale: "es",
    intlLocale: "es-AR",
    currency: "ARS",
    currencyDecimals: 2,
    taxIdLabel: "DNI",
    paymentMethods: ["cash", "transfer", "credit", "debit", "mercadopago"],
  },
  MX: {
    code: "MX",
    name: { es: "México", pt: "México", en: "Mexico" },
    flag: "🇲🇽",
    locale: "es",
    intlLocale: "es-MX",
    currency: "MXN",
    currencyDecimals: 2,
    taxIdLabel: "RFC",
    paymentMethods: ["cash", "transfer", "oxxo", "spei", "credit", "debit"],
  },
  PE: {
    code: "PE",
    name: { es: "Perú", pt: "Peru", en: "Peru" },
    flag: "🇵🇪",
    locale: "es",
    intlLocale: "es-PE",
    currency: "PEN",
    currencyDecimals: 2,
    taxIdLabel: "DNI",
    paymentMethods: ["cash", "transfer", "yape", "plin", "credit", "debit"],
  },
  US: {
    code: "US",
    name: { es: "Estados Unidos", pt: "Estados Unidos", en: "United States" },
    flag: "🇺🇸",
    locale: "en",
    intlLocale: "en-US",
    currency: "USD",
    currencyDecimals: 2,
    taxIdLabel: "SSN",
    paymentMethods: ["cash", "credit", "debit", "wire", "check", "insurance"],
  },
  ES: {
    code: "ES",
    name: { es: "España", pt: "Espanha", en: "Spain" },
    flag: "🇪🇸",
    locale: "es",
    intlLocale: "es-ES",
    currency: "EUR",
    currencyDecimals: 2,
    taxIdLabel: "NIF",
    paymentMethods: ["cash", "transfer", "credit", "debit", "bizum"],
  },
  PT: {
    code: "PT",
    name: { es: "Portugal", pt: "Portugal", en: "Portugal" },
    flag: "🇵🇹",
    locale: "pt",
    intlLocale: "pt-PT",
    currency: "EUR",
    currencyDecimals: 2,
    taxIdLabel: "NIF",
    paymentMethods: ["cash", "transfer", "credit", "debit"],
  },
};

export const COUNTRY_LIST: CountryConfig[] = Object.values(COUNTRIES);

export function getCountry(code: string | null | undefined): CountryConfig | null {
  if (!code) return null;
  const normalized = code.toUpperCase() as CountryCode;
  return COUNTRIES[normalized] || null;
}

export function localeFromCountry(code: string): Locale | null {
  const country = getCountry(code);
  return country?.locale || null;
}

export function formatCurrency(amount: number, country: CountryConfig): string {
  return new Intl.NumberFormat(country.intlLocale, {
    style: "currency",
    currency: country.currency,
    minimumFractionDigits: country.currencyDecimals,
    maximumFractionDigits: country.currencyDecimals,
  }).format(amount);
}
