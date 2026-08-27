import { useState } from 'react';
import MethodologyFigure from './MethodologyFigure';
import { METHODOLOGY_STAGES } from '../../content/methodologyStages';

/**
 * Section 03 — the method. The page's centerpiece and its one light chapter
 * (Decision Log 2026-08-26, five-section architecture).
 *
 * This combines the former JiTproTurnSection and MethodologySection (both
 * preserved at tag `homepage-eight-section-beat3-2026-08-26`) into one
 * argument: the operating requirement, the direction the planning runs, and
 * then immediately the five stages that do it. The visitor arrives believing
 * late discovery costs options and leaves able to state JiTpro's operating
 * principle and see a disciplined method behind it.
 *
 * WHAT DID NOT CARRY OVER from the Turn: the What/When band (it restated the
 * two halves the display statement already says) and the orientation
 * paragraph (the category line lives in the hero; the engagement model is
 * Section 04's job under §20.1's engagement-model doctrine). The requirement,
 * the backward line, and the thesis close all survive verbatim — §20.1's
 * operating-requirement rules apply in full: coordination AND timing, plural
 * "requirements", no delivery guarantee, no conformance warranty, and the
 * superseded "approved for installation" formulation must not return.
 *
 * HIERARCHY (§7.7): the requirement is the section's only h2. The backward
 * line and the thesis share the existing full-width-statement register.
 *
 * SELECTOR (§46.8 as amended 2026-08-25/26) — carried over unchanged:
 *   - Click, tap, Enter and Space commit via the single onClick on a real
 *     button; hover and focus indicate availability and MUST NOT commit.
 *   - Active state in ink, never amber (1.96:1 on this ground), carried on
 *     three axes: filled node, connector tick, title weight/ink step.
 *   - The spine is constant weight and never fills to the active stage —
 *     a methodology, not a wizard.
 *   - One active index is the whole state (§46.3). No autoplay, no guided
 *     progression, no scroll listening, no manufactured page height.
 *   - Every stage's copy stays in the document; all five bodies share one
 *     grid cell so switching never reflows the page.
 *
 * THE FIGURE (§46.8.1) is still the reserved footprint — the accumulating
 * visual is Beat 4 and is NOT built in this pass.
 *
 * TERMINAL FIELD BAND (§17.1, first approved use): the jobsite photograph
 * closes the section as a full-container band with one naming line — a
 * terminal beat, never a standalone section. It absorbs the former
 * HomeConstructionImage. No frame, filter, dissolve, or padding of its own.
 *
 * COPY BUDGET (approved plan, 2026-08-26): ~90 words of prose plus the stage
 * doctrine in src/content/methodologyStages.ts, which MUST NOT be reworded as
 * a side effect of layout work.
 *
 * SURFACE: light — --jp-surface-light for the whole act. Hierarchy is ink,
 * never amber (§8.8); ordinals take --jp-ink-secondary at the §8.8 floor
 * (§48.9 light amendment).
 */
export default function MethodSection() {
  /* The entire presentation derives from this one value (§46.3). */
  const [active, setActive] = useState(0);

  return (
    <section className="bg-jp-surface-light px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:pt-32 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        {/* The requirement, as the section's display statement. */}
        <h2 className="max-w-[24ch] font-heading text-[2rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-balance text-jp-background sm:text-[2.5rem] lg:max-w-[26ch] lg:text-[3rem] xl:text-[3.25rem]">
          The right product has to be coordinated with what&apos;s being built in the field and be onsite when the field needs it.
        </h2>

        {/* One band beneath a rule: the direction on the left, what the five
            stages produce on the right. This is the whole bridge into the
            method — no larger introduction stands between the requirement and
            the stages (approved plan, 2026-08-26). */}
        <div className="mt-12 border-t border-jp-ink-secondary/20 pt-10 sm:mt-14 lg:mt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:pt-12 xl:gap-x-16">
          <p className="max-w-[30ch] font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-balance text-jp-background sm:text-[1.75rem] lg:col-span-7 lg:text-[2rem]">
            Everything upstream is planned and managed backward from those requirements.
          </p>
          <p className="mt-8 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-jp-ink-secondary sm:text-[1.125rem] lg:col-span-5 lg:mt-2">
            Five stages, each producing what the next one needs. By the last, every product, material and service the project depends on is tied to the date the field needs it&mdash;and every decision, approval and commitment that gets it there carries an owner and a date.
          </p>
        </div>

        <div className="mt-14 sm:mt-16 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Copy and method control. */}
          <div>
            <ol aria-label="Methodology stages">
              {METHODOLOGY_STAGES.map((stage, i) => {
                const isActive = i === active;

                return (
                  <li key={stage.id}>
                    <h3>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActive(i)}
                        className={`group relative flex w-full items-center gap-3 py-3.5 pl-3.5 pr-3 text-left transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jp-background motion-reduce:transition-none ${
                          isActive
                            ? 'cursor-default'
                            : 'cursor-pointer hover:bg-jp-ink-secondary/[0.06] focus-visible:bg-jp-ink-secondary/[0.06]'
                        }`}
                      >
                        {/* The spine, drawn as two half-segments that stop
                            clear of the node. One weight for its whole length,
                            on every row, whatever is selected. */}
                        {i > 0 && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-[calc(50%+0.5rem)] left-[5px] top-0 w-px -translate-x-1/2 bg-jp-ink-secondary/30"
                          />
                        )}
                        {i < METHODOLOGY_STAGES.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-[5px] top-[calc(50%+0.5rem)] w-px -translate-x-1/2 bg-jp-ink-secondary/30"
                          />
                        )}

                        {/* Node: filled when open, hollow when not, and the
                            same 9px footprint either way so nothing shifts. */}
                        <span
                          aria-hidden="true"
                          className={`absolute left-[5px] top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200 ease-out motion-reduce:transition-none ${
                            isActive ? 'bg-jp-background' : 'border border-jp-ink-secondary/55'
                          }`}
                        />

                        {/* Connector: drawn only for the open stage, its width
                            reserved on every row. */}
                        <span
                          aria-hidden="true"
                          className={`h-px w-4 shrink-0 transition-colors duration-200 ease-out motion-reduce:transition-none ${
                            isActive ? 'bg-jp-background' : 'bg-transparent'
                          }`}
                        />

                        <span className="shrink-0 font-mono text-xs font-normal tracking-[0.2em] text-jp-ink-secondary/85">
                          <span className="sr-only">Stage </span>
                          {`0${i + 1}`}
                        </span>

                        {/* A control label in the body face (§7.7), carrying
                            the section's argument rather than its navigation. */}
                        <span
                          className={`min-w-0 text-[1.0625rem] tracking-normal transition-colors duration-200 ease-out motion-reduce:transition-none sm:text-[1.125rem] ${
                            isActive
                              ? 'font-semibold text-jp-background'
                              : 'font-normal text-jp-ink-secondary group-hover:text-jp-background group-focus-visible:text-jp-background'
                          }`}
                        >
                          {stage.title}
                        </span>
                      </button>
                    </h3>
                  </li>
                );
              })}
            </ol>

            {/* One content area. Every stage's copy stays in the document, in
                order, so assistive technology receives the whole method with no
                interaction; the bodies share one grid cell, so the tallest
                reserves the height and selection never reflows the page. */}
            <div className="mt-8 grid border-t border-jp-ink-secondary/15 pt-8 sm:mt-10 lg:mt-12">
              {METHODOLOGY_STAGES.map((stage, i) => (
                <p
                  key={stage.id}
                  className={`col-start-1 row-start-1 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-jp-ink-secondary transition-opacity duration-200 ease-out motion-reduce:transition-none sm:text-[1.125rem] ${
                    i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <span className="sr-only">
                    {`Stage 0${i + 1} of 0${METHODOLOGY_STAGES.length}, ${stage.title}. `}
                  </span>
                  {stage.body}
                </p>
              ))}
            </div>
          </div>

          {/* The persistent visual column. Reserved, not drawn — Beat 4. */}
          <div className="mt-12 lg:mt-0">
            <MethodologyFigure activeIndex={active} />
          </div>
        </div>

        {/* The thesis, closing the argument before the field band lands it.
            The only sentence that reaches back to the response window — it
            says WHEN the method acts. */}
        <p className="mt-16 max-w-[30ch] border-t border-jp-ink-secondary/20 pt-10 font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-balance text-jp-background sm:max-w-none sm:text-[1.75rem] lg:mt-20 lg:pt-12 lg:text-[2rem]">
          JiTpro builds control early&mdash;while there is still time to protect the field.
        </p>

        {/* The §17.1 terminal field band: the field condition the section has
            just explained, at the moment the explanation lands. Full container
            width, no padding of its own, one naming line. Absorbs the former
            HomeConstructionImage standalone band. */}
        <figure className="mt-12 lg:mt-14">
          <img
            src={`${import.meta.env.BASE_URL}assets/homepage_const-1600.webp`}
            srcSet={`${import.meta.env.BASE_URL}assets/homepage_const-800.webp 800w, ${import.meta.env.BASE_URL}assets/homepage_const-1600.webp 1600w`}
            sizes="(min-width: 1280px) 1280px, 100vw"
            width={1600}
            height={900}
            alt="Crane setting structural steel on an active jobsite while crews work across the foundations"
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full object-cover object-[50%_55%] sm:aspect-[21/9] lg:aspect-video"
          />
          <figcaption className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-ink-secondary/85">
            Structural steel erection on an active jobsite &mdash; the field everything upstream is planned backward from.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
