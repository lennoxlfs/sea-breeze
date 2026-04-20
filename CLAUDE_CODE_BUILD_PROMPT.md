# Sea Breeze Beach House — Claude Code Build Prompt
## Bring the sample site up to Web Brain v7 spec
**Prepared by LFS — April 2026**

---

## How to use this prompt

Paste this document into Claude Code as the implementation brief for the Sea Breeze sample site.

Before any code change, Claude Code must read, in order:
1. `Sea_Breeze_Research_Package.docx`
2. `Sea_Breeze_Brand_Package.docx`
3. `Sea_Breeze_Internal_Report.docx`
4. This document

Treat the three strategy docs as the problem statement. Treat this document as the approved change order.

---

## 1. Implementation Summary

We are **not** redesigning the Sea Breeze sample site. The design is approved and will be preserved. This build brings the existing sample up to LFS Web Brain v7 spec so the site ships production-ready, analytics-ready, AI-search-ready, and defensible under scrutiny from Google Rich Results Test, PageSpeed Insights, Lighthouse, and Search Console.

**Working directory:** `/sessions/gracious-eloquent-rubin/mnt/Sea Breeze Website/site/`
**Deployment target:** Vercel (project: `sea-breeze-barbados`)
**Repository:** GitHub (existing)
**Tech:** Plain HTML / CSS / vanilla JS (static). No framework.

---

## 2. Issues That Must Be Fixed

Sourced from the research package and internal sales report.

### 2.1 Technical / measurement
- No Vercel Web Analytics installed.
- No Vercel Speed Insights installed.
- No GA4 scaffolding or event hooks in the page.
- `apple-touch-icon.png` is referenced but not present in the folder.
- No GA4 event tracking on the conversion actions (`book_now_click`, `phone_click`, `email_click`, `check_availability_click`, `map_directions_click`).

### 2.2 Structured data / AI-search readiness
- Homepage has solid `Hotel` + `WebSite` schema but is missing:
  - `BreadcrumbList` (even for a one-pager, helps entity + navigation signals).
  - `FAQPage` (no FAQ content on-page yet — must be added in visible HTML and mirrored in schema).
  - `TouristDestination` / place signals for Maxwell Coast area context.
- No visible direct-answer / AI-search block near the top that answers "what is Sea Breeze Beach House" in text form.
- Gallery items use CSS `background-image`, meaning no `<img>` tag, no `alt` text, and no crawlable image content. This hurts image SEO and accessibility.

### 2.3 Local SEO / NAP
- Research flagged NAP inconsistency between GBP and the current live site. The **sample** uses the canonical website values (phone `+1 246-428-9441`, postal `BB17032`). The sample is correct; the **GBP record must be updated** by the client to match — this is a post-sale off-site action, noted in the launch checklist.
- `hasMap` value in schema is a placeholder (`?cid=sea-breeze-beach-house-barbados`) and should be corrected to the real GBP CID or a Google Maps place URL once confirmed.

### 2.4 Accessibility
- Gallery `background-image` blocks assistive tech.
- Color contrast on light-on-warm-sand is not audited.
- Decorative icons in Inclusions/Celebrations sections have no `aria-hidden="true"`.
- Date inputs inside the glass booking widget have labels but the `label for=` pattern needs an audit on mobile Safari (iOS known quirk).

### 2.5 Discoverability / crawlers
- `robots.txt` is minimally permissive. Per v7 spec, we explicitly allow major search + AI crawlers (Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot, Applebot).
- `sitemap.xml` only has the root URL. For a single-page site with anchors, this is acceptable, but `lastmod` must reflect each deploy.

### 2.6 Conversion
- No visible "Why Book Direct" trust strip (research called this out).
- No mobile-visible trust line showing **4.4★ / 768 reviews / Booking.com 2026 / Aspire 2025** near hero.
- Hero tagline is aspirational but doesn't hook AI-search queries ("all-inclusive beachfront resort in Barbados with every ocean view"). Add a sentence below the hero, visible in HTML.

---

## 3. Brand Rules That Must Be Preserved

From the Brand Package. **Do not change:**
- Deep Ocean Blue `#0A3D62` palette. Soft Seafoam `#4ECDC4`, Sunset Coral `#FF6B6B`, Golden Hour `#F4A261`, Warm Sand `#F5EDE1` accents.
- Headings in `Cormorant Garamond` (already editorial / Playfair-adjacent — keep this face; do not swap to Playfair Display).
- Body in `Urbanist`.
- Glass-frost booking widget.
- Hero video treatment.
- Section rhythm (white → warm sand alternation).
- Card style: 8–12px radius, soft shadow.
- Luxury-without-pretension tone.
- Sea Breeze Beach House wording, "Chase Your Bliss" tagline, "Every Sea View, Guaranteed" differentiator.

---

## 4. Approved Improvement Targets

Ordered by priority. These are the only changes Claude Code is authorized to implement in this build.

### Priority 1 — Analytics foundation (must-do, invisible to users)
1. Add `<script defer src="/_vercel/insights/script.js"></script>` for Vercel Web Analytics.
2. Add `<script defer src="/_vercel/speed-insights/script.js"></script>` for Vercel Speed Insights.
3. Add GA4 loader scaffolding (commented placeholder with `G-XXXXXXX` so Nate can flip it on post-close).
4. Add `dataLayer` initialization so GA4 events work once the measurement ID is live.
5. Wire the following events into `app.js` (safe to fire even if dataLayer isn't loaded):
   - `book_now_click` — on every `.btn-book`, `.btn-book-mobile`, `.btn-primary` book
   - `check_availability_click` — on `.btn-check-avail`
   - `phone_click` — on every `tel:` link
   - `email_click` — on every `mailto:` link
   - `map_directions_click` — on any Maps link
   - `social_click` — on header/footer social icons

### Priority 2 — AI-search + schema
1. Add a **direct-answer paragraph** below the hero (inside `#welcome` as a subtle intro line or just after `<h2>`), one sentence, visible in HTML, that names the entity, location, and category. Example: *"Sea Breeze Beach House is a 4-star, 122-room all-inclusive beachfront resort on Maxwell Coast in Christ Church, Barbados."*
2. Add a **FAQ section** near the bottom (after Reviews, before Barbados) with 6 questions that reflect real pre-booking intent:
   - Is Sea Breeze Beach House truly all-inclusive?
   - How far is Sea Breeze from the Barbados airport?
   - Does every room have an ocean view?
   - Are water sports included?
   - Can I host a wedding at Sea Breeze?
   - Is there a spa on-site?
   Mirror these as `FAQPage` schema.
3. Add `BreadcrumbList` schema (even on single-page — `Home → [Anchor Section]` format is fine for the homepage).
4. Audit and fix all `<img>` alt text. Add a decorative `<img>` inside each gallery cell (positioned off-screen visually, retained in DOM for crawlers and AT) OR switch gallery cells to `<picture>` with `loading="lazy"` + proper alt. **Preferred:** swap to `<img>` inside the card with CSS `object-fit: cover` to preserve the current look.
5. Add `aria-hidden="true"` to decorative SVG icons in Inclusions and Celebrations sections.

### Priority 3 — Discoverability
1. Replace `robots.txt` with explicit allow rules for Googlebot, Bingbot, Applebot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot. Keep `Sitemap:` line.
2. Update `sitemap.xml` `lastmod` to current deploy date.
3. Add an `apple-touch-icon.png` (180×180, brand teal background, white "SB" or the wave monogram) OR remove the `<link rel="apple-touch-icon">` reference. Recommended: add the asset.

### Priority 4 — Conversion
1. Add a **trust strip** just under the hero (between hero section and Welcome section): `★ 4.4 · 768 Google reviews  ·  Aspire Inclusivity 2025  ·  Booking.com 2026  ·  AAA Rated`.
2. Add a **"Why Book Direct"** micro-section between Rooms and Dining: 3 bullets — best rate guaranteed, free room upgrade when available, resort credit. Small, not a full section.
3. Ensure the mobile sticky CTA has sufficient contrast and a `tel:` fallback for users who prefer phone.

### Priority 5 — Accessibility polish
1. Add `:focus-visible` rings on all interactive elements.
2. Verify contrast on `section-label` against Warm Sand background.
3. Add `aria-hidden="true"` to pure-decoration icons.
4. Confirm `<main>` landmark wraps all primary content (already does).
5. Add `prefers-reduced-motion` override that disables `fade-in` transforms.

---

## 5. Final Build Plan

Do these in order.

1. Create `implementation-log.md` at the project root. Log every change with a one-line summary as you go.
2. Create `analytics-setup-checklist.md` at the project root.
3. Update `index.html`:
   - Head: add Vercel Analytics, Speed Insights, GA4 scaffold, BreadcrumbList JSON-LD, FAQPage JSON-LD.
   - Body: add direct-answer line under hero, trust strip, "Why Book Direct" strip, FAQ section.
   - Alt text audit on all `<img>`.
   - Swap gallery `background-image` divs to `<img>` elements with `loading="lazy"` + proper alt text (behaviour preserved with `object-fit: cover`).
   - Fix/create `apple-touch-icon.png`.
4. Update `robots.txt` with explicit bot allowances.
5. Update `sitemap.xml` lastmod.
6. Update `app.js` with GA4 event helper and wire `book_now_click`, `check_availability_click`, `phone_click`, `email_click`, `social_click`, `map_directions_click`.
7. Add a `launch-checklist.md` using the v7 template.
8. Validate:
   - `npx html-validate index.html` or manual spot-check
   - Lighthouse mobile & desktop on local preview
   - Rich Results Test expectation (Hotel, WebSite, FAQPage, BreadcrumbList)
   - Schema matches visible content (no ghost amenities, no fake reviews, no invented FAQ)
9. Commit with message: `feat: bring Sea Breeze sample to Web Brain v7 spec (analytics, schema, AI-search, a11y)`
10. Push to GitHub. Deploy via Vercel. Verify production URL.
11. Re-test `Book Now` on production. Re-run Rich Results Test on live URL. Confirm analytics fires.

---

## 6. File / Page Change Plan

| File | Action | Reason |
|---|---|---|
| `index.html` | Edit head + body | Analytics, schema, AI-search, trust strip, FAQ, alt text |
| `robots.txt` | Replace | Explicit bot allowances (Googlebot, OAI-SearchBot, GPTBot, ClaudeBot, PerplexityBot) |
| `sitemap.xml` | Update lastmod | Reflect deploy date |
| `app.js` | Edit | GA4 event hooks on all CTAs + phone/email/social links |
| `apple-touch-icon.png` | Create (180×180) | Referenced but missing; brand teal + white monogram |
| `styles.css` | Minor add | Trust strip + FAQ styling using existing tokens |
| `implementation-log.md` | Create | Log of approved changes (per v7 rule) |
| `analytics-setup-checklist.md` | Create | Repo + dashboard-level setup tracking |
| `launch-checklist.md` | Create | Standard LFS launch QA gate |

---

## 7. Guardrails

- Do **not** change the color palette.
- Do **not** change the fonts.
- Do **not** change the hero video, headline, or glass booking widget.
- Do **not** add pop-ups, interstitials, or cookie banners in this pass (separate compliance step).
- Do **not** fabricate reviews, FAQs, amenities, or awards. Every FAQ answer and trust claim must be verifiable from the client's live site, GBP, or supplied assets.
- Do **not** swap the `Cormorant Garamond` heading to `Playfair Display` — Cormorant is the approved choice in the sample; Playfair was only the brand-package aspirational note. Preserve the sample.
- Do **not** introduce new frameworks. Stay with static HTML/CSS/JS.

---

## 8. Expected outputs (deliverables)

After Claude Code runs, the working folder should contain:
- Updated `index.html`, `robots.txt`, `sitemap.xml`, `app.js`
- New `apple-touch-icon.png`
- `implementation-log.md` (with every change logged)
- `analytics-setup-checklist.md`
- `launch-checklist.md`
- A commit pushed to GitHub
- A Vercel production deploy verified

---

## 9. Post-deploy validation

Run after Vercel deploy:
- Lighthouse mobile ≥ 80 on homepage
- Lighthouse desktop ≥ 90 on homepage
- Rich Results Test: Hotel ✅, WebSite ✅, FAQPage ✅, BreadcrumbList ✅
- PageSpeed Insights mobile ≥ 75
- Vercel Web Analytics receiving events
- GA4 receives `book_now_click` test event (once measurement ID is set)
- `robots.txt` resolves at production domain
- `sitemap.xml` resolves at production domain
- `tel:` and `mailto:` links work on a real phone
- Form-free booking widget passes the `check_availability_click` event

---

## 10. What happens next

Once this build is shipped and verified, this sample is ready to show the client in the sales meeting alongside the LFS client-facing sales report (`Sea_Breeze_Sales_Report.docx`). After close, the same codebase becomes the starting point for the final production site and ongoing monthly SEO Evolution work.

**End of handoff brief.**
