import { localePath, type Locale } from "@/i18n/config";

export function routesFor(locale: Locale) {
  return {
    home: localePath(locale, "/"),
    menu: localePath(locale, "/menu"),
    reservation: localePath(locale, "/reservation"),
  } as const;
}
