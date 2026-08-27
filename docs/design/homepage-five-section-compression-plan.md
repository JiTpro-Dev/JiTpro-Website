# Five-Section Homepage Compression Plan

**Date:** 2026-08-26
**Branch:** `feature/homepage-buyer-journey` (at `ce68ecc`, plus one uncommitted approved copy edit in `ResponseWindowSection.tsx`)
**Status:** APPROVED by Jeff Kaufman, 2026-08-26. Approved with all four of the item-11 recommended defaults, with the clarification that the response-ladder tier bodies are visual labels trimmed to one line each. Build order: preserve the Beat-3 state (done: tag `homepage-eight-section-beat3-2026-08-26`), governance first, then Sections 01–03 only; Sections 04–05 STOP for separate approval.

**Directive:** compress the eight-section buyer-journey homepage rebuild to approximately five sections before Beat 4 (the methodology figure). Buyer journey (Recognition → Understanding → Interest → Respect → Trust → Timing/Action) remains valid; stages share sections. Reference principle only (not visual style): warpware.co — one idea → short explanation → visual evidence → move on. JiTpro's visual identity, Design System, dark/light system, and brand language are unchanged.

---

**Headline finding:** the simplification is even more justified than assumed. Measured at 1440×900, the current Beat-3 page is 8,320px (9.2 viewports) — shorter than the pre-rebuild page's 10,775px on desktop — but on mobile (390px) the current page is **11,043px, already longer than the pre-rebuild page's 9,855px**. The eight-section plan was losing on mobile before Trust was even built.

## 1–3. Compression map

| # | Current rendered component | Destination | Verdict |
|---|---|---|---|
| 1 | `HomeHero` | 01 Hero | **KEEP** (refine padding only) |
| 2 | `ProblemDetectionSection` | 02 Problem, movement A | **COMBINE + REFINE** |
| 3 | `DependencyChain` (custom-window figure) | 02 Problem, movement A | **KEEP** verbatim |
| 4 | `ResponseWindowSection` | 02 Problem, movement B | **COMBINE + REFINE** |
| 5 | `JiTproTurnSection` | 03 Method, opening | **COMBINE + REFINE** (heavily cut) |
| 6 | `MethodologySection` (selector rail) | 03 Method, core | **KEEP** architecture, fold in |
| 7 | `MethodologyFigure` (reserved footprint) | 03 Method | **KEEP** — Beat 4 untouched |
| 8 | `methodologyStages.ts` (stage doctrine) | 03 Method | **KEEP** verbatim (doctrine) |
| 9 | `HomeConstructionImage` | 03 Method, terminal band | **MOVE** (fold in per §17.1, as already planned) |
| 10 | `WhatJiTproDoesSection` | — | **REMOVE** (already slated for removal; its three steps are a thin summary of what 03 now teaches properly) |
| 11 | `OutcomesSection` | 04 Why JiTpro | **COMBINE + REFINE** |
| 12 | Trust section (unbuilt Beat 5) | 04 Why JiTpro | absorbed as one credibility movement, §17.2 constraints intact |
| 13 | `HomeFinalCTA` | 05 Timing + CTA | **KEEP + REFINE** (add timing markers) |
| 14 | `BackwardPlannedTimeline` | — | preserved intact, still unmounted (protected asset) |

## 4. Copy/assets preserved

- **Hero:** H1, the growth sentence, the category line, "Start with one project." All already conform (no eyebrow, no diagram, one CTA). "We work alongside your team, on one project" is accurate to the internal-team engagement and stays.
- **Problem:** the six-month question (section H2); the symptom taxonomy sentence ("A missing selection. An unresolved detail…"); the full custom-window chain, labels and notes verbatim; "The problem gets expensive before it becomes obvious." as the movement-B primary; "The problem does not go away. Your options do." as its secondary heading; the approved paragraph beneath it, verbatim; the four-tier ladder with its warming rail; one trimmed sentence of the ownership-vacuum close ("nobody's job was the whole sequence") as the pivot to 03.
- **Method:** the operating-requirement statement as the section H2; "Everything upstream is planned and managed backward from those requirements."; the five stage titles and bodies verbatim; the selector rail exactly as built (normal scroll, no autoplay — nothing restored); the reserved figure footprint and all §46.8.1 constraints; the thesis line "JiTpro builds control early—while there is still time to protect the field." as the section close; the jobsite photograph as the §17.1 terminal band.
- **Why JiTpro / CTA:** Outcomes' non-generic bullets ("knows what needs attention before it becomes urgent", "surfaced while the project still has options") as raw material; "Start with one upcoming project."; "You do not need to change how your whole company works."
- **Photography:** the below-hero team photograph stays as movement A's environment — it is the strongest recognition asset and shortening the copy beside it shortens the whole movement.

## 5. Copy/assets removed

- **Problem:** the three intro paragraphs compress to roughly one and a half (the "meetings, spreadsheets and memory" paragraph is the main cut — its idea survives in the trimmed close); the chain's own intro pair ("None of it looks like a schedule problem…") shrinks to one sentence; the two-line amber close is recast (see conflict 2); the current 60-word closing paragraph shrinks to one sentence.
- **Method:** the What/When band goes entirely (it restates the two halves the display statement already says); the orientation paragraph goes (category is in the hero, engagement model moves to 04); "What we actually do, in the order we do it." goes as an H2 (the requirement → backward line → rail sequence replaces it); the methodology head paragraph shrinks to ~40 words.
- **Elsewhere:** all of `WhatJiTproDoesSection`; Outcomes' "More control" claim (rewritten concretely per the directive's list); the CTA body paragraph rewritten around timing (at award, during preconstruction, during buyout, before mobilization) instead of restating the method.

Budget check: Problem lands ≈165 words (inside 120–180) **if** the ladder's tier titles/bodies count as diagram labels like the chain's — see item 11.4. Method lands ≈85 words of prose (inside 75–125).

## 6. New component structure

```
src/pages/Home.tsx            – five mounts, header comment rewritten
src/components/home/
  HomeHero.tsx                – refined in place
  ProblemSection.tsx          – NEW: absorbs ProblemDetectionSection + ResponseWindowSection
    └ DependencyChain.tsx     – unchanged; ladder TIERS data moves in with movement B
  MethodSection.tsx           – NEW: absorbs JiTproTurnSection + MethodologySection;
    └ MethodologyFigure.tsx     renders the figure footprint and closes with the
    └ methodologyStages.ts      terminal-band <img> from HomeConstructionImage
  WhyJiTproSection.tsx        – NEW: trust movement + engagement model + what changes
  HomeFinalCTA.tsx            – refined in place
Deleted: ProblemDetectionSection, ResponseWindowSection, JiTproTurnSection,
         MethodologySection, WhatJiTproDoesSection, OutcomesSection,
         HomeConstructionImage (element moves, file goes)
```

Process safety: commit the currently uncommitted Response Window copy edit first, then tag the branch (`homepage-eight-section-beat3-2026-08-26`) before compression, mirroring the pre-rebuild tag. Deleted components live in git history; no archive copies.

## 7. Dark/light assignment

| Section | Surface |
|---|---|
| 01 Hero | `--jp-background` |
| 02 Problem | `--jp-background` — one ground for the whole section |
| 03 Method | `--jp-surface-light` — the entire light act |
| 04 Why JiTpro | `--jp-surface` (elevated dark band, `border-y`, as Outcomes today) |
| 05 Timing + CTA | `--jp-background` with the existing amber floor glow |

This differs from Jeff's sketch in two places, deliberately. Response Window's current `--jp-surface` band existed to close a three-section act; inside a single Problem section a mid-section surface change would read as two sections, defeating the merge. And 04 on `--jp-surface` rather than plain background means every act boundary lands on a genuine change of environment (background → light → elevated → deepest dark) with no two adjacent sections sharing a seam. No new colors; the three-act logic is intact.

## 8. Estimated desktop scroll reduction

Measured baselines at 1440×900: pre-rebuild tag (`homepage-pre-buyer-journey-rebuild-2026-08-25`) **10,775px** desktop / 9,855px mobile (390px); current Beat-3 **8,320px** desktop / 11,043px mobile; completed eight-section plan (projected with a built Trust section) ~9,300px desktop.

Five-section target, per section: Hero ~700 (now 776) · Problem ~1,550 (now 2,361) · Method ~1,850 including terminal band (now 2,792 across three mounts) · Why JiTpro ~700 (now 1,191 across two stand-ins) · CTA ~600 (now 698) · nav/footer ~500. **Total ≈5,900px (~6.5 viewports): roughly 29% shorter than today's build, 37% shorter than the completed eight-section projection, 45% shorter than the pre-rebuild page.** Mobile should fall from 11,043px toward ~7,500px, mostly from the removed sections and halved Problem copy. The Method section stays the tallest by design.

## 9. Design System / governance changes required

1. **New Decision Log entry** authorizing the five-section architecture: supersedes the eight-slot map and beat plan; records that the three-act logic, the light-surface first-use, the terminal-band first-use, and the founder-presence first-use all carry forward into new slots; records the surface assignment above; records that "detection and consequence are separate sections" becomes the intra-section rule "two movements, one causal story told once."
2. **§20.1 addition — engagement-model doctrine.** Not currently codified anywhere: JiTpro works with the general contractor's internal construction management team; it does not directly coordinate owners, architects, engineers, consultants, subcontractors, vendors, or trade partners; the GC remains the point of coordination. This needs its own subsection and log entry before the 04 copy is written.
3. **Nothing else.** No token, color, typography, or interaction changes. §46.8, §46.8.1, §48.3, §48.9, §48.10, §17.1, §17.2 all survive unchanged. The obsolete "approved for installation" language is already fully retired — remaining occurrences are the retirement records themselves, which are correct as history. No new visual conventions are needed: the demoted movement headings use the existing sub-head register (the 1.31–1.44rem semibold already in production).

## 10. Conflicts created by combining

1. **Two H2-scale statements per combined section** (§7.7: one primary statement per surface). Resolution: Problem keeps the six-month question as its only H2 and "The problem gets expensive before it becomes obvious." steps down to the movement register (still clearly above its secondary heading); Method keeps the requirement as its only H2.
2. **Amber budget in the combined Problem section** (§48.7): the amber two-line close, the amber warming rail, and amber ordinals would stack three amber systems on one surface. Resolution: the rail keeps amber (the warming *is* the escalation argument); the close is recast in primary ink; ordinals stay (structural, restrained).
3. **Surface seam** between the two Problem movements — resolved by the one-ground decision in item 7.
4. **Binding comments contradict the merge:** `DependencyChain` and both problem sections carry "Section 3 MUST NOT re-narrate this package / merging them makes one section" as doctrine. Superseded by Jeff's directive; rewritten to the intra-section form.
5. **Duplicate category line:** the hero and JiTpro Turn both state "JiTpro is a consultancy-first program…" — invisible when five sections apart, glaring when adjacent-ish. Resolved by cutting it from 03.

## 11. Disagreements / recommendations for Jeff to rule on

1. **Keep the amber close's words, not its color.** "The field is where you find out. It is not where it started." is the strongest line in the problem chapter and is exactly the hinge the directive asks for between movements A and B — it converts "why didn't we see it" into "what happens while it stays unresolved." Recommendation: keep it in ink as the movement transition rather than cutting it for budget.
2. **Terminal field band: keep, but it's the first cut if 03 runs heavy.** Folding it in follows the standing §17.1 approval and gives Method its "visual evidence" beat until the Beat-4 figure exists. Dropping it saves ~700px; once the accumulating figure is built, revisit whether the section needs two visuals.
3. **Section 04 surface:** proposed `--jp-surface` where Jeff's sketch says dark — same dark family, cleaner act transitions (reasoning in item 7). Cheap to revert.
4. **One budget ambiguity to rule on at approval:** do the response-ladder tier titles/bodies count as narrative copy or as visual labels? As labels (recommended, with bodies trimmed to one line each), Problem fits the 120–180 budget. As narrative copy, the tier bodies must go entirely and the ladder becomes titles-only.

## Documentation that goes stale

All of it is in code comments, not the Design System: the `Home.tsx` header (three-act/eight-slot map, beat plan, stand-in notes) and every section component's "Section N" cross-references (`HomeHero` "sections 2 through 5"/"seven more sections", the Problem pair's separation contract, `JiTproTurnSection` "Section 5 does that", plus the ordinal comments in `DependencyChain`, `MethodologySection`, `OutcomesSection`, `HomeFinalCTA`). All are rewritten or deleted with their components. The Design System itself stays accurate — the only wording worth touching is §17.2's first-approved-use naming "the homepage trust section," which the new Decision Log entry can redirect to the Why JiTpro section's trust movement. The audit docs and `src/archive/homepage/README.md` reference none of the current components and are unaffected.
