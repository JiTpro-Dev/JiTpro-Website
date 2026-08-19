import { useEffect, useRef, useState } from 'react';
import { LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Section 3 — helps the contractor recognise the actual problem.
 *
 * Top padding is tighter than the page's standard rhythm: the opening
 * argument (PriorityClaritySection) hands off directly into this section,
 * and the two split the boundary evenly so the narrative reads continuous
 * rather than as two separate full-screen panels.
 *
 * The three stages are a progression presented as a stage selector (Design
 * System §46.8): every numbered title stays visible as a centred group of
 * pill controls, and a single content area beneath presents the active stage.
 * The pills state the interaction — three choices, one lit — instead of
 * asking the reader to discover it, which is what the sequence carousel this
 * replaces required (Decision Log 2026-08-08).
 *
 * Three pieces of state drive everything (Design System §46.3):
 *   entered     — has the section been seen, once and never reset
 *   active      — which stage is open, 0 | 1 | 2
 *   tookControl — the visitor has deliberately selected a stage
 *
 * On first entry the selector walks itself 01 → 02 → 03 at reading pace and
 * stops (§46.8 guided progression; Decision Log 2026-08-08): one finite pass,
 * only while the section is on screen, never under reduced motion, and
 * cancelled permanently by any deliberate interaction. Nothing moves until
 * the section itself is genuinely in view: the visitor can sit at the hero
 * indefinitely and this section stays still.
 */

const FADE_S = 0.22;
const EASE_OUT = 'easeOut' as const;

/* Stage-change choreography — one continuous event, not four state flips:
   the leaving copy releases first, the single amber enclosure glides to the
   destination, and the arriving copy settles in as the pill lands. The glide
   is a deterministic tween — a spring would bounce, and the movement itself
   is meant to be readable (§46.4, §46.8). */
const GLIDE_S = 0.68;
const GLIDE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const COPY_OUT_S = 0.26;
const COPY_IN_S = 0.38;
const COPY_IN_DELAY_S = 0.3;

/** How long the guided progression holds each stage before advancing. */
const GUIDE_HOLD_MS = 4800;

const BLOCKS = [
  {
    title: 'It starts with a small miss',
    body: "A decision stays open. A responsibility is unclear. A requirement is communicated verbally but never clearly assigned, dated, and documented. Everything feels urgent, but what needs attention first isn't always clear.",
  },
  {
    title: 'The miss becomes a constraint',
    body: 'Time passes. The unanswered decision begins affecting approvals, fabrication, sequencing, or delivery. What was easy to solve early becomes harder and more expensive to solve later.',
  },
  {
    title: 'The field pays for it',
    body: "Superintendents are left to work around what isn't ready. Work gets resequenced. Crews are sent away and called back. Productivity collapses and costs multiply—often without anyone knowing exactly where the money went.",
  },
];

export default function ReactiveProjectsSection() {
  const still = Boolean(useReducedMotion());

  const sectionRef = useRef<HTMLElement>(null);
  /* Once the section is genuinely a third visible, and never reset after. */
  const entered = useInView(sectionRef, { amount: 0.35, once: true });
  /* Whether it is on screen right now — the guided progression must never
     change stages the visitor cannot see (§46.8). */
  const visible = useInView(sectionRef, { amount: 0.35 });

  const [active, setActive] = useState(0);
  const [tookControl, setTookControl] = useState(false);
  const shown = entered || still;

  /* Any deliberate selection — hover, focus, click, or tap — hands the
     interaction to the visitor for good; the guided progression never
     resumes (§46.8). */
  const choose = (i: number) => {
    setTookControl(true);
    setActive(i);
  };

  /* The guided first pass: one pending timeout at a time, keyed on the
     current stage. Advancing re-runs the effect and schedules the next hold;
     reaching stage 03 schedules nothing, so the progression ends there and
     can never loop. Scrolling away clears the pending hold (cleanup) and a
     return re-schedules it from the current stage — a pause, not an
     off-screen advance. Reduced motion never schedules at all (§46.5). */
  useEffect(() => {
    if (still || tookControl || !entered || !visible) return;
    if (active >= BLOCKS.length - 1) return;
    const hold = window.setTimeout(() => setActive(active + 1), GUIDE_HOLD_MS);
    return () => window.clearTimeout(hold);
  }, [still, tookControl, entered, visible, active]);

  /* Under reduced motion every transition resolves instantly — the interaction
     still works, it simply arrives rather than travels (§46.5). */
  const fade = still ? { duration: 0 } : { duration: FADE_S, ease: EASE_OUT };
  const glide = still ? { duration: 0 } : { duration: GLIDE_S, ease: GLIDE_EASE };

  return (
    <section
      ref={sectionRef}
      className="bg-jp-background px-6 pt-10 pb-20 sm:px-8 sm:pt-12 sm:pb-24 lg:px-10 lg:pt-14 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-[20ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
          Small misses compound over time
        </h2>
        <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
          Projects depend on hundreds of decisions and commitments across the project team. Most problems do not begin as major problems. They begin as small misses—an unanswered question, an unclear responsibility, or a commitment that was discussed but never documented and driven to a required date.
        </p>

        <motion.div
          className="mt-12 lg:mt-14"
          initial={false}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={fade}
        >
          {/* Three pill selectors in the site's established selector-control
              language (§46.8, Decision Log 2026-08-08): muted at rest, a
              brightening wash on approach, and an enclosed amber outline and
              tint when selected. The FAQ category selector defines the family;
              this expresses the same treatment in approved tokens. A
              transparent border keeps the inactive footprint identical, so
              nothing shifts with state. Below sm the pills stack full-width. */}
          <LayoutGroup id="stage-selector">
            <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              {BLOCKS.map((block, i) => {
                const isActive = i === active;
                const lit = isActive && shown && !still;

                return (
                  <li key={block.title}>
                    <h3>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onMouseEnter={() => choose(i)}
                        onFocus={() => choose(i)}
                        onClick={() => choose(i)}
                        className={`relative flex w-full items-baseline gap-2.5 rounded-full border border-transparent px-4 py-2.5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jp-text-primary motion-reduce:transition-none sm:w-auto sm:whitespace-nowrap ${
                          isActive
                            ? 'cursor-default text-jp-brand-amber'
                            : 'cursor-pointer text-jp-text-muted hover:bg-jp-text-primary/5 hover:text-jp-text-primary'
                        }`}
                      >
                        {/* The one amber enclosure. Rendered inside whichever
                            selector is active, so the shared layoutId makes it
                            glide between selectors rather than switch off and
                            on — the buttons themselves never move. The radius
                            lives in style so the glide cannot distort it. */}
                        {isActive && (
                          <motion.span
                            layoutId="stage-selector-active-pill"
                            aria-hidden="true"
                            initial={false}
                            transition={glide}
                            style={{ borderRadius: 9999 }}
                            className="absolute inset-0 border border-jp-brand-amber/30 bg-jp-brand-amber/10"
                          />
                        )}
                        <span
                          key={lit ? `lit-${i}` : `rest-${i}`}
                          className={`relative shrink-0 font-mono text-xs tracking-[0.2em] text-jp-brand-amber/80${
                            lit ? ' jp-stage-lit' : ''
                          }`}
                        >
                          <span className="sr-only">Stage </span>
                          {`0${i + 1}`}
                        </span>
                        {/* A control label, not a heading: the body face per
                            §7.7, but a step above the FAQ's label scale — these
                            three titles carry the section's argument, not just
                            its navigation. */}
                        <span className="relative min-w-0 text-[1.0625rem] font-medium sm:text-[1.125rem]">
                          {block.title}
                        </span>
                      </button>
                    </h3>
                  </li>
                );
              })}
            </ol>
          </LayoutGroup>

          {/* One content area, centred beneath the whole group so the active
              copy belongs to the control rather than to column 01. The text
              itself stays left-aligned (§7.7); only the block is centred.
              Every stage's copy stays in the document — visibility is opacity
              only, so assistive technology always receives the complete
              argument (§46.8) — and the bodies share one grid cell, so the
              tallest reserves the height and switching never reflows the page.

              The fade is two-phase: the leaving paragraph releases first, and
              the arriving one starts in as the pill approaches its landing —
              opacity only, always in the same reading position. Framer
              replaces in-flight animations on retarget, so a rapid sweep
              across the pills resolves to the latest stage with no queue. */}
          <div className="mt-8 grid sm:mt-10">
            {BLOCKS.map((block, i) => (
              <motion.p
                key={block.title}
                className={`col-start-1 row-start-1 mx-auto max-w-[52ch] text-[1rem] leading-[1.65] text-jp-text-muted ${
                  i === active ? '' : 'pointer-events-none'
                }`}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={
                  still
                    ? { duration: 0 }
                    : i === active
                      ? { duration: COPY_IN_S, ease: EASE_OUT, delay: COPY_IN_DELAY_S }
                      : { duration: COPY_OUT_S, ease: EASE_OUT }
                }
              >
                {block.body}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
