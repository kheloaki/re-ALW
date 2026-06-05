import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

export const LOCALE_COOKIE = "al-walima-locale";

function matchLocaleTag(tag: string): Locale | null {
  const normalized = tag.trim().toLowerCase().replace(/_/g, "-");
  if (!normalized) return null;

  if (isLocale(normalized)) return normalized;

  const primary = normalized.split("-")[0];
  if (isLocale(primary)) return primary;

  for (const locale of locales) {
    if (primary === locale) return locale;
  }

  return null;
}

/** Best supported locale from an `Accept-Language` header value. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return { tag, q: Number.isFinite(q) ? q : 1, index };
    })
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { tag } of ranked) {
    const locale = matchLocaleTag(tag);
    if (locale) return locale;
  }

  return null;
}

export function resolvePreferredLocale(options: {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  const cookie = options.cookieLocale?.trim();
  if (cookie && isLocale(cookie)) return cookie;

  return localeFromAcceptLanguage(options.acceptLanguage) ?? defaultLocale;
}
