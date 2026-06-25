import manifest from "@/lib/menuFlipbookManifest.json";

export type MenuFlipbookPage = {
  id: string;
  src: string;
  width: number;
  height: number;
  pageNumber: number;
};

export function getMenuFlipbookPages(): MenuFlipbookPage[] {
  return manifest.pages;
}

export function getMenuFlipbookPageCount(): number {
  return manifest.pageCount;
}

/** QR-friendly path segment (locale is added by middleware / localePath). */
export const MENU_FLIPBOOK_PATH = "/menu/book";
