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
