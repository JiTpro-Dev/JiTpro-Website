import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, motionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';

/**
 * Section 3 — the five-step JiTpro process, presented as a scroll-driven
 * sequential process reveal (Design System §46.9, revised 2026-08-20).
 *
 * One stage at a time: a 400vh region supplies the scroll distance, a
 * sticky h-screen frame holds the presentation spatially stable, and the
 * five stages are stacked in one grid cell sharing a single constant
 * footprint. Continuous section-relative scroll progress is the single
 * source of truth (§46.3).
 *
 * Delivery is deliberately single-subscription: ONE scroll listener
 * recomputes every stage's opacity and drift together from the same
 * delivered progress value and writes them to plain MotionValues — never
 * React state. Per-stage `useTransform` subscriptions were the previous
 * architecture, and one of them silently dropping updates mid-scroll left
 * an exited stage frozen at partial opacity on top of a later stage.
 * With one subscription the stages cannot diverge: even a missed event
 * leaves them mutually consistent, and the next event corrects them all.
 *
 * Visibility windows are strictly disjoint (§46.9): each stage owns
 * u ∈ (0.01, 0.99) of its interval, so between stages there is a brief
 * neutral moment — release → clear → reveal — and two stages can never be
 * simultaneously readable, adjacent or otherwise. The single `XX / 05`
 * indicator reuses each stage's own opacity value for its digit, so it
 * can never show two readable numbers.
 *
 * Below lg, and always under reduced motion, the pinned architecture is
 * dropped for the normal-flow sequential presentation (§46.9).
 */

const STEPS = [
  {
    title: 'Scope Validation',
    body: 'We validate the contractor’s existing scope against the project documentation to determine whether the work required to complete the project has been identified and covered.',
  },
  {
    title: 'Scope Gap Analysis',
    body: 'We identify missing, unclear, conflicting, or uncovered scope—and the decisions, information, and responsibilities that must be resolved before they become constraints against the schedule.',
  },
  {
    title: 'Commitment Capture',
    body: 'Required actions are assigned to responsible parties and tracked as Commitments, giving the project team a clear record of what must happen, who owns the next move, and when it is required.',
  },
  {
    title: 'Product Register',
    body: 'We identify and register the products, materials, and services the project will need, connecting what must arrive on site to the decisions, approvals, and Commitments required to get it there.',
  },
  {
    title: 'Backward Scheduling',
    body: 'Starting with when each product, material, or service is required on site, JiTpro works backward to establish the dates for the Commitments that support it.',
  },
];

/* 100vh of the region stays pinned; the remaining 300vh is travel — 60vh
   per stage, of which roughly 43vh is fully-readable hold. */
const REGION_HEIGHT_CLASS = 'h-[400vh]';

const STAGE_COUNT = STEPS.length;

/* Visibility windows, as fractions of one stage interval (60vh each).
   Enter: 1%–13% (~7vh). Hold: 13%–85% (~43vh). Exit: 85%–99% (~8.4vh).
   The 99%→101% seam between stages (~1.2vh) is a deliberate neutral
   moment: the outgoing stage is fully gone before the incoming one
   begins. Windows are therefore strictly disjoint. */
const ENTER_START = 0.01;
const ENTER_END = 0.13;
const EXIT_START = 0.85;
const EXIT_END = 0.99;

/* Small vertical drift on entry/exit — opacity carries the transition;
   the drift is polish only and can never interleave text because two
   stages are never visible at once. */
const ENTER_Y = 12;
const EXIT_Y = -10;

/** 0→1 linear ramp of v across [a, b], clamped. */
function ramp(v: number, a: number, b: number) {
  if (v <= a) return 0;
  if (v >= b) return 1;
  return (v - a) / (b - a);
}

/** A stage's visual state as a pure function of region progress. The
    first stage skips its entrance (open on arrival); the last skips its
    exit (open while the region releases). */
function stageVisual(index: number, progress: number) {
  const u = progress * STAGE_COUNT - index;
  const entered = index === 0 ? 1 : ramp(u, ENTER_START, ENTER_END);
  const exited = index === STAGE_COUNT - 1 ? 0 : ramp(u, EXIT_START, EXIT_END);
  return {
    opacity: entered * (1 - exited),
    y: ENTER_Y * (1 - entered) + EXIT_Y * exited,
  };
}

/** Whether the viewport is wide enough for the pinned architecture (lg). */
function useDesktop() {
  const [desktop, setDesktop] = useState(
    () => window.matchMedia('(min-width: 1024px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return desktop;
}

export default function ReactiveProjectsSection() {
  const reduced = Boolean(useReducedMotion());
  const desktop = useDesktop();
  const pinned = desktop && !reduced;

  const regionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: regionRef,
    offset: ['start start', 'end end'],
  });

  /* Plain MotionValues, initialised to the resolved progress-0 state.
     Writing to them bypasses React entirely — no state in the scroll
     path. The indicator digits bind the same opacity values as their
     stages, so digit and stage agree by construction (§46.3). */
  const opacities = useMemo(
    () => STEPS.map((_, i) => motionValue(stageVisual(i, 0).opacity)),
    [],
  );
  const drifts = useMemo(
    () => STEPS.map((_, i) => motionValue(stageVisual(i, 0).y)),
    [],
  );

  /* The single scroll subscription: every stage recomputed together from
     the same delivered value, every event. */
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    for (let i = 0; i < STAGE_COUNT; i += 1) {
      const visual = stageVisual(i, v);
      opacities[i].set(visual.opacity);
      drifts[i].set(visual.y);
    }
  });

  return (
    <section className="bg-jp-background px-6 pt-10 pb-20 sm:px-8 sm:pt-12 sm:pb-24 lg:px-10 lg:pt-14 lg:pb-28">
      {/* Centered introduction to the methodology (approved). */}
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto max-w-[26ch] text-center font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
          JiTpro gets your project ready before the field has to react.
        </h2>
        <p className="mx-auto mt-6 max-w-[62ch] text-center text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:mt-8 lg:text-[1.1875rem]">
          JiTpro works through the project systematically to identify what is missing, establish accountability, and determine what must happen—and when—to support the construction schedule.
        </p>
      </div>

      {/* The process. Pinned sequential reveal at lg with motion allowed;
          otherwise the normal-flow presentation (§46.9). */}
      <div
        ref={regionRef}
        className={`mt-16 sm:mt-20 lg:mt-24 ${pinned ? REGION_HEIGHT_CLASS : ''}`}
      >
        {pinned ? (
          /* Auto-height sticky pinned at an upper-middle optical position:
             during the approach the stage follows the introduction at the
             region's own margin (no manufactured frame-top void), while
             pinned it sits deliberately in the upper-middle of the
             viewport clear of the fixed navigation, and at release the
             conclusion follows tightly behind it. A full-height centered
             frame here would re-create (100vh − content) / 2 of dead space
             on both seams. */
          <div className="sticky top-[24vh]">
            <div className="mx-auto w-full max-w-7xl">
              {/* One persistent position indicator: the static "/ 05" never
                  moves, and the current digit crossfades using its stage's
                  own opacity value. Hidden from assistive technology — each
                  stage carries its own sr-only label. */}
              <div aria-hidden="true" className="font-mono text-xs tracking-[0.2em]">
                <span className="inline-grid">
                  {STEPS.map((step, i) => (
                    <motion.span
                      key={step.title}
                      style={{ opacity: opacities[i] }}
                      className="col-start-1 row-start-1 text-jp-brand-amber/80"
                    >
                      {`0${i + 1}`}
                    </motion.span>
                  ))}
                </span>
                <span className="text-jp-text-muted">{` / 0${STAGE_COUNT}`}</span>
              </div>

              {/* All five stages stacked in one grid cell — one constant
                  footprint; title and body move as one unit. Copy is always
                  in the document in reading order. */}
              <ol className="mt-5 grid">
                {STEPS.map((step, i) => (
                  <motion.li
                    key={step.title}
                    style={{ opacity: opacities[i], y: drifts[i] }}
                    className="col-start-1 row-start-1"
                  >
                    <span className="sr-only">{`Step ${i + 1} of ${STAGE_COUNT}`}</span>
                    <h3 className="max-w-[24ch] font-heading text-[1.75rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.25rem] lg:text-[2.5rem]">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
                      {step.body}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <ol className="mx-auto max-w-7xl space-y-14 sm:space-y-16">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <p className="font-mono text-xs tracking-[0.2em] text-jp-brand-amber/80">
                  <span className="sr-only">Step </span>
                  {`0${i + 1}`}
                </p>
                <h3 className="mt-3 max-w-[24ch] font-heading text-[1.5rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* The conclusion, in normal flow after the process releases: the
          result carries stronger hierarchy with the restrained amber
          lead-in; the accountability line closes quietly. Neither is a CTA. */}
      <div className="mx-auto mt-16 max-w-7xl lg:mt-24">
        <p className="max-w-[62ch] text-[1.125rem] leading-[1.65] text-jp-text-secondary sm:text-[1.1875rem] lg:text-[1.25rem]">
          <span className="font-semibold text-jp-brand-amber">The result:</span>{' '}
          The project team sees what must move before it becomes a constraint, required work is driven by when the field actually needs it, and products, materials, and services are managed to arrive{' '}
          <span className="font-semibold text-jp-text-primary">Just-in-Time</span>.
        </p>
        <p className="mt-6 max-w-[62ch] text-[1rem] leading-[1.65] text-jp-text-muted sm:text-[1.0625rem]">
          When something does run late, the project has a documented record of what was required, who owned it, when it was due, and where the delay occurred.
        </p>
      </div>
    </section>
  );
}
