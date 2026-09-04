import { BACKWARD_CHAIN, SECTION } from '../../content/learnMore';
import { NumberedSection, SectionHeader } from './LearnMoreShell';
import { TONE } from './tone';

const surface = 'light' as const;

/**
 * 03 - Control starts earlier.
 *
 * The first section of the page's light act (Section 50.7): the problem has
 * been stated, and everything from here is method. On this ground hierarchy is
 * ink and amber carries no information (Section 8.8), so the figure below is
 * drawn entirely in the light ramp.
 *
 * THE BACKWARD DEPENDENCY SEQUENCE (Section 50.6) reads backward by
 * construction. The field need date is the first entry, and every entry after
 * it is earlier than the one above. A figure that ran forward and called
 * itself backward would be a defect, so the reading direction is stated in the
 * caption rather than left to the reader to infer.
 *
 * PROVENANCE (Section 48.10): methodological. The figure carries no dates, no
 * durations and no counts, so it makes no claim a reader could mistake for
 * evidence and needs no provenance line. Nothing may be added to it that
 * carries one.
 *
 * NO MOTION. The figure is legible at rest and there is nothing here for an
 * animation to explain that the order of the list does not already say
 * (Sections 46.1, 46.2, 47.4).
 */
export default function BackwardSection() {
  const tone = TONE[surface];
  const section = SECTION['03'];

  return (
    <NumberedSection section={section} surface={surface}>
      <SectionHeader
        section={section}
        surface={surface}
        heading="Start from the date the field needs it."
        lede={
          <>
            <p>
              Most planning starts with the question that is easiest to ask: when should we order it? That question has no correct answer on its own, because it does not know what the answer is for.
            </p>
            <p>
              The question that has an answer is the other one. When does the field need it? Everything that has to be true before that date can then be established, dated, and assigned.
            </p>
          </>
        }
      />

      <div className="mt-14 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
        <div>
          <h3
            className={`max-w-[20ch] font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-balance sm:text-[1.75rem] lg:text-[2rem] ${tone.heading}`}
          >
            This is not another task list. It is the chain the date depends on.
          </h3>
          <p className={`mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] sm:text-[1.125rem] ${tone.body}`}>
            A task list tells you what somebody intends to do. A dependency chain tells you what has to be true for the field date to be possible, and therefore what is already late even though nobody has missed anything yet.
          </p>
        </div>

        <figure className="mt-12 lg:mt-0">
          <figcaption
            className={`font-mono text-[0.6875rem] uppercase tracking-[0.2em] ${tone.muted}`}
          >
            Read down. Each step has to happen earlier than the one above it.
          </figcaption>

          {/* The spine is one constant weight for its whole length. It is
              structure, not progress: nothing fills, and no step is the
              "current" one. */}
          <ol className="mt-6">
            {BACKWARD_CHAIN.map((link, i) => {
              const isLast = i === BACKWARD_CHAIN.length - 1;

              return (
                <li key={link.label} className="relative pl-8 pb-7 last:pb-0">
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-[4px] top-[0.85rem] w-px bg-jp-ink-secondary/30"
                    />
                  )}
                  {/* The first node is filled: it is the anchor the rest of
                      the chain is measured from, and that difference is
                      weight, not hue. */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[4px] top-[0.55rem] h-[9px] w-[9px] -translate-x-1/2 rounded-full ${
                      i === 0 ? 'bg-jp-background' : 'border border-jp-ink-secondary/55 bg-jp-surface-light'
                    }`}
                  />

                  <p
                    className={`text-[1.0625rem] font-semibold leading-snug sm:text-[1.125rem] ${tone.heading}`}
                  >
                    {link.label}
                  </p>
                  <p className={`mt-1.5 max-w-[52ch] text-[0.9375rem] leading-[1.6] sm:text-[1rem] ${tone.muted}`}>
                    {link.note}
                  </p>
                </li>
              );
            })}
          </ol>
        </figure>
      </div>

      <p
        className={`mt-16 max-w-[52ch] border-t pt-12 font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-balance sm:text-[1.75rem] lg:mt-20 lg:text-[2rem] ${tone.rule} ${tone.heading}`}
      >
        By the time the last step is late, it was the first step that ran out of time.
      </p>
    </NumberedSection>
  );
}
