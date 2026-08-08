/**
 * Section 4 — JiTpro in the simplest possible terms.
 *
 * Heading and intro sit left, steps stack right, so the rhythm differs from the
 * three-column sections either side of it without introducing a new card style.
 */

const STEPS = [
  {
    title: 'Make the work visible',
    body: 'We identify the decisions, information, responsibilities, and commitments your project depends on.',
  },
  {
    title: 'Put a name and date on it',
    body: 'We show who owns the next move and when it must happen to keep the project moving.',
  },
  {
    title: 'Act while there is still time',
    body: 'We help your team lead critical work early, while the project still has reasonable options.',
  },
];

export default function WhatJiTproDoesSection() {
  return (
    <section className="bg-jp-background px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <div>
          <h2 className="max-w-[18ch] font-heading text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-jp-text-primary sm:text-[2.5rem] lg:text-[3rem]">
            JiTpro helps your team get ahead of the work
          </h2>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
            We help make critical project work visible, assign the next move, and keep the team focused on what must happen before the field is affected.
          </p>
        </div>

        <ol className="grid gap-8 sm:gap-10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-t border-jp-border/12 pt-6">
              <span className="font-mono text-xs leading-6 tracking-[0.2em] text-jp-brand-amber/80">
                {`0${i + 1}`}
              </span>
              <div>
                <h3 className="font-heading text-[1.1875rem] font-semibold leading-snug text-jp-text-primary sm:text-[1.3125rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[1rem] leading-[1.65] text-jp-text-muted sm:text-[1.0625rem]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
