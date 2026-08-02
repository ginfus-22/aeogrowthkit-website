# Personal Data Incident Response Plan

**Controller:** Steve Gillson, auto-entrepreneur (trading as AEO Growth Kit / edtech growthkit)
**Address:** 4 rue Toulouse Lautrec, 17138 Saint-Xandre, France — SIRET 91149164500022
**Supervisory authority:** CNIL (France)
**Version:** 1.0 — 2 August 2026
**Review:** annually, or after any incident

> Internal document. Not published to the website.

---

## 0. Why this exists

GDPR Art. 33 gives you **72 hours** from becoming aware of a personal data breach to notify the CNIL, unless the breach is unlikely to result in a risk to people. Art. 34 requires telling affected individuals directly where the risk to them is high.

72 hours is not long to invent a process. This plan is deliberately sized for a one-person business: no committees, no escalation tiers, just the sequence that has to happen and the facts you'll be asked for.

**The clock starts at "aware", not at "certain".** A credible report that something has gone wrong starts it. You do not get to pause it while you investigate — you notify on what you know and supplement later, which Art. 33(4) explicitly permits.

---

## 1. What counts as a breach

Any accidental or unlawful **destruction, loss, alteration, unauthorised disclosure of, or access to** personal data. All three of these count:

| Type | Meaning | Example here |
|---|---|---|
| Confidentiality | Someone saw data who shouldn't | Netlify form submissions exposed; email sent to wrong recipient |
| Integrity | Data altered without authorisation | Customer records tampered with |
| Availability | Data lost or inaccessible | Backup drive fails and app data is unrecoverable |

**Availability breaches are the one people forget.** Losing data permanently is a breach even if nobody else ever saw it.

Not a breach: a bug with no personal data involved; a blocked attack that did not succeed; publishing something you meant to publish.

---

## 2. Realistic scenarios for this business

Ranked by likelihood given the current stack:

1. **Provider account compromise** — your Auth0, Stripe, Netlify, Resend, Railway or Zoho login is phished or credential-stuffed. *Most likely route by a wide margin.*
2. **Provider-side breach** — one of them is breached and notifies you as their customer.
3. **Misdirected email** — a customer's audit or personal data sent to the wrong address via Resend.
4. **Accidental exposure** — a secret, export or dataset committed to the public GitHub repo.
5. **Backup loss** — the external hard drive holding app data fails or is stolen.
6. **Prompt/content leakage** — customer material sent to an AI provider under terms permitting training. *Currently a live risk on Gemini's free tier — see ROADMAP #4.*

---

## 3. The response sequence

### Step 1 — Contain (immediately, before anything else)

- Rotate the credentials for any affected account; enable or re-issue MFA.
- Revoke active sessions and API keys for the affected service.
- If GitHub: **rotate the secret first, then purge history.** Deleting the commit does not un-leak the key; assume anything pushed publicly is already harvested.
- If a provider breach: follow their guidance, but rotate your own keys regardless.
- Take the service offline only if leaving it up continues the exposure.

### Step 2 — Record (start the log immediately)

Open a file at `internal/incidents/YYYY-MM-DD-short-name.md` and start writing as you go. Reconstructing this later is much harder and Art. 33(5) requires you to document **every** breach, including ones you decide not to notify.

Capture:
- When and how you became aware (**this timestamp starts the 72 hours**)
- What happened, and the likely cause
- Which categories of personal data and roughly how many people
- Which systems and providers are involved
- What you have done so far
- Whether the data was encrypted or otherwise unintelligible

### Step 3 — Assess the risk

Ask: what could realistically happen to the **individuals** as a result?

| Risk level | Indicators | Action |
|---|---|---|
| **Unlikely to be a risk** | Data was encrypted and keys are safe; only your own business data; no personal data involved | Log it. No notification. |
| **Risk** | Names, emails, business names exposed; limited scope; no financial or credential data | **Notify CNIL within 72h** |
| **High risk** | Credentials, payment data, or large-scale exposure; data usable for fraud, phishing or identity theft | **Notify CNIL within 72h AND tell affected individuals without undue delay** |

Bias towards notifying when genuinely uncertain. Under-notifying is treated far more harshly than over-notifying.

### Step 4 — Notify the CNIL (if required)

Online: **https://notifications.cnil.fr** — CNIL's dedicated breach notification service.

Have ready (Art. 33(3)):
- Nature of the breach, categories and approximate number of data subjects and records
- Your name and contact details as controller (section header above)
- Likely consequences
- Measures taken or proposed, including mitigation

If you cannot supply everything within 72 hours, **submit anyway** with what you have and mark it for supplement. Late-and-complete is worse than on-time-and-partial.

If you miss 72 hours, still notify — and include the reason for the delay, which Art. 33(1) requires.

### Step 5 — Notify affected individuals (high risk only)

Email them directly, in plain language (Art. 34):
- What happened and when
- What data of theirs was involved
- What you have done about it
- **What they should do** — change a reused password, watch for phishing referencing AEO Growth Kit
- A named contact: steve@aeogrowthkit.com

No jargon, no minimising, no burying it in a newsletter. If direct contact is disproportionate, a public notice on the site is the fallback.

### Step 6 — Review

Within two weeks: what allowed this, what changes, and does this plan need updating? Record it in the incident file and close it.

---

## 4. Contacts

| Who | Where | For |
|---|---|---|
| CNIL notification | notifications.cnil.fr | Breach notification |
| CNIL general | 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — cnil.fr | Guidance |
| Auth0 / Okta | support via dashboard | Identity, sessions |
| Stripe | dashboard → support | Payments |
| Netlify | netlify.com/support | Site, form submissions |
| Railway | railway.app | App hosting |
| Resend | resend.com | Email |
| Calendly | calendly.com/support | Bookings |

*(ROADMAP #12: record direct security-contact emails for each, so you're not hunting for them mid-incident.)*

---

## 5. Prevention checklist

Quarterly, ~20 minutes:

- [ ] MFA enabled on every provider account, and on GitHub
- [ ] No shared or reused passwords; all in a password manager
- [ ] API keys rotated at least annually, and immediately on any suspicion
- [ ] No secrets in the Git repo — scan history, not just the working tree
- [ ] Backups verified by **actually restoring one**, not just confirming it ran
- [ ] Provider access reviewed; anything unused revoked
- [ ] This plan re-read, and the contact table still accurate

---

## 6. Incident log

| Date | Summary | Personal data? | CNIL notified | Individuals notified | Closed |
|---|---|---|---|---|---|
| — | No incidents recorded | — | — | — | — |
