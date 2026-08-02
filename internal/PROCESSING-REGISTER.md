# Register of Processing Activities (GDPR Art. 30)

**Controller:** Steve Gillson, auto-entrepreneur (trading as AEO Growth Kit / edtech growthkit)
**Address:** 4 rue Toulouse Lautrec, 17138 Saint-Xandre, France — SIRET 91149164500022
**Contact:** steve@aeogrowthkit.com
**DPO:** none appointed (not required — no large-scale or special-category processing)
**Version:** 1.0 — 2 August 2026
**Review:** every 6 months, and whenever a new tool or data flow is added

> Internal document. Not published. Must be produced to the CNIL on request.

---

## Why this is required

Art. 30(5) exempts organisations under 250 employees **unless** the processing is likely to result in a risk to rights and freedoms, **is not occasional**, or involves special categories.

Customer accounts, a marketing list and payment records are **regular, ongoing processing** — not occasional. The exemption does not apply. This register is the obligation being met.

---

## Summary

| # | Activity | Legal basis | Retention |
|---|---|---|---|
| A1 | Website enquiries | Legitimate interests | 24 months after last contact |
| A2 | Call bookings | Legitimate interests / pre-contract | 24 months after last contact |
| A3 | Update emails | Consent | Until withdrawn, then 24 months |
| A4 | Customer accounts & service delivery | Contract | Subscription + 24 months |
| A5 | Billing & accounting | Contract + legal obligation | 10 years (Code de commerce L123-22) |
| A6 | AI audit processing | Contract | Not retained by us beyond the report |
| A7 | Technical logs & security | Legitimate interests | Up to 12 months |

---

## A1 — Website enquiries

- **Purpose:** Receiving and responding to contact form messages.
- **Legal basis:** Legitimate interests (Art. 6(1)(f)) — responding to someone who contacted us.
- **Data subjects:** Prospective customers, general enquirers.
- **Data categories:** Name, email address, business name, message content.
- **Recipients / processors:** Netlify (form handling and storage), Resend (reply emails).
- **Transfers outside EEA:** Yes — US. See "Transfers" below.
- **Retention:** 24 months after last contact.
- **Security:** HTTPS in transit; access limited to the controller; provider-side platform security; honeypot spam field on the form.

## A2 — Call bookings

- **Purpose:** Scheduling and holding intro calls.
- **Legal basis:** Legitimate interests, or steps prior to entering a contract (Art. 6(1)(b)).
- **Data subjects:** Prospective customers.
- **Data categories:** Name, email address, meeting date/time, any notes the person adds.
- **Recipients / processors:** Calendly.
- **Transfers outside EEA:** Yes — US.
- **Retention:** 24 months after last contact.
- **Security:** Provider-side; account protected by password manager credentials.

## A3 — Update emails

- **Purpose:** Sending occasional updates about AEO Growth Kit to people who asked for them.
- **Legal basis:** Consent (Art. 6(1)(a)), given by submitting the footer subscribe form, which carries an explicit notice and a link to the Privacy Policy.
- **Data subjects:** Subscribers.
- **Data categories:** Email address; date and source of consent.
- **Recipients / processors:** Netlify (capture), Resend (sending).
- **Transfers outside EEA:** Yes — US.
- **Retention:** Until consent is withdrawn, then 24 months. Unsubscribe link in every email.
- **Security:** As A1.
- **Note:** Consent evidence is the form submission record. Keep it — it is the only proof of lawful basis.

## A4 — Customer accounts and service delivery

- **Purpose:** Providing the audit, AI Mirror Test and Voiceprint™ content engine to paying customers.
- **Legal basis:** Performance of a contract (Art. 6(1)(b)).
- **Data subjects:** Customers and their authorised users.
- **Data categories:** Name, email, business name, account identifiers, the website address submitted for audit, service usage records. **Passwords are held by Auth0 and never seen by us.**
- **Recipients / processors:** Auth0 (identity), Railway (application hosting).
- **Transfers outside EEA:** Yes — US.
- **Retention:** For the life of the subscription, then 24 months.
- **Security:** HTTPS; authentication via Auth0; access limited to the controller.

## A5 — Billing and accounting

- **Purpose:** Taking subscription payments and keeping statutory accounting records.
- **Legal basis:** Contract (Art. 6(1)(b)) and legal obligation (Art. 6(1)(c)).
- **Data subjects:** Paying customers.
- **Data categories:** Name, email, billing address, subscription and transaction records. **Full card numbers are never received or stored by us** — Stripe holds them.
- **Recipients / processors:** Stripe.
- **Transfers outside EEA:** Yes — US.
- **Retention:** 10 years, per French Commercial Code Art. L123-22. This overrides deletion requests for accounting records.
- **Security:** Stripe PCI-DSS compliant; no card data in our systems.

## A6 — AI audit processing

- **Purpose:** Testing how AI answer engines describe and recommend a customer's business.
- **Legal basis:** Performance of a contract (Art. 6(1)(b)).
- **Data subjects:** Customers — *indirectly*. What is submitted is **publicly available website content, brand names and test questions**, not account or contact data.
- **Data categories:** Public web content and brand identifiers. Personal data only insofar as a customer's public site already contains it (e.g. a founder's name on their own About page).
- **Recipients / processors:** OpenAI, Anthropic, Perplexity, Google — via their APIs.
- **Transfers outside EEA:** Yes — US.
- **Retention:** We retain the resulting report; the submitted prompts are not separately stored by us. Provider-side retention is governed by their API terms.
- **Security:** API keys held in environment configuration, not in source control.
- ⚠️ **Open risk:** provider plan tiers must exclude submitted content from model training. Google's free Gemini tier does **not**. See ROADMAP #4.

## A7 — Technical logs and security

- **Purpose:** Keeping the site and application working and secure; diagnosing faults; preventing abuse.
- **Legal basis:** Legitimate interests (Art. 6(1)(f)).
- **Data subjects:** All visitors and users.
- **Data categories:** IP address, browser type, timestamps, request paths.
- **Recipients / processors:** Netlify, Railway.
- **Transfers outside EEA:** Yes — US.
- **Retention:** Up to 12 months.
- **Security:** Provider-side; logs not routinely reviewed or combined with other data.

---

## Transfers outside the EEA

All processors listed are US-based or US-headquartered. Each transfer must rest on either:

- the European Commission's **adequacy decision for the EU–US Data Privacy Framework**, where the provider is certified; or
- **Standard Contractual Clauses**, where it is not.

**Status: unverified.** Confirming the mechanism per provider is ROADMAP #3. Until then, this register records the transfers as occurring but the safeguard as unconfirmed — which is the honest position and better than an unevidenced claim of compliance.

## Processor agreements (Art. 28)

A written contract is **mandatory** with every processor listed above.

**Status: none in place.** This is the most material open item — see ROADMAP #2. Most providers incorporate a DPA into their standard terms or offer one to accept in-dashboard.

| Processor | DPA in place | Where to get it |
|---|---|---|
| Netlify | ☐ | Dashboard → Team settings |
| Railway | ☐ | Legal terms / support |
| Auth0 (Okta) | ☐ | Okta agreements portal |
| Stripe | ☐ | Incorporated in Stripe Services Agreement — verify |
| Resend | ☐ | resend.com/legal |
| Calendly | ☐ | Dashboard → Legal |
| OpenAI | ☐ | platform.openai.com → policies |
| Anthropic | ☐ | console.anthropic.com → policies |
| Perplexity | ☐ | API terms |
| Google (Gemini) | ☐ | Cloud/AI Studio terms |
| Zoho CRM *(planned)* | ☐ | Before any data is migrated |

## Special categories

None processed. No health, biometric, political, religious or trade-union data is collected, and the Privacy Policy asks people not to send it.

## Automated decision-making

None producing legal or similarly significant effects (Art. 22). Audit results are information for the customer to act on, not decisions taken about an individual.
