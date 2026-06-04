import type { Locale } from "@/i18n/config";

export type MenuItemLabels = Partial<Record<Locale, string>> & {
  fr: string;
  en: string;
  ar: string;
};

/** Libellé principal selon la langue de la page */
export function menuLabel(labels: MenuItemLabels, locale: Locale): string {
  if (labels[locale]) return labels[locale]!;
  if (locale === "pl" || locale === "de") return labels.en;
  return labels.fr;
}

/** Sous-titre bilingue / trilingue sous le plat */
export function menuSecondaryLine(labels: MenuItemLabels, locale: Locale): string | null {
  if (locale === "fr") return `${labels.en} · ${labels.ar}`;
  if (locale === "en") return `${labels.fr} · ${labels.ar}`;
  if (locale === "ar") return `${labels.fr} · ${labels.en}`;
  return `${labels.fr} · ${labels.en}`;
}

export type MenuItem = {
  id: string;
  name: MenuItemLabels;
  description?: MenuItemLabels;
  priceDh: number;
  image?: string;
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  title: MenuItemLabels;
  subtitle?: MenuItemLabels;
  items: MenuItem[];
};

export function formatPriceAmount(amount: number): string {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(/\.?0+$/, "");
}

export function formatPriceDh(amount: number): string {
  return `${formatPriceAmount(amount)} DH`;
}

export function formatPriceParts(amount: number) {
  return { amount: formatPriceAmount(amount), currency: "DH" as const };
}

/** Plats mis en avant sur l'accueil — alignés sur la carte réelle */
export const SIGNATURE_DISHES = {
  tajine: {
    title: "Tajine de poulet\nà la marocaine",
    description: "Tajine de poulet traditionnel, épices et légumes de saison.",
    price: formatPriceDh(55),
    image: "/assets/tajine-olives.avif",
    size: "large" as const,
  },
  couscous: {
    title: "Couscous royal",
    description: "Merguez, viande hachée, bœuf et poulet — servi le vendredi.",
    price: formatPriceDh(65),
    image: "/assets/couscous-royal.avif",
    size: "medium" as const,
  },
  brochettes: {
    title: "Mixte grillé\nAl Walima",
    description: "Sélection de grillades maison au charbon de bois.",
    price: formatPriceDh(65),
    image: "/assets/brochettes.avif",
    size: "medium" as const,
  },
  the: {
    title: "Thé marocain",
    description: "Thé vert à la menthe, servi à la belge.",
    price: formatPriceDh(15),
    image: "/assets/mint-tea.avif",
    size: "large" as const,
  },
} as const;

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "salades",
    title: { fr: "Salades", en: "Salads", ar: "سلطات" },
    items: [
      { id: "salade-marocaine", name: { fr: "Salade marocaine", en: "Moroccan salad", ar: "سلطة مغربية" }, priceDh: 25 },
      { id: "salade-thonara", name: { fr: "Salade thonara", en: "Thonara salad", ar: "سلطة التونة" }, priceDh: 30 },
      { id: "salade-nicoise", name: { fr: "Salade niçoise", en: "Nicoise salad", ar: "سلطة نيسواز" }, priceDh: 35 },
      {
        id: "salade-avocat-crevettes",
        name: { fr: "Salade avocat crevettes", en: "Avocado & shrimps salad", ar: "سلطة الافوكادو والروبيان" },
        priceDh: 45,
      },
      {
        id: "salade-avocat-mangue",
        name: { fr: "Salade avocat mangue crevettes", en: "Avocado mango shrimps salad", ar: "سلطة الافوكادو والمانغا والجمبري" },
        priceDh: 55,
      },
      { id: "salade-al-walima", name: { fr: "Salade Al Walima", en: "Al Walima salad", ar: "سلطة الوليمة" }, priceDh: 65 },
      { id: "salade-chef", name: { fr: "Salade du chef", en: "Chef's salad", ar: "سلطة شاف" }, priceDh: 100 },
    ],
  },
  {
    id: "entrees",
    title: { fr: "Saveurs marocaines", en: "Moroccan appetizers", ar: "مقبلات" },
    items: [
      { id: "legumes-sautes", name: { fr: "Légumes sautés", en: "Sauteed vegetables", ar: "خضار سوتيه" }, priceDh: 15 },
      { id: "carottes", name: { fr: "Carottes assaisonnées", en: "Seasoned carrots", ar: "جزر مشرمل" }, priceDh: 15 },
      { id: "zaalouk", name: { fr: "Zaalouk", en: "Eggplant zaalouk", ar: "زعلوك" }, priceDh: 15 },
      { id: "riz", name: { fr: "Riz", en: "Rice", ar: "أرز" }, priceDh: 15 },
      { id: "pommes-assaisonnees", name: { fr: "Pommes de terre assaisonnées", en: "Seasoned potatoes", ar: "بطاطس متبلة" }, priceDh: 15 },
      { id: "frites", name: { fr: "Frites", en: "French fries", ar: "بطاطس مقلية" }, priceDh: 15 },
      { id: "betteraves", name: { fr: "Betteraves assaisonnées", en: "Seasoned beetroot", ar: "باربة مشرملة" }, priceDh: 15 },
      { id: "epinards", name: { fr: "Épinards", en: "Spinach", ar: "سبانخ" }, priceDh: 15 },
      { id: "carottes-confites", name: { fr: "Carottes confites", en: "Candied carrots", ar: "جزر معسل" }, priceDh: 15 },
      { id: "briouat-fromage", name: { fr: "Briouat poulet au fromage", en: "Chicken cheesy briouat", ar: "بريوات الدجاج بالفرماج" }, priceDh: 20 },
      { id: "cigars-vegetariens", name: { fr: "Cigars végétariens", en: "Vegetarian cigars", ar: "سيغار بالخضار" }, priceDh: 20 },
      { id: "citrouille", name: { fr: "Citrouille confite", en: "Candied pumpkin", ar: "الكرعة معسلة" }, priceDh: 20 },
      { id: "semoule", name: { fr: "Semoule", en: "Semolina", ar: "كسكس سميد" }, priceDh: 20 },
    ],
  },
  {
    id: "plats-marocains",
    title: { fr: "Plats marocains", en: "Moroccan dishes", ar: "أطباق مغربية" },
    items: [
      { id: "viande-1-4", name: { fr: "Viande Al Walima 1/4 kg (agneau)", en: "Al Walima meat 1/4 kg (lamb)", ar: "لحم الوليمة 1/4 كلغ (غنمي)" }, priceDh: 75 },
      { id: "viande-1-2", name: { fr: "Viande Al Walima 1/2 kg (agneau)", en: "Al Walima meat 1/2 kg (lamb)", ar: "لحم الوليمة 1/2 كلغ (غنمي)" }, priceDh: 150 },
      { id: "viande-1kg", name: { fr: "Viande Al Walima 1 kg (agneau)", en: "Al Walima meat 1 kg (lamb)", ar: "لحم الوليمة 1 كلغ (غنمي)" }, priceDh: 300 },
      { id: "kourain", name: { fr: "Kourain (pieds de bœuf)", en: "Kourain (beef feet)", ar: "كوارع (بقري)" }, priceDh: 60 },
      { id: "seffa-nature", name: { fr: "Seffa nature (cheveux d'ange)", en: "Sweet angel hair", ar: "سفة عادية" }, priceDh: 40 },
      { id: "seffa-royal", name: { fr: "Seffa royal (cheveux d'ange)", en: "Royal angel hair", ar: "سفة رويال" }, priceDh: 55 },
      { id: "rafissa", name: { fr: "Rafissa poulet", en: "Chicken rafissa", ar: "رفيسة دجاج" }, priceDh: 50 },
      { id: "pastilla-poulet", name: { fr: "Pastilla poulet", en: "Chicken pastilla", ar: "بسطيلة دجاج" }, priceDh: 65 },
      { id: "pastilla-mer", name: { fr: "Pastilla fruits de mer", en: "Seafood pastilla", ar: "بسطيلة فواكه البحر" }, priceDh: 75 },
    ],
  },
  {
    id: "couscous",
    title: { fr: "Couscous", en: "Couscous", ar: "كسكس" },
    subtitle: { fr: "Chaque vendredi", en: "Every Friday", ar: "كل جمعة" },
    items: [
      { id: "couscous-vegetarien", name: { fr: "Végétarien", en: "Vegetarian", ar: "الخضر" }, priceDh: 40 },
      { id: "couscous-poulet", name: { fr: "Poulet", en: "Chicken", ar: "دجاج" }, priceDh: 45 },
      { id: "couscous-boeuf", name: { fr: "Bœuf", en: "Beef", ar: "بقري" }, priceDh: 50 },
      { id: "couscous-agneau", name: { fr: "Agneau", en: "Lamb", ar: "غنمي" }, priceDh: 55 },
      {
        id: "couscous-royal",
        name: { fr: "Royal (merguez, viande hachée, bœuf, poulet)", en: "Royal (sausages, minced meat, beef, chicken)", ar: "رويال (نقانق، كفتة، دجاج، لحم بقري)" },
        priceDh: 65,
        image: "/assets/couscous-royal.avif",
        signature: true,
      },
      { id: "couscous-legumes", name: { fr: "Supplément légumes", en: "Extra vegetables", ar: "خضر (إضافية)" }, priceDh: 10 },
      { id: "couscous-tfaya", name: { fr: "Supplément tfaya", en: "Extra tfaya", ar: "تفاية (إضافية)" }, priceDh: 10 },
      { id: "couscous-leben", name: { fr: "Supplément leben", en: "Extra leben", ar: "لبن (إضافي)" }, priceDh: 5 },
    ],
  },
  {
    id: "tajines",
    title: { fr: "Tajines", en: "Tajines", ar: "طاجين" },
    items: [
      {
        id: "tajine-poulet",
        name: { fr: "Tajine de poulet à la marocaine", en: "Chicken tajine", ar: "طاجين دجاج بالدغميرة" },
        priceDh: 55,
        image: "/assets/tajine-olives.avif",
        signature: true,
      },
      { id: "tajine-lotte", name: { fr: "Tajine de lotte (poisson)", en: "Monkfish tajine", ar: "طاجين لوط" }, priceDh: 55 },
      { id: "tajine-agneau-pruneaux", name: { fr: "Tajine d'agneau aux pruneaux", en: "Lamb tajine / prunes", ar: "طاجين غنمي بالبرقوق" }, priceDh: 75 },
      { id: "tajine-agneau-abricots", name: { fr: "Tajine d'agneau aux abricots secs", en: "Lamb tajine / dried apricots", ar: "طاجين غنمي بالمشماش" }, priceDh: 78 },
      { id: "tajine-agneau-figues", name: { fr: "Tajine d'agneau aux figues", en: "Lamb tajine / dried figs", ar: "طاجين غنمي بالتين" }, priceDh: 80 },
      { id: "tajine-boeuf-pruneaux", name: { fr: "Tajine de bœuf aux pruneaux", en: "Beef tajine / prunes", ar: "طاجين بقري بالبرقوق" }, priceDh: 73 },
      { id: "tajine-boeuf-abricots", name: { fr: "Tajine de bœuf aux abricots secs", en: "Beef tajine / dried apricots", ar: "طاجين بقري بالمشماش" }, priceDh: 76 },
      { id: "tajine-boeuf-figues", name: { fr: "Tajine de bœuf aux figues", en: "Beef tajine / dried figs", ar: "طاجين بقري بالتين" }, priceDh: 78 },
      { id: "tajine-fruits-mer", name: { fr: "Tajine de fruits de mer", en: "Seafood tajine", ar: "طاجين فواكه البحر" }, priceDh: 70 },
      { id: "tajine-kefta", name: { fr: "Tajine de viande hachée (bœuf)", en: "Minced meat tajine (beef)", ar: "طاجين كفتة" }, priceDh: 50 },
      { id: "tajine-vegetarien", name: { fr: "Tajine végétarien", en: "Vegetarian tajine", ar: "طاجين بالخضر" }, priceDh: 50 },
      { id: "tajine-crevettes", name: { fr: "Tajine de crevettes", en: "Shrimp tajine", ar: "طاجين الجمبري" }, priceDh: 50 },
      { id: "tajine-moules", name: { fr: "Tajine de moules", en: "Mussels tajine", ar: "طاجين بلح البحر" }, priceDh: 55 },
      { id: "tanjia-1-4", name: { fr: "Tanjia 1/4 kg (bœuf)", en: "Tanjia 1/4 kg (beef)", ar: "طنجية 1/4 كلغ (بقري)" }, priceDh: 60 },
      { id: "tanjia-1-2", name: { fr: "Tanjia 1/2 kg (bœuf)", en: "Tanjia 1/2 kg (beef)", ar: "طنجية 1/2 كلغ (بقري)" }, priceDh: 120 },
      { id: "tanjia-1kg", name: { fr: "Tanjia 1 kg (bœuf)", en: "Tanjia 1 kg (beef)", ar: "طنجية 1 كلغ (بقري)" }, priceDh: 240 },
    ],
  },
  {
    id: "pates",
    title: { fr: "Pâtes", en: "Pasta", ar: "معجنات" },
    subtitle: { fr: "Penne ou spaghetti", en: "Penne or spaghetti", ar: "بيني أو سباغيتي" },
    items: [
      { id: "pates-mer", name: { fr: "Fruits de mer", en: "Seafood", ar: "فواكه البحر" }, priceDh: 60 },
      { id: "pates-bolognaise", name: { fr: "Bolognaise", en: "Bolognese", ar: "كفتة" }, priceDh: 55 },
      { id: "pates-poulet", name: { fr: "Poulet", en: "Chicken", ar: "دجاج" }, priceDh: 50 },
      { id: "pates-vegetarien", name: { fr: "Végétarienne", en: "Vegetarian", ar: "الخضر" }, priceDh: 45 },
    ],
  },
  {
    id: "grillades",
    title: { fr: "Grillades", en: "Barbecues", ar: "مشاوي" },
    items: [
      {
        id: "mixte-al-walima",
        name: { fr: "Mixte grillé Al Walima", en: "Al Walima mixed grill", ar: "مشاوي الوليمة" },
        priceDh: 65,
        image: "/assets/brochettes.avif",
        signature: true,
      },
      { id: "brochettes-merguez", name: { fr: "Brochettes de merguez", en: "Merguez skewers", ar: "كباب النقانق" }, priceDh: 50 },
      { id: "brochettes-poulet", name: { fr: "Brochettes de poulet", en: "Chicken skewers", ar: "كباب الدجاج" }, priceDh: 55 },
      { id: "brochettes-kefta", name: { fr: "Brochettes de viande hachée", en: "Minced meat skewers", ar: "كباب كفتة" }, priceDh: 60 },
    ],
  },
  {
    id: "plats",
    title: { fr: "Plats", en: "Dishes", ar: "أطباق" },
    items: [
      { id: "entrecote", name: { fr: "Entrecôte aux champignons", en: "Mushroom entrecôte steak", ar: "ضليعة بشومبينيو" }, priceDh: 70 },
      { id: "saint-pierre", name: { fr: "Filet de Saint-Pierre", en: "Saint-Peter filet", ar: "سمك سامبير" }, priceDh: 85 },
      {
        id: "poulet-champignons",
        name: { fr: "Émincé de poulet, sauce aux champignons", en: "Chicken sliced mushrooms sauce", ar: "شرائح دجاج صوص شومبينيو" },
        priceDh: 50,
      },
    ],
  },
  {
    id: "pizzas",
    title: { fr: "Pizzas", en: "Pizzas", ar: "بيتزا" },
    items: [
      { id: "pizza-mer", name: { fr: "Pizza fruits de mer", en: "Seafood pizza", ar: "بيتزا فواكه البحر" }, priceDh: 60 },
      { id: "pizza-thonnara", name: { fr: "Pizza thonnara", en: "Thonnara pizza", ar: "بيتزا تونة" }, priceDh: 45 },
      { id: "pizza-poulet", name: { fr: "Pizza poulet aux champignons", en: "Mushroom chicken pizza", ar: "بيتزا دجاج بشومبينيو" }, priceDh: 50 },
      { id: "pizza-portofino", name: { fr: "Pizza portofino", en: "Portofino pizza", ar: "بيتزا كفتة" }, priceDh: 50 },
      { id: "pizza-margherita", name: { fr: "Pizza margherita", en: "Margherita pizza", ar: "بيتزا مارغاريتا" }, priceDh: 45 },
      { id: "pizza-vegetarienne", name: { fr: "Pizza végétarienne", en: "Vegetarian pizza", ar: "بيتزا بالخضر" }, priceDh: 45 },
    ],
  },
  {
    id: "menu-enfant",
    title: { fr: "Menu enfant", en: "Kids menu", ar: "طبق الأطفال" },
    items: [
      {
        id: "menu-enfant-complet",
        name: { fr: "Menu enfant", en: "Kids menu", ar: "طبق الأطفال" },
        description: {
          fr: "Mini pizza ou 6 pièces, nuggets de poulet, frites, jus d'orange, eau minérale",
          en: "Mini pizza or 6 pieces, chicken nuggets, fries, orange juice, mineral water",
          ar: "ميني بيتزا أو 6 قطع، ناجتس دجاج، بطاطس مقلية، عصير برتقال، ماء معدني",
        },
        priceDh: 45,
      },
    ],
  },
  {
    id: "desserts",
    title: { fr: "Desserts", en: "Desserts", ar: "حلويات" },
    items: [
      { id: "tiramisu", name: { fr: "Tiramisu", en: "Tiramisu", ar: "تيراميسو" }, priceDh: 30 },
      { id: "fondant", name: { fr: "Fondant au chocolat", en: "Chocolate fondant", ar: "فوندان شوكولا" }, priceDh: 30 },
      { id: "tarte-citron", name: { fr: "Tarte au citron", en: "Lemon tart", ar: "تارت الحامض" }, priceDh: 25 },
      { id: "creme-caramel", name: { fr: "Crème caramel", en: "Cream caramel", ar: "كريم كراميل" }, priceDh: 25 },
      { id: "cheesecake", name: { fr: "Cheesecake", en: "Cheesecake", ar: "تشيز كيك" }, priceDh: 30 },
    ],
  },
  {
    id: "boissons",
    title: { fr: "Boissons", en: "Drinks", ar: "مشروبات" },
    items: [
      { id: "eau-gazeuse-50", name: { fr: "Eau gazeuse 50 cl", en: "Sparkling water 50 cl", ar: "ماء غازي 50 cl" }, priceDh: 10 },
      { id: "eau-gazeuse-1l", name: { fr: "Eau gazeuse 1 l", en: "Sparkling water 1 l", ar: "ماء غازي 1 l" }, priceDh: 15 },
      { id: "eau-minerale-50", name: { fr: "Eau minérale 50 cl", en: "Mineral water 50 cl", ar: "ماء معدني 50 cl" }, priceDh: 8 },
      { id: "eau-minerale-1l", name: { fr: "Eau minérale 1 l", en: "Mineral water 1 l", ar: "ماء معدني 1 l" }, priceDh: 12 },
      { id: "soda", name: { fr: "Soda", en: "Soda", ar: "صودا" }, priceDh: 12 },
    ],
  },
  {
    id: "boissons-chaudes",
    title: { fr: "Boissons chaudes", en: "Hot drinks", ar: "مشروبات ساخنة" },
    items: [
      { id: "the-al-walima", name: { fr: "Thé Al Walima", en: "Al Walima tea", ar: "شاي الوليمة" }, priceDh: 20 },
      {
        id: "the-marocain",
        name: { fr: "Thé marocain", en: "Moroccan tea", ar: "شاي مغربي" },
        priceDh: 15,
        image: "/assets/mint-tea.avif",
        signature: true,
      },
      { id: "cafe-al-walima", name: { fr: "Café Al Walima", en: "Al Walima coffee", ar: "قهوة الوليمة" }, priceDh: 20 },
    ],
  },
  {
    id: "jus",
    title: { fr: "Jus", en: "Juices", ar: "عصائر" },
    items: [
      { id: "jus-barbabas", name: { fr: "Jus de betteraves", en: "Beetroot juice", ar: "عصير باربة" }, priceDh: 20 },
      { id: "jus-carotte", name: { fr: "Jus de carottes", en: "Carrot juice", ar: "عصير الجزر" }, priceDh: 20 },
      { id: "jus-orange", name: { fr: "Jus d'orange", en: "Orange juice", ar: "عصير البرتقال" }, priceDh: 20 },
      { id: "jus-concombre", name: { fr: "Jus de concombre", en: "Cucumber juice", ar: "عصير الخيار" }, priceDh: 20 },
    ],
  },
];
