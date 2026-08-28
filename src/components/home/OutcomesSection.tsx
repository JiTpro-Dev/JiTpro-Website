/**
 * Section 6 — the practical difference, kept deliberately plain.
 * No statistics, no percentages, no guarantees.
 */

const OUTCOMES = [
  {
    title: 'Problems surface before they reach the field',
    body: 'Missing decisions, unresolved scope, and coordination gaps are exposed while there is still time to resolve them collaboratively.',
  },
  {
    title: 'The schedule has a chance to hold',
    body: 'Critical decisions, approvals, commitments, products, materials, and services are driven by when the field actually needs them.',
  },
  {
    title: 'Margin is protected',
    body: 'Fewer preventable failures reach construction—reducing disruption, recovery work, lost productivity, and the cost of getting the schedule back.',
  },
];

export default function OutcomesSection() {
  return (
    <section className="border-y border-jp-border/12 bg-jp-surface px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-[20ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
          What changes when the work is led earlier
        </h2>

        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:gap-x-14">
          {OUTCOMES.map((outcome) => (
            <li key={outcome.title} className="border-t border-jp-brand-amber/30 pt-6">
              <h3 className="font-heading text-[1.25rem] font-semibold leading-snug text-jp-text-primary sm:text-[1.375rem]">
                {outcome.title}
              </h3>
              <p className="mt-3 max-w-[44ch] text-[1rem] leading-[1.65] text-jp-text-muted sm:text-[1.0625rem]">
                {outcome.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
