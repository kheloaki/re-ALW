import { defaultLocale, localePath, locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";

const ROUTES = ["/", "/menu", "/reservation"] as const;

export const dynamic = "force-static";
export const revalidate = 86400;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml(): string {
  const base = getSiteUrl();
  const lastMod = new Date().toISOString().slice(0, 10);

  const urls = ROUTES.map((path) => {
    const priority = path === "/" ? "1.0" : "0.9";
    const loc = `${base}${localePath(defaultLocale, path)}`;

    const alternates = [
      { hreflang: "x-default", href: loc },
      ...locales.map((locale) => ({
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

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternateLinks}
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function GET() {
  const xml = buildSitemapXml();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
