# Sea Breeze Beach House — Launch QA Checklist

**Build:** v7 spec compliance pass
**Checklist template:** LFS Web Brain v7

Work the list top-to-bottom. Don't ship until every required row is green.

---

## Pre-deploy (local)

- [x] `index.html`, `app.js`, `styles.css`, `robots.txt`, `sitemap.xml` saved.
- [x] `apple-touch-icon.png` present at site root (180×180).
- [x] `implementation-log.md` complete.
- [x] `analytics-setup-checklist.md` complete.
- [ ] `node serve.mjs` runs; `http://localhost:3000` loads without console errors.
- [ ] Open DevTools → Network → hard reload. Confirm no 404s (esp. `apple-touch-icon.png`, `favicon.svg`, `styles.css`, `app.js`, Vercel insight + speed-insight scripts).

## Structured data

- [ ] Paste the HTML into Google's **Rich Results Test**. Expect:
  - [ ] `Hotel` — valid.
  - [ ] `WebSite` — valid.
  - [ ] `FAQPage` — valid; 6 questions mirror the on-page FAQ verbatim.
  - [ ] `BreadcrumbList` — valid.
- [ ] Schema.org validator (`validator.schema.org`) — no errors, warnings understood.
- [ ] Verify `aggregateRating` in schema matches the visible trust strip (`4.4` · `768`).
- [ ] Verify no FAQ answer references claims that aren't on the live client site / GBP / supplied assets.

## Performance

- [ ] Lighthouse mobile — **Performance ≥ 80**, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- [ ] Lighthouse desktop — **Performance ≥ 90**, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- [ ] PageSpeed Insights mobile — **Performance ≥ 75** (field data will fill in after launch).
- [ ] No CLS on hero video / gallery scroll (aspect-ratio + lazy-loading verified).

## Accessibility

- [ ] Keyboard-only: can tab from skip-link → header → booking widget → footer without a trap.
- [ ] `:focus-visible` ring visible on every interactive element.
- [ ] Screen-reader spot-check on the hero: `Chase Your Bliss` announced, then the `sr-only` entity line.
- [ ] `prefers-reduced-motion`: enable in macOS System Settings, reload. `.fade-in` and gallery hover-zoom are disabled.
- [ ] All decorative SVG icons carry `aria-hidden="true"`.
- [ ] Gallery images have descriptive `alt` text (audit in DevTools → Accessibility tree).
- [ ] Colour contrast: `section-label` teal on Warm Sand passes WCAG AA at normal text size.

## SEO / discoverability

- [ ] `robots.txt` resolves at production `/robots.txt`.
- [ ] `sitemap.xml` resolves at production `/sitemap.xml` with today's `lastmod`.
- [ ] `meta robots` is `index, follow` on the canonical URL.
- [ ] Canonical `<link>` points to the production origin.
- [ ] Open Graph + Twitter Card preview looks correct in `opengraph.xyz` and `cards-dev.twitter.com`.

## Analytics

- [ ] Vercel Web Analytics receiving events (Analytics tab in dashboard).
- [ ] Vercel Speed Insights receiving real-user samples.
- [ ] GA4 `book_now_click` fires in DebugView (after Nate sets the measurement ID).
- [ ] GA4 `check_availability_click`, `phone_click`, `email_click` verified in DebugView.
- [ ] `social_click` fires with correct `network` param.

## Conversion smoke test

- [ ] Header **Book Now** → scrolls to booking widget without jump.
- [ ] Hero booking widget **Check Availability** → opens `reservations.sea-breeze.com` in new tab with correct dates + guests query params.
- [ ] Mobile sticky CTA appears after hero scroll and disappears back inside hero.
- [ ] Footer `tel:` link dials on a real phone.
- [ ] Footer `mailto:` link opens mail client.

## Off-site actions (client to complete)

- [ ] Google Business Profile phone/postal matches sample (`+1 246 428-9441` / `BB17032`).
- [ ] GBP CID confirmed — swap into the Hotel schema `hasMap` field.
- [ ] Social links verified live (Facebook, Instagram, X, YouTube, TikTok, Yelp).

## Deploy

- [ ] Commit: `feat: bring Sea Breeze sample to Web Brain v7 spec (analytics, schema, AI-search, a11y)`.
- [ ] Push to GitHub feature branch.
- [ ] Vercel preview deploy verified.
- [ ] Promote to production.
- [ ] Re-run Rich Results Test + PSI on the production URL.
- [ ] Tag the release (e.g. `v7-sample-compliance`).
