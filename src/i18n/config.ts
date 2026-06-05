export const locales = ["fr", "en", "es", "ar", "pl", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  ar: "العربية",
  pl: "Polski",
  de: "Deutsch",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Chemin localisé : `/fr`, `/en/menu`, etc. */
export function localePath(locale: Locale, path: string = "/"): string {
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripLocaleFromPathname(pathname: string): { locale: Locale | null; pathname: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first)) {
    const rest = segments.slice(1).join("/");
    return { locale: first, pathname: rest ? `/${rest}` : "/" };
  }
  return { locale: null, pathname };
}
