import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";

const ROUTES = ["", "/menu", "/reservation"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const languageAlternates = (path: string) =>
    Object.fromEntries(
      locales.map((locale) => [locale, `${base}${localePath(locale, path)}`]),
    );

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of ROUTES) {
      const path = route || "/";
      entries.push({
        url: `${base}${localePath(locale, path)}`,
        lastModified,
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.9,
        alternates: {
          languages: languageAlternates(path),
        },
      });
    }
  }

  return entries;
}
