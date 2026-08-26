/**
 * Section 4 — the JiTpro turn. The first section that answers rather than
 * argues, and the page's first light surface.
 *
 * BUYER-JOURNEY JOB: understanding. The visitor arrives from the response
 * window believing they need to see these conditions earlier, and must leave
 * able to say four things without help — what JiTpro is, who it is for, what
 * operating requirement it is organized around, and which direction the method
 * runs. It deliberately does not describe the method. Section 5 does that, and
 * this section's only remaining job at its close is to make the reader ask for
 * it.
 *
 * This replaces HomeThesisStatement, whose single line is absorbed here as the
 * closing thesis. It kept its meaning but lost its §7.7 centered-editorial
 * standing: that exception covers a statement ALONE in its own section, and a
 * line inside a composition is governed by the ordinary left-alignment rule.
 * The line earns its place because it is the only sentence that reaches back to
 * Section 3 — "while there is still time" is the response window, named from
 * the answer side — and because it says WHEN the method acts, which neither the
 * requirement nor the backward direction states.
 *
 * COPY THAT IS LOAD-BEARING (§20.1, the operating requirement). The requirement
 * has two halves and both must survive: WHAT — the correct product or
 * specification, defined and approved for installation; WHEN — available at the
 * moment the field is ready for it. It is an operating requirement and the
 * controls built around it, never a guaranteed outcome, so nothing here may
 * promise delivery, conformance, or a schedule, or suggest JiTpro replaces the
 * project manager's or the design team's responsibilities. "Not late. Not
 * wrong." is retired and must not return.
 *
 * COMPOSITION — visual centre of gravity: the requirement, set as the section's
 * display statement across the left two thirds, with the orientation copy
 * landing on the same baseline at the right. WHAT and WHEN are then two halves
 * of one hairline band spanning the container — deliberately NOT two cards and
 * not three feature boxes (§48.2: most content does not need a card). The
 * backward line closes the band at full width, and the thesis closes the
 * section beneath its own rule. Nothing in this section sits in a narrow left
 * column with an empty right half.
 *
 * SURFACE: light. Act two of three, on --jp-surface-light. Hierarchy is ink,
 * never amber: --jp-brand-amber is 1.96:1 on this ground and carries no
 * information here (§8.8, amber on light surfaces). Primary ink is the page
 * canvas value, body is --jp-ink-secondary, and micro-labels hold the normative
 * 85% floor.
 */
export default function JiTproTurnSection() {
  return (
    <section className="bg-jp-surface-light px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        {/* The requirement and the orientation share a baseline rather than
            stacking, so the category is neither an eyebrow above the statement
            nor a caption beneath it. The air above the orientation copy is the
            light this composition is built on, not leftover space. */}
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10 xl:gap-x-16">
          <h2 className="font-heading text-[2rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-balance text-jp-background sm:text-[2.5rem] lg:col-span-7 lg:text-[3rem] xl:text-[3.25rem]">
            The field needs the right product, approved for installation, when the work is ready for it.
          </h2>

          <p className="mt-8 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-jp-ink-secondary sm:text-[1.125rem] lg:col-span-5 lg:mt-0">
            <span className="font-semibold text-jp-background">
              JiTpro is a consultancy-first program for growth-stage general contractors.
            </span>{' '}
            We work alongside your project team on one project&mdash;with your people, your design team and your trade partners&mdash;on the work that has to happen before the field needs it.
          </p>
        </div>

        {/* One band, divided. The rule runs the full container and the two
            halves sit inside it, so this reads as a single statement annotated
            in two places rather than as a pair of panels. */}
        <div className="mt-16 border-t border-jp-ink-secondary/20 pt-10 sm:mt-20 lg:mt-24 lg:pt-12">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 xl:gap-x-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-ink-secondary/85">
                What
              </p>
              <p className="mt-4 max-w-[40ch] text-[1.1875rem] leading-[1.55] text-jp-ink-secondary sm:text-[1.3125rem]">
                The correct product or specification has been{' '}
                <span className="font-semibold text-jp-background">defined and approved for installation</span>.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-jp-ink-secondary/85">
                When
              </p>
              <p className="mt-4 max-w-[40ch] text-[1.1875rem] leading-[1.55] text-jp-ink-secondary sm:text-[1.3125rem]">
                It is available at the moment the{' '}
                <span className="font-semibold text-jp-background">field is ready for it</span>.
              </p>
            </div>
          </div>

          {/* The direction, at full container width: the band's conclusion, and
              the sentence that makes the reader ask what the method actually
              is. Section 5 answers it. */}
          <p className="mt-14 max-w-[34ch] font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-balance text-jp-background sm:max-w-none sm:text-[1.75rem] lg:mt-16 lg:text-[2rem]">
            Everything upstream is planned and managed backward from that point.
          </p>
        </div>

        {/* The thesis, beneath its own rule. Left-aligned: the §7.7 centered
            exception applies to a statement standing alone in its own section,
            which this no longer is. */}
        <div className="mt-16 border-t border-jp-ink-secondary/20 pt-10 lg:mt-20 lg:pt-12">
          <p className="max-w-[30ch] font-heading text-[1.75rem] font-extrabold leading-[1.14] tracking-[-0.025em] text-balance text-jp-background sm:max-w-[36ch] sm:text-[2.125rem] lg:max-w-[42ch] lg:text-[2.5rem]">
            JiTpro builds control early&mdash;while there is still time to protect the field.
          </p>
        </div>
      </div>
    </section>
  );
}
