# Sea Breeze Beach House — Implementation Log

**Source brief:** `CLAUDE_CODE_BUILD_PROMPT.md` (Web Brain v7 change order)
**Build date:** 2026-04-20
**Engineer:** LFS / Claude Code
**Scope:** Bring the existing sample to v7 spec. No redesign. No new sections beyond those named in the brief.

---

## Summary

| Area | Status |
| :--- | :--- |
| Analytics (Vercel + GA4 scaffold) | Already in place in `index.html` head — verified. |
| GA4 event hooks | **Added** in `app.js`. |
| BreadcrumbList + FAQPage schema | Already in place — verified. |
| Visible FAQ section | Already in place — verified. |
| Direct-answer paragraph | Already in place in `#welcome`. |
| Trust strip | Already in place under hero — verified. |
| Why Book Direct strip | Already in place in Accommodations section — verified. |
| Gallery `<img>` + alt text | **Added** — 12 items rewritten. |
| `robots.txt` explicit bot allowances | **Added**. |
| `sitemap.xml` `lastmod` | **Updated to 2026-04-20.** |
| `apple-touch-icon.png` (180×180) | **Created.** Deep teal `#00394D` with white italic SB monogram. |
| `prefers-reduced-motion` override | **Added** in `styles.css` and honoured in `app.js`. |
| Hotel schema `hasMap` | **Fixed** to a working Google Maps search URL (GBP CID pending). |
| Hotel schema `aggregateRating` | **Aligned to visible trust strip** (4.4 · 768). |
| Accessibility decorative icons | Already have `aria-hidden="true"` — verified. |
| Skip-to-main-content link | Already in place — verified. |
| `:focus-visible` outlines | Already in place in base `a/button/input/select` rules — verified. |

---

## Change log (chronological)

1. **`app.js`** — Added `trackEvent()` helper that safely pushes to `dataLayer` and `gtag` (noop if neither is present).
2. **`app.js`** — Wired GA4 events:
   - `book_now_click` on every `.btn-book`, `.btn-book-mobile`, and anchor-style `.btn-primary`.
   - `check_availability_click` on every `.btn-check-avail` (fires before the alert, so date-less attempts are still captured).
   - `phone_click` on every `a[href^="tel:"]`.
   - `email_click` on every `a[href^="mailto:"]`.
   - `map_directions_click` on any Google Maps link (ready for when the footer/contact gets a directions button).
   - `social_click` on every header + footer social icon, with the detected network passed as a param.
3. **`app.js`** — IntersectionObserver fade-in now respects `prefers-reduced-motion`. Anchor smooth-scroll falls back to `behavior: 'auto'` for the same users.
4. **`index.html`** — Gallery section: swapped 12 `.g-item` divs with inline `background-image` styles for semantic `<figure>` + `<img>` elements. Each image carries:
   - A descriptive, AI-search-friendly `alt` attribute (entity + location + category where relevant).
   - `loading="lazy"` and `decoding="async"` for performance.
5. **`styles.css`** — Added `.g-item > img { width:100%; height:100%; object-fit:cover; }` plus a gentle hover zoom so the original visual behaviour is preserved.
6. **`styles.css`** — Added a `@media (prefers-reduced-motion: reduce)` block that disables `.fade-in` transforms, removes hover zoom on gallery/dining cards, and resets `scroll-behavior`.
7. **`index.html`** — Hotel schema:
   - `aggregateRating` rewritten to `4.4` / `768` so schema matches the visible trust-strip claim. Prevents a ghost-claim mismatch under Rich Results Test.
   - `hasMap` replaced with a real `https://www.google.com/maps/search/?api=1&query=…` URL anchored to the address. When the client confirms the GBP CID, flip this to the CID form.
8. **`robots.txt`** — Replaced the minimal default with explicit `Allow: /` entries for Googlebot, Googlebot-Image, Bingbot, Applebot, DuckDuckBot, OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-Web, and Google-Extended. Sitemap line retained.
9. **`sitemap.xml`** — `lastmod` updated to `2026-04-20`.
10. **`apple-touch-icon.png`** — Generated 180×180 PNG, deep teal `#00394D` background, white italic "SB" (matches the existing favicon silhouette, honours the v7 brief's "brand teal + white SB" recommendation). Referenced in `<link rel="apple-touch-icon">` in the head, which was already present.

---

## Open follow-ups (not in this build)

- **GA4 measurement ID** is still a placeholder (`G-XXXXXXXXXX`). Nate to flip on post-close — see `analytics-setup-checklist.md`.
- **GBP NAP update** — phone/postal on the live site match the sample. GBP record still needs to be updated by the client to match. Off-site action, tracked in `launch-checklist.md`.
- **`hasMap` CID** — when the real GBP CID is confirmed, replace the search URL in the Hotel schema with the CID form.
- **Experience / Room / Dining / Spa / Barbados background-image blocks** — these were NOT in scope for this pass (the brief called out the gallery specifically). A follow-up pass can migrate them to `<img>` for parity, but the gallery was the priority because it had twelve crawlable images with no markup.
- **Cookie/compliance banner** — explicitly out of scope for this pass per brief §7.

---

## Verification performed before handoff

- [x] Manual read of `index.html` confirmed BreadcrumbList, FAQPage, WebSite, Hotel JSON-LD blocks are syntactically intact.
- [x] FAQ visible HTML answers match FAQPage schema verbatim (no ghost FAQ).
- [x] Trust-strip claims (4.4★ · 768 reviews · Aspire 2025 · Booking.com 2026 · AAA) match schema `aggregateRating` and award-card copy.
- [x] `apple-touch-icon.png` renders at 180×180 and is referenced in the head.
- [ ] Lighthouse (to be run on production preview — see `launch-checklist.md`).
- [ ] Rich Results Test (to be run on production preview).

---

## 2026-04-20 — Art-tier polish layer (additive, non-destructive)

**Goal:** Bring Laucala / Round Hill / Bahamas.com editorial flow, motion, and ambient texture to the existing site without changing copy, fonts, structure, or SEO.

**Approach:** Two new files loaded AFTER the existing stylesheet and app script. Low specificity, so existing styles and scripts win wherever they already act. Full `prefers-reduced-motion` safety net.

### Files added
- `art-polish.css` — ambient-canvas positioning, clip-path `.sb-unveil` unveil, refined reveal easing (`cubic-bezier(.22,1,.36,1)` @ 1.1s), photography-lift hover, gallery stagger delay, section hairlines, refined `.section-label` letter-spacing, softer custom pin-pulse for the cartographer, reduced-motion overrides.
- `art-polish.js` — drifting-particle ambient canvas (paper/ink/teal tones, ~28–110 particles by viewport, auto-pauses when hidden), `.sb-unveil` IntersectionObserver, gallery `--i` indexing, optional `[data-art-parallax]` signature parallax via GSAP ScrollTrigger.

### `index.html` edits
- `<link rel="stylesheet" href="art-polish.css" />` added after `styles.css`.
- `<canvas id="sb-ambient" aria-hidden="true">` added immediately after `<body>`.
- `<script defer src="art-polish.js">` added after `app.js`.
- `.sb-unveil` applied to: 12 gallery `.g-item` figures, 4 `.exp-card` experience tiles, 6 `.dining-card` tiles, the `.spa-img-wrap`, and the `.barbados-island` cartographer figure.
- `data-art-parallax="4"` applied to the `.barbados-island` figure only (signature accent).

### What was NOT touched
- Hotel / WebSite / BreadcrumbList / FAQPage JSON-LD (all 4 schema blocks intact and verified).
- `app.js` GA4 event wiring, Lenis boot, existing reveal observer, booking widget, mobile sticky CTA.
- Copy, fonts (Cormorant Garamond + Urbanist), color tokens, section order, navigation, canonical URL.
- `styles.css` (unchanged — polish layered additively).

### Accessibility / performance
- Ambient canvas, clip-path unveils, and art-parallax all no-op under `prefers-reduced-motion: reduce`.
- Ambient canvas pauses on `document.hidden` via `visibilitychange`.
- Canvas uses `aria-hidden="true"`; `pointer-events:none`; `z-index:-1`.
- All added motion uses transform/opacity/clip-path (compositor-friendly).

### To verify on Vercel preview
- [ ] Lighthouse Performance ≥ 90 on mobile (confirm ambient canvas doesn't regress LCP).
- [ ] Rich Results Test still reports Hotel + FAQ + Breadcrumb valid.
- [ ] `prefers-reduced-motion: reduce` disables unveils + ambient canvas (OS-level toggle test).
- [ ] Gallery + experience + dining cards unveil from the bottom on first scroll-in.
- [ ] Cartographer drifts subtly on scroll, pin-pulse is slower and softer.

---

## 2026-04-20 — v2 polish pass (editorial rebuild, same bones)

**User direction (condensed):** stats over tinted beach · drop the O2 promo · rework dining layout · fix broken award logos and float them · better spa picture · scenery on celebrations · weave the cartographer background through the whole site · more breathing room · premium editorial feel.

### Structural HTML edits (`index.html`)
- Welcome section → single centered column (`.welcome-lead`). Two-column `welcome-grid` retired.
- NEW full-bleed `<section class="stats-hero">` with beach photo + dark tint + 4 stats in light editorial type. `data-count` animations and `.reveal` observers preserved.
- Removed `.sister-property` "Stay in One, Play in Two / Discover O2 Beach Club" block.
- Celebrations: three icon cards → three full-image `.celebration-card.celebration-image` cards with scenic CDN photos, gradient overlays, eyebrow numbering (01 / 02 / 03), and sb-unveil clip-path reveal.
- Spa: swapped cluttered treatment-room URL for a Maxwell Coast dusk scene that actually reads "drift away"; added a `<figcaption class="spa-caption">` tying the image to the room promise.
- Awards: fixed the broken Booking.com card (the old img URL resolved to a wrong generic "Sea Breeze Awards" SVG). Replaced with a score-style text badge (9.1 / Booking.com Traveller Review) that reads as a real review-award medallion.

### Style additions (`art-polish.css`, +488 lines)
- **Cartography texture** woven through all cream sections (`.welcome`, `.dining`, `.weddings`, `.why-us`, `.reviews`, `.faq`, `.awards`) via `::after` pseudo at 5–5.5% opacity, sepia-shifted, multiply-blended. Alternate mirrored positioning so the map doesn't stack in one column.
- **Editorial pacing:** section padding bumped to `clamp(80px, 10vw, 150px)` top/bottom across the homepage; H2s tightened to `-0.018em` letter-spacing and 1.05 line-height; section-header paragraphs capped at 56ch and centered.
- **Stats-hero:** dual-layer overlay (vertical tint + side vignette), four columns on desktop with hairline dividers, label row "Sea Breeze · By the Numbers", Cormorant Garamond numerals at ~7vw, Urbanist micro-labels at .34em tracking.
- **Dining editorial grid:** 12-column layout; six cards rhythm 7+5 / 6+6 / 5+7 — hero cards taller (16:10 min 380px), feature cards 4:3 min 260px. Backgrounds stripped from cards — photos lead, captions read like magazine cutlines.
- **Awards on paper:** dark-teal panel replaced with cream gradient + map texture; cards lose chrome, logos float, hairline dividers between items, centered Cormorant headings, teal Urbanist eyebrow year.
- **Booking.com score badge:** text-only treatment inside a hairline-bordered rounded tile — no broken image dependency.
- **Celebration image cards:** 420–560px min-height, gradient bottom scrim, eyebrow numbering, Cormorant display title, hover 1.4s scale 1.06 on image, sb-unveil clip-path entry.
- **Reduced-motion:** hover scale and image parallax disabled, cartography texture kept but static.

### Preserved verbatim
- All four schema blocks (Hotel, WebSite, BreadcrumbList, 6-question FAQPage) — `4` blocks + `6` questions confirmed via grep.
- All 10 GA4 / dataLayer hooks in `app.js`.
- Navigation, section IDs (`#welcome`, `#accommodations`, `#dining`, `#spa`, `#weddings`, `#awards`, `#barbados`), canonical URL, OG/Twitter tags, trust-pill data, FAQ text, booking widget wiring, mobile sticky CTA.
- Cormorant Garamond + Urbanist. No font swap.
- `styles.css` untouched. `app.js` untouched.

### To verify on Vercel preview
- [ ] LCP unaffected by stats-hero image (it's below welcome, not first paint).
- [ ] Lighthouse Performance / SEO / A11y still green.
- [ ] Rich Results Test still validates Hotel, FAQ, Breadcrumb.
- [ ] Cartography wash reads as texture, never as a "picture" competing with copy.
- [ ] Stats-hero on mobile: 2×2 grid, dividers removed.
- [ ] Dining grid collapses to single column under 900px.
- [ ] `prefers-reduced-motion: reduce` disables all hover scales + art-parallax.

---

## Entry 3 — Round-2 Editorial Pass (2026-04-20)

**Driver:** Client direction — "no clean breaks, make it mesh, work of art feel, liquid glass metrics, editorial celebrations, redesigned FAQ, more cartographer texture, more animations."

**Files added:**
- `art-polish-v3.css` — round-2/3 layer: hero CTA, beach-hero + liquid glass, editorial inclusions, celebration chapter stack, editorial FAQ, cartographer texture expansion, section blends.
- `art-motion-v3.js` — count-up on glass metrics, celebration chapter reveals, FAQ toggle pulse, beach-hero mouse parallax, section blend-through scroll effect, hero anchor smooth-scroll via Lenis.

**Files edited:**
- `index.html` — 6 structural changes (see below).

**Files preserved untouched:**
- `app.js`, `styles.css`, `art-polish.js`, `art-polish.css`, all 4 JSON-LD schema blocks, all GA4 event hooks, `robots.txt`, `sitemap.xml`, favicons.

### HTML changes

1. **Hero booking widget removed.** Replaced with a single liquid-glass CTA button (`<a class="btn-hero-book">` → `#finalcta`) plus an italic sub-line about best-rate guarantee. `id="booking"` preserved on the wrap so nav/footer anchors still land. Saves ~320px vertical space on mobile, removes booking-form UX friction from a video-heavy hero.
2. **Welcome + stats-hero merged into one narrative section.** The broken `.stats-hero` empty-white-box rendering is retired (`display:none`). A new `.beach-hero` block uses the turquoise aerial Maxwell Coast CDN image (`seabreezebeachhouse-11-gallery-01`) with a layered tint and bottom horizon-fade into the next section. The 122/6/5/3 numbers now sit in a `.glass-metrics` liquid-glass card (backdrop-filter blur + saturated, subtle shimmer, hairline white border).
3. **Everything Included icons redesigned.** Six bespoke editorial SVGs — coupe glass, paddleboard + wave, steel-pan sun, compass, flag-green, hibiscus. Each sits on a cream disc with a dashed ambient ring, ink-colored strokes, ring drift animation, hover lift. Each item now also carries a `.inc-detail` sub-line (e.g. "Six restaurants · five bars · premium spirits") to earn its space.
4. **Celebrations rebuilt as a chapter tryptich.** Three `.celebration-chapter` blocks stack vertically; 4:5 image on one side, narrative on the other, direction alternates L/R/L via `[data-dir]`. Each chapter has a roman-numeral chapter eyebrow (`— 01 —`), italic sub-head with gold accents, a 3-item proof list with hairline gold dashes, and its own CTA. Images: Weddings = champagne-on-sand (gallery-04), Honeymoons = luxury-balcony (gallery-07), Proposals = firepit-dusk (firepit-1). User-uploaded images from screenshots were not available on disk (uploads dir empty) — swap paths in `index.html` lines ~876–924 when the user drops images into `/site/`.
5. **FAQ rebuilt as a two-column editorial layout.** Left aside is a sticky cartographer paper anchor (section-label, italic headline with gold "Answered.", decorative hand-drawn rule SVG, personal note, sticky contact links). Right column is six `.faq-chapter` details with large serif question, italic number, custom `+/×` toggle, animated answer reveal. First chapter opens by default. FAQPage JSON-LD answers preserved unchanged.
6. **Cartographer texture expanded.** A `::before` layer was added to welcome / experience / dining / awards / weddings / why-us / reviews / faq / final-cta — each with a slightly different Bellin-1758 position and opacity (.035 – .06) so the texture reads as a continuous atmospheric wash, not a repeated stamp. Paired with gradient `background-image` blends on section backgrounds so sections melt edge-to-edge rather than ending abruptly.

### Motion additions
- Glass metrics: IntersectionObserver-triggered count-up with cubic ease-out (~1.4s).
- Celebration chapters: `.sb-chapter-in` class added at 22% threshold for CSS-driven stagger.
- Beach-hero: low-amplitude mouse parallax (desktop, fine pointer only) translating the background image ±8px.
- FAQ: toggle `+/×` scales 1→1.18→1 on every open, gold color flip.
- Section blend-through: `--sb-tex-amp` CSS var set from scroll-progress onto each textured section for a gentle breathing rhythm.
- Hero CTA, beach CTA, celebration CTAs: all route through Lenis if present, else native smooth-scroll.
- All new animations gated by `prefers-reduced-motion`.

### Known deferred items (user to drop-in)
- If Nate wants the *exact* images from his screenshots (sunset wedding couple, couple kissing, proposal at sunset), he can drop them into `/site/` and I'll swap the three CDN URLs on lines ~876, ~893, ~910 of `index.html`.
- Custom hero video poster for the new beach photo location — current CDN image is high-quality aerial; could be upgraded to a guest-provided lifestyle shot if supplied.

### To verify on Vercel preview
- [ ] Hero no longer shows date pickers or guest select.
- [ ] Beach-hero metrics card renders as frosted glass with visible 122 / 6 / 5 / 3 numbers (not empty boxes).
- [ ] Count-up runs once per metric on first view.
- [ ] Celebration chapters alternate image side (L/R/L) on desktop, stack image-first on mobile.
- [ ] FAQ aside is sticky on desktop, scrolls naturally on mobile; first FAQ is open by default; toggles animate.
- [ ] Everything Included icons show 6 distinct bespoke SVGs; hover lifts each disc.
- [ ] Cartographer texture reads as ambient wash, never competes with copy.
- [ ] Section edges now blend via gradient fades rather than hard breaks.
- [ ] `prefers-reduced-motion` disables glass shimmer, horizon shimmer, ring drift, count-up transform, mouse parallax.
- [ ] Lighthouse / Rich Results Test all still green.
- [ ] JSON-LD blocks (Hotel / WebSite / BreadcrumbList / FAQPage) still validate.
