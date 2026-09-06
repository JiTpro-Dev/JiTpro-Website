import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import DemoLightbox from './DemoLightbox';
import { DEMO_SCREENS, type DemoScreenId } from './registry';
import './tokens.css';

/**
 * The site-wide presentation wrapper for a JiTpro representative screen.
 *
 * ONE CANONICAL SCREEN, MANY CONTEXTS. The homepage, the Learn More page and
 * the expanded modal all render the same component; this wrapper only decides
 * how large it is drawn and whether it can be opened. There is no "small" or
 * "large" implementation.
 *
 * SCALING. The screen is authored at a fixed 1448x1086 desktop canvas and the
 * whole canvas is scaled with a CSS transform. Deliberately NOT an internally
 * responsive layout: these are desktop application screens, and reflowing them
 * into a phone UI would depict a product JiTpro does not have.
 *
 *   - `aspect-ratio` on the outer box reserves exact height before JS runs, so
 *     there is no layout shift and no dependence on the observer having fired.
 *   - `transform-origin: top left` makes scale and position one calculation.
 *   - A ResizeObserver drives the scale, because the container changes size
 *     without the window doing so (the Learn More guide rail appearing at xl
 *     is exactly that case).
 *   - `will-change: transform`, 3D transforms and transitions on the scale are
 *     ALL deliberately absent. Any of them promotes the canvas to its own
 *     composited layer, which rasterises it once and then samples the bitmap -
 *     reintroducing precisely the blurring this whole migration exists to
 *     remove. Text must re-rasterise at the composited resolution.
 *
 * ACCESSIBILITY. The interior is hundreds of non-functional nodes, so it is
 * exposed as a single labelled image rather than as a fake application: the
 * canvas is `aria-hidden` inside a `role="img"` carrying the screen's existing
 * alt text, and the only focusable thing is the enlarge control. That keeps
 * assistive-technology output identical to the raster it replaces.
 */

const CANVAS_W = 1448;
const CANVAS_H = 1086;

type Props = {
  screen: DemoScreenId;
  /** Accessible description. The raster's existing alt text is reused verbatim. */
  label: string;
  /** Opt out of expansion for a surface that should stay inert. */
  expandable?: boolean;
  className?: string;
};

export default function DemoScreenFrame({
  screen,
  label,
  expandable = true,
  className = '',
}: Props) {
  const entry = DEMO_SCREENS[screen];
  const Screen = entry.component;

  const boxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(0);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / CANVAS_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Belt and braces. The observer is the correct instrument, because the
    // container can change without the window doing so (the Learn More guide
    // rail appearing at xl). The window listener costs nothing and keeps the
    // frame correct if observer delivery is ever suppressed.
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Focus returns to the control that opened the modal (WCAG 2.4.3).
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const canvas = (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: CANVAS_W,
        height: CANVAS_H,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      {/* Rendered only once a scale is known, so the unscaled 1448px canvas is
          never painted at full size for a frame. */}
      {scale > 0 && <Screen />}
    </div>
  );

  const frame = (
    <div
      ref={boxRef}
      role="img"
      aria-label={label}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
        overflow: 'hidden',
        background: 'var(--jpd-surface)',
      }}
    >
      {canvas}
    </div>
  );

  if (!expandable) return <div className={className}>{frame}</div>;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${label}`}
        className={`jpd-frame group relative block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left ${className}`}
      >
        {frame}
        {/* The affordance. Quiet at rest, present on hover and on keyboard
            focus - never hover-only. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 flex items-center justify-center rounded-md opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          style={{
            width: 28,
            height: 28,
            background: 'color-mix(in oklab, #0a0a0a 62%, transparent)',
            color: '#fff',
          }}
        >
          <Maximize2 size={14} strokeWidth={2.25} />
        </span>
      </button>

      {open && (
        <DemoLightbox label={label} onClose={close}>
          <Screen />
        </DemoLightbox>
      )}
    </>
  );
}

export { CANVAS_W, CANVAS_H };
