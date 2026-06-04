export type FooterSeoPage = {
  title: string;
  slug: string;
};

export type FooterSeoListGroup = {
  heading: string;
  pages: FooterSeoPage[];
};

function slugify(label: string): string {
  return label
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toPages(titles: readonly string[]): FooterSeoPage[] {
  return titles.map((title) => ({
    title,
    slug: slugify(title),
  }));
}

const FOOTER_SEO_LIST_GROUPS: { heading: string; titles: readonly string[] }[] = [
  {
    heading: "Plats & menu",
    titles: [
      "Tajine Agadir",
      "Tajine de poulet aux olives",
      "Couscous royal Agadir",
      "Couscous marocain",
      "Brochettes marocaines",
      "Thé à la menthe traditionnel",
      "Menu marocain",
      "Spécialités marocaines",
      "Plats signatures marocains",
      "Gastronomie marocaine",
      "Recettes marocaines authentiques",
      "Cuisine du terroir marocain",
    ],
  },
  {
    heading: "Restaurant à Agadir",
    titles: [
      "Restaurant marocain Agadir",
      "Restaurant Al Walima",
      "Al Walima Agadir",
      "Cuisine marocaine Agadir",
      "Restaurant traditionnel Maroc",
      "Restaurant raffiné Agadir",
      "Restaurant convivial Agadir",
      "Restaurant familial Agadir",
      "Restaurant Jardin Lalla Meryem",
      "Rue de Marrakech Agadir restaurant",
      "Restaurant centre-ville Agadir",
      "Où manger marocain à Agadir",
    ],
  },
  {
    heading: "Réservation & expérience",
    titles: [
      "Dîner marocain Agadir",
      "Déjeuner marocain",
      "Réservation restaurant Agadir",
      "Réserver une table Agadir",
      "Soirée marocaine Agadir",
      "Sortie restaurant Agadir",
      "Meilleure expérience culinaire Agadir",
      "Restaurant avec cuisine marocaine",
      "Table marocaine Agadir",
      "Ambiance orientale",
      "Hospitalité marocaine",
    ],
  },
  {
    heading: "English",
    titles: [
      "Moroccan restaurant Agadir",
      "Moroccan food Agadir",
      "Traditional Moroccan cuisine",
      "Mint tea Morocco Agadir",
      "Agadir dining Moroccan",
    ],
  },
];

export const FOOTER_SEO_LISTS: FooterSeoListGroup[] = FOOTER_SEO_LIST_GROUPS.map((group) => ({
  heading: group.heading,
  pages: toPages(group.titles),
}));

export const FOOTER_SEO_PAGES: FooterSeoPage[] = FOOTER_SEO_LISTS.flatMap((g) => g.pages);

export const FOOTER_SEO_KEYWORDS = FOOTER_SEO_PAGES.map((p) => p.title);

export const FOOTER_SEO_BLURB =
  "Restaurant Al Walima à Agadir propose une cuisine marocaine authentique : tajines mijotés, couscous royal, brochettes grillées et thé à la menthe, dans un cadre élégant au Jardin Lalla Meryem. Consultez le menu pour votre prochain dîner ou déjeuner marocain à Agadir.";
