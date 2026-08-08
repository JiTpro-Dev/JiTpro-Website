# Homepage archive

Sections removed from the active homepage during the **simplified homepage rebuild**.

**Archive date:** 2026-08-04

Nothing here is deleted content — it is preserved verbatim so it can be moved to a
better home later. None of it is imported by the active site.

---

## Why these files are Markdown, not `.tsx`

`tsconfig.app.json` uses `"include": ["src"]`, and `eslint.config.js` matches
`**/*.{ts,tsx}` while ignoring only `dist`. A `.tsx` file placed anywhere under
`src/` is therefore type-checked and linted even when nothing imports it, so an
archive of detached section components would either break `npm run typecheck` on
its unresolved props and imports, or force us to maintain dead code forever.

Storing the JSX inside fenced code blocks keeps every line of markup, copy, and
class name intact while guaranteeing zero effect on the build. To reuse a section,
copy the block into a real component and reconnect its imports.

---

## Complete page snapshot

The entire pre-rebuild homepage — every section, in its original order, with all
module-level constants and helpers — is preserved as a working component file:

```
src/pages/Home.before-simplified-homepage.tsx
```

That file follows the existing `Home.before-*.tsx` convention used elsewhere in
`src/pages/`. It compiles, so it is the best reference if you want to see the old
page whole rather than section by section. The files in this directory break the
same page into individually reusable pieces with notes on each.

---

## What was removed

| Archive file | Section on the old homepage | Position | Why it was removed |
|---|---|---|---|
| `FounderSection.md` | "Built by a builder" — founder photo, biography, link to founder story | 8th of 9 | The homepage must stay focused on the contractor and their project, not on JiTpro's founder. |
| `RiskTransferSection.md` | "Risk transfers before the work begins." | 3rd of 9 | Built on abstract risk-transfer language the rebuild explicitly bans. |
| `StructuralSteelExampleSection.md` | "You have lived this one" — structural steel narrative | inside 4th of 9 | A long worked example; too much reading for a homepage, and it quantifies lost margin. |
| `ProcessFlowSection.md` | "One missed answer does not stay one missed answer." — five-step failure chain and the animated schedule video | 4th of 9 | Methodology teaching. The rebuilt page diagnoses the problem rather than explaining the full method. |
| `LegacyHomepageSections.md` | The problem / The JiTpro approach / What changes / Start where the risk is / old final CTA | 2nd, 5th, 6th, 7th, 9th of 9 | Superseded by the new, simpler sections; retained for the copy. |

### Language the rebuild retired

Two words are now banned from the homepage: **procurement** and **margin**. Much of
the archived copy is built around both, so reusing any of it elsewhere means
rewriting those passages — or placing them somewhere the ban does not apply
(methodology pages, sales material, articles). The archived text is kept exactly as
written; it has not been sanitised.

Also retired from the homepage: describing JiTpro as software or as a "layer",
abstract phrases such as *silent risk transfer* and *unmanaged risk migration*, and
the dollar-denominated recovery example.

---

## Suggested reuse

| Content | Suggested destination |
|---|---|
| Founder biography and personal story | `src/pages/About.tsx` or `src/pages/FounderStory.tsx` |
| Founder photograph | About or Founder page (already in use on `FounderStory.tsx`) |
| Structural steel example | A dedicated case study page |
| Failure-chain flow and schedule video | Methodology page — `src/pages/HowItWorks.tsx` |
| Risk-transfer concepts | Insights or methodology page |
| Deeper educational copy | Articles, sales material, or service pages |

---

## Asset dependencies

**Founder photograph — do not delete.**

```
public/assets/team/jeff.jpg
```

Referenced in code as `${import.meta.env.BASE_URL}assets/team/jeff.jpg`. It is
**still in active use** on `src/pages/FounderStory.tsx` and
`src/pages/HomepageConcept.tsx`, so removing the homepage reference did not orphan
it. The file stays exactly where it is.

**Animated schedule video component — still present in the codebase.**

```
src/components/ProcurementFailureSection.tsx   (exports ProcurementFailureVideo)
```

The active homepage no longer imports it. The file was left untouched because
`src/components/hero/ProcurementFlowHero.tsx` also imports it. Nothing was deleted;
only the homepage's usage was removed. See `ProcessFlowSection.md` for how the
homepage embedded it.

**Icons.** The archived sections used `lucide-react` icons — `CheckCircle2`,
`Clock3`, `Eye`, `FileWarning`, `ShieldCheck`, `UserCheck`. The package is still a
dependency; those imports were simply dropped from `Home.tsx`.

**Shared helper.** Every archived section used a local `SectionLabel` component that
lived at the top of the old `Home.tsx`. It is reproduced in
`LegacyHomepageSections.md` so the sections can be restored without hunting for it.
