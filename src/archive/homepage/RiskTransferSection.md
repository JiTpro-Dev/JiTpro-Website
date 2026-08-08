# Risk transfer section — "Risk transfers before the work begins."

**Removed from:** the active homepage, 3rd of 9 sections.

**Why removed:** the rebuild bans abstract management language, and *risk transfer* /
*unmanaged risk migration* are named explicitly as phrases to avoid. The underlying
idea — that upstream uncertainty lands on the general contractor's schedule — survives
on the new homepage, but in ordinary construction words ("The work starts outside your
team", "Every project depends on work you don't control").

**Suggested reuse:** an insights or methodology page, where the more conceptual framing
is appropriate and the vocabulary rules do not apply.

## Dependencies

- `SectionLabel` — see `LegacyHomepageSections.md`
- Native `<details>` / `<summary>` disclosure, no JS

## Original JSX

```tsx
<section className="border-y border-white/10 bg-slate-900 px-6 py-20 md:py-28">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <SectionLabel>Why it happens</SectionLabel>
        <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
          Risk transfers before the work begins.
        </h2>
      </div>
      <div className="space-y-6 text-lg leading-8 text-slate-300">
        <p>
          The moment a project is awarded, unresolved owner decisions, incomplete design, open assumptions, and external constraints begin moving toward you.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {['You may not own the decision.', 'You may not control the design.', 'You may not control the utility, approval, selection, or vendor response.'].map((line) => (
            <div key={line} className="rounded-xl border border-white/10 bg-slate-950/60 p-4 font-heading text-lg font-semibold leading-snug text-slate-100">
              {line}
            </div>
          ))}
        </div>
        <p>
          But once the project starts, the schedule pressure lands on you anyway.
        </p>
        <details className="group rounded-2xl border border-white/10 bg-white/3 p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-xl font-semibold text-slate-100">
            Silent Risk Transfer
            <span className="text-sm text-amber-400 transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 space-y-4 text-slate-300">
            <p>
              Upstream uncertainty becomes downstream responsibility before anyone names it, sequences it, or assigns it a date.
            </p>
            <p>
              JiTpro gives that transferred risk a visible structure so your team can see what has moved onto your plate, who still owns the answer, and when it must be resolved—while there is still time to act.
            </p>
          </div>
        </details>
      </div>
    </div>
  </div>
</section>
```

## Copy, plain text

**Eyebrow:** Why it happens

**Heading:** Risk transfers before the work begins.

**Intro:** The moment a project is awarded, unresolved owner decisions, incomplete
design, open assumptions, and external constraints begin moving toward you.

**Three cards:**
- You may not own the decision.
- You may not control the design.
- You may not control the utility, approval, selection, or vendor response.

**After the cards:** But once the project starts, the schedule pressure lands on you
anyway.

**Disclosure — "Silent Risk Transfer":**
- Upstream uncertainty becomes downstream responsibility before anyone names it,
  sequences it, or assigns it a date.
- JiTpro gives that transferred risk a visible structure so your team can see what has
  moved onto your plate, who still owns the answer, and when it must be resolved—while
  there is still time to act.

> The three "You may not…" lines are the strongest surviving idea here and were the
> direct ancestor of the new homepage's "The work starts outside your team" block.
