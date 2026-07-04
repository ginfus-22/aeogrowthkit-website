# AEO Growth Kit — Marketing Website

Static site (plain HTML/CSS/JS, no build step, no framework). Deployed on Netlify.

## Structure

- `index.html` + 15 other pages + `404.html` — all site pages
- `aeo-ds.css`, `website.css` — styling
- `mobile-nav.js` — shared mobile nav toggle
- `image-slot.js` — image placeholder component (editor-time only, harmless on a live page with no stored images)
- `pricing-currency.js` — manual currency display toggle on `pricing.html` (cosmetic only; actual checkout currency is handled separately by Stripe)
- `netlify.toml` — publish directory + 404 redirect config

## Forms

Both the Contact page form and every page's footer email box submit to the same Netlify Forms endpoint (`name="contact"`). Configure the notification email in the Netlify dashboard: **Site settings → Forms → Form notifications**.

## Known placeholders

Search for `[STRIPE_LINK]` (in `pricing.html`) and `[LINKEDIN_URL]` (all pages) and replace with real URLs once available.

## Known gaps (deferred until real content exists)

- `resources.html` sample article cards link nowhere (`href="#"`)
- `article-template.html` share buttons and related-article cards link nowhere (`href="#"`)
