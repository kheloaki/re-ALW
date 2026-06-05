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

function buildLocalePagesSitemap(base, locale, lastMod) {
  const alternates = (path) => [
    { hreflang: "x-default", href: `${base}${localePath(DEFAULT_LOCALE, path)}` },
    ...LOCALES.map((code) => ({
      hreflang: code,
      href: `${base}${localePath(code, path)}`,
    })),
  ];

  const urls = ROUTES.map((path) => {
    const loc = `${base}${localePath(locale, path)}`;
    const priority = path === "/" ? "1.0" : "0.9";
    const alternateLinks = alternates(path)
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`,
      )
      .join("\n");

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${alternateLinks}
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function buildSitemapIndex(base, lastMod) {
  const entries = LOCALES.map((locale) => {
    const loc = `${base}/sitemap-pages-${locale}.xml`;
    return `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
}

const publicDir = resolve(process.cwd(), "public");
const base = getBaseUrl();
const lastMod = new Date().toISOString();

writeFileSync(resolve(publicDir, "sitemap.xml"), buildSitemapIndex(base, lastMod), "utf8");

for (const locale of LOCALES) {
  const filename = `sitemap-pages-${locale}.xml`;
  writeFileSync(resolve(publicDir, filename), buildLocalePagesSitemap(base, locale, lastMod), "utf8");
}

console.log(
  `Wrote sitemap.xml (index) + ${LOCALES.length} locale sitemaps (${LOCALES.length * ROUTES.length} URLs total)`,
);
