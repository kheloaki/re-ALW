import type { Locale } from "@/i18n/config";
import { getMenuExtraLabel } from "@/lib/menu/extraLocales";
import type { MenuCategory, MenuItemLabels } from "@/lib/menu/types";

function mergeLabels(labels: MenuItemLabels, key: string): MenuItemLabels {
  const es = getMenuExtraLabel(key, "es");
  const pl = getMenuExtraLabel(key, "pl");
  const de = getMenuExtraLabel(key, "de");

  return {
    ...labels,
    ...(es ? { es } : {}),
    ...(pl ? { pl } : {}),
    ...(de ? { de } : {}),
  };
}

export function enrichMenuCategories(categories: MenuCategory[]): MenuCategory[] {
  return categories.map((category) => ({
    ...category,
    title: mergeLabels(category.title, category.id),
    subtitle: category.subtitle
      ? mergeLabels(category.subtitle, `${category.id}-subtitle`)
      : undefined,
    items: category.items.map((item) => ({
      ...item,
      name: mergeLabels(item.name, item.id),
      description: item.description
        ? mergeLabels(item.description, `${item.id}-desc`)
        : undefined,
    })),
  }));
}

export function isExtraMenuLocale(locale: Locale): locale is "es" | "pl" | "de" {
  return locale === "es" || locale === "pl" || locale === "de";
}
