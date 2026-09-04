import { FIRST_PROJECT_PHASES, SECTION } from '../../content/learnMore';
import { NumberedSection, SectionHeader } from './LearnMoreShell';
import { TONE } from './tone';

const surface = 'dark' as const;

/**
 * 08 - What the first project looks like.
 *
 * Makes the engagement tangible enough to picture and no more specific than
 * what is actually established. There are DELIBERATELY no durations, no week
 * counts, no deliverable counts, and no meeting cadence here: none of those is
 * an approved decision, and inventing one on a marketing page turns a
 * placeholder into a commitment the delivery team then has to honour
 * (Appendix C, the non-decision placeholder policy).
 *
 * Phase ordinals take the Section 48.9 dark convention, the same as every
 * other sequence on the page.
 *
 * The phases run in order and the order is the argument: you cannot assign
 * accountability for a dependency you have not found, and you cannot date a
 * dependency you have not assigned.
 */
export default function FirstProjectSection() {
  const tone = TONE[surface];
  const section = SECTION['08'];

  return (
    <NumberedSection section={section} surface={surface}>
      <SectionHeader
        section={section}
        surface={surface}
        heading="What actually happens on that project."
        lede={
          <p>
            Four phases, in order. The first two are about finding what the project depends on. The last two are about making sure somebody owns each of those things and that you find out early when one stops moving.
          </p>
        }
      />

      <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-12">
        {FIRST_PROJECT_PHASES.map((phase, i) => (
          <li key={phase.name} className={`border-t pt-6 ${tone.rule}`}>
            <p className={`font-mono text-xs tracking-[0.2em] ${tone.ordinal}`}>
              <span className="sr-only">Phase </span>
              {`0${i + 1}`}
            </p>
            <h3
              className={`mt-3 max-w-[18ch] font-heading text-[1.1875rem] font-semibold leading-snug text-balance sm:text-[1.25rem] ${tone.heading}`}
            >
              {phase.name}
            </h3>
            <p className={`mt-3 max-w-[42ch] text-[1rem] leading-[1.65] ${tone.muted}`}>
              {phase.body}
            </p>
          </li>
        ))}
      </ol>
    </NumberedSection>
  );
}
