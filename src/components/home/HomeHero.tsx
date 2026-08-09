import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackwardPlannedTimeline from '../hero/BackwardPlannedTimeline';

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

  // Hero copy enters top-down on a 70ms stagger; the last element settles at
  // ~840ms, so everything is readable inside the first second.
  const rise = (step: number) =>
    animateHero
      ? {
          className: 'hero-rise',
          style: { '--hero-delay': `${step * HERO_STAGGER_MS}ms` } as CSSProperties,
        }
      : { className: '', style: undefined };

  return (
    <section className="relative isolate overflow-hidden bg-jp-background px-6 py-14 sm:px-8 sm:py-20 lg:px-10 lg:pt-20 lg:pb-24">
      {/* Lighting, tonal depth and grain. The stack resolves to the page
          background at the bottom edge so the hand-off to the section below
          has no visible seam.

          A bespoke cool-blue wash used to sit at the top of this stack. It was
          removed rather than tokenized: it carried no information, and a
          decorative effect is not grounds for expanding the token system
          (Design System §8.8, Decision Log 2026-08-06). */}
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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.13fr)_minmax(0,0.87fr)] lg:gap-14 xl:gap-20">
          <div>
            <p
              className={`font-mono text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-jp-brand-amber/90 sm:text-xs sm:tracking-[0.26em] ${rise(0).className}`}
              style={rise(0).style}
            >
              Protect the field from early misses.
            </p>

            {/* The claim and its explanation are set tight so they read as one
                continuous thought rather than two stacked blocks. */}
            <h1
              className={`mt-5 font-heading text-[2rem] font-extrabold leading-[1.1] tracking-[-0.022em] text-balance text-jp-text-primary sm:mt-6 sm:text-[2.75rem] sm:leading-[1.08] lg:text-[3.25rem] min-[1440px]:text-[3.75rem] min-[1440px]:leading-[1.06] ${rise(1).className}`}
              style={rise(1).style}
            >
              You don&apos;t own every decision. But your project depends on how you manage them.
            </h1>
            <p
              className={`mt-2 font-heading text-[1.4375rem] font-semibold leading-[1.22] tracking-[-0.015em] text-balance text-jp-brand-amber sm:mt-2.5 sm:text-[2rem] lg:text-[2.375rem] min-[1440px]:mt-3 min-[1440px]:text-[2.75rem] min-[1440px]:leading-[1.18] ${rise(2).className}`}
              style={rise(2).style}
            >
              Small misses today become expensive recoveries tomorrow.
            </p>

            <p
              className={`mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:mt-7 sm:text-[1.1875rem] lg:text-[1.25rem] min-[1440px]:text-[1.3125rem] ${rise(3).className}`}
              style={rise(3).style}
            >
              JiTpro helps general contractors identify and manage the critical decisions, responsibilities, and commitments required to get products, materials, and services to the field when they are needed—before small misses become schedule delays and expensive recovery.
            </p>

            <div className={`mt-9 sm:mt-10 ${rise(4).className}`} style={rise(4).style}>
              <Link
                to="/contact/contractor"
                className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-xl bg-jp-brand-amber px-4 py-4 text-center text-[0.875rem] font-semibold text-jp-background shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--jp-brand-amber)_60%,transparent)] transition-colors duration-200 ease-out hover:bg-jp-brand-amber-active focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-jp-text-primary motion-reduce:transition-none sm:w-auto sm:px-6 sm:text-[0.9375rem]"
              >
                <span className="[text-wrap:balance]">Start your next project with more control</span>
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="hidden shrink-0 sm:block"
                />
              </Link>
            </div>
          </div>

          {/* Capped while stacked so the visual stays a companion to the copy
              rather than doubling the hero's height on tablets. */}
          <div
            className={`w-full max-w-[34rem] lg:max-w-none ${rise(2).className}`}
            style={rise(2).style}
          >
            <BackwardPlannedTimeline animate={animateHero} />
          </div>
        </div>
      </div>
    </section>
  );
}
