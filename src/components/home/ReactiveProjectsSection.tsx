import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * Section 2 — helps the contractor recognise the actual problem.
 *
 * The three stages are a progression, not a list, so they are presented as one
 * carousel that resolves around whichever stage the reader is on — widening it
 * where all three fit side by side, sliding it into the middle where they do
 * not. Nothing moves until the section itself is genuinely in view: the visitor
 * can sit at the hero indefinitely and this section stays still.
 *
 * Two pieces of state drive everything (Design System §46.3):
 *   entered — has the section been seen, once and never reset
 *   active  — which stage is open, 0 | 1 | 2
 */

/* Above this width the three stages sit side by side and all stay legible.
   Below it the row cannot hold three readable columns, so it becomes a
   single-card carousel with its neighbours peeking (§9 of the brief:
   readability wins over preserving the desktop geometry). */
const WIDE_QUERY = '(min-width: 64rem)';

/**
 * Card widths as a percentage of the carousel's own width.
 *
 * The wide composition is sized to fill the carousel exactly — the open stage,
 * both closed stages and both gaps total 100 — so the row always occupies the
 * section's content bounds and no stage can cross an edge. Opening a stage
 * redistributes that width between the three; it never widens the row.
 *
 * The peek layout overflows on purpose. There only the open stage has to be
 * fully legible, and its neighbours showing at the edges is what says the row
 * continues.
 */
const WIDE = { open: 52, closed: 22, gap: 2 };
const PEEK = { open: 80, closed: 80, gap: 4 };

type Geometry = typeof WIDE;

/* An even deceleration. The curve this replaced covered most of its distance in
   the first quarter of its duration, which read as a snap no matter how long
   the duration was; spending the time evenly is what makes the movement
   followable rather than merely slow. */
const EASE_OUT = 'easeOut' as const;

/* The card starts moving, then the copy arrives as it settles — so the reader
   perceives one gesture rather than two things happening at once. Closing has
   no such delay: the copy leaves immediately rather than lingering over a
   shrinking card. */
const GLIDE_MS = 0.45;
const FADE_MS = 0.22;
const COPY_DELAY_MS = 0.18;

/** Width of the whole three-stage composition, in percent of the carousel. */
const trackWidth = (g: Geometry) => g.open + 2 * g.closed + 2 * g.gap;

/**
 * Centre the open stage, then hold the track inside the carousel.
 *
 * Centring on its own is what clipped: the composition is the same width
 * whichever stage is open, so pulling the open one to the middle drags the far
 * end past the boundary — the first stage's heading off the left edge when the
 * last stage opened, the third stage's off the right when the first did. The
 * offset is therefore clamped to the travel the composition actually leaves.
 * A layout that fills the carousel has none and stays put; the peek layout
 * overflows by design, so it keeps centring freely.
 *
 * Stages before the open one are always closed, so their run is a single term.
 */
const trackOffset = (g: Geometry, active: number) => {
  const centred = 50 - (active * (g.closed + g.gap) + g.open / 2);
  const travel = 100 - trackWidth(g);
  return travel < 0 ? centred : Math.min(Math.max(centred, 0), travel);
};

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

  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(WIDE_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const geo: Geometry = wide ? WIDE : PEEK;
  const shown = entered || still;

  /* Under reduced motion every transition resolves instantly — the interaction
     still works, it simply arrives rather than travels (§46.5). */
  const glide = still ? { duration: 0 } : { duration: GLIDE_MS, ease: EASE_OUT };
  const fade = still ? { duration: 0 } : { duration: FADE_MS, ease: EASE_OUT };

  return (
    <section
      ref={sectionRef}
      className="bg-jp-background px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-[20ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
          Small misses compound over time
        </h2>
        <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
          Projects depend on hundreds of decisions and commitments across the project team. Most problems do not begin as major problems. They begin as small misses—an unanswered question, an unclear responsibility, or a commitment that was discussed but never documented and driven to a required date.
        </p>

        {/* The negative inset restores the section's shared left edge (§48.6)
            while the padding leaves room for a focus ring that would otherwise
            be clipped by the carousel's own overflow. */}
        <motion.div
          className="-mx-2 mt-12 overflow-hidden p-2 lg:mt-14"
          initial={false}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={fade}
        >
          <motion.ol
            className="flex items-stretch"
            style={{ gap: `${geo.gap}%` }}
            initial={false}
            animate={{ x: `${trackOffset(geo, active)}%` }}
            transition={glide}
          >
            {BLOCKS.map((block, i) => {
              const isActive = i === active;
              const width = isActive ? geo.open : geo.closed;
              const lit = isActive && shown && !still;

              return (
                <motion.li
                  key={block.title}
                  className="group relative shrink-0"
                  initial={false}
                  animate={{ width: `${width}%` }}
                  transition={glide}
                >
                  <div
                    className={`h-full overflow-hidden border-t pt-6 transition-colors duration-300 motion-reduce:transition-none ${
                      isActive ? 'border-jp-brand-amber/30' : 'border-jp-border/12'
                    }`}
                  >
                    <span
                      key={lit ? `lit-${i}` : `rest-${i}`}
                      className={`block font-mono text-xs tracking-[0.2em] text-jp-brand-amber/80${
                        lit ? ' jp-stage-lit' : ''
                      }`}
                    >
                      {`0${i + 1}`}
                    </span>
                    {/* Reserved height: the heading wraps differently open than
                        closed, and min-height absorbs that without ever
                        clipping — it grows if a heading needs more room. */}
                    <div className="mt-4 flex min-h-[3.25rem] items-start gap-3 lg:min-h-[3.5rem]">
                      <h3 className="min-w-0 flex-1 font-heading text-[1.1875rem] font-semibold leading-snug text-jp-text-primary sm:text-[1.25rem]">
                        {block.title}
                      </h3>
                      {/* The affordance: it says the stage can open, and says it
                          in the direction the stage opens. Muted at rest so the
                          surface gains no further amber (§48.7), and gone once
                          the stage is open, where it would mean nothing. */}
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 text-jp-text-muted transition duration-[170ms] ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 ${
                          isActive ? 'opacity-0' : 'opacity-100'
                        }`}
                      >
                        <ChevronRight size={16} strokeWidth={2} />
                      </span>
                    </div>
                    {/* The body's width MUST NOT be a percentage. The card's
                        width is animated, so a percentage re-resolves on every
                        frame: the copy would render narrow at the start of an
                        open, wrap to extra lines, and push the whole page down
                        until the card caught up. `ch` is independent of the
                        card, so the copy keeps one width, one line count, and
                        one height — the row never reflows and nothing below the
                        section moves.

                        On the peek layout every card is the same width in both
                        states, so a percentage is already stable there and the
                        measure can follow the card. */}
                    <motion.div
                      style={wide ? { width: '46ch' } : { width: '100%', maxWidth: '46ch' }}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        clipPath: isActive ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                      }}
                      transition={
                        still
                          ? { duration: 0 }
                          : {
                              duration: FADE_MS,
                              ease: EASE_OUT,
                              delay: isActive ? COPY_DELAY_MS : 0,
                            }
                      }
                    >
                      <p className="mt-3 text-[1rem] leading-[1.65] text-jp-text-muted">
                        {block.body}
                      </p>
                    </motion.div>
                  </div>

                  {/* The interaction layer sits outside the clipped content so
                      its focus ring is never cut off. Hover, focus and tap all
                      resolve to the same single `active` state. */}
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`absolute inset-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jp-text-primary ${
                      isActive ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <span className="sr-only">{`Stage 0${i + 1}: ${block.title}`}</span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
