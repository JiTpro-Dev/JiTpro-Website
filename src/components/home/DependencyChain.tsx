/**
 * The cause-and-effect chain for Section 2 — one unresolved condition
 * displacing everything downstream of it, on a single named package.
 *
 * COMPOSITION (binding, 2026-08-25): this figure spans the full container. It
 * exists partly to break the left reading column that the previous
 * implementation of this section never left, so it must never be constrained to
 * the copy measure.
 *
 * The argument is carried by the descending step, not by colour: the rule runs
 * straight while each consequence lands lower than the one that caused it, so
 * the displacement is the shape of the figure. Nothing here is amber — the
 * section spends its one accent on the closing line (§48.7).
 *
 * PROVENANCE (§48.10): methodological. This is the shape of a mechanism, not a
 * dataset — it carries no durations, no dates and no counts, so it makes no
 * claim a reader could mistake for evidence, and needs no provenance line. The
 * arithmetic belongs to the methodology section; naming it twice would spend the
 * figure that has to land there.
 */

import type { CSSProperties } from 'react';

type Link = {
  /** What happens at this point in the chain. */
  label: string;
  /** Who is holding it, or what it is waiting on. Never a date. */
  note: string;
};

const LINKS: Link[] = [
  {
    label: 'A connection detail stays open',
    note: 'One question back to the engineer. Nobody logs it as a problem.',
  },
  {
    label: 'The submittal cannot be completed',
    note: 'The package is ready except for the part that depends on the answer.',
  },
  {
    label: 'Review and approval move out',
    note: 'The reviewer’s clock starts when the submittal lands, not when it was due.',
  },
  {
    label: 'The fabrication window compresses',
    note: 'The shop’s slot did not move. What moved is how much of it is left.',
  },
  {
    label: 'The date the field needs it does not move',
    note: 'Everything sequenced behind the steel is now sequenced behind the delay.',
  },
];

/** Vertical displacement per link, in px, at the wide layout. */
const STEP = 26;

export default function DependencyChain() {
  return (
    <figure className="mt-14 lg:mt-16">
      <figcaption className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-text-muted">
        How one open question reaches the field
      </figcaption>

      {/* Wide: one straight rule with the consequences stepping down away from
          it. Narrow: a plain vertical list — the step is a desktop composition
          device and would only cramp a phone. */}
      <ol className="mt-7 grid gap-y-9 lg:mt-9 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
        {LINKS.map((link, i) => (
          <li
            key={link.label}
            className="lg:flex lg:flex-col"
            style={{ '--step': `${i * STEP}px` } as CSSProperties}
          >
            {/* The rule and its node sit at a constant height across all five
                columns; only the text below them descends. */}
            <div aria-hidden="true" className="flex items-center gap-3">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  i === LINKS.length - 1 ? 'bg-jp-text-secondary' : 'bg-jp-text-muted/70'
                }`}
              />
              <span className="h-px flex-1 bg-jp-border/20" />
            </div>

            <div className="mt-4 lg:mt-[calc(1rem+var(--step))]">
              <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-jp-text-muted">
                <span className="sr-only">Step </span>
                {`0${i + 1}`}
              </p>
              <h4 className="mt-2.5 max-w-[26ch] font-heading text-[1.0625rem] font-semibold leading-snug text-balance text-jp-text-primary sm:text-[1.125rem]">
                {link.label}
              </h4>
              <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-[1.6] text-jp-text-muted">
                {link.note}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
