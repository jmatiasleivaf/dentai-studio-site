import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const isValid =
    typeof requested === "string" &&
    (routing.locales as readonly string[]).includes(requested);
  const locale: Locale = isValid ? (requested as Locale) : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
