import fs from "fs";
import path from "path";

export type ReelVideo = {
  id: string;
  /** Primary video URL (.webm preferred, else .mp4) */
  webm: string;
  mp4?: string;
  poster?: string;
};

const REELS_DIR = path.join(process.cwd(), "public", "assets", "reels");
const VIDEO_EXT = /\.(webm|mp4)$/i;

function reelPublicPath(filename: string): string {
  return `/assets/reels/${filename}`;
}

function findPoster(baseName: string, files: Set<string>): string | undefined {
  for (const ext of [".avif", ".jpg", ".jpeg", ".webp", ".png"]) {
    const name = `${baseName}${ext}`;
    if (files.has(name)) return reelPublicPath(name);
  }
  return undefined;
}

/** Reads `public/assets/reels/` at build/request time (server only). */
function discoverReelsFromDisk(): ReelVideo[] {
  if (!fs.existsSync(REELS_DIR)) return [];

  const allFiles = fs.readdirSync(REELS_DIR).filter((name) => !name.startsWith("."));
  if (!allFiles.length) return [];

  const fileSet = new Set(allFiles);
  const bases = new Set<string>();

  for (const file of allFiles) {
    if (VIDEO_EXT.test(file)) bases.add(file.replace(VIDEO_EXT, ""));
  }

  const reels: ReelVideo[] = [];

  for (const base of Array.from(bases).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
    const webmFile = fileSet.has(`${base}.webm`) ? `${base}.webm` : undefined;
    const mp4File = fileSet.has(`${base}.mp4`) ? `${base}.mp4` : undefined;
    if (!webmFile && !mp4File) continue;

    reels.push({
      id: `reel-${base}`,
      webm: reelPublicPath(webmFile ?? mp4File!),
      mp4: webmFile && mp4File ? reelPublicPath(mp4File) : undefined,
      poster: findPoster(base, fileSet),
    });
  }

  return reels;
}

function parseEnvReelEntry(raw: string, index: number): ReelVideo | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const parts = trimmed.split("|").map((p) => p.trim());
  const webm = parts[0];
  if (!webm) return null;

  const resolve = (file: string) => (file.startsWith("/") ? file : reelPublicPath(file));
  const src = resolve(webm);
  const mp4 = parts[1] ? resolve(parts[1]) : undefined;
  const poster = parts[2] ? resolve(parts[2]) : undefined;

  return {
    id: `reel-env-${index}`,
    webm: /\.(webm|mp4)$/i.test(src) ? src : `${src}.webm`,
    mp4,
    poster,
  };
}

/** Env override, otherwise every `.webm` / `.mp4` in `public/assets/reels/`. */
export function getReelVideos(): ReelVideo[] {
  const raw = process.env.NEXT_PUBLIC_REEL_VIDEOS?.trim();
  if (raw) {
    return raw
      .split(/[,;\n]+/)
      .map(parseEnvReelEntry)
      .filter((v): v is ReelVideo => v !== null);
  }

  return discoverReelsFromDisk();
}
