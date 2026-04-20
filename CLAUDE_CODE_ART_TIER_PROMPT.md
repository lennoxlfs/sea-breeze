# Sea Breeze Beach House — Art-Tier Sample Site Upgrade (Claude Code Prompt)

## TL;DR for Claude Code
Turn the existing Sea Breeze sample into a piece of art. Target feel: $40K, world-class, luxury Caribbean resort website. This is the **brand-led hero sample** we show prospects — it must look better than the client's current live site (`https://www.sea-breeze.com/`) and feel like a design-forward boutique brand, not a template.

The existing structure, SEO scaffolding, schema, analytics, and brand tokens must be preserved. Everything else is upgradable.

---

## Skills to invoke (in this order)

1. **`master-fortune500-tech-designer`** — primary driver. Use this skill's entire art/animation/layout vocabulary to raise the sample to Fortune-500 tech/luxury brand tier. Treat it as the source of truth for motion, spacing rhythm, depth, typography scale, and section choreography.
2. **`expert-website-seo-coder`** — co-pilot. Every art decision must pass through technical SEO, Core Web Vitals, a11y (WCAG 2.1 AA), and local-SEO guardrails.
3. **`brand-package-extractor`** — re-read `Sea_Breeze_Brand_Package.docx` (or the in-repo brand tokens) to lock brand DNA before styling.
4. **`theme-factory`** — if tokens need consolidation, use it to systematize colors, type ramps, shadows, radii, and motion tokens.
5. **`schema-ai-readiness`** — verify all schema and AI-search readiness survives the redesign.

> Note on "Remotion": Remotion is a video/motion-sequencing React library. For the scroll-storytelling and interactive map work described below, **GSAP + ScrollTrigger + Framer Motion + Lenis** is the right stack. If you decide a short cinematic Remotion-rendered loop belongs in the hero or the nautical-map intro, you may use Remotion to render an `.mp4`/`.webm` asset and embed it as a silent autoplay element — but do not rebuild the site in Remotion.

---

## Reference material

- **Current live client site (benchmark to beat):** `https://www.sea-breeze.com/`
- **Current LFS sample (starting point):** `https://sea-breeze-barbados.vercel.app/` (preview may require Vercel login)
- **Existing repo:** `sea-breeze` / branch `feat/v7-compliance` — open PR #1
- **Source of truth files in the repo root of the site folder:**
  - `index.html` (949 lines — Hotel + WebSite + FAQ + Breadcrumb schema, hero video, booking, gallery, rooms, dining, spa, weddings, reviews, Barbados, final CTA, mobile sticky CTA)
  - `styles.css`
  - `app.js` (GA4 event taxonomy already wired — preserve it)
  - `robots.txt`, `sitemap.xml` (preserve AI-search allowances)
  - `implementation-log.md`, `launch-checklist.md`, `analytics-setup-checklist.md`

Pull the **current live site** (`sea-breeze.com`) as the competitive benchmark. Note what they do adequately (hero energy, color warmth, room photography) and what they do poorly (stock-y feel, flat scroll, thin trust signals, no storytelling, no map, generic galleries). The sample must out-class them on every axis: hierarchy, motion, photography rhythm, type, trust, storytelling, mobile polish, and CTA clarity.

---

## Brand DNA (do not drift)

**Palette (locked):**
- Deep Ocean Ink `#0A3D62` — primary depth
- Seafoam `#4ECDC4` — lift / accent
- Coral `#E46B60` — energy / CTA hover / punctuation
- Golden Sand `#D48A40` — warmth / secondary accent
- Warm Sand / Cream `#F5EDE1` — canvas / section backgrounds

**Type direction:**
- Display: refined serif with coastal personality — `Playfair Display` or `Fraunces` (variable) for H1/H2; allow italic variants for editorial moments
- Body: `Inter` or `Calibri fallback` for readability
- Numerals and micro UI: tabular / mono-ish accent optional in the award strip and map chrome

**Tone:** Caribbean warmth, not tropical kitsch. Editorial, relaxed, confident. Think *Aman × Soho House × boutique Bajan*.

---

## What to build — section by section

### 1. Hero — cinematic open
- Keep the existing video hero as LCP, but elevate it:
  - Add a subtle parallax on the hero frame (GSAP)
  - Animated gradient wash tuned to brand palette, not stock "overlay black"
  - Display headline reveals word-by-word via `Framer Motion` stagger
  - Subhead + CTA slide up on a lagged curve (cubic-bezier easing)
  - A hand-drawn scroll-indicator (nautical compass needle or rope) at bottom
- Keep `Check Availability` as the primary CTA. Secondary: `Explore the Property`.
- Respect `prefers-reduced-motion`.

### 2. Review-platform trust strip (just under hero — small, low-height)
- Thin horizontal band (~80–100px desktop, stacked 2x2 on mobile)
- Logos: **Google**, **TripAdvisor**, **Booking.com**, **AspireStyle / Aspire**
- Each logo + rating pill (e.g., `4.4 · Google`, `4.5 · Tripadvisor`) floats in with staggered `y: 20 → 0`, `opacity: 0 → 1` on ScrollTrigger
- Subtle hover lift + soft shadow
- Logos in muted monochrome (INK @ 60%), brightening to full color on hover
- Do NOT make this a full trust section — that comes later. This is a teaser strip.
- Accessibility: each logo link has descriptive `aria-label` ("See our 4.4-star Google reviews")

### 3. Booking strip / availability widget
- Preserve function. Upgrade chrome: soft Sand background, INK borders, Seafoam focus rings, refined input type (no generic browser styling). Add a date-picker with brand-tinted calendar.

### 4. "An island within an island" — editorial intro
- Short editorial paragraph (existing copy) elevated into an **oversized pull-quote layout**
- Serif drop-cap in Coral
- Side-by-side with an asymmetric photo composition (one large, one small offset)
- Images slide in with horizontal parallax as you scroll past

### 5. Experience / "Why Sea Breeze" cards
- Upgrade the existing cards:
  - Bento-style asymmetric grid (feature tile + 3 supporting tiles)
  - On scroll: tiles rise with staggered delays; on hover: image scales, caption lifts
  - Replace flat icons with hand-drawn nautical line illustrations (SVG)
- Do not add more than 4 items here — editorial restraint.

### 6. Interactive Gallery — the showpiece
This is one of the two "hero moments" of the art upgrade.
- Layout: **bento masonry** (mixed aspect ratios, intentional negative space)
- Images load via `<picture>` with `loading="lazy"` + `srcset`
- On scroll-in: tiles reveal in a choreographed sequence (NOT a boring fade-in-grid)
- Hover: image subtly zooms, caption slides up from bottom with brand-colored rule
- Click: smooth full-screen lightbox with keyboard nav, pinch/swipe on mobile, EXIF-style caption (room name, vista, photo credit)
- Add a horizontal-scroll "mini-carousel" variant below, with a scrub progress bar in Seafoam
- Respect reduced-motion: static grid fallback

### 7. Rooms — editorial, not catalog
- Alternating 50/50 layout (image left/right)
- Room copy appears via `clip-path` reveal
- Subtle depth: soft INK shadow under images, Sand backdrop cards
- Each room has its own `Hotel → hasPart` data; preserve schema

### 8. Dining, Spa, Weddings — ritual sections
- Keep existing content. Apply consistent scroll choreography: each section opens with an oversized serif number (01, 02, 03), a wordmark, and a slow-pan image
- Add a quiet horizontal rule drawn in Seafoam via SVG path animation

### 9. **Vintage Nautical Map Section** — signature moment
This is the second "hero moment" and the most art-forward section.
- Full-bleed section, Sand/cream backdrop with subtle paper-grain texture
- SVG-authored vintage nautical map of Barbados with:
  - Hand-rendered coastline, hatched sea, compass rose top-right
  - Dashed "route line" from Bridgetown → Sea Breeze Beach House on the south coast
  - Small illustrated marks for reef, beach, airport
  - Weathered edges, slight sepia wash
- Scroll choreography (GSAP ScrollTrigger):
  - On enter: paper unfurls / fades in
  - Compass rose rotates into place
  - Dashed route line draws (`stroke-dashoffset` animation) from Bridgetown to the resort pin
  - Resort pin drops + pulses gently on arrival
  - Small labels ("Christ Church", "Caribbean Sea", "Atlantic swells") fade in at staggered offsets
- Supporting copy (editorial, short): "10 minutes from Bridgetown. A world away from ordinary."
- Mobile: replace draw-on-scroll with a simpler fade/slide; keep the art
- Reduced-motion: show fully-drawn static map

### 10. Lower Reviews + Awards section — the trust crescendo
- Full-width section with INK background, Cream type, Seafoam accents
- Left: oversized award callouts (TripAdvisor Travelers' Choice, Aspire Award, Conde Nast mentions, Bajan-origin awards) rendered as **medallions** — circular SVGs with foil-like gradient, slowly rotating on scroll parallax
- Right: real guest review quotes in a vertical ticker / scrub
  - Each review: 2–3 lines, guest initial + location + platform logo, star row
  - Auto-advance + swipe on mobile, pause on hover
- Bottom row: aggregate badges (4.4 Google · 4.5 Tripadvisor · 9.1 Booking.com) with subtle hover lift

### 11. Barbados section — sense of place
- Already exists. Elevate: split-screen with a looping 8-second ambient b-roll (waves/palms) and editorial copy; add a "Plan your visit" mini-block with flight-time callouts (NYC ≈ 4.5h, LON ≈ 8h, YYZ ≈ 5h) that animate in as counters.

### 12. Final CTA — premium close
- Full-bleed image (dusk / fire-pit / beach dinner)
- Overlay: serif "Stay with us" + dual CTAs
- Subtle Ken Burns slow zoom on the background (respect reduced-motion)

### 13. Footer — editorial, confident
- Wordmark large, INK background, Sand type
- Three columns: Explore / Stay / Connect
- NAP block (address, phone, email) — **exact match to GBP** (confirm with Nate before overwriting)
- Social row with monochrome icons that color on hover
- Legal row with fine-print policies
- Copyright + "Crafted by LFS" attribution

### 14. Mobile sticky CTA
- Keep. Polish the material: frosted backdrop-filter, subtle border-top in Seafoam, haptic-feeling press states.

---

## Technical direction

### Stack decision
- **Option A (recommended):** Keep static HTML/CSS/JS but layer in:
  - `gsap@3` + `ScrollTrigger` (via CDN)
  - `lenis` (smooth scroll)
  - a tiny in-file IntersectionObserver fallback for reduced-motion or no-JS
  - Native `<dialog>` for lightbox
- **Option B (if art demands it):** Migrate to Next.js (App Router) + `framer-motion` + `gsap` + `lenis` + `next/image`. Only take this path if it materially unlocks the art — document the reason in `implementation-log.md`.
- Preserve existing schema, analytics, event taxonomy, sitemap, robots, OG metadata.

### Performance
- LCP target: < 2.5s on 4G mobile
- CLS target: < 0.05 (stop the current CLS problem)
- INP target: < 200ms
- Total JS < 180KB gzipped for the baseline path
- Lazy-load all below-fold images and the map SVG
- `font-display: swap` on all web fonts; preconnect to Google Fonts

### Accessibility
- All animations respect `prefers-reduced-motion`
- Focus rings on every interactive element (Seafoam 2px)
- Lightbox: full keyboard control, focus trap, ESC to close, announce with `aria-live`
- Gallery captions announced to screen readers
- Color contrast: all text ≥ 4.5:1 (AAA where possible for display type)

### SEO / AI-search (do not regress)
- Keep `Hotel`, `WebSite`, `FAQPage`, `BreadcrumbList` JSON-LD — extend with `ImageObject` for the gallery's top 10 photos
- Keep sitemap.xml and robots.txt AI-bot allowances
- Every section must have a real `<h2>`; do not bury headings in styled divs
- OG image: refresh to the new hero still

### Analytics
- Preserve all GA4 events already wired in `app.js`: `book_now_click`, `check_availability_click`, `phone_click`, `email_click`, `map_directions_click`, `social_click`, `generate_lead`
- Add: `gallery_open`, `gallery_next`, `map_interaction`, `review_scroll`
- Keep Vercel Web Analytics + Speed Insights

---

## Guardrails — do not break

- Do **not** change NAP data (address, phone, email) without Nate's sign-off
- Do **not** drop the existing Hotel / WebSite / Breadcrumb / FAQ schema
- Do **not** remove the mobile sticky CTA
- Do **not** introduce tropical clichés (no palm-tree emoji, no `font: Pacifico`, no generic stock parrot photos)
- Do **not** sacrifice mobile performance below Lighthouse 70 to chase animation
- Do **not** ship `localStorage`-dependent features
- Do **not** use any SVG geometry that requires `THREE.CapsuleGeometry`
- Preserve all copy that already reads well; upgrade only what is flat

---

## Deliverables

1. New branch off `feat/v7-compliance`: `feat/art-tier-sample`
2. Commits in logical chunks:
   - (a) design tokens + motion primitives
   - (b) hero upgrade + trust strip
   - (c) gallery rebuild
   - (d) nautical map section
   - (e) lower reviews + awards section
   - (f) rooms/dining/spa/weddings polish
   - (g) footer + mobile polish
   - (h) final perf + a11y pass
3. Updated `implementation-log.md` with a bulleted record of every change
4. Updated `launch-checklist.md` — confirm every item green on preview
5. Screenshots of 6 key scroll moments committed to `/assets/qa/` (hero enter, trust strip, gallery bento, map draw-in mid-frame, awards medallions, final CTA)
6. New PR against `main` that references this prompt
7. Vercel preview URL posted in the PR description

---

## Post-deploy validation

- Lighthouse mobile: Performance ≥ 70, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- Rich Results test: all schema types valid
- `rel="canonical"` correct on every page
- All CTAs fire their GA4 events (verify in DebugView)
- `prefers-reduced-motion` tested in DevTools emulation
- Keyboard-only walkthrough passes
- Core Web Vitals (CrUX-simulated): green on mobile and desktop

---

## Creative north star

If this sample does not make the prospect say *"I didn't know a Barbados hotel site could look like this,"* it's not done. Every section should feel deliberate, unhurried, and crafted. Negative space is a feature. Motion is restrained and purposeful. The map section and the gallery are the two **"screenshot moments"** that will carry the pitch — they must be flawless.

Make it art. Make it outperform. Ship the preview when it's ready for Nate to walk into a meeting with.
