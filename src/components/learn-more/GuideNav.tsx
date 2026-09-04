import { GUIDE_SECTIONS } from '../../content/learnMore';

/**
 * The in-flow presentation of the in-page guide (Design System Section 50.4).
 *
 * IT RENDERS BELOW `xl` ONLY. At `xl` and above the same guide is presented as
 * the persistent rail in GuideRail.tsx (Section 50.9); this one is
 * `xl:hidden` and that one is `hidden xl:block`, so exactly one of the two is
 * ever in the layout or in the accessibility tree. They are one component at
 * two breakpoints, not two navigations.
 *
 * There is no progress bar and no reading-time estimate: this is a list of
 * where the argument goes.
 *
 * REAL ANCHORS ONLY. Every entry is an `<a href="#...">`, so it is keyboard
 * reachable, focusable, announced as a link, and openable in a new tab. A
 * click handler on a div would satisfy the mouse and nobody else.
 *
 * MOTION: the movement is the document's own `scroll-behavior: smooth`
 * (src/index.css), which the browser already suppresses under
 * `prefers-reduced-motion: reduce`. No script participates, so there is
 * nothing here that can ignore the preference (Sections 46.5, 50.4).
 *
 * The ordinals follow Section 48.9 exactly as the section headers do, which is
 * what makes the list read as the same numbering rather than a second one.
 * The titles are ordinary interface type: the guide is structure, not accent.
 */
export default function GuideNav() {
  return (
    <nav
      aria-labelledby="in-this-guide-inline-heading"
      className="-mx-6 bg-jp-background px-6 py-16 sm:-mx-8 sm:px-8 sm:py-20 lg:-mx-10 lg:px-10 lg:py-24 xl:hidden"
    >
      <div>
        <h2
          id="in-this-guide-inline-heading"
          className="font-heading text-[1.5rem] font-bold leading-[1.15] tracking-[-0.02em] text-jp-text-primary sm:text-[1.75rem]"
        >
          In this guide
        </h2>

        <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-x-14">
          {GUIDE_SECTIONS.map((section) => (
            <li key={section.id} className="border-t border-jp-border/12">
              <a
                href={`#${section.id}`}
                className="group flex items-baseline gap-4 py-4 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jp-text-primary motion-reduce:transition-none"
              >
                <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-jp-brand-amber/80">
                  <span className="sr-only">Section </span>
                  {section.ordinal}
                </span>
                <span className="text-[1rem] leading-snug text-jp-text-secondary underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out group-hover:text-jp-text-primary group-hover:decoration-jp-border/60 group-focus-visible:text-jp-text-primary motion-reduce:transition-none sm:text-[1.0625rem]">
                  {section.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
