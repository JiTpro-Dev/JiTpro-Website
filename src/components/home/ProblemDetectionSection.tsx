import DependencyChain from './DependencyChain';

/**
 * Section 2 — Detection. Why a capable team finds these conditions late.
 *
 * BUYER-JOURNEY JOB: recognition, then reframe. The visitor arrives thinking
 * "we're chasing too much" and should leave thinking "we're finding out too
 * late." Those are different problems with different answers, and the whole
 * section turns on the difference.
 *
 * This replaces PriorityClaritySection. Its opening movement — the six-month
 * question, the taxonomy of open conditions, and the project-team photograph
 * with its approved §17.1 environmental treatment — is carried over intact and
 * is the strongest recognition material on the site.
 *
 * What did NOT carry over is the triage movement ("your team can't treat
 * everything like a priority") and its amber close. Triage presumes every item
 * is already known and the only question is ordering; this section's headline
 * asks about something the team cannot see. Keeping both made the section
 * argue against itself, and it made the response-window section that follows
 * read as a restatement rather than an escalation.
 *
 * COMPOSITION — visual centre of gravity: it MOVES within the section. The
 * opening movement is weighted right, where the photograph forms the
 * environment for the reading column. The chain then spans the full container,
 * so the section ends wider than it began and the page does not settle onto a
 * left rail (whole-page composition requirement, 2026-08-25).
 *
 * SURFACE: dark. Act one of three — the problem chapter runs on
 * --jp-background, and the photograph's §17.1 dissolve is built from that token.
 */
export default function ProblemDetectionSection() {
  return (
    <section className="bg-jp-background px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:px-10 lg:pt-24 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="lg:relative lg:grid lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-x-14 lg:overflow-hidden xl:gap-x-16">
          {/* The text stacks above the photograph's faded left reach, so line
              ends that meet the dissolve stay fully readable. */}
          <div className="lg:relative lg:z-10">
            <h2 className="max-w-[26ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
              What&apos;s the one thing your team can&apos;t see today that could stop work in the field six months from now?
            </h2>

            <div className="mt-6 max-w-[62ch] space-y-5 text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:mt-8 lg:text-[1.1875rem]">
              <p>The problem that stops work six months from now often already exists today.</p>
              <p>
                A missing selection. An unresolved detail. An undefined product. A scope gap. A decision no one knows they own.
              </p>
              <p>
                Your team is not missing these because they are careless. They are missing them because no one person is holding the whole sequence, and the sequence is now long enough that holding it in meetings, spreadsheets and memory has stopped working.
              </p>
            </div>
          </div>

          {/* Explicit aspect ratios reserve the layout before the image
              arrives (§17.1); eager loading because this sits at the first
              scroll position below the hero. At lg the photograph keeps its
              native 16:9 composition — the whole meeting scene — fills the
              full height of the opening movement, and reaches left beneath
              the copy: the environment for the section's right side rather
              than an image card beside it. */}
          <div className="mt-10 sm:mt-12 lg:mt-0">
            <div className="lg:absolute lg:inset-y-0 lg:right-0">
              <img
                src={`${import.meta.env.BASE_URL}assets/below_hero-1600.webp`}
                srcSet={`${import.meta.env.BASE_URL}assets/below_hero-800.webp 800w, ${import.meta.env.BASE_URL}assets/below_hero-1600.webp 1600w`}
                sizes="(min-width: 1024px) 65vw, 100vw"
                width={1600}
                height={900}
                alt="Construction project team reviewing drawings and schedule information around a conference table"
                loading="eager"
                decoding="async"
                className="aspect-[2/1] w-full object-cover object-[50%_38%] sm:aspect-[21/9] lg:aspect-video lg:h-full lg:w-auto lg:max-w-none"
              />
              {/* A short ramp over the photograph's own first widths keeps
                  its physical left edge seamless — the boundary itself is
                  swallowed even though the scene behind it stays faintly
                  present. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-[7%] bg-[linear-gradient(90deg,var(--jp-background)_0%,transparent_100%)] lg:block"
              />
            </div>
          </div>

          {/* The dissolve spans the whole opening movement rather than the
              photograph, so its stops track the text column's share of the
              row at every width. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,color-mix(in_oklab,var(--jp-background)_78%,transparent)_0%,color-mix(in_oklab,var(--jp-background)_78%,transparent)_30%,color-mix(in_oklab,var(--jp-background)_62%,transparent)_40%,color-mix(in_oklab,var(--jp-background)_46%,transparent)_50%,color-mix(in_oklab,var(--jp-background)_20%,transparent)_56%,transparent_62%)] lg:block"
          />
        </div>

        {/* The mandated cause-and-effect movement, on one named package, at
            full container width. The tracked example is custom steel windows,
            not structural steel (2026-08-26): the point is an unresolved
            upstream condition, and tracking the package the contractor already
            watches would answer this section's own question with the obvious
            item. No lead time is stated here or in the figure (§20.1). */}
        <div className="border-t border-jp-border/12 pt-12 lg:pt-14">
          <h3 className="max-w-[46ch] font-heading text-[1.3125rem] font-semibold leading-snug text-balance text-jp-text-primary sm:text-[1.4375rem]">
            None of it looks like a schedule problem while there is still time to fix it.
          </h3>
          <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem]">
            On a custom steel window package, one open question about how the frame meets the wall does not stop anything on the day it is asked. It stops something months later, and by then it is not a question any more.
          </p>

          <DependencyChain />

          {/* The section's single amber element (§48.7) — the reframe, stated
              as the takeaway. One sentence per line by design. */}
          <p className="mt-14 font-heading text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.01em] text-jp-brand-amber sm:text-[1.4375rem] lg:mt-16">
            <span className="block">The field is where you find out.</span>
            <span className="block">It is not where it started.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
