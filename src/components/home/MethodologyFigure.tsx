import { METHODOLOGY_STAGES } from '../../content/methodologyStages';

/**
 * The methodology section's persistent visual column (Design System §46.8.1).
 *
 * PARTIALLY BUILT. Stages 01–03 carry real product screens; 04–05 keep the
 * reserved footprint until their screens exist. A stage without a screen keeps
 * the placeholder — borrowing a neighbour's screen to fill the gap is
 * prohibited (§46.8.1), because it claims the stage produces something the
 * image does not show.
 *
 * THE SCREENS ARE THE ACCUMULATING VISUAL (§46.8.1, amended 2026-08-27). They
 * are not separate illustrations swapped in and out: they are one project
 * carried forward — scope items are validated, gaps are found in those items,
 * commitments are created against those gaps. The traceability is literal and
 * MUST hold as later screens are added: an item visible at one stage has to be
 * findable at the next, as the same item. A screen of a different project, or
 * one with no relationship to its neighbours, breaks this section however real
 * the capture is.
 *
 * PROVENANCE (§48.10, first product-capture use). The interface is authentic;
 * the project, quantities, parties, names and dates inside it are constructed,
 * and a reader reads those as a record. That is why the provenance line below
 * is REQUIRED and sits with the figure. It MUST NOT be removed, moved to a
 * footnote, or softened, and this content MUST NEVER be described as a customer
 * project, a case study, or an actual engagement.
 *
 * The remaining §46.8.1 constraints continue to bind:
 *   - No second interaction: no controls, no hover states, no focus targets, no
 *     lightbox or zoom. The rail is the section's only interactive element,
 *     which is why this takes `activeIndex` and owns no state.
 *   - Legible without motion. The state is a pure function of `activeIndex`;
 *     selecting 03 directly from 01 resolves correctly with nothing animating
 *     in between.
 *   - The meaning is carried in text beside the figure (§46.2), so nothing here
 *     is required reading.
 *
 * ALL STATES STAY MOUNTED, sharing one grid cell, so switching is an instant
 * cross-fade rather than a fetch against an empty frame. That is right for
 * images and WILL BE WRONG for embedded demos: when a stage's screen becomes a
 * Guidde embed or a video, this must switch to rendering the active state only,
 * or every stage's media loads on every view.
 */

type MethodologyFigureProps = {
  /** Which stage is selected, 0-based. */
  activeIndex: number;
};

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/methodology`;

export default function MethodologyFigure({ activeIndex }: MethodologyFigureProps) {
  return (
    <figure>
      {/* One 4:3 frame at every width — the ratio the captures were taken at.
          It is fixed, so the column's height never depends on the active stage
          (§46.8), and it is never re-cropped: a cropped interface capture is a
          different claim about what the screen contains. */}
      <div className="grid aspect-[4/3] w-full overflow-hidden border border-jp-ink-secondary/25 bg-jp-ink-secondary/[0.04]">
        {METHODOLOGY_STAGES.map((stage, i) => {
          const isActive = i === activeIndex;
          const shared = `col-start-1 row-start-1 h-full w-full transition-opacity duration-200 ease-out motion-reduce:transition-none ${
            isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`;

          if (!stage.demo) {
            return (
              <div
                key={stage.id}
                aria-hidden={!isActive}
                className={`${shared} flex flex-col justify-between p-6 lg:p-8`}
              >
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-ink-secondary/85">
                    Reserved
                  </p>
                  <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-[1.6] text-jp-ink-secondary/85">
                    {`The ${stage.title} screen has not been captured yet. This area is intentionally empty.`}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <img
              key={stage.id}
              src={`${ASSET_BASE}/${stage.demo.file}-1448.webp`}
              srcSet={`${ASSET_BASE}/${stage.demo.file}-800.webp 800w, ${ASSET_BASE}/${stage.demo.file}-1448.webp 1448w`}
              sizes="(min-width: 1024px) 58vw, 100vw"
              width={1448}
              height={1086}
              alt={isActive ? stage.demo.alt : ''}
              aria-hidden={!isActive}
              loading="lazy"
              decoding="async"
              className={`${shared} object-contain`}
            />
          );
        })}
      </div>

      {/* §48.10: one quiet sentence, with the figure, never a disclaimer block.
          Sentence case — this is a sentence, and uppercase is for short labels
          only (§7.7). */}
      <figcaption className="mt-4 max-w-[62ch] text-[0.875rem] leading-[1.6] text-jp-ink-secondary/85">
        Representative JiTpro screens. The interface is real; the project, quantities, parties and dates are constructed to show realistic conditions and are not taken from an actual engagement.
      </figcaption>
    </figure>
  );
}
