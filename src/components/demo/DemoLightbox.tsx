import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { CANVAS_H, CANVAS_W } from './DemoScreenFrame';
import './tokens.css';

/**
 * The one expanded-view system for every JiTpro representative screen.
 *
 * It renders the SAME canonical screen component passed to it, scaled up. No
 * enlarged duplicate exists, and because the screen is real DOM rather than a
 * bitmap, enlarging it makes it sharper rather than softer - the entire point
 * of the migration.
 *
 * NATIVE <dialog> WITH showModal(). Chosen over a hand-rolled portal because
 * the platform then owns the parts that are easy to get wrong: focus is
 * trapped inside the dialog, the rest of the document is inert to assistive
 * technology and to the pointer, Escape closes, and the dialog sits in the top
 * layer so no z-index in the page can cover it.
 *
 * MOBILE. A phone cannot show a 1448px desktop screen legibly scaled to fit
 * its width, so the dialog fits the canvas to HEIGHT and lets the viewer pan
 * horizontally. Fitting width instead would just reproduce the embedded view
 * at a larger size, which helps nobody. `overscroll-contain` stops that pan
 * from scrolling the page behind it.
 */

export default function DemoLightbox({
  label,
  children,
  onClose,
}: {
  label: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  /**
   * ONE layout effect, and the order inside it matters: a <dialog> that has not
   * been opened is `display: none`, so measuring the viewport before
   * showModal() yields 0 and the screen never renders. Open first, then
   * measure. Both are in a LAYOUT effect so the first painted frame already
   * has the correct scale rather than flashing an unscaled 1448px canvas.
   */
  useLayoutEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (!el.open) el.showModal();

    const measure = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const byWidth = vp.clientWidth / CANVAS_W;
      const byHeight = vp.clientHeight / CANVAS_H;
      // Below 768px: fit HEIGHT and let the viewer pan horizontally. Fitting
      // width would just reproduce the unreadable embedded view, larger.
      const narrow = window.innerWidth < 768;
      setScale(Math.min(narrow ? byHeight : Math.min(byWidth, byHeight), 1.6));
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener('resize', measure);

    // Escape fires `cancel`; route it through our own close so focus restores.
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener('cancel', onCancel);

    // <dialog> inerts the background but does not lock scrolling.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      el.removeEventListener('cancel', onCancel);
      document.body.style.overflow = prevOverflow;
      if (el.open) el.close();
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClick={(e) => {
        // Backdrop click: the dialog element itself is the backdrop, so a click
        // that lands on it rather than on its contents means "outside".
        if (e.target === dialogRef.current) onClose();
      }}
      className="jpd-lightbox"
    >
      <div className="jpd-lightbox__inner">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enlarged view"
          className="jpd-lightbox__close"
        >
          <X size={18} strokeWidth={2.25} />
        </button>

        <div ref={viewportRef} className="jpd-lightbox__viewport">
          <div
            aria-hidden="true"
            style={{
              width: CANVAS_W * scale,
              height: CANVAS_H * scale,
              position: 'relative',
              flex: 'none',
            }}
          >
            <div
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
              {scale > 0 && children}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
