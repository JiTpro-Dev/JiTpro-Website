# Contact / conversion and metadata defects

Recorded 2026-08-25 from the homepage buyer-journey audit, on branch
`feature/homepage-buyer-journey`.

**These are deliberately OUT OF SCOPE for the homepage architecture rebuild.**
They are recorded here so they are not lost, and are to be addressed as a
separate controlled pass after the rebuilt homepage is approved. Nothing in this
document authorizes a change; it is a tracking record.

Every item below was verified against the working tree at `5ff4505`. Where the
original audit finding was imprecise, the correction is stated.

---

## A. Conversion funnel

### A1 — `ThankYou.tsx` ships a placeholder scheduler URL

**Status: CONFIRMED — and broader than first reported.**

`src/pages/ThankYou.tsx:4-5`

```ts
// TODO: Replace with actual Microsoft Bookings URL
const SCHEDULER_URL = 'https://outlook.office365.com/book/PLACEHOLDER';
```

The audit reported this as affecting visitors who request a call. It affects
**every** visitor who converts. The component renders the placeholder in both
branches: as a primary amber "Schedule a Call" button when `scheduleCall === 'yes'`
(`:26-35`), and as an "Or schedule a call" text link otherwise (`:48-58`).

This is the only forward action offered after submission, and it is dead.
**Highest-severity item in this document.**

### A2 — The contact destination breaks continuity with the homepage

**Status: CONFIRMED.**

`src/pages/contact/ContractorContact.tsx:93` — the H1 is **"Let's Talk Procurement"**.

"Procurement" is a word retired from the homepage by the 2026-08-04 simplified
rebuild (`src/archive/homepage/README.md`, "Language the rebuild retired"), and
it appears zero times in live homepage copy. The first word a visitor reads
after clicking a homepage CTA is therefore a word the homepage was deliberately
built to avoid.

Note this is a *continuity* defect, not necessarily a copy defect: the ban is
scoped to the homepage, and the contact page is not governed by it. The question
is whether the funnel should read as one voice.

### A3 — Perceived friction exceeds the actual minimum

**Status: CONFIRMED.**

Actual minimum to submit: **three fields** — `firstName`, `lastName`, `email`
(`ContractorContact.tsx:199,203,208`) — plus a Cloudflare Turnstile challenge.

What the visitor sees: **four titled sections** ("Project Information", "Your
Information", "Message", "Next Step") containing **thirteen inputs**. Nothing
indicates which are optional.

### A4 — The submit control uses generic language

**Status: CONFIRMED.**

`ContractorContact.tsx:266` — the button reads **"Submit"**.

It is also `disabled` until Turnstile resolves (`:263`) with no adjacent
explanation, so a visitor who has completed the form can face an inert grey
button and no stated reason.

### A5 — The post-submission experience does not explain what happens next

**Status: CONFIRMED.**

`ThankYou.tsx:19-20` is the entire forward promise:

> We've received your message and will review your information.

No response time, no named next step, no privacy or data-use statement, no
indication of who will make contact.

### A6 — The contact experience does not preserve the homepage timing trigger

**Status: PARTIALLY CONFIRMED — the audit overstated this.**

The form *does* carry a timing cue, at `ContractorContact.tsx:119`:

> Do you have an upcoming project where procurement planning will be important?

But it appears as a **qualifying question asked of the visitor**, not as
reassurance that they have arrived at the right moment. `ThankYou.tsx` carries no
timing continuity at all.

The defect is therefore one of *stance*, not absence: the funnel asks the visitor
to prove their timing rather than confirming it.

### A7 — The form qualifies the buyer before the conversation is earned

**Status: CONFIRMED.**

"Project Information" is the **first** section, ahead of "Your Information"
(`:113` precedes `:192`). It collects project location, project type, the
visitor's role, **Typical Project Size** (`:164-172`) and **Procurement Planning
Method** (`:175`).

The largest available project-size band is **"$25M+"** (`:170`), so a larger firm
receives its first signal about fit *after* the click, never before it.

---

## B. Metadata and social

All four verified in `index.html`, which contains a `<title>`, a favicon link,
a viewport tag, and nothing else.

### B1 — No meta description
**Status: CONFIRMED.** Absent.

### B2 — No Open Graph metadata
**Status: CONFIRMED.** No `og:title`, `og:description`, `og:image`, `og:url`.

### B3 — No social-sharing metadata
**Status: CONFIRMED.** No `twitter:card` or related tags.

Consequence: a link shared into LinkedIn — the funnel the site relies on —
renders as a bare URL with no description and no image, so the page must
generate one hundred percent of its own context after the click.

### B4 — The page title no longer matches the positioning strategy

**Status: CONFIRMED.**

```html
<title>JiTpro - Procurement Control for Complex Construction</title>
```

Two issues. It leads with **"Procurement"**, retired from the homepage (see A2).
And it states neither of the two things the buyer-journey rebuild is built to
establish: that JiTpro is a **consultancy-first program**, and that it is for
**growth-stage general contractors**.

`index.html` also carries a stray `<!-- trigger deploy -->` comment on line 1.

---

## C. Sequencing note

A1 and B1–B3 are self-contained and carry no dependency on the homepage rebuild.

A2, A6 and B4 are **downstream of the rebuild's positioning decisions** and should
not be settled until the new homepage copy is approved — otherwise the funnel
would be rewritten twice.

A3, A4, A5 and A7 are conversion-design questions that are best taken together as
one pass over the contact experience rather than piecemeal.

---

## D. Related findings, recorded but not part of this pass

- **`/how-it-works` runs a different five-phase methodology** than the homepage
  (Assess the Project → Build the Procurement Plan → Assign Accountability →
  Monitor Procurement → Recover Before Margin Is Lost). Whichever methodology
  the rebuilt homepage adopts, the other becomes a visible contradiction one nav
  click away. Tracked as a content-architecture item, not a conversion item.
- **ICP revenue band drift**: recorded as `$5M–$50M` in
  `docs/website-icp-messaging-review-2026-06-30.md:5` and as `$5M–$150M` in
  `src/content/faqData.ts:36`. Flagged in that review; not reconciled.
