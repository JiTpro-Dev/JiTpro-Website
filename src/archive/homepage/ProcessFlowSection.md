# Process flow section — "One missed answer does not stay one missed answer."

**Removed from:** the active homepage, 4th of 9 sections.

**Why removed:** it teaches the methodology — a five-step failure chain plus an
animated schedule video — and the rebuilt homepage diagnoses the contractor's daily
experience instead of explaining the full method. The new urgency section carries the
same escalation idea in three plain stages.

**Suggested reuse:** the methodology page, `src/pages/HowItWorks.tsx`. The five-step
chain and the video belong together and work well where a visitor has already opted in
to learning how JiTpro works.

## Asset dependency — component still present

```
src/components/ProcurementFailureSection.tsx   (exports ProcurementFailureVideo)
```

The component was **not** deleted. `src/components/hero/ProcurementFlowHero.tsx` also
imports it, so only the homepage's import and usage were removed. To restore the
embed elsewhere:

```tsx
import { ProcurementFailureVideo } from '../components/ProcurementFailureSection';
```

## Dependencies

- `SectionLabel` — see `LegacyHomepageSections.md`
- `chainSteps` constant, reproduced below
- `ProcurementFailureVideo`

## Original module-level constant

```tsx
const chainSteps = [
  'Unresolved answer',
  'Missed release',
  'Lost fabrication window',
  'Late delivery',
  'Field recovery',
];
```

## Original JSX

The `StructuralSteelExampleSection.md` block sat between the chain grid and the video.

```tsx
<section className="bg-slate-950 px-6 py-20 md:py-28">
  <div className="mx-auto max-w-6xl">
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>How margin becomes recovery</SectionLabel>
      <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
        One missed answer does not stay one missed answer.
      </h2>
      <p className="mt-6 text-lg leading-8 text-slate-400">
        It moves through the project one handoff at a time until recovery starts spending the margin you expected to keep.
      </p>
    </div>

    <div className="mt-14 grid gap-3 lg:grid-cols-5">
      {chainSteps.map((step, index) => (
        <div key={step} className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
            <span className={`h-2.5 w-2.5 rounded-full ${index < 2 ? 'bg-amber-500' : index < 4 ? 'bg-orange-500' : 'bg-red-500'}`} />
          </div>
          <h3 className="font-heading text-lg font-bold text-slate-100">{step}</h3>
        </div>
      ))}
    </div>

    {/* --- structural steel example block sat here --- */}

    <div className="mx-auto mt-14 max-w-4xl">
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm md:p-4">
        <ProcurementFailureVideo />
      </div>
      <p className="mt-4 text-center text-sm text-slate-400">
        Press play to watch a planned procurement schedule meet reality.
      </p>
    </div>
  </div>
</section>
```

## Copy, plain text

**Eyebrow:** How margin becomes recovery

**Heading:** One missed answer does not stay one missed answer.

**Intro:** It moves through the project one handoff at a time until recovery starts
spending the margin you expected to keep.

**Five-step chain:** Unresolved answer → Missed release → Lost fabrication window →
Late delivery → Field recovery

**Video caption:** Press play to watch a planned procurement schedule meet reality.

> The chain's colour coding stepped amber → orange → red across the five stages. The
> rebuilt urgency section keeps the escalation idea but stays within the amber accent
> rather than going red, per the brief's instruction to communicate urgency without
> fear-based language.
