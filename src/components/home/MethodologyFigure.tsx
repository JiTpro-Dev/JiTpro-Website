import { METHODOLOGY_STAGES } from '../../content/methodologyStages';

/**
 * The methodology section's persistent visual column (Design System §46.8.1).
 *
 * NOT BUILT YET. This is a reserved footprint and a development readout, and it
 * is deliberately NOT a drawing: an attractive placeholder is the thing that
 * quietly becomes production, so this one states what it is in plain words and
 * could never be mistaken for a finished figure.
 *
 * What lands here is one visual system that ACCUMULATES across the five stages
 * — raw project information, then validated scope, then exposed gaps, then
 * commitments and the parties holding them, then products, materials and
 * services tied to their Required Onsite Dates, then backward-planned timing.
 * §46.8.1 governs it, and the constraints are already binding on the shape of
 * this component:
 *
 *   - Elements introduced at one stage persist, as the same elements, at every
 *     later stage. Nothing the visual has established is withdrawn.
 *   - It introduces no second interaction: no controls, no hover states, no
 *     focus targets. The rail is the section's only interactive element, which
 *     is why this takes `activeIndex` as a prop and owns no state.
 *   - Accumulation is legible without motion. Selecting stage 05 directly from
 *     stage 01 resolves to the correct accumulated state without animating the
 *     stages in between, so the state MUST be a pure function of `activeIndex`
 *     rather than a sequence of transitions.
 *   - The wide drawing is not scaled down for narrow viewports. A distinct
 *     compact composition is authored (§48.3, §35.1), which is why the reserved
 *     ratio changes by breakpoint rather than the box simply shrinking.
 *
 * PROVENANCE, when it is built (§48.10): representative construction content,
 * carrying one quiet provenance line in the caption register. Required Onsite
 * Dates are the figure's single kind of absolute date; every other quantity is
 * a working-day offset and MUST be typeset in a different register, never
 * converted into a calendar start-by date the source cannot support.
 *
 * SURFACE: light. Ink hierarchy only — the amber tokens carry no information on
 * this ground (§8.8, amber on light surfaces).
 */

type MethodologyFigureProps = {
  /** Which stage is selected, 0-based. The figure accumulates up to it. */
  activeIndex: number;
};

export default function MethodologyFigure({ activeIndex }: MethodologyFigureProps) {
  const stage = METHODOLOGY_STAGES[activeIndex];

  return (
    /* The reserved footprint. §46.8 requires the visual column to hold a height
       independent of the active index, so the ratio is fixed per breakpoint and
       never derived from content: portrait on a phone, where the compact
       composition will be a short register; landscape from lg, where the wide
       drawing needs room to be a real construction-planning artifact rather
       than a diagram of one. These ratios are provisional and are the first
       thing the finished figure may revise. */
    <div
      aria-hidden="true"
      className="flex aspect-[4/5] w-full flex-col justify-between border border-dashed border-jp-ink-secondary/30 bg-jp-ink-secondary/[0.04] p-6 sm:aspect-[5/4] lg:aspect-[4/3] lg:p-8"
    >
      <div>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-ink-secondary/85">
          Reserved — methodology figure
        </p>
        <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-[1.6] text-jp-ink-secondary/85">
          Not final. This area is intentionally empty; the accumulating visual has
          not been built yet.
        </p>
      </div>

      {/* A wiring readout, not a design: it exists so the reserved area can be
          seen responding to the rail during review. It leaves with the
          placeholder. */}
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-ink-secondary/85">
        {`Active 0${activeIndex + 1} · ${stage.title}`}
      </p>
    </div>
  );
}
