import { cache } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  fr: () => import("@/i18n/dictionaries/fr"),
  en: () => import("@/i18n/dictionaries/en"),
  es: () => import("@/i18n/dictionaries/es"),
  ar: () => import("@/i18n/dictionaries/ar"),
  pl: () => import("@/i18n/dictionaries/pl"),
  de: () => import("@/i18n/dictionaries/de"),
};

export const getDictionary = cache(async (locale: Locale): Promise<Dictionary> => {
  const mod = await loaders[locale]();
  return mod.default;
});
