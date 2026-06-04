import { localePath, type Locale } from "@/i18n/config";
import type { PlaceLocalSeoData } from "@/lib/googlePlaceLocal";
import { getGoogleMapsPlaceUrl, LOCAL } from "@/lib/local";
import { MENU_CATEGORIES, menuLabel } from "@/lib/menu";
import { getSiteUrl, SITE } from "@/lib/site";
import { VENUE } from "@/lib/venue";
import { getSeoFaq, getSeoGeo } from "@/lib/seo/content";
import { getVenueLat, getVenueLng } from "@/lib/venue";

type JsonLd = Record<string, unknown>;

function abs(path: string): string {
  const base = getSiteUrl();
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function localeAbs(locale: Locale, path: string): string {
  return abs(localePath(locale, path));
}

const MENU_PAGE_TITLE: Record<Locale, string> = {
  fr: "Carte",
  en: "Menu",
  ar: "قائمة الطعام",
  pl: "Menu",
  de: "Speisekarte",
};

function menuPageTitle(locale: Locale): string {
  return MENU_PAGE_TITLE[locale];
}

function buildPostalAddress(locale: Locale) {
  const geo = getSeoGeo(locale);
  return {
    "@type": "PostalAddress" as const,
    streetAddress: `${LOCAL.streetAddress}, ${LOCAL.addressLine2}`,
    addressLocality: geo.city,
    addressRegion: geo.region,
    postalCode: LOCAL.postalCode,
    addressCountry: LOCAL.countryCode,
  };
}

/** Lieu physique — SEO local / Google Maps */
export function buildPlaceSchema(locale: Locale, place?: PlaceLocalSeoData): JsonLd {
  const geo = getSeoGeo(locale);
  const lat = getVenueLat();
  const lng = getVenueLng();
  const url = localeAbs(locale, "/");
  const mapsUrl = place?.mapsUrl ?? getGoogleMapsPlaceUrl();

  return {
    "@type": "Place",
    "@id": `${url}#place`,
    name: `${SITE.name} — ${geo.neighborhood}`,
    description: `${geo.servesCuisine} — ${geo.city}, ${geo.country}`,
    hasMap: mapsUrl,
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
    address: buildPostalAddress(locale),
    containedInPlace: {
      "@type": "City",
      name: geo.city,
    },
  };
}

/** Restaurant + LocalBusiness — SEO local */
export function buildRestaurantSchema(locale: Locale, place?: PlaceLocalSeoData): JsonLd {
  const geo = getSeoGeo(locale);
  const lat = getVenueLat();
  const lng = getVenueLng();
  const url = localeAbs(locale, "/");
  const mapsUrl = place?.mapsUrl ?? getGoogleMapsPlaceUrl();

  const sameAs = [mapsUrl, SITE.instagramUrl, SITE.facebookUrl].filter(
    (v, i, a) => Boolean(v) && a.indexOf(v) === i,
  );

  const schema: JsonLd = {
    "@type": ["Restaurant", "FoodEstablishment"],
    "@id": `${url}#restaurant`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description: `${geo.servesCuisine} à ${geo.city} — ${geo.neighborhood}, ${geo.region}.`,
    url,
    telephone: LOCAL.phoneTel,
    image: [abs(SITE.defaultOgImage), abs("/assets/gallery-table-spread.avif"), abs("/assets/gallery-tajine-chicken.avif")],
    logo: abs(SITE.logo),
    priceRange: geo.priceRange,
    servesCuisine: ["Moroccan", "Mediterranean", "North African"],
    acceptsReservations: true,
    menu: localeAbs(locale, "/menu"),
    hasMap: mapsUrl,
    hasMenu: {
      "@type": "Menu",
      "@id": `${localeAbs(locale, "/menu")}#menu`,
      url: localeAbs(locale, "/menu"),
      name: `${SITE.name} — Menu`,
    },
    address: buildPostalAddress(locale),
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
    areaServed: [
      ...LOCAL.areasServed.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: geo.region },
      { "@type": "Country", name: geo.country },
    ],
    containedInPlace: { "@id": `${url}#place` },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "00:00",
      },
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `tel:${LOCAL.phoneTel}`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        result: {
          "@type": "FoodEstablishmentReservation",
          name: "Table reservation",
        },
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };

  if (place?.rating != null && place.reviewCount != null) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: place.rating,
      reviewCount: place.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (place?.reviews.length) {
    schema.review = place.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: r.rating
        ? { "@type": "Rating", ratingValue: r.rating, bestRating: 5 }
        : undefined,
      reviewBody: r.text,
      datePublished: r.datePublished,
    }));
  }

  return schema;
}

export function buildWebSiteSchema(locale: Locale): JsonLd {
  const url = localeAbs(locale, "/");
  return {
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name: SITE.name,
    description: getSeoGeo(locale).servesCuisine,
    inLanguage: locale,
    publisher: { "@id": `${url}#restaurant` },
    potentialAction: {
      "@type": "ReadAction",
      target: [localeAbs(locale, "/menu"), url],
    },
  };
}

export function buildOrganizationSchema(locale: Locale): JsonLd {
  const url = localeAbs(locale, "/");
  return {
    "@type": "Organization",
    "@id": `${url}#organization`,
    name: SITE.legalName,
    url,
    logo: abs(SITE.logo),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: VENUE.phoneTel,
      contactType: "reservations",
      areaServed: "MA",
      availableLanguage: ["French", "English", "Arabic"],
    },
  };
}

export function buildWebPageSchema(
  locale: Locale,
  path: string,
  name: string,
  description: string,
): JsonLd {
  const url = localeAbs(locale, path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${localeAbs(locale, "/")}#website` },
    about: { "@id": `${localeAbs(locale, "/")}#restaurant` },
  };
}

export function buildBreadcrumbSchema(
  locale: Locale,
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: localeAbs(locale, item.path),
    })),
  };
}

/** FAQPage — AEO (ChatGPT, Perplexity, Google AI) */
export function buildFaqPageSchema(locale: Locale): JsonLd {
  const faqs = getSeoFaq(locale);
  return {
    "@type": "FAQPage",
    "@id": `${localeAbs(locale, "/")}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** Menu ItemList pour rich results / AEO */
export function buildMenuSchema(locale: Locale): JsonLd {
  const menuUrl = localeAbs(locale, "/menu");
  const sections = MENU_CATEGORIES.map((cat) => ({
    "@type": "MenuSection",
    name: menuLabel(cat.title, locale),
    description: cat.subtitle ? menuLabel(cat.subtitle, locale) : undefined,
    hasMenuItem: cat.items.map((item) => ({
      "@type": "MenuItem",
      name: menuLabel(item.name, locale),
      description: item.description ? menuLabel(item.description, locale) : undefined,
      offers: {
        "@type": "Offer",
        price: item.priceDh,
        priceCurrency: "MAD",
      },
    })),
  }));

  return {
    "@type": "Menu",
    "@id": `${menuUrl}#menu`,
    name: `${SITE.name} — ${menuPageTitle(locale)}`,
    url: menuUrl,
    inLanguage: locale,
    hasMenuSection: sections,
  };
}

export function buildJsonLdGraph(locale: Locale, nodes: JsonLd[]): string {
  const graph = nodes.map((node) => ({
    ...node,
    "@context": undefined,
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

export function getGlobalSchemas(locale: Locale, place?: PlaceLocalSeoData): JsonLd[] {
  return [
    buildOrganizationSchema(locale),
    buildWebSiteSchema(locale),
    buildPlaceSchema(locale, place),
    buildRestaurantSchema(locale, place),
  ];
}

/** Schémas propres à la page d'accueil (les globaux sont dans le layout). */
export function getHomePageSchemas(
  locale: Locale,
  pageTitle: string,
  pageDescription: string,
): JsonLd[] {
  return [
    buildWebPageSchema(locale, "/", pageTitle, pageDescription),
    buildBreadcrumbSchema(locale, [{ name: SITE.name, path: "/" }]),
    buildFaqPageSchema(locale),
  ];
}

/** Schémas propres à la page menu (les globaux sont dans le layout). */
export function getMenuPageSchemas(
  locale: Locale,
  pageTitle: string,
  pageDescription: string,
  homeLabel: string,
  menuLabelText: string,
): JsonLd[] {
  return [
    buildWebPageSchema(locale, "/menu", pageTitle, pageDescription),
    buildBreadcrumbSchema(locale, [
      { name: homeLabel, path: "/" },
      { name: menuLabelText, path: "/menu" },
    ]),
    buildMenuSchema(locale),
  ];
}

export function getReservationPageSchemas(
  locale: Locale,
  pageTitle: string,
  pageDescription: string,
  homeLabel: string = SITE.name,
  reservationLabel?: string,
): JsonLd[] {
  const label = reservationLabel ?? pageTitle;
  return [
    buildWebPageSchema(locale, "/reservation", pageTitle, pageDescription),
    buildBreadcrumbSchema(locale, [
      { name: homeLabel, path: "/" },
      { name: label, path: "/reservation" },
    ]),
  ];
}
