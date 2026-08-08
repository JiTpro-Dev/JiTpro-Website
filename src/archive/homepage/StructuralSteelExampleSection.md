# Structural steel example — "You have lived this one"

**Removed from:** the active homepage, a callout block inside the 4th of 9 sections
(see `ProcessFlowSection.md` for the section that contained it).

**Why removed:** it is a long worked narrative — five paragraphs — and the rebuilt
homepage is meant to be understood on a first read without dense explanation blocks.
It also quantifies lost margin in dollars, and *margin* is now banned on the homepage.

**Suggested reuse:** a dedicated case study page. This is the single most concrete,
most recognisable piece of writing on the old homepage and deserves a proper home
rather than deletion. The numbers ($255,000 projected / $87,000 consumed) should be
verified before republishing.

## Dependencies

- `SectionLabel` — see `LegacyHomepageSections.md`

## Original JSX

```tsx
<div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
  <SectionLabel>You have lived this one</SectionLabel>
  <div className="space-y-4 text-lg leading-8 text-slate-300">
    <p>
      Ongoing design changes keep impacting the structural steel package. You push hard, but the process stalls. Submittals cycle through review after review until the fabricator loses its production slot. Delivery slips eight weeks.
    </p>
    <p>
      Now you&apos;re resequencing trades, expediting steel, paying overtime, and burning management hours just to protect the completion date.
    </p>
    <p>
      The owner insists the steel should have arrived on time. As far as they&apos;re concerned, that&apos;s your responsibility—not theirs.
    </p>
    <p>
      Your original projections showed $255,000 in margin. Recovery for this one procurement package consumed $87,000 of it.
    </p>
    <p className="font-heading text-xl font-semibold leading-snug text-slate-100">
      Nothing failed in the field. The margin was lost the day an unresolved commitment went unmanaged.
    </p>
  </div>
</div>
```

## Copy, plain text

**Eyebrow:** You have lived this one

1. Ongoing design changes keep impacting the structural steel package. You push hard,
   but the process stalls. Submittals cycle through review after review until the
   fabricator loses its production slot. Delivery slips eight weeks.
2. Now you're resequencing trades, expediting steel, paying overtime, and burning
   management hours just to protect the completion date.
3. The owner insists the steel should have arrived on time. As far as they're
   concerned, that's your responsibility—not theirs.
4. Your original projections showed $255,000 in margin. Recovery for this one
   procurement package consumed $87,000 of it.
5. **Nothing failed in the field. The margin was lost the day an unresolved commitment
   went unmanaged.**

> The closing line — "Nothing failed in the field" — is the thesis the whole rebuilt
> homepage now carries, expressed there as "The field sees the problem last."
