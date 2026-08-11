# Homepage $1M Composition Pass — Implementation Plan

**Date:** 2026-08-08
**Status:** PLAN ONLY — nothing implemented. Awaiting Jeff's approval, including the two Design System clarifications in Section 9 (items 1–2), which §49.1 sequences before code.
**Basis:** Live audit of https://jit-pro.com at commit `ad05617` (local main == origin/main at time of inspection), measured live geometry at 1440×900 / 1280×800 / 375×812, and a validated in-browser hero reflow experiment (DOM styles only, discarded on reload).

---

# 1. Executive Plan

This pass converts the homepage from a single-rail composition into a seven-beat rhythm using four moves, all achievable with class-level layout changes to five existing components plus one small new component. No copy changes, no new colors, no new animation, no changes to the timeline's behavior.

The shape of the change: the hero becomes a true one-viewport spread (verified achievable at 1440×900 by live experiment — the full stack including the CTA fits with 24px to spare); the thesis sentence currently buried at 30px at the bottom of `UrgencySection` is extracted into its own full-width centered display moment — the page's turn; the six-month question is promoted from a standard 48px H2 to the page's left-weighted editorial set piece; and the final CTA recomposes around the center axis so its emptiness becomes symmetry instead of absence. A fifth, smaller change differentiates Sections 2 and 3 (still needed after the four moves — they remain adjacent and identically shaped) by connecting Section 3's three separate stage rules into one continuous escalation line, using only the geometry and opacity steps that already exist.

Two of the four moves (centered thesis, centered CTA) technically require a Design System addition before code, per §49.1 — the doc currently codifies "a shared left edge across every section" (§48.6) and prohibits centered body paragraphs (§7.7). That's flagged in Section 9 for approval; it is a documentation step, not a design risk.

The pass also fixes one latent conformance defect found while measuring: the hero's content edge sits at x=120 while every other section sits at x=80 (visible on viewports wider than ~1360px) — a direct §48.6 violation that gets corrected as part of Move 1.

# 2. Current Page Rhythm

Measured at 1440×900 (content container 1280px, sections' text edge at x=80, hero's at x=120):

| # | Section (component) | Alignment | Visual weight | Content width | Primary issue |
|---|---|---|---|---|---|
| 1 | Hero (`HomeHero`) | Split 554/566 | Left-heavy; hollow upper right | 1200 | CTA at y=969 vs 900 fold; H1 5 lines; 229px dead zone above timeline; x=120 edge |
| 2 | Small misses (`ReactiveProjectsSection`) | Left + 3-stage carousel | Left | 1280 | Same silhouette as §3 below it |
| 3 | Problem gets expensive (`UrgencySection`) | Left + 3 columns | Left | 1280 | Twin of section 2; thesis sentence buried at its foot at 30px |
| 4 | Get ahead of the work (`WhatJiTproDoesSection`) | Split 0.9/1.1 | Balanced | 1280 | None — the page's one working rhythm break |
| 5 | What changes (`OutcomesSection`) | Left + 3 columns | Left, light | 1280 | Third hairline-column module; acceptable as transition |
| 6 | Six-month question (`ProjectWarningSignsSection`) | Left + 2-col list | Left, dense | 1280 | Best content dressed as an ordinary section (48px H2) |
| 7 | Final CTA (`HomeFinalCTA`) | Left, 464px block | Severely left; right 60% empty | 464 of 1280 | The closing argument whispered into a corner |

Proposed sequence:

**Hero** split, both columns resolved to one spread → **Small misses** left, discrete stages (carousel) → **Problem gets expensive** left, one continuous escalation line → **THESIS** centered, display scale, full-width band → **Get ahead** split (unchanged) → **Outcomes** left, restrained (unchanged) → **Six-month question** left-weighted display set piece → **FINAL CTA** centered, quiet → footer.

That is: opening → argument (two left beats, differentiated) → turn (center) → explanation (split) → consequence (left, quiet) → decision (left, loud) → resolution (center).

# 3. Move 1 — Hero Composition

**Current measured geometry (1440×900, xl breakpoint):** nav 81px; section top padding 112px (`xl:py-28`); grid `minmax(0,1fr)_minmax(0,1.02fr)` → columns 554px / 566px, gap 80px, `items-center`. Left stack: eyebrow y193 (20px) → H1 y237, **318px tall — 5 lines at 60px/63.6** in a 554px column → amber sub y566, 156px (3 lines at 44px) → paragraph y750, 178px (5 lines at 21px, `max-w-[52ch]` = 546px) → CTA y969–1024. Right column: 373px tall (timeline graphic + caption + Replay), vertically centered, leaving a 229px dead zone above. Hero total 1054px.

**Exact problem:** CTA bottom overshoots the 900px fold by 124px, and the paragraph is clipped mid-sentence at the fold. Secondary: the 5-line H1 is the single largest consumer (318px); the columns don't share a horizon; hero text edge x=120 misaligns with the site-wide x=80.

**Proposed geometry (verified live by DOM experiment):** grid rebalanced to `minmax(0,1.13fr)_minmax(0,0.87fr)` → left ≈633px, right ≈487px; top padding 80px at ≥1440. Result, measured: H1 reflows to **4 lines (254px)**, amber sub to **2 lines (104px)**, CTA lands at **y821–876 — fully above the fold with 24px clearance**; hero total 907px ≈ one viewport. Timeline renders at 487px wide with fully legible labels (it already renders at ~448px on 1024-wide viewports today, so this is inside its proven range).

**Conceptual Tailwind/CSS changes:**
- Grid ratio: `lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)]` → `lg:grid-cols-[minmax(0,1.13fr)_minmax(0,0.87fr)]`.
- Vertical padding: demote `xl:py-28` to asymmetric `xl:pt-20 xl:pb-24`-scale values; similarly reduce `lg:` top padding one step. Bottom padding stays generous — the fold only cares about the top.
- Type-tier remap: the largest hero sizes (`xl:` H1 3.75rem, sub 2.75rem, body 1.3125rem) currently activate at 1280px viewport width, which is why a 1280×800 laptop gets 60px type. Move that top tier from `xl:` to a `min-[1440px]:` variant so 1280–1439 viewports use the current `lg:` sizes. No size is removed — the tier boundary shifts.
- Paragraph measure: `max-w-[52ch]` → `max-w-[58ch]` (within §7.7's approved 52–62ch ceiling), letting the paragraph use the wider column.
- Left-edge fix: restructure the hero's container to the site pattern (horizontal padding on the `<section>`, bare `max-w-7xl mx-auto` inside) so hero text sits at x=80 like every other section.
- Keep `items-center`; with the shorter left stack the residual offset above the timeline (~150px) reads as breathing room, confirmed in the experiment screenshot.

**Files affected:** `src/components/home/HomeHero.tsx` only.

**Responsive behavior:** All changes scoped to `lg:` and above. Below `lg` the hero stacks and mobile/tablet are untouched (mobile was rated positively and its CTA already sits near the fold). At 1280×800 the rebalance plus tier demotion brings the CTA bottom to ≈790 — inside the fold. At 1366×768 the CTA becomes partially visible (~top edge at ≈755) but cannot fully clear a 768px fold through layout alone; the only complete fix at that height is trimming the hero paragraph's final clause (~1 line, ~36px) — **REQUIRES JEFF APPROVAL**, not prescribed here.

**Risk:** H1 line-break quality at intermediate widths (the 4-line break "decision. But your" is acceptable via `text-balance` but should be eyeballed across 1024–1536 at the checkpoint); timeline label legibility at the narrower column (low — already exercised smaller today); entrance stagger unaffected (class-level changes only).

**What remains untouched:** all hero copy, the eyebrow, the CTA label and destination, the timeline component and its animation entirely, the lighting/grain stack, the entrance stagger logic.

# 4. Move 2 — Centered Thesis

**Current measured geometry:** the sentence lives at `UrgencySection.tsx:62-64` as that section's closing paragraph — 30px `font-heading` semibold, `max-w-[46ch]`, left at x=80, y2542 in an 811px section. It is the smallest-set major idea on the page.

**Exact problem:** the company thesis has less visual presence than any section heading, and its band's right half is empty because the statement is a left-rail afterthought.

**Proposed geometry:** extract into a new standalone full-width section between `UrgencySection` and `WhatJiTproDoesSection`. One centered statement, display scale: ~1.875rem base / ~2.5rem sm / ~3.25rem lg / **3.75rem (60px) at xl — equal to the hero H1's maximum, never exceeding it**, `font-heading` extrabold, tight tracking, `text-balance`, measure capped ≈24–28ch so it breaks to 2–3 centered lines (~76 characters of text). Vertical padding one step above standard section rhythm (≈ `py-28`/`py-36` scale) so the moment reads as a pause, not a section. Background: `bg-jp-background` (the surface-banded `UrgencySection` sits above it, `WhatJiTproDoesSection` shares the background below — seamless per §48.6). No eyebrow, no supporting copy, no button, no graphic. Amber only if one word carries it — default is no amber at all; the type scale is the emphasis.

**Conceptual Tailwind/CSS changes:** new component ~30 lines: `<section>` → centered container → single `<p>` (it is an emphasis line behaving as a heading per §7.7's typeface table, not a document heading — keeps the H2 outline clean). `text-center`, `mx-auto`, constrained `max-w`, display sizes as above. `UrgencySection` drops its lines 62–64.

**Files affected:** new `src/components/home/HomeThesisStatement.tsx`; `src/pages/Home.tsx` (insert); `src/components/home/UrgencySection.tsx` (remove the paragraph).

**Responsive behavior:** centered at every breakpoint — a 2–3 line statement centers cleanly on mobile at reduced scale (~1.875rem). Mobile section padding stays at the standard mobile rhythm so the pause doesn't become a void on a phone.

**Risk:** Design System conflict — §48.6's shared-left-edge language and §7.7's centered-copy restrictions require the clarification flagged in Section 9 before code (per §49.1: document first, then implement). Visual risk is low; the main judgment call is the exact display size, flagged for sign-off because §7.5 defines type roles without approved pixel values.

**What remains untouched:** the sentence itself, word for word; `UrgencySection`'s heading, intro, and three stages; the sections on either side.

# 5. Move 3 — Six-Month Question Set Piece

**Current measured geometry:** H2 at 48px, `max-w-[20ch]` → 654px, 4 lines, 215px tall; intro paragraph 62ch; checklist of 8 items in 2 CSS columns, items at 16–17px with `py-4`, 1px×16px amber dashes at 70% opacity; closing block capped 58ch with the amber pull-line at 20–23px. All at x=80. Section 1174px tall.

**Exact problem:** the page's most credible content is typographically indistinguishable from a transition section — same 48px, same silhouette.

**Proposed geometry (stays left-weighted, per direction):**
- Question promoted to display scale: ~3.5rem lg / **4rem (64px) at ≥1440** — the largest statement on the page after the hero and thesis, distinguishing "the decision moment" from ordinary section headings. Measure tightened toward `max-w-[18ch]` so it holds 4–5 strong lines; `text-balance` retained.
- Checklist gains mass to match: item type up one step (to ~1.125–1.1875rem), row padding from `py-4` to ~`py-5`/`py-6`, and the amber dash thickened from 1px to 2px — which also eliminates the subpixel washing-out documented in Section 8. Two-column layout retained (the CSS-columns order-preservation logic at `ProjectWarningSignsSection.tsx:33-36` is good and stays).
- No horizontal offset of the checklist relative to the question. §9 warns against one-off indents, and the shared left edge is the discipline signal — scale and density do the differentiating.
- Section vertical padding up one step so the set piece has more air than its neighbors; closing amber pull-line up one size step so the section's exit matches its entrance.

**Conceptual Tailwind/CSS changes:** size/spacing utilities on the existing H2, list items, dash span, and section padding. No structural changes, no new elements.

**Files affected:** `src/components/home/ProjectWarningSignsSection.tsx` only.

**Responsive behavior:** display scale steps down through the existing breakpoint ladder (~2rem base); checklist already collapses to one column below `sm` — unchanged. Mobile receives the same hierarchy at proportional scale; nothing scoped desktop-only here.

**Risk:** lowest of the four moves — it's a scale pass on an untouched structure. Watch only that the 64px question doesn't crowd the intro paragraph (increase the gap between them one step).

**What remains untouched:** every word of the question, intro, checklist items, and closing copy; the two-column mechanism; list semantics and the decorative-dash `aria-hidden` treatment.

# 6. Move 4 — Centered Final CTA

**Current measured geometry:** entire block capped `max-w-[46ch]` = 464px at x=80; H2 56px, 2 lines; amber subline 24px; paragraph 58ch; button left-aligned below; radial amber glow anchored bottom-left (`18% 100%`); section 792px tall with the right ~60% of a 1440px viewport empty.

**Exact problem:** the page's decision point has the weakest composition on the page — a narrow column pressed into the corner of the widest empty space.

**Proposed geometry:** the same four elements recomposed on the center axis, `sm:` and up: block centered `mx-auto text-center`, heading at its current scale (56px xl is already distinct once the mid-page H2s stay at 48), measure ≈`max-w-[24ch]` so it balances on 1–2 lines; amber subline centered beneath; supporting paragraph centered, measure tightened to ≈`max-w-[52ch]` and kept to its current 3–4 lines (this is the §7.7 exception flagged in Section 9); button centered with its existing hover behavior; vertical spacing opened one step (~`lg:py-40` scale) so the close reads as resolution, not another section. The radial glow moves from `18% 100%` to `50% 100%` so the light follows the axis — same token, same intensity, position only.

**Conceptual Tailwind/CSS changes:** alignment and max-width utilities on the existing block; one gradient position value; padding step. No new elements, no second CTA, no graphic.

**Files affected:** `src/components/home/HomeFinalCTA.tsx` only.

**Responsive behavior:** centered from `sm:` upward. **Below `sm` the block stays left-aligned and stacked with the full-width button — the current mobile presentation, explicitly preserved.** (A centered ragged paragraph over a full-width button reads worse on a phone; mobile was rated positively and stays as-is.)

**Risk:** same Design System clarification as Move 2 (centered supporting paragraph). Visual risk minimal; the heading/subline/button center cleanly. Verify the glow reposition doesn't create a visible seam against the footer border.

**What remains untouched:** heading, subline, paragraph, and button copy verbatim; single-CTA discipline; destination; hover/focus behavior; footer.

# 7. Sections 2 and 3

**Do the four moves alone create enough rhythm?** Almost, but not quite. The moves fix the page's macro-rhythm (fold, turn, set piece, close), but Sections 2 and 3 remain *adjacent* and still share one silhouette: left heading → intro → three hairline-topped columns with mono `01/02/03`. The reader still gets the same shape twice in a row before the thesis turn.

**One restrained differentiation (in `UrgencySection`):** connect its three separate stage rules into **one continuous escalation line** — a single hairline spanning the full row, carrying the three existing dots at each stage's start, with the existing opacity steps (`border/12` → `amber/30` → `amber/65`) applied per segment. Today those values sit on three disconnected fragments; joining them turns three parallel columns into one readable left-to-right escalation — which is what the section's own header comment says the rule is for ("it starts as a neutral hairline and warms toward amber as the project's options run out"). Section 2 keeps its identity as *discrete stages you step through* (carousel); Section 3 becomes *one continuous slide toward the deadline*. Different reading, zero new vocabulary: same tokens, same opacities, same dots, no cards, no animation, no merge. Implementation is a geometry change — the dot+rule row moves from per-`<li>` fragments to a single connected rail above the three text columns.

# 8. Accessibility Findings

**Three-card buttons — RESOLVED, no defect.** `ReactiveProjectsSection.tsx:234-245` renders each stage as a real `<button type="button">` with `aria-pressed`, `onFocus`/`onMouseEnter`/`onClick` all resolving to the same active index, a visible `focus-visible` outline offset to clear the carousel overflow, and an `sr-only` label ("Stage 01: …"). All stage copy is always present in the DOM (visibility is clip-path/opacity only), satisfying §46.7's content-state rule. The live audit's "pointer divs" report was a tooling artifact — the browser tool's interactive-element filter missed absolutely-positioned buttons whose only text is screen-reader-only; its clickable-element fallback then surfaced them by their sr-only labels, which is itself evidence the labels work. The earlier source audit was correct. **This issue is removed from the plan.**

**Checklist amber dash — RESOLVED, no state inconsistency.** `ProjectWarningSignsSection.tsx:42` renders every dash identically: `h-px w-4 bg-jp-brand-amber/70`, static, no animation or per-item logic. The live variation was a rendering artifact: a 1px-tall element at 70% opacity lands on fractional device pixels after display scaling, so some dashes anti-alias toward gray while others render full-strength. **No fix required.** Move 3's planned thickening of the dash to 2px (for set-piece presence) eliminates the artifact as a side effect.

# 9. Design System Impact

**Standards already supporting the plan:**
- §47.3 — hierarchy by typography and spacing first, color last: Moves 2, 3, 4 use exactly that order.
- §10 visual-balance — "alternate information density with breathing room": the proposed rhythm implements it.
- §7.7 whitespace and measure rules — Move 1's wider paragraph stays within the 52–62ch ceiling; nothing tightens leading or tracking to fit the fold (the recovery comes from measure, padding, and tier mapping).
- §48.6 shared left edge — Move 1's hero x=120→x=80 fix *restores* conformance.
- §46.7 — the carousel standard already prohibits auto-advance; the plan doesn't touch the interaction.
- §48.9, §8.8/§8.9 — numbering conventions and tokens unchanged; zero new colors or tokens.

**Clarifications requiring Jeff's approval before implementation (per §49.1, document → Decision Log → code):**
1. **Centered editorial statement** (Move 2): §48.6 codifies "a shared left edge across every section" and §7.7 centers only figure captions. A short addition defining the *centered editorial statement* as an approved page-level moment (short heading-behaving line, constrained measure, no body copy) is needed.
2. **Centered final-CTA supporting copy** (Move 4): §7.7 says body copy MUST be left-aligned and "long centered paragraphs are prohibited." The CTA paragraph is 3–4 lines — a narrow exception (centered supporting copy in a centered CTA block, ≤4 lines, ≤52ch) needs recording, or alternatively the paragraph stays left-aligned inside the centered block (not recommended; it reads as a mistake).
3. **Display type values** (Moves 2, 3): §7.5 defines Display roles but defers pixel values. The proposed values (thesis 60px max, question 64px max) are per-component arbitrary values consistent with existing practice, but the sizes themselves warrant sign-off and a Decision Log line.
4. **`min-[1440px]:` tier boundary** (Move 1): the site currently uses only standard Tailwind breakpoints; introducing one arbitrary variant for the hero's top type tier deserves a one-line Decision Log note.
5. §20's homepage hero/CTA rules are TODO — this pass will set de-facto precedent; the outcomes should be recorded there when implemented.

No Design System edits are part of this task; all five items are flagged for a separate approval step.

# 10. Files That Would Change

| File | Why |
|---|---|
| `src/components/home/HomeHero.tsx` | Move 1: grid ratio, padding, type-tier remap, paragraph measure, left-edge container fix |
| `src/components/home/HomeThesisStatement.tsx` **(new)** | Move 2: the centered thesis section (~30 lines) |
| `src/pages/Home.tsx` | Move 2: insert the new section between `UrgencySection` and `WhatJiTproDoesSection` |
| `src/components/home/UrgencySection.tsx` | Move 2: remove the thesis paragraph (lines 62–64); Section 7: connect the three stage rules into one escalation line |
| `src/components/home/ProjectWarningSignsSection.tsx` | Move 3: question display scale, checklist density, dash thickness, section spacing |
| `src/components/home/HomeFinalCTA.tsx` | Move 4: center the block from `sm:` up, reposition the glow, open vertical spacing |

Nothing else. No changes to `src/index.css` (no new tokens), no changes to `BackwardPlannedTimeline.tsx`, navigation, footer, or any other page.

# 11. Explicitly Protected Elements

Confirmed — this plan does **not** change: homepage copy (every proposed change is layout/scale; the sole copy contingency — trimming the hero paragraph's final clause for 768px-tall laptops — is NOT in scope and is flagged REQUIRES JEFF APPROVAL); procurement messaging (the word appears nowhere in the plan's page content); navigation (no nav CTA, no nav changes); color tokens (zero new colors, zero literal values — one existing gradient's *position* moves in Move 4); hero timeline animation behavior (concept, sequencing, turnaround, pacing, endpoint labels, green progression, single-play, Replay — all untouched; only its column width changes, within its already-proven range); Success Green behavior; the three-card user-controlled interaction (§46.7-conformant today and untouched); footer; all other pages.

# 12. Implementation Sequence

Work on a branch off `main` (this repo deploys `main` on push). Each checkpoint is a headless-browser visual verification against the live dev server — not a test-suite run.

1. **Move 1 (hero)** — the highest-value, most self-contained change. *Checkpoint:* screenshots at 1440×900, 1280×800, 1366×768, 1024, 768, 375; verify CTA above fold at 1440×900, H1 4-line break quality across 1024–1536, timeline label legibility, entrance stagger on a fresh load, hero text edge at x=80.
2. **Move 2 (thesis extraction)** + the `UrgencySection` paragraph removal — one commit, since they're one change. *Checkpoint:* full-page scroll capture; verify the band reads as a pause, surface transitions are seamless (§48.6), mobile scale. Run `npm run typecheck` here (new component + page wiring).
3. **Move 4 (centered CTA)** — done adjacent to Move 2 so the two centered moments are judged together as the page's new axis. *Checkpoint:* full-page rhythm scroll; glow position; confirm mobile (<`sm`) is pixel-identical to before.
4. **Move 3 (six-month set piece)** — after the centered moments exist, so the question's scale is calibrated against the thesis (question louder than any H2, quieter than the thesis' isolation). *Checkpoint:* hierarchy comparison shots of thesis vs. question vs. standard H2.
5. **Section 3 escalation line** (Section 7 of this plan). *Checkpoint:* Sections 2 and 3 in one capture — confirm they now read as different compositions.
6. **Final pass:** fresh-load animation check, `prefers-reduced-motion` check, full responsive sweep (375/768/1024/1280/1440/1920), `npm run lint` + `npm run typecheck` once, complete before/after full-page captures for review.

Rollback is trivial at every step — each move is one component, one commit.

# 13. Expected Result

**Left-heaviness:** resolved as intended — not by abandoning the left rail but by punctuating it. Five of seven content sections stay left-anchored; the two centered beats (turn and resolution) and the balanced splits mean the center of gravity now moves four times down the page instead of zero.

**Rhythm:** the page reads as opening → argument → turn → explanation → consequence → decision → resolution. Adjacent sections no longer share silhouettes: discrete stages, then a continuous escalation, then a centered pause.

**Hierarchy:** four type tiers instead of two — hero (60px) and thesis (60px, isolated) at the top; the six-month question (64px in its left-weighted context) as the decision peak; 48px section H2s; everything else supporting. The page finally says "this matters more" somewhere.

**Negative space:** every large empty area becomes either symmetric (centered sections) or occupied (the hero's dead zone shrinks from 229px to ~150px of intentional breathing room). Emptiness reads as composure, not absence.

**Fold:** at 1440×900 the visitor sees the complete argument — eyebrow, headline, amber statement, full paragraph, primary CTA, and the timeline in its resting or playing state — with 24px of clearance, verified by live experiment. 1280×800 clears; 1366×768 improves substantially and fully clears only with the flagged copy contingency.

**Premium perception:** the materials were already premium; after this pass the composition stops undercutting them. The page should feel like the same disciplined company that made the timeline animation also made every scroll position — which is what a $1M site actually is.
