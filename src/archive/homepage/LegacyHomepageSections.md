# Legacy homepage sections

The remaining sections removed during the simplified homepage rebuild, in their
original page order. Each was superseded by a simpler section rather than moved.

Sections with their own archive file: `FounderSection.md`, `RiskTransferSection.md`,
`ProcessFlowSection.md`, `StructuralSteelExampleSection.md`.

---

## Shared helper — `SectionLabel`

Every archived section used this. It lived at the top of the old `Home.tsx` and is not
part of the rebuilt page.

```tsx
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-amber-500">
      {children}
    </p>
  );
}
```

---

## 1. The problem — "Margin disappears when clarity comes too late."

**Position:** 2nd of 9, directly below the hero.
**Why removed:** built entirely on *margin* and *procurement*, both now banned on the
homepage. Replaced by "Why projects become reactive".
**Suggested reuse:** sales material or a service page.

```tsx
<section className="bg-slate-950 px-6 py-20 md:py-28">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <SectionLabel>The problem</SectionLabel>
        <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
          Margin disappears when clarity comes too late.
        </h2>
      </div>
      <div className="space-y-6 text-lg leading-8 text-slate-300">
        <p>
          Most contractors do not lose margin because something failed in the field.
        </p>
        <p>
          They lose it when the field is forced to recover from decisions, approvals, releases, fabrication windows, or deliveries that should have been resolved earlier.
        </p>
        <p>
          And growth makes it worse. The visibility that ran one or two projects out of your head does not stretch to five. Nothing in the field changed—you ran out of room to see everything coming.
        </p>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <p className="font-heading text-2xl font-semibold leading-snug text-slate-100">You probably do not call it procurement.</p>
          <p className="mt-3 text-slate-300">
            You call it waiting on design. Waiting on owner selections. Waiting on utility approvals. Waiting on long-lead releases. That is procurement—the path from decision to delivery—and it is running on every one of your projects whether anyone is managing it or not.
          </p>
        </div>
        <p className="font-heading text-2xl font-semibold leading-snug text-slate-100">
          When that path breaks, the schedule absorbs it first. Then the margin does.
        </p>
      </div>
    </div>
  </div>
</section>
```

**Worth keeping:** *"The visibility that ran one or two projects out of your head does
not stretch to five."* — the clearest sentence about why growth makes this worse. It
has no banned vocabulary and could be reused as-is.

---

## 2. The JiTpro approach — "Turn hidden risk into a project control plan."

**Position:** 5th of 9.
**Why removed:** describes JiTpro as a "layer before execution", which reads as a
software description. Replaced by "JiTpro helps your team get ahead of the work".
**Suggested reuse:** methodology page.

```tsx
const solutionSteps = [
  {
    icon: Eye,
    title: 'Expose what is unresolved',
    body: 'Decisions, approvals, assumptions, releases, fabrication windows, and outside constraints are made visible before they become field problems.',
  },
  {
    icon: UserCheck,
    title: 'Show who still owns the answer',
    body: 'JiTpro separates accountability from blame so you can see what has moved onto your project without pretending you control every upstream decision.',
  },
  {
    icon: Clock3,
    title: 'Sequence when it must move',
    body: 'The project works backward from when the field needs each package, so your team can see the date pressure before margin becomes recovery cost.',
  },
];
```

```tsx
<section className="border-y border-white/10 bg-slate-900 px-6 py-20 md:py-28">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <SectionLabel>The JiTpro approach</SectionLabel>
        <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
          Turn hidden risk into a project control plan.
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          JiTpro is not a field tool and not another scheduler. It is the layer before execution: one place that holds every critical package&apos;s path from decision to delivery.
        </p>
        <p className="mt-4 text-lg leading-8 text-slate-400">
          It does not ask you to rebuild your company. It starts with one project and makes the margin threats visible while there is still time to control them.
        </p>
      </div>

      <div className="grid gap-4">
        {solutionSteps.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-xl border border-slate-800 bg-white/3 p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-100">{item.title}</h3>
                  <p className="mt-2 leading-7 text-slate-400">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>
```

**Worth keeping:** *"JiTpro separates accountability from blame so you can see what has
moved onto your project without pretending you control every upstream decision."* —
this is the sharpest statement of the boundary the brief insists on, that JiTpro never
claims to control other parties.

---

## 3. What changes — "Your team stops carrying project risk in their heads."

**Position:** 6th of 9.
**Why removed:** superseded by the simpler "What changes when the work is led earlier",
which drops the *margin* reference.
**Suggested reuse:** service page.

```tsx
const outcomes = [
  'Open decisions stop hiding in meetings and memory.',
  'Critical packages are visible before the field is waiting.',
  'Margin exposure is tied to the project, not buried in a generic task list.',
];
```

```tsx
<section className="bg-slate-950 px-6 py-20 md:py-28">
  <div className="mx-auto max-w-6xl">
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>What changes</SectionLabel>
      <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
        Your team stops carrying project risk in their heads.
      </h2>
    </div>

    <div className="mt-14 grid gap-6 lg:grid-cols-3">
      {outcomes.map((point) => (
        <div key={point} className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <CheckCircle2 className="mb-5 text-amber-400" size={24} />
          <p className="text-lg leading-8 text-slate-200">{point}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Worth keeping:** *"Open decisions stop hiding in meetings and memory."*

---

## 4. Start where the risk is — project signals checklist

**Position:** 7th of 9.
**Why removed:** superseded by "Is your project already running out of options?", which
uses eight fuller diagnostic statements instead of six fragments.
**Suggested reuse:** sales material or a qualification questionnaire.

```tsx
const projectSignals = [
  'Selections still moving',
  'Submittals waiting on answers',
  'Approvals consuming float',
  'Long-lead items not released',
  'Delivery dates disconnected from field need',
  'PMs chasing risk from memory',
];
```

```tsx
<section className="bg-slate-900 px-6 py-20 md:py-28">
  <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
    <div>
      <SectionLabel>Start where the risk is</SectionLabel>
      <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
        If these are showing up on one upcoming project, start there.
      </h2>
      <p className="mt-6 text-lg leading-8 text-slate-400">
        JiTpro is not a rescue tool. It is the system you put in place before the next project starts absorbing preventable procurement pressure.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <div className="grid gap-3">
        {projectSignals.map((signal) => (
          <div key={signal} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-3">
            <FileWarning className="text-amber-400" size={18} />
            <span className="text-slate-200">{signal}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

---

## 5. Old final CTA — "You do not need to change how your whole company works."

**Position:** 9th of 9.
**Why removed:** replaced by the rebuilt final CTA, which keeps the same
start-with-one-project promise but drops the competing secondary button. The old
version offered two actions; the brief now requires exactly one.
**Suggested reuse:** none needed — the message survives on the new page.

```tsx
<section className="border-t border-white/10 bg-slate-950 px-6 py-20 md:py-28">
  <div className="mx-auto max-w-5xl text-center">
    <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300">
      <ShieldCheck size={28} />
    </div>
    <SectionLabel>Start with one upcoming project</SectionLabel>
    <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-6xl">
      You do not need to change how your whole company works.
    </h2>
    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
      Start with the next project. Put its critical packages on one board—what is unresolved, who owns the answer, and when it must move—while there is still time to act on it.
    </p>
    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link to="/contact/contractor" className="...">
        Protect your next project
        <ArrowRight size={16} />
      </Link>
      <Link to="/roles/general-contractors" className="...">
        See how it works for GCs
      </Link>
    </div>
  </div>
</section>
```

---

## Original hero body copy, pre-rebuild

The hero survived the rebuild, but its final clause changed because *margin* is now
banned. Recorded here for completeness.

**Before:** JiTpro helps general contractors identify and manage the critical decisions,
responsibilities, and commitments that originate across the project team—before those
unmanaged dependencies become schedule delays, field recovery, **and margin loss**.

**After:** JiTpro helps general contractors identify and manage the critical decisions,
responsibilities, and commitments that originate across the project team—before those
unmanaged dependencies become **schedule delays and expensive field recovery**.
