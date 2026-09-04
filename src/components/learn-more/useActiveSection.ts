import { useCallback, useEffect, useRef, useState } from 'react';
import { GUIDE_SECTIONS } from '../../content/learnMore';

/**
 * Which numbered section the reader is currently in, for the guide rail's
 * active state (Design System §50.9).
 *
 * MECHANISM. `IntersectionObserver` is the trigger; the answer is computed
 * from geometry. The observer fires only when a section edge crosses the
 * activation line, and the callback then measures all twelve sections and
 * picks the last one whose top edge has passed that line. Deriving the answer
 * from `entry.isIntersecting` alone is what makes naive scrollspies flicker at
 * boundaries and lose their place on fast scrolls; twelve `getBoundingClientRect`
 * calls, a handful of times per page view, cost nothing and cannot be wrong.
 *
 * No scroll handler runs, and no library is added for this (§50.9).
 *
 * THE ACTIVATION LINE is the bottom edge of the sticky site header, passed in
 * by the caller so this module never guesses the header's height.
 *
 * THE CLICK LOCK. A guide link smooth-scrolls the page, which drags every
 * section past the activation line on the way. Left alone, the rail would
 * flick through four intermediate sections before settling. So a click locks
 * the active id to its destination; the lock lifts the moment the computed
 * answer agrees with it, and a timeout lifts it regardless in case the reader
 * interrupts the scroll. Under `prefers-reduced-motion` the jump is instant,
 * the first recompute agrees, and the lock lifts immediately.
 */

/** How long a click's lock survives if the scroll never arrives. */
const LOCK_TIMEOUT_MS = 1200;

export function useActiveSection(activationLine: number) {
  const [activeId, setActiveId] = useState<string>(GUIDE_SECTIONS[0].id);

  /** Destination of the most recent click, while its scroll is in flight. */
  const lockRef = useRef<string | null>(null);
  const lockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const elements = GUIDE_SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const recompute = () => {
      // Sections are in document order, so the last one whose top has passed
      // the line is the one being read. `top <= line` stops being true at the
      // first section still below the fold.
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= activationLine) {
          current = el.id;
        } else {
          break;
        }
      }

      if (lockRef.current !== null) {
        if (current !== lockRef.current) return;
        lockRef.current = null;
        if (lockTimerRef.current !== null) {
          window.clearTimeout(lockTimerRef.current);
          lockTimerRef.current = null;
        }
      }

      setActiveId(current);
    };

    const observer = new IntersectionObserver(recompute, {
      // Shrink the root's top edge to the activation line, so the observer
      // fires exactly when a section crosses it.
      rootMargin: `-${activationLine}px 0px 0px 0px`,
      threshold: 0,
    });

    elements.forEach((el) => observer.observe(el));
    recompute();

    return () => observer.disconnect();
  }, [activationLine]);

  useEffect(
    () => () => {
      if (lockTimerRef.current !== null) window.clearTimeout(lockTimerRef.current);
    },
    [],
  );

  /**
   * Called by a guide link on click. The anchor's own navigation does the
   * scrolling; this only makes the rail respond immediately rather than
   * waiting for the scroll to arrive.
   */
  const lockTo = useCallback((id: string) => {
    lockRef.current = id;
    setActiveId(id);

    if (lockTimerRef.current !== null) window.clearTimeout(lockTimerRef.current);
    lockTimerRef.current = window.setTimeout(() => {
      lockRef.current = null;
      lockTimerRef.current = null;
    }, LOCK_TIMEOUT_MS);
  }, []);

  return { activeId, lockTo };
}
