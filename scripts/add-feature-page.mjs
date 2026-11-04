/**
 * Adds a feature-page copy namespace to all three locale message files with
 * key parity. Usage: node scripts/add-feature-page.mjs <namespace> <enPath> [<frPath>] [<arPath>]
 *
 * If a translated file path is omitted, the English copy is used as a
 * placeholder so parity is guaranteed; translate later by editing fr/ar.json.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const [namespace, enPath, frPath, arPath] = process.argv.slice(2);
if (!namespace || !enPath) {
  console.error("Usage: node scripts/add-feature-page.mjs <namespace> <enPath> [frPath] [arPath]");
  process.exit(1);
}

const base = resolve("src/messages");
const load = (p, fallback) => {
  if (p && existsSync(resolve(p))) return JSON.parse(readFileSync(resolve(p), "utf8"));
  if (fallback) return fallback;
  console.error(`Missing file: ${p}`);
  process.exit(1);
};

const enCopy = JSON.parse(readFileSync(resolve(enPath), "utf8"));
const frCopy = load(frPath, enCopy);
const arCopy = load(arPath, enCopy);

const targets = [
  { file: "en.json", copy: enCopy },
  { file: "fr.json", copy: frCopy },
  { file: "ar.json", copy: arCopy },
];

/** Deep-merge keys of `src` into `dst`, erroring on any key collision. */
function mergeKeys(dst, src, path = "") {
  for (const [key, value] of Object.entries(src)) {
    const full = path ? `${path}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (!dst[key] || typeof dst[key] !== "object") {
        dst[key] = {};
      }
      mergeKeys(dst[key], value, full);
    } else if (key in dst && dst[key] !== undefined) {
      throw new Error(`Key collision at ${full} — refusing to overwrite.`);
    } else {
      dst[key] = value;
    }
  }
}

for (const { file, copy } of targets) {
  const full = JSON.parse(readFileSync(resolve(base, file), "utf8"));
  const before = `${file}: ${JSON.stringify(full).length} chars`;
  mergeKeys(full, { [namespace]: copy });
  writeFileSync(resolve(base, file), `${JSON.stringify(full, null, 2)}\n`);
  console.log(`${file} → added namespace "${namespace}" (${before} → ${JSON.stringify(full).length} chars)`);
}
