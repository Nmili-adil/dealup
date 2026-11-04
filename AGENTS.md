<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Dealup website

Static marketing site for dealup.ma, a WhatsApp-commerce SaaS. Next 16 + React 19 + TypeScript, Tailwind v4, `@next/font` (Geist).

## Architecture facts that aren't obvious

- **Static export.** `next.config.ts` sets `output: "export"` + `trailingSlash: true` + `images.unoptimized`. `npm run build` emits `out/` served by a static host; there are no API routes, no server runtime, and Next never optimizes/resizes images. Any `<Image>` requires an explicit `width`/`height` (no layout optimization).
- **Real pages live under `[locale]/`; `(root)/` routes are meta-refresh redirect stubs** to the default locale (`fr`). Locales are `fr, ar, en` (see `src/lib/i18n/locales.ts`); `ar` is RTL (note: layout uses logical properties/styles). **When you add a page under `[locale]/`, duplicate the 20-line redirect stub in the matching `(root)/` path** or the un-prefixed URL 404s.
- **All copy is data, not JSX.** Every page renders from a slice of `src/messages/{en,fr,ar}.json` (loaded via `getDictionary`, `import "server-only"`). The shared feature/solution/industry pages are driven declaratively by the shapes in `src/components/feature-page/copy.ts`.
- **Two page systems coexist:**
  - Shared `FeaturePage` (`src/components/feature-page/feature-page.tsx`) — features, solutions, industries. Sections are optional; a page omits keys to skip sections.
  - Bespoke per-product pages in `src/components/sections/<slug>/` (e.g. `whatsapp-business-api/`, `whatsapp-chatbot/`, `whatsapp-forms/`, `whatsapp-marketing/`, `meta-ads-manager/`, `aidealup/`, `whatsApp-blue-tick-page/`, plus solution pages like `solutions-ecommerce-3/`). Don't try to fold these into `FeaturePage`.

## Copy / i18n gotchas

- **All three locale files must stay key-parallel.** There's no type enforcement at runtime; components assume the keys exist. After adding copy, run the parity check / use the helper:
  ```
  node scripts/add-feature-page.mjs <namespace> <enPath> [frPath] [arPath]
  ```
  It deep-merges a copy JSON into all three `src/messages/*.json` and errors on any key collision. Omit a translated path and English is used as a placeholder to keep parity; translate later in `fr.json`/`ar.json`.
- **Root-level `*-industry.json` / `*-solution.json` / `*-solution-*.json` files are copy source documents**, not runtime data. They're wired into the message namespaces via the script above — don't import them from components at runtime.
- `src/content/help/` is a separate help domain with its own types (`types.ts`) and per-locale TS files — different system from `src/messages/*.json`.

## Asset pipelines (derived artifacts — regenerate, don't hand-edit)

- **Mockups:** `npm run build:mockups` (node + `sharp`). Crops transparent device PNGs in `public/assets` to their alpha bounds, emits WebP variants at fixed widths, then writes the manifest at `src/lib/mockups.generated.json`. Components `import mockups from "@/lib/mockups.generated.json"` to reference variants by name. Add new sources to the `SOURCES` array in `scripts/build-mockups.mjs` first.
- **Logo:** `npm run build:logo`. Splits the stacked lockup JPEG into mark/wordmark/lockup, writes PNG + WebP + `logo.generated.json`.
- Run the relevant script after adding or replacing asset PNGs; `next.config.ts` never generates variants, so forgetting this leaves images at native resolution or missing.

## Design / QA conventions

- **Design tokens are CSS variables in `src/app/globals.css`, documented against WCAG contrast floors** (e.g. `--brand` is only usable on white as a fill, never for text/series; `--ai` needs `--ai-on-dark` on the dark surface). Read the comments before choosing a token on white/sand/dark surfaces.
- Entrance/scroll animations are implemented to **settle to a visible state and collapse under `prefers-reduced-motion`** (see the CSS in `globals.css`). Prefer deterministic CSS entrance animation over viewport-triggered runtime animation — the repo has a documented failure (`design-qa.md`) where runtime opacity-0 states left pages blank in browser capture.
- `design-qa.md` + `audit-evidence/` record fidelity/QA passes against reference PNGs in `design/`. `src/lib/has-asset.ts` is a build-time check so pages can fall back to placeholders for optional assets (e.g. integration logos).

## Commands

- `npm run dev` — dev server
- `npm run build` — full build (also typechecks TS); outputs `out/`
- `npm run lint` — `eslint` (config in `eslint.config.mjs`; no separate typecheck or test script exists, no test framework installed)
- Path alias: `@/*` → `./src/*` (`tsconfig.json`). Params are async across these Next routes — `await params`.

## Other skills / config

- OpenCode design-heavy tasks can use the repo's Claude skills under `.claude/skills/` (banner-design, design, slides, ui-ux-pro-max, etc.).