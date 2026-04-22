import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, type Locale, LOCALES, DEFAULT_LOCALE } from "@/i18n/routing";
import { localeFromCountry } from "@/lib/countries";

const intlMiddleware = createMiddleware(routing);

/**
 * Padrão robusto de geolocalização (Stripe/Vercel/Linear):
 * 1. Se cookie NEXT_LOCALE existe → respeita (escolha manual anterior)
 * 2. Geo via edge headers (Vercel: x-vercel-ip-country | Cloudflare: cf-ipcountry)
 * 3. Accept-Language do browser
 * 4. Fallback: DEFAULT_LOCALE (es)
 *
 * País também é passado via cookie NEXT_COUNTRY para moeda/fiscal no preço.
 */
function detectLocale(req: NextRequest): { locale: Locale; country: string | null } {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
  const countryHeader =
    req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || null;

  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    return { locale: cookieLocale, country: countryHeader };
  }

  if (countryHeader) {
    const fromCountry = localeFromCountry(countryHeader);
    if (fromCountry) return { locale: fromCountry, country: countryHeader };
  }

  const acceptLang = req.headers.get("accept-language")?.toLowerCase() || "";
  if (acceptLang.startsWith("pt")) return { locale: "pt", country: countryHeader };
  if (acceptLang.startsWith("en")) return { locale: "en", country: countryHeader };
  if (acceptLang.startsWith("es")) return { locale: "es", country: countryHeader };

  return { locale: DEFAULT_LOCALE, country: countryHeader };
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect apex "/" para locale apropriado
  if (pathname === "/" || pathname === "") {
    const { locale, country } = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;

    const res = NextResponse.redirect(url);
    if (country) {
      res.cookies.set("NEXT_COUNTRY", country, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
    }
    return res;
  }

  const res = intlMiddleware(req);
  // Propaga cookie de país nas respostas (para preço detectado)
  const { country } = detectLocale(req);
  if (country && !req.cookies.get("NEXT_COUNTRY")) {
    res.cookies.set("NEXT_COUNTRY", country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  matcher: [
    // Aplica em todas as rotas exceto:
    // - /api (backend)
    // - /_next (estáticos Next)
    // - /_vercel (build artifacts)
    // - arquivos com extensão (favicon, ogimage, etc.)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
