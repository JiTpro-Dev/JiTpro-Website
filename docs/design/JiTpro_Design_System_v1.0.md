# JiTpro Design System v1.0

Status: Framework (Sections 1-44) + approved implementation standards (Part II, Sections 45-49)
Owner: Jeff Kaufman
Last updated: 2026-08-06
Applies to: Marketing Website, SaaS Application, Internal Dashboard, Printed Reports, Documentation

This document is the structure for the official JiTpro Design System. It is not the finished visual design. It defines where each design decision must live, what must be specified before implementation, and how future designers/developers/AI agents must use the system.

Important constraints for this version:
- Do not treat TODO placeholders as approved design decisions.
- Do not infer missing values from the current website without explicit approval.
- Do not choose fonts, colors, spacing, radii, shadows, or component variants from this framework alone.
- Do not implement UI by subjective judgment when a section below says TODO.
- The current design audit lives at `docs/design/current-design-audit.md` and should be used as evidence, not authority.

Normative language:
- MUST = required once the relevant decision is approved.
- SHOULD = preferred but may need context-specific judgment.
- MAY = optional.
- TODO = pending decision; do not invent.
- APPROVED = decided, in force, and binding on production code. An APPROVED rule overrides any conflicting TODO, audit finding, or existing implementation.

Document structure:
- Sections 1-44 define design philosophy and capture where each decision must live. They are preserved unchanged.
- Part II (Sections 45-49) defines the approved implementation standards derived from production work on the marketing website. Where Part II speaks, it is binding.
- A TODO that Part II has since answered is superseded by Part II. The original TODO text is retained for history, not as an open question.
- This document is now the single source of truth for colors, design tokens, typography, spacing, animation, visual hierarchy, component styling, interaction states, and accessibility expectations. Implementation conforms to this document; this document does not describe implementation after the fact.

---

## Decision Log

Purpose: Track every approved design-system decision so future UI work can cite authority rather than taste.

Decisions that belong here:
- Date of decision
- Decision owner/approver
- Scope affected
- Superseded rule, if any
- Link to supporting rationale, audit, mockup, or issue

Implementation notes:
- Add newest entries at the top.
- Every non-trivial token/component rule added later should have a corresponding log entry.

TODO:
- TODO: Add initial approver and governance process.
- TODO: Add first approved design-token decisions.

| Date | Decision | Scope | Owner | Source/Rationale |
| --- | --- | --- | --- | --- |
| 2026-08-25 | **Homepage messaging standards approved (new Section 20.1)**, in three parts. (a) The 2026-08-04 retired-language record is formalized and scoped: the retired words "procurement" and "margin" may not appear in homepage copy, **but the mechanism they name must be taught** in operational construction language — retiring a word is not permission to describe the work vaguely. Brand Voice's teach-then-name sequence is homepage-exempt and unchanged elsewhere. (b) The homepage's account of purpose is expressed as an **operating requirement and the controls built around it**, never a guaranteed outcome: the correct product, approved for installation, available when the field is ready, with everything upstream planned and managed backward from that point. Delivery guarantees, quality/conformance warranties, claims to replace PM or design-team conformance responsibility, claims to control supplier execution, and absolute pairs of the "not late, not wrong" form are prohibited. (c) The homepage audience is stated **qualitatively only** — no revenue band, employee count, or project-value band — with recognition carried by symptoms rather than a management diagnosis, and the target contractor never portrayed as dysfunctional. Supersedes Section 20's founder-section and proof-section TODOs by reference to Sections 17.2 and 48.10. | Marketing website | Jeff Kaufman | Sections 20.1, 1, 2, 47.1, Brand Voice. (a) The ban existed with no owner, date, or entry, and was in unresolved tension with Brand Voice; scoping it to the word resolves both. (b) "Not late. Not wrong." reads as an outcome guarantee, and `src/content/faqData.ts:130-133` — live, one nav click from the homepage — answers "Does JiTpro guarantee that everything will arrive when desired?" with a flat **"No."** A homepage claim the company's own FAQ contradicts is worse than a weaker claim. Section 1 already holds the line: JiTpro creates visibility, not optimism. (c) No approved ICP number exists in this system; five live surfaces carry five different figures, so any band published now would contradict a sibling page. |
| 2026-08-25 | **Figure provenance approved as a new Section 48.10.** Every element of a figure carrying numbers, names, or dates is exactly one of three statuses — **Representative** (constructed to reflect realistic conditions; not from any actual engagement), **Illustrative** (added to demonstrate the method, no basis in the dataset), or **Methodological** (pure diagram, no data) — and the distinction must survive into the rendered page. Prohibited without exception: presenting representative or illustrative content as a customer result or actual project record; describing a synthetic dataset as real or as anonymized real; fabricating a count of anything the dataset does not contain; and rendering a derived value in a register implying precision the source does not carry. Required: one quiet provenance sentence in the caption register (never a disclaimer block or multi-key legend); weaker-provenance elements drawn *lighter* than data-derived ones; derived quantities expressed in the unit the source actually carries; and **at most one kind of absolute date per figure**, every other temporal value typeset as a duration or offset. First approved use: the homepage methodology figure. | All products | Jeff Kaufman | Sections 48.10, 48.8, 47.4. A figure is read as a claim about the world, and a figure whose status is unstated is read as the strongest status it could plausibly have. `src/content/procurementScheduleSnapshot.json` is **synthetic** — constructed to represent realistic sequencing and durations, not a client schedule — and confirmed to contain no scope gaps, no owners, and no responsible parties (verified: step keys are exactly `days`, `name`, `color`, `milestone`; all 42 rows `status: "draft"`). The register rule exists because the instinct is to emphasize whatever is currently being narrated, which is exactly backwards when the narrated element is the one with the weaker provenance. The one-absolute-date rule exists because a required onsite date and a backward-planned offset are different kinds of quantity, and blurring them misstates the method. |
| 2026-08-25 | **Founder presence approved as a new Section 17.2, explicitly REVERSING the 2026-08-04 homepage decision** that removed the founder section (recorded in `src/archive/homepage/README.md`). Founder presence is a credibility instrument answering one question — did the people who built this method actually do this work — and is finished once that question is answered. Required: the section is about the work and the experience, its heading names the work not the man, credibility comes from specific recognizable construction experience rather than credentials, and exactly one quiet path leads to the deeper story. Prohibited: an oversized founder card, a hero-scale portrait, a résumé or credential list, any career-volume figure, a display-scale first-person pull quote, and any treatment making the founder rather than the reader's project the subject of the page. Portraiture is restrained, late in the section, frameless and token-only. First approved use: the homepage trust section. | Marketing website | Jeff Kaufman | Sections 17.2, 17.1, 48.1, 47.1. The 2026-08-04 removal was right about what it removed — a founder-centric section competing with the contractor's own story — and wrong as a general rule, because it left the site with no owner for the trust question at all. The buyer-journey audit found Trust served by a single objection-handler in the last section of nine, while the strongest credibility writing on the public site sits unlinked on `/about`. The reversal is deliberately narrow: the constraints above are the decision, not the permission. |
| 2026-08-25 | **Section 48.8's crane prohibition NARROWED, and a terminal field band approved in Section 17.1.** What is prohibited is the cliché — a crane or any construction machine used as generic shorthand for "construction". A crane MAY appear in approved documentary photography when it is performing the specific work the section argues about and the section would be weaker without it; each such use is approved individually. Separately, a photograph MAY close a section as a **full-container terminal band** rather than an environmental composition beside the copy, provided the section has already made its argument in words and the band carries one short line naming what the reader is looking at. The band is a terminal beat, never a transition, and MUST NOT be a standalone section. First approved use: the structural-steel field condition closing the homepage methodology section. | Marketing website | Jeff Kaufman | Sections 48.8, 17.1, 47.4. The prohibition as written banned the machine rather than the cliché, which would exclude authentic documentary photography of the exact field condition a section is arguing about — and the homepage shipped such a photograph in commit `5ff4505` with no entry covering it, so the rule needed resolving either way. The band rule exists because the same photograph placed *between* two arguments is a palate cleanser and placed *at the end of one* is evidence; the wordless-section form was the defect, not the full-bleed presentation. |
| 2026-08-25 | **Section 46.9 retains APPROVED status with no current production use.** The homepage five-stage methodology — its only approved use — moves to the Section 46.8 stage selector with a Section 46.8.1 accumulating visual. Section 46.9 is **neither superseded nor retired**; the 2026-08-20 "first approved use" designation is released, and a future use requires a fresh entry naming it. Non-conforming as a result: `src/components/home/ReactiveProjectsSection.tsx` in its entirety — the 400vh region, the `useScroll` subscription and the pinned architecture are removed rather than migrated. | Marketing website | Jeff Kaufman | Sections 46.9, 46.8, 46.8.1, 49.1. The 2026-08-20 entry judged the methodology to be a narrative the visitor moves through, and was right about the accordion it rejected. It is reversed here on different grounds: that section's buyer-journey job is establishing competence, and competence is read from the relationship *between* the stages — a presentation that shows exactly one stage at a time by design forecloses the comparison it depends on. The pattern was not the defect; its content was. Retiring a pattern because one surface stopped using it would document a surface decision as a system decision. |
| 2026-08-25 | **Section 46.8 amended in three places for the divided content stage.** (a) **Hover no longer commits** where a selector drives a substantial content stage: click, tap and keyboard activation commit; hover and keyboard focus indicate availability only, using the inactive approach treatment and never the active amber enclosure. Hover-to-commit remains the default for selectors driving only a short copy swap, and a selector must apply one behaviour to all of its own stages. (b) **A rail MAY be laid out on either axis**, provided every stage number and title stays visible at every width — the axis is a composition decision, the visibility rule is not. (c) **The content area MAY be divided** into a copy column and a persistent visual column beside the rail; in the divided form both columns MUST reserve a height independent of the active index. New **Section 46.8.1** governs the visual column: one accumulating visual system rather than swapped illustrations, elements introduced at one stage persisting at every later stage, no second interaction, legible without motion, and a distinct compact composition rather than a scaled one. | Marketing website | Jeff Kaufman | Sections 46.8, 46.8.1, 46.3, 46.5, 35.1, 48.3. The hover rule was written for a three-stage rail above a short copy area, where an accidental change cost the reader one line. On a five-stage rail driving an accumulating figure, crossing the rail on the way elsewhere re-narrates the argument, and focus-to-commit destroys a keyboard reader's place mid-traversal. The divided stage and the accumulating visual are what convert five sentences that *assert* thoroughness into one object that *shows* what thoroughness produces — which is the difference between a method a reader is told about and one they watch happen. |
| 2026-08-20 | Section 46.9 REVISED from Scroll-Driven Process Accordion to **Scroll-Driven Sequential Process Reveal (process scrollytelling)**: one stage presented at a time inside the pinned presentation; continuous section-relative scroll progress is the single source of truth, driving enter → generous hold → exit choreography per stage and reversing naturally on upward scroll; the all-titles-visible rail and accordion button semantics (`aria-expanded`/`aria-controls`) are removed as misdescribing a narrative presentation. Stable outer geometry, no timers/autoplay, copy always in the document in reading order, Section 46.4 restraint, and the normal-flow narrow-viewport and reduced-motion fallbacks all carry over. Section 46.8 is unchanged. First approved use: the homepage five-step JiTpro process. | Marketing website | Jeff Kaufman | Section 46.9. The accordion presented the methodology as a menu of five visible rows; the methodology is a narrative the visitor moves through, and presenting one stage at a time with the reveal physically connected to scrolling makes the progression the experience rather than an interaction to discover. Continuous scroll-linked animation also removes the discrete threshold switching that made the accordion feel jerky. |
| 2026-08-20 | ~~Scroll-Driven Process Accordion approved as a new interaction pattern (Section 46.9): a genuine ordered process presented as a vertically stacked accordion whose active stage is driven by section-relative scroll progress, with click, tap, and keyboard focus activating any stage immediately and simple positional resumption of scroll control afterward — no timers or autoplay of any kind. Scroll is appropriate here because the visitor is progressing through a genuine ordered JiTpro methodology, and this is not autoplay because progression is directly controlled by the reader's own scrolling. A narrow recorded exception to Section 46.8's height rule permits a PINNED accordion's internal layout to unfold as stages change, because the pinned architecture keeps the presentation spatially stable in the viewport while the process unfolds — the surrounding document flow must never jump. Section 46.8 is unchanged and continues to govern stage selectors. First approved use: the homepage five-step JiTpro process section.~~ **Presentation SUPERSEDED same day by the Scroll-Driven Sequential Process Reveal entry above.** The interaction principles recorded here — reader-controlled progression, no timers or autoplay, stable pinned geometry, copy always in the document, Section 46.8 untouched — survive under the revised Section 46.9. Retained for history. | Marketing website | Jeff Kaufman | Section 46.9. Sections 46.3, 46.4, 46.5 apply in full. |
| 2026-08-18 | Integrated-photography tonal treatment amended: the global `brightness(0.70) saturate(0.75) contrast(0.95)` filter is removed; the token-only blending overlay is the sole darkening mechanism, and the photograph displays at its full natural brightness wherever the overlay has released. | Marketing website | Jeff Kaufman | Section 17.1. Direction supplied by Jeff 2026-08-18: with a uniform filter, even the fully unmasked right side of the scene rendered dim; the darkening's purpose is blending into the page, which the overlay accomplishes alone, so the revealed photograph should be the photograph. |
| 2026-08-18 | Integrated-photography composition amended from an editorial two-column image block to an environmental composition (Section 17.1): the photograph keeps its native aspect ratio and complete scene, fills the full height of the movement it supports, and reaches left beneath the copy; the dissolve spans the movement rather than the photograph - held solid across the reading zone, releasing rightward until the scene stands clear, with the photograph's left edge fully swallowed so no seam is findable. Supersedes the same-day 55-60/40-45 two-column crop language below; the tonal treatment, token-only gradients, no-frame rule, headline subordination, stacked tablet/mobile presentation, and delivery rules are unchanged. | Marketing website | Jeff Kaufman | Section 17.1. Direction supplied by Jeff 2026-08-18 after review: the cropped right-side block read as an image card beside the copy, with dark margins above and below; the section should instead read as one composed movement, with the photograph as the environment its right side emerges from. |
| 2026-08-18 | Documentary project-team photography approved for marketing argument sections, with the integrated treatment (Section 17.1): tonal integration at approximately `brightness(0.70) saturate(0.75) contrast(0.95)` tuned per photograph with the subject remaining unmistakable; a text-facing edge dissolve built only from `--jp-background` gradient stops; no card frame, border, or radius; photograph subordinate to the headline. Desktop uses an editorial two-column composition (text 55-60%, photograph 40-45%, photograph away from the shared left edge); tablet and mobile stack the photograph after the introductory copy in a wide cinematic crop with the dissolve removed. Section 48.8's prohibition on stock and generic construction imagery is narrowed, not lifted: approved photography must show the real working mechanism the section argues, and each use is approved individually. First approved use: the project-team meeting photograph in the homepage priority-clarity section, delivered as optimized responsive WebP with an explicit aspect ratio and eager loading. | Marketing website | Jeff Kaufman | Sections 17.1, 47.3, 48.2, 48.6, 48.8, 8.9. Direction supplied by Jeff 2026-08-18: the section argues that a capable team surrounded by project information can already contain the unresolved dependency that stops the field six months out, and the photograph is the evidence that makes that argument tangible - a competent team actively reviewing a project, not chaos, not decoration. |
| 2026-08-08 | One-time guided progression approved for the homepage Stage Selector: on first entry the selector advances 01 → 02 → 03 at reading pace using the existing selection visuals, then stops permanently at 03. Finite progression is approved for this use; looping and perpetual autoplay remain prohibited. Any deliberate interaction — hover, focus, click, or tap — cancels the remaining progression for the page visit; stages never change while the section is off-screen; the progression does not run under reduced motion. | Marketing website | Jeff Kaufman | Section 46.8. The selector's three stages are the section's argument, and a first-time visitor should see the argument reveal itself without having to discover the interaction. A single finite pass at reading pace is guidance, not autoplay: it runs once, only in view, stays silent under reduced motion, and surrenders control the instant the visitor expresses intent. |
| 2026-08-08 | Stage Selector visual treatment refined to the established pill-control language: selectors are `rounded-full` pill controls — active enclosed by `--jp-brand-amber` at roughly 30% border and 10% background tint with amber text emphasis; inactive muted with the same pill footprint, brightening toward primary text with a subtle neutral wash on hover/focus. Supersedes the hairline-band expression within Section 46.8. The Stage Selector's behavior — one active index, hover/focus/click/tap equivalence, no auto-advance, copy always in the document, stable section height — is unchanged. | Marketing website | Jeff Kaufman | Section 46.8. At rest, the hairline treatment read as three content columns rather than an interactive control, so interactivity was not obvious before the visitor moved the mouse. The FAQ category selector already established a recognizable selector-control language — muted at rest, brightening on approach, lighting amber when selected — and one selector language site-wide is worth more than two (Section 48 preamble). The FAQ's own literal color classes remain legacy non-conforming code (Section 49.4); the Stage Selector expresses the same treatment in approved tokens. |
| 2026-08-08 | Stage selector approved, superseding the sequence carousel for the homepage small miss → constraint → field impact progression. All three numbered stage titles stay visible as a rail of real controls above a single content area; one active index drives the presentation; hover, focus, click, and tap resolve to the same index; no auto-advance or auto-cycling; all stage copy stays in the document at all times; switching stages never changes section height; keyboard focus stays visible and unclipped; touch never depends on hover; selectors stack where a horizontal rail would cramp; reduced motion resolves selection instantly. | Marketing website | Jeff Kaufman | Section 46.8. The carousel was visually polished once discovered, but its affordance was too subtle: cropped neighbours and small chevrons asked the reader to discover the interaction rather than stating it. The selector rail makes the three explorable stages explicit — three visible titles, one active — and the architecture is simpler and more maintainable: the track-width/offset geometry, responsive peek tables, and breakpoint geometry listeners are removed outright. |
| 2026-08-08 | Centered CTA supporting copy approved as a narrow exception: short supporting body copy MAY be centered when it belongs to a deliberately centered call-to-action composition and directly supports the CTA heading and action - at most four rendered lines at the intended desktop composition, measure no more than roughly 52ch, never for ordinary explanatory sections or long-form copy, used sparingly. Ordinary body copy site-wide remains left-aligned. First approved use: the homepage final CTA, centered at `sm:` and above; the mobile presentation stays left-aligned. | Marketing website | Jeff Kaufman | Sections 7.7 and 48.6. The page's decision point had the weakest composition on the page - a narrow left column pressed against the widest empty space. Centering the close resolves the page on its own axis, and its supporting paragraph must be able to follow the composition it belongs to. Recorded separately from the centered-editorial-statement exception so neither quietly broadens the other. |
| 2026-08-08 | Centered editorial statement approved as a narrow page-level composition exception: a single short, heading-behaving statement MAY be set centered in its own full-width section as a deliberate pause or transition between arguments - constrained measure, no eyebrow, no supporting body copy, no controls, no graphic, used sparingly (at most one or two per page). Ordinary sections and body copy remain left-aligned on the shared left edge; NO centered-body-copy allowance is created. First approved use: the homepage thesis statement between the urgency and product sections. | Marketing website | Jeff Kaufman | Sections 7.7 and 48.6. The page's central claim was set as an ordinary closing paragraph inside a section, giving the thesis less visual presence than any section heading. Setting it alone and centered marks the page's turn from problem to answer; the exception is kept narrow because the interruption only carries meaning while the shared-left-edge discipline it interrupts remains the rule. |
| 2026-08-07 | `--jp-success` refined from `#10B981` to **`#059669`**. Visual refinement only — the semantic definition, the approved uses, and the prohibitions in Section 8.3.1 are all unchanged, and the token's use is not broadened. | All products | Jeff Kaufman | Section 8.3.1. `#10B981` read as electric against `--jp-background` and competed with the amber system for attention, which is the opposite of what a completed state should do: finished work should settle, not announce itself. `#059669` is more restrained and still unmistakably green. Contrast moves from roughly 8:1 to roughly 5.4:1, which remains clear of the WCAG AA minimum of 4.5:1 at body sizes. |
| 2026-08-07 | ~~`--jp-success` approved at `#10B981`.~~ **Value SUPERSEDED 2026-08-07 by `#059669` above.** The semantics recorded in this entry remain in force. | All products | Jeff Kaufman | Retained for history; only the hex was superseded. |
| 2026-08-07 | `--jp-success` approved as a semantic **state** color meaning confirmed successful completion. Restricted to completed milestones, completed timeline structure, and confirmed successful outcomes. NOT a second accent: prohibited on CTAs, headings, hover states, navigation, and any decorative or merely "positive-looking" use. First approved implementation is the marketing hero timeline's forward pass. The travelling marker remains `--jp-brand-amber-active` and the upper planning indicator remains `--jp-brand-amber`; neither turns green. | All products | Jeff Kaufman | Sections 8.3.1 and 8.8. Section 8.3 already reserved green for "successfully resolved, completed, or verified" states and forbade it as a branding or general accent color; this names the value and enforces the restriction. `#10B981` measures roughly 8:1 against `--jp-background`, clearly separable from both the neutral text ramp and the amber system, without the fluorescence of a lime or traffic-light green. Reconciles with the Section 8.1 exclusion list, which governs **brand identity** colors rather than semantic state — see 8.3.1. |
| 2026-08-07 | ~~Sequence carousel approved for ordered sets that carry a progression. Initializes only on section intersection, once, never auto-advances; one active index drives the layout; hover, focus and tap are equivalent; all stage copy stays in the document at all times. Supersedes the sequential scroll reveal recorded earlier the same day.~~ **SUPERSEDED 2026-08-08 by the stage selector above.** The interaction principles recorded here — entry on intersection, no auto-advance, one active index, equivalent inputs, copy always in the document — remain in force under the stage selector; only the moving-track presentation was superseded. Retained for history. | Marketing website | Jeff Kaufman | Section 46.7. The homepage "small miss → constraint → field impact" row is an argument in order. The reveal it replaces had two defects: it ran on load while the reader was still at the hero, so the section was already finished by the time it was reached; and a one-shot reveal gave the reader nothing to do with a progression they should be able to move through. Restricted to genuine progressions so it does not become a generic effect on every group of three. |
| 2026-08-06 | Token implementation architecture approved: approved `--jp-*` custom properties are declared in `:root` in `src/index.css`, and Tailwind v4 `@theme inline` aliases (`--color-jp-*`) reference those variables rather than restating their values. | All products | Jeff Kaufman | Section 45.2. Tailwind v4 only generates utilities from `--color-*` names, but Section 8.8 mandates the `--jp-*` names. Aliasing satisfies both from one authoritative declaration; restating the hex inside `@theme` would create the second definition site Section 45.2 forbids. |
| 2026-08-06 | Centered-caption exception approved: short figure captions and concise explanatory statements directly associated with a centered diagram MAY be centered when their measure is constrained. Ordinary body copy and long explanatory paragraphs remain left-aligned. | All products | Jeff Kaufman | Section 7.7. A caption belongs to its figure, not to the reading column. The prohibition in 7.7 exists to stop long centered prose, not to break the association between a centered visual and the one line that explains it. |
| 2026-08-06 | `slate-500` and `slate-200` resolved against the existing token set rather than by adding neutrals. Quieter-than-muted text is `--jp-text-muted` at reduced opacity; the replay control rests at `--jp-text-muted` and hovers to `--jp-text-primary`. | All products | Jeff Kaufman | Section 8.8. The approved neutral set already spans the required range. Two more near-identical grays is the specific failure this system exists to prevent, and neither use expresses a semantic level the three text tokens do not already cover. |
| 2026-08-06 | Subtle divider treatment approved: section dividers and structural hairlines use `--jp-border` at **12%** opacity. Replaces the ad-hoc `white/10` and `white/12` pair. Functional diagram hairlines may retain their existing perceptual weight; the base hue must always be `--jp-border`. | All products | Jeff Kaufman | Section 8.8. Two divider opacities two points apart are indistinguishable and fragment the palette for no gain. One approved level is named; opacity tokens are NOT created, per the standing preference against growing a token per component. |
| 2026-08-06 | Section step/sequence numbers (`01` / `02` / `03`) standardized on `--jp-brand-amber` at restrained opacity across every equivalent section. | Marketing website | Jeff Kaufman | Section 48.9. The homepage rendered the same component role in two unrelated conventions - amber in two sections, a neutral gray in a third. Equivalent roles must not carry different color conventions. |
| 2026-08-06 | Keyboard focus outline on amber controls and appropriate dark-surface controls approved as `--jp-text-primary`. No focus-specific color token is created. | All products | Jeff Kaufman | Sections 48.1 and 8.1.1. An amber outline on an amber button is low-contrast against the control it marks. `--jp-text-primary` is the highest-contrast value in the approved set against every dark surface, and reusing it avoids a token whose only job is to be visible. |
| 2026-08-06 | `--jp-brand-amber-active` approved for genuine interactive active states, hover included. Hover on a primary action is an active state, not a static one. | All products | Jeff Kaufman | Section 8.1.1. Active Amber's rule is that it must never be a *static* brand color; it has always been permitted for illuminated and active states. A hover is a real, transient active state, and expressing it as the brand amber dimmed would read as disabled rather than responsive. |
| 2026-08-06 | Hero cool depth wash `rgba(51,74,120,0.30)` **removed** rather than tokenized or replaced. **Supersedes** the same-date decision to replace it with a `slate-700`-derived treatment. No neutral token is added, and `--jp-hero-glow-cool` remains rejected. | Marketing website | Jeff Kaufman | Sections 8.8 and 47.4. The wash is decorative and carries no information. A decorative effect is not grounds for expanding the token system, and the restraint test in 47.4 answers the question directly: what is lost is that the hero looks plainer, which is the goal. |
| 2026-08-06 | ~~Hero cool depth wash `rgba(51,74,120,0.30)` to be replaced with a `slate-700` `#334155`-derived treatment during the homepage migration.~~ **SUPERSEDED 2026-08-06 by the removal decision above.** Retained for history. | Marketing website | Jeff Kaufman | Section 8.8. Superseded once implementation review established that no conformant expression of a `#334155`-derived treatment existed without adding a token the system did not want. |
| 2026-08-06 | Component-specific color token for the hero glow REJECTED. `--jp-hero-glow-cool` and any equivalent hero-scoped color token will not be created. | All products | Jeff Kaufman | Section 8.8. Component-scoped color tokens turn a shared system into a collection of private palettes, and each one makes the next easier to justify. A recurring cool-lighting role may be evaluated as a semantic token in future through Section 49; one hero is not a role. |
| 2026-08-06 | `--jp-shadow` remains RESERVED with no value. DEFERRED. | All products | Jeff Kaufman | Section 8.8. Review of the marketing homepage found no neutral shadow of any kind; the only shadows present are amber emphasis glows derived from `--jp-brand-amber`. A token is not approved merely because its name was reserved. |
| 2026-08-06 | `--jp-border` approved at `#94A3B8`, deliberately sharing its base value with `--jp-text-muted`. Opacity may vary by semantic use; recurring levels must be formalized through Section 49 rather than invented per component. | All products | Jeff Kaufman | Section 8.8. Neutral structure and de-emphasized text belong to the same tonal family; two different grays would fragment the palette for no communicative gain. They remain separate tokens because they express separate intents and a future decision may move one without the other. |
| 2026-08-06 | `--jp-text-primary` approved at `#F1F5F9`, consolidating the previous `#F8FAFC` and `#F1F5F9` usage into a single primary text color. | All products | Jeff Kaufman | Section 8.8. The two values differ by roughly seven points per channel and 0.87 in contrast ratio against `#020617` - imperceptible, and precisely the near-identical grays this system exists to prevent. Emphasis above body copy is carried by type scale and weight, not by a second, brighter white (Section 47.3). |
| 2026-08-06 | `--jp-text-muted` approved at `#94A3B8` as an ADDITION to the previously reserved token set. | All products | Jeff Kaufman | Section 8.8. Primary, secondary, and muted text are three genuinely different semantic levels. The muted level cannot be synthesised from `--jp-text-secondary` by opacity: `#CBD5E1` faded over `#020617` converges in the red channel but falls materially short in blue, because `#94A3B8` is the bluer color rather than merely the dimmer one. Approximating it would have shipped a visibly different value while claiming it was the same. |
| 2026-08-06 | Neutral token set approved: `--jp-background` `#020617`, `--jp-surface` `#0F172A`, `--jp-text-primary` `#F1F5F9`, `--jp-text-secondary` `#CBD5E1`, `--jp-text-muted` `#94A3B8`, `--jp-border` `#94A3B8`. | All products | Jeff Kaufman | Section 8.8. Values derived from the dominant neutrals already in production rather than newly chosen, so approval formalizes existing practice instead of imposing a new palette. Unblocks the homepage token migration. The approved amber system is unchanged. |
| 2026-08-06 | Design Decision Process approved: the Design System is updated before production code, never after. | All products | Jeff Kaufman | Section 49 |
| 2026-08-06 | Component consistency standard approved for buttons, cards, timeline, icons, badges, section spacing, accent usage, and illustration. | All products | Jeff Kaufman | Section 48 |
| 2026-08-06 | Visual hierarchy standard approved: the qualities JiTpro must project, and the qualities it must never project. | All products | Jeff Kaufman | Section 47 |
| 2026-08-06 | Animation standard approved: animation must communicate, never decorate; all elements of a single animated idea derive from one shared state. | All products | Jeff Kaufman | Section 46 |
| 2026-08-06 | Implementation standard approved: colors are consumed as CSS custom properties, defined once in `src/index.css`. | All products | Jeff Kaufman | Section 45 |
| 2026-08-06 | Color governance approved: production components may not reference Tailwind amber utilities, raw hex, or rgba amber literals. | All products | Jeff Kaufman | Section 8.9 |
| 2026-08-06 | Approved design token layer established (`--jp-*` CSS custom properties). | All products | Jeff Kaufman | Section 8.8 |
| 2026-08-06 | Active Amber approved as `#FDE68A` for illuminated/animated states only. Never a static brand color. | All products | Jeff Kaufman | Section 8.1.1; marketing hero timeline |
| 2026-08-06 | JiTpro Brand Amber approved as `#F59E0B` as the official primary brand color. | All products | Jeff Kaufman | Section 8.1.1; JiTpro logo artwork |
| TODO | TODO | TODO | TODO | TODO |

---

# 1. Brand Philosophy

Purpose: JiTpro exists to eliminate procurement chaos before it reaches the field. The software is built around one fundamental belief: “Most schedules don’t break in the field. They arrive broken.” JiTpro prevents that by exposing procurement problems while there is still time to solve them.

The design language must communicate this philosophy immediately. A user should feel that JiTpro brings order to complexity, makes hidden risk visible, and gives project teams a clear understanding of what is happening early enough to make informed decisions.

JiTpro gives project teams confidence that procurement is under control. It does not promise that every project will succeed. It promises that teams will see reality sooner, understand the implications, and have the visibility required to act before field recovery becomes the only option. JiTpro does not create optimism. It creates visibility.

Decisions that belong in this section:
- Core brand belief: JiTpro exists to expose procurement problems before they reach the field.
- Foundational thesis: most schedules do not break in the field; they arrive broken.
- Brand promise: JiTpro gives project teams confidence that procurement is under control by surfacing reality early enough to make informed decisions.
- Visual obligation: every interface must communicate order, clarity, control, and construction expertise before the user reads detailed copy.
- Professional posture: the interface must communicate confidence without arrogance, precision without rigidity, authority without intimidation, and sophistication without excess.
- Field-rooted credibility: JiTpro must feel like software built by construction professionals, not software engineers guessing how construction works.
- Design mission: every screen must answer one question: “What does the user need to understand right now?” Anything that does not help answer that question should be removed.
- Design standard: JiTpro is not attempting to imitate Linear, Apple, or Vercel. JiTpro seeks the same level of craftsmanship, restraint, consistency, and attention to detail while creating its own identity rooted in construction management.
- Approved brand values: precision, control, clarity, trust, accountability, professionalism, calm under pressure, executive confidence, construction expertise, and long-term reliability.
- Forbidden brand signals: playfulness, flashiness, chaos, trendiness, startup culture, hype, aggressive sales energy, and consumer-product aesthetics.

Implementation notes:
- This section guides visual decisions but does not prescribe specific fonts, colors, spacing, motion values, or component tokens. Those decisions belong in later chapters.
- Brand philosophy must align with JiTpro language governance and external positioning rules.
- Public-facing language should respect JiTpro governance: external category and product-form nouns must be verified against the JiTpro vault before being finalized.
- The interface should feel like a superintendent who has walked onto hundreds of complex projects: calm, experienced, prepared, methodical, never rushed, never surprised, and always organized.
- Clarity is always more important than decoration. Understanding is always more important than visual effects.
- Every future UI decision across the marketing website, SaaS application, internal dashboard, printed reports, and documentation must reinforce that JiTpro understands construction at an expert level.
- When a visual choice creates drama but reduces comprehension, choose comprehension.
- When a visual choice feels trendy but weakens long-term reliability, choose reliability.
- When a visual choice makes the interface feel clever but less accountable, choose accountability.

---

# 2. Product Personality

Purpose: Define the behavior of the JiTpro product itself. Product personality is not marketing language; it is how the software behaves through interface tone, density, motion, hierarchy, illustration, interaction, and future feature design.

JiTpro’s personality must be calm, precise, deliberate, intelligent, organized, professional, trustworthy, quietly confident, experienced, and methodical. The product should never appear rushed, excited, busy, or competing for the user’s attention. It should calmly guide the user toward the most important information.

The intended emotional experience is that the user can say: “I understand the project. I know where the risks are. I know what needs attention. I trust this information. I am in control.” JiTpro should reduce anxiety rather than create urgency. Urgency comes from project conditions, not from the software itself.

Decisions that belong in this section:
- Core personality attributes to express: calm, precise, deliberate, intelligent, organized, professional, trustworthy, quietly confident, experienced, and methodical.
- Personality attributes to avoid: rushed, excited, busy, attention-seeking, random, decorative, exaggerated, trendy, or visually noisy.
- Construction personality: JiTpro should feel like an experienced superintendent, a respected senior project manager, a trusted owner’s representative, and a disciplined operations executive.
- Non-goal personalities: JiTpro must never feel like a social media application, consumer productivity app, startup landing page, cryptocurrency website, gaming interface, or flashy sales presentation.
- Emotional outcome: the interface should help users understand the project, identify risk, know what needs attention, trust the information, and feel in control.
- Communication style: the interface communicates facts. It does not exaggerate, manufacture urgency, or use emotional language to influence decisions.
- Visual behavior: the interface must appear balanced, stable, predictable, intentional, consistent, orderly, and professional.
- Decision hierarchy: when design uncertainty exists, prioritize clarity first, then readability, information hierarchy, usability, accessibility, consistency, and finally beauty.
- AI design rule: future AI systems generating JiTpro interfaces should first ask, “What would the calmest, most experienced construction executive build?” not “What looks modern?”, “What is trending?”, or “What is visually impressive?”

Implementation notes:
- Product personality should inform typography, motion, color intensity, density, and component behavior.
- Do not translate personality attributes into specific fonts/colors until those decisions are approved in their own chapters.
- Beauty is important, but understanding is more important. Professional judgment must always outweigh visual novelty.
- The interface should not create artificial urgency. It should present information clearly and allow professionals to make informed decisions.
- Nothing should feel random. Nothing should feel decorative. Nothing should exist without purpose.
- Motion, illustration, layout, and interaction patterns must reinforce calm guidance rather than stimulation or spectacle.
- When a visual idea feels modern but weakens clarity, choose clarity.
- When an interaction feels impressive but interrupts comprehension, choose comprehension.
- When a layout feels visually rich but competes with the user’s task, simplify the layout.

---

# Brand Voice & Customer Education

Purpose: JiTpro is built by construction professionals. It should always sound like construction professionals speaking to other construction professionals. The website is not simply marketing software; it is teaching experienced builders to see their projects through a new framework.

Decisions that belong in this section:
- Core principle: never assume the visitor already understands JiTpro terminology. Start with the problems they already experience, then introduce the professional terminology, then explain how JiTpro organizes those problems.
- Educational posture: JiTpro must educate without talking down to the audience. The voice should make experienced builders feel understood, not corrected.
- Terminology strategy: many small and mid-sized general contractors do not believe they perform “procurement.” They associate procurement with large commercial contractors that have dedicated procurement departments. The website should intentionally create the realization that they perform procurement every day, even if they do not call it that.
- Aha moment: visitors should discover that JiTpro gives structure and visibility to work they already perform every day.
- Writing philosophy: write like one experienced contractor speaking to another. The voice should feel like someone who has successfully managed difficult projects, not someone trying to sell software.
- Teaching philosophy: every unfamiliar JiTpro concept should be introduced in three steps: start with a real construction situation, give that situation a name, then explain how JiTpro manages it.
- Trust standard: trust is earned through understanding. Visitors should feel, “This company understands my world,” “They’ve dealt with the same problems,” and “They’re putting words around problems I’ve always had.”
- Communication standard: every page should ask, “Would an experienced superintendent naturally explain it this way?” If not, rewrite it.

Implementation notes:
- Start with concrete construction situations before introducing JiTpro terminology.
- Do not introduce technical terminology without first creating context.
- Use plain English, construction vocabulary, specific examples, real project situations, practical explanations, honest observations, and professional confidence.
- Avoid corporate language, consulting jargon, MBA terminology, startup buzzwords, marketing exaggeration, and language that sounds like software being sold to outsiders.
- The website should never make visitors feel unintelligent for not knowing construction-management terminology. It should make them feel understood.
- When explaining procurement to small and mid-sized general contractors, use examples they recognize: waiting on cabinets, waiting on windows, waiting on owner selections, waiting on shop drawings, and waiting on long-lead materials. Then connect those examples to the professional term.
- A valid educational sequence is: “You probably don’t call it procurement. You call it waiting on cabinets. Waiting on windows. Waiting on owner selections. Waiting on shop drawings. Waiting on long-lead materials. That’s procurement.”
- The voice should be direct, practical, and professional. It should not exaggerate the problem or dramatize the solution.

---

# 3. User Experience Philosophy

Purpose: Define the experience JiTpro should create over the lifetime of a customer relationship. This chapter is not about interface elements; it is about how users should perceive the software after repeated use.

JiTpro should reduce uncertainty. Every interaction should leave the user feeling more informed than before. The software should never overwhelm users with information; it should progressively reveal the information that matters most. JiTpro must organize complexity, not merely display complexity.

Decisions that belong in this section:
- First impression: when a user first opens JiTpro, they should think, “This looks professional,” “This feels different,” “This software understands construction,” and “This appears trustworthy.” Nothing should feel flashy, experimental, or unfinished.
- After five minutes: users should understand where everything is, feel that the interface is logical, know they do not have to fight the software, and immediately recognize what deserves attention. The interface should feel intuitive rather than impressive.
- After one week: users should trust the information, rely on JiTpro daily, make better decisions, and spend less time searching for answers. Confidence should increase with continued use.
- After six months: users should not want to manage another project without JiTpro. The software should feel like part of how they run projects, helping teams notice problems earlier and make fewer avoidable mistakes.
- Interface philosophy: every screen should answer three questions immediately: What is happening? What needs attention? What should I do next?
- Cognitive-load standard: reduce unnecessary decisions, unnecessary movement, unnecessary reading, and unnecessary clicks. Every interaction should make the project feel simpler.
- Trust standard: trust must come from accurate information, predictable behavior, consistency, and disciplined presentation, not from marketing language, animation, or visual effects.
- Long-term relationship: JiTpro should quietly become trusted infrastructure because it consistently helps users understand the project better than any alternative.
- Guiding principle: every design decision should ask, “Will this help experienced construction professionals make better decisions with less effort?” If the answer is no, it should not be included.

Implementation notes:
- User experience goals must translate into hierarchy, navigation, disclosure patterns, dashboard structure, form flow, reporting, and state design later.
- Users should never need to search for the primary message of a screen.
- The software should reveal priority before detail, detail before exception, and exception before action only when that sequence helps comprehension.
- Never make the software more complicated than the project itself.
- Do not create artificial urgency. Urgency should come from real project conditions surfaced clearly by the system.
- Do not use animation, visual drama, or marketing copy as substitutes for accurate information and predictable behavior.
- The product should become indispensable quietly, through repeated usefulness rather than persuasion.

---

# 4. Design Principles

Purpose: Establish the non-negotiable rules that govern all visual and interaction decisions.

Decisions that belong in this section:
- Top-level design principles
- Priority order when principles conflict
- Accessibility principle
- Data clarity principle
- Motion restraint principle
- Construction-context principle
- Enterprise trust principle

Implementation notes:
- Principles must be actionable. Each principle should include “Do” and “Do not” examples once finalized.
- Principles should apply across all media, including printed reports.

Principle 1: Clarity Before Beauty
- Definition: Every interface must communicate information clearly before attempting to impress visually. Beautiful interfaces are valuable; understandable interfaces are essential.
- Use when: evaluating visual effects, layout density, animation, illustration, page composition, dashboard design, report design, and component styling.
- Do: make the primary message immediately understandable; remove visual effects that compete with comprehension; choose clear hierarchy over decorative impact.
- Do not: preserve a visual treatment only because it looks impressive; allow beauty to obscure meaning; make users work to understand the screen.

Principle 2: Information Has Hierarchy
- Definition: Not every piece of information deserves equal visual weight. JiTpro interfaces must immediately communicate what matters most, what requires attention, and what can wait.
- Use when: designing dashboards, tables, page headers, cards, alerts, charts, reports, navigation, and application workflows.
- Do: establish hierarchy primarily through typography, spacing, contrast, and layout; make the most important information easier to find than secondary information.
- Do not: give equal emphasis to all information; use excessive color as the primary hierarchy tool; make users determine priority by reading everything first.

Principle 3: Reduce Cognitive Load
- Definition: Construction projects are already complicated. JiTpro must not add unnecessary complexity. Every unnecessary click, animation, decision, paragraph, or visual element increases cognitive load.
- Use when: reviewing workflows, forms, navigation paths, data views, onboarding, help content, and reporting.
- Do: reduce, simplify, and clarify whenever possible; remove unnecessary decisions; make the next useful action obvious.
- Do not: create extra steps to satisfy internal structure; show complexity simply because it exists; make the software more complicated than the project.

Principle 4: Teach Before You Label
- Definition: JiTpro must never assume users already understand JiTpro terminology. Users should discover concepts through real construction situations before being asked to adopt vocabulary.
- Use when: writing marketing pages, onboarding flows, empty states, tooltips, documentation, feature labels, and explanatory UI.
- Do: start with a real construction situation, introduce the terminology, then explain how JiTpro organizes that situation.
- Do not: introduce technical terminology without context; force users to memorize vocabulary; make experienced builders feel unintelligent for not using JiTpro’s terms.

Principle 5: Every Pixel Must Earn Its Place
- Definition: Every element on the screen must exist for a reason. Decoration must never exist independently of function.
- Use when: adding icons, illustrations, dividers, badges, shadows, color accents, cards, animations, or supporting copy.
- Do: remove elements when removal makes the interface clearer; ensure every visual element supports comprehension, hierarchy, trust, or action.
- Do not: add ornament for its own sake; fill space because it is available; keep a visual element that does not help the user understand or act.

Principle 6: Construction First
- Definition: When generic SaaS conventions conflict with construction workflow, construction workflow wins. JiTpro must reflect how projects are actually managed.
- Use when: naming objects, structuring workflows, designing dashboards, mapping project roles, representing procurement steps, and choosing default information architecture.
- Do: privilege real project behavior, field experience, and construction decision-making patterns; make the product feel built by construction professionals.
- Do not: force construction work into generic software patterns; use startup SaaS conventions when they weaken project understanding; design for software neatness over jobsite reality.

Principle 7: Consistency Creates Trust
- Definition: Users trust software that behaves predictably. Consistency reduces uncertainty.
- Use when: defining components, navigation, button behavior, spacing, terminology, table actions, status states, reports, and documentation.
- Do: keep buttons, navigation, spacing, terminology, states, and component behavior consistent across surfaces.
- Do not: create one-off variants without a clear system reason; change terminology across pages; make similar actions behave differently.

Principle 8: Calm Interfaces Build Confidence
- Definition: JiTpro should never compete for attention. The interface should make users feel calmer after opening it than before.
- Use when: deciding color intensity, motion, alerts, whitespace, density, notifications, dashboards, and risk visualization.
- Do: use restraint, whitespace, sparse motion, and intentional color; let real project conditions create urgency rather than forcing urgency through interface drama.
- Do not: over-animate, over-color, crowd the page, or make normal states feel alarming.

Principle 9: Support Decision Making
- Definition: JiTpro exists to improve project decisions. Every screen should help users understand what happened, why it matters, and what they should do next.
- Use when: designing screens, reports, dashboards, charts, tables, alerts, forms, and workflows.
- Do: connect information to decision-making; surface meaning, consequence, and next action; question any element that does not contribute to better decisions.
- Do not: display information without context; prioritize data volume over decision value; make users infer the operational implication alone.

Principle 10: Craftsmanship Matters
- Definition: JiTpro should feel carefully built. Attention to detail communicates trust.
- Use when: refining spacing, typography, alignment, motion, component states, empty states, loading states, print layouts, and data displays.
- Do: make spacing deliberate, typography disciplined, motion subtle, and components engineered; treat small details as part of trust-building.
- Do not: accept rough alignment, inconsistent spacing, careless copy, unfinished states, or components that feel assembled rather than designed.

The JiTpro Standard
- The goal is not to create the most beautiful construction software. The goal is to create the clearest, most trustworthy, and most professionally crafted construction software.
- Visitors and users should leave with the impression that the same level of care used to build exceptional projects has been applied to building JiTpro itself.
- These principles take precedence over personal preference, design trends, and aesthetic experimentation.
- When uncertainty exists, use these principles to resolve the decision.

---

# 5. Visual Language

Purpose: Define the overall visual grammar of JiTpro: the recurring shapes, hierarchy, density, contrast, data patterns, and graphic motifs that make the interface recognizable.

Decisions that belong in this section:
- Overall visual direction
- Approved visual motifs
- Prohibited visual motifs
- Density rules
- Contrast style
- Use of construction, schedule, procurement, and control metaphors
- Relationship between cinematic marketing visuals and practical application UI

Implementation notes:
- This section should connect brand philosophy to concrete visual systems without choosing exact tokens.
- Approved motifs should later map to component patterns, chart patterns, iconography, and illustration rules.

Overall Character
- JiTpro should appear quiet, confident, purposeful, engineered, professional, disciplined, architectural, and timeless.
- Every screen should feel intentional. Nothing should feel accidental.
- The visual language must communicate that JiTpro is built to organize complex project reality, not decorate it.

Architectural Influence
- JiTpro’s visual language should resemble architectural drawings and well-organized construction documentation more than consumer software.
- Approved characteristics include strong alignment, consistent spacing, visible structure, predictable rhythm, clean geometry, order, and disciplined organization.
- The interface should feel designed by people who organize complex projects.

Restraint
- JiTpro should never rely on visual excess.
- Avoid visual noise, unnecessary decoration, and competing focal points.
- Whitespace is an active design element. Empty space improves understanding.
- The interface should never feel crowded.

Visual Hierarchy
- Users should immediately recognize primary information, supporting information, and reference information.
- Everything should have an obvious place in the hierarchy.
- Visual weight should come from typography, spacing, layout, and contrast—not decoration.

Balance
- Every page should feel visually balanced.
- No section should dominate the interface unnecessarily.
- No element should appear oversized simply to attract attention.
- Layout should create a feeling of stability.

Rhythm
- Pages should establish a consistent rhythm.
- Users should begin to anticipate spacing, alignment, and section organization.
- Predictability reduces cognitive effort and rewards familiarity.

Construction Identity
- JiTpro should visually reflect construction management through structure, organization, systems, sequences, timelines, relationships, dependencies, and professional documentation.
- Construction influence should feel authentic rather than decorative.
- Do not rely on hard-hat imagery, generic construction photography, or superficial construction clichés as the primary expression of the brand.

Premium Quality
- JiTpro should feel premium because of craftsmanship, not visual effects.
- Premium means excellent typography, excellent spacing, excellent alignment, excellent consistency, and excellent attention to detail.
- Premium does not mean large shadows, heavy gradients, flashy animation, glassmorphism, or visual gimmicks.

Timelessness
- JiTpro should still feel modern five years from now.
- Avoid temporary design trends.
- Choose solutions that prioritize clarity and longevity over novelty.

Recognition
- Users should eventually recognize a JiTpro screen without seeing the logo.
- The visual language itself should become part of the brand through repeated structure, rhythm, restraint, hierarchy, and construction-specific organization.

---

# 6. Inspiration and Non-Goals

Purpose: Record external references and explicitly define what JiTpro is not trying to become.

Decisions that belong in this section:
- Approved inspiration references
- What to borrow conceptually from each reference
- What not to borrow
- Explicit non-goals
- Competitive visual differentiation rules

Implementation notes:
- Inspiration is directional, not a license to copy.
- Each reference should be mapped to specific design qualities, not vague taste language.
- Current requested comparison references include Linear, Vercel, and Apple; final interpretation is TODO.

TODO:
- TODO: Define approved inspiration list.
- TODO: Define what JiTpro borrows from Linear, if anything.
- TODO: Define what JiTpro borrows from Vercel, if anything.
- TODO: Define what JiTpro borrows from Apple, if anything.
- TODO: Define explicit non-goals, e.g. what the system must not look or feel like.

Reference template:
- Reference: TODO
- Qualities to study: TODO
- Qualities to avoid: TODO
- JiTpro-specific adaptation: TODO

---

# 7. Typography

Purpose: Define the complete type system for marketing, application, dashboards, reports, documentation, data displays, and code.

Decisions that belong in this section:
- Font families
- Font loading strategy
- Heading system
- Body system
- Data typography
- Code typography
- Type scale
- Responsive typography
- Line-height rules
- Letter-spacing rules
- Font-weight rules
- Numeric/tabular rules
- Print typography rules

Implementation notes:
- Do not choose or implement fonts until approved.
- The type system must include web and print requirements.
- Data-heavy interfaces need rules for numbers, units, dates, statuses, table cells, and chart labels.
- Documentation needs readable long-form rules distinct from marketing hero copy.

Font Families
- Heading font: Inter Tight.
- Heading font purpose: headings, section titles, hero statements, major metrics, and large callouts.
- Body font: Inter.
- Body font purpose: paragraphs, navigation, forms, buttons, and general interface text.
- Data font: JetBrains Mono.
- Data font purpose: constraint IDs, procurement IDs, dates, lead times, durations, schedules, tables requiring numeric alignment, and technical data.

Typography Philosophy
- Typography is one of JiTpro’s primary brand assets.
- Typography must communicate professionalism, authority, precision, and calm confidence.
- Typography should establish hierarchy before color does. A page should remain understandable even when viewed without color.
- Typography should feel professional, measured, confident, intentional, architectural, and disciplined.
- Typography must never feel decorative, trendy, fashionable, or playful.

Font Weight Standards
- Inter Tight approved weights: 600, 700, 800.
- Inter approved weights: 400, 500, 600.
- JetBrains Mono approved weights: 400, 500.
- Limit the number of weights used throughout the product. Consistency is more important than variety.

Letter Spacing Standards
- Use additional tracking only where it improves hierarchy.
- Appropriate uses include section labels, navigation groups, and overlines.
- Avoid excessive tracking in paragraphs and headings.

Reading Experience
- Typography should reduce reading effort.
- Prefer shorter line lengths.
- Avoid walls of text.
- Use whitespace to improve comprehension.

Numeric Typography
- Whenever users compare numbers, dates, durations, procurement IDs, or schedules, use JetBrains Mono.
- Numeric information should feel engineered rather than decorative.

Guiding Principle
- Excellent typography should become invisible. Users should notice the information, not the font.
- Do not assign final pixel values in this chapter. Exact sizes must be defined later in implementation tokens.
- Font loading method, fallback stacks, and technical implementation remain implementation tasks that must preserve the approved family roles above.

## 7.1 Heading System

Purpose: Define all heading levels and display styles.

Decisions that belong here:
- Display heading levels
- Page heading levels
- Section heading levels
- Card heading levels
- Modal heading levels
- Report heading levels
- Documentation heading hierarchy

Implementation notes:
- Each heading token must include font family, size, weight, line-height, letter-spacing, text transform, margin behavior, and responsive behavior.

Heading hierarchy:
- Display XL: highest-impact typographic expression for rare, primary brand or product statements. Use for major hero statements and moments where one idea must dominate the page.
- Display L: large page-level statement for important marketing, product, dashboard, or report openings where Display XL would be excessive.
- Display M: supporting display style for major callouts, important metrics, and high-emphasis explanatory sections.
- Heading XL: primary page heading for standard application screens, documentation pages, reports, and internal dashboards.
- Heading L: section heading for major content areas within a page.
- Heading M: subsection heading for grouped content, panels, forms, and dashboard regions.
- Heading S: compact heading for cards, small panels, modal sections, table groups, and nested content.

Heading usage standards:
- Use Inter Tight for all heading levels.
- Use approved Inter Tight weights only: 600, 700, and 800.
- Headings should create structure before color is introduced.
- Headings should feel measured and authoritative, not decorative.
- Avoid excessive tracking in headings.
- Major metrics may use heading styles when they function as headline information.
- Print and report headings should preserve the same hierarchy, even when final print sizes differ from web sizes.

## 7.2 Body System

Purpose: Define readable text for paragraphs, labels, helper text, captions, and long-form content.

Decisions that belong here:
- Body size tokens
- Lead paragraph style
- Default paragraph style
- Small text style
- Caption style
- Label style
- Eyebrow style
- Helper text style
- Legal/disclaimer style

Implementation notes:
- Body typography must support marketing copy, form instructions, documentation, and dense app screens.

Body hierarchy:
- Body L: high-emphasis explanatory text, lead paragraphs, important product explanations, and report introductions.
- Body M: default paragraph and interface text for general reading, forms, navigation, tables with normal text, and application content.
- Body S: secondary supporting text, helper text, compact descriptions, metadata, dense interface content, and low-emphasis explanatory copy.
- Caption: short supporting text for images, charts, tables, footnotes, source notes, timestamps, and secondary metadata.
- Overline: short uppercase or label-style text used to introduce sections, navigation groups, categories, or structured page regions.

Body usage standards:
- Use Inter for body, navigation, forms, buttons, and general interface text.
- Use approved Inter weights only: 400, 500, and 600.
- Body text should reduce reading effort and avoid walls of text.
- Use shorter line lengths where possible.
- Use whitespace to improve comprehension.
- Labels, helper text, and error text should be clear and practical, not overly formal or promotional.
- Overlines may use additional tracking when it improves hierarchy.

## 7.3 Data Typography

Purpose: Define typography for data-dense UI such as dashboards, tables, charts, metrics, schedules, and printed reports.

Decisions that belong here:
- Metric values
- Units
- Dates
- Durations
- Currency
- Percentages
- Status text
- Table headers
- Table cells
- Chart labels
- Axis labels
- Callout numbers

Implementation notes:
- Consider tabular numbers where values must align.
- Data typography must prioritize scanning and accuracy.

Data typography standards:
- Data: use JetBrains Mono for constraint IDs, procurement IDs, dates, lead times, durations, schedules, and technical data.
- Metric values: use the appropriate heading level when the metric is a primary message; use JetBrains Mono when numeric comparison, precision, or alignment is more important than expressive hierarchy.
- Table headers: use clear, compact typography that prioritizes scanning and column recognition.
- Table cells: use Inter for normal prose values and JetBrains Mono for IDs, dates, durations, schedules, and aligned numeric values.
- Chart labels: use typography that supports interpretation without competing with the chart itself.
- Numeric alignment: whenever users compare numbers, dates, durations, procurement IDs, or schedules, use JetBrains Mono and align values predictably.
- Data typography should feel engineered rather than decorative.

## 7.4 Code Typography

Purpose: Define typography for code snippets, technical docs, configuration examples, API samples, and internal debugging surfaces.

Decisions that belong here:
- Code font family
- Inline code style
- Code block style
- Syntax highlighting style
- Terminal/output style

Implementation notes:
- Code typography must maintain contrast and legibility in both web documentation and printed exports.

Code typography standards:
- Code font: JetBrains Mono.
- Code: use for technical data, code snippets, configuration examples, API samples, terminal/output text, and internal debugging surfaces.
- Inline code should be visually distinct from body text without disrupting reading flow.
- Code blocks should prioritize legibility, line scanning, copyability, and clear separation from surrounding prose.
- Syntax highlighting may be used only when it improves comprehension. It should not create visual noise or rely on color alone.
- Use approved JetBrains Mono weights only: 400 and 500.

## 7.5 Scale

Purpose: Define the official type scale and naming model.

Decisions that belong here:
- Scale values
- Token names
- Mobile/desktop mapping
- Print mapping

Implementation notes:
- The scale should be tokenized before component implementation.

Official hierarchy names:
- Display XL
- Display L
- Display M
- Heading XL
- Heading L
- Heading M
- Heading S
- Body L
- Body M
- Body S
- Caption
- Overline
- Data
- Code

Scale standards:
- The typography scale is role-based. Each level exists because it serves a specific communication purpose.
- Do not assign pixel values in this chapter.
- Exact web, application, dashboard, documentation, and print sizes must be defined later as design tokens.
- Components must reference these named typography roles rather than inventing local type styles.

## 7.6 Responsive Typography

Purpose: Define how typography changes across screen sizes.

Decisions that belong here:
- Mobile type sizes
- Tablet type sizes
- Desktop type sizes
- Large-display type sizes
- Print equivalents
- Clamp/fluid rules, if any

Implementation notes:
- Avoid per-component subjective responsive overrides once this is approved.

Responsive typography standards:
- Typography must preserve hierarchy across viewport sizes.
- Display and heading styles may reduce in scale on smaller screens, but their relative importance must remain clear.
- Body text should remain comfortable to read on mobile, tablet, desktop, documentation, dashboard, and report contexts.
- Data typography must remain scannable and aligned across responsive table, schedule, chart, and dashboard layouts.
- Responsive changes should reduce reading effort, not merely fit text into available space.
- Avoid subjective per-component responsive overrides once final type tokens are approved.

---

## 7.7 APPROVED - Typography Standard

Status: APPROVED (2026-08-06). Binding on all production code.

### Typefaces

| Role | Family | Notes |
| --- | --- | --- |
| Headings | **Inter Tight** | The JiTpro heading face. Tight, editorial, confident at large sizes. Used for all headings and for short emphasis lines that behave as headings. |
| Body and UI | **Inter** | All body copy, labels, controls, and running text. |
| Data and annotation | **JetBrains Mono** | Reserved for technical annotation, eyebrows, small structural labels, and numeric/tabular data. Never for running prose. |

These are already declared in `src/index.css` under Tailwind's `@theme` block and are the approved values.

### Editorial hierarchy

- Hierarchy MUST be established by typography first - size, weight, and spacing - before color is introduced. A page must remain understandable in greyscale (see Section 7 preamble and 8.1).
- Each surface should have one clear primary statement. Competing headings at the same weight and scale are a hierarchy failure.
- Headings MUST use tight tracking at large sizes. Optical spacing loosens as type scales up; negative tracking compensates.
- A heading and the line that explains it SHOULD be set as one continuous thought - tight vertical spacing, differentiated size and weight - rather than two visually separate blocks.

### Sentence case, minimal uppercase

- Headings and body copy MUST be sentence case.
- Uppercase is permitted ONLY for small eyebrow and micro-label text, and MUST carry increased letter spacing when used.
- Uppercase MUST NOT be used for headings, body copy, buttons, or any text longer than a short phrase.
- Where uppercase is applied, it SHOULD be applied via CSS (`text-transform`) rather than authored in capitals, so assistive technology receives normally-cased text.

### Line length and readability

- Body copy MUST be constrained to a readable measure. The approved ceiling is **52-62 characters** per line; wider measures are a defect.
- Paragraphs SHOULD be short. Dense explanation blocks are contrary to the product's voice (Section 2).
- Body copy MUST be left-aligned. Long centered paragraphs are prohibited.
- Headlines SHOULD use balanced wrapping so no line is left with a single orphaned word.

**Centered captions - approved exception (2026-08-06).** Short figure captions and concise explanatory statements directly associated with a centered diagram or visualization MAY be centered, provided their measure is constrained. A caption belongs to its figure rather than to the reading column, and forcing it left would break the association the centering exists to express.

This exception is narrow:
- It applies ONLY to a caption bound to a specific centered visual, and only where that caption is short.
- It does NOT apply to ordinary body copy, lead paragraphs, or long explanatory prose, which remain left-aligned under the rule above.
- The constrained-measure ceiling in this section still applies. A centered caption is not exempt from 52-62 characters.

**Centered editorial statements - approved exception (2026-08-08).** A single short statement that behaves as a heading (see the typeface table above) MAY be set centered in its own full-width section when it serves as a deliberate page-level pause or transition between arguments. Set alone, the statement is not part of any section's reading column, so the left-alignment rule it would otherwise break does not describe it; the centering marks the moment as structural.

This exception is narrow:
- It applies ONLY to a single, short, heading-behaving statement standing alone in its own section - no eyebrow, no supporting body copy, no controls, no graphic.
- Its measure MUST remain tightly constrained (well inside the body-copy ceiling above) so it breaks as a few balanced lines, not a wide band of display type.
- It MUST be used sparingly. A page earns at most one or two such moments; a rhythm of centered bands is a different, unapproved design.
- Ordinary sections, headings, and body copy remain governed by the left-alignment rule above and the shared-left-edge rule in Section 48.6. This exception does not create any allowance for centered body copy.

**Centered CTA supporting copy - approved exception (2026-08-08).** Short supporting body copy MAY be centered when it belongs to a deliberately centered call-to-action composition - heading, supporting line, and action all set on the center axis - and directly supports that heading and action. The paragraph follows the composition it belongs to; it is a close, not a reading column.

This exception is narrow:
- It applies ONLY within a deliberately centered CTA composition. A centered paragraph inside an otherwise left-aligned section remains prohibited.
- The copy MUST be short: no more than four rendered lines at the intended desktop composition.
- Its measure MUST NOT exceed approximately 52ch.
- It does NOT apply to ordinary explanatory sections or long-form body copy, which remain left-aligned under the rule above.
- It MUST be used sparingly - a page-level close, not a recurring section pattern.

### Whitespace

- Whitespace is a primary tool, not leftover space. Generous vertical rhythm between sections is required; crowding is treated as a defect.
- Type MUST NOT be tightened to fit more content into a viewport. Reduce the content instead.

---

# 8. Color System

Purpose: Define the complete color architecture for brand, surfaces, text, borders, semantic states, interaction, charts, accessibility, and print.

Decisions that belong in this section:
- Brand colors
- Surface colors
- Semantic colors
- Text hierarchy
- Border hierarchy
- Interactive colors
- Chart colors
- Print-safe colors
- Accessibility contrast requirements
- Dark/light theme policy

Implementation notes:
- Do not choose colors until approved.
- Every color must become a named token with usage rules.
- Color names should describe role, not raw appearance, unless defining brand primitives.
- Avoid using arbitrary one-off hex values after the system is approved.

Color system philosophy:
- The JiTpro color system is intentionally restrained. Color exists to communicate meaning; it does not exist for decoration.
- Whenever possible, hierarchy should be established using typography, spacing, alignment, and contrast before introducing color.
- The interface should remain understandable even if most colors were removed.
- JiTpro uses a disciplined construction-inspired palette. The product should feel professional, stable, confident, architectural, calm, and deliberate.
- The interface should never feel colorful. Most of the interface should consist of neutral tones. Color should be reserved for information that deserves attention.

Primary color families:
- Deep Navy: represents foundation, trust, stability, and professionalism.
- Slate: represents information, structure, organization, and hierarchy.
- White: represents readability, clarity, negative space, and focus.
- Amber: represents attention, important information, priority, decision points, and current focus.
- Red: represents immediate action required, critical issues, schedule impact, risk, failure, and escalation.

Visual balance standard:
- Approximately 90–95% of the interface should consist of Deep Navy, Slate, and White.
- Only a very small percentage of the interface should use Amber or Red.
- This restraint increases visual clarity and preserves the meaning of attention colors.

Construction philosophy:
- Construction projects are mostly stable. Only a few items require attention.
- The interface should visually reflect that reality: most information should appear neutral, and only exceptions should attract attention.

Future token standard:
- This chapter defines semantic meaning only.
- Specific hex values, CSS variables, Tailwind tokens, and implementation details will be documented later.
- Implementation follows philosophy.

## 8.1 Brand Colors

Purpose: Define official JiTpro brand colors and their allowed uses.

Decisions that belong here:
- Primary brand color
- Secondary brand color
- Accent color(s)
- Logo color rules
- Brand color do/don’t rules

Implementation notes:
- Brand colors should not automatically be used for every interaction state.

Primary brand palette:
- Deep Navy is the foundation color family. It is used for primary backgrounds, navigation, hero sections, major containers, and primary actions.
- Slate is the structural information color family. It is used for cards, surfaces, borders, tables, supporting interface elements, body text, and secondary interface components.
- White is the clarity color family. It is used for primary text, light surfaces, contrast, and whitespace.
- Amber is the attention color family. Amber is not simply an accent color; amber communicates “Look here.” It should be used sparingly for important information, priority, decision points, and current focus. Its effectiveness depends on restraint.
- Red is the escalation color family. It is used only for immediate action required, critical issues, schedule impact, risk, failure, and escalation. Red should never be decorative.

Brand color exclusions:
- Emerald, teal, mint, lime, purple, pink, neon colors, and bright cyan are intentionally excluded from the JiTpro brand identity.
- These colors may only appear if absolutely required for third-party integrations or data visualization.
- Excluded colors should never become part of the JiTpro visual identity.

Brand consistency rules:
- Avoid introducing additional accent colors.
- Avoid rainbow dashboards.
- Avoid decorative gradients.
- Avoid colorful cards.
- Avoid multiple competing accent colors.
- The JiTpro palette should become immediately recognizable through restraint and consistency.

### 8.1.1 APPROVED - Official Brand Colors

Status: APPROVED (2026-08-06). This subsection resolves the "Primary brand color" and "Accent color(s)" decisions listed above. It is binding.

**JiTpro Brand Amber - `#F59E0B`**

`#F59E0B` is the official primary brand color of JiTpro.

Evidence and provenance:
- The value is taken from the JiTpro logo artwork itself, not chosen independently. `public/assets/logo/JiTpro_Amber.svg` renders the mark in `fill="#f59e0b"` against a `#1e293b` wordmark, and `src/components/JiTproWordmark.tsx` uses the same value.
- It is already the dominant amber across the codebase by a wide margin, which makes it the lowest-risk canonical choice.
- It corresponds to Tailwind's `amber-500`, but Tailwind's name is an implementation coincidence, not the authority. The authority is this section.

Brand Amber MUST be used for:
- the logo
- primary call-to-action buttons
- hero eyebrow text
- hero emphasis typography
- timeline structure and static timeline elements
- icons that carry meaning
- links and primary accents

Brand Amber rules:
- Brand Amber is the resting, static identity color. It is what JiTpro looks like when nothing is happening.
- Brand Amber MUST NOT be applied to every interactive element. Its meaning depends on scarcity (see 8.6 and 8.1).
- Brand Amber MUST be referenced through the approved token (Section 8.8), never as a literal.

**JiTpro Active Amber - `#FDE68A`**

`#FDE68A` is the official illuminated/active amber.

Active Amber MUST be used only when an interface element is genuinely active:
- a moving timeline indicator or arrow
- the milestone a moving indicator has currently reached
- an active glow or illuminated state
- animation emphasis that marks "this, right now"
- an interactive control while it is being hovered, pressed, or otherwise engaged (approved 2026-08-06)

Active Amber rules:
- Active Amber MUST NEVER be used as a static brand color. It has no meaning at rest; it exists to distinguish the active element from the brand-colored elements around it.
- If Active Amber appears on a page with no animation and no active state, that is a defect.
- Active Amber MUST be referenced through the approved token (Section 8.8), never as a literal.

**Interactive active states - approved 2026-08-06.** Hover, press, and equivalent engaged states on a control are genuine active states and MAY use Active Amber. A primary action at rest is Brand Amber; the same action under the pointer is Active Amber. This is consistent with the rule above rather than an exception to it: the prohibition is on Active Amber as a *static* color, and a hover is by definition not static.

The corollary matters as much as the permission: where Active Amber expresses the hover, it IS the hover. Section 48.1 permits one hover gesture, and a color change to Active Amber consumes it. Lift, shadow, glow, and icon movement MUST NOT be layered on top of it.

Note also that an amber focus outline on an amber control is low-contrast against the control it is meant to mark. Keyboard focus on amber controls uses `--jp-text-primary` (Section 48.1).

Why two ambers and not one:
- A single amber cannot express both "this is JiTpro" and "this is happening now." The active element must read as brighter than the brand-colored structure it moves across, or the animation stops communicating.
- Two approved values is the minimum that preserves that distinction. Additional amber steps are NOT approved and MUST NOT be introduced without a Decision Log entry (Section 49).

## 8.2 Surface Colors

Purpose: Define backgrounds and elevation surfaces across marketing, app, dashboards, reports, and docs.

Decisions that belong here:
- Page backgrounds
- Section backgrounds
- Card backgrounds
- Elevated surfaces
- Overlay surfaces
- Disabled surfaces
- Print backgrounds

Implementation notes:
- Surface tokens must support dark and light contexts if both are approved.

Surface color standards:
- Deep Navy is the primary dark foundation for major backgrounds, navigation, hero sections, and large containers.
- Slate is the primary structural surface family for cards, tables, secondary panels, supporting interface elements, and organized information regions.
- White is used for readability, light surfaces, negative space, contrast, and focus.
- Surfaces should remain primarily neutral. They should not become vehicles for decorative color.
- Elevated surfaces should use neutral contrast and disciplined hierarchy before relying on accent color.
- Printed reports and documentation should preserve the same semantic discipline: neutral foundations first, attention colors only where meaning requires them.

Surface restraint rules:
- Do not create colorful card systems for visual variety.
- Do not use gradients as a substitute for hierarchy.
- Do not use accent surfaces unless the content deserves attention.
- Most surfaces should support comprehension quietly rather than compete for attention.

## 8.3 Semantic Colors

Purpose: Define status and feedback colors.

Decisions that belong here:
- Success
- Warning
- Danger/error
- Info
- Neutral
- Critical/escalated risk
- Pending
- Blocked
- Approved
- Disabled

Implementation notes:
- Semantic colors require foreground, background, border, and icon tokens.
- Semantic meaning must remain stable across surfaces.

Semantic color language:
- Deep Navy means foundation.
- Slate means information.
- White means readability.
- Amber means needs attention.
- Red means immediate action required.

Success / completed / verified:
- Green is reserved only for successfully resolved, completed, or verified states.
- Green must never be used as a branding color.
- Green must never be used as a general accent color.

Information / external / neutral reference:
- Blue is reserved only for informational states, external systems, and neutral references.
- Blue must never be used as a primary branding color.

Warning and attention:
- Amber communicates that something deserves attention, priority, current focus, or a decision point.
- Amber should not be used merely to make an element feel branded.

Danger, critical, and escalation:
- Red communicates immediate action required, critical issue, schedule impact, risk, failure, or escalation.
- Red should never be decorative.

Semantic discipline:
- Every color must communicate meaning.
- If a designer wants to introduce a new color, they must first answer: “What does this color communicate?”
- If the answer is simply “It looks good,” the color should not be added.

### 8.3.1 APPROVED - Success

Status: APPROVED (2026-08-07). Binding on all production code.

**JiTpro Success Green - `#059669`**, exposed as `--jp-success` (Section 8.8).

Success Green means exactly one thing: **this required step has been successfully completed.** It is a statement of fact about work that is finished, not a mood.

Approved uses:
- completed timeline milestones and their labels
- completed timeline structure - the portion of a sequence already executed
- confirmed successful outcome states

Prohibited uses:
- primary or secondary call-to-action buttons
- headings, body copy, or general accents
- hover, focus, or any other interaction state
- navigation
- icons that do not denote completion
- decoration, or any use whose justification is that the result "looks positive"

**Success Green MUST NOT become a second general JiTpro accent.** Its meaning survives only while it is rare and literal. A surface showing green that a reader cannot point at and say "that finished" is a defect.

**Relationship to the Section 8.1 exclusions.** Section 8.1 excludes emerald from the JiTpro *brand identity* - the colors that say "this is JiTpro". That exclusion stands and is unchanged: Success Green is never a brand color, never an identity color, and never an accent. This token lives under Section 8.3, which has always reserved green for "successfully resolved, completed, or verified" states and has always forbidden it as a branding or general accent color. Identity and state are different jobs; this is state.

**Why this value.** `#059669` measures approximately 5.4:1 against `--jp-background` - clear of the WCAG AA minimum of 4.5:1 at body sizes - and reads as unmistakably green rather than teal. It is materially darker and less saturated than a lime, a fluorescent, or a traffic-light green; the register is a considered emerald, not a safety vest.

Refined from `#10B981` on 2026-08-07. That value was electric against the dark canvas and competed with the amber system for attention, which is the opposite of what a completed state should do. Amber is what is happening now and has first call on the eye; completed work should settle behind it rather than announce itself.

**Color alone MUST NOT carry the meaning** (Section 8.7). Where Success Green marks completion, an accompanying label, state change, or text must carry the same information. Green reinforces a completed state that is already legible without it.

### The four-state color language

| State | Token | Means |
| --- | --- | --- |
| Not yet reached | `--jp-text-secondary`, `--jp-border` | Structure and work still ahead |
| Planned / required | `--jp-brand-amber` | JiTpro structure: what the plan requires |
| Happening now | `--jp-brand-amber-active` | The one element currently active |
| Successfully completed | `--jp-success` | Work confirmed finished |

The active element and the completed trail behind it MUST remain distinguishable. A marker moving through a sequence stays `--jp-brand-amber-active` for the whole of its travel; it does not adopt the completion color of the ground it has covered. Planning and directional graphics stay in the amber system and MUST NOT turn green - the plan is not the execution.

## 8.4 Text Hierarchy

Purpose: Define text color roles by emphasis and background context.

Decisions that belong here:
- Primary text
- Secondary text
- Muted text
- Disabled text
- Inverse text
- Link text
- Accent text
- Error text
- Data text

Implementation notes:
- Each text token must list valid surface backgrounds.

Text hierarchy standards:
- Text hierarchy should be established first through typography, spacing, alignment, and contrast.
- Text color should reinforce hierarchy, not create hierarchy alone.
- Primary text must provide maximum readability against its surface.
- Secondary text should support scanning and comprehension without competing with primary information.
- Muted text should be used for reference information, metadata, timestamps, supporting labels, and non-primary explanations.
- Disabled text should clearly indicate unavailable or inactive states without being mistaken for normal muted content.
- Inverse text must remain readable on Deep Navy, Slate, and any approved dark surface.
- Link and action text should communicate interactivity clearly, but should not overuse Amber unless the action deserves attention.
- Error text must use the Red semantic family only when immediate correction, risk, or failure needs to be communicated.

## 8.5 Border Hierarchy

Purpose: Define border colors by importance, elevation, and state.

Decisions that belong here:
- Subtle border
- Default border
- Strong border
- Interactive border
- Focus border
- Error border
- Selected border
- Divider color

Implementation notes:
- Borders must be defined separately for dark/light surfaces if both exist.

Border hierarchy standards:
- Borders should primarily use neutral tones derived from Slate and related structural surfaces.
- Subtle borders separate information without drawing attention.
- Default borders define cards, tables, forms, containers, and structured regions.
- Strong borders are reserved for active, selected, important, or high-contrast structural needs.
- Focus borders must be visible, accessible, and consistent across keyboard and pointer interaction.
- Error borders must use the Red semantic family only when correction, failure, risk, or immediate action is required.
- Selected borders may use Amber only when the selection represents focus, priority, or a meaningful current decision point.
- Dividers should support structure and scanning without making the interface feel busy.

## 8.6 Interactive Colors

Purpose: Define hover, active, pressed, selected, focus, disabled, and visited states.

Decisions that belong here:
- Primary action states
- Secondary action states
- Ghost action states
- Link states
- Nav item states
- Form control states
- Row/item selection states

Implementation notes:
- Interactive colors must include keyboard focus states, not only mouse hover.

Interactive color standards:
- Interactive states must be predictable, restrained, and meaningful.
- Primary actions may use Deep Navy or Amber depending on whether the action represents foundation/control or priority/attention.
- Amber must not be applied to every interactive element. Its meaning depends on scarcity.
- Secondary actions should rely primarily on Slate, White, border contrast, and clear typography.
- Ghost actions should remain quiet and should not compete with primary actions.
- Selected states should communicate current focus or active context without creating unnecessary visual noise.
- Disabled states should be neutral and clearly inactive.
- Hover, active, pressed, selected, focus, and disabled states must preserve semantic meaning and accessibility.
- Keyboard focus states are required wherever pointer hover states exist.

## 8.7 Accessibility Rules

Purpose: Define minimum color-contrast and non-color-cue requirements.

Decisions that belong here:
- Minimum contrast for body text
- Minimum contrast for large text
- Minimum contrast for UI controls
- Minimum contrast for charts
- Rules for color-blind-safe semantics
- Print contrast rules

Implementation notes:
- WCAG AA should be the minimum unless JiTpro approves a stricter rule.
- Status must not rely on color alone; include icon, label, shape, or text where needed.

Accessibility rules:
- Color must never be the only way information is communicated.
- The interface should remain understandable even if most colors were removed.
- Status, risk, warnings, errors, success, and informational states must include non-color cues such as text, iconography, shape, placement, label, or pattern where appropriate.
- Body text, large text, controls, charts, tables, and printed reports must meet the approved accessibility standard once specific color values are assigned.
- Charts and dashboards must avoid rainbow color systems and must not rely on color alone to explain meaning.
- Printed reports must preserve legibility and semantic meaning in grayscale or limited-color output where possible.

Guiding principle:
- The JiTpro interface should never become more colorful than the construction project it represents.
- Color should communicate priority, never decoration.

---

## 8.8 Approved Design Tokens

Status: APPROVED (2026-08-06). This subsection resolves the token questions raised in Sections 38 and 39 for color, including the neutral token values approved on the same date. It is binding.

Purpose: Give every approved color exactly one name, so that a color can be changed in one place and so that no component ever has to decide what "the amber" is.

Naming convention: `--jp-<role>` or `--jp-<family>-<role>`. Token names describe role, not appearance, with the single exception of the two brand primitives, which are named for the brand itself.

### Approved color tokens

**Brand colors** (approved 2026-08-06, Section 8.1.1):

| Token | Value | Status | Purpose |
| --- | --- | --- | --- |
| `--jp-brand-amber` | `#F59E0B` | APPROVED | Primary JiTpro brand color. Logo, CTA buttons, hero eyebrow, hero emphasis, timeline, icons, links, primary accents. |
| `--jp-brand-amber-active` | `#FDE68A` | APPROVED | Animated emphasis only. Active timeline arrow, active nodes, illuminated highlights, animated emphasis. Never static. |

There is no approved third amber. Any additional amber step requires approval through Section 49 before use.

**Semantic state colors** (approved 2026-08-07, Section 8.3.1):

| Token | Value | Status | Purpose |
| --- | --- | --- | --- |
| `--jp-success` | `#059669` | APPROVED | Confirmed successful completion. Completed milestones, completed sequence structure, confirmed successful outcomes. Never a brand color, never an accent, never an interaction state. |

`--jp-success` is a **state** token, not a brand token. The restrictions in Section 8.3.1 are part of its definition: a use outside them is a defect even where the result looks agreeable.

**Neutral colors** (approved 2026-08-06):

| Token | Value | Status | Purpose |
| --- | --- | --- | --- |
| `--jp-background` | `#020617` | APPROVED | Primary page/background canvas. The deepest, least-lit surface in the hierarchy. |
| `--jp-surface` | `#0F172A` | APPROVED | Secondary elevated or alternating dark surface. Cards, panels, sheets, alternating sections. |
| `--jp-text-primary` | `#F1F5F9` | APPROVED | Primary headings and highest-emphasis text. |
| `--jp-text-secondary` | `#CBD5E1` | APPROVED | Normal body copy and secondary readable text. |
| `--jp-text-muted` | `#94A3B8` | APPROVED | Captions, supporting information, tertiary labels, and intentionally de-emphasized text. |
| `--jp-border` | `#94A3B8` | APPROVED | Structural separation: borders, hairlines, connector lines, dividers, table rules, input outlines, and similar neutral UI structure. Opacity varies by semantic use. |

**Reserved, value deferred:**

| Token | Value | Status | Purpose |
| --- | --- | --- | --- |
| `--jp-shadow` | DEFERRED | Name approved, value deliberately withheld | Elevation shadow color. Depth is expressed through this token, never through a decorative glow. |

### Why three text levels, not two

The neutral set was originally reserved with two text tokens. Implementation review established that three are required.

`--jp-text-primary`, `--jp-text-secondary`, and `--jp-text-muted` represent three genuinely different semantic levels: what the reader must read first, what they read as the substance, and what supports without competing. Collapsing any two of them would remove a distinction the design actually uses.

The muted level in particular cannot be synthesised from the secondary level. `#CBD5E1` reduced in opacity over `#020617` does not reproduce `#94A3B8` - the red channel converges but the blue channel remains materially short, because `#94A3B8` is the bluer color, not merely the dimmer one. Approximating it with opacity would have produced a visibly different value while pretending to be the same one. `--jp-text-muted` is therefore an APPROVED addition to the reserved set rather than an opacity treatment of an existing token.

### Why `--jp-text-primary` consolidates two existing values

Production code previously used two near-identical values for high-emphasis text: `#F8FAFC` for section headings and `#F1F5F9` for sub-headings. They differ by roughly seven points per channel and by 0.87 in contrast ratio against `#020617` - a distinction no reader can perceive, and precisely the "multiple nearly identical grays" this system exists to prevent.

Both consolidate into `--jp-text-primary` at `#F1F5F9`, which is the more widely used of the two across the codebase. Emphasis above body copy is carried by type scale and weight, not by a second, imperceptibly brighter white (Section 47.3).

### Why `--jp-border` shares a value with `--jp-text-muted`

`--jp-border` and `--jp-text-muted` intentionally share the base value `#94A3B8`. They remain separate tokens because they express separate intents: one is text a reader consumes, the other is structure a reader should barely notice. A future decision may move one without the other, and the token names preserve that option.

Sharing a base value is deliberate rather than accidental. Neutral structure and de-emphasized text belong to the same tonal family; expressing them as two different grays would fragment the palette for no communicative gain.

Opacity rules for `--jp-border`:
- Opacity MAY vary according to semantic use. A section divider and a diagram hairline legitimately sit at different weights.
- Varying opacity is NOT permission to create unlimited new visual treatments. Existing approved opacity treatments SHOULD be reused wherever practical.
- If recurring opacity levels prove stable enough to warrant naming, semantic opacity or border tokens MUST be created through the normal approval process in Section 49 - not invented per component.

**Approved subtle divider treatment (2026-08-06).** Section dividers and structural hairlines use `--jp-border` at **12%** opacity. This is a single approved level, replacing the ad-hoc pair of white-alpha treatments previously in production; two divider weights two points apart are indistinguishable and fragment the palette for no communicative gain.

This does NOT make 12% mandatory for every use of `--jp-border`. Functional hairlines inside a diagram - connector lines, leader lines, gradient rules that must remain readable against the surface - MAY retain the perceptual weight their function requires. What is fixed is the hue: the base color MUST always be `--jp-border`, never white, never a slate utility, never a literal.

No opacity tokens are created at this time. If further recurring levels prove stable, they are formalized through Section 49.

### Resolution of `slate-500` and `slate-200` (2026-08-06)

Production contained two neutrals with no approved token: `#64748B` (`slate-500`) for de-emphasized sequence numbers and a quiet indicator, and `#E2E8F0` (`slate-200`) for one control's hover.

Neither becomes a token. The approved three-level text set already spans the required range, and neither use expresses a semantic level that set does not cover:
- Text quieter than muted is `--jp-text-muted` at reduced opacity, per Section 45.4.
- A control resting at `--jp-text-muted` brightens to `--jp-text-primary` on hover. Moving up the existing scale is the approved way to express engagement in neutral text.

Adding two more grays adjacent to values already approved is precisely the failure Section 8 exists to prevent.

### Why `--jp-shadow` remains deferred

No neutral shadow requirement currently exists. Review of the marketing homepage found no neutral shadow of any kind; the only shadows present are amber emphasis glows that derive from `--jp-brand-amber`.

A token is not approved merely because its name was reserved. `--jp-shadow` stays reserved with no value until a real elevation requirement appears, and MUST NOT be referenced in production until then.

### Rules for reserved tokens

- A reserved token MUST NOT be referenced in production code until its value is APPROVED and recorded in the Decision Log.
- Introducing a value for a reserved token is a design-system change and follows Section 49, not a component-level decision.
- The reserved list is deliberately small. Additional tokens require a Decision Log entry; the system should not grow a token per component.

### Recorded migration decision: hero cool depth wash

**Final decision (2026-08-06): the bespoke cool hero wash is REMOVED, not tokenized and not replaced.**

The marketing hero contained the bespoke literal `rgba(51, 74, 120, 0.30)`, used as a cool depth wash behind the hero content. It corresponded to no approved token and to no Tailwind slate - it is bluer than `slate-700` `#334155`.

Standing rejections, unchanged:
- This value does **not** become a component-specific design token. `--jp-hero-glow-cool`, or any equivalent hero-scoped color token, is explicitly rejected. Component-scoped color tokens defeat the purpose of the token layer: they turn a shared system into a collection of private palettes, and each one makes the next one easier to justify.
- `slate-700` `#334155` is **not** added to the neutral token set for this purpose.

Superseded: an earlier decision on the same date required the literal to be replaced with a `#334155`-derived opacity treatment. Implementation review established that no conformant expression of that treatment existed - a raw `rgba()` and a `slate-700` utility are both prohibited by Section 8.9, and a token was not wanted. A migration obligation with no conformant implementation is not a decision that can stand.

The wash is decorative. It carries no information, and Section 47.4 answers the question directly: what is lost by removing it is that the hero looks plainer, which is the goal. A decorative effect is not grounds for expanding the token system.

If a recurring cool-lighting role later emerges across multiple JiTpro interfaces, it MAY be evaluated as a semantic design token at that time, through Section 49. One hero is not a role.

### Token expansion, deferred

Motion, spacing, radius, elevation, typography, and breakpoint tokens are not yet approved. Sections 11, 12, 13, 15, and 35 remain the place those decisions live. Until they are approved, existing implementation values remain in force but MUST NOT be treated as canonical (Appendix C).

---

## 8.9 Color Governance

Status: APPROVED (2026-08-06). Binding on all production code.

Purpose: Prevent the failure this section exists because of - the same color arriving in five slightly different values because each component chose independently.

### Prohibited in production components

Production components MUST NOT reference:
- `amber-300`, `amber-400`, `amber-500`, or any other Tailwind amber utility
- raw hexadecimal color values (`#F59E0B`, `#fbbf24`, `#fde68a`, and so on)
- RGBA amber literals (`rgba(245, 158, 11, 0.5)` and similar)
- arbitrary-value Tailwind color syntax carrying a literal, such as `bg-[#F59E0B]` or `text-[rgba(245,158,11,0.8)]`

This prohibition applies equally to:
- Tailwind class names
- inline `style` objects
- SVG presentation attributes (`fill`, `stroke`, `stop-color`)
- CSS-in-JS and template literals
- generated or injected stylesheets

SVG is called out explicitly because it is where the drift historically began: SVG attributes cannot accept Tailwind class names, so authors reached for hex literals and the palette split.

### Required instead

- All components MUST reference the approved tokens from Section 8.8.
- Opacity variation on an approved color is permitted and is the correct way to express a lighter or dimmer treatment. It MUST be expressed against the token, not against a new literal.
- If a design calls for a color that no approved token expresses, the correct response is to stop and follow Section 49 - not to pick a near-miss value.

### Approval requirement

- All future brand colors MUST be approved inside this Design System, recorded in the Decision Log, and given a token, before any production use.
- A color that appears in a component but not in Section 8.8 is a defect, regardless of how good it looks.
- A Tailwind utility currently used in the website is not automatically an official token (Appendix C).

### Enforcement

- Code review MUST reject color literals in components.
- A lint rule forbidding hex and Tailwind color utilities in `src/components/**` and `src/pages/**` SHOULD be added; until it exists, review is the control.
- The audit at `docs/design/current-theme-audit.md` is evidence of the pre-governance state. It is a record of what exists, not a list of what is permitted.

---

# 9. Grid System

Purpose: Define the layout grid used to align content across surfaces.

Decisions that belong in this section:
- Column counts by breakpoint
- Gutters
- Margins
- Max widths
- Nested grid rules
- Dashboard grid rules
- Print/report grid rules

Implementation notes:
- Grid rules must cover marketing pages, application screens, dashboards, and reports separately if needed.
- Use token names and implementation mapping later; do not hard-code values here until approved.

Grid system philosophy:
- The JiTpro grid system exists to create consistency, predictability, and visual discipline.
- Users should never consciously notice the grid. They should simply feel that every page is organized.
- Every page should feel engineered rather than assembled.
- Alignment must be intentional. Content should naturally fall into predictable columns and rows.
- The grid should reduce cognitive effort by making page structure immediately understandable.

Marketing container strategy:
- The marketing website should use a consistent page container so pages feel related to one another.
- Container widths should not change arbitrarily between sections.
- Wider containers may be used for structured visual systems, feature grids, timelines, and comparison layouts when additional width improves comprehension.
- Narrower containers should be used only when doing so improves readability, focus, or hierarchy.
- Reading comfort takes priority over filling horizontal space.

Content-width standards:
- Readable text should never stretch excessively across large monitors.
- Long-form copy, educational explanations, and narrative sections should maintain comfortable line lengths.
- Large displays should provide stronger composition, not longer lines.
- Layouts must scale gracefully across desktop, tablet, and mobile devices without sacrificing clarity, readability, or hierarchy.

Marketing column model:
- Single-column layouts are preferred for storytelling, founder perspective, primary explanations, and sections where one message must be understood before the next.
- Two-column layouts are preferred for explanation, contrast, problem/response structures, text paired with visual support, and educational sections where one idea benefits from a supporting panel.
- Three-column layouts are preferred for feature comparisons, role comparisons, grouped benefits, structured lists, and parallel concepts of equal weight.
- Avoid unnecessary column complexity. If fewer columns communicate more clearly, use fewer columns.
- Avoid complex asymmetrical layouts unless they improve hierarchy and comprehension.

Alignment standards:
- Strong alignment is one of JiTpro’s defining visual characteristics.
- Margins, cards, buttons, text blocks, visual panels, and repeated section elements should align consistently.
- The interface should communicate order before the user reads a single word.
- Misalignment may be used only when it has a clear hierarchy or storytelling purpose.
- Random offsets, one-off indents, and decorative staggered layouts should be avoided.

Whitespace and grouping:
- Whitespace should be used to group related information and separate distinct ideas.
- Groups should be obvious without relying on borders.
- Spacing should communicate relationships naturally: items that belong together should feel connected, and separate ideas should have enough breathing room to be understood as separate.
- Whitespace should make the page easier to scan, not merely more spacious.

Future grid expansion:
- Application, dashboard, documentation, and printed report grids must be defined separately when those surfaces are formally specified.
- Breakpoint values, column counts by breakpoint, gutters, margins, and max-width tokens remain implementation-token decisions and must be documented later before being treated as final values.

---

# 10. Layout Rules

Purpose: Define how pages and screens are composed.

Decisions that belong in this section:
- Page shell rules
- Header/nav placement
- Footer placement
- Sidebar rules
- Content area rules
- Section stacking rules
- Empty margin rules
- Above-the-fold rules
- Print/report layout rules

Implementation notes:
- Layout rules should prevent each page from inventing its own composition system.
- Rules should describe hierarchy, alignment, and density, not just dimensions.

Marketing page layout model:
- Every marketing page should guide users through a clear story.
- Pages should never feel like collections of unrelated sections.
- Every section should naturally lead into the next.
- The page structure should create recognition before explanation and explanation before action.

Recommended marketing flow:
1. Problem
2. Recognition
3. Education
4. JiTpro Framework
5. Solution
6. Proof
7. Call to Action

Flow standards:
- The recommended flow is a default model, not a rigid template. Pages may adjust the sequence when the page purpose requires it, but the reading path must remain clear.
- A page should establish the problem before asking users to understand JiTpro’s framework.
- Education should make the user feel understood before product language becomes prominent.
- Proof should support the argument already developed by the page, not interrupt it.
- Calls to action should feel like a natural next step, not a visual interruption.

Reading-flow standards:
- Users should never wonder, “What am I supposed to read next?”
- Layouts should naturally guide the eye from primary message to supporting detail to next action.
- Typography, spacing, and hierarchy should guide reading flow before color, graphics, or animation are introduced.
- The most important idea in a section should be visually obvious without requiring the user to read everything first.

Section design standards:
- Every section should have one clear purpose.
- Avoid sections that attempt to communicate multiple unrelated ideas.
- One section should communicate one primary message.
- Supporting copy, cards, visuals, and actions within a section must reinforce that primary message.
- If a section requires several unrelated explanations, split it into separate sections or simplify the message.

Visual-balance standards:
- Every page should feel balanced from top to bottom.
- Avoid stacking multiple visually heavy sections together.
- Alternate information density with breathing room to create a comfortable reading rhythm.
- Dense informational sections should be followed by simpler, more focused sections when possible.
- Large visuals, complex diagrams, dense card grids, and heavy copy blocks should be distributed intentionally across the page.

Responsive layout philosophy:
- Responsive design is not simply shrinking desktop layouts.
- Each breakpoint must preserve clarity, readability, and hierarchy.
- Mobile users should receive the same message, not a reduced experience.
- Mobile layouts may simplify structure, reduce columns, reorder supporting visuals, or collapse secondary detail when doing so improves comprehension.
- Responsive changes should protect the story, hierarchy, and next action rather than merely fitting content into available space.

Header and section-header standards:
- Page headers should establish the primary page promise and orient the user immediately.
- Section headers should introduce one clear idea and prepare the user for the content that follows.
- Headings, supporting text, and visual content should work together as a single hierarchy.
- Headers should not be decorative labels. They should clarify the role of the page or section.

Guiding principle:
- If users notice the layout, it is probably trying too hard.
- Great layouts become invisible. They help users understand information more easily without calling attention to themselves.
- Layout exists to create clarity, rhythm, and trust.

Future layout expansion:
- SaaS application shell, internal dashboard shell, documentation layout, and printed report layout rules remain future decisions and must be defined in their respective chapters before implementation.

---

# 11. Spacing System

Purpose: Define spacing tokens and how they are applied to components, sections, page shells, reports, and data-dense screens.

Decisions that belong in this section:
- Base spacing unit
- Spacing scale
- Inset spacing
- Stack spacing
- Inline spacing
- Section spacing
- Component spacing
- Dense-mode spacing
- Print spacing

Implementation notes:
- Spacing tokens must be named and mapped to Tailwind once approved.
- Components should use semantic spacing roles where possible.

Spacing philosophy:
- Spacing is one of JiTpro’s most important design tools.
- Spacing creates clarity, hierarchy, and calm.
- Spacing reduces cognitive load.
- Whitespace is not empty space. Whitespace is an active design element.
- JiTpro should feel calm. The interface should breathe. Users should never feel visually crowded.
- Generous spacing communicates confidence. Crowded interfaces communicate uncertainty.
- Whenever possible, increase clarity by adjusting spacing before introducing additional colors, borders, or visual elements.

Base spacing system:
- JiTpro follows an 8-point spacing system.
- All major spacing should be based on multiples of eight.
- Approved conceptual increments include 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, and 128.
- Smaller adjustments may use 4-point increments when necessary.
- Avoid arbitrary spacing values unless absolutely required.
- Consistency is more important than mathematical perfection.
- Exact Tailwind classes, CSS variables, and implementation tokens will be defined later.

Vertical rhythm:
- Pages should establish a predictable reading rhythm.
- Users should naturally understand where one section ends and another begins.
- Every page should feel composed rather than assembled.
- The vertical rhythm should remain consistent across the entire website and application.

Whitespace:
- Whitespace should be treated as content.
- Empty space improves comprehension.
- Do not fill empty space simply because it exists.
- A page with fewer elements often communicates more effectively.

Section spacing:
- Major sections should feel distinct.
- Each section should have enough breathing room to establish separation without feeling disconnected.
- Avoid stacking large sections too closely together.
- Section spacing should support a clear reading sequence and predictable page rhythm.

Card spacing:
- Cards should never feel cramped.
- Internal spacing should prioritize readability.
- Content should never touch card edges.
- Cards should appear comfortable rather than compressed.
- Card spacing should clarify the relationship between title, supporting text, actions, metadata, and nested content.

Form spacing:
- Forms should guide users naturally from one field to the next.
- Labels, inputs, validation messages, and helper text should maintain consistent vertical spacing.
- Forms should feel calm and approachable.
- Form spacing should make it obvious which label, helper text, validation message, and control belong together.

Table density:
- Tables are one of JiTpro’s primary interface elements.
- Tables should prioritize readability over maximum information density.
- Rows should be comfortably scannable.
- Columns should align cleanly.
- Whitespace should help users compare information quickly.
- Dense modes may exist only when they preserve scanning, alignment, and comprehension.

Dashboard density:
- Dashboards should avoid becoming visually noisy.
- Information should be grouped into logical clusters.
- Spacing should communicate relationships before borders do.
- The user should immediately understand how the dashboard is organized.

Alignment:
- Strong alignment creates trust.
- Elements should line up intentionally.
- Random offsets should be avoided.
- Consistent alignment communicates craftsmanship.

Consistency:
- Spacing decisions should never vary randomly between pages.
- Users should begin to recognize the spacing system without consciously noticing it.
- Consistency reduces cognitive effort.

Print spacing:
- Printed reports should preserve the same spacing philosophy as digital surfaces.
- Print layouts should use whitespace to improve comprehension, separate sections, and make tables easier to scan.
- Print density should not sacrifice clarity for the sake of fitting more information on a page.

Guiding principle:
- If a layout feels busy, first increase whitespace.
- If a layout feels confusing, first improve alignment.
- Spacing should solve problems before additional visual decoration is introduced.

---

# 12. Border Radius Standards

Purpose: Define shape language and radius tokens.

Decisions that belong in this section:
- Radius scale
- Which components use which radii
- Rounded vs square UI policy
- Pill/badge rules
- Report/print shape rules

Implementation notes:
- Radius should communicate hierarchy and brand personality consistently.
- Avoid one-off arbitrary radii after tokens are approved.

Border radius philosophy:
- Border radius should communicate refinement, not personality.
- JiTpro should avoid both sharp, mechanical interfaces and overly rounded consumer interfaces.
- The goal is quiet sophistication.
- Corners should feel intentional, balanced, and professionally resolved.
- Rounded corners may improve readability and visual comfort, but they should never become the primary visual feature of a component.

Shape character:
- JiTpro interfaces should remain calm, precise, and professional.
- Excessive rounding can make interfaces feel playful, casual, or consumer-oriented.
- Sharp corners can feel unnecessarily harsh, rigid, or mechanical.
- The system should remain between those extremes: refined enough to feel comfortable, structured enough to feel serious.

Consistency standards:
- Use a very small number of radius sizes throughout the product.
- Avoid introducing new radius values for individual components.
- Consistency is more important than variety.
- Users should subconsciously recognize the design language through repeated corner behavior.
- Similar components should use similar radius treatment unless hierarchy or function clearly requires a difference.

Component character standards:
- Buttons should be slightly rounded, professional, and confident. Button corners should support clickability without making the button feel soft or playful.
- Inputs should remain consistent with buttons so form elements feel related to actions and controls.
- Cards should use more generous rounding than buttons so grouped content feels comfortable and approachable without becoming decorative.
- Panels should remain consistent with cards when they serve a similar grouping function.
- Tables should use minimal rounding so data remains visually structured, precise, and easy to scan.
- Modals and overlays may use enough radius to feel elevated and finished, but should remain disciplined and consistent with the broader system.
- Badges and pills may use stronger rounding when their shape helps identify compact labels or statuses, but should not introduce a playful tone.

Visual discipline:
- Corners should support the interface. They should never become a design motif by themselves.
- Do not vary corner radius to create novelty between sections.
- Do not use exaggerated rounded containers as a substitute for hierarchy, spacing, or content organization.
- Do not mix sharp, medium, and highly rounded shapes arbitrarily on the same screen.

Future radius specification:
- Exact radius tokens, component mappings, and print/report shape rules remain future implementation decisions.
- Once approved, radius values should be tokenized and reused consistently across components.

---

# 13. Elevation and Shadows

Purpose: Define depth, layering, shadows, borders, and overlays.

Decisions that belong in this section:
- Elevation scale
- Shadow tokens
- Border-as-elevation rules
- Overlay/scrim rules
- Sticky/nav elevation
- Modal/dialog elevation
- Print equivalents

Implementation notes:
- Dark interfaces should often rely on borders and surface contrast rather than heavy shadows.
- Elevation should be meaningful, not decorative.

Elevation and shadow philosophy:
- Shadows should communicate depth, never decoration.
- JiTpro should rely primarily on spacing, contrast, alignment, and hierarchy before using shadows.
- Shadows should be subtle, functional, and disciplined.
- Most components should appear grounded rather than floating.
- Depth should be understated and should support comprehension.

Shadow usage standards:
- Shadows may be used to communicate elevation, layer separation, interactive affordance, modal hierarchy, focus, or temporary overlap.
- Shadows should not be used simply to create visual interest.
- Large floating shadows should be avoided.
- Shadow use should be rare enough that elevation retains meaning when it appears.
- If a border, surface contrast, or spacing can communicate the same relationship more clearly, prefer that approach before adding shadow.

Visual discipline:
- Avoid heavy shadows.
- Avoid blur-heavy shadows.
- Avoid decorative glow effects.
- Avoid floating card aesthetics.
- Avoid large soft shadows common in startup landing pages.
- Avoid layered glass effects as a primary depth system.
- JiTpro should feel engineered rather than fashionable.

Hierarchy standards:
- Lower layers should appear stable and grounded.
- Higher layers should appear only slightly elevated unless they require modal priority.
- Cards should receive minimal elevation, if any.
- Modals and dialogs should receive the greatest elevation because they temporarily sit above the rest of the interface.
- Sticky navigation, dropdowns, and overlays may use elevation only to clarify layer order and preserve readability.
- Most layout hierarchy should come from spacing, alignment, typography, and surface contrast rather than shadows.

Border-as-elevation standards:
- Dark interfaces should often rely on borders, surface contrast, and controlled spacing instead of shadow.
- Borders may define containers, separate layers, and communicate structure without making elements appear to float.
- Border and surface contrast should be preferred when the interface needs to feel like professional documentation rather than layered paper.

Construction documentation standard:
- The interface should resemble professional documentation: structured, organized, precise, and clear.
- It should not resemble floating paper, stacked cards, layered glass, or decorative depth effects.
- Structure should come from organization, not visual tricks.

Guiding principle:
- If removing a shadow improves clarity, remove the shadow.
- If spacing can solve the problem, use spacing instead.
- Shadows should always be the secondary solution.

Future elevation specification:
- Exact elevation levels, shadow tokens, overlay treatments, modal treatments, sticky-header behavior, and print equivalents remain future implementation decisions.
- Once approved, shadow and elevation behavior should be tokenized and applied consistently across components.

---

# 14. Motion Philosophy

Purpose: Define why JiTpro uses motion and when motion should be avoided.

Decisions that belong in this section:
- Motion personality
- Allowed motion purposes
- Forbidden motion purposes
- Marketing vs app motion differences
- Data visualization motion rules
- Reduced-motion policy

Implementation notes:
- Motion should support comprehension, sequencing, feedback, or continuity.
- Motion should not delay task completion in the application.
- All motion must respect reduced-motion preferences.

TODO:
- TODO: Define approved motion personality.
- TODO: Define when cinematic motion is allowed.
- TODO: Define when motion must be minimal.
- TODO: Define reduced-motion requirements.

APPROVED resolution:
- The approved motion personality, the communicate-not-decorate rule, and the reduced-motion requirement are defined in **Section 46, Animation Standards**. Section 46 is binding and supersedes the TODOs above.

---

# 15. Motion Specifications

Purpose: Define exact motion tokens and component behavior once approved.

Decisions that belong in this section:
- Duration tokens
- Easing tokens
- Delay rules
- Enter/exit patterns
- Hover/focus transitions
- Loading animations
- Skeleton behavior
- Page transition rules
- Chart/timeline animation rules

Implementation notes:
- Motion tokens should map to CSS variables/Tailwind utilities/Framer Motion constants later.
- Do not implement new arbitrary timing values once this system is approved.

TODO:
- TODO: Define duration tokens.
- TODO: Define easing tokens.
- TODO: Define transition presets.
- TODO: Define page transition policy.
- TODO: Define chart/timeline animation policy.
- TODO: Define loading-state motion policy.

APPROVED resolution:
- The timeline animation policy, and the shared-state synchronization requirement that governs it, are defined in **Section 46, Animation Standards**. Section 46 is binding for any composed animation.
- Duration, easing, and transition tokens remain TODO. Until approved, existing implementation values remain in force but are not canonical (Appendix C).

---

# 16. Iconography

Purpose: Define icon style, sizing, semantic use, and library strategy.

Decisions that belong in this section:
- Icon library
- Stroke style
- Size scale
- Color rules
- Semantic icon mapping
- Custom icons
- Logo vs icon rules
- Print icon rules

Implementation notes:
- Current code uses `lucide-react`, but official strategy is TODO until approved.
- Icons must not carry meaning by color alone.

TODO:
- TODO: Approve icon library.
- TODO: Define icon size tokens.
- TODO: Define icon color rules.
- TODO: Define semantic icon map.
- TODO: Define custom icon policy.
- TODO: Define print icon behavior.

---

# 17. Photography

Purpose: Define photographic direction for marketing, founder content, reports, documentation, and application contexts.

Decisions that belong in this section:
- Subject matter
- Lighting style
- Cropping rules
- Color grading
- People/jobsite/product balance
- Founder photography rules
- Stock photography policy
- Report/document image rules

Implementation notes:
- Photography should support trust and field credibility.
- Do not add generic construction imagery without approved direction.

TODO:
- TODO: Define approved photography style.
- TODO: Define prohibited photography style.
- TODO: Define founder portrait usage rules.
- TODO: Define jobsite image rules.
- TODO: Define stock photography policy.
- TODO: Define image treatment overlays/crops.

## 17.1 APPROVED - Documentary project-team photography and the integrated treatment

Status: APPROVED (2026-08-18). Direction supplied by Jeff Kaufman. Binding on marketing surfaces.

### Role

Photography on marketing surfaces is **evidence for an argument the section is already making in words** - never decoration, never generic atmosphere, and never a hero background. A photograph earns its place the same way any visual does (Section 47.4): by making an abstract claim tangible. If the section's argument would read the same without the photograph, the photograph is wrong.

This narrows - it does not lift - Section 48.8's prohibition on stock photography and generic construction imagery. Approved photography must show the **real working mechanism** the section describes: a project team surrounded by project information - drawings, schedules, selections - doing the actual coordination work the copy argues about. Cranes-at-sunset, hard-hat handshakes, and imagery that would be equally at home on any other company's site remain prohibited. Each photograph and its placement require explicit approval recorded in the Decision Log.

### The integrated treatment

A photograph placed on a JiTpro dark surface MUST be integrated into the site's restrained visual language, not dropped in as a bright rectangle:

- **Tonal integration (amended 2026-08-18).** All darkening is carried by the blending overlay alone - the photograph itself carries no global brightness/saturation filter, so wherever the overlay has released, the scene stands at its full natural brightness. The subject - people, drawings, the work - MUST remain immediately recognizable within the blended zones; if the blending makes the subject ambiguous, it has gone too far.
- **Edge dissolve.** Where the photograph meets the reading column, its edge dissolves into the section background using gradient stops built **only** from `--jp-background` (Section 8.9 - no color literals, including in gradients and masks). The dissolve is invisible as a technique: no decorative gradient, no diagonal, no visible panel edge.
- **No frame.** No card border, no visible container, no corner radius. The photograph belongs to the section, not to a card (Section 48.2).
- **Subordinate to the headline.** The hierarchy of Section 47.3 stands: headline first, explanatory copy second, photograph third. A photograph MUST NOT compete with the section's headline for attention.

### Composition

- Desktop composition is environmental, not a two-column image card (amended 2026-08-18): the text holds the shared left edge (Section 48.6), and the photograph - at its native aspect ratio, the full original scene - fills the entire height of the movement it supports and forms the visual environment of its right side, reaching left beneath the copy as far as its proportions require.
- The dissolve spans the whole movement rather than the photograph: held near-solid across the reading zone - the copy fully readable while the left of the scene remains faintly present beneath it, never erased - then releasing rightward until the scene stands clear. The photograph's physical left edge is completely swallowed - there is no findable seam where it begins, and no dark margins above or below that would make it read as a placed rectangle.
- Prefer the complete native composition over deliberate cropping. Where a presentation cannot hold the full scene, crop via `object-fit: cover` with an intentional `object-position` toward the subject - the people, the drawings, the interaction. Never distort the source.
- Tablet and mobile stack: headline and introductory copy first, then the photograph in a wide cinematic crop with the same tonal treatment. The horizontal edge dissolve is removed where the stacked layout makes it meaningless.

### Delivery

- Ship an optimized WebP derived from the retained source asset, with responsive `srcset`/`sizes` so no width downloads substantially more image than it renders.
- Reserve the layout with an explicit aspect ratio - a photograph MUST NOT shift layout while loading.
- Photography adjacent to the initial viewport loads eagerly; lazy-loading that visibly pops in during the first scroll is prohibited.

### The terminal field band (approved 2026-08-25)

A photograph MAY be presented as a **full-container band closing the section whose argument it completes**, rather than as an environmental composition beside the copy. This is the one approved presentation in which the photograph is not flanked by the reading column.

The band is a **terminal beat, never a transition**. It exists to show the field condition the section has just explained, at the moment the explanation lands.

- The band MUST close a section that has already made its argument in words, and MUST carry **one short line naming what the reader is looking at** — the Section 17.1 role rule is not relaxed. A wordless band standing on its own is decorative pacing and is prohibited.
- The band MUST NOT be a standalone section. A photograph that separates two arguments is a palate cleanser; a photograph that concludes one is evidence.
- No dissolve: the dissolve exists only where text overlaps the image, which does not occur here. No frame, no border, no radius, no filter, no animation (Sections 17.1, 48.2).
- The band holds the section's own horizontal container and carries no vertical padding of its own, so it reads as part of the section rather than an inserted card.
- The existing crop ladder applies: the native composition at desktop, the established cinematic crops below it via `object-fit`, explicit aspect ratios reserving the layout.

First approved use: the structural-steel field condition closing the homepage methodology section (Decision Log 2026-08-25).

---

## 17.2 APPROVED - Founder presence on marketing surfaces

Status: APPROVED (2026-08-25). Direction supplied by Jeff Kaufman.

Founder presence is a **credibility instrument, not a biography**. It exists to answer one buyer question — *did the people who built this method actually do this work?* — and it is finished the moment that question is answered.

**Reverses the 2026-08-04 homepage decision** that removed the founder section outright (recorded in `src/archive/homepage/README.md`). That decision was right about what it removed — a founder-centric section competing with the contractor's own story — and wrong as a general rule, because it left the site with no owner for the trust question at all. The reversal is narrow and carries constraints, not a licence to restore what was removed.

**Required**
- The section is about **the work and the experience behind the method**, never about celebrating the person. Its heading names the work, not the man.
- Credibility MUST be carried by **specific construction experience** a contractor recognizes from their own projects — meetings attended, conditions managed, failures witnessed — never by generic credentials, years of service, or dollar volume.
- Exactly **one quiet path** to the deeper founder or about story: a text or hairline link, never a second primary action (Section 48.1).

**Prohibited**
- An oversized founder card, a hero-scale portrait, or a portrait that competes with the section heading.
- A résumé, a credential list, an accomplishments tally, or a figure describing career volume.
- A display-scale first-person pull quote.
- Any treatment in which the founder, rather than the reader's project, becomes the subject of the page.

**Portraiture**
- Restrained and late: the portrait is subordinate to the copy it supports and MUST NOT be the first thing the section presents.
- Frameless and token-only, consistent with Section 17.1 — no card, no border, no radius, no decorative treatment.
- The Section 17.1 delivery rules apply unchanged.

First approved use: the homepage trust section (Decision Log 2026-08-25).

---

# 18. Illustration Style

Purpose: Define non-photographic visuals including diagrams, hero graphics, procurement flows, timelines, and report illustrations.

Decisions that belong in this section:
- Illustration style
- Diagram style
- Use of construction/render imagery
- Use of timelines/Gantt/flow visuals
- Level of abstraction
- Stroke/fill rules
- Print behavior

Implementation notes:
- Illustration style must connect to JiTpro’s product logic, not generic SaaS decoration.
- Complex visuals should have simplified versions for mobile and print.

TODO:
- TODO: Define official illustration style.
- TODO: Define official diagram style.
- TODO: Define whether Gantt/timeline visuals are core brand primitives.
- TODO: Define mobile simplification rules.
- TODO: Define print simplification rules.

---

# 19. Charts and Data Visualization

Purpose: Define how JiTpro presents data, risk, schedule, constraints, procurement sequence, margin, and project health.

Decisions that belong in this section:
- Chart types
- Chart palette
- Status/risk encoding
- Axis/label typography
- Gridlines
- Legends
- Tooltips
- Empty states
- Thresholds
- Print/export rules

Implementation notes:
- Charts must prioritize interpretation and operational decision-making.
- Risk/status must use more than color alone.
- Data visualization rules must be consistent across app, dashboard, investor pages, and printed reports.

TODO:
- TODO: Define approved chart types.
- TODO: Define chart color palette.
- TODO: Define schedule/timeline visual standards.
- TODO: Define risk encoding system.
- TODO: Define chart label and tooltip rules.
- TODO: Define printed chart rules.
- TODO: Define data source/citation visual rules.

---

# 20. Marketing Website Guidelines

Purpose: Define how the design system applies to public marketing surfaces.

Decisions that belong in this section:
- Page structure
- Hero rules
- CTA rules
- Proof sections
- Founder sections
- Role pages
- Landing pages
- SEO/content page layout
- Forms on marketing pages

Implementation notes:
- Marketing pages can express the brand more cinematically than app pages only if approved.
- Marketing guidelines must still use official tokens/components.
- Public-facing wording must respect JiTpro external language governance.

TODO:
- TODO: Define marketing page template(s).
- TODO: Define homepage hero rules.
- TODO: Define role-page rules.
- TODO: Define CTA placement and style rules.
- TODO: Define founder/story section rules.
- TODO: Define proof/data section rules.

APPROVED resolution:
- Founder/story section rules are defined in **Section 17.2**, which is binding. That TODO is superseded.
- Proof and data-figure rules are defined in **Section 48.10**, which is binding. That TODO is superseded.
- Homepage messaging standards are defined in **Section 20.1** below. The remaining TODOs stay open.

## 20.1 APPROVED - Homepage messaging standards

Status: APPROVED (2026-08-25). Direction supplied by Jeff Kaufman. Scope: the marketing homepage. Other surfaces are governed by their own decisions and are not changed by this section.

### Retired language: the word may not appear; the mechanism must

The 2026-08-04 rebuild retired **"procurement"** and **"margin"** from the homepage, along with describing JiTpro as software or as "a layer" (recorded in `src/archive/homepage/README.md`). That record had no owner, no date attribution, and no Decision Log entry. It is now recorded properly, and it is **scoped**:

- The retired **words** MUST NOT appear in homepage-facing copy.
- The **mechanism those words name MUST be taught**, in operational detail, using construction language the reader already owns: scope, products, materials, services, decisions, information, responsibilities, commitments, submittals, approvals, fabrication, release, delivery, Required Onsite Dates, and backward planning.
- Retiring a word is not permission to describe the work vaguely. A homepage that avoids the category word by becoming abstract has failed this rule, not satisfied it.
- This resolves the standing tension with the Brand Voice section's teach-then-name sequence: on the homepage the teaching happens and the naming does not. Brand Voice governs every other surface unchanged.

### The operating requirement

The homepage's account of what JiTpro is for MUST be expressed as an **operating requirement and the controls built around it** — never as a guaranteed outcome.

The requirement has two halves, and both are load-bearing:

- **What** — the correct product or specification has been defined and approved for installation.
- **When** — it is available at the moment the field is ready for it.

JiTpro's role is to establish and manage the upstream planning, visibility, responsibilities, commitments, decisions, approvals, and timing that support that condition. Everything upstream is planned and managed backward from it.

**Prohibited formulations.** The homepage MUST NOT state or imply a delivery guarantee, a quality or conformance warranty, that JiTpro replaces the project manager's or design team's conformance responsibilities, or that JiTpro controls supplier or fabricator execution. Absolute pairs that read as guarantees — of the form "not late, not wrong" — MUST NOT be used. Section 1's position stands: JiTpro creates visibility, not optimism, and the live FAQ answers the guarantee question with a flat "No."

This is a rule about **claim strength, not ambition.** The objective is not weakened; it is described as a requirement JiTpro builds controls around rather than an outcome it warrants.

### Audience: qualitative only

The homepage MUST NOT publish a revenue band, employee count, project-value band, or any other numerical qualification of its audience. No such figure is approved anywhere in this system, and the live surfaces that carry one do not agree with each other.

The audience is a **growth-stage general contractor: a successful contractor whose project complexity has begun to outgrow the systems used to manage it.** That sentence is the definition, not the copy — the homepage MUST let the reader recognize themselves through symptoms they would describe in their own words (more dependencies, more people, information in more places, more chasing, late discovery, manual systems getting harder to hold, growing dependence on intervention) rather than through a management-consulting diagnosis.

The target contractor MUST NOT be portrayed as dysfunctional, disorganized, or failing. They are successful and reaching the limits of the operating methods that brought them here. Copy implying otherwise is a defect against Section 2 and Section 47.1.

---

# 21. Application Guidelines

Purpose: Define design rules for the JiTpro SaaS product interface.

Decisions that belong in this section:
- App shell
- Navigation model
- Screen density
- Primary workflows
- Data-entry rules
- Risk/status display
- Constraint/procurement objects
- Permissions/roles display
- In-product help

Implementation notes:
- Application UI must prioritize speed, clarity, and low cognitive load.
- Marketing drama should not compromise operational efficiency.

TODO:
- TODO: Define app shell.
- TODO: Define screen templates.
- TODO: Define density standards.
- TODO: Define object-detail page structure.
- TODO: Define workflow stepper/wizard rules.
- TODO: Define in-app help pattern.

---

# 22. Dashboard Guidelines

Purpose: Define dashboard rules for executives, internal operators, project health, procurement status, and analytics views.

Decisions that belong in this section:
- Dashboard information hierarchy
- KPI cards
- Alerts/risk panels
- Filters
- Time ranges
- Drill-down rules
- Density rules
- Internal vs customer dashboard differences

Implementation notes:
- Dashboards must answer what matters, what changed, what is at risk, and what action is required.
- Do not overload dashboards with charts without defined decision purpose.

TODO:
- TODO: Define dashboard layout templates.
- TODO: Define KPI card patterns.
- TODO: Define alert/risk summary patterns.
- TODO: Define filter placement.
- TODO: Define drill-down interaction rules.
- TODO: Define internal dashboard exceptions, if any.

---

# 23. Tables

Purpose: Define table structure for data-heavy application screens, dashboards, admin views, documentation, and reports.

Decisions that belong in this section:
- Table density
- Header style
- Cell typography
- Row height
- Alignment rules
- Sort/filter affordances
- Selection states
- Empty/error/loading states
- Responsive behavior
- Print behavior

Implementation notes:
- Numeric values should align consistently.
- Tables must support scanning, keyboard access, and export/print requirements.

Table philosophy:
- Tables are one of JiTpro’s most important interface components.
- JiTpro exists to help professionals understand large amounts of project information quickly.
- Tables should optimize comprehension rather than density.
- Users should be able to recognize priority, status, relationships, ownership, risk, and progress without reading every cell.
- Tables should feel engineered, structured, and intentional.

Construction documentation standard:
- Tables should resemble well-organized construction documentation.
- Tables should not feel like generic spreadsheets, raw databases, accounting software, or undifferentiated data dumps.
- Table structure should communicate project reality in a way that supports decision-making.
- Every table should help answer: What is happening? Who owns it? What needs attention? What happens next?

Readability standards:
- Rows should be easy to scan.
- Columns should align cleanly and predictably.
- Whitespace should separate information naturally without making the table feel loose or disconnected.
- Users should not need to visually hunt for values.
- Labels, values, statuses, and actions should be placed consistently so users can build scanning habits over time.

Hierarchy standards:
- Every table should immediately communicate the most important information, supporting information, and reference information.
- Typography and spacing should establish hierarchy before color is introduced.
- Primary identifiers, ownership, risk, and next-action information should be easier to find than secondary metadata.
- Reference information should remain available without competing with operationally important values.
- Numeric values, dates, durations, IDs, and schedule-related fields should align in ways that support comparison and scanning.

Density standards:
- Avoid excessive density that forces users to slow down and decode the table.
- Avoid excessive whitespace that hides relationships or weakens comparison.
- Tables should balance information richness with readability.
- The goal is rapid understanding, not maximum visible row count.
- Dense modes may exist only when they preserve scanning, alignment, hierarchy, and comprehension.

Status and risk standards:
- Status indicators should be immediately recognizable.
- Color may support status, but color alone must not carry meaning.
- Typography should support hierarchy.
- Icons, labels, shape, placement, or pattern may support recognition when appropriate.
- No single visual element should carry all status meaning.
- Risk, blocked, overdue, approved, completed, and pending states should remain visually distinct and semantically consistent across tables.

Sorting and filtering standards:
- Sorting and filtering controls should remain visually simple.
- The table content should remain the focus.
- Controls should never dominate the interface or compete with the data.
- Sort and filter affordances should be clear enough to discover but restrained enough to preserve table hierarchy.
- Active filters and sort states should be recognizable without creating visual noise.

Row behavior standards:
- Hover states should be subtle and should confirm interactivity without distracting from scanning.
- Selection states should be obvious and accessible.
- Expandable rows should remain predictable, stable, and easy to understand.
- Row interactions should never surprise the user.
- Actions inside rows should be clearly associated with the row they affect.
- Destructive row actions should follow the same danger-action rules defined for buttons and confirmation patterns.

Responsive table standards:
- Responsive table behavior must preserve the table’s message, not merely compress columns.
- Mobile views may simplify, stack, prioritize, or progressively disclose information when doing so improves comprehension.
- Important status, ownership, risk, and next-action information should remain visible or easily reachable on smaller screens.
- Responsive alternatives should maintain the same semantic hierarchy as the desktop table.

Empty, loading, and error states:
- Empty tables should explain what is missing and what the user can do next when an action is available.
- Loading states should preserve layout stability where possible.
- Error states should explain what happened, why the table is unavailable or incomplete, and what recovery path exists.
- These states should be calm, practical, and consistent with the rest of the table system.

Print and export standards:
- Printed and exported tables should preserve readability, alignment, and hierarchy.
- Tables should remain understandable in grayscale or limited-color output where possible.
- Print layouts should prioritize clear row/column relationships, legible text, and meaningful grouping over visual density.

Guiding principle:
- A project manager should be able to understand the condition of a project by scanning the table, not reading every cell.

Future table specification:
- Exact table density options, header styles, cell typography, row heights, action-column rules, responsive patterns, and print mappings remain future implementation decisions.
- Once approved, table behavior and visual treatment should be tokenized and reused consistently across application, dashboard, admin, documentation, and report surfaces.

---

# 24. Forms

Purpose: Define form design for marketing capture, application data entry, admin tools, and reports/documentation examples.

Decisions that belong in this section:
- Field layout
- Label placement
- Required/optional notation
- Input styles
- Select styles
- Radio/checkbox styles
- Validation behavior
- Error text
- Help text
- Disabled/read-only states
- Multi-step forms

Implementation notes:
- Form rules must include accessibility, keyboard behavior, and error recovery.
- Marketing forms and app forms may have different density, but shared primitives should remain consistent.

TODO:
- TODO: Define field component anatomy.
- TODO: Define label/help/error placement.
- TODO: Define required-field convention.
- TODO: Define validation timing.
- TODO: Define disabled/read-only states.
- TODO: Define multi-step form pattern.
- TODO: Define protected/contact form visual standard.

---

# 25. Navigation

Purpose: Define navigation patterns for marketing, SaaS app, internal dashboard, documentation, and reports.

Decisions that belong in this section:
- Marketing top nav
- App sidebar/topbar
- Breadcrumbs
- Tabs
- Secondary nav
- Mobile nav
- Footer nav
- Active/hover/focus states
- Logo placement

Implementation notes:
- Navigation must clearly distinguish current location, available actions, and account/project context.
- Marketing and app navigation may differ but must share token/component logic.

TODO:
- TODO: Define marketing navigation pattern.
- TODO: Define app navigation pattern.
- TODO: Define internal dashboard navigation pattern.
- TODO: Define documentation navigation pattern.
- TODO: Define mobile nav pattern.
- TODO: Define breadcrumb rules.
- TODO: Define tab rules.
- TODO: Define logo sizing/placement rules.

---

# 26. Buttons

Purpose: Define all button variants and their exact usage rules.

Decisions that belong in this section:
- Primary button
- Secondary button
- Tertiary/ghost button
- Destructive button
- Link button
- Icon button
- Loading button
- Disabled button
- Button sizes
- Button alignment rules

Implementation notes:
- Every button variant must define default, hover, active, focus, disabled, and loading states.
- Button hierarchy must prevent multiple competing primary CTAs unless explicitly allowed.

Button philosophy:
- Buttons represent decisions.
- Buttons exist to help users take action. They should not become visual decoration.
- Buttons should communicate confidence without demanding attention.
- Buttons should feel professional, calm, deliberate, and reliable.
- Buttons should never feel playful, oversized, promotional, or visually loud.
- Users should recognize important actions immediately through consistency rather than novelty.

Primary button:
- The primary button represents the recommended action.
- Every screen or section should make the recommended action easy to identify.
- Primary buttons should use the approved JiTpro brand palette and remain simple, clear, and dependable.
- Avoid excessive gradients, glowing effects, oversized shadows, decorative motion, or treatments that make the button feel promotional.
- A primary button should feel confident, not urgent unless the action itself is time-sensitive or critical.

Secondary button:
- Secondary buttons support alternative actions.
- Secondary buttons should remain visually subordinate to the primary button.
- Secondary buttons should never compete with the primary action for attention.
- Secondary actions should be clear enough to recognize, but restrained enough to preserve hierarchy.

Ghost and tertiary buttons:
- Ghost buttons are appropriate for navigation, tertiary actions, and low-priority interactions.
- Ghost buttons should rely primarily on typography, spacing, and subtle interaction behavior.
- Ghost buttons should not be used when the action is the primary decision on the screen.
- Low-priority actions should remain discoverable without distracting from the main task.

Danger button:
- Danger buttons are reserved for destructive, irreversible, or high-risk actions.
- Danger actions must be visually distinct from normal primary and secondary actions.
- Danger styling should never be used merely to create emphasis or urgency.
- Destructive actions should include clear language and, when appropriate, confirmation patterns before execution.

Button hierarchy:
- Every screen should have one obvious primary action unless the workflow explicitly requires multiple equal choices.
- Avoid presenting multiple competing primary buttons in the same decision area.
- Users should never wonder which action JiTpro recommends.
- Button hierarchy should be communicated through consistent variant usage, placement, wording, and spacing.
- Calls to action should feel like a natural next step in the page or workflow, not an interruption.

Interaction states:
- Hover states should be subtle and should confirm interactivity without creating visual noise.
- Focus states must be highly visible and consistent across keyboard and pointer workflows.
- Pressed states should feel responsive and confirm that the action has been engaged.
- Disabled states should remain readable while clearly indicating that interaction is unavailable.
- Loading states should preserve layout stability and communicate that the system is processing the action.
- Button state changes must not rely on color alone.

Motion standards:
- Button animations should be restrained and purposeful.
- Smooth transitions may be used to clarify state changes.
- Avoid bouncing, scaling, flashing, pulsing, or theatrical interaction effects.
- Motion should reinforce reliability rather than excitement.

Accessibility standards:
- Buttons must remain usable through keyboard navigation.
- Focus visibility is required for every interactive button.
- Button labels should clearly describe the action.
- Icon-only buttons require an accessible text label.
- Color alone must never communicate state, priority, or danger.

Construction philosophy:
- Buttons should feel like tools, not advertisements.
- They should communicate reliability rather than excitement.
- A user should trust a JiTpro button before they click it.

Future button specification:
- Exact button sizes, spacing, typography, icon placement, loading behavior, and variant tokens remain future implementation decisions.
- Once approved, button variants and states should be tokenized and reused consistently across marketing, application, dashboard, documentation, and report surfaces.

---

# 27. Cards

Purpose: Define card patterns for marketing, app objects, dashboard metrics, reports, and documentation.

Decisions that belong in this section:
- Card anatomy
- Card variants
- Padding
- Border/radius/elevation
- Header/footer areas
- Interactive cards
- Metric cards
- Risk cards
- Print cards

Implementation notes:
- Cards should group related information, not be used as decoration by default.
- Interactive cards must have clear focus and hover states.

TODO:
- TODO: Define default card.
- TODO: Define elevated card.
- TODO: Define accent/callout card.
- TODO: Define risk/status card.
- TODO: Define metric card.
- TODO: Define interactive card behavior.
- TODO: Define print/report card rules.

---

# 28. Modals

Purpose: Define dialogs, confirmations, blocking modals, drawers, and overlays.

Decisions that belong in this section:
- Modal anatomy
- Modal sizes
- Dialog vs drawer rules
- Overlay/scrim behavior
- Header/body/footer layout
- Close behavior
- Confirmation patterns
- Accessibility/focus trapping

Implementation notes:
- Modals must be used sparingly and for focused tasks.
- Destructive confirmations require explicit copy and action hierarchy.

TODO:
- TODO: Define modal variants.
- TODO: Define modal sizes.
- TODO: Define drawer policy.
- TODO: Define overlay treatment.
- TODO: Define confirmation dialog rules.
- TODO: Define focus management requirements.

---

# 29. Notifications

Purpose: Define system feedback including toasts, banners, alerts, inline messages, and status announcements.

Decisions that belong in this section:
- Toasts
- Banners
- Inline alerts
- Page-level alerts
- Status badges
- Persistence/dismissal behavior
- Severity levels
- Accessibility announcement behavior

Implementation notes:
- Notifications must be actionable, clear, and not overused.
- Severity must map to semantic tokens.

TODO:
- TODO: Define notification variants.
- TODO: Define toast position and duration.
- TODO: Define alert/banner anatomy.
- TODO: Define dismissal behavior.
- TODO: Define ARIA live-region policy.

---

# 30. Tooltips

Purpose: Define compact contextual help and data explanations.

Decisions that belong in this section:
- Tooltip anatomy
- Trigger behavior
- Placement
- Delay
- Content length limits
- Touch/mobile behavior
- Chart tooltip behavior
- Accessibility requirements

Implementation notes:
- Tooltips must not hide essential information.
- If content is required to complete a task, use inline help or disclosure instead.

TODO:
- TODO: Define tooltip style.
- TODO: Define trigger rules.
- TODO: Define delay and dismissal behavior.
- TODO: Define chart tooltip style.
- TODO: Define mobile tooltip alternative.

---

# 31. Empty States

Purpose: Define what users see when there is no data, no results, or no configured workflow.

Decisions that belong in this section:
- Empty-state anatomy
- Messaging tone
- Illustration/icon use
- Primary action placement
- Secondary help link
- Empty vs zero vs filtered state distinctions
- Dashboard/report empty states

Implementation notes:
- Empty states should teach the next step without blaming the user.
- Filtered empty states should preserve filter context.

TODO:
- TODO: Define empty-state variants.
- TODO: Define illustration/icon policy.
- TODO: Define empty-state CTA rules.
- TODO: Define filtered empty-state behavior.
- TODO: Define report/dashboard empty-state rules.

---

# 32. Loading States

Purpose: Define loading feedback for pages, components, data tables, dashboards, and forms.

Decisions that belong in this section:
- Skeletons
- Spinners
- Progress indicators
- Button loading states
- Table loading states
- Chart loading states
- Long-running process states
- Reduced-motion loading behavior

Implementation notes:
- Loading UI should preserve layout stability when possible.
- Do not use indefinite loaders when progress or staged feedback is available.

TODO:
- TODO: Define loading-state hierarchy.
- TODO: Define skeleton style.
- TODO: Define spinner/progress policy.
- TODO: Define form submit loading behavior.
- TODO: Define dashboard loading behavior.

---

# 33. Error States

Purpose: Define how JiTpro communicates errors, failures, invalid input, blocked states, and recovery paths.

Decisions that belong in this section:
- Inline validation errors
- Page-level errors
- Network/API errors
- Permission errors
- Empty/error distinction
- Destructive action failures
- Recovery actions
- Error tone

Implementation notes:
- Error messages should explain what happened, why it matters, and what the user can do next.
- Use semantic color, iconography, and text; do not rely on color alone.

TODO:
- TODO: Define error severity levels.
- TODO: Define inline validation style.
- TODO: Define page error style.
- TODO: Define permission error pattern.
- TODO: Define network error pattern.
- TODO: Define error-copy guidelines.

---

# 34. Mobile Design

Purpose: Define mobile-specific UX and visual rules.

Decisions that belong in this section:
- Mobile layout model
- Mobile navigation
- Touch targets
- Mobile forms
- Mobile tables
- Mobile charts
- Mobile motion
- Mobile report/document behavior

Implementation notes:
- Mobile should be intentionally designed, not only stacked desktop layout.
- Data-dense components need explicit mobile alternatives.

TODO:
- TODO: Define mobile breakpoints.
- TODO: Define minimum touch target.
- TODO: Define mobile nav behavior.
- TODO: Define mobile table behavior.
- TODO: Define mobile chart behavior.
- TODO: Define mobile form behavior.
- TODO: Define mobile motion constraints.

---

# 35. Responsive Behavior

Purpose: Define how layouts and components adapt across viewport sizes and output media.

Decisions that belong in this section:
- Breakpoints
- Fluid vs fixed behavior
- Container behavior
- Component reflow rules
- Responsive typography
- Responsive spacing
- Responsive navigation
- Print/export behavior

Implementation notes:
- Each component should have documented responsive behavior before implementation.
- Avoid ad hoc breakpoints outside approved tokens.

## 35.1 Responsive Website Standards

Scope:
- This standard applies only to the JiTpro marketing website.
- It governs all marketing pages, landing pages, and public-facing web content.
- Application, dashboard, internal admin, documentation, and printed report responsive behavior may require separate standards.

Desktop-first design:
- The JiTpro marketing website must always be designed desktop-first.
- The primary audience—general contractors, project executives, owners, and project managers—consume marketing content predominantly on desktop and laptop computers during working hours.
- Desktop is therefore the primary design target for marketing pages.
- Desktop is considered the source of truth. Responsive layouts are adaptations of the desktop design, not the reverse.
- Hermes shall never allow responsive behavior to determine desktop information architecture. Desktop is designed first. Responsive layouts adapt from the desktop design, not vice versa.

Required design workflow:
- Every new marketing page, section, or component must be developed in the following order:
  1. Desktop (primary)
  2. Tablet
  3. Mobile Landscape
  4. Mobile Portrait
- Responsive behavior must be intentionally designed, not left to default framework behavior.
- No marketing page, section, or component is considered complete until responsive behavior has been reviewed at each supported breakpoint.

Minimum supported breakpoints:
- Desktop: 1920px and above
- Desktop: 1440px
- Laptop: 1280px
- Tablet Landscape
- Tablet Portrait
- Mobile Landscape
- Mobile Portrait

Preserve the desktop experience:
- Desktop layouts must never be compromised because of mobile constraints.
- If desktop and mobile require different interaction patterns, both experiences should be designed independently.
- Responsive adaptations must preserve messaging hierarchy, visual hierarchy, brand consistency, and user intent.
- Mobile constraints may require alternate presentation patterns, but they must not weaken the desktop communication model.

Responsive adaptation order:
- When adapting a desktop layout for smaller screens, use the following priority:
  1. Adjust spacing
  2. Adjust typography
  3. Resize components
  4. Reflow layouts
  5. Collapse secondary content
  6. Stack components only when necessary
- Stacking is the final option, not the default responsive solution.

Marketing dashboard rule:
- Marketing dashboards and illustrative data boards exist to communicate an idea, not to present real application UI.
- Desktop versions must remain highly scannable.
- Do not automatically convert desktop dashboard layouts into vertically stacked cards.
- Use responsive techniques appropriate for the available screen size while preserving the visual story.
- Desktop scanability is the governing principle for marketing dashboard layouts.

Hermes AI requirement:
- Before considering any marketing page complete, Hermes must verify:
  - Desktop layout is complete.
  - Tablet layout is complete.
  - Mobile layout is complete.
  - Typography scales correctly.
  - Spacing scales correctly.
  - No information hierarchy is lost.
  - No desktop interaction or information architecture is degraded because of mobile constraints.
- Responsive design is part of implementation, not a post-processing step.

Future TODO:
- TODO: Define exact official breakpoint token values for Tablet Landscape, Tablet Portrait, Mobile Landscape, and Mobile Portrait.
- TODO: Define print/export responsive equivalents.

---

# 36. Accessibility

Purpose: Define accessibility requirements for every JiTpro surface.

Decisions that belong in this section:
- WCAG target level
- Keyboard navigation
- Focus indicators
- Color contrast
- Reduced motion
- Screen reader behavior
- Form accessibility
- Chart accessibility
- Table accessibility
- Modal accessibility
- Print accessibility

Implementation notes:
- Accessibility is a design-system requirement, not a final QA pass.
- Components must document ARIA, keyboard, and focus behavior.

TODO:
- TODO: Approve WCAG target.
- TODO: Define focus-visible style.
- TODO: Define keyboard interaction standards.
- TODO: Define reduced-motion standards.
- TODO: Define chart accessibility standards.
- TODO: Define table accessibility standards.
- TODO: Define form accessibility standards.

---

# 37. Component Library

Purpose: Define the official component inventory, ownership, status, and required documentation for each component.

Decisions that belong in this section:
- Component list
- Component maturity/status
- API/props conventions
- Variant rules
- Accessibility requirements
- Test requirements
- Story/demo requirements
- Cross-surface usage

Implementation notes:
- Each component should have anatomy, variants, states, responsive behavior, accessibility notes, and examples.
- Component implementation should not begin until its required tokens exist or are explicitly stubbed.

TODO:
- TODO: Define component library location.
- TODO: Define component status labels.
- TODO: Define required component documentation template.
- TODO: Define Storybook/component-preview strategy, if any.
- TODO: Define test/QA requirements.

Initial component inventory placeholder:
- Button: TODO
- Card: TODO
- Input: TODO
- Select: TODO
- Textarea: TODO
- Checkbox: TODO
- Radio: TODO
- Switch: TODO
- Label: TODO
- FormField: TODO
- Table: TODO
- Badge: TODO
- Alert: TODO
- Toast: TODO
- Tooltip: TODO
- Modal/Dialog: TODO
- Drawer: TODO
- Tabs: TODO
- Breadcrumb: TODO
- NavMenu: TODO
- Sidebar: TODO
- PageHeader: TODO
- SectionHeader: TODO
- EmptyState: TODO
- Skeleton: TODO
- Spinner/Progress: TODO
- MetricCard: TODO
- Chart primitives: TODO
- Timeline/Schedule primitives: TODO
- Logo/Wordmark: TODO

Component documentation template:
- Component name: TODO
- Purpose: TODO
- Anatomy: TODO
- Variants: TODO
- States: TODO
- Props/API: TODO
- Accessibility: TODO
- Responsive behavior: TODO
- Do: TODO
- Do not: TODO
- Examples: TODO

---

# 38. Design Tokens

Purpose: Define the machine-readable source of truth for visual decisions.

Decisions that belong in this section:
- Token format
- Token naming convention
- Token categories
- Token ownership
- Token versioning
- Export targets
- Relationship to Tailwind, CSS variables, reports, and docs

Implementation notes:
- Token categories should include color, typography, spacing, radius, shadow/elevation, motion, z-index, breakpoints, and component tokens.
- Consider compatibility with W3C Design Tokens format and/or DESIGN.md-style frontmatter in a future implementation.
- Tokens must separate primitive values from semantic roles.

TODO:
- TODO: Choose token storage format.
- TODO: Define primitive token naming.
- TODO: Define semantic token naming.
- TODO: Define component token naming.
- TODO: Define export pipeline.
- TODO: Define versioning policy.

Token category placeholders:
- Color primitives: TODO
- Color semantic roles: TODO
- Typography: TODO
- Spacing: TODO
- Radius: TODO
- Shadow/elevation: TODO
- Motion: TODO
- Breakpoints: TODO
- Z-index: TODO
- Component tokens: TODO
- Print tokens: TODO

APPROVED resolution (color only):
- Token storage format: **CSS custom properties**, defined once in `src/index.css`. See Section 45.
- Token naming convention: `--jp-<role>`. See Section 8.8.
- Approved color tokens and reserved token names: **Section 8.8**.
- Governance over which colors may exist at all: **Section 8.9**.
- The remaining categories in this section - typography, spacing, radius, shadow, motion, breakpoints, z-index, component, and print tokens - remain TODO and are not superseded.

---

# 39. Tailwind Architecture

Purpose: Define how the design system maps into Tailwind without losing semantic meaning.

Decisions that belong in this section:
- Tailwind config structure
- Theme extension strategy
- CSS variable strategy
- Token-to-Tailwind mapping
- Utility usage rules
- Arbitrary value policy
- Component class strategy
- Dark/light theme strategy

Implementation notes:
- Tailwind should consume approved tokens rather than become the source of truth by itself.
- Arbitrary utility values should be restricted after tokens are approved.
- Repeated class strings should move into components or documented variants.

TODO:
- TODO: Define Tailwind token mapping.
- TODO: Define CSS variable layer.
- TODO: Define arbitrary value policy.
- TODO: Define class composition strategy.
- TODO: Define dark/light theme class or data-attribute strategy.
- TODO: Define lint/enforcement strategy for non-token values.

APPROVED resolution (color only):
- CSS variable layer: approved. Defined in `src/index.css`. See Section 45.
- Token-to-Tailwind mapping for color: approved. Tokens are exposed through Tailwind's `@theme` block so a single definition serves both utility classes and raw `var()` references. See Section 45.
- Arbitrary value policy for color: approved and restrictive. Color literals in arbitrary-value syntax are prohibited in production components. See Section 8.9.
- Tailwind does not own JiTpro's color decisions. Tailwind's `amber-500` and JiTpro's Brand Amber currently share a value; that is coincidence, not authority. If they ever diverge, this document wins.
- The remaining TODOs in this section - class composition strategy, dark/light theme strategy, and lint enforcement tooling - are not superseded.

---

# 40. shadcn/ui Integration Strategy

Purpose: Define whether and how JiTpro will use shadcn/ui primitives without surrendering brand control.

Decisions that belong in this section:
- Whether shadcn/ui is approved
- Which components may be adopted
- Which components must be custom
- Token mapping to shadcn CSS variables
- Variant strategy
- Accessibility responsibilities
- Upgrade/ownership policy

Implementation notes:
- Current codebase audit found no shadcn/ui implementation.
- If adopted, shadcn must be styled through JiTpro tokens and component rules.
- Do not add shadcn/ui until this strategy is approved.

TODO:
- TODO: Decide whether shadcn/ui will be used.
- TODO: Define approved shadcn components.
- TODO: Define components that must remain custom.
- TODO: Define token mapping to shadcn CSS variables.
- TODO: Define installation and ownership policy.
- TODO: Define how shadcn updates are reviewed.

---

# 41. AI Development Rules

Purpose: Define how AI coding agents must use this design system when building JiTpro UI.

Decisions that belong in this section:
- Required files to read before UI work
- What agents may infer
- What agents must never infer
- Token/component usage rules
- When to ask for clarification
- How to handle TODOs
- How to document deviations

Implementation notes:
- AI agents must not invent unresolved design decisions.
- If a token/component is missing, agents should stop and ask or create a bounded proposal document, not silently choose values.
- Agents should cite this file and the relevant section in implementation notes.

TODO:
- TODO: Define mandatory pre-read list.
- TODO: Define AI stop conditions.
- TODO: Define deviation request format.
- TODO: Define how agents propose new components/tokens.
- TODO: Define review checklist for AI-generated UI.

Draft rule placeholders:
- Rule: Use approved tokens only. Status: TODO
- Rule: Do not use arbitrary colors unless approved. Status: TODO
- Rule: Do not introduce new component variants without documenting them. Status: TODO
- Rule: Ask when a section says TODO. Status: TODO

APPROVED resolution:

Mandatory pre-read before any visual work:
1. This document, `docs/design/JiTpro_Design_System_v1.0.md`, in full for the areas being touched.
2. Section 8.8 (approved tokens) and Section 8.9 (color governance) before touching any color.
3. Section 46 before touching any animation.
4. Section 49 before introducing any convention this document does not already define.

Approved agent rules:
- Rule: Use approved tokens only. Status: **APPROVED** (Section 8.8).
- Rule: Do not use arbitrary colors, Tailwind color utilities, hex, or rgba literals in production components. Status: **APPROVED** (Section 8.9).
- Rule: Do not introduce new component variants or visual conventions without updating this document first. Status: **APPROVED** (Section 49).
- Rule: Ask when a section says TODO; do not infer the value from existing code. Status: **APPROVED** (Appendix C).

Stop conditions - an agent MUST stop and ask rather than proceed when:
- a required color has no approved token;
- the design calls for a value this document marks TODO;
- the implementation it is asked to write would conflict with an APPROVED rule;
- it is about to introduce a visual convention that does not yet exist in this document.

An agent MUST NOT resolve any of the above by choosing a value that looks close enough. Silence in this document is not permission.

---

# 42. Component Naming Standards

Purpose: Define predictable naming for components, variants, tokens, files, and CSS classes.

Decisions that belong in this section:
- Component naming convention
- File naming convention
- Variant naming convention
- Token naming convention
- Data/status naming convention
- Prefix/scope rules
- Deprecated-name policy

Implementation notes:
- Names should describe component role, not visual appearance, where possible.
- Semantic names make future theme changes easier.

TODO:
- TODO: Define React component naming convention.
- TODO: Define file/path convention.
- TODO: Define token naming convention.
- TODO: Define variant naming convention.
- TODO: Define status/semantic naming convention.
- TODO: Define deprecated component/token policy.

---

# 43. Design Review Checklist

Purpose: Provide a repeatable review process before UI work is accepted.

Decisions that belong in this section:
- Review gates
- Accessibility checklist
- Token compliance checklist
- Responsive checklist
- Content/governance checklist
- Data visualization checklist
- Print/export checklist
- AI-agent compliance checklist

Implementation notes:
- This checklist should be run before merging design-system-affecting UI work.
- Checklist failures should produce either fixes or documented exceptions.

TODO:
- TODO: Define required review gates.
- TODO: Define who approves design deviations.
- TODO: Define accessibility review method.
- TODO: Define visual QA method.
- TODO: Define regression testing approach.

Checklist template:
- Uses approved tokens: TODO
- Uses approved components: TODO
- No arbitrary design values: TODO
- Responsive behavior documented: TODO
- Keyboard behavior verified: TODO
- Contrast verified: TODO
- Reduced motion verified: TODO
- Empty/loading/error states covered: TODO
- Content governance checked: TODO
- Print/export impact checked: TODO
- Deviation documented: TODO

---

# 44. Future Expansion

Purpose: Define how the design system grows without becoming inconsistent or ungoverned.

Decisions that belong in this section:
- Versioning policy
- Deprecation policy
- New-token proposal process
- New-component proposal process
- Cross-product expansion rules
- Documentation maintenance
- Design-system release notes
- Migration strategy

Implementation notes:
- Future expansion should preserve backward compatibility where possible.
- New patterns should be added because a real product need exists, not because a single page wants novelty.

TODO:
- TODO: Define versioning model.
- TODO: Define changelog format.
- TODO: Define deprecation process.
- TODO: Define migration process.
- TODO: Define design-system ownership.
- TODO: Define cadence for design-system audits.

---

## Appendix A: Required Future Artifacts

Purpose: List the supporting artifacts that should eventually accompany this document.

TODO artifacts:
- TODO: Token source file
- TODO: Tailwind token export
- TODO: CSS variable layer
- TODO: Component library directory
- TODO: Component documentation or Storybook
- TODO: Figma/design file, if used
- TODO: Print report template
- TODO: Chart/data visualization examples
- TODO: Accessibility test matrix
- TODO: AI implementation prompt template

---

## Appendix B: Open Questions

Purpose: Keep unresolved decisions visible.

Open questions:
- TODO: Should JiTpro maintain both dark and light themes, or one primary theme with contextual exceptions?
- TODO: What typography direction best fits JiTpro across web, app, reports, and documentation?
- ANSWERED (2026-08-06): The official palette is Brand Amber #F59E0B and Active Amber #FDE68A (Section 8.1.1). The semantic color model beyond amber remains TODO.
- TODO: Should shadcn/ui be adopted for app primitives?
- ANSWERED (2026-08-06): The source of truth for color tokens is CSS custom properties defined in src/index.css (Sections 8.8 and 45). Other token categories remain TODO.
- TODO: How should printed reports relate visually to the web/app design?
- ANSWERED (2026-08-06): The governance process for approving new visual conventions is defined in Section 49. Component-specific approval criteria remain TODO.

---

## Appendix C: Non-Decision Placeholder Policy

Purpose: Prevent this framework from being mistaken for a completed design system.

Rules:
- A TODO is not a decision.
- A current-code observation is not a decision.
- A design audit finding is not a decision.
- An inspiration reference is not a decision.
- A component name is not a decision until its anatomy, variants, states, and tokens are approved.
- A Tailwind utility currently used in the website is not automatically an official token.
- Note (2026-08-06): this policy remains in force for every section still marked TODO. It does NOT apply to Part II, or to Sections 7.7, 8.1.1, 8.8, and 8.9, which are approved decisions rather than placeholders.

TODO:
- TODO: Replace this section with formal governance once approved.

---

# Part II - Approved Implementation Standards

Status: APPROVED (2026-08-06).

Sections 1-44 describe how JiTpro design decisions should be reasoned about. Part II describes how JiTpro is actually built. These sections were derived from production work on the marketing website; they are not proposals.

Where Part II conflicts with existing implementation, **the implementation is wrong and must change.** Where Part II conflicts with a TODO in Sections 1-44, Part II wins.

---

# 45. Implementation Standard - Color in Code

Purpose: Define how approved colors reach production code, so that a color exists in exactly one place.

## 45.1 CSS Custom Properties are the mechanism

Colors MUST be implemented as CSS custom properties and consumed by reference. Duplicated color literals are the failure mode this standard exists to prevent.

Components MUST reference:

```
var(--jp-brand-amber)
```

Components MUST NOT reference:

```
#F59E0B
amber-500
rgba(245, 158, 11, 1)
```

## 45.2 Centralized definition

There MUST be exactly one definition site for color tokens.

Approved location: **`src/index.css`**, which already carries the Tailwind v4 `@theme` block and is loaded once for the whole application.

`src/styles/theme.css` is an acceptable alternative if the token layer grows large enough to warrant its own file. If it is adopted, `src/index.css` MUST import it and MUST NOT also define tokens. Two definition sites is the condition this standard forbids.

### Approved architecture: `:root` declaration with `@theme inline` aliases (2026-08-06)

The approved `--jp-*` names from Section 8.8 are declared once in `:root`. Tailwind v4 `@theme inline` aliases then reference those variables so components can also consume semantic utilities:

```css
:root {
  --jp-brand-amber: #F59E0B;
  /* ... */
}

@theme inline {
  --color-jp-brand-amber: var(--jp-brand-amber);
  /* ... */
}
```

Why this shape rather than declaring the values directly in `@theme`:
- Tailwind v4 generates utilities only from theme variables named `--color-*`. Section 8.8 mandates the names `--jp-*`. Neither requirement can be dropped, so the alias reconciles them.
- `@theme inline` substitutes the referenced value rather than emitting a second independent variable, which keeps `--jp-*` authoritative.
- The result serves all three consumers from one declaration: Tailwind utilities (`bg-jp-brand-amber`, `text-jp-text-muted/80`), raw CSS, and SVG presentation attributes via `var()`.

Rules:
- Authoritative hex values MUST appear only in the `:root` block. Restating a value inside `@theme` creates the second definition site this section forbids.
- `@theme` entries MUST be aliases (`var(--jp-*)`), never literals.
- A reserved token with no approved value MUST NOT be declared in either block. `--jp-shadow` is not defined (Section 8.8).

## 45.3 Why custom properties rather than Tailwind alone

- SVG presentation attributes (`fill`, `stroke`, `stop-color`) cannot accept Tailwind class names, but they can accept `var()`. A CSS variable is the only mechanism that serves markup, CSS, and SVG from one definition. This is precisely where the palette previously fractured.
- A custom property can be changed in one place and take effect everywhere, including inside inline styles and generated stylesheets.
- Defining tokens inside Tailwind's `@theme` block yields both a Tailwind utility for class-based usage and a raw custom property for SVG and arbitrary CSS, from a single declaration.

## 45.4 Opacity

Opacity variants MUST be derived from the token rather than authored as new literals. A dimmer brand amber is the brand amber at reduced opacity - it is not a different color, and it MUST NOT be written as one.

## 45.5 Migration expectation

Existing production code predates this standard and does not conform. That is expected. Conformance is scheduled work (Section 49.4), not a reason to weaken the standard. New and modified code MUST conform immediately.

---

# 46. Animation Standards

Purpose: Define why JiTpro animates, and the structural requirement that keeps composed animations correct.

## 46.1 Animation exists to communicate

**Animation exists to communicate. It never exists to decorate.**

Animation MUST:
- explain something that is genuinely hard to explain statically
- reinforce hierarchy by directing attention to what matters now
- improve understanding of sequence, causality, or state

Animation MUST NOT:
- exist because movement is possible
- exist to signal that the product is modern
- compete with the content beside it
- delay comprehension

If an animation were removed and nothing became harder to understand, it was decoration and should not have been built.

## 46.2 Comprehension is not gated on motion

- Essential copy MUST be readable without waiting for an animation to finish. Motion may resolve after the message has landed; the message may never wait for the motion.
- An animation MAY continue after the page is comprehensible. It MUST NOT be a precondition of comprehension.

## 46.3 Single shared state - the synchronization rule

This is the load-bearing rule of this section.

**Every element that participates in one animated idea MUST derive its behavior from one shared animation state.**

For the marketing timeline this means the moving indicator, milestone highlighting, milestone labels, connector lines, and the directional heading are all expressed as positions within a single cycle, from a single definition, with a single delay.

Prohibited:
- independent timers per element
- separate animation delays that happen to line up
- duplicated timing constants
- any arrangement in which two elements could drift out of agreement

Why this is mandatory rather than advisory: when a composed animation is assembled from independently timed parts, it does not fail loudly. It fails as a slow, hard-to-diagnose disagreement between elements - a label lighting before the indicator reaches it, an arrow pointing against its own travel. Deriving everything from one state makes those failures structurally impossible rather than merely unlikely.

Corollary: if two elements must always agree about a state, they MUST be driven by the same declaration, not by two declarations configured identically.

## 46.4 Restraint

Prohibited in all JiTpro products:
- spinning, bouncing, and elastic or overshooting easing
- pulsing or flashing as an ambient state
- particle effects, comet trails, and neon bloom
- looping motion that never resolves, where a single resolved pass would communicate the same thing
- animation on more than one focal element at a time within a viewport

Motion SHOULD be linear or gently eased. Constant-speed travel is preferred where an animation represents progress through a real sequence, because varying speed implies a meaning that is not there.

## 46.5 Reduced motion is a first-class state

`prefers-reduced-motion: reduce` MUST be honored, and MUST be designed rather than merely obeyed.

- Reduced motion MUST present the animation's **resolved, meaningful final state** - not an empty frame, and not a mid-animation frame.
- All information conveyed by the animation MUST remain available without it.
- Controls that exist only to drive animation, such as a replay control, SHOULD be hidden under reduced motion, since they have nothing to do.
- Reduced-motion behavior MUST be verified, not assumed.

## 46.7 Sequence carousel

Status: APPROVED (2026-08-07). **SUPERSEDED 2026-08-08 by the stage selector (Section 46.8) for the homepage small-miss progression — this pattern's only approved implementation.** Retained for history; a future genuine carousel use requires a fresh Decision Log entry.

An ordered set MAY be presented as an interactive carousel **only when the set is a genuine progression** - the order carries meaning, and showing every stage open at once would flatten an argument into a list. A group of three that happens to sit in a row is not a progression.

**Entry**
- The interaction MUST NOT begin on page load, component mount, or a timer. It initializes only when the section itself intersects the viewport, at roughly a third visible, once, and never resets.
- Motion MUST NOT occur off screen. A reader who never reaches the section must never have caused it to move.
- The only automatic behaviour is the carousel's own arrival. Auto-advancing through the stages is prohibited: the reader controls the progression.

**State**
- The whole layout derives from one active index plus one entered flag (Section 46.3). Competing per-item animation states are prohibited.
- Hover, keyboard focus, and tap MUST all resolve to that same active index. No input method may have behaviour the others lack.

**Motion**
- The track repositions around the selected stage; a stage MUST NOT travel independently across the surface.
- Permitted: width change, horizontal repositioning, clipped copy reveal, opacity, a subtle border response. Prohibited: bouncing, flipping, rotation, aggressive scaling, large vertical movement, springy easing, glow (Sections 46.4, 47.2).
- Copy MUST become readable promptly. A reader may not be made to wait out an animation before reading (Section 46.2).
- The interaction MUST NOT change the section's height. Stage copy is laid out at its open width regardless of the stage's current width, so switching stages never reflows the page.
- Exactly centring the first or last of three stages would push the far stage off the edge. Where that conflict exists the track SHOULD travel most of the way rather than all of it, so every stage stays on screen.

**Accessibility**
- Each stage MUST be operable by keyboard, with a real control and a visible focus ring that is not clipped by the carousel's overflow.
- All stage copy MUST be present in the document at all times. Visibility is a visual state, never a content state, so assistive technology and search engines receive the complete argument.
- An ordinal marker MAY take `--jp-brand-amber-active` as its stage becomes active and settle back to the resting `--jp-brand-amber` (Section 8.1.1).
- Under reduced motion, selection resolves instantly: the chosen stage and its complete copy appear with no travel, no expansion animation, and no illumination. The interaction itself MUST continue to work (Section 46.5).

**Responsive**
- Where three stages cannot hold a readable measure side by side, the layout MUST adapt to a single primary stage with its neighbours partially visible, rather than compressing three narrow columns or reducing type size (Section 7.7).
- Overflow MUST be contained by the carousel. The page itself must never scroll horizontally.

## 46.8 Stage selector

Status: APPROVED (2026-08-08). Supersedes the sequence carousel (Section 46.7) for the homepage small-miss progression.

A genuine progression MAY be presented as a stage selector: every numbered stage title always visible as a rail of selectable controls, with one content stage presenting the active stage — beneath the rail, or beside it in the divided form of Section 46.8.1 (amended 2026-08-25). The selector states the interaction structurally — every stage visible, one open — instead of asking the reader to discover it through affordance icons or cropped neighbours.

**Entry**
- The entry rules of Section 46.7 carry over unchanged: nothing animates on page load, component mount, or a timer; the presentation settles in only when the section itself intersects the viewport, at roughly a third visible, once, and never resets. Motion MUST NOT occur off screen.
- Auto-cycling, looping, and perpetual autoplay are prohibited. A stage selector MAY perform **one finite, first-entry guided progression** when the sequence itself communicates a narrative progression (2026-08-08), provided that it begins only after the section itself is visible; advances through the stages once and stops permanently at the final stage; never loops and never restarts; is cancelled immediately and for the remainder of the page visit by any deliberate visitor interaction with a selector (hover, keyboard focus, click, or tap); never changes stages while the section is off-screen; and does not run under reduced motion. Manual control is always available, and always wins.

**State**
- The whole presentation derives from one active index plus one entered flag (Section 46.3). Competing per-item animation states are prohibited.
- **Click, tap, and keyboard activation (Enter or Space) MUST all resolve to that same active index.** No committing input method may have behaviour the others lack, and touch MUST NOT depend on hover.
- **Hover and keyboard focus MAY indicate availability without committing selection (amended 2026-08-25).** Where a selector drives a substantial content stage — a full copy panel, or a persistent visual that accumulates across the stages (Section 46.8.1) — hover and keyboard focus MUST indicate availability only and MUST NOT change the active index. Crossing such a rail on the way elsewhere would otherwise re-narrate the argument, and focus-to-commit would destroy a keyboard reader's place mid-traversal. A selector MUST apply one behaviour to every one of its own stages; hover-to-commit remains permitted, and remains the default, where the selector drives only a short copy swap.
- Availability and selection MUST be visually distinguishable. Hover and focus use the inactive control's approach treatment — brightening toward primary text with a subtle neutral surface wash — never the active amber enclosure. Keyboard traversal MUST NOT be trapped: focus MAY move between selectors without committing, and Enter or Space commits.

**Selector rail**
- All stage numbers and titles remain visible at all times. No stage may be hidden behind an icon, an overflow, or a swipe.
- Selectors are real interactive controls, and the whole selector is the target — never only an icon.
- The active stage MUST be visually unmistakable without explanatory text. Selector controls use the established JiTpro selector treatment (2026-08-08): pill-shaped (`rounded-full`) controls whose active state is enclosed by `--jp-brand-amber` at restrained opacity — border at roughly 30%, background tint at roughly 10% — with amber text emphasis (Sections 8.1.1, 48.7). Inactive controls are muted but clearly available, brightening toward primary text with a subtle neutral surface wash on hover or focus, and keep the same pill footprint via a transparent border so geometry never shifts with state. Heavy borders, raised cards, shadows, and excessive fills remain prohibited.
- Where a horizontal rail cannot hold every stage title legibly, the selectors stack rather than shrink, truncate, or scroll horizontally. **A rail MAY be laid out on either axis (amended 2026-08-25)** — horizontal or vertical — provided every stage number and title stays visible at every supported width. The axis is a composition decision; the visibility rule is not.

**Content stage**
- One content area presents the active stage's copy. Neighbouring stages are not partially shown; the rail already communicates the set. The moving-track, partially-visible-neighbour geometry of Section 46.7 is the superseded presentation, not a variant of this one.
- **The content area MAY be divided into a copy column and a persistent visual column beside the rail, rather than a single area beneath it (amended 2026-08-25).** Section 46.8.1 governs the visual column. Every other rule in this section applies to the divided form unchanged.
- All stage copy MUST be present in the document at all times. Visibility is a visual state, never a content state, so assistive technology and search engines receive the complete argument.
- Switching stages MUST NOT change the section's height. The content area reserves the height of the tallest stage's copy, so selection never reflows the page. **In the divided form both columns MUST reserve a height independent of the active index** — the copy column by reserving the tallest stage's block, the visual column by holding a fixed aspect ratio (amended 2026-08-25).
- Copy MUST become readable promptly: a restrained cross-fade or equivalent short transition only.

### 46.8.1 The accumulating visual column

Status: APPROVED (2026-08-25).

Where a stage selector uses the divided content stage, the visual column MUST be **one visual system that accumulates across the stages**, never a set of separate illustrations swapped in and out.

- Elements introduced at one stage MUST persist as the same elements at every later stage. The only permitted removal is a label that a later stage's own structure supersedes; content the visual has established is never withdrawn.
- The visual MUST NOT introduce a second interaction. It has no controls, no hover states, and no focus targets of its own; the rail is the only interactive element in the section.
- Accumulation MUST be legible without motion. Under `prefers-reduced-motion: reduce` the selected stage's fully accumulated state appears at once (Section 46.5), and a stage selected directly from a distant stage resolves to the correct accumulated state without animating the intervening ones.
- Where the visual column cannot hold the visual at full legibility, the two columns reflow to one full-width column before any content is collapsed or stacked (Section 35.1). A distinct compact composition is authored rather than the wide drawing being scaled (Section 48.3).
- The visual MUST carry the section's meaning in the document as well as on screen: the per-stage meaning is stated in visible text beside it, so comprehension never depends on reading the drawing (Section 46.2).

**Accessibility and reduced motion**
- Each selector MUST be operable by keyboard, with a visible focus ring that is never clipped.
- An ordinal marker MAY take `--jp-brand-amber-active` as its stage becomes active and settle back to the resting `--jp-brand-amber` (Section 8.1.1).
- Under reduced motion, selection resolves instantly: the chosen stage's complete copy appears with no travel and no illumination, and the interaction itself MUST continue to work (Section 46.5).

## 46.9 Scroll-driven sequential process reveal (process scrollytelling)

Status: APPROVED (2026-08-20). REVISED the same day from the scroll-driven process accordion first recorded under this section — see the Decision Log; the accordion presentation is superseded, its interaction principles carried forward here. Does NOT supersede Section 46.8, which remains the approved pattern for stage selectors.

**As of 2026-08-25 this section has no current production use.** The homepage five-stage JiTpro methodology — its only approved use — moved to the Section 46.8 stage selector with a Section 46.8.1 accumulating visual, because that section's buyer-journey job is establishing competence, and competence is read from the relationship *between* the stages: a presentation that shows exactly one stage at a time by design forecloses the comparison it depends on. **Section 46.9 is neither superseded nor retired.** It remains APPROVED and available for a surface whose content is genuinely a narrative the visitor moves through rather than a method they should be able to see whole. The 2026-08-20 "first approved use" designation is released; a future use requires a fresh Decision Log entry naming it.

A genuine ordered process MAY be presented as a pinned, scroll-driven sequential reveal: one stage presented at a time inside a spatially stable presentation, with the visitor's own scrolling moving the narrative from stage to stage. This is a sequential narrative, not a menu.

**Source of truth**

- Section-relative scroll progress is the single source of truth. Every participating element — ordinal, title, body copy, any position indicator — derives from that one continuous value (Section 46.3). Competing per-stage animation states are prohibited.
- Scroll-linked animation SHOULD be continuous: the reveal tracks the visitor's scroll physically, so slow scrolling reveals slowly, fast scrolling progresses quickly, and scrolling backward reverses the sequence naturally. Discrete threshold-fired state switching is the failure mode this rule exists to prevent.
- No timers, no autoplay, no auto-cycling, and no permanent progression state. This is not autoplay: progression is directly controlled by the reader's own scrolling, in both directions.

**Presentation**

- One stage is presented at a time. Each stage's interval of the region contains an entrance, a generous hold, and an exit — and the hold MUST be the largest part, long enough that the body copy can be read comfortably at a normal scrolling pace.
- Adjacent stage transition windows may overlap only at visually negligible opacity; two stage titles or bodies must never be simultaneously readable (clarified 2026-08-20). A very brief neutral moment between stages — release, clear, reveal — is preferred over a readable crossfade.
- All stage copy remains present in the document, in reading order, at all times. Visibility is a visual state, never a content state.
- A restrained position indicator (for example `01 / 05`, or minimal neutral ticks) MAY accompany the active stage for orientation. It MUST remain subordinate to the stage and MUST NOT become navigation.

**Stable geometry**

- A deliberately tall outer region supplies the scroll distance; a pinned presentation inside it remains spatially stable in the viewport.
- The outer region's dimensions never change, document height is never animated, document flow outside the region never shifts, and no interaction causes page-level jerk. All stages share one stable presentation footprint; the content changes inside it.

**Motion**

- Permitted: opacity, clip/reveal, and small vertical entrance/exit offsets, directly scroll-linked or gently eased.
- Prohibited: bouncing, spring overshoot, scaling, rotation, pulsing, decorative glow, and large translations (Section 46.4).

**Responsive**

- Desktop and tablet MAY use the pinned architecture.
- Narrow viewports SHOULD present the stages sequentially in normal document flow: all copy visible, no interaction required, no sticky trap, no artificial page height, and no horizontal scrolling. The pinned presentation is cinematic; the narrow presentation prioritizes reading.

**Reduced motion**

- The normal-flow sequential presentation is used: no pinning, no scroll-linked animation, and no interaction required to access any copy (Section 46.5). Content and reading order are identical to the pinned presentation.

**Accessibility**

- DOM reading order is the process order and is never affected by the visual state. Assistive technology receives the complete process, in order, with no interaction required.
- Accordion button semantics (`aria-expanded`, `aria-controls`) are NOT used — they would misdescribe a narrative presentation as a disclosure widget.
- No precision scrolling may be required to reach any content: standard keyboard scrolling drives the same progression in the pinned presentation, and the narrow and reduced-motion presentations require no interaction at all.

## 46.6 User control

Where an animation runs longer than a few seconds it SHOULD resolve once and stop rather than loop indefinitely, and SHOULD offer an explicit replay control. Perpetual motion in peripheral vision is a cost paid by every reader on every visit.

---

# 47. Visual Hierarchy Standard

Purpose: Define the qualities JiTpro must project, so visual decisions can be judged against something other than taste.

## 47.1 JiTpro should feel

- **Premium** - considered, and expensive to have made.
- **Executive** - respectful of a reader who decides rather than browses.
- **Disciplined** - consistent to the point of being predictable.
- **Technical** - precise, measured, construction-literate.
- **Purposeful** - every element earns its place.
- **Confident** - never straining for attention.
- **Calm** - the interface does not manufacture urgency; real project conditions do.
- **Construction-specific** - recognizable to someone who builds, not to someone who buys software.

## 47.2 JiTpro should never feel

- **Generic SaaS** - interchangeable with any other dark dashboard product.
- **Gaming** - glowing, neon, high-energy, score-like.
- **Playful** - cute, illustrated, informal.
- **Neon** - saturated color used for excitement rather than meaning.
- **Over-animated** - moving because it can.
- **Busy** - many competing elements at similar weight.
- **Decorative** - visual elements carrying no information.

## 47.3 How hierarchy is established

In priority order:
1. Typography - size, weight, and the relationship between a statement and its explanation.
2. Spacing - proximity, grouping, and generous separation between ideas.
3. Alignment - a consistent left edge across sections reads as discipline.
4. Contrast - light against dark, dense against open.
5. Color - **last**, and only for what genuinely deserves attention.

A layout that requires color to be understood has failed at steps 1-4.

## 47.4 The restraint test

Before adding any visual element it must survive one question: *what would be lost if this were removed?*

If the answer is "it would look plainer," remove it. Plainer is the goal.

---

# 48. Component Consistency Standard

Purpose: Define the shared conventions that make separate surfaces read as one product.

**Visual consistency is more important than novelty.** A component that is slightly worse but consistent with the rest of the product is preferred over one that is slightly better and unlike everything around it. Novelty in a single surface is a defect, not a contribution.

## 48.1 Buttons

- One primary action per surface. A second amber button competing with the first is prohibited.
- The primary action uses Brand Amber. Secondary actions are quiet - text or hairline-bordered - and MUST NOT approach the primary in visual weight.
- Buttons MUST be sentence case (Section 7.7).
- Hover MUST be a single restrained gesture. Multiple simultaneous hover effects are prohibited.
- **The approved hover gesture for a primary amber action is the color change from `--jp-brand-amber` to `--jp-brand-amber-active`** (Section 8.1.1, approved 2026-08-06). That change IS the gesture. Lift or translate, shadow or glow intensification, and movement of a nested icon MUST NOT accompany it, and MUST NOT be substituted for it.
- Focus MUST be visibly indicated with a high-contrast outline that clears the button edge. Focus indication is not optional and MUST be verified with real keyboard navigation, not programmatic focus.
- **Keyboard focus on amber controls, and on appropriate dark-surface controls, uses `--jp-text-primary`** (approved 2026-08-06), unless another approved accessibility rule applies. An amber outline on an amber control is low-contrast against the very control it marks. Outline offset MUST be preserved so the ring clears the control edge. No focus-specific color token exists and none is to be created.
- Touch targets MUST meet the minimum defined in Sections 34 and 36.

## 48.2 Cards

- Cards are for genuinely grouped content, not for visual variety.
- One card style per surface. Multiple competing card treatments on one page are prohibited.
- Cards MUST NOT be colored to create interest (Section 8.1).
- Prefer hairline separation and whitespace over a card when the content is not truly a discrete unit. Most content does not need a card.

## 48.3 Timeline

- The timeline is a JiTpro signature element and MUST remain construction-literate rather than abstract.
- Structure uses Brand Amber; the active element uses Active Amber (Section 8.1.1).
- A moving indicator MUST NOT obscure the milestone it refers to. It stops adjacent to the milestone with a small visual gap.
- Every element of the timeline animation derives from one shared state (Section 46.3).
- Milestone labels MUST be legible at every supported width. Where a wide layout cannot hold them, a distinct compact layout is provided rather than shrinking type past legibility.

## 48.4 Icons

- Icons support meaning; they never fill space.
- One icon library (`lucide-react`). Mixing icon families is prohibited.
- Icons MUST be sized to their adjacent type, never oversized.
- Decorative icons MUST be hidden from assistive technology.
- Icons MUST NOT substitute for a label.

## 48.5 Badges

- Badges are for genuine status, never for emphasis or decoration.
- Pills and badges MUST NOT be used to make ordinary text look important.
- Badge color MUST carry semantic meaning (Section 8.3), and meaning MUST NOT be conveyed by color alone (Section 8.7).

## 48.6 Section spacing

- Sections share a consistent vertical rhythm and a consistent horizontal container. A shared left edge across every section is a primary signal of discipline.
- **Approved exception (2026-08-08):** a centered editorial statement standing alone in its own section (Section 7.7) deliberately departs from the shared left edge. The departure is the signal - it reads as a pause only because every ordinary section continues to hold the shared edge, so it MUST remain rare. The same narrow allowance covers a deliberately centered final-CTA composition (Section 7.7, centered CTA supporting copy).
- Section boundaries SHOULD be expressed through spacing and hairline borders, not heavy dividers or alternating decoration.
- Where adjacent sections share a background, the transition MUST be seamless. A visible seam between two surfaces intended to read as one is a defect.

## 48.7 Accent usage

- Amber marks what deserves attention. Its effectiveness is a function of how little it is used.
- No surface should carry more than a small number of amber elements. If everything is accented, nothing is.
- Amber MUST NOT be used merely to indicate that something is interactive.

## 48.8 Illustration philosophy

- JiTpro does not use stock photography, illustrated characters, or generic technology imagery.
- Visuals MUST be purpose-built, informational, and construction-specific.
- Prohibited: hard hats, blueprints, skyline silhouettes, abstract node graphs, glowing networks, fake dashboards, and fabricated product screenshots.
- **The crane prohibition is narrowed (2026-08-25).** What is prohibited is the *cliché* — a crane, or any construction machine, used as a generic visual shorthand meaning "construction". A crane MAY appear in approved documentary photography (Section 17.1) when it is **performing the specific work the section is arguing about** and the section would be weaker without it. The test is the one this section already applies: if the image would be equally at home on any other company's site, it is wrong; if it is the literal field condition the surrounding copy has just explained, it is evidence. Each such use is approved individually and recorded in the Decision Log.
- A visual should show a real mechanism the reader recognizes from their own work. If a visual would be equally at home on any other company's site, it is wrong for JiTpro.

## 48.9 Section step and sequence numbers

Status: APPROVED (2026-08-06).

Ordinal markers that number the steps or stages of a section - `01`, `02`, `03` - are one component role and MUST carry one convention.

- Step and sequence numbers use `--jp-brand-amber` at a restrained opacity. They are structural markers, not accents competing for attention (Section 48.7).
- Equivalent numbering in different sections MUST NOT use unrelated conventions. Amber in one section and a neutral gray in another is a consistency defect, not a per-section choice (Section 48 preamble).
- The number is set in the data face at small size with increased tracking (Sections 7.3, 7.7). It is a label, not a metric.
- Numbering MUST NOT be the only expression of sequence. The copy carries the order on its own (Section 8.7).

## 48.10 Figure provenance

Status: APPROVED (2026-08-25).

Any figure carrying numbers, names, or dates that a reader could mistake for evidence MUST make its provenance unmistakable. This section exists because a figure is read as a claim about the world, and a figure whose status is unstated is read as the strongest status it could plausibly have.

**The three statuses.** Every element in a figure is exactly one of these, and the distinction MUST survive into the rendered page:

| Status | Meaning |
| --- | --- |
| **Representative** | Constructed to reflect realistic conditions, sequencing, activities and durations. Not drawn from any actual engagement. |
| **Illustrative** | Added to demonstrate the method, with no basis in the underlying dataset at all. |
| **Methodological** | Pure diagram — the shape of the method, carrying no data of any kind. |

**Prohibited without exception**
- Presenting representative or illustrative content as a **customer result, client outcome, case study, or actual project record**.
- Describing a synthetic dataset as "real", "actual", "anonymized real", or as originating with a client.
- Fabricating a **count** of anything the dataset does not contain — findings, gaps, items resolved, projects served.
- Deriving a figure the source data cannot support, or presenting a derived value in a register that implies a precision the source does not carry.

**Required**
- **One quiet provenance line**, placed with the figure, in the caption register. One sentence. A figure is not a legal document and MUST NOT be burdened with a disclaimer block, a multi-key legend, or per-element asterisks.
- **Where a figure mixes statuses, the visual register MUST separate them.** Data-derived values and content with no basis in the data MUST NOT be rendered in the same visual weight; the element with weaker provenance is drawn *lighter*, never emphasized because it is the one currently being narrated.
- **A derived quantity MUST be expressed in the unit the source actually carries.** Where converting to a more familiar unit requires information the source does not hold — a work calendar, a holiday schedule, a rate — the conversion MUST NOT be performed and rendered as though it were derived. State the quantity in its native unit, or state the approximation as an approximation.
- **Exactly one kind of quantity per figure may be an absolute date.** Every other temporal value is a duration or an offset and MUST be typeset in a different register, so two quantities of different kinds never look like the same kind of thing.

First approved use: the homepage methodology figure (Decision Log 2026-08-25).

---

# 49. Design Decision Process

Purpose: Define how visual decisions are made, so conventions stop being invented inside components.

## 49.1 The required sequence

All future visual work MUST follow this order:

1. **Review** `docs/design/JiTpro_Design_System_v1.0.md`.
2. **Determine whether an existing standard already covers the situation.** If it does, conform to it. Preference, habit, and "this looks better here" are not grounds for deviation.
3. **If a new visual convention is genuinely required:**
   a. Update the Design System **first**.
   b. Record the decision in the Decision Log.
   c. Then update production code to match.

**A new visual convention MUST NEVER be invented inside a React component.**

## 49.2 Why the order is non-negotiable

A convention invented in a component is invisible. It does not announce itself, it is not reviewable as a decision, and the next author cannot tell it apart from an approved standard. Five components each making a locally reasonable choice is exactly how a single brand color becomes five values - the specific failure that produced this section.

Updating the document first makes a visual decision an explicit, reviewable act rather than a side effect of shipping a feature.

## 49.3 Handling conflict with existing implementation

When implementation conflicts with this document:
- **Update the implementation.** The document is the source of truth.
- Do **not** update the document to match what the code happens to do. Documenting an accident does not make it a decision.
- Do **not** silently create a new visual convention to resolve the conflict.
- If the standard itself is genuinely wrong, change the standard through 49.1 - deliberately, with a Decision Log entry - and then change the code.

## 49.4 Migration of pre-existing code

Code written before a standard was approved is non-conforming, not exempt.
- New code MUST conform immediately.
- Modified code SHOULD be brought into conformance as it is touched.
- Wholesale migration of existing surfaces is scheduled as explicit work and MUST NOT be attempted as an uncontrolled side effect of an unrelated change.

### Recorded future cleanup

Non-conforming code identified during a migration but deliberately left out of its scope is recorded here so it is not lost and not silently absorbed into an unrelated change.

| Recorded | Item | Why deferred |
| --- | --- | --- |
| 2026-08-06 | `src/index.css` carries nine unused hero keyframes (`heroPulse1-3`, `heroNodeSlow/Med/Fast`, `heroHouseBuild`, `heroWindowPulse`, `heroAmbientGlow`, `heroFlowMove`). They express ambient pulsing and glowing-network effects prohibited by Sections 46.4 and 48.8, and are referenced only by components the current homepage does not render. | Removing them touches legacy surfaces outside the homepage token migration. Scheduled as separate work per 49.4; the migration PR is not broadened to include it. |
| 2026-08-06 | Homepage decorative treatments - grain/noise overlay, amber radial glows, amber top hairline - raise Section 47.4 restraint questions but are conformant once tokenized. | Evaluated in a later visual-refinement pass. The token migration is conformance work, not a redesign. |

## 49.5 Proposing a change

A proposal to add or change a standard should state:
- what is being proposed, precisely enough to implement;
- what problem it solves that no existing standard solves;
- what it supersedes;
- what production code becomes non-conforming as a result.

Approval is recorded in the Decision Log with a date, owner, and rationale.
