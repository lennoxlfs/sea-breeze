# Sea Breeze Beach House — Art-Tier Sample Site (Claude Code Prompt, v2)

## Read this first — the mission has changed

Earlier direction said "make it motion-rich and feature-dense." That was wrong. Re-read this prompt from scratch and discard prior instructions in `CLAUDE_CODE_BUILD_PROMPT.md` that conflict with what follows.

**The new mission:** Do not sell the resort. **Show how beautiful it is.** This site is an editorial experience. The visitor should feel like they're flipping through a printed travel journal — quiet, slow, generous, and confident.

Think: *Aman × Laucala × Round Hill × Condé Nast Traveler long-read*. Not a booking funnel. The bookings will come because the site *feels* like the place.

---

## The three reference sites (study these before coding)

Study each site for 15 minutes. Screen-record the scroll. Take notes on pacing, spacing, type choices, and what they *don't* do.

1. **`https://www.laucala.com/`** — remote luxury done without shouting. Huge negative space. Photography carries the story. Copy is sparse and poetic. Motion is almost imperceptible but deliberate. Typography is refined serif with confident scale. The booking CTA is nearly hidden.
2. **`https://www.roundhill.com/?utm_source=google&utm_medium=organic&utm_campaign=business_listing`** — heritage Caribbean, quiet refinement, balanced asymmetry, earthy palette, editorial section transitions. Note how they never stack the same layout twice.
3. **`https://www.bahamas.com/`** — destination storytelling. Flow, rhythm, negative space, asymmetric compositions, text-over-image pairings, unhurried pacing. Study how they break the grid without feeling chaotic.

**What to borrow from each:**
- Laucala → the **photography-first** discipline. Let one hero image carry an entire screen.
- Round Hill → the **editorial rhythm** between sections. Every section feels like a new spread in a magazine.
- Bahamas.com → the **asymmetry and negative space** — copy lives off-center, images bleed to different edges, headings are not always at the top.

**What NOT to borrow from anywhere:**
- Hero carousels
- Five-column feature grids
- Giant stock-y badge strips
- Aggressive CTAs above the fold
- Parallax that screams "I'm a parallax"

---

## The vintage-cartographer moment

The screenshot Nate shared (the Barbados map section with the coordinates card) is **correct and should stay**. That aesthetic — vintage modern cartographer, paper cream background, hand-drawn coastline, dashed route, coordinates typography — is a **single signature moment**, not the theme of the whole site.

Use it:
- **Once**, as the location/sense-of-place section.
- As small nautical accents (dashed hairlines, compass micro-glyphs, dotted route flourishes under section headers) used **sparingly** — one or two places, not every section.

Do not:
- Turn the entire site into a nautical map
- Use paper-grain backgrounds on every section
- Repeat the dashed-line motif in every transition

The cartographer is the spice, not the dish.

---

## Mission statement (tape this to the top of every decision)

> Show how beautiful the resort is. Use photography and whitespace, not features and bullet points. The visitor should scroll slowly, feel the place, and want to be there. Selling is a side effect of beauty, not the goal of the page.

If a section is designed to *persuade*, redesign it to *reveal*.

---

## Skills to invoke (in order)

1. **`master-fortune500-tech-designer`** — primary. Use it to achieve world-class craft, rhythm, motion discipline, and type. Apply its standards to an editorial hospitality brand, not a tech company.
2. **`expert-website-seo-coder`** — co-pilot. Every art decision passes through Core Web Vitals, a11y (WCAG 2.1 AA), local SEO, and AI-search guardrails.
3. **`brand-package-extractor`** — re-anchor on the existing brand DNA (INK, Seafoam, Coral, Golden Sand, Cream).
4. **`schema-ai-readiness`** — verify schema survives the redesign.
5. **`theme-factory`** — only if tokens need consolidation.

Note on animation libraries: **GSAP + ScrollTrigger + Lenis + Framer Motion** are the right stack. Remotion is for video rendering — only use it if you decide to pre-render a short cinematic loop to embed as a silent asset.

---

## Reference files already in the repo

- `index.html` — preserve schema, structure, and existing content as the starting baseline
- `styles.css` — extend; do not rip out
- `app.js` — preserve GA4 event taxonomy
- `robots.txt`, `sitemap.xml` — preserve AI-search allowances
- `implementation-log.md` — log every change
- `launch-checklist.md` — re-verify at the end
- **Competitive benchmark to beat:** `https://www.sea-breeze.com/`

---

## Brand DNA (locked)

- **Deep Ocean Ink** `#0A3D62` — primary depth
- **Seafoam** `#4ECDC4` — accent / lift
- **Coral** `#E46B60` — punctuation / CTA hover (use sparingly)
- **Golden Sand** `#D48A40` — warmth
- **Cream / Warm Sand** `#F5EDE1` — canvas / negative space

**Type:**
- Display serif: `Playfair Display` or `Fraunces` (variable, optical-size on) — large, italic variants welcome
- Body: `Inter` — regular, generous line-height (1.6–1.75)
- Micro / numerals: refined small-caps or tabular numerals on the cartographer block and coordinates

**Voice of the type ramp:** closer to a magazine than a product site. Display sizes can breathe large (96–128px desktop). Paragraphs stay narrow (max ~64ch).

---

## Layout philosophy

- **Asymmetry over symmetry.** Never center everything. Let copy sit off-center, pair it with a photo that bleeds to an opposing edge.
- **Whitespace is content.** A section can be 80% empty and still be the best section on the page.
- **Photography first, copy second.** If you have a great image, give it the full screen and let it breathe.
- **One idea per section.** No combo sections that try to do three things.
- **Slow scroll rhythm.** The visitor should feel like each scroll reveals one thought, not a dashboard.
- **Asymmetric grids.** Use a 12-col grid but don't respect it religiously. Break the grid in 3–4 signature places.
- **Pacing: image-heavy → quiet editorial → image-heavy → quiet editorial.** Alternate.

---

## Motion philosophy

- Slow, intentional, almost invisible.
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)` or similar quiet curves.
- Default durations: 600–1200ms for reveals, 300–500ms for hover.
- Stagger children softly (80–120ms).
- **No bouncy spring physics, no aggressive parallax, no confetti.**
- Every animated element must look as good in its *rest* state as in motion.
- Always respect `prefers-reduced-motion`.

Acceptable motion moments:
- Soft fade + rise on section entry
- Slow Ken-Burns on hero and final-CTA images
- Drawn-in SVG map (the cartographer moment)
- Image reveal via `clip-path`
- Cursor-responsive subtle image shift on a single hero-level photo

Not acceptable:
- Text bouncing in letter-by-letter
- Cards flipping 3D on hover
- Full-screen parallax scroll-jacks
- Anything that breaks natural scroll velocity

---

## Section-by-section build

Keep the existing section order. Rebuild feel, not function.

### 1. Hero
- Full-bleed hero image or subtle video (prefer a still hero with Ken Burns on desktop, static on mobile — video is heavy and the Laucala/Round Hill approach is stillness)
- Display serif headline, off-center lower-left or lower-right, never dead-center
- Subhead: one sentence, italic-small-caps accent line
- Single quiet CTA: `Reservations` in understated type (no big coral button above the fold)
- No booking widget blocking the hero — put it below or tuck it subtly
- Scroll affordance: a thin line + small "Scroll" label, not a bouncing arrow

### 2. Editorial opening
- Short prose block — 2–3 sentences max
- Asymmetric: copy on the left third, a tall portrait-orientation image on the right two-thirds, both misaligned with each other
- A small nautical dashed-line glyph above the section eyebrow (this is the only other allowed nautical flourish in the upper half)

### 3. Trust whisper (not strip)
Nate asked for review-platform logos under the hero. Interpret this editorially:
- A single thin band, Cream background, INK type
- Logos in monochrome INK at 40% opacity, brightening slowly on hover
- Just four marks: **Google · TripAdvisor · Booking.com · AspireStyle**
- A single short line above them: *"Kept honest by our guests."* (or similar — use the `design:ux-copy` skill to tune)
- Pop-in: staggered 80ms each, 0.6s fade-up, one time only
- Do not show ratings here — ratings live in the lower reviews section

### 4. "The Property" — photography suite
- Replace the existing bento gallery with a **magazine spread** rhythm:
  - Full-bleed landscape photo, no copy
  - Then a split: small portrait photo on right, editorial copy on left (1 paragraph, large type)
  - Then a full-bleed environmental shot (beach, sunset, etc.)
  - Then a small three-photo cluster with intentional size variation and off-grid placement
- Each photo: subtle on-scroll reveal (opacity 0 → 1 + 20px rise, 900ms, quiet ease)
- Hover: almost nothing — maybe a 2% scale, 800ms

### 5. Rooms — editorial, unhurried
- Alternating full-width blocks: image on one side, one paragraph + room name + "View this room" quiet link on the other
- No card decoration, no hard shadows, no button CTAs — just type and image
- Max 4 rooms featured here; link to the full collection at the end
- Every other room breaks the grid (image 60% width, copy 30%, offset)

### 6. Dining / Spa / Weddings — ritual layouts
- Each gets its own screen-height moment
- Oversized serif number (01, 02, 03) as the section eyebrow, INK at 10% opacity so it functions as texture
- Image on one side, short editorial copy on the other
- Transitions between these three sections: a thin Seafoam hairline drawn in via SVG path animation

### 7. **The Cartographer moment** — location / sense of place
This is the signature section. Build exactly as the screenshot shows and polish it further:
- Cream paper background with subtle grain texture
- Illustrated vintage map of Barbados, slightly sepia
- Large outlined serif letters bleeding off-screen at the edges ("BARBADOS", "CARIBBEAN SEA", "MMXXVI" — architectural-style labels)
- Coordinates card (floating, off to the right, soft shadow):
  - "OUR COORDINATES" eyebrow in Seafoam small-caps
  - Street + Parish in refined serif
  - Lat / Long in serif italic with tiny degree glyphs
  - Three stats: minutes from airport, year-round temp, parishes north-to-south
  - "Get Directions" CTA in INK pill (the only strong CTA on the entire page above the footer)
- Scroll choreography:
  - Paper fades in
  - Hand-drawn coastline strokes on (SVG path animation, ~1.8s, quiet ease)
  - Dashed route line draws from a starting point to the resort pin
  - Pin drops, small label fades in
  - Coordinates card rises last with a 200ms delay
- Mobile: static illustration, simple fade-in, no draw-on-scroll
- Reduced-motion: fully-drawn static version

This is the only place the cartographer aesthetic lives. Do not repeat it elsewhere.

### 8. Guest voices — the reviews crescendo (lower on the page)
- Full-width INK background section, Cream type
- Layout: asymmetric two-column
  - Left: a single oversized pull-quote from a real review, serif italic, 48–72px display
  - Right: a vertical stack of 3–4 shorter review excerpts, smaller type, with guest initial + parish/city + platform glyph
- Auto-advance the main pull-quote every ~8s, pause on hover, swipeable on mobile
- Below: aggregate badge row in Sand-on-INK: `4.4 Google · 4.5 Tripadvisor · 9.1 Booking.com` — thin, restrained

### 9. Awards — quiet flex
- Thin section, Cream background
- Row of award marks as **engraved-style medallions** (circular SVGs, subtle foil gradient) — 5 max
- Each one has a small caption underneath (year + award name) in small-caps
- No motion beyond a soft fade-in
- This replaces the "trust strip" of old — let the awards earn their space here, not under the hero

### 10. Closing — "Stay with us"
- Full-bleed cinematic image (dusk beach dinner or the property at twilight)
- Slow Ken Burns
- Overlay copy: one serif line, understated — *"Stay with us."* — + a single quiet `Reservations` CTA
- No second CTA, no form, no newsletter signup overlay

### 11. Footer
- INK background, Cream type
- Wordmark large on the left, two thin columns on the right (Explore / Connect)
- NAP block with GBP-consistent phone and address (confirm with Nate before publishing — there is a known NAP mismatch to resolve)
- Social icons in monochrome Cream, colorize on hover
- Fine print row with legal links and "Crafted by LFS"

### 12. Mobile sticky CTA
Keep it, but make it smaller and more refined:
- Shorter height
- Frosted backdrop-filter
- `Reservations` (not `Book Now`) — editorial tone
- Appears only after the hero scrolls out of view

---

## Technical direction

### Stack
- Keep the static HTML/CSS/JS baseline; add:
  - `gsap@3` + `ScrollTrigger`
  - `lenis` for smooth scroll
  - `framer-motion` only if you migrate to React — otherwise skip
  - Native `<dialog>` for any lightbox
- Migrate to Next.js only if the art genuinely requires it. Document the reason in `implementation-log.md`.

### Performance
- LCP < 2.5s on 4G mobile
- CLS < 0.05 (the current CLS must be eliminated)
- INP < 200ms
- Total JS < 150KB gzipped on baseline route
- Images: `<picture>` with AVIF/WebP fallbacks, explicit width/height, `loading="lazy"` below fold, `fetchpriority="high"` on LCP image only
- Fonts: `font-display: swap`, preconnect to Google Fonts, subset to used characters

### Accessibility
- Every section has a real `<h2>`
- Focus rings on every interactive element (Seafoam 2px, 3px offset)
- All animations respect `prefers-reduced-motion`
- Lightbox (if added): focus trap, ESC to close, announce with `aria-live`
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large display
- Alt text for every meaningful image; decorative images `alt=""` + `aria-hidden="true"`
- Keyboard-only walkthrough of the full page must work

### SEO / AI-search
- Preserve `Hotel`, `WebSite`, `FAQPage`, `BreadcrumbList` JSON-LD
- Extend with `ImageObject` entries for the top 8 photos
- Preserve `robots.txt` AI-bot allowances (Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot)
- `rel="canonical"` on every page
- Keep the existing NAP in code; Nate will confirm the GBP-correct values before launch

### Analytics (keep everything already wired)
- Vercel Web Analytics + Speed Insights
- GA4 events already in `app.js`: `book_now_click`, `check_availability_click`, `phone_click`, `email_click`, `map_directions_click`, `social_click`, `generate_lead`
- Add: `gallery_open`, `map_interaction`, `review_advance`

---

## What NOT to do (common failure modes)

- Do not add a big coral CTA button above the fold
- Do not turn the whole site cream/nautical — the nautical look is one section
- Do not use stock palm-tree imagery or tropical clichés
- Do not stack three testimonials in the hero
- Do not use a carousel for the gallery — gallery is an editorial spread, not a slideshow
- Do not animate every section with the same entrance — vary the rhythm
- Do not add "Why Choose Us" bullet lists
- Do not add chatbot bubbles, exit-intent popups, or newsletter modals
- Do not regress schema, analytics, or sitemap
- Do not break the mobile experience chasing desktop art

---

## Deliverables

1. New branch off `feat/v7-compliance`: `feat/art-tier-editorial`
2. Logical commit chunks:
   - (a) design tokens + motion primitives + type ramp
   - (b) hero + editorial opening + trust whisper
   - (c) property photography suite
   - (d) rooms editorial rebuild
   - (e) dining / spa / weddings rituals
   - (f) cartographer moment polish
   - (g) guest voices + awards sections
   - (h) closing + footer + mobile polish
   - (i) final perf + a11y + SEO pass
3. Updated `implementation-log.md` with every change
4. Screenshots of 8 key scroll moments committed to `/assets/qa/`: hero, editorial opening, trust whisper, a photography spread, a room spread, cartographer mid-draw, guest voices pull-quote, closing
5. PR against `main` with the Vercel preview URL in the description
6. Re-run `launch-checklist.md` — every item green

---

## Post-deploy validation

- Lighthouse mobile: Performance ≥ 75, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- Rich Results: all schema valid
- GA4 DebugView: every CTA fires its event
- `prefers-reduced-motion` verified in DevTools
- Keyboard-only walkthrough passes
- Screen-reader smoke test on hero, cartographer, guest voices, and closing

---

## Creative north star

Pull up Laucala, Round Hill, and Bahamas.com side by side. When you're done, Sea Breeze should feel like it belongs on that shelf — not like it's copying them, but like it's having the same quiet, confident conversation with the visitor.

If the site feels like a *brochure*, you did it wrong.
If it feels like a *travel journal you can't put down*, you nailed it.

Ship it when it feels like art.
