# Founder section — "Built by a builder"

**Removed from:** the active homepage, 8th of 9 sections (between the project-signals
section and the final CTA).

**Why removed:** the rebuilt homepage must stay focused on the contractor and their
project. Founder credibility is not the homepage's job, and the brief explicitly
rules out replacing this with a smaller founder card elsewhere on the page.

**Suggested reuse:** `src/pages/About.tsx`, or fold into
`src/pages/FounderStory.tsx`, which the "Read Jeff's story" link already pointed at.

## Asset dependency — do not delete

```
public/assets/team/jeff.jpg
```

Referenced as `${import.meta.env.BASE_URL}assets/team/jeff.jpg`. Still in active use
on `src/pages/FounderStory.tsx` and `src/pages/HomepageConcept.tsx`, so the file
remains live in the repository. Alt text was `"Jeff Kaufman, Founder of JiTpro"`.

## Dependencies

- `Link` from `react-router-dom`
- `ArrowRight` from `lucide-react`
- `SectionLabel` — see `LegacyHomepageSections.md`

## Original JSX

```tsx
<section className="border-t border-white/10 bg-slate-950 px-6 py-20 md:py-28">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
      <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
        <div className="aspect-4/5 overflow-hidden rounded-xl border border-white/10">
          <img
            src={`${import.meta.env.BASE_URL}assets/team/jeff.jpg`}
            alt="Jeff Kaufman, Founder of JiTpro"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
      <div>
        <SectionLabel>Built by a builder</SectionLabel>
        <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
          &ldquo;JiTpro is the system I wish I&apos;d had 38 years ago.&rdquo;
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Jeff Kaufman has spent 38 years delivering complex construction projects, managing hundreds of millions of dollars in work across luxury residential, hospitality, wineries, and commercial construction. Over those years, one pattern became impossible to ignore: projects were routinely awarded with incomplete information, unresolved owner decisions, and procurement commitments that no one had fully identified or taken control of.
        </p>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          JiTpro applies a different approach. It identifies every missing decision and commitment at project award, assigns each one to the responsible party with a deadline, and sequences procurement backward from the dates materials are actually needed in the field—giving contractors visibility while they still have time to protect their schedule and margin.
        </p>
        <Link
          to="/founder-story"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300 focus:outline-hidden focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Read Jeff&apos;s story
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
</section>
```

## Copy, plain text

**Eyebrow:** Built by a builder

**Heading:** "JiTpro is the system I wish I'd had 38 years ago."

**Paragraph 1:** Jeff Kaufman has spent 38 years delivering complex construction
projects, managing hundreds of millions of dollars in work across luxury
residential, hospitality, wineries, and commercial construction. Over those years,
one pattern became impossible to ignore: projects were routinely awarded with
incomplete information, unresolved owner decisions, and procurement commitments that
no one had fully identified or taken control of.

**Paragraph 2:** JiTpro applies a different approach. It identifies every missing
decision and commitment at project award, assigns each one to the responsible party
with a deadline, and sequences procurement backward from the dates materials are
actually needed in the field—giving contractors visibility while they still have
time to protect their schedule and margin.

**Link:** Read Jeff's story → `/founder-story`

> Note: both paragraphs use *procurement* and *margin*, which are now banned on the
> homepage. Reuse elsewhere, or rewrite if this ever returns to the homepage.
