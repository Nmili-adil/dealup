import fs from "node:fs";
import path from "node:path";

/**
 * True when a file exists under /public.
 *
 * Server-only, and with `output: "export"` it runs at build time, so pages that
 * reference optional artwork (brand logos, mockups you have not supplied yet)
 * can render a placeholder instead of a broken image.
 */
export function hasAsset(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}
