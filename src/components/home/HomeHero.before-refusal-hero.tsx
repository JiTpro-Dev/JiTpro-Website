import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section 1 — the hero, as a paired problem/response composition
 * (Decision Log 2026-08-26, hero recomposition; the centered organizing
 * statement was removed 2026-08-27 — the accountability H1 carries the hero
 * alone, and the panels sit directly under the hairline).
 *
 *   H1                 the display statement, centered (Decision Log
 *                      2026-08-27): the condition in primary text, the
 *                      accountability turn in brand amber over the approved
 *                      hand-drawn underline
 *   TWO PANELS         left = the problem, right = JiTpro's response, on the
 *                      §27.1 marketing panel, equal weight and shared edges
 *
 * The three mechanism lines in the right panel are a compact preview ONLY —
 * the Method section remains the page's one full mechanism argument, and
 * these lines must not grow into explanation (Decision Log 2026-08-26).
 *
 * Section height is content-driven: the panels' hard bottom edges close the
 * composition, so bottom padding is deliberately shorter than top padding.
 * The empty dark field the old loose columns left before section 02 was the
 * defect this composition corrects.
 *
 * NO HERO GRAPHIC — deliberate (2026-08-26). `BackwardPlannedTimeline` used to
 * render here and no longer does. The component is intact, unchanged and
 * reusable; this is a composition decision about the homepage hero, not a
 * judgement about the graphic.
 */

// Per-page-load flag: the hero entrance plays on a fresh load, then stays
// static when the visitor navigates back to the homepage within the same session.
let heroIntroPlayed = false;

const HERO_STAGGER_MS = 70;

// Very light grain over the hero lighting — enough to keep the dark surface
// from reading as flat, not enough to notice on its own.
const HERO_NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E";

// §27.1 marketing panel — the approved default card for dark surfaces.
const PANEL_CLASS = 'rounded-2xl border border-jp-border/15 bg-jp-surface p-6 sm:p-8 xl:p-10';

// The compact mechanism preview (approved copy, Decision Log 2026-08-26).
const MECHANISMS = [
  {
    title: 'See the work others own',
    body: 'We identify critical decisions, approvals, and commitments.',
  },
  {
    title: 'Map what depends on what',
    body: 'We organize dependencies and sequence the work.',
  },
  {
    title: 'Deliver what the field needs',
    body: 'We align every commitment to the required on-site date.',
  },
] as const;

export default function HomeHero() {
  const [animateHero] = useState(() => !heroIntroPlayed);
  useEffect(() => {
    heroIntroPlayed = true;
  }, []);

  // Three elements on a 70ms stagger; the last settles at ~700ms, so everything
  // is readable inside the first second. Each panel rises as one unit — the
  // paired composition is one idea, not a parade of parts (§46.3).
  const rise = (step: number) =>
    animateHero
      ? {
          className: 'hero-rise',
          style: { '--hero-delay': `${step * HERO_STAGGER_MS}ms` } as CSSProperties,
        }
      : { className: '', style: undefined };

  return (
    <section className="relative isolate overflow-hidden bg-jp-background px-6 pt-20 pb-12 sm:px-8 sm:pt-24 sm:pb-14 lg:px-10 lg:pt-28 lg:pb-16">
      {/* Lighting, tonal depth and grain. The stack resolves to the page
          background at the bottom edge so the hand-off to the section below
          has no visible seam. The warm key at the top right keeps the dark
          field from reading as flat around the centered headline. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(52%_48%_at_84%_2%,color-mix(in_oklab,var(--jp-brand-amber)_13%,transparent),transparent_68%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `url("${HERO_NOISE}")` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_46%,color-mix(in_oklab,var(--jp-background)_70%,transparent)_80%,var(--jp-background)_100%)]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--jp-brand-amber)_32%,transparent)_26%,color-mix(in_oklab,var(--jp-brand-amber)_50%,transparent)_52%,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* The headline is the composition's opening — centered, the page's
            one display-scale moment (Decision Log 2026-08-27), closing on the
            framed thesis below the underline. No eyebrow
            above it (removed 2026-08-26): the first thing on the page is the
            statement, not a label introducing it.

            One claim in two registers: the condition in primary text on its
            own line, the accountability turn in brand amber (§8.8 hero
            emphasis). The swoosh beneath belongs to the amber sentence —
            headline, sentence, and swoosh carry one animation state (§46.3).
            The 30ch cap is what makes the centered wraps read as set lines
            rather than accidents. */}
        <div className={rise(0).className} style={rise(0).style}>
          <h1 className="mx-auto max-w-[30ch] text-center font-heading text-[2.125rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-balance text-jp-text-primary sm:text-[3rem] lg:text-[3.5rem] lg:leading-[1.04] xl:text-[4rem] xl:tracking-[-0.03em]">
            <span className="block">You don&apos;t own every decision.</span>
            <span className="mt-3 block text-jp-brand-amber sm:mt-4">
              But you&apos;re accountable for what those decisions do to your project.
            </span>
          </h1>
          {/* The approved hand-drawn underline (Decision Log 2026-08-27, as
              refined twice the same day): one calligraphic stroke, drawn as a
              FILLED silhouette rather than a stroked path so the body itself
              tapers — fine point at the left, most weight through the center
              (~3 rendered px), released to a fine point at the right.

              THE BODY IS LEVEL AND ONLY THE ENDS MOVE. Between roughly 35%
              and 85% of the length the midline runs flat (~6.2 in a 14-unit
              box, varying by less than half a unit) — that flat body is what
              makes it read as a pen laid down and drawn straight. The turns
              live in the outer ~14% at each end: the left tip curls DOWN below
              the body, the right tip flicks UP above it. Tilting the body to
              connect the two tips is the failure mode — it reads as a diagonal
              line, not a stroke.

              The two turns are unequal by design (the left curl travels
              further than the right flick), and the taper is nib behaviour:
              full width along the level body, thinning as the direction
              rotates away from it into each turn. Evening the ends up, or
              raising the middle, turns it into a smile.

              Token amber via currentColor. Static by design. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 420 14"
            preserveAspectRatio="none"
            className="mx-auto mt-6 block h-3 w-56 max-w-full text-jp-brand-amber sm:mt-7 sm:w-[19rem] lg:mt-8 lg:w-[23rem] xl:w-[26rem]"
          >
            <path
              d="M6 10.2 C 30 9.2, 80 4.9, 150 4.6 C 200 4.5, 250 4.5, 300 4.55 C 340 4.7, 385 4.2, 414 2.9 C 394 4.8, 350 7.2, 300 7.9 C 255 8, 200 8.1, 150 8.1 C 100 8, 40 8.7, 6 10.2 Z"
              fill="currentColor"
            />
          </svg>

          {/* The thesis — what JiTpro does, answering the H1 directly
              (Decision Log 2026-08-27, as repositioned and then unframed the
              same day). It belongs to the headline: H1 states the condition,
              the amber turn states the accountability, this states the
              response. It rides the headline's own entrance beat rather than
              taking one of its own — one idea, not a parade of parts (§46.3).

              THE RULES FRAME IT WITHOUT ENCLOSING IT (§7.7, the flanked form).
              The border and padding this statement used to carry made it read
              as a UI component sitting above two real panels; two short rules
              on the same centre line make the same emphasis editorially. No
              box, no fill, no shadow — if it ever grows a container again it
              has stopped being type and become a card. The rules take the
              amber already running through the composition at low opacity;
              they continue that accent rather than opening a new one (§48.7).

              Subordinate by SIZE AND WEIGHT, not by a frame: medium weight at
              roughly a fifth of the H1's scale, which is what lets it stay in
              primary ink and remain the argument's conclusion. It holds one
              line at desktop and wraps on text-balance below that.

              WIDTH IS SIZED TO THE SENTENCE, NOT GUESSED (§7.7). `w-fit`
              resolves to the one-line width — rules, gaps and text — and
              `max-w-full` clamps it where the viewport is narrower, so the
              sentence holds one line wherever it fits and wraps where it does
              not. A hard rem measure here has to be re-guessed against real
              font metrics every time the register moves, and a measure that is
              a few pixels short wraps the sentence after "from", which is the
              defect this replaced.

              PROPORTION (§7.7): headline widest, this group ~84% of it, the
              swoosh ~42%. The nesting is the composition. */}
          <div className="mx-auto mt-7 flex w-fit max-w-full items-center justify-center gap-4 sm:mt-8 sm:gap-5 lg:mt-9 lg:gap-6">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-jp-brand-amber/70 sm:w-12 lg:w-14"
            />
            <p className="text-center font-heading text-[1.125rem] font-medium leading-[1.5] tracking-[-0.01em] text-balance text-jp-text-primary sm:text-[1.25rem] lg:text-[1.375rem]">
              JiTpro keeps preventable failures from becoming expensive field recoveries.
            </p>
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-jp-brand-amber/70 sm:w-12 lg:w-14"
            />
          </div>
        </div>

        {/* Equal-height stretch gives the pair their shared top and bottom
            edges on desktop (§27.1) — no fixed heights. Problem stacks
            first below lg. The hairline is the H1→band separation. */}
        <div className="mt-12 grid gap-5 border-t border-jp-border/12 pt-10 sm:mt-14 sm:gap-6 lg:grid-cols-2 lg:gap-7 lg:pt-12 xl:gap-8">
            {/* LEFT PANEL — the problem, on the accountability framing
                (Decision Log 2026-08-27): the reader does not control these
                decisions, yet remains accountable for what they do to the
                project. The full enumeration "decisions, approvals, products,
                materials, and services" is load-bearing and must not be
                narrowed to long-lead work (§20.1). */}
            <div className={`${PANEL_CLASS} ${rise(1).className}`} style={rise(1).style}>
              <h3 className="font-heading text-[1.25rem] font-semibold leading-snug text-jp-text-primary sm:text-[1.375rem]">
                The challenge is real.
              </h3>
              <div aria-hidden="true" className="mt-4 h-0.5 w-9 rounded-full bg-jp-brand-amber" />
              <div className="mt-6 max-w-[62ch] space-y-5 text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
                <p>
                  As projects grow, more of the decisions, approvals, products, materials, and services your schedule depends on sit outside your direct control.
                </p>
                <p>
                  When one falls behind, the problem eventually reaches the field. Work gets disrupted. The schedule slips. Recovery gets expensive. And your margin pays for it.
                </p>
              </div>
            </div>

            {/* RIGHT PANEL — the response. The category line is the approved
                §20.1 orientation copy, stated here and nowhere else on the
                page; it stays within the engagement-model doctrine: alongside
                your team, never a new external project-team participant. */}
            <div className={`flex flex-col ${PANEL_CLASS} ${rise(2).className}`} style={rise(2).style}>
              <h3 className="font-heading text-[1.25rem] font-semibold leading-snug text-jp-text-primary sm:text-[1.375rem]">
                JiTpro makes accountability clear before the schedule is at risk.
              </h3>
              <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem]">
                <span className="font-semibold text-jp-text-primary">
                  JiTpro is a consultancy-first program for growth-stage general contractors.
                </span>{' '}
                We work alongside your team, on one project.
              </p>

              {/* The mechanism preview: rows below xl, three columns at xl,
                  where the panel is wide enough to hold them without
                  shrinking type past legibility. */}
              <div className="mt-8 grid gap-5 xl:grid-cols-3 xl:gap-6">
                {MECHANISMS.map((mechanism) => (
                  <div key={mechanism.title} className="flex gap-3 xl:flex-col">
                    <Check
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-jp-brand-amber xl:mt-0"
                    />
                    <div>
                      <h4 className="text-[1rem] font-semibold leading-snug text-jp-text-primary">
                        {mechanism.title}
                      </h4>
                      <p className="mt-1.5 max-w-[38ch] text-[0.9375rem] leading-[1.6] text-jp-text-muted">
                        {mechanism.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* mt-auto anchors the CTA to the shared bottom edge when the
                  stretch leaves this panel spare room; pt-8 is the floor. */}
              <div className="mt-auto pt-8">
                <Link
                  to="/contact"
                  className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-xl bg-jp-brand-amber px-4 py-4 text-center text-[0.875rem] font-semibold text-jp-background shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--jp-brand-amber)_60%,transparent)] transition-colors duration-200 ease-out hover:bg-jp-brand-amber-active focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-jp-text-primary motion-reduce:transition-none sm:w-auto sm:px-6 sm:text-[0.9375rem]"
                >
                  <span className="[text-wrap:balance]">Start with one project</span>
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="hidden shrink-0 sm:block"
                  />
                </Link>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
