import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  PHASE_FAMILIES,
  STATUS_LABEL,
  parse,
  type ScheduleStep,
} from './scheduleModel';

/**
 * The phase/milestone inspection layer.
 *
 * WHY THIS IS A PORTAL, NOT A CHILD. The JiTpro canvas is drawn at 1448px and
 * scaled to its container - roughly 0.30 in the Learn More column and 0.77 in
 * the expanded dialog. A popover rendered inside that transformed subtree would
 * inherit the scale and set its 13px type at 4px. So the popover renders
 * OUTSIDE the transform and is anchored from the inspected element's
 * `getBoundingClientRect()`, which already reports post-transform viewport
 * coordinates.
 *
 * WHY THE PORTAL TARGET IS INJECTED. The production expanded view is a native
 * <dialog> opened with `showModal()`, which lives in the browser's top layer.
 * Anything portalled to `document.body` paints UNDERNEATH it. The presentation
 * environment therefore supplies its own container through context, and the
 * schedule never needs to know which surface it is on.
 */

export type InspectionCapabilities = {
  /** Where the popover mounts. Null falls back to document.body. */
  portalTarget: HTMLElement | null;
  /** Off in the embedded preview; on in expanded inspection. */
  enabled: boolean;
};

export const InspectionContext = createContext<InspectionCapabilities>({
  portalTarget: null,
  enabled: false,
});

export function useInspection() {
  return useContext(InspectionContext);
}

const FAMILY_LABEL = Object.fromEntries(PHASE_FAMILIES.map((f) => [f.key, f.label]));

function fmt(d: string) {
  return parse(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const STATUS_TONE: Record<string, { bg: string; bd: string; fg: string }> = {
  complete: { bg: '#eef2f6', bd: '#d8dee6', fg: '#475569' },
  'on-track': { bg: '#e9f6e4', bd: '#cfe8c6', fg: '#217a3c' },
  'at-risk': { bg: '#fef2e1', bd: '#fadfba', fg: '#b7791f' },
  upcoming: { bg: '#f4f4f5', bd: '#e4e4e7', fg: '#6b7280' },
};

export type Anchor = {
  /** The inspected segment. Used for horizontal intent and the highlight. */
  segRect: DOMRect;
  /** The whole procurement row. This is the band the card must not cover. */
  rowRect: DOMRect;
  /** Row identity, so the card can stay put while scrubbing within one row. */
  rowId: string;
  step: ScheduleStep;
};

/**
 * PLACEMENT: ABOVE OR BELOW THE ROW. NEVER BESIDE IT.
 *
 * The card clears the whole procurement ROW plus a margin, because reading a
 * path means moving horizontally along it and the card must not sit on the
 * sequence being read.
 *
 * THE ABOVE/BELOW DECISION IS PURELY POSITIONAL. It compares the row's centre
 * against the viewport midpoint and nothing else:
 *
 *   row centre in the top half    -> card BELOW the row
 *   row centre in the bottom half -> card ABOVE the row
 *
 * It deliberately does NOT ask whether the card fits. The previous version
 * did, and that was the bug: it tried above, then below, then fell back to a
 * side placement. Because card height varies with description length, two
 * neighbouring segments on the SAME row could get different answers from the
 * fit test, so the card flipped between below, above and left as the cursor
 * moved horizontally. A rule that depends only on the row's position in the
 * viewport gives every segment on a row the same answer.
 *
 * There is no side placement at all. Horizontal overflow is solved by clamping
 * the card into the viewport while keeping it above or below the row.
 *
 * HYSTERESIS. While inspecting one row, a centre within 60px of the midpoint
 * keeps the previous decision, so a row sitting almost exactly on the centre
 * line cannot rapidly flip. It is scoped to the same row on purpose: one row
 * must never inherit a placement decided for another.
 *
 * SCRUB STABILITY. Horizontal position follows the segment, but only once it
 * has drifted more than a dead zone. Moving between neighbouring phases
 * updates the card's CONTENT while the card itself stays put.
 */
const CARD_W = 320;
const BAND_MARGIN = 18;
const EDGE = 10;
/** How far the segment must move horizontally before the card follows. */
const DEAD_ZONE = 200;
/** Neutral zone around the viewport midpoint where the last choice is kept. */
const FLIP_HYSTERESIS = 60;

export default function PhaseInspector({ anchor }: { anchor: Anchor | null }) {
  const { portalTarget } = useInspection();
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const last = useRef<{ rowId: string; left: number; below: boolean } | null>(null);

  useLayoutEffect(() => {
    if (!anchor) {
      setPos(null);
      last.current = null;
      return;
    }
    const el = cardRef.current;
    if (!el) return;

    const H = el.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { rowRect, segRect } = anchor;

    // --- vertical: viewport half decides, with a neutral zone -------------
    const rowCentreY = rowRect.top + rowRect.height / 2;
    const midY = vh / 2;
    const prev = last.current;

    // Hysteresis applies only while inspecting the SAME row - it exists to
    // absorb small movements of one row around the midpoint (a scroll, say),
    // not to let one row inherit a decision made for another. Moving to a
    // different row always decides afresh from that row's own position.
    const sameRowAsLast = prev != null && prev.rowId === anchor.rowId;
    const below =
      sameRowAsLast && Math.abs(rowCentreY - midY) < FLIP_HYSTERESIS
        ? prev.below
        : rowCentreY < midY;

    // Clamped only to keep the card on screen. The above/below choice above is
    // never revisited, so a tall card can never become a side placement.
    let top = below ? rowRect.bottom + BAND_MARGIN : rowRect.top - BAND_MARGIN - H;
    top = Math.min(Math.max(top, EDGE), Math.max(EDGE, vh - H - EDGE));

    // --- horizontal: follow the segment, clamp to the viewport ------------
    const desired = segRect.left + segRect.width / 2 - CARD_W / 2;
    let left =
      sameRowAsLast && Math.abs(desired - prev.left) < DEAD_ZONE ? prev.left : desired;
    left = Math.min(Math.max(left, EDGE), Math.max(EDGE, vw - CARD_W - EDGE));

    last.current = { rowId: anchor.rowId, left, below };
    setPos({ left, top });
  }, [anchor]);

  if (!anchor) return null;

  const s = anchor.step;
  const tone = STATUS_TONE[s.status];
  const target = portalTarget ?? document.body;

  return createPortal(
    <div
      ref={cardRef}
      className="jpd-pop"
      role="tooltip"
      style={{
        left: pos ? pos.left : 0,
        top: pos ? pos.top : 0,
        // Hidden only for the single layout pass that measures it. The node
        // itself persists across segments, so moving along a row updates the
        // content in place with no close/reopen flicker.
        visibility: pos ? 'visible' : 'hidden',
      }}
    >
      <div className="jpd-pop__kicker">
        {FAMILY_LABEL[s.family]}
        {s.kind === 'milestone' ? ' · Milestone' : ''}
      </div>
      <div className="jpd-pop__title">{s.name}</div>

      <div style={{ marginTop: 7 }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 5,
            background: tone.bg,
            border: `1px solid ${tone.bd}`,
            color: tone.fg,
          }}
        >
          {STATUS_LABEL[s.status]}
        </span>
      </div>

      {/* Ball in court is the loudest thing after the task name, by design. */}
      <div className="jpd-pop__ball">
        <div className="jpd-pop__label">Ball in court</div>
        <div className="jpd-pop__person">{s.commitmentOwnerName}</div>
        <div className="jpd-pop__org">
          {s.commitmentOwnerRole} · {s.responsibleOrganization}
        </div>
      </div>

      <div className="jpd-pop__section">
        <div className="jpd-pop__slabel">
          {s.kind === 'milestone' ? 'Milestone date' : 'Dates'}
        </div>
        <div className="jpd-pop__dates">
          {s.kind === 'milestone'
            ? fmt(s.startDate)
            : `${fmt(s.startDate)} → ${fmt(s.endDate)}`}
        </div>
        {s.kind === 'phase' && (
          <div className="jpd-pop__text" style={{ marginTop: 1 }}>
            {s.durationWorkdays} working days
          </div>
        )}
      </div>

      <div className="jpd-pop__section">
        <div className="jpd-pop__slabel">
          {s.kind === 'milestone' ? 'What must be true' : 'What is owed'}
        </div>
        <div className="jpd-pop__text">{s.whatIsOwed}</div>
      </div>

      {s.nextHandoffLabel && (
        <div className="jpd-pop__section">
          <div className="jpd-pop__slabel">Next handoff</div>
          <div className="jpd-pop__text">
            {s.nextHandoffLabel} · {s.nextHandoffParty}
          </div>
        </div>
      )}

      <div className="jpd-pop__foot">
        <span className="jpd-pop__slabel">Required on-site</span>
        <span className="jpd-pop__ros">{fmt(s.requiredOnSiteDate)}</span>
      </div>
    </div>,
    target,
  );
}

/**
 * Escape layering. The expanded dialog also closes on Escape, so an open
 * popover must consume the first press and let the second reach the modal.
 * Capture phase, because the dialog's own handler is on the document.
 */
export function useEscapeToDismiss(active: boolean, dismiss: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      e.preventDefault();
      dismiss();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [active, dismiss]);
}
