/**
 * Section 6 — helps the visitor recognise the problem may already be running.
 *
 * A ruled two-column list, not checkboxes: nothing here is interactive, so it
 * must not look interactive. The amber rule marking each item is decorative and
 * hidden from assistive tech — the list semantics carry the structure.
 */

const SIGNS = [
  'The schedule assumes information that is not complete',
  'A required decision has no committed date',
  'Nobody can clearly name the next responsible person',
  'An approval is still open, but downstream work is already scheduled',
  'A release date is approaching without everything needed to release',
  'Design information is still changing',
  'Your PM is chasing answers every day',
  'The field will need the result before the current path can reasonably deliver it',
];

export default function ProjectWarningSignsSection() {
  return (
    <section className="bg-jp-background px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-[20ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
          Is your project already running out of options?
        </h2>
        <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
          These are signs that critical work is moving forward without enough control.
        </p>

        {/* Multi-column rather than a two-column grid: a grid fills row by row,
            which would make the left column read 1, 3, 5, 7. Columns keep the
            list in its written order down one column and then the next. */}
        <ul className="mt-12 sm:columns-2 sm:gap-x-12 lg:mt-14 lg:gap-x-16">
          {SIGNS.map((sign) => (
            <li
              key={sign}
              className="flex break-inside-avoid items-start gap-4 border-t border-jp-border/12 py-4 text-[1rem] leading-[1.6] text-jp-text-secondary sm:text-[1.0625rem]"
            >
              <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-jp-brand-amber/70" />
              {/* The two columns are wider than a readable measure at desktop
                  widths, so the text is capped rather than the column. The rule
                  above each item still spans the full column, which keeps the
                  section's rhythm intact (§7.7). */}
              <span className="max-w-[62ch]">{sign}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-[58ch] border-t border-jp-border/12 pt-8 lg:mt-14">
          <p className="text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem]">
            If several of these sound familiar, the project may already be consuming the time available to solve them.
          </p>
          <p className="mt-5 font-heading text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.01em] text-balance text-jp-brand-amber sm:text-[1.4375rem]">
            The earlier the work becomes visible, the more options your team has.
          </p>
        </div>
      </div>
    </section>
  );
}
