import { SIGNATURE_DISHES } from "@/lib/menu";

export const BRAND_LOGO_SRC = "/assets/logo-alwalima.png";

export const GALLERY_ASSET_PATHS = [
  "/assets/gallery-table-spread.avif",
  "/assets/gallery-tajine-prunes.avif",
  "/assets/gallery-ambiance.avif",
  "/assets/gallery-salad.avif",
  "/assets/gallery-instagram.avif",
  "/assets/gallery-platter.avif",
  "/assets/gallery-rfissa.avif",
  "/assets/gallery-seffa.avif",
  "/assets/gallery-paella.avif",
  "/assets/gallery-tea-pour.avif",
  "/assets/gallery-beet-salad.avif",
  "/assets/gallery-tagine-bread.avif",
  "/assets/gallery-pastilla.avif",
] as const;

const SIGNATURE_PATHS = Object.values(SIGNATURE_DISHES).map((d) => d.image);

/** Critical above-the-fold and carousel assets for the home page */
export const HOME_PRELOAD_ASSETS: string[] = [
  BRAND_LOGO_SRC,
  "/assets/hero-facade.png",
  "/assets/reservation-riad.jpg",
  ...SIGNATURE_PATHS,
  ...GALLERY_ASSET_PATHS,
];

export const HOME_LOADER_SESSION_KEY = "al-walima-home-preloaded";

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function preloadHomeAssets(urls: string[]): Promise<void> {
  const unique = [...new Set(urls)];
  return Promise.all(unique.map(preloadImage)).then(() => undefined);
}
