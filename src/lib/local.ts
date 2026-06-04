import { SITE } from "@/lib/site";
import { VENUE, VENUE_GOOGLE_MAPS_URL } from "@/lib/venue";

/** NAP + données locales — source unique pour le site et schema.org */
export const LOCAL = {
  businessName: SITE.name,
  legalName: SITE.legalName,
  streetAddress: VENUE.line1,
  addressLine2: VENUE.line2,
  neighborhood: "Jardin Lalla Meryem",
  locality: "Agadir",
  region: "Souss-Massa",
  postalCode: "80000",
  countryCode: "MA",
  countryName: "Morocco",
  phone: VENUE.phone,
  phoneTel: VENUE.phoneTel,
  /** Zones recherchées (SEO local « près de moi ») */
  areasServed: [
    "Agadir",
    "Talborjt",
    "Founty",
    "Sonaba",
    "Hay Mohammadi",
    "Inezgane",
  ],
} as const;

export function getFormattedAddress(): string {
  return `${LOCAL.streetAddress}, ${LOCAL.addressLine2}, ${LOCAL.postalCode} ${LOCAL.locality}, ${LOCAL.countryName}`;
}

/** URL fiche Google Maps / Google Business Profile */
export function getGoogleMapsPlaceUrl(): string {
  return VENUE_GOOGLE_MAPS_URL;
}

/** Lien pour laisser un avis — ouvre la fiche Google Maps */
export function getGoogleMapsReviewUrl(): string {
  return VENUE_GOOGLE_MAPS_URL;
}
