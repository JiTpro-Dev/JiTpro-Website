import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section 1 — the hero, as a declarative belief (Decision Log 2026-08-27,
 * the refusal hero).
 *
 *   EYEBROW   whose refusal this is, in the data face — reinstated 2026-08-27,
 *             superseding the 2026-08-26 removal. The H1 below is first
 *             person, and an unattributed first person reads as brand voice.
 *   H1        the refusal itself, centered — the page's one display moment
 *   SWOOSH    the approved hand-drawn underline, geometry unchanged
 *   COPY      the chain, in a left-set reading column: growth and complexity →
 *             more to keep ahead of the field → reaction → lost productivity
 *             and schedule → expensive recovery → lost profit. Then what
 *             JiTpro is.
 *   CTA       unchanged, closing on the composition's own centre axis
 *
 * THE HERO NO LONGER EXPLAINS THE MECHANISM. The paired §27.1 panels and the
 * three mechanism lines are gone, with the accountability H1 and the flanked
 * thesis (preserved verbatim: HomeHero.before-refusal-hero.tsx, and
 * src/archive/homepage/HeroAccountabilityComposition.md for the copy and the
 * reasoning). The Method section owns the mechanism; the hero owns the belief.
 * Nothing may be added back here that teaches how the work is done.
 *
 * VOICE (binding, §20.1 audience rule): the reader is a successful contractor
 * whose complexity has outgrown the systems that got them here — never a
 * victim of chaos, never disorganized. The claim is that the industry
 * TOLERATES a cost it need not, and that we refused to. "We refused" is the
 * founder's own record, not a promise about the reader's project, and it must
 * never be rewritten into one.
 *
 * ALIGNMENT: eyebrow, H1, underline and CTA hold the centre axis (§48.6 hero
 * allowance). The two paragraphs between them are body copy and are therefore
 * LEFT-ALIGNED inside a centered column — centered body copy is prohibited
 * (§7.7) and the CTA exception's four-line cap does not reach this much copy.
 * The column is the reading surface; the axis is the composition.
 *
 * NO HERO GRAPHIC — deliberate (2026-08-26), and now doubly so: this hero's
 * argument is a sentence, not a diagram.
 */

// Per-page-load flag: the hero entrance plays on a fresh load, then stays
// static when the visitor navigates back to the homepage within the same session.
let heroIntroPlayed = false;

const HERO_STAGGER_MS = 70;

// Very light grain over the hero lighting — enough to keep the dark surface
// from reading as flat, not enough to notice on its own.
const HERO_NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E";

export default function HomeHero() {
  const [animateHero] = useState(() => !heroIntroPlayed);
  useEffect(() => {
    heroIntroPlayed = true;
  }, []);

  // Three groups on a 70ms stagger; the last settles at ~700ms, so everything
  // is readable inside the first second. Each group rises as one unit — the
  // belief, its explanation, and the action are three ideas, not a parade of
  // parts (§46.3). The eyebrow, H1 and underline share the first beat because
  // they are one statement.
  const rise = (step: number) =>
    animateHero
      ? {
          className: 'hero-rise',
          style: { '--hero-delay': `${step * HERO_STAGGER_MS}ms` } as CSSProperties,
        }
      : { className: '', style: undefined };

  return (
    <section className="relative isolate overflow-hidden bg-jp-background px-6 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20 lg:px-10 lg:pt-28 lg:pb-24">
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
        {/* THE BELIEF — eyebrow, refusal, underline. One statement, one beat.

            The eyebrow is authored in sentence case and uppercased in CSS so
            assistive technology receives normally-cased text (§7.7), set in
            the data face at small size with increased tracking (§7.3). It is
            the surface's third and last amber element, after the underline and
            the CTA (§48.7) — the panels that used to carry a fourth and fifth
            are gone.

            The 30ch cap is what makes the centered wraps read as set lines
            rather than accidents. */}
        <div className={rise(0).className} style={rise(0).style}>
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-jp-brand-amber/80">
            Built by contractors
          </p>

          <h1 className="mx-auto mt-6 max-w-[30ch] text-center font-heading text-[2.125rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-balance text-jp-text-primary sm:mt-7 sm:text-[3rem] lg:text-[3.5rem] lg:leading-[1.04] xl:text-[4rem] xl:tracking-[-0.03em]">
            We refused to accept that chaos is just part of construction.
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
        </div>

        {/* THE CHAIN, then the response. Left-set body copy in a centered
            column (§7.7): growth and complexity, the fall behind, the reaction,
            and what reaction costs — productivity, schedule, recovery, profit.
            The full enumeration "decisions, approvals, products, materials,
            and services" is load-bearing and must not be narrowed to long-lead
            work (§20.1).

            The second paragraph is the turn: what JiTpro IS, in one sentence,
            and how it works with the team — never above it or in place of it
            (§20.1, engagement model). It names the consultancy-first program
            and stops. The mechanism belongs to the Method section. */}
        <div
          className={`mx-auto mt-12 max-w-[58ch] space-y-6 text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:mt-14 sm:text-[1.125rem] lg:text-[1.1875rem] ${rise(1).className}`}
          style={rise(1).style}
        >
          <p>
            As construction companies grow, keeping every decision, approval, product, material, and service ahead of the field gets harder. When that work falls behind, the project turns reactive&mdash;productivity suffers, schedules slip, recovery gets expensive, and profit disappears.
          </p>
          <p>
            <strong className="font-semibold text-jp-text-primary">
              JiTpro is a consultancy-first program for growth-stage general contractors.
            </strong>{' '}
            We work alongside your team, on one project, to ensure the field has what it needs&mdash;Just-in-Time.
          </p>
        </div>

        {/* The action closes on the axis the composition opened on. Button
            treatment, destination and label are unchanged. */}
        <div
          className={`mt-10 flex justify-center sm:mt-12 ${rise(2).className}`}
          style={rise(2).style}
        >
          <Link
            to="/contact"
            className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-xl bg-jp-brand-amber px-4 py-4 text-center text-[0.875rem] font-semibold text-jp-background shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--jp-brand-amber)_60%,transparent)] transition-colors duration-200 ease-out hover:bg-jp-brand-amber-active focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-jp-text-primary motion-reduce:transition-none sm:w-auto sm:px-6 sm:text-[0.9375rem]"
          >
            <span className="[text-wrap:balance]">Start with one project</span>
            <ArrowRight size={17} aria-hidden="true" className="hidden shrink-0 sm:block" />
          </Link>
        </div>
      </div>
    </section>
  );
}
