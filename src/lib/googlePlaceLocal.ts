import type { Locale } from "@/i18n/config";
import { getGoogleMapsPlaceUrl } from "@/lib/local";

export type PlaceReviewSnippet = {
  author: string;
  rating?: number;
  text: string;
  datePublished?: string;
};

export type PlaceLocalSeoData = {
  mapsUrl: string;
  rating?: number;
  reviewCount?: number;
  reviews: PlaceReviewSnippet[];
  openingHoursText: string[];
  formattedAddress?: string;
};

/** Données locales statiques — horaires via i18n, avis via le marquee du site. */
export function getPlaceLocalSeo(_locale: Locale = "fr"): PlaceLocalSeoData {
  return {
    mapsUrl: getGoogleMapsPlaceUrl(),
    reviews: [],
    openingHoursText: [],
  };
}
