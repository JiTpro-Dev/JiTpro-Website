import { useState } from 'react';
import MethodologyFigure from './MethodologyFigure';
import { METHODOLOGY_STAGES } from '../../content/methodologyStages';

/**
 * Section 5 — the methodology. Five stages, on a stage selector (Design System
 * §46.8) with the divided content stage and persistent visual column of §46.8.1.
 *
 * BUYER-JOURNEY JOB: respect, then understanding. Section 4 left the reader
 * asking what JiTpro actually does; this section answers it with an ordered
 * method they can inspect at their own pace. It re-sells nothing — no problem
 * statement, no cost, no shrinking options, no recovery warning. Sections 2 and
 * 3 already earned the attention, and repeating their argument here would spend
 * it twice.
 *
 * REPLACES `ReactiveProjectsSection` and its 400vh pinned scrollytelling. That
 * implementation was recorded non-conforming in its entirety (Decision Log
 * 2026-08-25): competence is read from the relationship BETWEEN the stages, and
 * a presentation that shows exactly one stage at a time by design forecloses
 * the comparison it depends on. §46.9 is not retired — it simply has no use
 * here. Nothing in this section listens to scroll, pins, or manufactures page
 * height.
 *
 * INTERACTION (§46.8, as amended 2026-08-25 and 2026-08-26):
 *   - Click, tap, Enter and Space commit. All four resolve through the single
 *     onClick on a real button element, which is where Enter and Space already
 *     arrive; there is no key handler, so no input method can drift from the
 *     others.
 *   - Hover and keyboard focus indicate availability and MUST NOT commit. This
 *     rail drives a substantial content stage, so crossing it on the way
 *     elsewhere would re-narrate the method, and focus-to-commit would destroy
 *     a keyboard reader's place mid-traversal. There is deliberately no
 *     onMouseEnter and no onFocus.
 *   - One active index is the whole state (§46.3). Nothing else animates, and
 *     there is no entrance: a fade-in of a static block is decoration, and
 *     §46.1 admits motion only where it communicates.
 *   - No autoplay, no guided progression, no auto-cycling. §46.8 permits one
 *     finite guided pass; it is declined here. The visitor controls the method.
 *
 * ACTIVE STATE WITHOUT AMBER. On this ground --jp-brand-amber is 1.96:1, below
 * the 3:1 minimum for user-interface components, so the selector expresses the
 * established treatment in ink (§46.8 light-surface amendment, 2026-08-26). The
 * active stage is carried on three axes, not one: a filled node where the
 * others are hollow, a connector tick the inactive rows do not draw, and the
 * title stepping from --jp-ink-secondary to the strongest ink at a heavier
 * weight. Availability is a separate gesture — a neutral wash and the title
 * brightening — so hover can never be mistaken for selection.
 *
 * THE SPINE IS CONSTANT WEIGHT for its whole length and never fills up to the
 * active stage (§46.8). This is a methodology, not a wizard: selecting stage 04
 * does not mean stages 01 to 03 were completed.
 *
 * STABLE GEOMETRY. Every stage's copy is in the document at all times —
 * visibility is opacity, never mounting — and all five bodies share one grid
 * cell, so the tallest reserves the height and switching stages cannot reflow
 * the page. The visual column holds a fixed ratio per breakpoint for the same
 * reason (§46.8, divided form).
 *
 * COMPOSITION — visual centre of gravity: right, and heavier than anything
 * above it. The head is distributed across the container, then the section
 * splits roughly 5/7 with the reserved visual holding the larger share. That
 * share is the point: the figure that lands there has to read as a real
 * construction-planning artifact, and a column sized to whatever was left over
 * would decide against that before it is drawn.
 *
 * RESPONSIVE. The rail is vertical at every width, so all five stage numbers
 * and titles stay visible with no shrinking, no truncation, no horizontal
 * scroll, and nothing discoverable only by swiping (§46.8, §35.1). Below lg the
 * two columns reflow to one full-width column rather than compressing.
 *
 * SURFACE: light. Act two of three, on --jp-surface-light, continuous with
 * Section 4 — one chapter on one ground, so the boundary between them is
 * spacing rather than a seam (§48.6).
 */
export default function MethodologySection() {
  /* The entire presentation derives from this one value (§46.3). */
  const [active, setActive] = useState(0);

  return (
    <section className="bg-jp-surface-light px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:pt-28 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        {/* The head shares the canvas rather than stacking into a left
            column: the proposition sits beside the heading, not beneath it. */}
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-16">
          <h2 className="font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-background sm:text-[2.5rem] lg:col-span-6 lg:text-[3rem]">
            What we actually do, in the order we do it.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-jp-ink-secondary sm:text-[1.125rem] lg:col-span-6 lg:mt-2 lg:text-[1.1875rem]">
            Each stage produces something the next one needs. By the last, every product, material and service the project depends on is tied to the date the field needs it&mdash;and the decisions, approvals and commitments that get it there each carry an owner and a date of their own.
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

          {/* The persistent visual column. Reserved, not drawn. */}
          <div className="mt-12 lg:mt-0">
            <MethodologyFigure activeIndex={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
