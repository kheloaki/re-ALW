import { SIGNATURE_DISHES } from "@/lib/menu";

export const BRAND_LOGO_SRC = "/assets/logo-alwalima.avif";

export const HERO_IMAGE_SRC = "/assets/hero-facade.avif";

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

const SIGNATURE_PATHS = Object.values(SIGNATURE_DISHES)
  .flatMap((d) => ("image" in d && d.image ? [d.image] : []));

/** All home media — loader waits for these before revealing the page */
export const HOME_PRELOAD_ASSETS: string[] = [
  BRAND_LOGO_SRC,
  HERO_IMAGE_SRC,
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
  return preloadHomeAssetsWithProgress(urls);
}

/** Preload images and report 0–100 progress (one step per asset). */
export function preloadHomeAssetsWithProgress(
  urls: string[],
  onProgress?: (percent: number) => void,
): Promise<void> {
  const unique = [...new Set(urls)];
  const total = unique.length;

  if (total === 0) {
    onProgress?.(100);
    return Promise.resolve();
  }

  let loaded = 0;
  const report = () => {
    loaded += 1;
    onProgress?.(Math.min(100, Math.round((loaded / total) * 100)));
  };

  return Promise.all(unique.map((src) => preloadImage(src).then(report))).then(() => {
    onProgress?.(100);
  });
}
