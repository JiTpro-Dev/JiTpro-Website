/**
 * Section 3 — the response window. What late discovery does to the options.
 *
 * BUYER-JOURNEY JOB: consequence, and the beginning of budget buy-in. Not
 * "delays cost money" — the price and the KIND of the available fix escalate as
 * the window closes. Early it is a decision the team makes. Late it is a favour,
 * a premium, or somebody else's schedule moving.
 *
 * This replaces UrgencySection, moved up from position five to position three.
 * It was previously the premise arriving two sections behind the conclusion it
 * was supposed to license.
 *
 * CONTINUITY CONSTRAINT (binding): this section MUST NOT re-narrate the
 * submittal-to-fabrication chain that Section 2 has just told. Section 2's
 * subject is detection; this section's subject is economics. The old intro named
 * review, approval, release, fabrication and delivery — the exact chain Section
 * 2 now draws — so it was rewritten around options rather than around the
 * sequence. If both sections tell a steel story they are one section.
 *
 * The fourth tier is new. Three stages jumped from "nothing looks wrong" to "the
 * field is affected" with no middle, which is where the real cost actually lives
 * and the only tier a reader can act on.
 *
 * COMPOSITION — visual centre of gravity: distributed, then full width. The head
 * is a two-column band so the heading and its explanation share the canvas
 * instead of stacking in a left column, and the ladder spans all four columns
 * edge to edge. Nothing in this section sits in a narrow left rail.
 *
 * SURFACE: elevated dark. Act one closes on --jp-surface, so the problem chapter
 * ends on its own band and the light answer chapter that follows lands as a
 * genuine change of environment.
 */

type Tier = {
  title: string;
  body: string;
  /** Warming hairline — reinforcement only; the copy carries the order (§8.7). */
  rule: string;
  dot: string;
};

const TIERS: Tier[] = [
  {
    title: 'The decision is still open',
    body: 'Nothing looks wrong. The fix is a decision your own team can make this week.',
    rule: 'bg-jp-border/12',
    dot: 'bg-jp-text-muted',
  },
  {
    title: 'The answer now has a deadline',
    body: 'Still just a decision — but the date it is needed by belongs to someone outside your company.',
    rule: 'bg-jp-brand-amber/25',
    dot: 'bg-jp-brand-amber/40',
  },
  {
    title: 'The fix has to be bought',
    body: 'Expedite. Substitute. Resequence. Pay for overtime in a shop you do not control, or escalate to someone who can force a slot.',
    rule: 'bg-jp-brand-amber/45',
    dot: 'bg-jp-brand-amber/65',
  },
  {
    title: 'The field absorbs it',
    body: 'Crews work around it or wait for it. Everything sequenced behind it moves. Recovery is the only option still on the table.',
    rule: 'bg-jp-brand-amber/70',
    dot: 'bg-jp-brand-amber',
  },
];

export default function ResponseWindowSection() {
  return (
    <section className="border-y border-jp-border/12 bg-jp-surface px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Two-column head: the heading and the sentence that explains it share
            the canvas rather than stacking into a left column. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <h2 className="max-w-[22ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
            The problem gets expensive before it becomes obvious.
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-5 text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:mt-2 lg:text-[1.1875rem]">
            <h3 className="max-w-[36ch] font-heading text-[1.25rem] font-semibold leading-snug text-balance text-jp-text-primary sm:text-[1.375rem]">
              The problem does not go away. Your options do.
            </h3>
            <p>
              The longer an issue stays unresolved, the fewer good choices the team has left. What could have been handled early with a calm decision eventually becomes expediting, substitution, resequencing, escalation—or a problem the field has no choice but to absorb.
            </p>
          </div>
        </div>

        {/* The rail mirrors the ol's grid so each dot lands exactly on its
            column's left edge. The first three segments extend through the grid
            gap, so the four opacity steps join into one line that warms left to
            right across the full container. */}
        <div
          aria-hidden="true"
          className="mt-16 hidden gap-x-8 sm:grid sm:grid-cols-4 lg:mt-20 lg:gap-x-10"
        >
          {TIERS.map((tier, i) => (
            <div
              key={tier.title}
              className={`flex items-center gap-3 ${
                i < TIERS.length - 1 ? '-mr-[1.25rem] lg:-mr-[1.75rem]' : ''
              }`}
            >
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tier.dot}`} />
              <span className={`h-px flex-1 ${tier.rule}`} />
            </div>
          ))}
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {TIERS.map((tier, i) => (
            <li key={tier.title}>
              <div className="flex items-center gap-3 sm:hidden" aria-hidden="true">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tier.dot}`} />
                <span className={`h-px flex-1 ${tier.rule}`} />
              </div>
              <span className="mt-6 block font-mono text-xs tracking-[0.2em] text-jp-brand-amber/80 sm:mt-0">
                <span className="sr-only">Stage </span>
                {`0${i + 1}`}
              </span>
              <h3 className="mt-3 max-w-[22ch] font-heading text-[1.1875rem] font-semibold leading-snug text-balance text-jp-text-primary sm:text-[1.25rem]">
                {tier.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[1rem] leading-[1.65] text-jp-text-muted">
                {tier.body}
              </p>
            </li>
          ))}
        </ol>

        {/* Closes on the ownership vacuum, which is the question the JiTpro turn
            answers. Not amber: this section already spends its accent on the
            warming rail (§48.7). */}
        <p className="mt-16 max-w-[62ch] text-[1.125rem] leading-[1.65] text-jp-text-secondary sm:text-[1.1875rem] lg:mt-20 lg:text-[1.25rem]">
          Every one of those moves is available to your team today. The reason they get used late is not that nobody was willing—it is that{' '}
          <span className="font-semibold text-jp-text-primary">nobody&apos;s job was the whole sequence</span>, early enough for the cheap version to still be on the table.
        </p>
      </div>
    </section>
  );
}
