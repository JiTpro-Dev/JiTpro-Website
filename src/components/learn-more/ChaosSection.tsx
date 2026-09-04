import { CHAOS_CONDITIONS, SECTION } from '../../content/learnMore';
import { NumberedSection, SectionHeader } from './LearnMoreShell';
import { TONE } from './tone';

const surface = 'dark' as const;

/**
 * 01 - The chaos you have learned to accept.
 *
 * Recognition. The reader should finish this section thinking "that is my
 * Tuesday", and should not find a single sentence blaming anyone for it.
 *
 * TONE IS LOAD-BEARING (Section 50.2). Every condition listed is written as a
 * STATE OF THE PROJECT, never as someone's failure. There is no owner who will
 * not decide, no architect who will not answer, no subcontractor who will not
 * commit. Rewriting any of these into an accusation breaks the section's whole
 * argument, which is that the dependency is the problem and the people are
 * not.
 *
 * The closing statement is the hinge into section 02 and is supplied copy. It
 * is set in ink at the page's demoted display register, not in amber: this
 * section spends its one accent on the ordinal (Section 48.7).
 */
export default function ChaosSection() {
  const tone = TONE[surface];
  const section = SECTION['01'];

  return (
    <NumberedSection section={section} surface={surface}>
      <SectionHeader
        section={section}
        surface={surface}
        heading="None of this is new to you."
        lede={
          <>
            <p>
              You already know how a project actually arrives. Almost nothing is fully resolved when the work starts, and the parts that are not resolved do not announce themselves.
            </p>
            <p>
              A capable team absorbs it. That absorption is the cost nobody puts on a schedule.
            </p>
          </>
        }
      />

      <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:mt-16 lg:gap-x-16">
        {CHAOS_CONDITIONS.map((condition) => (
          <li
            key={condition}
            className={`border-t py-5 text-[1rem] leading-[1.65] sm:text-[1.0625rem] ${tone.rule} ${tone.body}`}
          >
            {condition}
          </li>
        ))}
      </ul>

      {/* The hinge. One sentence per line by design: the first concedes the
          condition, the second names the failure. */}
      <p
        className={`mt-14 max-w-[46ch] border-t pt-12 font-heading text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.01em] text-balance sm:max-w-[60ch] sm:text-[1.4375rem] lg:mt-16 lg:text-[1.5rem] ${tone.rule} ${tone.heading}`}
      >
        <span className="block">The problem is not that construction depends on other people.</span>
        <span className="mt-3 block">
          The problem is waiting until the field needs something to find out that nobody drove it to completion.
        </span>
      </p>
    </NumberedSection>
  );
}
