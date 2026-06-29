/** Canonical production domain (SEO, sitemap, Open Graph). */
export const PRODUCTION_SITE_URL = "https://www.restaurantalwalima.com";

/** Official Instagram profile. */
export const PRODUCTION_INSTAGRAM_URL = "https://www.instagram.com/restaurantalwalima/";

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Public site URL for canonical, metadataBase, sitemap, etc.
 * Never uses Vercel preview deployment URLs in production.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return normalizeSiteUrl(fromEnv);

  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL?.trim()) {
    return `https://${process.env.VERCEL_URL.trim()}`;
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return normalizeSiteUrl(vercelProduction);

  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  return "http://localhost:3000";
}

export const SITE = {
  name: "Al Walima",
  legalName: "Restaurant Al Walima",
  /** Compte Google Business / réseaux */
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || PRODUCTION_INSTAGRAM_URL,
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? "",
  /** 1200×630 crop of hero — link previews (WhatsApp, Facebook, etc.) */
  defaultOgImage: "/assets/og-share.jpg",
  logo: "/assets/logo-alwalima.avif",
} as const;
