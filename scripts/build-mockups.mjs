/**
 * Mockup asset pipeline.
 *
 * `next.config.ts` uses `output: "export"` with `images.unoptimized`, so Next
 * ships /public byte-for-byte and never generates WebP or a srcset. This script
 * does that job ahead of time:
 *
 *   1. Reads each source PNG in public/assets.
 *   2. Crops to the alpha bounding box — the renders are transparent device
 *      shots and carry 20-26% dead margin, which would otherwise eat the
 *      showcase stage height.
 *   3. Writes WebP variants at each requested width.
 *   4. Writes a manifest so the component never hardcodes dimensions.
 *
 * Re-run after replacing any source PNG:
 *
 *     npm run build:mockups
 *
 * Generated files (WebP + manifest) are derived artifacts — regenerate them
 * rather than editing by hand.
 */
import sharp from "sharp";
import { readFile, writeFile, unlink, readdir } from "node:fs/promises";
import path from "node:path";

const ASSETS = "public/assets";
const MANIFEST = "src/lib/mockups.generated.json";

/** Sources to process. Add an entry here when a new mockup is introduced. */
const SOURCES = [
  "compaign-mockup",
  "chats-mockup",
  "chats-ai-detail",
  "automation-template",
  "analytics-mockup",
  "click-to-whatsapp",
];

/** Widths to emit. A width above the cropped source is skipped, never upscaled. */
const TARGET_WIDTHS = [800, 1600];

/** Alpha at or above this counts as content; below it is treated as margin. */
const ALPHA_THRESHOLD = 10;
/** Breathing room kept around the content so soft shadows are never clipped. */
const PAD = 4;

async function alphaBounds(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * c + 3] >= ALPHA_THRESHOLD) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }

  // Fully transparent image: fall back to the full frame rather than crash.
  if (x1 < 0) return { left: 0, top: 0, width: w, height: h, cropped: false };

  const left = Math.max(0, x0 - PAD);
  const top = Math.max(0, y0 - PAD);
  return {
    left,
    top,
    width: Math.min(w - left, x1 - x0 + 1 + PAD * 2),
    height: Math.min(h - top, y1 - y0 + 1 + PAD * 2),
    cropped: true,
    source: { width: w, height: h },
  };
}

async function staleVariants(base, keep) {
  const kept = new Set(keep.map((w) => `${base}-${w}.webp`));
  const files = await readdir(ASSETS);
  return files.filter(
    (f) => f.startsWith(`${base}-`) && f.endsWith(".webp") && !kept.has(f)
  );
}

const manifest = {};
let totalKb = 0;

for (const base of SOURCES) {
  const src = path.join(ASSETS, `${base}.png`);

  try {
    await readFile(src);
  } catch {
    console.error(`  MISSING  ${src} — skipped`);
    continue;
  }

  const box = await alphaBounds(src);
  const cropped = sharp(src).extract({
    left: box.left,
    top: box.top,
    width: box.width,
    height: box.height,
  });
  const buf = await cropped.toBuffer();

  const widths = TARGET_WIDTHS.filter((w) => w < box.width);
  // Always emit the cropped native width as the largest variant.
  widths.push(box.width);

  const emitted = [];
  for (const w of widths) {
    const dest = path.join(ASSETS, `${base}-${w}.webp`);
    const { size } = await sharp(buf)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(dest);
    emitted.push({ w, kb: size / 1024 });
    totalKb += size / 1024;
  }

  for (const old of await staleVariants(base, widths)) {
    await unlink(path.join(ASSETS, old));
    console.log(`  removed stale ${old}`);
  }

  manifest[base] = {
    base,
    width: box.width,
    height: box.height,
    variants: widths,
  };

  const pct = box.source
    ? ` (trimmed ${Math.round(
        (1 - (box.width * box.height) / (box.source.width * box.source.height)) * 100
      )}% margin)`
    : "";
  console.log(
    `${base.padEnd(22)} ${box.width}x${box.height}${pct}  ->  ` +
      emitted.map((e) => `${e.w}w ${e.kb.toFixed(0)}KB`).join("  ")
  );
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\ntotal WebP: ${(totalKb / 1024).toFixed(2)}MB`);
console.log(`manifest:   ${MANIFEST}`);
