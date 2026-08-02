# AEO Growth Kit — Outstanding Work Roadmap

**Owner:** Steve Gillson
**Created:** 2 August 2026
**Last updated:** 2 August 2026

> Internal document. Not published to the website — it names unmet compliance
> obligations and would be a gift to anyone probing the business.
>
> **This file is the persistent record.** Anything not written here is lost
> between sessions. When a task is done, move it to §5 with the date rather
> than deleting it — the history is what stops work being redone.

**Status key:** 🔴 blocking / legal obligation · 🟠 important · 🟡 worth doing · ⚪ optional

---

## 1. Legal and compliance

### 🔴 #1 — Have a lawyer review the three legal documents
Privacy Policy, Terms of Service and Cookie Policy were rewritten on 2 Aug 2026 from a French auto-entrepreneur / EU GDPR basis. They were drafted carefully but **not by a lawyer**. Two points specifically warrant a French *juriste*:
- The 14-day withdrawal right in Terms §6 (Code de la consommation L.221-3, "non-professionnel" status of solo-trader customers).
- The mentions légales block in Terms §1 (LCEN Art. 6).

### 🔴 #2 — Sign Data Processing Agreements with every processor
**GDPR Art. 28 makes this mandatory, and none are currently in place.** This is the single largest open compliance gap. Checklist and links: `PROCESSING-REGISTER.md` → "Processor agreements".
Netlify · Railway · Auth0 · Stripe · Resend · Calendly · OpenAI · Anthropic · Perplexity · Google. Mostly accepting a standard DPA in-dashboard — an afternoon, not a project.

### 🔴 #3 — Verify the international transfer mechanism for each US provider
Every processor is US-based. Each transfer needs either EU–US Data Privacy Framework certification or Standard Contractual Clauses. Currently unverified. Privacy Policy §7 says a review is underway — **that statement needs to become true**.
Check each against the DPF list: https://www.dataprivacyframework.gov

### 🔴 #4 — Move Google Gemini off the free API tier
OpenAI and Anthropic exclude API submissions from training by default, even on basic tiers. **Google's free Gemini tier does not** — free-tier submissions may be used to improve their models. Privacy Policy §5 commits to moving to tiers that guarantee exclusion. Either upgrade to paid Gemini or stop routing content through it. Also confirm Perplexity's API position.

### 🟠 #5 — Collect the withdrawal-right waiver at checkout
Terms §6 relies on the customer expressly requesting immediate performance and acknowledging they lose the withdrawal right once the service is fully performed. **That acknowledgement has to be captured at Stripe checkout** — as a required checkbox — or the clause does not work.

### 🟠 #6 — Keep the Art. 30 register current
`PROCESSING-REGISTER.md` is live as of 2 Aug 2026. Update it **before** adding any new tool that touches personal data — Zoho CRM is already flagged as planned. Review every 6 months.

### 🟡 #7 — Adopt the incident response plan properly
`INCIDENT-RESPONSE-PLAN.md` exists. To be real rather than decorative: read it once end to end, bookmark https://notifications.cnil.fr, and run the §5 prevention checklist quarterly.

### 🟡 #8 — Confirm whether ICO / CNIL registration applies
Answered "no" during review, which is correct for France post-GDPR (no general CNIL registration). Worth a one-off confirmation that no sector-specific formality applies to the activity.

---

## 2. Data handling and security

### 🟠 #9 — Enable MFA everywhere and audit credentials
Provider account compromise is the most likely breach route (see incident plan §2). MFA on GitHub, Netlify, Stripe, Auth0, Railway, Resend, Calendly, Google, OpenAI, Anthropic. All credentials into a password manager, no reuse.

### 🟠 #10 — Test a backup restore
App data is backed up to an external hard drive. **An untested backup is not a backup.** Restore one and confirm it works. Note that a single external drive is also a single point of failure — an off-site or cloud copy would be a meaningful improvement.

### 🟡 #11 — Record the Auth0 session cookie names and durations
Needed to complete section 3 of the Cookie Policy. There is a `TODO` comment marking the spot in `cookies-policy.html`.

### 🟡 #12 — Record direct security contacts for each provider
So they aren't being hunted for mid-incident. Table stub in `INCIDENT-RESPONSE-PLAN.md` §4.

### 🟡 #13 — Confirm data residency for each provider
Where Railway, Auth0 and Stripe physically store data. Feeds #3 and the register.

---

## 3. Website and technical

### 🟠 #14 — Add Netlify's full registered address to the mentions légales
LCEN Art. 6 requires the host's name **and address**. Terms §1 currently names Netlify and Railway without full addresses. `TODO` comment marks the spot in `terms-of-service.html`.

### 🟠 #15 — Fix the Resources page dead end
`resources.html` links only to `article-template.html`, which is now `noindex`. The page therefore points at nothing indexable. Either publish real articles or reconsider linking it in the main nav.

### 🟠 #16 — Add `<main>` landmarks to four pages
`index.html`, `pricing.html`, `contact.html`, `case-studies.html` have no `<main>` element. AI content extractors and screen readers use it to locate primary content. The other pages already have one.

### 🟡 #17 — Wire up the consent banner when analytics is added
`cookie-consent.js` and `cookie-consent.css` are written and ready but **deliberately not loaded by any page** — the site currently sets zero cookies, so a banner would be friction for nothing. Wiring instructions are in the header comment of the JS file. Update Cookie Policy §4 at the same time.

### 🟡 #18 — Verify the free-audit cap is actually enforced
Terms §3 states a fair-use limit of three free audits per email address. Confirm the app enforces it, since it is now a published commitment.

### 🟡 #19 — Decide what `article-template.html` is for
Currently `noindex` because it carries placeholder content and a **fictional byline ("Jane Mitchell, Head of Strategy")** with a May 2024 date. It is still reachable from Resources if a human clicks through. Either replace with a real article or remove it from the Resources grid.

### 🟡 #20 — Keep `case-studies.html` dark until evidence exists
Currently `noindex` and excluded from the sitemap. It claims "real results from real businesses". Do not index it until those are real, named and permissioned.

### ⚪ #21 — Block `README.md` and `PUBLISHING.md` from public serving
`netlify.toml` publishes the repo root, so these are readable at `aeogrowthkit.com/README.md`. Low risk, untidy. `/internal/*` is already blocked as of 2 Aug 2026.

### ⚪ #22 — Add a visible "Legal notice" footer link
French practice is to link mentions légales directly from the footer. It currently lives inside Terms §1, which satisfies the requirement but is less conventional.

---

## 4. Content and growth

### 🟡 #23 — Build out Resources with real articles
The strongest AEO lever available. Every published article is another entity for the models to cite, and it fixes #15.

### 🟡 #24 — Submit the sitemap to Google Search Console
`sitemap.xml` and `robots.txt` were created on 2 Aug 2026 but not submitted. Also connect Bing Webmaster Tools.

### 🟡 #25 — Run the Rich Results Test after deployment
Validate the JSON-LD against Google's own requirements, which are stricter than schema.org. https://search.google.com/test/rich-results

### ⚪ #26 — Re-run the SEO/schema audit after deploy
Confirms the 12 original gaps plus the six MEDIUM items are closed, and catches anything introduced.

### ⚪ #27 — Add more internal links as content grows
FAQ went from 3 → 12 body links, which was the big win. `about.html` still has only one. Each new article is a fresh linking opportunity.

---

## 5. Completed

### 2 August 2026 — SEO and schema
- ✅ Organization, WebSite, WebPage schema on homepage (`@graph`, shared `@id`s)
- ✅ AboutPage, SoftwareApplication, Service ×3, ContactPage, FAQPage, Product ×2, CollectionPage, ItemList
- ✅ FAQPage carries all **24** real Q&A pairs, not an empty shell
- ✅ `foundingDate` 2026-03-24; `legalName`, French `PostalAddress`, SIRET on Organization
- ✅ BreadcrumbList on 13 pages, merged into existing graphs
- ✅ `llms.txt`, `robots.txt` (AI crawlers explicitly allowed), `sitemap.xml` (14 URLs)
- ✅ Meta descriptions on 4 pages; canonical added to `article-template.html`
- ✅ **Fixed 4 canonicals pointing at 404s** — `/product/build`, `/privacy`, `/terms`, `/cookies` (audit missed this)
- ✅ 9 contextual internal links; `lang=en-GB` normalised across all pages
- ✅ Corrected the audit's bad suggestions: nonexistent `logo.png`, GBP instead of USD, a `SearchAction` for a search feature that doesn't exist, iOS/Android for a browser-only tool

### 2 August 2026 — Legal
- ✅ Privacy Policy, Terms and Cookie Policy rewritten; **all user-visible placeholders removed**
- ✅ Reframed from UK GDPR/ICO to **EU GDPR/CNIL**; consent age corrected 16 → 15; 10-year accounting retention; French post-mortem data directives
- ✅ CCPA section removed — thresholds don't apply to an auto-entrepreneur
- ✅ Untrue security claims deleted (pen testing, audits, employee NDAs); replaced with an honest statement including what is *not* done
- ✅ Output ownership (Terms §7) and AI-output disclaimer (§8) added — the biggest commercial gap
- ✅ Commercial-use contradiction in old Terms §2 resolved; mentions légales added
- ✅ Incident response plan and Art. 30 register written

### 2 August 2026 — Privacy engineering
- ✅ **Google Fonts self-hosted** — 18 woff2 files across all 17 pages, removing third-party IP transfer
- ✅ Newsletter forms: 17 pages moved off the colliding `form-name="contact"` to `newsletter`, with a consent notice and privacy link
- ✅ `case-studies.html` and `article-template.html` set to `noindex`
- ✅ Consent banner built and documented, dormant by design
- ✅ `/internal/*` blocked from public serving
