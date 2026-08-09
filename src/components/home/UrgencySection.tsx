/**
 * Section 3 — why the problem must be solved early.
 *
 * The escalation is carried by one continuous rail above the stages rather
 * than by a diagram: it starts as a neutral hairline and warms toward amber
 * as the project's options run out. Colour is reinforcement only — the stage
 * numbers and the copy carry the same order on their own. On mobile the
 * stages stack, so each keeps its own short marker instead of a rail.
 */

const STAGES = [
  {
    title: 'The decision stays open',
    body: 'Nothing appears to be wrong yet.',
    rule: 'bg-jp-border/12',
    dot: 'bg-jp-text-muted',
  },
  {
    title: 'Time keeps passing',
    body: 'The project quietly loses options.',
    rule: 'bg-jp-brand-amber/30',
    dot: 'bg-jp-brand-amber/50',
  },
  {
    title: 'The field needs the result',
    body: 'The team is forced into delay, resequencing, expediting, or recovery.',
    rule: 'bg-jp-brand-amber/65',
    dot: 'bg-jp-brand-amber',
  },
];

export default function UrgencySection() {
  return (
    <section className="border-y border-jp-border/12 bg-jp-surface px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-[22ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
          The problem gets expensive before it becomes obvious.
        </h2>
        <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
          A missing decision may not stop the field today. But every day it remains open removes time from review, approval, release, fabrication, and delivery. By the time the field feels the impact, the project may have no good options left.
        </p>

        {/* The rail mirrors the ol's grid so each dot lands exactly on its
            column's left edge. The first two segments extend through the grid
            gap (negative right margin = gap minus the 12px each dot keeps on
            both sides), so the three opacity steps join into one line that
            warms left to right. */}
        <div
          aria-hidden="true"
          className="mt-14 hidden gap-x-10 sm:grid sm:grid-cols-3 lg:mt-16 lg:gap-x-14"
        >
          {STAGES.map((stage, i) => (
            <div
              key={stage.title}
              className={`flex items-center gap-3 ${
                i < STAGES.length - 1 ? '-mr-[1.75rem] lg:-mr-[2.75rem]' : ''
              }`}
            >
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${stage.dot}`} />
              <span className={`h-px flex-1 ${stage.rule}`} />
            </div>
          ))}
        </div>

        <ol className="mt-14 grid gap-x-10 gap-y-10 sm:mt-6 sm:grid-cols-3 lg:gap-x-14">
          {STAGES.map((stage, i) => (
            <li key={stage.title}>
              <div className="flex items-center gap-3 sm:hidden" aria-hidden="true">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${stage.dot}`} />
                <span className={`h-px flex-1 ${stage.rule}`} />
              </div>
              <span className="mt-6 block font-mono text-xs tracking-[0.2em] text-jp-brand-amber/80 sm:mt-0">
                {`0${i + 1}`}
              </span>
              <h3 className="mt-3 font-heading text-[1.1875rem] font-semibold leading-snug text-jp-text-primary sm:text-[1.25rem]">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[1rem] leading-[1.65] text-jp-text-muted">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
