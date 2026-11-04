/**
 * Logo pipeline.
 *
 * The supplied brand file is a 1200x1200 JPEG holding a *stacked* lockup — the
 * handshake mark above the "dealup" wordmark — on an opaque white field. Two
 * problems for the web: JPEG cannot be transparent, so the white box shows on
 * the cream navbar, and rendering the whole stacked lockup at navbar height
 * makes the wordmark an illegible smudge.
 *
 * This script:
 *   1. Removes the background by flood-filling inward from the border. A plain
 *      "make white transparent" pass would punch holes through the hands, whose
 *      outlines are legitimately white — only background connected to the edge
 *      is cleared.
 *   2. Splits the lockup at the blank row band between mark and wordmark.
 *   3. Crops each part to its own bounding box and writes PNG + WebP.
 *
 * Re-run after replacing the source: npm run build:logo
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "public/assets/logos/main-logo.jpeg";
const OUT = "public/assets/logos";

/** A pixel this light, reachable from the border, is background. */
const WHITE = 238;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const isLight = (i) => data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE;

// ---- 1. Flood fill the background from every border pixel ----
const bg = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) {
  stack.push(x, (H - 1) * W + x);
}
for (let y = 0; y < H; y++) {
  stack.push(y * W, y * W + (W - 1));
}
while (stack.length) {
  const p = stack.pop();
  if (bg[p]) continue;
  if (!isLight(p * C)) continue;
  bg[p] = 1;
  const x = p % W;
  const y = (p - x) / W;
  if (x > 0) stack.push(p - 1);
  if (x < W - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - W);
  if (y < H - 1) stack.push(p + W);
}

for (let p = 0; p < W * H; p++) {
  if (bg[p]) data[p * C + 3] = 0;
}

const cleared = Math.round((bg.reduce((a, b) => a + b, 0) / (W * H)) * 100);
console.log(`background cleared: ${cleared}% of the frame`);

// ---- 2. Find the blank band separating mark from wordmark ----
const rowHasInk = new Uint8Array(H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (data[(y * W + x) * C + 3] > 8) {
      rowHasInk[y] = 1;
      break;
    }
  }
}
const bands = [];
let start = -1;
for (let y = 0; y < H; y++) {
  if (rowHasInk[y] && start < 0) start = y;
  if ((!rowHasInk[y] || y === H - 1) && start >= 0) {
    bands.push([start, rowHasInk[y] ? y : y - 1]);
    start = -1;
  }
}
console.log(`ink bands (top→bottom): ${bands.map(([a, z]) => `${a}-${z}`).join(", ")}`);

const box = (y0, y1) => {
  let x0 = W, x1 = -1;
  for (let y = y0; y <= y1; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * C + 3] > 8) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
      }
    }
  }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
};

const png = await sharp(data, { raw: { width: W, height: H, channels: C } }).png().toBuffer();

const parts = [
  { name: "dealup-mark", region: box(bands[0][0], bands[0][1]) },
  { name: "dealup-wordmark", region: box(bands[1][0], bands[bands.length - 1][1]) },
  { name: "dealup-lockup", region: box(bands[0][0], bands[bands.length - 1][1]) },
];

const manifest = {};
for (const { name, region } of parts) {
  const base = sharp(png).extract(region);
  await base.clone().png().toFile(`${OUT}/${name}.png`);
  await base.clone().webp({ quality: 92, effort: 6, alphaQuality: 100 }).toFile(`${OUT}/${name}.webp`);
  manifest[name] = { width: region.width, height: region.height };
  console.log(`${name.padEnd(18)} ${region.width}x${region.height}`);
}

await writeFile(`${OUT}/logo.generated.json`, JSON.stringify(manifest, null, 2) + "\n");
