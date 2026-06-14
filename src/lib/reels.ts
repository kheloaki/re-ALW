import fs from "fs";
import path from "path";

export type ReelVideo = {
  id: string;
  video: string;
  mp4?: string;
  poster?: string;
};

const REELS_DIR = path.join(process.cwd(), "public", "assets", "reels");
const VIDEO_EXT = /\.webm$/i;
const CAROUSEL_REELS = 8;

function reelPublicPath(filename: string): string {
  return `/assets/reels/${filename}`;
}

function findPoster(baseName: string, files: Set<string>): string | undefined {
  for (const ext of [".jpg", ".jpeg", ".webp", ".avif", ".png"]) {
    const name = `${baseName}${ext}`;
    if (files.has(name)) return reelPublicPath(name);
  }
  return undefined;
}

function sortReelBase(a: string, b: string): number {
  const numA = Number(a.replace(/^Reel-/, ""));
  const numB = Number(b.replace(/^Reel-/, ""));
  if (Number.isFinite(numA) && Number.isFinite(numB)) return numA - numB;
  return a.localeCompare(b, undefined, { numeric: true });
}

/** Reads `public/assets/reels/Reel-*.webm` (server only). */
export function getReelVideos(): ReelVideo[] {
  if (!fs.existsSync(REELS_DIR)) return [];

  const allFiles = fs
    .readdirSync(REELS_DIR)
    .filter((name) => !name.startsWith(".") && !name.includes(".compressing."));
  if (!allFiles.length) return [];

  const fileSet = new Set(allFiles);
  const bases = new Set<string>();

  for (const file of allFiles) {
    if (VIDEO_EXT.test(file)) bases.add(file.replace(VIDEO_EXT, ""));
  }

  return Array.from(bases)
    .filter((base) => /^Reel-\d+$/.test(base))
    .sort(sortReelBase)
    .slice(0, CAROUSEL_REELS)
    .map((base) => ({
      id: `reel-${base.toLowerCase()}`,
      video: reelPublicPath(`${base}.webm`),
      mp4: fileSet.has(`${base}.mp4`) ? reelPublicPath(`${base}.mp4`) : undefined,
      poster: findPoster(base, fileSet),
    }));
}
