import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const LOCALES = ["fr", "en", "es", "ar", "pl", "de"];
const DEFAULT_LOCALE = "fr";
const ROUTES = ["/", "/menu", "/reservation"];
const PRODUCTION_URL = "https://www.restaurantalwalima.com";

function getBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return PRODUCTION_URL;
}

function localePath(locale, path = "/") {
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml() {
  const base = getBaseUrl();
  const lastMod = new Date().toISOString().slice(0, 10);

  const urls = [];

  for (const path of ROUTES) {
    const alternates = [
      { hreflang: "x-default", href: `${base}${localePath(DEFAULT_LOCALE, path)}` },
      ...LOCALES.map((locale) => ({
        hreflang: locale,
        href: `${base}${localePath(locale, path)}`,
      })),
    ];

    const alternateLinks = alternates
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`,
      )
      .join("\n");

    for (const locale of LOCALES) {
      const loc = `${base}${localePath(locale, path)}`;
      const priority = path === "/" ? "1.0" : "0.9";

      urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${alternateLinks}
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

const outputPath = resolve(process.cwd(), "public/sitemap.xml");
const xml = buildSitemapXml();
writeFileSync(outputPath, xml, "utf8");
console.log(`Wrote ${outputPath} (${LOCALES.length * ROUTES.length} URLs)`);
