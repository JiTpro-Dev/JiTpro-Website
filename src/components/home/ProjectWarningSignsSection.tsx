/**
 * Section 6 — names the ordinary open conditions a project gets in front of
 * early. These are things to resolve while there is still room to act, not
 * evidence that anything has gone wrong.
 *
 * A ruled two-column list, not checkboxes: nothing here is interactive, so it
 * must not look interactive. The amber rule marking each item is decorative and
 * hidden from assistive tech — the list semantics carry the structure.
 */

const OPEN_CONDITIONS = [
  'Scope that is not yet defined well enough to buy or build',
  'A design decision the schedule depends on, with no required date',
  'An owner selection that still has to be made',
  'A responsibility that has not been assigned to a specific person',
  'An approval that has to clear before downstream work can start',
  'Information the team still needs before the work can be released',
  'A product or material that has to be planned long before the field needs it',
  'A commitment from an architect, consultant, or vendor outside your scope',
];

export default function ProjectWarningSignsSection() {
  return (
    <section className="bg-jp-background px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-[20ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
          What&apos;s the most important thing you need to resolve today to keep the field moving six months from now?
        </h2>
        <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
          The field may not need the results for months. Resources are finite, and when everything feels urgent, priorities have to be clear. JiTpro works backward from when the field needs it to identify what needs to move now.
        </p>

        {/* Multi-column rather than a two-column grid: a grid fills row by row,
            which would make the left column read 1, 3, 5, 7. Columns keep the
            list in its written order down one column and then the next. */}
        <ul className="mt-12 sm:columns-2 sm:gap-x-12 lg:mt-14 lg:gap-x-16">
          {OPEN_CONDITIONS.map((condition) => (
            <li
              key={condition}
              className="flex break-inside-avoid items-start gap-4 border-t border-jp-border/12 py-4 text-[1rem] leading-[1.6] text-jp-text-secondary sm:text-[1.0625rem]"
            >
              <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-jp-brand-amber/70" />
              {/* The two columns are wider than a readable measure at desktop
                  widths, so the text is capped rather than the column. The rule
                  above each item still spans the full column, which keeps the
                  section's rhythm intact (§7.7). */}
              <span className="max-w-[62ch]">{condition}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-[58ch] border-t border-jp-border/12 pt-8 lg:mt-14">
          <p className="text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem]">
            Every project has several of these open at any time. That is normal. What matters is whether each one has a date and an owner before the field needs it.
          </p>
          <p className="mt-5 font-heading text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.01em] text-balance text-jp-brand-amber sm:text-[1.4375rem]">
            The earlier the work becomes visible, the more options your team has.
          </p>
        </div>
      </div>
    </section>
  );
}
