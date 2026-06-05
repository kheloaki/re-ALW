import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "@/i18n/config";
import { LOCALE_COOKIE, resolvePreferredLocale } from "@/i18n/detectLocale";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function withLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") /* fichiers statiques */
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];

  if (segment && isLocale(segment)) {
    return withLocaleCookie(NextResponse.next(), segment);
  }

  const locale = resolvePreferredLocale({
    cookieLocale: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  });

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return withLocaleCookie(NextResponse.redirect(url), locale);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets|opengraph-image|twitter-image|icon|apple-icon|sitemap.xml|robots.txt|manifest.webmanifest|ai.txt|llms.txt).*)",
  ],
};
