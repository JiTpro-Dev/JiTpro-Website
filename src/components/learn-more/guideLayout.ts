/**
 * The measurements the guide rail and the numbered sections have to agree on
 * (Design System §50.9).
 *
 * THE SITE HEADER IS THE SOURCE OF ALL OF THEM. `src/components/Navigation.tsx`
 * renders `sticky top-0 z-50` with an `h-20` row and a 1px bottom border, so it
 * occupies 81px at every width it is visible. Nothing here is a guessed number,
 * and if that header's height changes this file is the one place to change.
 */

/** The sticky site header: `h-20` (80px) plus its 1px bottom border. */
export const HEADER_HEIGHT_PX = 81;

/**
 * Where a numbered section's top edge comes to rest after an anchor jump, as a
 * Tailwind class. `scroll-mt-24` is 96px: the header's 81px plus 15px of air,
 * so the destination band clears the header instead of tucking under it.
 *
 * Every anchor target on the page uses this one value (§50.9, header offset).
 */
export const SECTION_SCROLL_MT = 'scroll-mt-24';

/**
 * The line, in px from the top of the viewport, that a section's top edge has
 * to cross to count as the one being read. Sits just below where an anchor jump
 * parks a section (96px), so a clicked section registers as active the moment
 * it arrives.
 */
export const ACTIVATION_LINE_PX = 104;

/**
 * THE RAIL'S BREAKPOINT IS `xl` (1280px), NOT `lg` (1024px).
 *
 * It is written as literal `xl:` utilities in the components rather than
 * exported from here, because Tailwind resolves class names statically and a
 * composed prefix would not be generated. This note is the record of why the
 * value is what it is.
 *
 * The reason is the content column rather than the rail: at 1024px, a 16rem rail plus gutters leaves the
 * content under 660px, which squeezes the five-column-plus-seven-column
 * figures inside sections 03, 04 and 05 past the point where they read. A rail
 * that damages the content it indexes has taken space from the thing the page
 * exists to deliver (§50.9, breakpoint chosen by what the content can carry).
 *
 * Between 1024px and 1279px the in-flow guide of §50.4 is what renders, which
 * is the same experience the page shipped with.
 */
