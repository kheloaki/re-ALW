/** URL publique du site (sans slash final). */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE = {
  name: "Al Walima",
  legalName: "Restaurant Al Walima",
  /** Compte Google Business / réseaux — à compléter */
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? "",
  defaultOgImage: "/assets/hero-facade.png",
  logo: "/assets/logo-alwalima.png",
} as const;
