import { getGoogleMapsPlaceUrl } from "@/lib/local";

export type MarqueeReview = {
  quote: string;
  author: string;
  rating?: number;
};

/** Avis affichés sur le site (sans API Google). */
export const reviewsMarqueeFallback: { rowLeft: MarqueeReview[]; rowRight: MarqueeReview[] } = {
  rowLeft: [
    { quote: "Une découverte incroyable — tajine parfait et accueil chaleureux.", author: "Sophie M." },
    { quote: "Le couscous royal est à tomber. On reviendra sans hésiter.", author: "Karim B." },
    { quote: "Ambiance féerique, service impeccable. Une perle à Agadir.", author: "Claire D." },
    { quote: "Le thé à la menthe servi avec élégance. Cuisine authentique.", author: "Youssef L." },
    { quote: "Soirée inoubliable entre amis. Portions généreuses et savoureuses.", author: "Amélie R." },
  ],
  rowRight: [
    { quote: "Best Moroccan meal we had in Morocco. The lamb was melt-in-your-mouth.", author: "James T." },
    { quote: "Romantic setting, live flavors. The pastilla was exceptional.", author: "Elena V." },
    { quote: "Family dinner done right — kids loved it, adults even more.", author: "Marc & Julie" },
    { quote: "Five stars for hospitality. Felt like guests, not customers.", author: "David K." },
    { quote: "Authentic spices, beautiful decor. Worth every dirham.", author: "Nina P." },
  ],
};

export async function fetchGoogleMapsReviewsForMarquee(): Promise<{
  rowLeft: MarqueeReview[];
  rowRight: MarqueeReview[];
  source: "static";
  googleMapsUrl: string;
}> {
  return {
    ...reviewsMarqueeFallback,
    source: "static",
    googleMapsUrl: getGoogleMapsPlaceUrl(),
  };
}
