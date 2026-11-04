# Real-estate image prompts

These are the exact prompts used for the original Dealup assets in `public/assets/real-estate/`.

## `real-estate-hero-mockup.png`

Primary generation:

```text
Use case: ui-mockup
Asset type: transparent landing-page hero product mockup for a premium real-estate SaaS page
Input images: Image 1 is the Dealup brand identity reference only. Preserve its handshake-in-speech-bubbles silhouette, forest-green and bright-green colors, lowercase wordmark proportions, and spelling exactly if the logo appears. Do not use its white canvas as the output background.
Primary request: Create one polished, production-ready device composition: a slim contemporary laptop at a slight three-quarter angle with a modern real-estate lead workspace on screen, plus one premium smartphone standing in front and slightly overlapping the laptop, showing a WhatsApp-style property inquiry followed by a confirmed property viewing.
Scene/backdrop: genuinely transparent background outside the devices; no floor panel, no rectangle, no gradient canvas, no decorative blob, no floating decorative card behind the devices.
Laptop UI: restrained, realistic property lead workspace with an elegant left navigation, lead pipeline, a compact property-match area, and subtle photo thumbnails of contemporary Casablanca and Rabat apartments or villas. Use practical information architecture and legible hierarchy. The Dealup logo or exact wordmark may appear once, small, in the app header only if it can remain faithful to Image 1; otherwise omit it entirely. No other logos.
Phone UI: original green-and-white business messaging interface inspired by familiar chat patterns but with no third-party logo or trademark. Show a short, readable inquiry about a two-bedroom Casablanca property and a clear viewing confirmation. Exact high-priority text: "Property inquiry", "2-bedroom in Casablanca", "Viewing confirmed", "Saturday · 11:00". Keep all other microcopy minimal.
Style/medium: refined photorealistic 3D hardware product render combined with shippable modern SaaS UI; not concept art; premium contemporary B2B marketing quality.
Composition/framing: landscape hero cutout, centered device group, laptop fully visible, phone fully visible, no cropped device edges, generous transparent margins, visual weight balanced for placement beside website copy.
Lighting/mood: controlled soft studio lighting, polished but credible, subtle grounding shadows contained immediately beneath the devices, no atmospheric background.
Color palette: Dealup forest green, bright leaf green, soft mint, warm white, charcoal, restrained light gray.
Materials/textures: anodized dark graphite laptop, crisp glass displays, realistic metal edges, subtle screen reflections, clean anti-aliased device contours.
Constraints: actual alpha transparency outside the devices; preserve fine edges and soft shadows; no fake analytics metrics, no percentages, no testimonial claims, no human subjects, no unrelated props, no extra devices, no watermark. The only allowed brand is Dealup, and only if faithfully reproduced from Image 1.
Avoid: framed poster look, white or colored background canvas, device sitting inside a card, decorative UI floating outside the screens, oversized typography, illegible gibberish, incorrect logo, WhatsApp logo, stock watermark, exaggerated neon glow.
```

Background correction:

```text
Use case: background-extraction
Asset type: transparent landing-page hero product mockup, final production correction
Input images: Image 1 is the edit target and must otherwise remain unchanged.
Primary request: Change only two things in Image 1: (1) remove the baked checkerboard background completely and replace it with genuine alpha transparency outside the laptop, phone, and their immediately adjacent soft grounding shadows; (2) remove only the small green percentage/match badges over the property thumbnails near the bottom of the laptop screen.
Preserve exactly: laptop and phone hardware, device scale, angle, overlap, lighting, materials, all UI layout, property thumbnails, Dealup logo and wordmark, sidebar, lead columns, chat bubbles, exact chat wording, colors, crop, and device shadows.
Scene/backdrop: actual transparent canvas outside the device cutout; no visible checkerboard pattern, no white canvas, no gray canvas, no border, no decorative shape.
Constraints: preserve fine anti-aliased edges and realistic soft shadows; do not redraw, restyle, recompose, crop, or add anything; no percentages, match scores, other metrics, watermark, or new text.
Avoid: checkerboard as visible pixels, solid background, halos, jagged cutout edges, changed logo, changed chat text, altered screen perspective.
```

Chroma master used for the final alpha cutout:

```text
Use case: precise-object-edit
Asset type: temporary chroma-background master for a transparent landing-page hero cutout
Input images: Image 1 is the edit target and must otherwise remain unchanged.
Primary request: Change only the baked checkerboard background outside the laptop, phone, and their immediate soft shadows to one completely flat, uniform chroma-magenta color RGB 255, 0, 255 (#FF00FF), with no texture, gradient, checker pattern, vignette, or variation.
Preserve exactly: laptop and phone hardware, device scale, angle, overlap, crop, lighting, materials, fine edges, screen content, property thumbnails, the Dealup logo and wordmark, sidebar, lead columns, phone chat bubbles, exact chat wording, forest-green and mint colors, and the immediately adjacent natural grounding shadows.
Constraints: do not redraw, restyle, recompose, crop, recolor, or add anything to the devices or screens; background only; no percentages or match-score badges; no watermark; the background must contain no color other than flat #FF00FF.
Avoid: checkerboard, white background, background objects, magenta spill on devices, changed logo, changed UI, changed chat copy, halos.
```

## `property-matching-dashboard.png`

```text
Use case: ui-mockup
Asset type: wide website section product mockup
Primary request: a production-ready Dealup real-estate lead qualification and property matching dashboard, shown as one clean full interface canvas without a laptop or phone device
Input images: Image 1 is the exact Dealup brand mark and wordmark reference; preserve its recognizable handshake-chat silhouette, proportions, forest green and bright green colors. Use the small Dealup logo in the application sidebar header and do not add any other brand.
Scene/backdrop: full-bleed warm ivory software canvas with generous clean outer margins that will blend into a premium landing page; no outer card, no floating card behind the image, no scene props
Subject: left navigation with Chats, Contacts, Campaigns, Property Portfolio, Automations; a central property lead workspace for a buyer looking in Casablanca and Rabat; compact lead preference row for location, budget, property type, bedrooms and timeline; a curated shortlist of three tasteful contemporary Moroccan properties with realistic small thumbnails; right panel with lead context and an appointment status
Style/medium: realistic polished B2B SaaS UI mockup, shippable product design rather than concept art
Composition/framing: 3:2 landscape, straight-on, balanced hierarchy, calm density, wide enough for responsive web use, no perspective skew
Color palette: Dealup forest green, bright green and mint accents, warm off-white surfaces, charcoal type
Typography: crisp modern sans serif; use short simple labels only; exact property names are not important and may remain minimal
Constraints: no metrics or invented performance claims, no testimonial, no WhatsApp logo, no third-party marks, no price claims, no device frame, no decorative image card, no watermark; preserve the supplied Dealup logo faithfully
```

## `qualification-viewing-flow.png`

Primary generation:

```text
Use case: ui-mockup
Asset type: wide website section product mockup
Primary request: a production-ready Dealup no-code real-estate qualification and viewing-booking automation builder, shown as one clean full interface canvas without a laptop or phone device
Input images: Image 1 is the exact Dealup brand mark and wordmark reference; preserve its recognizable handshake-chat silhouette, proportions, forest green and bright green colors. Use the small Dealup logo in the application sidebar header and do not add any other brand.
Scene/backdrop: full-bleed very light warm mint software canvas with generous open outer margins that will blend directly into a premium landing page; no outer card, no floating card behind the image, no scene props
Subject: left application navigation; central drag-and-drop connected flow using practical blocks for New inquiry, Ask preferences, Budget and area, Property shortlist, Book viewing, Reminder and Human handoff; branching lines with clear green connectors; a slim right-side mobile conversation preview showing a short property inquiry, quick replies and a confirmed viewing
Style/medium: realistic polished B2B SaaS UI mockup, shippable product design rather than concept art
Composition/framing: 3:2 landscape, straight-on, clean readable hierarchy, calm density, no perspective skew
Color palette: Dealup forest green, bright green and mint accents, warm white surfaces, charcoal type, restrained amber for one reminder state
Typography: crisp modern sans serif; use only short functional labels; labels listed above should be legible where practical
Constraints: no invented performance claims, no fake testimonial, no WhatsApp logo, no third-party marks, no pricing, no device frame around the whole canvas, no decorative image card, no watermark; preserve the supplied Dealup logo faithfully
```

Moroccan localization edit:

```text
Use case: precise-object-edit and text-localization
Input images: Image 1 is the edit target, the Dealup real-estate qualification and viewing booking automation builder. Image 2 is the exact Dealup logo reference.
Primary request: localize only the location, budget, appointment and administrator-name details in Image 1 for a Moroccan Dealup real-estate experience.
Change only these visible details: replace the quick-reply locations "Downtown", "Riverside", "Suburbs" with "Casablanca", "Rabat", "Marrakech"; replace the selected location "Riverside" with "Rabat"; replace budget replies "Up to $500k", "$500k – $800k", "$800k+" with "Up to 1.5M MAD", "1.5M – 3M MAD", "3M+ MAD"; replace the selected budget with "1.5M – 3M MAD"; replace "123 Riverside Drive, Riverside" with "Agdal, Rabat"; replace "Alex Carter" with "Youssef B."; keep the appointment date and time.
Constraints: preserve the entire original layout, spacing, typography, hierarchy, UI components, green connector flow, screen proportions, canvas background, all other text, and the Dealup identity. Do not add or remove blocks. Do not introduce any new logo or watermark. The Dealup logo must remain faithful to Image 2.
```

## `agent-property-viewing.png`

```text
Use case: photorealistic-natural
Asset type: editorial client-journey photograph for a premium real-estate landing page, displayed directly in an open page layout rather than inside a card
Primary request: Create a premium commercial-editorial photograph of a professional Moroccan woman real-estate agent in her early 30s guiding a young adult Moroccan couple through a contemporary sunlit apartment in Casablanca or Rabat.
Scene/backdrop: A refined but believable modern Moroccan apartment with abundant warm daylight, softly textured lime-plaster walls, natural oak details, pale stone, restrained contemporary furniture, and subtle local architectural character. The room should feel lived-in enough to be real, not a sterile showroom.
Subject: Three authentic North African/Moroccan adults. The confident female agent wears polished modern business-casual clothing and gestures naturally toward the space while explaining it. One member of the couple looks down at a phone showing property details, while the other takes in the room and listens. Their interaction should feel candid, attentive, and trustworthy.
Style/medium: Photorealistic natural-light editorial commercial photography, captured like a real candid 35mm photograph, realistic skin pores and fine facial texture, natural hair, credible fabric folds, slight optical imperfection, restrained color grading, not over-retouched.
Composition/framing: Landscape 3:2 horizontal frame, eye-level medium-wide environmental composition. Keep all three people clearly visible with natural body language and hands. Use architectural depth and gentle foreground-to-background layering. No text-placement requirement; make a balanced standalone photograph suitable for responsive cropping.
Lighting/mood: Warm late-morning window light, soft directional shadows, calm confidence, professional optimism, understated premium atmosphere.
Color palette: Warm off-white, sand, pale stone, natural wood, muted olive or deep teal clothing accents; realistic neutral skin tones.
Materials/textures: Visible lime plaster, wood grain, stone texture, real cotton/linen/wool fabrics, realistic skin and hair.
Constraints: Authentic Moroccan/North African appearance; adults only; natural confident interaction; realistic anatomy and hands; no brand logos; no text; no watermark; no keys held toward the camera.
Avoid: Staged stock-photo grin, everyone looking at camera, exaggerated luxury mansion styling, over-smoothed skin, glam beauty lighting, ultra-wide architectural distortion, clutter, badges, signs, readable phone text, property logos, watermarks.
```

## `happy-homebuyers.png`

```text
Use case: photorealistic-natural
Asset type: portrait 4:5 editorial outcome photograph for a premium real-estate landing-page section, displayed directly in the page layout rather than inside a card
Primary request: a happy young Moroccan couple in their new contemporary apartment, seated naturally together near a bright window and quietly reviewing a WhatsApp-style property conversation on one smartphone; a tasteful small key set rests nearby on a warm wooden surface
Scene/backdrop: lived-in but refined modern Moroccan apartment, soft neutral plaster walls, natural oak or walnut furniture, linen upholstery, a restrained handwoven cushion or subtle zellige/craft detail, generous daylight through the window; authentic and attainable rather than an ultra-luxury showroom
Subject: one young adult Moroccan woman and one young adult Moroccan man with authentic North African appearance, relaxed everyday-smart clothing in warm neutrals, seated close but not posing; they share a calm credible smile while looking at the phone together, with natural hand placement and believable anatomy
Style/medium: premium photorealistic editorial commercial photography, candid documentary sensibility, realistic skin pores, hair, fabric weave, wood grain, and imperfect everyday detail; no beauty retouching or synthetic gloss
Composition/framing: vertical 4:5, candid eye-level medium-wide portrait made with a 50mm full-frame lens, both people fully readable from about the waist up, phone visible but not dominant, key set present as a quiet supporting detail rather than a staged handover, gentle shallow depth of field, clean composition suitable for a modern marketing page
Lighting/mood: warm natural afternoon window light, soft dimensional shadows, calm optimism and earned satisfaction, intimate and trustworthy, subtle filmic tonal rolloff
Color palette: warm ivory, sand, muted terracotta, natural wood, soft olive accents
Materials/textures: realistic skin, linen, cotton, woven Moroccan craft, plaster, glass, and wood
Constraints: the phone interface may suggest a green-tinted messaging conversation but contains no readable words, logos, app marks, contact names, numbers, or brand identity; no visible commercial branding anywhere; the keys rest naturally on the wooden surface and are not being handed over; culturally authentic without costume or stereotype; no watermark
Avoid: stock-photo grin, exaggerated celebration, direct eye contact with camera, staged key handover, oversized novelty key, realtor present, cluttered luxury decor, artificial skin, extra fingers, malformed hands, duplicate people, readable phone text, WhatsApp logo, brand logos, watermark
```
