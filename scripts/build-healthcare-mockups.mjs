import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = "public/assets/healthcare";

const SOURCES = [
  { name: "healthcare-hero-mockup", width: 1536, height: 1024 },
  { name: "healthcare-guidance-chat", width: 1536, height: 1024 },
  { name: "healthcare-automation-flow", width: 1536, height: 1024 },
  { name: "healthcare-inbox-shared", width: 1536, height: 1024 },
  { name: "healthcare-engagement-card", width: 1122, height: 1402 },
];

await mkdir(OUT_DIR, { recursive: true });

for (const source of SOURCES) {
  const svg = path.join(OUT_DIR, `${source.name}.svg`);
  const png = path.join(OUT_DIR, `${source.name}.png`);
  const webp = path.join(OUT_DIR, `${source.name}.webp`);
  const image = sharp(svg, { density: 144 }).resize(source.width, source.height);

  await image.clone().png({ compressionLevel: 9 }).toFile(png);
  await image.clone().webp({ quality: 88 }).toFile(webp);

  console.log(`${source.name}: ${source.width}x${source.height} -> png + webp`);
}
