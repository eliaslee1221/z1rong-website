# Z1RON production audit

Audit date: 2026-09-21

| # | Check | Status | Implementation |
| --- | --- | --- | --- |
| 1 | Custom domain | Pass | `z1ron.com` and `www.z1ron.com` are active on Cloudflare. `z1ron.com` is the canonical origin. |
| 2 | Clean page routes | Pass | The public site uses `/` plus meaningful section fragments (`#work`, `#about`, `#contact`). Unknown paths use the custom 404 page. |
| 3 | Custom 404 page | Pass | `public/404.html`; Cloudflare static assets use `not_found_handling: 404-page`. |
| 4 | Unique page titles | Pass | Home and 404 use distinct descriptive titles. |
| 5 | Meta descriptions | Pass | Home and 404 have purpose-specific descriptions. |
| 6 | Canonical tags | Pass | Home canonical is `https://z1ron.com/`; the noindex 404 intentionally has no canonical. |
| 7 | One clear H1 per page | Pass | Home has one `Math with code` H1; 404 has one `LOST?` H1. |
| 8 | `sitemap.xml` | Pass | Published at `/sitemap.xml`. |
| 9 | `robots.txt` | Pass | Allows crawling and references the sitemap. |
| 10 | `llms.txt` | Pass | Published at `/llms.txt` with profile, canonical URL, sections, and contact. |
| 11 | Favicon | Pass | Custom Z favicon in `favicon.svg`, also referenced by the web manifest. |
| 12 | Internal links | Pass | Header, mobile navigation, CTA, contact, skip link, and back-to-top link use valid internal targets. |
| 13 | Breadcrumbs | Not applicable | A single-page portfolio has no nested page hierarchy; fake breadcrumbs would add noise and misleading semantics. |
| 14 | Structured data | Pass | JSON-LD includes accurate `WebSite` and `Person` entities. |
| 15 | Local business schema | Not applicable | This is an individual research portfolio, not a customer-facing local business. Adding `LocalBusiness` would be inaccurate. |
| 16 | Social share images | Pass | Open Graph and X/Twitter point to an optimized 1200 × 630 `/assets/og-image.jpg`, with dimensions and descriptive alt text. |
| 17 | Image alt text | Pass | The meaningful portrait has descriptive alt text; decorative graphics are hidden from assistive technology. |
| 18 | Console errors | Pass | JavaScript syntax and browser rendering smoke tests complete without application errors. |
| 19 | Production source maps | Pass | Explicitly disabled by the Vite production default; the final output contains no `.map` files. |
| 20 | Oversized JavaScript bundle | Pass | Production JavaScript is about 3.8 kB before gzip and 1.56 kB gzip. No framework runtime is shipped. |
| 21 | Page title is not Vite / React | Pass | The title is `李子榕 TZU-JUNG LI — Z1RON`. |
| 22 | Default placeholder content | Pass | No Vite, React, lorem ipsum, generic project, or template placeholder copy remains. |

## Visual QA

- Increased the smallest metadata and supporting text sizes.
- Added safe line-height and glyph overflow behavior to prevent display text clipping.
- Kept the complete portrait visible to the right of `MATH` with `object-fit: contain` and no crop mask.
- Added mobile-specific sizing at 800 px and 420 px breakpoints.
- Preserved `prefers-reduced-motion` behavior and keyboard skip navigation.

