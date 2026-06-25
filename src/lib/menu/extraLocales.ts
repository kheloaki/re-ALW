import type { Locale } from "@/i18n/config";

type ExtraLocale = Extract<Locale, "es" | "pl" | "de">;

export const MENU_EXTRA_LOCALES: Record<ExtraLocale, Record<string, string>> = {
  es: {
    // Categories
    salades: "Ensaladas",
    entrees: "Entradas marroquíes",
    "plats-marocains": "Platos marroquíes",
    couscous: "Cuscús",
    tajines: "Tajines",
    pates: "Pastas",
    grillades: "Parrilladas",
    plats: "Platos",
    pizzas: "Pizzas",
    "menu-enfant": "Menú infantil",
    desserts: "Postres",
    boissons: "Bebidas",
    "boissons-chaudes": "Bebidas calientes",
    jus: "Zumos",

    // Subtitles
    "couscous-subtitle": "Cada viernes",
    "pates-subtitle": "Penne o espaguetis",

    // Salades
    "salade-marocaine": "Ensalada marroquí",
    "salade-thonara": "Ensalada thonara",
    "salade-nicoise": "Ensalada niçoise",
    "salade-avocat-crevettes": "Ensalada de aguacate y gambas",
    "salade-avocat-mangue": "Ensalada de aguacate, mango y gambas",
    "salade-al-walima": "Ensalada Al Walima",

    // Entrées
    "legumes-sautes": "Verduras salteadas",
    carottes: "Zanahorias aliñadas",
    zaalouk: "Zaalouk",
    riz: "Arroz",
    "pommes-assaisonnees": "Patatas aliñadas",
    frites: "Patatas fritas",
    betteraves: "Remolacha aliñada",
    epinards: "Espinacas",
    "carottes-confites": "Zanahorias confitadas",
    "briouat-fromage": "Briouat de pollo con queso",
    "cigars-vegetariens": "Rollitos vegetarianos",
    citrouille: "Calabaza confitada",
    semoule: "Sémola",

    // Plats marocains
    "viande-1-4": "Carne Al Walima 1/4 kg (cordero)",
    "viande-1-2": "Carne Al Walima 1/2 kg (cordero)",
    "viande-1kg": "Carne Al Walima 1 kg (cordero)",
    kourain: "Kourain (pies de ternera)",
    "seffa-nature": "Seffa natural (cabellos de ángel)",
    "seffa-royal": "Seffa real (cabellos de ángel)",
    rafissa: "Rafissa de pollo",
    "pastilla-poulet": "Pastela de pollo",
    "pastilla-mer": "Pastela de mariscos",

    // Couscous
    "couscous-vegetarien": "Vegetariano",
    "couscous-poulet": "Pollo",
    "couscous-boeuf": "Ternera",
    "couscous-agneau": "Cordero",
    "couscous-royal": "Real (merguez, carne picada, ternera, pollo)",
    "couscous-legumes": "Suplemento de verduras",
    "couscous-tfaya": "Suplemento tfaya",
    "couscous-leben": "Suplemento leben",

    // Tajines
    "tajine-poulet": "Tajine de pollo a la marroquí",
    "tajine-lotte": "Tajine de rape (pescado)",
    "tajine-agneau-pruneaux": "Tajine de cordero con ciruelas",
    "tajine-agneau-figues": "Tajine de cordero con higos secos",
    "tajine-boeuf-pruneaux": "Tajine de ternera con ciruelas",
    "tajine-boeuf-figues": "Tajine de ternera con higos secos",
    "tajine-fruits-mer": "Tajine de mariscos",
    "tajine-kefta": "Tajine de carne picada (ternera)",
    "tajine-vegetarien": "Tajine vegetariano",
    "tajine-crevettes": "Tajine de gambas (salsa de tomate)",
    "tajine-crevettes-provencale": "Tajine de gambas a la provenzal",
    "tajine-moules": "Tajine de mejillones",
    "tanjia-1-4": "Tanjia 1/4 kg (ternera)",
    "tanjia-1-2": "Tanjia 1/2 kg (ternera)",
    "tanjia-1kg": "Tanjia 1 kg (ternera)",

    // Pâtes
    "pates-mer": "Mariscos",
    "pates-bolognaise": "Boloñesa",
    "pates-poulet": "Pollo",
    "pates-vegetarien": "Vegetariana",

    // Grillades
    "mixte-al-walima": "Parrillada mixta Al Walima",
    "brochettes-merguez": "Broquetas de merguez",
    "brochettes-poulet": "Broquetas de pollo",
    "brochettes-kefta": "Broquetas de carne picada",

    // Plats
    "emince-boeuf-champignons": "Ternera en tiras con salsa de champiñones",
    entrecote: "Entrecot con champiñones",
    "saint-pierre": "Filete de San Pedro",
    "poulet-champignons": "Pollo en tiras con salsa de champiñones",

    // Pizzas
    "pizza-quatre-fromages": "Pizza cuatro quesos",
    "pizza-mer": "Pizza de mariscos",
    "pizza-thonnara": "Pizza thonara",
    "pizza-poulet": "Pizza de pollo y champiñones",
    "pizza-portofino": "Pizza Portofino",
    "pizza-margherita": "Pizza margarita",
    "pizza-vegetarienne": "Pizza vegetariana",

    // Menu enfant
    "menu-enfant-complet": "Menú infantil",
    "menu-enfant-complet-desc":
      "Mini pizza o 6 piezas, nuggets de pollo, patatas fritas, zumo de naranja, agua mineral",

    // Desserts
    tiramisu: "Tiramisu",
    fondant: "Fondant de chocolate",
    "tarte-citron": "Tarta de limón",
    "creme-caramel": "Flan de caramelo",
    cheesecake: "Cheesecake",

    // Boissons
    "eau-gazeuse-50": "Agua con gas 50 cl",
    "eau-gazeuse-1l": "Agua con gas 1 l",
    "eau-minerale-50": "Agua mineral 50 cl",
    "eau-minerale-1l": "Agua mineral 1 l",
    soda: "Refresco",

    // Boissons chaudes
    "the-al-walima": "Té Al Walima",
    "the-marocain": "Té marroquí",
    "cafe-al-walima": "Café Al Walima",

    // Jus
    "jus-barbabas": "Zumo de remolacha",
    "jus-carotte": "Zumo de zanahoria",
    "jus-orange": "Zumo de naranja",
    "jus-concombre": "Zumo de pepino",
  },

  pl: {
    // Categories
    salades: "Sałatki",
    entrees: "Przystawki marokańskie",
    "plats-marocains": "Dania marokańskie",
    couscous: "Kuskus",
    tajines: "Tadżiny",
    pates: "Makaron",
    grillades: "Grill",
    plats: "Dania",
    pizzas: "Pizze",
    "menu-enfant": "Menu dla dzieci",
    desserts: "Desery",
    boissons: "Napoje",
    "boissons-chaudes": "Napoje gorące",
    jus: "Soki",

    // Subtitles
    "couscous-subtitle": "W każdy piątek",
    "pates-subtitle": "Penne lub spaghetti",

    // Salades
    "salade-marocaine": "Sałatka marokańska",
    "salade-thonara": "Sałatka thonara",
    "salade-nicoise": "Sałatka nicoise",
    "salade-avocat-crevettes": "Sałatka z awokado i krewetek",
    "salade-avocat-mangue": "Sałatka z awokado, mango i krewetek",
    "salade-al-walima": "Sałatka Al Walima",

    // Entrées
    "legumes-sautes": "Smażone warzywa",
    carottes: "Marchewka przyprawiona",
    zaalouk: "Zaalouk",
    riz: "Ryż",
    "pommes-assaisonnees": "Przyprawione ziemniaki",
    frites: "Frytki",
    betteraves: "Przyprawiony burak",
    epinards: "Szpinak",
    "carottes-confites": "Karmelizowana marchewka",
    "briouat-fromage": "Briouat z kurczakiem i serem",
    "cigars-vegetariens": "Roladki wegetariańskie",
    citrouille: "Karmelizowana dynia",
    semoule: "Kasza",

    // Plats marocains
    "viande-1-4": "Mięso Al Walima 1/4 kg (baranina)",
    "viande-1-2": "Mięso Al Walima 1/2 kg (baranina)",
    "viande-1kg": "Mięso Al Walima 1 kg (baranina)",
    kourain: "Kourain (wołowa noga)",
    "seffa-nature": "Seffa naturalna (włoski aniołka)",
    "seffa-royal": "Seffa królewska (włoski aniołka)",
    rafissa: "Rafissa z kurczakiem",
    "pastilla-poulet": "Pastilla z kurczakiem",
    "pastilla-mer": "Pastilla z owocami morza",

    // Couscous
    "couscous-vegetarien": "Wegetariański",
    "couscous-poulet": "Z kurczakiem",
    "couscous-boeuf": "Wołowina",
    "couscous-agneau": "Baranina",
    "couscous-royal": "Królewski (merguez, mięso mielone, wołowina, kurczak)",
    "couscous-legumes": "Dodatkowe warzywa",
    "couscous-tfaya": "Dodatkowa tfaya",
    "couscous-leben": "Dodatkowy leben",

    // Tajines
    "tajine-poulet": "Tadżin z kurczakiem po marokańsku",
    "tajine-lotte": "Tadżin z morskim wilkiem",
    "tajine-agneau-pruneaux": "Tadżin z baraniną i śliwkami",
    "tajine-agneau-figues": "Tadżin z baraniną i suszonymi figami",
    "tajine-boeuf-pruneaux": "Tadżin z wołowiną i śliwkami",
    "tajine-boeuf-figues": "Tadżin z wołowiną i suszonymi figami",
    "tajine-fruits-mer": "Tadżin z owocami morza",
    "tajine-kefta": "Tadżin z mięsem mielonym (wołowina)",
    "tajine-vegetarien": "Tadżin wegetariański",
    "tajine-crevettes": "Tadżin z krewetkami (sos pomidorowy)",
    "tajine-crevettes-provencale": "Tadżin z krewetkami po prowansalsku",
    "tajine-moules": "Tadżin z małżami",
    "tanjia-1-4": "Tanjia 1/4 kg (wołowina)",
    "tanjia-1-2": "Tanjia 1/2 kg (wołowina)",
    "tanjia-1kg": "Tanjia 1 kg (wołowina)",

    // Pâtes
    "pates-mer": "Owoce morza",
    "pates-bolognaise": "Bolognese",
    "pates-poulet": "Z kurczakiem",
    "pates-vegetarien": "Wegetariańska",

    // Grillades
    "mixte-al-walima": "Mieszany grill Al Walima",
    "brochettes-merguez": "Szaszłyki z merguez",
    "brochettes-poulet": "Szaszłyki z kurczakiem",
    "brochettes-kefta": "Szaszłyki z mięsem mielonym",

    // Plats
    "emince-boeuf-champignons": "Plastry wołowiny w sosie grzybowym",
    entrecote: "Entrecôte z pieczarkami",
    "saint-pierre": "Filet z ryby św. Piotra",
    "poulet-champignons": "Plastry kurczaka w sosie grzybowym",

    // Pizzas
    "pizza-quatre-fromages": "Pizza cztery sery",
    "pizza-mer": "Pizza z owocami morza",
    "pizza-thonnara": "Pizza thonara",
    "pizza-poulet": "Pizza z kurczakiem i pieczarkami",
    "pizza-portofino": "Pizza Portofino",
    "pizza-margherita": "Pizza Margherita",
    "pizza-vegetarienne": "Pizza wegetariańska",

    // Menu enfant
    "menu-enfant-complet": "Menu dla dzieci",
    "menu-enfant-complet-desc":
      "Mini pizza lub 6 sztuk, nuggetsy z kurczaka, frytki, sok pomarańczowy, woda mineralna",

    // Desserts
    tiramisu: "Tiramisu",
    fondant: "Czekoladowy fondant",
    "tarte-citron": "Tarta cytrynowa",
    "creme-caramel": "Krem karmelowy",
    cheesecake: "Sernik",

    // Boissons
    "eau-gazeuse-50": "Woda gazowana 50 cl",
    "eau-gazeuse-1l": "Woda gazowana 1 l",
    "eau-minerale-50": "Woda mineralna 50 cl",
    "eau-minerale-1l": "Woda mineralna 1 l",
    soda: "Napój gazowany",

    // Boissons chaudes
    "the-al-walima": "Herbata Al Walima",
    "the-marocain": "Herbata marokańska",
    "cafe-al-walima": "Kawa Al Walima",

    // Jus
    "jus-barbabas": "Sok z buraka",
    "jus-carotte": "Sok marchewkowy",
    "jus-orange": "Sok pomarańczowy",
    "jus-concombre": "Sok ogórkowy",
  },

  de: {
    // Categories
    salades: "Salate",
    entrees: "Marokkanische Vorspeisen",
    "plats-marocains": "Marokkanische Gerichte",
    couscous: "Couscous",
    tajines: "Tajines",
    pates: "Pasta",
    grillades: "Grillgerichte",
    plats: "Gerichte",
    pizzas: "Pizzen",
    "menu-enfant": "Kindermenü",
    desserts: "Desserts",
    boissons: "Getränke",
    "boissons-chaudes": "Heißgetränke",
    jus: "Säfte",

    // Subtitles
    "couscous-subtitle": "Jeden Freitag",
    "pates-subtitle": "Penne oder Spaghetti",

    // Salades
    "salade-marocaine": "Marokkanischer Salat",
    "salade-thonara": "Thonara-Salat",
    "salade-nicoise": "Salade niçoise",
    "salade-avocat-crevettes": "Salat mit Avocado und Garnelen",
    "salade-avocat-mangue": "Salat mit Avocado, Mango und Garnelen",
    "salade-al-walima": "Al Walima Salat",

    // Entrées
    "legumes-sautes": "Sautiertes Gemüse",
    carottes: "Würzige Karotten",
    zaalouk: "Zaalouk",
    riz: "Reis",
    "pommes-assaisonnees": "Würzige Kartoffeln",
    frites: "Pommes frites",
    betteraves: "Würzige Rote Bete",
    epinards: "Spinat",
    "carottes-confites": "Kandierte Karotten",
    "briouat-fromage": "Hähnchen-Briouat mit Käse",
    "cigars-vegetariens": "Vegetarische Zigarren",
    citrouille: "Kandierter Kürbis",
    semoule: "Grieß",

    // Plats marocains
    "viande-1-4": "Al Walima Fleisch 1/4 kg (Lamm)",
    "viande-1-2": "Al Walima Fleisch 1/2 kg (Lamm)",
    "viande-1kg": "Al Walima Fleisch 1 kg (Lamm)",
    kourain: "Kourain (Rinderfüße)",
    "seffa-nature": "Seffa natur (Engels-Haar)",
    "seffa-royal": "Seffa royal (Engels-Haar)",
    rafissa: "Hähnchen-Rafissa",
    "pastilla-poulet": "Hähnchen-Pastilla",
    "pastilla-mer": "Meeresfrüchte-Pastilla",

    // Couscous
    "couscous-vegetarien": "Vegetarisch",
    "couscous-poulet": "Mit Hähnchen",
    "couscous-boeuf": "Rind",
    "couscous-agneau": "Lamm",
    "couscous-royal": "Royal (Merguez, Hackfleisch, Rind, Hähnchen)",
    "couscous-legumes": "Extra Gemüse",
    "couscous-tfaya": "Extra Tfaya",
    "couscous-leben": "Extra Leben",

    // Tajines
    "tajine-poulet": "Marokkanischer Hähnchen-Tajine",
    "tajine-lotte": "Seeteufel-Tajine",
    "tajine-agneau-pruneaux": "Lamm-Tajine mit Pflaumen",
    "tajine-agneau-figues": "Lamm-Tajine mit getrockneten Feigen",
    "tajine-boeuf-pruneaux": "Rind-Tajine mit Pflaumen",
    "tajine-boeuf-figues": "Rind-Tajine mit getrockneten Feigen",
    "tajine-fruits-mer": "Meeresfrüchte-Tajine",
    "tajine-kefta": "Hackfleisch-Tajine (Rind)",
    "tajine-vegetarien": "Vegetarischer Tajine",
    "tajine-crevettes": "Garnelen-Tajine (Tomatensoße)",
    "tajine-crevettes-provencale": "Garnelen-Tajine à la Provençale",
    "tajine-moules": "Muschel-Tajine",
    "tanjia-1-4": "Tanjia 1/4 kg (Rind)",
    "tanjia-1-2": "Tanjia 1/2 kg (Rind)",
    "tanjia-1kg": "Tanjia 1 kg (Rind)",

    // Pâtes
    "pates-mer": "Meeresfrüchte",
    "pates-bolognaise": "Bolognese",
    "pates-poulet": "Mit Hähnchen",
    "pates-vegetarien": "Vegetarisch",

    // Grillades
    "mixte-al-walima": "Al Walima Grillteller",
    "brochettes-merguez": "Merguez-Spieße",
    "brochettes-poulet": "Hähnchenspieße",
    "brochettes-kefta": "Hackfleischspieße",

    // Plats
    "emince-boeuf-champignons": "Rindfleischstreifen mit Pilzsoße",
    entrecote: "Entrecôte mit Champignons",
    "saint-pierre": "Heilbuttfilet",
    "poulet-champignons": "Hähnchenstreifen mit Pilzsoße",

    // Pizzas
    "pizza-quatre-fromages": "Vier-Käse-Pizza",
    "pizza-mer": "Meeresfrüchte-Pizza",
    "pizza-thonnara": "Thonara-Pizza",
    "pizza-poulet": "Hähnchen-Pilz-Pizza",
    "pizza-portofino": "Portofino-Pizza",
    "pizza-margherita": "Pizza Margherita",
    "pizza-vegetarienne": "Vegetarische Pizza",

    // Menu enfant
    "menu-enfant-complet": "Kindermenü",
    "menu-enfant-complet-desc":
      "Mini-Pizza oder 6 Stück, Hähnchen-Nuggets, Pommes frites, Orangensaft, Mineralwasser",

    // Desserts
    tiramisu: "Tiramisu",
    fondant: "Schokoladenfondant",
    "tarte-citron": "Zitronentarte",
    "creme-caramel": "Crème caramel",
    cheesecake: "Cheesecake",

    // Boissons
    "eau-gazeuse-50": "Sprudelwasser 50 cl",
    "eau-gazeuse-1l": "Sprudelwasser 1 l",
    "eau-minerale-50": "Mineralwasser 50 cl",
    "eau-minerale-1l": "Mineralwasser 1 l",
    soda: "Limonade",

    // Boissons chaudes
    "the-al-walima": "Al Walima Tee",
    "the-marocain": "Marokkanischer Tee",
    "cafe-al-walima": "Al Walima Kaffee",

    // Jus
    "jus-barbabas": "Rote-Bete-Saft",
    "jus-carotte": "Karottensaft",
    "jus-orange": "Orangensaft",
    "jus-concombre": "Gurkensaft",
  },
};

export function getMenuExtraLabel(key: string, locale: Locale): string | undefined {
  if (locale !== "es" && locale !== "pl" && locale !== "de") return undefined;
  return MENU_EXTRA_LOCALES[locale][key];
}
