import { SIGNATURE_DISHES } from "@/lib/menu";

export const BRAND_LOGO_SRC = "/assets/logo-alwalima.avif";

/** LCP + header — only these block the home loader */
export const HERO_IMAGE_SRC = "/assets/hero-facade.avif";

export const HOME_CRITICAL_PRELOAD: string[] = [BRAND_LOGO_SRC, HERO_IMAGE_SRC];

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

/** Below-the-fold — do not delay first paint */
export const HOME_DEFERRED_PRELOAD: string[] = [
  "/assets/reservation-riad.avif",
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
