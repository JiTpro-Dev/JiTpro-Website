/**
 * Section 2 — the first beat after the hero: the problem that stops the field
 * six months from now already exists today, the team cannot treat everything
 * as a priority, and JiTpro makes the priority clear.
 *
 * This is the opening argument's second half, so it stays on the hero's
 * background with a slightly tightened top rhythm — connected to the hero
 * rather than reading as an ordinary lower-page section. The heading holds the
 * standard section scale, not display scale: the hero keeps the page's one
 * primary statement (§7.7).
 *
 * The opening movement is an editorial two-column composition: the headline
 * and introductory copy hold the shared left edge, and a project-team
 * photograph — the section's evidence, a capable team surrounded by project
 * information — sits to the right under the integrated treatment (§17.1):
 * darkened and desaturated toward the surface, dissolving into the background
 * on the text-facing edge, subordinate to the headline. Below lg the
 * photograph stacks after the introductory copy in a wide cinematic crop and
 * the dissolve is dropped.
 *
 * Three movements in one reading column, separated by hairline rules (§48.6).
 * The closing statement is the section's single amber element (§48.7) — the
 * takeaway, set in the site's established amber emphasis treatment. Bottom
 * padding is tighter than the standard rhythm to match: Section 3 continues
 * the argument directly, and the two split the boundary evenly.
 */
export default function PriorityClaritySection() {
  return (
    <section className="bg-jp-background px-6 pt-16 pb-10 sm:px-8 sm:pt-20 sm:pb-12 lg:px-10 lg:pt-24 lg:pb-14">
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
                None of it looks critical yet. But every unresolved dependency consumes time—and once that time is gone, the construction schedule has fewer options.
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
              row at every width. It is the only darkening in play — the
              photograph carries no global filter — so where the overlay
              ends, shortly past the reading zone, the scene stands at its
              full natural brightness. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,color-mix(in_oklab,var(--jp-background)_78%,transparent)_0%,color-mix(in_oklab,var(--jp-background)_78%,transparent)_30%,color-mix(in_oklab,var(--jp-background)_62%,transparent)_40%,color-mix(in_oklab,var(--jp-background)_46%,transparent)_50%,color-mix(in_oklab,var(--jp-background)_20%,transparent)_56%,transparent_62%)] lg:block"
          />
        </div>

        <div className="mt-12 max-w-[62ch] border-t border-jp-border/12 pt-8 lg:mt-14 lg:pt-10">
          <h3 className="font-heading text-[1.3125rem] font-semibold leading-snug text-balance text-jp-text-primary sm:text-[1.4375rem]">
            Your team can&apos;t treat everything like a priority.
          </h3>
          <div className="mt-4 space-y-5 text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem]">
            <p>
              Project resources are finite. Every hour spent on work that can responsibly wait is an hour that cannot be spent on something that needs attention now.
            </p>
            <p>The challenge is knowing the difference.</p>
          </div>
        </div>

        <div className="mt-12 max-w-[62ch] border-t border-jp-border/12 pt-8 lg:mt-14 lg:pt-10">
          <h3 className="font-heading text-[1.3125rem] font-semibold leading-snug text-balance text-jp-text-primary sm:text-[1.4375rem]">
            JiTpro makes the priority clear.
          </h3>
          <div className="mt-4 space-y-5 text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem]">
            <p>
              JiTpro identifies the products, materials, and services the project will need and works backward from when the field needs them to determine what must happen—and when.
            </p>
            <p>
              That gives your team early visibility into the decisions, information, and commitments that could disrupt the construction schedule before they become urgent.
            </p>
          </div>

          {/* One sentence per line by design, not incidental wrapping: the
              three parallel lines are the rhythm. Sized to the amber emphasis
              convention without the final-CTA's lg bump — stacked, the larger
              size would read as a second hero. */}
          <p className="mt-10 font-heading text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.01em] text-jp-brand-amber sm:text-[1.4375rem] lg:mt-12">
            <span className="block">Know what matters now.</span>
            <span className="block">Know what comes next.</span>
            <span className="block">Know what can calmly wait.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
