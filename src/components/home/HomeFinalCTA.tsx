import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section 7 — the final decision point, and the only one on the page.
 *
 * The job here is to shrink the perceived commitment: one project, alongside the
 * existing team. Exactly one action, with no secondary link to dilute it.
 */
export default function HomeFinalCTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-jp-border/12 bg-jp-background px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_58%_at_18%_100%,color-mix(in_oklab,var(--jp-brand-amber)_12%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-[46ch]">
          <h2 className="font-heading text-[2.125rem] font-extrabold leading-[1.08] tracking-[-0.022em] text-balance text-jp-text-primary sm:text-[2.875rem] lg:text-[3.5rem]">
            Start with one upcoming project.
          </h2>

          <p className="mt-7 font-heading text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.01em] text-balance text-jp-brand-amber sm:text-[1.4375rem] lg:text-[1.5rem]">
            You do not need to change how your whole company works.
          </p>

          <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-jp-text-secondary sm:text-[1.125rem] lg:text-[1.1875rem]">
            Start with the next project. JiTpro works alongside your team to identify the critical work, clarify who owns the next move, and put required dates around the decisions and commitments the project depends on—while there is still time to act.
          </p>

          <div className="mt-10 sm:mt-12">
            <Link
              to="/contact/contractor"
              className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-xl bg-jp-brand-amber px-4 py-4 text-center text-[0.9375rem] font-semibold text-jp-background shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--jp-brand-amber)_60%,transparent)] transition-colors duration-200 ease-out hover:bg-jp-brand-amber-active focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-jp-text-primary motion-reduce:transition-none sm:w-auto sm:px-7 sm:text-base"
            >
              <span className="[text-wrap:balance]">Protect your next project</span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
