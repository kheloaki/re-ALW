import type { Locale } from "@/i18n/config";
import { enrichMenuCategories } from "@/lib/menu/enrich";

export type { MenuCategory, MenuItem, MenuItemLabels } from "@/lib/menu/types";

/** Libellé principal selon la langue de la page */
export function menuLabel(labels: import("@/lib/menu/types").MenuItemLabels, locale: Locale): string {
  if (labels[locale]) return labels[locale]!;
  if (locale === "ar") return labels.ar;
  if (locale === "en") return labels.en;
  return labels.fr;
}

/** Sous-titre bilingue / trilingue sous le plat */
export function menuSecondaryLine(labels: import("@/lib/menu/types").MenuItemLabels, locale: Locale): string | null {
  if (locale === "fr") return `${labels.en} · ${labels.ar}`;
  if (locale === "en") return `${labels.fr} · ${labels.ar}`;
  if (locale === "ar") return `${labels.fr} · ${labels.en}`;
  if (locale === "es" || locale === "pl" || locale === "de") return `${labels.fr} · ${labels.ar}`;
  return `${labels.fr} · ${labels.en}`;
}

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
    price: formatPriceDh(60),
    image: "/assets/menu/dishes/menu-tajine-poulet.avif",
    size: "large" as const,
  },
  couscous: {
    title: "Couscous royal",
    description: "Merguez, viande hachée, bœuf et poulet — servi le vendredi.",
    price: formatPriceDh(70),
    size: "medium" as const,
  },
  brochettes: {
    title: "Mixte grillé\nAl Walima",
    description: "Sélection de grillades maison au charbon de bois.",
    price: formatPriceDh(70),
    size: "medium" as const,
  },
  the: {
    title: "Thé marocain",
    description: "Thé vert à la menthe, servi à la belge.",
    price: formatPriceDh(15),
    image: "/assets/menu/dishes/menu-the-marocain.avif",
    size: "large" as const,
  },
} as const;

const RAW_MENU_CATEGORIES: import("@/lib/menu/types").MenuCategory[] = [
  {
    id: "salades",
    title: { fr: "Salades", en: "Salads", ar: "سلطات" },
    items: [
      { id: "salade-marocaine", name: { fr: "Salade marocaine", en: "Moroccan salad", ar: "سلطة مغربية" }, priceDh: 30 },
      { id: "salade-thonara", name: { fr: "Salade thonara", en: "Thonara salad", ar: "سلطة التونة" }, priceDh: 34 },
      { id: "salade-nicoise", name: { fr: "Salade niçoise", en: "Nicoise salad", ar: "سلطة نيسواز" }, priceDh: 40 },
      {
        id: "salade-avocat-crevettes",
        name: { fr: "Salade avocat crevettes", en: "Avocado & shrimps salad", ar: "سلطة الافوكادو والروبيان" },
        priceDh: 48,
      },
      {
        id: "salade-avocat-mangue",
        name: { fr: "Salade avocat mangue crevettes", en: "Avocado mango shrimps salad", ar: "سلطة الافوكادو والمانغا والجمبري" },
        priceDh: 60,
      },
      { id: "salade-al-walima", name: { fr: "Salade Al Walima", en: "Al Walima salad", ar: "سلطة الوليمة" }, priceDh: 90 },
    ],
  },
  {
    id: "entrees",
    title: { fr: "Saveurs marocaines", en: "Moroccan appetizers", ar: "مقبلات" },
    items: [
      { id: "legumes-sautes", name: { fr: "Légumes sautés", en: "Sauteed vegetables", ar: "خضار سوتيه" }, priceDh: 20 },
      { id: "carottes", name: { fr: "Carottes assaisonnées", en: "Seasoned carrots", ar: "جزر مشرمل" }, priceDh: 20 },
      { id: "zaalouk", name: { fr: "Zaalouk", en: "Eggplant zaalouk", ar: "زعلوك" }, priceDh: 20 },
      { id: "riz", name: { fr: "Riz", en: "Rice", ar: "أرز" }, priceDh: 20 },
      { id: "pommes-assaisonnees", name: { fr: "Pommes de terre assaisonnées", en: "Seasoned potatoes", ar: "بطاطس متبلة" }, priceDh: 20 },
      { id: "frites", name: { fr: "Frites", en: "French fries", ar: "بطاطس مقلية" }, priceDh: 20 },
      { id: "betteraves", name: { fr: "Betteraves assaisonnées", en: "Seasoned beetroot", ar: "باربة مشرملة" }, priceDh: 20 },
      { id: "epinards", name: { fr: "Épinards", en: "Spinach", ar: "سبانخ" }, priceDh: 20 },
      { id: "carottes-confites", name: { fr: "Carottes confites", en: "Candied carrots", ar: "جزر معسل" }, priceDh: 20 },
      { id: "briouat-fromage", name: { fr: "Briouat poulet au fromage", en: "Chicken cheesy briouat", ar: "بريوات الدجاج بالفرماج" }, priceDh: 25 },
      { id: "cigars-vegetariens", name: { fr: "Cigars végétariens", en: "Vegetarian cigars", ar: "سيغار بالخضار" }, priceDh: 25 },
      { id: "citrouille", name: { fr: "Citrouille confite", en: "Candied pumpkin", ar: "الكرعة معسلة" }, priceDh: 25 },
      { id: "semoule", name: { fr: "Semoule", en: "Semolina", ar: "كسكس سميد" }, priceDh: 25 },
    ],
  },
  {
    id: "plats-marocains",
    title: { fr: "Plats marocains", en: "Moroccan dishes", ar: "أطباق مغربية" },
    items: [
      { id: "viande-1-4", name: { fr: "Viande Al Walima 1/4 kg (agneau)", en: "Al Walima meat 1/4 kg (lamb)", ar: "لحم الوليمة 1/4 كلغ (غنمي)" }, priceDh: 85 },
      { id: "viande-1-2", name: { fr: "Viande Al Walima 1/2 kg (agneau)", en: "Al Walima meat 1/2 kg (lamb)", ar: "لحم الوليمة 1/2 كلغ (غنمي)" }, priceDh: 170 },
      { id: "viande-1kg", name: { fr: "Viande Al Walima 1 kg (agneau)", en: "Al Walima meat 1 kg (lamb)", ar: "لحم الوليمة 1 كلغ (غنمي)" }, priceDh: 320 },
      { id: "kourain", name: { fr: "Kourain (pieds de bœuf)", en: "Kourain (beef feet)", ar: "كوارع (بقري)" }, priceDh: 65 },
      { id: "seffa-nature", name: { fr: "Seffa nature (cheveux d'ange)", en: "Sweet angel hair", ar: "سفة عادية" }, priceDh: 45 },
      { id: "seffa-royal", name: { fr: "Seffa royal (cheveux d'ange)", en: "Royal angel hair", ar: "سفة رويال" }, priceDh: 60 },
      { id: "rafissa", name: { fr: "Rafissa poulet", en: "Chicken rafissa", ar: "رفيسة دجاج" }, priceDh: 60 },
      { id: "pastilla-poulet", name: { fr: "Pastilla poulet", en: "Chicken pastilla", ar: "بسطيلة دجاج" }, priceDh: 70 },
      { id: "pastilla-mer", name: { fr: "Pastilla fruits de mer", en: "Seafood pastilla", ar: "بسطيلة فواكه البحر" }, priceDh: 80 },
    ],
  },
  {
    id: "couscous",
    title: { fr: "Couscous", en: "Couscous", ar: "كسكس" },
    subtitle: { fr: "Chaque vendredi", en: "Every Friday", ar: "كل جمعة" },
    items: [
      { id: "couscous-vegetarien", name: { fr: "Végétarien", en: "Vegetarian", ar: "الخضر" }, priceDh: 45 },
      { id: "couscous-poulet", name: { fr: "Poulet", en: "Chicken", ar: "دجاج" }, priceDh: 50 },
      { id: "couscous-boeuf", name: { fr: "Bœuf", en: "Beef", ar: "بقري" }, priceDh: 55 },
      { id: "couscous-agneau", name: { fr: "Agneau", en: "Lamb", ar: "غنمي" }, priceDh: 60 },
      {
        id: "couscous-royal",
        name: { fr: "Royal (merguez, viande hachée, bœuf, poulet)", en: "Royal (sausages, minced meat, beef, chicken)", ar: "رويال (نقانق، كفتة، دجاج، لحم بقري)" },
        priceDh: 70,
        signature: true,
      },
      { id: "couscous-legumes", name: { fr: "Supplément légumes", en: "Extra vegetables", ar: "خضر (إضافية)" }, priceDh: 15 },
      { id: "couscous-tfaya", name: { fr: "Supplément tfaya", en: "Extra tfaya", ar: "تفاية (إضافية)" }, priceDh: 15 },
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
        priceDh: 60,
        signature: true,
      },
      { id: "tajine-lotte", name: { fr: "Tajine de lotte (poisson)", en: "Monkfish tajine", ar: "طاجين لوط" }, priceDh: 58 },
      { id: "tajine-agneau-pruneaux", name: { fr: "Tajine d'agneau aux pruneaux", en: "Lamb tajine / prunes", ar: "طاجين غنمي بالبرقوق" }, priceDh: 80 },
      { id: "tajine-agneau-figues", name: { fr: "Tajine d'agneau aux figues", en: "Lamb tajine / dried figs", ar: "طاجين غنمي بالتين" }, priceDh: 85 },
      { id: "tajine-boeuf-pruneaux", name: { fr: "Tajine de bœuf aux pruneaux", en: "Beef tajine / prunes", ar: "طاجين بقري بالبرقوق" }, priceDh: 80 },
      { id: "tajine-boeuf-figues", name: { fr: "Tajine de bœuf aux figues", en: "Beef tajine / dried figs", ar: "طاجين بقري بالتين" }, priceDh: 83 },
      { id: "tajine-fruits-mer", name: { fr: "Tajine de fruits de mer", en: "Seafood tajine", ar: "طاجين فواكه البحر" }, priceDh: 70 },
      { id: "tajine-kefta", name: { fr: "Tajine de viande hachée (bœuf)", en: "Minced meat tajine (beef)", ar: "طاجين كفتة" }, priceDh: 60 },
      { id: "tajine-vegetarien", name: { fr: "Tajine végétarien", en: "Vegetarian tajine", ar: "طاجين بالخضر" }, priceDh: 55 },
      {
        id: "tajine-crevettes",
        name: { fr: "Tajine de crevettes (sauce tomate)", en: "Shrimp tajine (tomato sauce)", ar: "طاجين الجمبري (بصلصة الطماطم)" },
        priceDh: 60,
      },
      {
        id: "tajine-crevettes-provencale",
        name: { fr: "Tajine crevette à la provençale", en: "Provencal shrimp tajine", ar: "طاجين الجمبري" },
        priceDh: 80,
      },
      { id: "tajine-moules", name: { fr: "Tajine de moules", en: "Mussels tajine", ar: "طاجين بلح البحر" }, priceDh: 60 },
      { id: "tanjia-1-4", name: { fr: "Tanjia 1/4 kg (bœuf)", en: "Tanjia 1/4 kg (beef)", ar: "طنجية 1/4 كلغ (بقري)" }, priceDh: 65 },
      { id: "tanjia-1-2", name: { fr: "Tanjia 1/2 kg (bœuf)", en: "Tanjia 1/2 kg (beef)", ar: "طنجية 1/2 كلغ (بقري)" }, priceDh: 130 },
      { id: "tanjia-1kg", name: { fr: "Tanjia 1 kg (bœuf)", en: "Tanjia 1 kg (beef)", ar: "طنجية 1 كلغ (بقري)" }, priceDh: 250 },
    ],
  },
  {
    id: "pates",
    title: { fr: "Pâtes", en: "Pasta", ar: "معجنات" },
    subtitle: { fr: "Penne ou spaghetti", en: "Penne or spaghetti", ar: "بيني أو سباغيتي" },
    items: [
      { id: "pates-mer", name: { fr: "Fruits de mer", en: "Seafood", ar: "فواكه البحر" }, priceDh: 60 },
      { id: "pates-bolognaise", name: { fr: "Bolognaise", en: "Bolognese", ar: "كفتة" }, priceDh: 60 },
      { id: "pates-poulet", name: { fr: "Poulet", en: "Chicken", ar: "دجاج" }, priceDh: 55 },
      { id: "pates-vegetarien", name: { fr: "Végétarienne", en: "Vegetarian", ar: "الخضر" }, priceDh: 50 },
    ],
  },
  {
    id: "grillades",
    title: { fr: "Grillades", en: "Barbecues", ar: "مشاوي" },
    items: [
      {
        id: "mixte-al-walima",
        name: { fr: "Mixte grillé Al Walima", en: "Al Walima mixed grill", ar: "مشاوي الوليمة" },
        priceDh: 70,
        signature: true,
      },
      { id: "brochettes-merguez", name: { fr: "Brochettes de merguez", en: "Merguez skewers", ar: "كباب النقانق" }, priceDh: 55 },
      { id: "brochettes-poulet", name: { fr: "Brochettes de poulet", en: "Chicken skewers", ar: "كباب الدجاج" }, priceDh: 60 },
      { id: "brochettes-kefta", name: { fr: "Brochettes de viande hachée", en: "Minced meat skewers", ar: "كباب كفتة" }, priceDh: 65 },
    ],
  },
  {
    id: "plats",
    title: { fr: "Plats", en: "Dishes", ar: "أطباق" },
    items: [
      {
        id: "emince-boeuf-champignons",
        name: { fr: "Émincé de bœuf, sauce aux champignons", en: "Beef sliced mushrooms sauce", ar: "شرائح لحم مفروم صوص شومبينيو" },
        priceDh: 90,
      },
      { id: "entrecote", name: { fr: "Entrecôte aux champignons", en: "Mushroom entrecôte steak", ar: "ضليعة بشومبينيو" }, priceDh: 80 },
      { id: "saint-pierre", name: { fr: "Filet de Saint-Pierre", en: "Saint-Peter filet", ar: "سمك سامبير" }, priceDh: 90 },
      {
        id: "poulet-champignons",
        name: { fr: "Émincé de poulet, sauce aux champignons", en: "Chicken sliced mushrooms sauce", ar: "شرائح دجاج صوص شومبينيو" },
        priceDh: 60,
      },
    ],
  },
  {
    id: "pizzas",
    title: { fr: "Pizzas", en: "Pizzas", ar: "بيتزا" },
    items: [
      { id: "pizza-quatre-fromages", name: { fr: "Pizza quatre fromages", en: "Four cheese pizza", ar: "بيتزا أربعة أجبان" }, priceDh: 70 },
      { id: "pizza-mer", name: { fr: "Pizza fruits de mer", en: "Seafood pizza", ar: "بيتزا فواكه البحر" }, priceDh: 65 },
      { id: "pizza-thonnara", name: { fr: "Pizza thonnara", en: "Thonnara pizza", ar: "بيتزا تونة" }, priceDh: 60 },
      { id: "pizza-poulet", name: { fr: "Pizza poulet aux champignons", en: "Mushroom chicken pizza", ar: "بيتزا دجاج بشومبينيو" }, priceDh: 50 },
      { id: "pizza-portofino", name: { fr: "Pizza portofino", en: "Portofino pizza", ar: "بيتزا كفتة" }, priceDh: 55 },
      { id: "pizza-margherita", name: { fr: "Pizza margherita", en: "Margherita pizza", ar: "بيتزا مارغاريتا" }, priceDh: 50 },
      { id: "pizza-vegetarienne", name: { fr: "Pizza végétarienne", en: "Vegetarian pizza", ar: "بيتزا بالخضر" }, priceDh: 55 },
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
        priceDh: 50,
      },
    ],
  },
  {
    id: "desserts",
    title: { fr: "Desserts", en: "Desserts", ar: "حلويات" },
    items: [
      { id: "tiramisu", name: { fr: "Tiramisu", en: "Tiramisu", ar: "تيراميسو" }, priceDh: 35 },
      { id: "fondant", name: { fr: "Fondant au chocolat", en: "Chocolate fondant", ar: "فوندان شوكولا" }, priceDh: 35 },
      { id: "tarte-citron", name: { fr: "Tarte au citron", en: "Lemon tart", ar: "تارت الحامض" }, priceDh: 30 },
      { id: "creme-caramel", name: { fr: "Crème caramel", en: "Cream caramel", ar: "كريم كراميل" }, priceDh: 30 },
      { id: "cheesecake", name: { fr: "Cheesecake", en: "Cheesecake", ar: "تشيز كيك" }, priceDh: 35 },
    ],
  },
  {
    id: "boissons",
    title: { fr: "Boissons", en: "Drinks", ar: "مشروبات" },
    items: [
      { id: "eau-gazeuse-50", name: { fr: "Eau gazeuse 50 cl", en: "Sparkling water 50 cl", ar: "ماء غازي 50 cl" }, priceDh: 15 },
      { id: "eau-gazeuse-1l", name: { fr: "Eau gazeuse 1 l", en: "Sparkling water 1 l", ar: "ماء غازي 1 l" }, priceDh: 20 },
      { id: "eau-minerale-50", name: { fr: "Eau minérale 50 cl", en: "Mineral water 50 cl", ar: "ماء معدني 50 cl" }, priceDh: 10 },
      { id: "eau-minerale-1l", name: { fr: "Eau minérale 1 l", en: "Mineral water 1 l", ar: "ماء معدني 1 l" }, priceDh: 15 },
      { id: "soda", name: { fr: "Soda", en: "Soda", ar: "صودا" }, priceDh: 13 },
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
        signature: true,
      },
      { id: "cafe-al-walima", name: { fr: "Café Al Walima", en: "Al Walima coffee", ar: "قهوة الوليمة" }, priceDh: 20 },
    ],
  },
  {
    id: "jus",
    title: { fr: "Jus", en: "Juices", ar: "عصائر" },
    items: [
      { id: "jus-barbabas", name: { fr: "Jus de betteraves", en: "Beetroot juice", ar: "عصير باربة" }, priceDh: 25 },
      { id: "jus-carotte", name: { fr: "Jus de carottes", en: "Carrot juice", ar: "عصير الجزر" }, priceDh: 25 },
      { id: "jus-orange", name: { fr: "Jus d'orange", en: "Orange juice", ar: "عصير البرتقال" }, priceDh: 25 },
      { id: "jus-concombre", name: { fr: "Jus de concombre", en: "Cucumber juice", ar: "عصير الخيار" }, priceDh: 25 },
    ],
  },
];

export const MENU_CATEGORIES = enrichMenuCategories(RAW_MENU_CATEGORIES);
