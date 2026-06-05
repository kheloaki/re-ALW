import type { Locale } from "@/i18n/config";
import { getFormattedAddress, LOCAL } from "@/lib/local";

export type LocalMapCopy = {
  localIntro: string;
  areasTitle: string;
  reviewOnGoogle: string;
  viewOnGoogle: string;
};

const MAP_COPY: Record<Locale, LocalMapCopy> = {
  fr: {
    localIntro:
      "Al Walima est un restaurant marocain à Agadir, situé au Jardin Lalla Meryem (Rue de Marrakech). Idéal pour déjeuner, dîner et réservations de groupe — à quelques minutes du centre-ville, de Talborjt et de la corniche.",
    areasTitle: "Nous accueillons aussi les clients depuis",
    reviewOnGoogle: "Laisser un avis sur Google",
    viewOnGoogle: "Voir sur Google Maps",
  },
  en: {
    localIntro:
      "Al Walima is a Moroccan restaurant in Agadir at Jardin Lalla Meryem (Rue de Marrakech). Perfect for lunch, dinner and group bookings — minutes from downtown, Talborjt and the beachfront.",
    areasTitle: "We welcome guests from",
    reviewOnGoogle: "Leave a review on Google",
    viewOnGoogle: "View on Google Maps",
  },
  es: {
    localIntro:
      "Al Walima es un restaurante marroquí en Agadir, en Jardin Lalla Meryem (Rue de Marrakech). Ideal para almuerzo, cena y reservas de grupo — a pocos minutos del centro, Talborjt y la playa.",
    areasTitle: "También recibimos clientes de",
    reviewOnGoogle: "Dejar una opinión en Google",
    viewOnGoogle: "Ver en Google Maps",
  },
  ar: {
    localIntro:
      "الوليمة مطعم مغربي في أكادير بحي حديقة للا مريم (شارع مراكش). مثالي للغداء والعشاء وحجوزات المجموعات — قريب من وسط المدينة وطلبرجت والكورنيش.",
    areasTitle: "نستقبل الزوار من",
    reviewOnGoogle: "اترك تقييماً على Google",
    viewOnGoogle: "عرض على خرائط Google",
  },
  pl: {
    localIntro:
      "Al Walima to marokańska restauracja w Agadirze (Jardin Lalla Meryem, Rue de Marrakech). Lunch, kolacja i rezerwacje grupowe — blisko centrum, Talborjt i plaży.",
    areasTitle: "Gościmy także gości z",
    reviewOnGoogle: "Dodaj opinię w Google",
    viewOnGoogle: "Zobacz w Google Maps",
  },
  de: {
    localIntro:
      "Al Walima ist ein marokkanisches Restaurant in Agadir im Jardin Lalla Meryem (Rue de Marrakech). Mittag- und Abendessen sowie Gruppenreservierungen — nahe Zentrum, Talborjt und Strand.",
    areasTitle: "Gäste kommen u. a. aus",
    reviewOnGoogle: "Bewertung auf Google abgeben",
    viewOnGoogle: "In Google Maps ansehen",
  },
};

/** Mots-clés SEO local pour meta keywords */
export function getLocalSeoKeywords(locale: Locale): string[] {
  const city =
    locale === "ar" ? "أكادير" : locale === "de" ? "Agadir" : locale === "pl" ? "Agadir" : "Agadir";
  const base = [
    `restaurant marocain ${city}`,
    `restaurant Agadir ${LOCAL.neighborhood}`,
    `restaurant ${LOCAL.neighborhood} Agadir`,
    "tajine Agadir",
    "couscous Agadir",
    "réserver restaurant Agadir",
    "restaurant près de moi Agadir",
  ];
  if (locale === "en") {
    return [
      "Moroccan restaurant Agadir",
      `restaurant Agadir ${LOCAL.neighborhood}`,
      "tagine Agadir",
      "couscous Agadir",
      "book table Agadir",
      "restaurant near me Agadir",
    ];
  }
  if (locale === "es") {
    return [
      "restaurante marroquí Agadir",
      `restaurante Agadir ${LOCAL.neighborhood}`,
      "tajine Agadir",
      "cuscús Agadir",
      "reservar mesa Agadir",
      "restaurante cerca de mí Agadir",
    ];
  }
  if (locale === "ar") {
    return ["مطعم مغربي أكادير", "مطعم أكادير", "طاجين أكادير", "كسكس أكادير", "حجز مطعم أكادير"];
  }
  if (locale === "de") {
    return [
      "marokkanisches Restaurant Agadir",
      "Restaurant Agadir",
      "Tajine Agadir",
      "Couscous Agadir",
      "Tisch reservieren Agadir",
    ];
  }
  if (locale === "pl") {
    return [
      "restauracja marokańska Agadir",
      "restauracja Agadir",
      "tadżin Agadir",
      "kuskus Agadir",
      "rezerwacja Agadir",
    ];
  }
  return base;
}

export function getLocalMapCopy(locale: Locale): LocalMapCopy {
  return MAP_COPY[locale];
}

export function getLocalNapLine(locale: Locale): string {
  void locale;
  return getFormattedAddress();
}
