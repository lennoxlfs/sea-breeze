# Sea Breeze Beach House — Analytics Setup Checklist

**Owner:** LFS (Nate to flip on GA4 post-close)
**Related files:** `index.html`, `app.js`

This is the checklist for taking Sea Breeze from "measurement-ready" to "measuring". The code is wired. These are the toggles and dashboards.

---

## 1. Vercel Web Analytics

- [ ] Project `sea-breeze-barbados` created in the Vercel dashboard.
- [ ] **Analytics** tab → **Enable Web Analytics** clicked (free tier is fine for the sample; upgrade to Pro before launch if the client signs).
- [x] `<script defer src="/_vercel/insights/script.js"></script>` is in `<head>` of `index.html`.
- [ ] Verify page-views appear in the Vercel Analytics tab within 60 seconds of deploying to production.

## 2. Vercel Speed Insights

- [ ] **Speed Insights** tab → **Enable** clicked.
- [x] `<script defer src="/_vercel/speed-insights/script.js"></script>` is in `<head>` of `index.html`.
- [ ] Verify first real-user samples land in the dashboard after the first external visitor.

## 3. Google Analytics 4

- [ ] GA4 property created (or existing `Ocean Hotels` property confirmed with a `Sea Breeze` data stream).
- [ ] Measurement ID captured (format `G-XXXXXXXXXX`).
- [ ] In `index.html`, uncomment the GA4 loader block in `<head>` and replace **both** instances of `G-XXXXXXXXXX` with the real ID.
- [ ] Redeploy.
- [ ] In GA4 → **Admin → DebugView**, open the production URL with `?debug_mode=1` and click:
  - [ ] Header **Book Now** → expect `book_now_click`.
  - [ ] Hero **Check Availability** → expect `check_availability_click`.
  - [ ] Footer phone number → expect `phone_click`.
  - [ ] Footer email → expect `email_click`.
  - [ ] Any social icon → expect `social_click` with `network` param.

## 4. GA4 event reference (already wired in `app.js`)

| Event | Trigger | Params |
| :--- | :--- | :--- |
| `book_now_click` | `.btn-book`, `.btn-book-mobile`, `a.btn-primary` | `location`, `label` |
| `check_availability_click` | `.btn-check-avail` | `checkin`, `checkout`, `guests`, `location` |
| `phone_click` | `a[href^="tel:"]` | `phone`, `location` |
| `email_click` | `a[href^="mailto:"]` | `email`, `location` |
| `map_directions_click` | Any Google Maps link | `href`, `location` |
| `social_click` | Header + footer social icons | `network`, `href`, `location` |

All events also land in `window.dataLayer` so GTM can adopt them with zero code changes.

## 5. Search Console

- [ ] Property added for `sea-breeze-barbados.vercel.app` (domain or URL-prefix).
- [ ] Ownership verified (DNS TXT or HTML-tag method — note: HTML-tag would require a head edit).
- [ ] `sitemap.xml` submitted at `/sitemap.xml`.
- [ ] `robots.txt` resolves at `/robots.txt` and the **robots.txt Tester** shows no block rules.

## 6. Bing Webmaster Tools

- [ ] Property added and verified.
- [ ] Sitemap submitted.

## 7. Rich Results Test (Google)

- [ ] Run `https://search.google.com/test/rich-results` against the production URL after deploy.
- [ ] Expect these entity types to parse with **zero errors**: `Hotel`, `WebSite`, `FAQPage`, `BreadcrumbList`.
- [ ] Any warnings on `hasMap` → acceptable until the real GBP CID is supplied, then flip the URL.

## 8. Ongoing (monthly SEO Evolution handoff)

- [ ] Vercel Analytics dashboard linked into the LFS client report template.
- [ ] GA4 key events marked as **conversions** (`book_now_click`, `check_availability_click`, `phone_click`).
- [ ] Monthly review of top FAQ queries in Search Console → feed back into FAQ copy.
