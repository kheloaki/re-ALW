/** Adresse affichée sur le site et utilisée pour la carte / itinéraires. */
export const VENUE = {
  name: "Restaurant Al Walima",
  line1: "Jardin Lalla Meryem, Bloc 1",
  line2: "Rue de Marrakech, Agadir",
  phone: "+212 6 27 71 15 14",
  /** Pour liens tel: */
  phoneTel: "+212627711514",
  /** Requête de recherche pour l’iframe Maps (sans clé API). */
  mapsSearchQuery: "Al Walima Agadir Jardin Lalla Meryem Rue Marrakech",
  /** GPS — SEO schema.org + meta geo (pas besoin de .env). */
  lat: 30.4204,
  lng: -9.5982,
} as const;

const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapsSearchQuery)}`;

/** Fiche Google Maps (lien public, sans clé API). */
export const VENUE_GOOGLE_MAPS_URL = MAPS_SEARCH_URL;

export function getVenueDirectionsUrl(): string {
  const dest = encodeURIComponent(`${VENUE.line1}, ${VENUE.line2}, Maroc`);
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
}

/** Carte intégrée — iframe Google sans clé API. */
export function getGoogleMapsEmbedSrc(): string {
  const q = encodeURIComponent(VENUE.mapsSearchQuery);
  return `https://maps.google.com/maps?q=${q}&hl=fr&z=16&output=embed`;
}

export function getVenueLat(): number {
  return VENUE.lat;
}

export function getVenueLng(): number {
  return VENUE.lng;
}
