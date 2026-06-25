import { createCanvas } from "@napi-rs/canvas";
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PDF_PATH = join(ROOT, "walima 2026.pdf");
const OUT_DIR = join(ROOT, "public", "assets", "menu", "pages");
const MANIFEST_PATH = join(ROOT, "src", "lib", "menuFlipbookManifest.json");

const MAX_EDGE_PX = 4000;

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  return pdfjs;
}

async function pageToImage(page, pageNumber) {
  const viewport = page.getViewport({ scale: 1 });
  const scale = MAX_EDGE_PX / Math.max(viewport.width, viewport.height);
  const scaled = page.getViewport({ scale });

  const canvas = createCanvas(Math.floor(scaled.width), Math.floor(scaled.height));
  const context = canvas.getContext("2d");

  await page.render({
    canvasContext: context,
    viewport: scaled,
    canvas,
  }).promise;

  const buffer = canvas.toBuffer("image/png");
  const filename = `page-${String(pageNumber).padStart(3, "0")}.png`;
  const filePath = join(OUT_DIR, filename);
  writeFileSync(filePath, buffer);

  return {
    id: `page-${pageNumber}`,
    src: `/assets/menu/pages/${filename}`,
    width: canvas.width,
    height: canvas.height,
    pageNumber,
  };
}

async function main() {
  if (!existsSync(PDF_PATH)) {
    console.error(`Missing PDF: ${PDF_PATH}`);
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const hasAllPages =
    existsSync(MANIFEST_PATH) &&
    Array.from({ length: 8 }, (_, i) =>
      existsSync(join(OUT_DIR, `page-${String(i + 1).padStart(3, "0")}.png`)),
    ).every(Boolean);

  if (hasAllPages) {
    console.log("Menu flipbook pages already present — skipping PDF render.");
    return;
  }

  for (const file of readdirSync(OUT_DIR)) {
    if (file.endsWith(".webp") || file.endsWith(".jpg") || file.endsWith(".jpeg")) {
      unlinkSync(join(OUT_DIR, file));
    }
  }

  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await import("node:fs").then((fs) => fs.promises.readFile(PDF_PATH)));

  const pdf = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  const pages = [];

  console.log(`Rendering ${pdf.numPages} pages from walima 2026.pdf...`);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const meta = await pageToImage(page, i);
    pages.push(meta);
    console.log(`  ✓ ${meta.src} (${meta.width}×${meta.height})`);
  }

  const manifest = {
    source: "walima 2026.pdf",
    generatedAt: new Date().toISOString(),
    pageCount: pages.length,
    pages: pages.map(({ id, src, width, height, pageNumber }) => ({
      id,
      src,
      width,
      height,
      pageNumber,
    })),
  };

  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote manifest (${pages.length} pages) → ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
