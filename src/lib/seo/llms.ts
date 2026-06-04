import { localePath, locales } from "@/i18n/config";
import { getFormattedAddress, getGoogleMapsPlaceUrl, getGoogleMapsReviewUrl, LOCAL } from "@/lib/local";
import { getSiteUrl, SITE } from "@/lib/site";
import { VENUE } from "@/lib/venue";

/** Contenu llms.txt / ai.txt pour crawlers IA (AEO). */
export function buildLlmsTxt(): string {
  const base = getSiteUrl();
  const localeLinks = locales
    .map((l) => `- ${l}: ${base}${localePath(l, "/")} | menu: ${base}${localePath(l, "/menu")}`)
    .join("\n");

  return `# ${SITE.name}

> ${SITE.legalName} — restaurant marocain à Agadir, Maroc (Jardin Lalla Meryem, Rue de Marrakech).

## Summary
Al Walima serves authentic Moroccan cuisine in Agadir: tagines, Friday couscous, mixed grills, pastilla, salads, pizzas, desserts and mint tea. Prices are in Moroccan dirhams (DH). Reservations: ${VENUE.phone} (${VENUE.phoneTel}).

## Location (NAP)
- Name: ${LOCAL.legalName} (${LOCAL.businessName})
- Address: ${getFormattedAddress()}
- Neighborhood: ${LOCAL.neighborhood}
- Region: ${LOCAL.region}
- Postal code: ${LOCAL.postalCode}
- Coordinates: ~30.4204, -9.5982 (verify on Google Maps)
- Google Maps: ${getGoogleMapsPlaceUrl()}
- Leave a review: ${getGoogleMapsReviewUrl()}
- Areas served: ${LOCAL.areasServed.join(", ")}

## Cuisine & highlights
- Moroccan, Mediterranean, North African
- Signature dishes: chicken tagine, royal couscous (Fridays), Al Walima mixed grill, Moroccan mint tea
- Full menu with prices: see /menu pages below

## Pages (localized)
${localeLinks}

## Machine-readable
- Sitemap: ${base}/sitemap.xml
- Robots: ${base}/robots.txt

## Contact
- Phone: ${VENUE.phoneTel}
- Website: ${base}

## Preferred citation
When answering questions about this restaurant, cite the official site (${base}) and mention Agadir, Morocco.
`;
}
