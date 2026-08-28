/**
 * The cause-and-effect chain for the problem section's detection movement —
 * one unresolved condition displacing everything downstream of it, on a
 * single named package.
 *
 * THE TRACKED EXAMPLE IS CUSTOM STEEL WINDOWS (2026-08-26), replacing
 * structural steel. This is a positioning decision, not a copy preference.
 * Structural steel is the package every contractor already watches, so
 * tracking it answers the section's own question — what can your team not see
 * — with the obvious item, and it drifts JiTpro toward the long-lead framing
 * §20.1 forbids. Custom steel windows carry just as much upstream dependency
 * logic while keeping the argument on what has to be RESOLVED before the
 * product can move: a perimeter detail, a dimension, an approval, a release.
 *
 * The lesson must therefore never be "windows take a long time." It is that an
 * unresolved upstream condition quietly prevented the next action from
 * happening while the project still looked healthy. Nothing in this figure
 * states a lead time, and nothing may be added that does (§20.1, long-lead
 * terminology).
 *
 * The chain stops at exposure. What the shrinking set of remaining options
 * costs belongs to the response-window movement that follows, which MUST NOT
 * re-narrate this package — two movements, one causal story told once
 * (Decision Log 2026-08-26; §48.9, §48 preamble).
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
 * package it names is a generic construction category, indefinite throughout,
 * and never a project: no owner, no site, no schedule, nothing a reader could
 * take for a client record. The arithmetic belongs to the methodology section;
 * naming it twice would spend the figure that has to land there.
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
    label: 'Window details are still open',
    note: 'Interface with interior and exterior finishes unresolved.',
  },
  {
    label: 'Final window requirements are not established',
    note: 'Dimensions, frame conditions, finishes, hardware, and interfaces remain incomplete.',
  },
  {
    label: 'Shop drawings move on incomplete information',
    note: 'The package advances while design and field coordination are still unresolved.',
  },
  {
    label: 'Approval and release are late or assumption-based',
    note: 'Revisions consume time, or fabrication moves forward from information that may not match the field.',
  },
  {
    label: 'Windows arrive late or wrong',
    note: 'The field is ready, but the windows are missing—or they do not coordinate with what was built.',
  },
];

/** Vertical displacement per link, in px, at the wide layout. */
const STEP = 26;

export default function DependencyChain() {
  return (
    <figure className="mt-14 lg:mt-16">
      <figcaption className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-text-muted">
        Custom steel windows: how one open question reaches the field
      </figcaption>

      {/* Wide: five risers hanging from one datum, each longer than the last, so
          the consequences step away from the line that caused them. Narrow: a
          plain vertical list — the descent is a desktop composition device and
          would only cramp a phone. */}
      <ol className="mt-7 grid gap-y-9 lg:mt-9 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
        {LINKS.map((link, i) => (
          <li
            key={link.label}
            className="lg:flex lg:flex-col"
            style={{ '--step': `${i * STEP}px` } as CSSProperties}
          >
            {/* A drop line, not a rail. Every riser starts on the same datum and
                each one is longer than the last, so the figure measures the slip
                rather than merely listing the steps. This is deliberately NOT the
                dot-and-hairline vocabulary the response-window ladder uses: that
                one is an escalation, this one is a displacement, and equivalent
                marks for different roles is a consistency defect (§48 preamble,
                §48.9). For the same reason the links carry no ordinals — the
                descent already states the order, and numbering must never be the
                only expression of sequence (§48.9). */}
            <div aria-hidden="true" className="hidden lg:block">
              <span className="block h-px w-full bg-jp-border/20" />
              <span
                className="block w-px bg-jp-border/20"
                style={{ height: `calc(var(--step) + 1.25rem)` }}
              />
            </div>

            {/* Narrow: the drop line collapses to a single leading tick. */}
            <div aria-hidden="true" className="h-px w-10 bg-jp-border/20 lg:hidden" />

            <div className="mt-4 lg:mt-0">
              <h4 className="max-w-[26ch] font-heading text-[1.0625rem] font-semibold leading-snug text-balance text-jp-text-primary sm:text-[1.125rem]">
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
