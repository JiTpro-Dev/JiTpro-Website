import { GUIDE_SECTIONS } from '../../content/learnMore';
import { ACTIVATION_LINE_PX } from './guideLayout';
import { useActiveSection } from './useActiveSection';

/**
 * The persistent guide rail (Design System §50.9), rendered at `xl` and above.
 * Below that breakpoint the in-flow guide of §50.4 renders instead, and the
 * two are never both in the layout: the rail's wrapper is `hidden xl:block`
 * and the in-flow guide's is `xl:hidden`, so exactly one exists in the
 * accessibility tree at any width.
 *
 * STICKY, NOT FIXED, and the distinction is the whole design. The rail lives
 * inside the guide area's own grid column, so it enters when the guide does,
 * releases when section 11 ends, and is structurally incapable of reaching the
 * site header or the footer or floating over the hero. A fixed element would
 * need all of that taught to it in measurements that go stale the first time
 * the header changes height.
 *
 * THE PAGE SCROLLS, NOT A PANE (§50.9). There is no independent scroll region
 * in the content column. The document scrolls exactly as it always did; this
 * element simply stops moving with it.
 *
 * THE ACTIVE STATE IS CARRIED ON FOUR AXES, and only one of them is colour
 * (§8.7, §50.9):
 *   1. the hairline indicator at the item's leading edge, drawn only when active
 *   2. the title's weight and ink step
 *   3. the ordinal's step from its resting opacity to full brand amber
 *   4. `aria-current`, which is the only axis that does not require sight
 * Removing any of the first three leaves the state legible. Removing the
 * fourth does not.
 *
 * AMBER (§48.7): the ordinals, which §48.9 already governs, plus the one
 * indicator against the active item. The indicator continues that accent
 * rather than opening a new one, and nothing else in the rail is accented.
 *
 * SHORT VIEWPORTS. Twelve items with two-line titles run to roughly 660px,
 * which does not fit a 768px-tall window once the header and the sticky offset
 * are taken out. The list therefore carries a max height and scrolls ONLY when
 * it has to. At ordinary desktop heights nothing scrolls and the whole guide
 * is visible, which is the requirement; the overflow is the graceful failure,
 * not the design. Scroll chaining is deliberately left at its default so that
 * reaching the end of the list keeps scrolling the page.
 */
export default function GuideRail() {
  const { activeId, lockTo } = useActiveSection(ACTIVATION_LINE_PX);

  return (
    <aside className="hidden xl:block">
      {/* `top-24` is the 96px the sections' scroll-margin also uses, so the
          rail parks exactly where a jumped-to section's top edge parks. */}
      <nav
        aria-labelledby="guide-rail-heading"
        className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-2"
      >
        <h2
          id="guide-rail-heading"
          className="font-heading text-[1.0625rem] font-semibold leading-snug text-jp-text-primary"
        >
          In this guide
        </h2>

        <ol className="mt-5 border-t border-jp-border/12 pt-2">
          {GUIDE_SECTIONS.map((section) => {
            const isActive = section.id === activeId;

            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => lockTo(section.id)}
                  className={`group relative flex items-baseline gap-3 py-2 pl-3 pr-1 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jp-text-primary motion-reduce:transition-none ${
                    isActive ? '' : 'hover:bg-jp-border/[0.06]'
                  }`}
                >
                  {/* Axis 1. Reserved on every row, drawn on one, so nothing
                      shifts horizontally as the active item changes. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-1 left-0 w-0.5 rounded-full transition-colors duration-200 ease-out motion-reduce:transition-none ${
                      isActive ? 'bg-jp-brand-amber' : 'bg-transparent'
                    }`}
                  />

                  {/* Axis 3. */}
                  <span
                    className={`shrink-0 font-mono text-[0.6875rem] tracking-[0.18em] transition-colors duration-200 ease-out motion-reduce:transition-none ${
                      isActive ? 'text-jp-brand-amber' : 'text-jp-brand-amber/70'
                    }`}
                  >
                    <span className="sr-only">Section </span>
                    {section.ordinal}
                  </span>

                  {/* Axis 2. */}
                  <span
                    className={`min-w-0 text-[0.875rem] leading-[1.35] transition-colors duration-200 ease-out motion-reduce:transition-none ${
                      isActive
                        ? 'font-semibold text-jp-text-primary'
                        : 'font-normal text-jp-text-muted group-hover:text-jp-text-secondary group-focus-visible:text-jp-text-secondary'
                    }`}
                  >
                    {section.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
