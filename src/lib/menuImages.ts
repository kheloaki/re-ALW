/** Default dish photo when no specific match exists */
export const DEFAULT_MENU_IMAGE = "/assets/gallery-table-spread.avif";

/** Category pools — varied Moroccan imagery per section */
const CATEGORY_IMAGE_POOLS: Record<string, readonly string[]> = {
  salades: ["/assets/gallery-salad.avif", "/assets/gallery-beet-salad.avif", "/assets/gallery-platter.avif"],
  entrees: ["/assets/gallery-tagine-bread.avif", "/assets/gallery-table-spread.avif", "/assets/gallery-ambiance.avif"],
  "plats-marocains": [
    "/assets/gallery-rfissa.avif",
    "/assets/gallery-pastilla.avif",
    "/assets/gallery-seffa.avif",
    "/assets/gallery-platter.avif",
  ],
  couscous: ["/assets/couscous-royal.avif", "/assets/gallery-platter.avif"],
  tajines: [
    "/assets/tajine-olives.avif",
    "/assets/gallery-tajine-prunes.avif",
    "/assets/gallery-tajine-chicken.avif",
    "/assets/gallery-tagine-bread.avif",
  ],
  pates: ["/assets/gallery-paella.avif", "/assets/gallery-platter.avif"],
  grillades: ["/assets/brochettes.avif", "/assets/gallery-platter.avif"],
  plats: ["/assets/gallery-platter.avif", "/assets/gallery-ambiance.avif", "/assets/gallery-table-spread.avif"],
  pizzas: ["/assets/gallery-table-spread.avif", "/assets/gallery-platter.avif"],
  "menu-enfant": ["/assets/gallery-table-spread.avif", "/assets/brochettes.avif"],
  desserts: ["/assets/gallery-instagram.avif", "/assets/gallery-table-spread.avif"],
  boissons: ["/assets/gallery-tea-pour.avif", "/assets/mint-tea.avif"],
  "boissons-chaudes": ["/assets/mint-tea.avif", "/assets/gallery-tea-pour.avif"],
  jus: ["/assets/gallery-tea-pour.avif", "/assets/gallery-beet-salad.avif"],
};

/** Best-match photo per plat (overrides category pool) */
const MENU_ITEM_IMAGE_OVERRIDES: Record<string, string> = {
  "salade-marocaine": "/assets/gallery-salad.avif",
  "salade-al-walima": "/assets/gallery-beet-salad.avif",
  "salade-chef": "/assets/gallery-platter.avif",
  zaalouk: "/assets/gallery-tagine-bread.avif",
  "briouat-fromage": "/assets/gallery-pastilla.avif",
  "cigars-vegetariens": "/assets/gallery-tagine-bread.avif",
  betteraves: "/assets/gallery-beet-salad.avif",
  "couscous-royal": "/assets/couscous-royal.avif",
  "couscous-poulet": "/assets/couscous-royal.avif",
  "couscous-vegetarien": "/assets/gallery-platter.avif",
  "tajine-poulet": "/assets/tajine-olives.avif",
  "tajine-agneau-pruneaux": "/assets/gallery-tajine-prunes.avif",
  "tajine-lotte": "/assets/gallery-tajine-chicken.avif",
  "tajine-fruits-mer": "/assets/gallery-paella.avif",
  "tajine-crevettes": "/assets/gallery-paella.avif",
  "pastilla-poulet": "/assets/gallery-pastilla.avif",
  "pastilla-mer": "/assets/gallery-pastilla.avif",
  "rafissa": "/assets/gallery-rfissa.avif",
  "seffa-nature": "/assets/gallery-seffa.avif",
  "seffa-royal": "/assets/gallery-seffa.avif",
  "mixte-al-walima": "/assets/brochettes.avif",
  "brochettes-poulet": "/assets/brochettes.avif",
  "brochettes-kefta": "/assets/brochettes.avif",
  "brochettes-merguez": "/assets/brochettes.avif",
  "the-marocain": "/assets/mint-tea.avif",
  "the-al-walima": "/assets/mint-tea.avif",
  "pates-mer": "/assets/gallery-paella.avif",
  entrecote: "/assets/gallery-platter.avif",
  "saint-pierre": "/assets/gallery-tajine-chicken.avif",
};

function poolIndex(id: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % 2147483647;
  }
  return hash % length;
}

export function resolveMenuItemImage(
  itemId: string,
  categoryId: string,
  explicitImage?: string,
): string {
  if (explicitImage) return explicitImage;
  if (MENU_ITEM_IMAGE_OVERRIDES[itemId]) return MENU_ITEM_IMAGE_OVERRIDES[itemId];
  const pool = CATEGORY_IMAGE_POOLS[categoryId];
  if (pool?.length) return pool[poolIndex(itemId, pool.length)]!;
  return DEFAULT_MENU_IMAGE;
}
