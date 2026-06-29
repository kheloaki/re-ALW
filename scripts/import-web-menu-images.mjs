import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SOURCE_DIRS = [
  process.env.WEB_MENU_DIR ?? "/Users/khalilakirar/Downloads/Al Walima/WEB MENU",
  process.env.WEB_MENU_DIR_2 ?? "/Users/khalilakirar/Downloads/Al Walima/WEB MENU 2 ",
].filter((dir) => existsSync(dir));

const OUT_DIR = join(process.cwd(), "public", "assets", "menu", "dishes");
const MAX_WIDTH = 1400;
const AVIF_QUALITY = 72;

/** Source filename (trimmed) → output basename without extension */
const FILE_MAP = [
  // WEB MENU
  ["Tagine Poulet (3).jpg", "menu-tajine-poulet"],
  ["Tagine VND (2).jpg", "menu-tajine-viande-figues"],
  ["Tangia (3).jpg", "menu-tanjia"],
  ["Pastila PL (5).jpg", "menu-pastilla-poulet"],
  ["Pastila POS (2).jpg", "menu-pastilla-mer"],
  ["Seffa (5).jpg", "menu-seffa"],
  ["Keriin (1).jpg", "menu-kourain"],
  ["Briwatt (3).jpg", "menu-briouat"],
  ["Frite (2).jpg", "menu-frites"],
  ["Tim (5).jpg", "menu-mezze-trio"],
  ["Salade UIO (5).jpg", "menu-salade-al-walima"],
  ["Plat SBLN (3).jpg", "menu-poisson-creme"],
  ["Thé (3).jpg", "menu-the-marocain"],
  ["Thé (3).jpg", "menu-the-marocain"],
  ["Café (2).jpg", "menu-cafe-al-walima"],
  ["Café (2).jpg", "menu-cafe-al-walima"],
  ["Desert CKL (1).jpg", "menu-tiramisu"],
  ["Desert LOTS (3).jpg", "menu-cheesecake"],
  ["Desert FLN (2).jpg", "menu-creme-caramel"],
  ["Desert CITR (2).jpg", "menu-tarte-citron"],
  // WEB MENU 2
  ["Plat VND (2).jpg", "menu-viande-al-walima"],
  ["Reffissa (3).jpg", "menu-rafissa"],
  ["Salade AVO (3).jpg", "menu-salade-avocat-crevettes"],
  ["Salade MR (1).jpg", "menu-salade-marocaine"],
  ["Salade NCS (2).jpg", "menu-salade-nicoise"],
  ["Seffa (2).jpg", "menu-seffa"],
  ["Tagine KEF (3).jpg", "menu-tajine-kefta"],
  ["Tagine POIS (2).jpg", "menu-tajine-crevettes"],
  ["Tim (1).jpg", "menu-zaalouk-tim1"],
  ["Tim (2).jpg", "menu-carottes"],
  ["Tim (3).jpg", "menu-carottes-confites"],
];

function normalizeName(name) {
  return name.normalize("NFC").trim();
}

function findSourceFile(targetName) {
  const normalizedTarget = normalizeName(targetName);

  for (const sourceDir of SOURCE_DIRS) {
    for (const file of readdirSync(sourceDir)) {
      if (file === ".DS_Store") continue;
      if (normalizeName(file) === normalizedTarget) {
        return join(sourceDir, file);
      }
    }
  }
  return null;
}

async function convertOne(sourcePath, outBase) {
  const outPath = join(OUT_DIR, `${outBase}.avif`);
  await sharp(sourcePath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .avif({ quality: AVIF_QUALITY, effort: 4 })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  console.log(`  ✓ ${outBase}.avif ← ${sourcePath} (${meta.width}×${meta.height})`);
  return `/assets/menu/dishes/${outBase}.avif`;
}

async function main() {
  if (SOURCE_DIRS.length === 0) {
    console.error("No WEB MENU source folders found.");
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const seen = new Set();

  console.log("Importing from:");
  for (const dir of SOURCE_DIRS) console.log(`  • ${dir}`);
  console.log("");

  for (const [sourceName, outBase] of FILE_MAP) {
    const sourcePath = findSourceFile(sourceName);
    if (!sourcePath) {
      if (!seen.has(outBase)) console.warn(`  ⚠ missing: ${sourceName}`);
      continue;
    }

    seen.add(outBase);
    await convertOne(sourcePath, outBase);
  }

  console.log(`\nDone — ${seen.size} images → ${OUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
