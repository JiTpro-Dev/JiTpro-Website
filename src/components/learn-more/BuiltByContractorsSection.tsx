import { SECTION } from '../../content/learnMore';
import { NumberedSection, SectionHeader } from './LearnMoreShell';
import { TONE } from './tone';

const surface = 'dark' as const;

/**
 * 10 - Built by contractors.
 *
 * This section exists to EARN the homepage's credibility line, and nothing
 * else. It is not a founder biography, not a company history, and not a
 * timeline: no names, no dates, no photograph, no career narrative. Section
 * 17.2 governs founder presence where a founder is actually presented, and
 * this section deliberately does not present one.
 *
 * The test for every sentence here is whether it tells the READER something
 * about their own projects. A sentence that is only about us does not belong.
 *
 * "We refused" and "we have stood in your boots" are the founder's own record
 * (HomeHero, and the voice note recorded there). They are never a promise
 * about the reader's project and must not be rewritten into one.
 */
export default function BuiltByContractorsSection() {
  const tone = TONE[surface];
  const section = SECTION['10'];

  return (
    <NumberedSection section={section} surface={surface}>
      <SectionHeader
        section={section}
        surface={surface}
        heading="We have stood in your boots."
        lede={
          <>
            <p>
              JiTpro did not come out of a software company looking for a construction problem. It came out of running projects, and out of paying for the same category of failure enough times to stop calling it bad luck.
            </p>
            <p>
              The pattern was always the same. Something the field needed was waiting on information, a decision, or a commitment that nobody had driven to completion. By the time it surfaced, the only remaining options were expensive ones.
            </p>
          </>
        }
      />

      <div className={`mt-14 grid gap-x-14 gap-y-10 border-t pt-12 lg:mt-16 lg:grid-cols-2 lg:gap-x-20 ${tone.rule}`}>
        <div>
          <h3
            className={`max-w-[24ch] font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-balance sm:text-[1.75rem] ${tone.heading}`}
          >
            Waiting for information is not a management strategy.
          </h3>
        </div>
        <div className={`max-w-[58ch] space-y-5 text-[1.0625rem] leading-[1.7] sm:text-[1.125rem] ${tone.body}`}>
          <p>
            Every one of those recoveries was preventable, and every one of them was preventable earlier than anyone was looking. The information existed. The decision could have been asked for. The commitment could have been made explicit and dated.
          </p>
          <p>
            So we built the structure we needed and did not have. It is contractor logic, in contractor language, and it assumes the reader already knows how a project actually works.
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
