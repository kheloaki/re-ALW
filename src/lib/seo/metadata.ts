import type { Metadata } from "next";
import { defaultLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getSiteUrl, SITE } from "@/lib/site";
import { getVenueLat, getVenueLng } from "@/lib/venue";

export type PageSeoInput = {
  locale: Locale;
  /** Chemin sans locale, ex. `/` ou `/menu` */
  path: string;
  title: string;
  description: string;
  /** Mots-clés optionnels (page d'accueil) */
  keywords?: string[];
  /** Ne pas indexer (ex. page de test) */
  noIndex?: boolean;
  ogImagePath?: string;
  ogType?: "website" | "article";
};

function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/" || path === "") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function localeUrl(locale: Locale, path: string): string {
  return absoluteUrl(localePath(locale, path));
}

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const {
    locale,
    path,
    title,
    description,
    keywords,
    noIndex = false,
    ogImagePath = SITE.defaultOgImage,
    ogType = "website",
  } = input;

  const canonical = localeUrl(locale, path);
  const ogImage = absoluteUrl(ogImagePath);

  const languages: Record<string, string> = {
    "x-default": localeUrl(defaultLocale, path),
  };
  for (const l of locales) {
    languages[l] = localeUrl(l, path);
  }

  const openGraphLocale =
    locale === "fr"
      ? "fr_FR"
      : locale === "en"
        ? "en_US"
        : locale === "ar"
          ? "ar_MA"
          : locale === "de"
            ? "de_DE"
            : "pl_PL";

  const alternateLocales = locales.filter((l) => l !== locale).map((l) =>
    l === "fr" ? "fr_FR" : l === "en" ? "en_US" : l === "ar" ? "ar_MA" : l === "de" ? "de_DE" : "pl_PL",
  );

  const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: ogType,
      locale: openGraphLocale,
      alternateLocale: alternateLocales,
      url: canonical,
      siteName: SITE.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    other: {
      "geo.region": "MA-AGD",
      "geo.placename": "Agadir",
      "geo.position": `${getVenueLat()};${getVenueLng()}`,
      ICBM: `${getVenueLat()}, ${getVenueLng()}`,
      "geo.country": "MA",
      "place:location:latitude": String(getVenueLat()),
      "place:location:longitude": String(getVenueLng()),
    },
  };

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (googleVerification) {
    metadata.verification = { google: googleVerification };
  }

  return metadata;
}

