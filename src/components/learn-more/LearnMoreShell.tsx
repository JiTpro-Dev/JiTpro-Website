import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GuideSection } from '../../content/learnMore';
import type { Surface } from './tone';
import { TONE } from './tone';
import { SECTION_SCROLL_MT } from './guideLayout';

/**
 * The shared primitives for the long-form explainer page (Design System
 * Section 50). They exist so the page's twelve sections cannot each invent a
 * slightly different ordinal, heading register, hairline, or CTA
 * (Section 49.1: a convention is never invented inside a component).
 *
 * The colours they use come from the surface tone table in `./tone`, never
 * from a literal chosen here (Sections 8.9, 45).
 */

type SectionProps = {
  section: GuideSection;
  surface: Surface;
  children: ReactNode;
};

/**
 * One numbered section (Section 50.3). The `id` and the ordinal come from
 * GUIDE_SECTIONS, so the guide cannot address a section that does not exist
 * and a section cannot renumber itself.
 *
 * `SECTION_SCROLL_MT` clears the sticky site header, so a reader arriving on
 * an anchor lands on the section rather than behind the navigation
 * (Sections 50.8, 50.9). It is the same value the rail parks at.
 *
 * THE HORIZONTAL CLASSES ARE A BLEED, and they are what let one component
 * serve both layouts (Section 50.9). The page's guide area owns the container
 * and the page gutters; this section then:
 *
 *   below xl   cancels those gutters with a negative margin and re-applies
 *              them as padding, so its background reaches the viewport edges
 *              exactly as it did before the rail existed. The full-bleed act
 *              surfaces are unchanged at these widths.
 *   at xl      stops bleeding and fills its grid column instead, so the act
 *              surface becomes a panel beside the rail, with its own internal
 *              padding. The rail keeps one constant ground for its whole
 *              length, which is the reason the acts move into the column at
 *              all (Section 50.7 as amended).
 *
 * The vertical rhythm is identical in both.
 */
export function NumberedSection({ section, surface, children }: SectionProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className={`${SECTION_SCROLL_MT} -mx-6 px-6 py-20 sm:-mx-8 sm:px-8 sm:py-24 lg:-mx-10 lg:px-10 lg:py-28 xl:mx-0 xl:px-8 ${TONE[surface].section}`}
    >
      {children}
    </section>
  );
}

type HeaderProps = {
  section: GuideSection;
  surface: Surface;
  /** The section's one primary statement (Section 7.7). */
  heading: string;
  /** Optional lead paragraph, set directly under the statement. */
  lede?: ReactNode;
};

/**
 * The ordinal, the h2, and the lead paragraph as one continuous thought
 * (Section 7.7): tight vertical spacing, differentiated size and weight.
 *
 * The ordinal is announced as "Section 04" and then hidden as a duplicate,
 * because on its own the marker reads as a bare number to a screen reader.
 */
export function SectionHeader({ section, surface, heading, lede }: HeaderProps) {
  const tone = TONE[surface];

  return (
    <header>
      <p className={`font-mono text-xs tracking-[0.2em] ${tone.ordinal}`}>
        <span className="sr-only">Section </span>
        {section.ordinal}
      </p>
      <h2
        id={`${section.id}-heading`}
        className={`mt-4 max-w-[24ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance sm:text-[2.5rem] lg:max-w-[26ch] lg:text-[3rem] ${tone.heading}`}
      >
        {heading}
      </h2>
      {lede ? (
        <div
          className={`mt-6 max-w-[62ch] space-y-5 text-[1.0625rem] leading-[1.7] sm:text-[1.125rem] lg:mt-8 lg:text-[1.1875rem] ${tone.body}`}
        >
          {lede}
        </div>
      ) : null}
    </header>
  );
}

/**
 * The page's primary action (Section 50.5). Every instance carries the same
 * label and the same destination as the homepage's, by construction: the label
 * and route are constants here, not props, so a section cannot introduce a
 * second offer.
 *
 * Treatment is the homepage's unchanged: amber fill, one hover gesture (the
 * colour change to --jp-brand-amber-active, Section 48.1), and a focus outline
 * in --jp-text-primary that clears the control edge.
 */
export function PrimaryAction({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/contact"
      className={`inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-xl bg-jp-brand-amber px-4 py-4 text-center text-[0.9375rem] font-semibold text-jp-background shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--jp-brand-amber)_60%,transparent)] transition-colors duration-200 ease-out hover:bg-jp-brand-amber-active focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-jp-text-primary motion-reduce:transition-none sm:w-auto sm:px-7 sm:text-base ${className}`}
    >
      <span className="[text-wrap:balance]">Start with one project</span>
      <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
    </Link>
  );
}
