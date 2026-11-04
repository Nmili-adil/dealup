# Hotels Solution Mockup Assets

Generated project assets live in `public/assets/hotels/` and are rebuilt with:

```bash
npm run build:hotels-assets
npm run build:mockups
```

Visual direction:

- Transparent PNG mockups with real alpha, no background plate baked into the image.
- Professional WhatsApp hotel operations UI: guest inbox, AI concierge reply, routing rules, analytics, and a hero command center.
- Dealup green, mint, white, cream, and restrained accent colors.
- Polished SaaS product composition with browser windows, phone frame, cards, charts, and hotel-specific labels.
- Keep the generated PNGs as source assets and let `scripts/build-mockups.mjs` produce WebP variants plus `src/lib/mockups.generated.json`.

The built-in image generator was tested first, but it repeatedly produced opaque studio backdrops. These mockups are generated from SVG with `sharp` so the no-background requirement is reliable and reproducible.
