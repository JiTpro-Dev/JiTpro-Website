# Homepage Lower-Section Content Archive — August 2026

Captured 2026-08-20, immediately before the section-by-section rewrite of the
lower homepage began. This document preserves the exact visitor-facing copy of
every lower-homepage section as it stood in production at that date, so nothing
removed from the live page is lost. The language here may be reused elsewhere.

Copy is reproduced verbatim — punctuation, em dashes, and casing exactly as
rendered. Nothing has been rewritten or editorialized.

Source commit context: branch `feature/homepage-order-control-flow`, following
`da0f109` ("Update homepage content and section structure").

---

## 1. ReactiveProjectsSection (`src/components/home/ReactiveProjectsSection.tsx`)

Presented as a stage selector (Design System §46.8): three numbered pill
controls with a one-time guided progression 01 → 02 → 03 at reading pace,
cancelled permanently by any deliberate interaction.

### Heading

> Small misses compound over time

### Supporting copy

> Projects depend on hundreds of decisions and commitments across the project team. Most problems do not begin as major problems. They begin as small misses—an unanswered question, an unclear responsibility, or a commitment that was discussed but never documented and driven to a required date.

### Stage labels and body copy

**01 — It starts with a small miss**

> A decision stays open. A responsibility is unclear. A requirement is communicated verbally but never clearly assigned, dated, and documented. Everything feels urgent, but what needs attention first isn't always clear.

**02 — The miss becomes a constraint**

> Time passes. The unanswered decision begins affecting approvals, fabrication, sequencing, or delivery. What was easy to solve early becomes harder and more expensive to solve later.

**03 — The field pays for it**

> Superintendents are left to work around what isn't ready. Work gets resequenced. Crews are sent away and called back. Productivity collapses and costs multiply—often without anyone knowing exactly where the money went.

### Interactive-state copy

- Each stage number carries a screen-reader-only prefix: "Stage " (rendering as
  "Stage 01", "Stage 02", "Stage 03" to assistive technology).
- Stage selection is exposed via `aria-pressed` on each pill control; all three
  stage bodies remain in the document at all times, with visibility conveyed by
  opacity only.

---

## 2. UrgencySection (`src/components/home/UrgencySection.tsx`)

Three stages beneath an escalation rail that warms from a neutral hairline
toward amber; the numbers and copy carry the same order on their own.

### Heading

> The problem gets expensive before it becomes obvious.

### Supporting copy

> A missing decision may not stop the field today. But every day it remains open removes time from review, approval, release, fabrication, and delivery. By the time the field feels the impact, the project may have no good options left.

### Stage labels and body copy

**01 — The decision stays open**

> Nothing appears to be wrong yet.

**02 — Time keeps passing**

> The project quietly loses options.

**03 — The field needs the result**

> The team is forced into delay, resequencing, expediting, or recovery.

---

## 3. HomeThesisStatement (`src/components/home/HomeThesisStatement.tsx`)

A single centered editorial statement (approved exception, Decision Log
2026-08-08), set alone in its own section between the problem argument and the
product sections.

### Statement

> JiTpro builds control early—while there is still time to protect the field.

---

## 4. WhatJiTproDoesSection (`src/components/home/WhatJiTproDoesSection.tsx`)

Heading and intro left, three numbered steps stacked right.

### Heading

> JiTpro helps your team get ahead of the work

### Supporting copy

> We help make critical project work visible, assign the next move, and keep the team focused on what must happen before the field is affected.

### Step labels and body copy

**01 — Make the work visible**

> We identify the decisions, information, responsibilities, and commitments your project depends on.

**02 — Put a name and date on it**

> We show who owns the next move and when it must happen to keep the project moving.

**03 — Act while there is still time**

> We help your team lead critical work early, while the project still has reasonable options.

---

## 5. OutcomesSection (`src/components/home/OutcomesSection.tsx`)

Three plain outcomes on the surface band — deliberately no statistics,
percentages, or guarantees.

### Heading

> What changes when the work is led earlier

### Outcome titles and body copy

**Less chasing**

> Your team knows what needs attention before it becomes urgent.

**More time to act**

> Critical decisions and commitments are surfaced while the project still has options.

**More control**

> The team can lead the project forward instead of constantly reacting to what was missed.

---

## 6. HomeFinalCTA (`src/components/home/HomeFinalCTA.tsx`)

The page's single decision point: one action, no secondary link.

### Heading

> Start with one upcoming project.

### Amber emphasis line

> You do not need to change how your whole company works.

### Supporting copy

> Start with the next project. JiTpro works alongside your team to identify the critical work, clarify who owns the next move, and put required dates around the decisions and commitments the project depends on—while there is still time to act.

### CTA copy

> Protect your next project

(Button links to `/contact/contractor`.)
