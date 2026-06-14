#!/usr/bin/env node
/**
 * Compress reel videos for the home carousel (web-friendly size).
 *
 * Requires: ffmpeg
 * Usage:
 *   node scripts/compress-reels.mjs          # Reel-1 … Reel-8 (site carousel)
 *   node scripts/compress-reels.mjs --all    # every .webm in public/assets/reels/
 *
 * Originals are backed up to public/assets/reels/originals/ (gitignored).
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REELS_DIR = path.join(ROOT, "public", "assets", "reels");
const ORIGINALS_DIR = path.join(REELS_DIR, "originals");

const CAROUSEL_REELS = [
  "Reel-1",
  "Reel-2",
  "Reel-3",
  "Reel-4",
  "Reel-5",
  "Reel-6",
  "Reel-7",
  "Reel-8",
];

const compressAll = process.argv.includes("--all");

function ensureFfmpeg() {
  const check = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" });
  if (check.status !== 0) {
    console.error("ffmpeg is required. Install: brew install ffmpeg");
    process.exit(1);
  }
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

function compressOne(baseName) {
  const input = path.join(REELS_DIR, `${baseName}.webm`);
  if (!fs.existsSync(input)) {
    console.log(`skip ${baseName}.webm (missing)`);
    return;
  }

  fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
  const backup = path.join(ORIGINALS_DIR, `${baseName}.webm`);
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(input, backup);
    console.log(`backed up → originals/${baseName}.webm`);
  }

  const before = fs.statSync(input).size;
  const tempOut = path.join(REELS_DIR, `${baseName}.compressing.webm`);

  process.stdout.write(`compressing ${baseName}.webm (${formatKb(before)})… `);

  const args = [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    input,
    "-an",
    "-vf",
    "scale=-2:540",
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "40",
    "-b:v",
    "0",
    "-row-mt",
    "1",
    "-deadline",
    "good",
    "-cpu-used",
    "3",
    tempOut,
  ];

  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.status !== 0) {
    if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
    console.log("failed");
    return;
  }

  fs.renameSync(tempOut, input);
  const after = fs.statSync(input).size;
  const saved = Math.max(0, before - after);
  const pct = before > 0 ? Math.round((saved / before) * 100) : 0;
  console.log(`→ ${formatKb(after)} (−${pct}%)`);
}

function listTargets() {
  if (compressAll) {
    return fs
      .readdirSync(REELS_DIR)
      .filter((name) => name.endsWith(".webm") && !name.includes(".compressing."))
      .map((name) => name.replace(/\.webm$/, ""));
  }
  return CAROUSEL_REELS;
}

function main() {
  ensureFfmpeg();
  const targets = listTargets();
  if (!targets.length) {
    console.log("No reel files to compress.");
    return;
  }

  console.log(`Compressing ${targets.length} reel(s) to 540p VP9 (muted)…\n`);
  for (const base of targets) compressOne(base);
  console.log("\nDone. Deploy the smaller .webm files in public/assets/reels/.");
}

main();
