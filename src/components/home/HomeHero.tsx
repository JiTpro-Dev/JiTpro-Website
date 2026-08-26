import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section 1 — the hero. Two jobs, and deliberately no more.
 *
 *   RECOGNITION   "this is describing the problem we're experiencing"
 *   ORIENTATION   "JiTpro is for contractors like us"
 *
 * It does not explain backward planning, demonstrate the method, establish the
 * economic consequence, or carry the growth-stage diagnosis. Those belong to
 * sections 2 through 5, and the page has seven more sections to make them in.
 *
 * NO HERO GRAPHIC — deliberate (2026-08-26). `BackwardPlannedTimeline` used to
 * render here and no longer does. The component is intact, unchanged and
 * reusable; this is a composition decision about the homepage hero, not a
 * judgement about the graphic. Removing it also preserves visual escalation:
 * the page now builds from typography, to a cause-and-effect figure, to the
 * response-window ladder, to the methodology's construction-planning visual,
 * which is where the substantial diagram belongs.
 *
 * COMPOSITION — visual centre of gravity: the headline itself, upper-left,
 * spanning roughly three quarters of the container at display scale, with the
 * lighting stack falling across the open upper right. Beneath a hairline, the
 * lower band runs edge to edge on an asymmetric 5 / gutter / 5 split, so the
 * removed diagram does not leave an empty right half (whole-page composition
 * requirement, 2026-08-25). The open area beside the headline is compositional:
 * it is where the light is, and it is what lets the headline read as
 * architecture rather than as a wide paragraph.
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

  // Four elements on a 70ms stagger; the last settles at ~770ms, so everything
  // is readable inside the first second.
  const rise = (step: number) =>
    animateHero
      ? {
          className: 'hero-rise',
          style: { '--hero-delay': `${step * HERO_STAGGER_MS}ms` } as CSSProperties,
        }
      : { className: '', style: undefined };

  return (
    <section className="relative isolate overflow-hidden bg-jp-background px-6 py-20 sm:px-8 sm:py-28 lg:px-10 lg:pt-32 lg:pb-36">
      {/* Lighting, tonal depth and grain. The stack resolves to the page
          background at the bottom edge so the hand-off to the section below
          has no visible seam. With the diagram gone, the warm key at the top
          right is what gives the open side of the composition its purpose —
          the headline sits in light rather than beside a void. */}
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
        {/* The headline is the composition. No eyebrow above it (removed
            2026-08-26): at this scale the first thing on the page should be the
            statement, not a label introducing it. */}
        <h1
          className={`font-heading text-[2.125rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-balance text-jp-text-primary sm:text-[3rem] lg:max-w-[76%] lg:text-[3.5rem] lg:leading-[1.04] xl:text-[4rem] xl:tracking-[-0.03em] ${rise(0).className}`}
          style={rise(0).style}
        >
          You don&apos;t own every decision. But your project depends on how you manage them.
        </h1>

        {/* The lower band runs the full container on an asymmetric split, so the
            side the diagram used to occupy is carrying content rather than
            standing empty. */}
        <div className="mt-14 border-t border-jp-border/12 pt-10 sm:mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:pt-12 xl:gap-x-16">
          {/* Recognition — the condition, introduced and not explained. Section
              2 is what explains why these things stay invisible. */}
          <p
            className={`max-w-[46ch] text-[1.125rem] leading-[1.65] text-jp-text-secondary sm:text-[1.25rem] lg:col-span-5 lg:text-[1.3125rem] ${rise(1).className}`}
            style={rise(1).style}
          >
            The bigger the project, the harder it gets to keep decisions, approvals and long-lead work ahead of the field.
          </p>

          {/* Orientation — who this is for and what kind of thing it is, stated
              once, briefly. The engagement is explained in section 4. */}
          <div className="mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <p
              className={`max-w-[42ch] text-[1.0625rem] leading-[1.65] text-jp-text-secondary sm:text-[1.125rem] ${rise(2).className}`}
              style={rise(2).style}
            >
              <span className="font-semibold text-jp-text-primary">
                JiTpro is a consultancy-first program for growth-stage general contractors.
              </span>{' '}
              We work alongside your team, on one project.
            </p>

            <div className={`mt-8 ${rise(3).className}`} style={rise(3).style}>
              <Link
                to="/contact/contractor"
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
