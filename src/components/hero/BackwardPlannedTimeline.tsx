import type { CSSProperties } from 'react';
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

/**
 * Backward-planned timeline — one idea: control is established before
 * construction.
 *
 * NOT CURRENTLY RENDERED. This was the homepage hero visual until 2026-08-26,
 * when the hero was rebuilt as a typographic composition and the page's one
 * substantial diagram was reserved for the methodology section. That was a
 * composition decision about the hero, not a judgement about this graphic:
 * the component is complete, conformant and reusable as it stands, and it
 * remains the site's most construction-literate visual. Do not dismantle it,
 * strip its supporting logic, or treat it as dead code — restoring it anywhere
 * is a one-line mount.
 *
 * A single measured line carries the sequence a project runs through, ending on
 * the date the work is required on site. A marker then walks the line: back from
 * that date to the first commitment, pause, then forward again. The direction
 * heading and the arrow beneath it are driven by the same cycle, so they always
 * agree with which way the marker is travelling.
 */

type Face = {
  label: string;
  /** Wide layout breaks are set here rather than left to the renderer. */
  wideLines?: string[];
};

type Station = Face & {
  /** Position along the line, in SVG user units (wide layout). */
  x: number;
  /** The date everything else is planned back from. */
  terminus?: boolean;
  /**
   * What the milestone becomes once it has been achieved. Only the two
   * endpoints have one: they are the two dates the plan is written against, so
   * they are the two that change from a requirement into an outcome. The five
   * between them are the same work whichever way the line is read.
   */
  resolved?: Face;
};

/* Spacing is uniform at 75 units. The first and last stations sit far enough
   inside the canvas for their labels — the widest on the line — to clear its
   edges when centred. */
const STATIONS: Station[] = [
  {
    label: 'Final Design Commitment',
    wideLines: ['Final Design', 'Commitment'],
    resolved: { label: 'Design Commitment Met', wideLines: ['Design', 'Commitment Met'] },
    x: 66,
  },
  { label: 'Submittal Prep', x: 141 },
  { label: 'Review Cycles', wideLines: ['Review', 'Cycles'], x: 216 },
  { label: 'Approved', x: 291 },
  { label: 'Fabrication', x: 366 },
  { label: 'Shipped', x: 441 },
  {
    label: 'Required On-Site',
    wideLines: ['Required', 'On-Site'],
    resolved: { label: 'On Site On Time', wideLines: ['On Site', 'On Time'] },
    x: 516,
    terminus: true,
  },
];

const LAST = STATIONS.length - 1;

/* Wide layout */
const LINE_Y = 212;
/* The line terminates on the first and last stations rather than running past
   them — the sequence begins and ends on a milestone, not on empty rule. */
const LINE_START = STATIONS[0].x;
const ANCHOR_X = 516;
const LINE_END = ANCHOR_X;
const WIDE_TRACE_LEN = LINE_END - LINE_START;

/* Routed direction indicator, wide layout.
 *
 * It runs the length of the plan and turns down onto the endpoint the current
 * phase is travelling toward, so the direction is read against a real milestone
 * instead of an arrowhead aimed at empty space.
 *
 * The alignment needs no measurement: this SVG and the timeline SVG below both
 * map 600 user units across the same width, so an x here is the same x there.
 * The drop therefore lands exactly on the milestone centre.
 */
const ROUTE_Y = 4; // the horizontal run
const ROUTE_ELBOW = 17; // where the 90° turn bottoms out and the head begins
const ROUTE_HEAD = 7; // arrowhead height — compact, and clearly secondary to the marker below
const ROUTE_HALF = 3.4; // arrowhead half-width
const ROUTE_H = ROUTE_ELBOW + ROUTE_HEAD;
/** Horizontal run plus the downward leg — the length the amber front travels. */
const ROUTE_LEN = WIDE_TRACE_LEN + (ROUTE_ELBOW - ROUTE_Y);

/* Compact layout */
const C_SPINE_X = 10;
const C_TOP = 70;
const C_PITCH = 46;
const C_SPINE_TOP = 50;
const compactY = (i: number) => C_TOP + i * C_PITCH;
const C_SPINE_END = compactY(LAST);
const C_TRACE_LEN = C_SPINE_END - C_SPINE_TOP;

/* The travelling indicator, drawn in its backward orientation and turned into
   its forward one at the endpoint (see `turnRule`). The mirrored second head
   this used to carry is gone: one path rotated 180° reaches exactly the same
   shape, and the turn is now something to watch rather than something to hide.

   Both are symmetrical about their own origin — x and y each run ±half — so the
   bounding-box centre is the arrow's centre, and a single translate both places
   it and gives the rotation its pivot. */
const ARROW_LEFT = 'M10 -1.7 L-1 -1.7 L-1 -5.5 L-10 0 L-1 5.5 L-1 1.7 L10 1.7 Z'; // 20 x 11
const ARROW_UP = 'M-1.7 9 L-1.7 -1 L-5 -1 L0 -9 L5 -1 L1.7 -1 L1.7 9 Z'; // 10 x 18
/* The travelling indicator is the one genuinely active element on the line, so
   it carries Active Amber (Design System §8.1.1) and reads brighter than the
   structure it moves across. */
const ARROW_FILL = 'var(--jp-brand-amber-active)';

/* How far the arrow's centre trails the node it points at. Measured against the
   widest node — the terminus ring — so a single value clears every station:
   node radius + centre-to-tip distance + a small visual gap. */
const ARROW_TIP = 10; // wide layout, centre to tip
const ARROW_TIP_COMPACT = 9;
const ARROW_GAP = 2;
const ARROW_LEAD = 6.5 + ARROW_TIP + ARROW_GAP; // terminus ring r=6.5 → 18.5
const ARROW_LEAD_COMPACT = 6 + ARROW_TIP_COMPACT + ARROW_GAP; // ring r=6 → 17

/* Intro. The copy has landed by ~840ms; the plan lays itself out backward from
   the field date, then an amber trace runs forward through it. */
const CHROME_DELAY = 560;
const ENTRANCE_BASE = 680;
const ENTRANCE_STAGGER = 35;
const TRACE_START = 1300;
const TRACE_DURATION = 750;

/* The walking marker.
 *
 * One shared cycle drives the marker, the labels, the connectors, the direction
 * heading and the arrow — every one of them is a percentage of LOOP_CYCLE_MS
 * with the same delay, so nothing can drift out of step with anything else.
 *
 * The cycle opens midway through the pause at the far right, with the direction
 * already set to backward. That puts the direction change exactly on the cycle
 * seam, so the heading and arrow never have to cross it mid-transition.
 */
const HOLD_MS = 850;
const TRANSIT_MS = 600;
const END_PAUSE_MS = 1400;
const HALF_END_PAUSE_MS = END_PAUSE_MS / 2;
/** Warm-up applied inside the hold, never outside it: a station stays dark
 *  until the marker lands on it, and fades the moment the marker leaves. */
const RAMP_MS = 130;
const DIR_FADE_MS = 180;
const LOOP_START_MS = 2400;

/* The left turnaround — the one moment in the run where the plan stops being
 * worked out and starts being executed.
 *
 * It is a handoff, so it is shown rather than hidden: the marker arrives, the
 * milestone lights, the commitment is recorded, and the arrow turns through
 * 180° in full view before setting off the other way. These three windows are
 * the authoritative phase change; the label swap, the heading, and the routed
 * indicator are all positioned against them rather than timed separately.
 */
const TURN_HOLD_MS = 300; // arrival registers before anything moves
const TURN_ROTATE_MS = 1500; // one deliberate half-turn, in view
const TURN_SETTLE_MS = 200; // facing the new direction before departing
const TURNAROUND_MS = TURN_HOLD_MS + TURN_ROTATE_MS + TURN_SETTLE_MS;

/* The arrow's opacity envelope for the whole run. It arrives once and leaves
   once: there is no mid-run disappearance any more, because the turn it used to
   hide is now the point. Nothing rests on the plan after it resolves — a marker
   sitting on a finished plan implies movement that is no longer happening. */
const ARROW_INTRO_MS = 350;

/* The resolution. The run is finite, so its ending is a real moment rather than
   the seam of a loop: the marker sits on the field date long enough for the
   arrival to register, then leaves slowly. These are deliberately far longer
   than the mid-run turnaround — that one is a pause in a journey, this is the
   end of one — and the cycle is sized around them rather than the reverse. */
const FINAL_HOLD_MS = 1000;
const FINAL_FADE_MS = 1000;

type Stop = { station: number; arrive: number; depart: number };

const SCHEDULE: Stop[] = (() => {
  const stops: Stop[] = [];
  let t = 0;

  // Tail of the far-right pause; the marker arrived at the end of the last cycle.
  stops.push({ station: LAST, arrive: 0, depart: HALF_END_PAUSE_MS });
  t = HALF_END_PAUSE_MS + TRANSIT_MS;

  for (let s = LAST - 1; s >= 0; s--) {
    // The far-left dwell is the turnaround itself, sized by it rather than
    // guessed at: hold, half-turn, settle.
    const dwell = s === 0 ? TURNAROUND_MS : HOLD_MS;
    stops.push({ station: s, arrive: t, depart: t + dwell });
    t += dwell + TRANSIT_MS;
  }

  for (let s = 1; s <= LAST - 1; s++) {
    stops.push({ station: s, arrive: t, depart: t + HOLD_MS });
    t += HOLD_MS + TRANSIT_MS;
  }

  /* Arrives at the field date and stays. The run resolves here rather than
     closing a loop, so this final dwell is exactly the hold plus the exit fade
     — the cycle ends when the marker has finished leaving, not before. */
  stops.push({ station: LAST, arrive: t, depart: t + FINAL_HOLD_MS + FINAL_FADE_MS });
  return stops;
})();

const LOOP_CYCLE_MS = SCHEDULE[SCHEDULE.length - 1].depart;

const FAR_LEFT = SCHEDULE.find((s) => s.station === 0)!;

/** The half-turn: when it starts, and when the arrow is facing the other way. */
const TURN_START_MS = FAR_LEFT.arrive + TURN_HOLD_MS;
const TURN_END_MS = TURN_START_MS + TURN_ROTATE_MS;

/**
 * The heading and the routed indicator change direction across the middle of
 * the turn, so the statement changes as the arrow passes through square. Both
 * are derived from the turn rather than timed alongside it — there is one
 * turnaround window and everything reads from it.
 */
const SWITCH_TO_FORWARD_MS = TURN_START_MS + (TURN_ROTATE_MS - DIR_FADE_MS) / 2;

const pctOf = (ms: number) =>
  +(((((ms % LOOP_CYCLE_MS) + LOOP_CYCLE_MS) % LOOP_CYCLE_MS) / LOOP_CYCLE_MS) * 100).toFixed(3);

/** One label leaves before the other arrives, so the two are never legible at once. */
const LABEL_FADE_MS = 200;

/**
 * The forward pass's departure from the last milestone before the field date.
 * That station is visited twice — once on the way back, once on the way out —
 * so the forward leg is the later of the two.
 */
const FORWARD_RELEASE_MS = (() => {
  const visits = SCHEDULE.filter((s) => s.station === LAST - 1);
  return visits[visits.length - 1].depart;
})();

/**
 * When each endpoint stops being a requirement and becomes an outcome. Both are
 * positions in the one shared cycle, so the wide and compact layouts resolve
 * together and neither can drift from the marker.
 *
 * Left, at the turnaround: the backward pass has just established the date, so
 * the commitment is made. The swap sits inside the far-left dwell while the
 * marker is dark, and finishes before the forward pass launches.
 *
 * Right, the moment the marker leaves the last milestone before the field date:
 * once the material is released, the destination is no longer a date to be met
 * but the outcome being delivered against. The arrow then travels its final leg
 * into a milestone that already reads as achieved, which is the point — the
 * label is a consequence of the release, not a reward for the arrival.
 */
const RESOLVE_AT: Record<number, number> = {
  0: TURN_START_MS,
  [LAST]: FORWARD_RELEASE_MS,
};

/* At rest a station is neutral text; the terminus is the one static amber
   element on the line, because it is the date everything is planned from.
   Lit means the marker is standing on it right now — that is an active state,
   so both lit fills are Active Amber (§8.1.1). The terminus stays
   distinguishable while lit through its ring and larger radius, not colour. */
const REST_FILL = { normal: 'var(--jp-text-secondary)', terminus: 'var(--jp-brand-amber)' };
const LIT_FILL = { normal: 'var(--jp-brand-amber-active)', terminus: 'var(--jp-brand-amber-active)' };

/* Confirmed completion (§8.3.1). Only the executed work carries it: the marker
   stays Active Amber for the whole of its travel, and the planning graphic above
   stays Brand Amber. The plan is not the execution. */
const SUCCESS = 'var(--jp-success)';

/**
 * When each milestone becomes a completed one, read off the shared schedule.
 *
 * A middle station succeeds as the forward marker leaves it — completion is
 * the step being behind you, not merely being stood on. The two endpoints
 * succeed at the moment their label resolves into its achieved face, which is
 * the same event that already changes their wording.
 */
const SUCCEEDS_AT: number[] = STATIONS.map((station, i) => {
  if (station.resolved) return RESOLVE_AT[i] + LABEL_FADE_MS;
  const visits = SCHEDULE.filter((s) => s.station === i);
  return visits[visits.length - 1].depart;
});

/** The far-right dwell is split across the cycle seam, so its two stops merge
 *  into one window that runs past the end of the cycle. */
const windowsFor = (station: number) => {
  const ws = SCHEDULE.filter((s) => s.station === station).map((s) => ({ a: s.arrive, d: s.depart }));
  const opening = ws.find((w) => w.a === 0);
  const closing = ws.find((w) => w.d === LOOP_CYCLE_MS);
  if (opening && closing && opening !== closing) {
    return [
      ...ws.filter((w) => w !== opening && w !== closing),
      { a: closing.a, d: opening.d + LOOP_CYCLE_MS },
    ];
  }
  return ws;
};

const stateRule = (name: string, station: number, off: string, on: string, prop: string) => {
  const windows = windowsFor(station);
  const litAtSeam = windows.some((w) => w.a <= LOOP_CYCLE_MS && LOOP_CYCLE_MS <= w.d);
  const stops = new Map<number, string>();

  stops.set(0, litAtSeam ? on : off);
  stops.set(100, litAtSeam ? on : off);

  for (const w of windows) {
    stops.set(pctOf(w.a), off); // dark until the marker lands
    stops.set(pctOf(w.a + RAMP_MS), on);
    stops.set(pctOf(w.d), on); // still lit as the marker leaves
    stops.set(pctOf(w.d + RAMP_MS), off);
  }

  const frames = [...stops.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([p, v]) => `${p}%{${prop}:${v}}`)
    .join('');

  return `@keyframes ${name}{${frames}}.${name}{animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal forwards}`;
};

/**
 * A middle station's label colour across the whole run:
 *
 *   not yet reached         rest — neutral text, work still ahead
 *   marker standing on it   Active Amber, on both passes
 *   completed behind it     Success Green, and it stays (§8.3.1)
 *
 * The only difference from `stateRule` is what the station settles to once the
 * marker has gone: neutral before its success moment, green after it. Because
 * that moment is the forward departure, it always coincides with a window edge,
 * so the settle is the existing 130ms ramp rather than a new transition.
 */
const stationFillRule = (name: string, station: number, rest: string) => {
  const doneAt = SUCCEEDS_AT[station];
  const settled = (ms: number) => (ms >= doneAt ? SUCCESS : rest);
  const stops = new Map<number, string>();

  stops.set(0, settled(0));
  stops.set(100, SUCCESS);

  for (const w of windowsFor(station)) {
    stops.set(pctOf(w.a), settled(w.a));
    stops.set(pctOf(w.a + RAMP_MS), LIT_FILL.normal);
    stops.set(pctOf(w.d), LIT_FILL.normal);
    stops.set(pctOf(w.d + RAMP_MS), settled(w.d + RAMP_MS));
  }

  const frames = [...stops.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([p, v]) => `${p}%{fill:${v}}`)
    .join('');

  return `@keyframes ${name}{${frames}}.${name}{animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal forwards}`;
};

/**
 * A completed milestone's node, revealed over the existing amber one as the
 * station succeeds and left in place. `both`, so it is transparent from the
 * first painted frame rather than flashing green before the run starts.
 */
const succeedRule = (name: string, atMs: number) =>
  `@keyframes ${name}{0%{opacity:0}${pctOf(atMs)}%{opacity:0}` +
  `${pctOf(atMs + RAMP_MS)}%{opacity:1}100%{opacity:1}}` +
  `.${name}{animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal both}`;

/**
 * The travelling arrow rides a path parallel to the stations rather than over
 * them, so its tip stops just short of each node instead of covering it. The
 * arrow is symmetrical about its own centre with the tip ARROW_TIP units out,
 * so one lead value serves both directions with opposite signs:
 *
 *   lead = node radius + tip offset + a small visual gap
 *
 * Because the offset is constant through every stop, arrival times are
 * untouched — the tip now reaches the node edge at the exact moment the centre
 * used to reach the node itself, which keeps the highlights in step.
 *
 * The sign flips only inside the two endpoint pauses, over the same window as
 * the arrowhead swap, so the arrow crosses to the other side of the turnaround
 * node while it is stationary rather than jumping mid-travel.
 */
const markerRule = (name: string, axis: 'X' | 'Y', positionOf: (i: number) => number, lead: number) => {
  // Anchored where each journey begins: just inside the last station, never past it.
  const origin = positionOf(LAST) - lead;
  const at = (station: number, backward: boolean) =>
    +(positionOf(station) + (backward ? lead : -lead) - origin).toFixed(2);

  // Starting inside the endpoint makes the first leg of each pass shorter than
  // the rest, so hold the launch back by the difference and it runs at the same
  // speed as every other leg. Arrival times are untouched.
  const spacing = Math.abs(positionOf(1) - positionOf(0));
  const launchDelay = Math.round((TRANSIT_MS * 2 * lead) / spacing);
  const farLeftIndex = SCHEDULE.findIndex((s) => s.station === 0);

  const stops = new Map<number, number>();
  stops.set(0, at(LAST, false));
  stops.set(100, at(LAST, false));

  SCHEDULE.forEach((s, k) => {
    const isFarLeft = k === farLeftIndex;
    const isFarRight = s.station === LAST;
    // Endpoints keep the position they arrived at; only the head changes there.
    const backward = isFarRight ? false : isFarLeft || k < farLeftIndex;
    const pos = at(s.station, backward);

    stops.set(pctOf(s.arrive), pos);
    if (s.depart < LOOP_CYCLE_MS) stops.set(pctOf(s.depart), pos);
    if (isFarLeft || (isFarRight && s.arrive === 0)) {
      stops.set(pctOf(s.depart + launchDelay), pos);
    }
  });

  const frames = [...stops.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([p, offset]) => `${p}%{transform:translate${axis}(${offset}px)}`)
    .join('');

  // Linear: the marker travels at a constant speed, with no ease at either end.
  return `@keyframes ${name}{${frames}}.${name}{animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal forwards}`;
};

/**
 * The arrow's opacity across the run — the only place its visibility is
 * decided, and part of the same cycle that drives its travel, so the two can
 * never disagree.
 *
 * It arrives once and leaves once. The mid-run disappearance is gone: the turn
 * it used to conceal is now the thing worth watching, so the arrow stays
 * visible from its entrance until it retires at the field date.
 */
const blinkRule = (name: string) => {
  const farRight = SCHEDULE[SCHEDULE.length - 1];
  const stops = new Map<number, number>();

  // Arrives: hidden, then fades up well before travel begins.
  stops.set(0, 0);
  stops.set(pctOf(ARROW_INTRO_MS), 1);

  /* Holds on the field date, then leaves slowly and stays gone. Nothing swaps
     direction behind it any more, so the exit is free to take as long as it
     needs. The fade lands exactly on the end of the cycle by construction: the
     closing dwell above is the hold plus the fade, so 100% IS the end of the
     fade — no separate stop is needed, and the two cannot drift apart. */
  stops.set(pctOf(farRight.arrive + FINAL_HOLD_MS), 1);
  stops.set(100, 0);

  const frames = [...stops.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([p, o]) => `${p}%{opacity:${o}}`)
    .join('');

  /* `both`, not `forwards`, and this is the whole point: `forwards` fills only
     after the run, leaving the delay period unstyled. The arrow would then sit
     at an SVG group's default opacity of 1 for the entire lead-in and blink out
     the moment the animation started. `backwards` applies the 0% frame from the
     instant the rule matches, so the arrow is hidden on the first painted frame
     and stays hidden until it is meant to arrive. */
  return `@keyframes ${name}{${frames}}.${name}{animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal both}`;
};

/**
 * The visible half-turn at the left endpoint.
 *
 * The arrow is drawn once, pointing backward, and rotated into its forward
 * orientation — the two mirrored heads it used to cross-fade between are exactly
 * 180° apart, so one rotation reaches the same place honestly instead of
 * swapping while hidden.
 *
 * `transform-box: fill-box` with a centred origin is what keeps it turning on
 * the spot: without it the origin resolves against the SVG viewport and the
 * arrow would swing around the diagram. Both arrow paths are drawn symmetrically
 * about their own origin, so the bounding-box centre is the arrow's centre and
 * the tip never sweeps into the milestone beside it.
 *
 * The eased segment is declared inside the keyframes so the turn can be
 * ease-in-out while everything else on the shared cycle stays linear.
 */
const turnRule = (name: string) => {
  const frames =
    `0%{transform:rotate(0deg)}` +
    `${pctOf(TURN_START_MS)}%{transform:rotate(0deg);animation-timing-function:ease-in-out}` +
    `${pctOf(TURN_END_MS)}%{transform:rotate(180deg)}` +
    `100%{transform:rotate(180deg)}`;

  return (
    `@keyframes ${name}{${frames}}` +
    `.${name}{transform-box:fill-box;transform-origin:center;` +
    `animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal both}`
  );
};

/**
 * Heading and routed indicator share these, so they can never disagree
 * about direction.
 *
 * One switch, at the far-left turnaround, and it stands. The run resolves going
 * forward, so the forward state is the resting state — snapping the heading and
 * the route back over a plan that has already finished would say the work is
 * about to start again, which is not what happened.
 */
const directionRule = (name: string, backward: boolean) => {
  const on = backward ? 1 : 0;
  const off = backward ? 0 : 1;
  const switchOut = pctOf(SWITCH_TO_FORWARD_MS);
  const switchOutDone = pctOf(SWITCH_TO_FORWARD_MS + DIR_FADE_MS);

  const frames =
    `0%{opacity:${on}}${switchOut}%{opacity:${on}}` +
    `${switchOutDone}%{opacity:${off}}100%{opacity:${off}}`;

  return `@keyframes ${name}{${frames}}.${name}{animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal forwards}`;
};

/**
 * An endpoint label that changes meaning partway through the run.
 *
 * Both texts sit in the same place. The outgoing one fades away completely
 * before the incoming one begins, rather than cross-dissolving through a
 * half-legible blur of the two — a milestone changing from a requirement to an
 * outcome should read as a statement being replaced, not blended.
 *
 * `both`, not `forwards`: the incoming label must be transparent from the first
 * painted frame, or both texts would be stacked and readable through the
 * lead-in before the animation starts.
 */
const phaseRule = (name: string, atMs: number, phase: 'before' | 'after') => {
  const gone = pctOf(atMs + LABEL_FADE_MS);
  const frames =
    phase === 'before'
      ? `0%{opacity:1}${pctOf(atMs)}%{opacity:1}${gone}%{opacity:0}100%{opacity:0}`
      : `0%{opacity:0}${gone}%{opacity:0}${pctOf(atMs + 2 * LABEL_FADE_MS)}%{opacity:1}100%{opacity:1}`;

  return `@keyframes ${name}{${frames}}.${name}{animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal both}`;
};

/** A label a station shows: the primary face, plus the outcome for endpoints. */
type Panel = { face: Face; phase: string; resolved: boolean };

const facesOf = (station: Station, i: number): Panel[] =>
  station.resolved
    ? [
        { face: station, phase: `bpt-phase-before bpt-phase-before-${i}`, resolved: false },
        { face: station.resolved, phase: `bpt-phase-after bpt-phase-after-${i}`, resolved: true },
      ]
    : [{ face: station, phase: '', resolved: false }];

/**
 * A resolved terminus is a finished milestone with nothing standing on it, so
 * it holds Brand Amber rather than joining the lit-state animation. Active
 * Amber marks only what the marker is currently occupying (§8.1.1), and by the
 * time this label appears the marker is leaving for good.
 *
 * The resolved left endpoint keeps its lit state: the marker is still standing
 * on it when that label arrives, and leaves shortly after.
 */
const labelClass = (station: Station, i: number, resolved: boolean) => {
  /* An achieved face is a completed milestone, so it is Success Green outright
     and carries no lit-state animation: it appears green and stays green. That
     static value is also what reduced motion shows, where the fill animations
     are off entirely. */
  if (resolved) return 'font-sans bpt-label fill-jp-success';

  const tone = station.terminus ? 'fill-jp-brand-amber' : 'fill-jp-text-secondary';
  return `font-sans bpt-label ${tone} bpt-label-${i}`;
};

/* ---------------------------------------------------------------------------
   Phase progress — the amber on the upper indicator.

   The amber is not decoration and not a duration: it marks how much of the
   current phase the marker has actually travelled. Every value below is read
   off the same arrivals and departures that place the marker, so the amber
   front advances only while the marker advances, holds still while it dwells at
   a milestone, and cannot drift out of step with it. There is no second timer
   and no guessed duration anywhere in this section.

   It is Brand Amber, never Active Amber: the marker is the thing happening now,
   and this is the ground it has already covered (§8.1.1).
   --------------------------------------------------------------------------- */

const STATION_PITCH = STATIONS[1].x - STATIONS[0].x;

/* The same compensation `markerRule` applies. The marker begins one lead inside
   the endpoint, so its launch is held back to keep every leg the same speed —
   the amber front has to wait with it, or it would set off while the marker is
   still standing still. */
const LAUNCH_HOLD_MS = Math.round((TRANSIT_MS * 2 * ARROW_LEAD) / STATION_PITCH);

/**
 * Fraction of the named phase completed, at every stop on the shared schedule.
 *
 * Outside its own phase a front is parked at the value it should hold: the
 * backward front stays complete once the turnaround has passed, the forward
 * front stays at zero until the turnaround reaches it. That is what stops the
 * finished backward progress bleeding into the forward phase.
 */
const progressStops = (backward: boolean) => {
  const pivot = SCHEDULE.findIndex((s) => s.station === 0);
  const stops = new Map<number, number>();

  SCHEDULE.forEach((s, k) => {
    const inPhase = backward ? k <= pivot : k >= pivot;
    const along = s.station / LAST;
    const p = inPhase ? (backward ? 1 - along : along) : backward ? 1 : 0;

    stops.set(pctOf(s.arrive), p);
    if (s.depart < LOOP_CYCLE_MS) stops.set(pctOf(s.depart), p);
    // An endpoint dwell ending is not the same moment as the marker leaving.
    if (k === pivot || (s.station === LAST && s.arrive === 0)) {
      stops.set(pctOf(s.depart + LAUNCH_HOLD_MS), p);
    }
  });

  stops.set(100, 1);
  return [...stops.entries()].sort((a, b) => a[0] - b[0]);
};

const progressRule = (name: string, frame: (p: number) => string, backward: boolean, seed = '') => {
  const frames = progressStops(backward)
    .map(([pct, p]) => `${pct}%{${frame(p)}}`)
    .join('');
  return (
    `@keyframes ${name}{${frames}}` +
    `.${name}{${seed}animation:${name} ${LOOP_CYCLE_MS}ms linear var(--bpt-loop-delay,0ms) 1 normal both}`
  );
};

/** The amber route is revealed along its own geometry, elbow included. */
const routeFill = (p: number) => `stroke-dashoffset:${+((1 - p) * ROUTE_LEN).toFixed(2)}`;

/** The head belongs to the end of the route, so it arrives on the last leg. */
const headFill = (p: number) => `opacity:${p >= 1 ? 1 : 0}`;

/**
 * The sentence is uncovered from the edge the marker is travelling away from,
 * so the amber front moves through the words in the same direction as the
 * marker moves along the line beneath them.
 */
const textFill = (backward: boolean) => (p: number) => {
  const hidden = +((1 - p) * 100).toFixed(2);
  return `clip-path:inset(0 ${backward ? 0 : hidden}% 0 ${backward ? hidden : 0}%)`;
};

const LOOP_CSS = (() => {
  const rules: string[] = [];

  STATIONS.forEach((station, i) => {
    const rest = station.terminus ? REST_FILL.terminus : REST_FILL.normal;
    const lit = station.terminus ? LIT_FILL.terminus : LIT_FILL.normal;
    rules.push(stateRule(`bpt-active-${i}`, i, '0', '1', 'opacity'));
    // Every milestone gets a completed node, revealed as it succeeds.
    rules.push(succeedRule(`bpt-done-${i}`, SUCCEEDS_AT[i]));

    if (station.resolved) {
      // The endpoints' planning faces keep the original neutral/amber story:
      // they are hidden once their label resolves, so they never need to settle
      // green — the achieved face that replaces them is green outright.
      rules.push(stateRule(`bpt-label-${i}`, i, rest, lit, 'fill'));
      rules.push(phaseRule(`bpt-phase-before-${i}`, RESOLVE_AT[i], 'before'));
      rules.push(phaseRule(`bpt-phase-after-${i}`, RESOLVE_AT[i], 'after'));
    } else {
      rules.push(stationFillRule(`bpt-label-${i}`, i, rest));
    }
  });

  rules.push(markerRule('bpt-marker-wide', 'X', (i) => STATIONS[i].x, ARROW_LEAD));
  rules.push(markerRule('bpt-marker-compact', 'Y', compactY, ARROW_LEAD_COMPACT));
  rules.push(blinkRule('bpt-marker-blink'));
  rules.push(turnRule('bpt-marker-turn'));
  rules.push(directionRule('bpt-dir-backward', true));
  rules.push(directionRule('bpt-dir-forward', false));

  // One progress definition, three things read from it: the route, its head,
  // and the sentence above them — per phase, for both layouts.
  ([true, false] as const).forEach((backward) => {
    const dir = backward ? 'backward' : 'forward';
    rules.push(progressRule(`bpt-route-${dir}`, routeFill, backward, `stroke-dasharray:${ROUTE_LEN};`));
    rules.push(progressRule(`bpt-head-${dir}`, headFill, backward));
    rules.push(progressRule(`bpt-fill-${dir}`, textFill(backward), backward));
  });

  /* The success trail on the lower line: the same forward progress that drives
     the upper indicator, applied to a green overlay of the timeline itself. One
     definition, so the completed path can never disagree with the marker that
     completed it. Backward progress is not used here — nothing is executed on
     the planning pass. */
  ([
    ['bpt-trail-wide', WIDE_TRACE_LEN],
    ['bpt-trail-compact', C_TRACE_LEN],
  ] as const).forEach(([name, len]) => {
    rules.push(
      progressRule(
        name,
        (p) => `stroke-dashoffset:${+((1 - p) * len).toFixed(2)}`,
        false,
        `stroke-dasharray:${len};`,
      ),
    );
  });

  // Emitted last so it wins over the per-station rules at equal specificity.
  //
  // These are the resting values every animated element holds before its
  // animation applies. `.bpt-marker-blink` is hidden here as well as by the
  // animation's own backwards fill: visibility must not depend on an animation
  // resolving, so the element is never visible for even one frame.
  //
  // Reduced motion presents the run's resolved final state rather than its
  // opening frame (§46.5): the plan has been worked backward and executed
  // forward, so the heading and route rest forward, both endpoints show their
  // achieved labels, and the marker is gone because nothing is travelling any
  // more. Every value the animation would have produced is stated here, so the
  // same information is available without any of the motion.
  return (
    `${rules.join('')}` +
    `.bpt-active{opacity:0}.bpt-dir-backward{opacity:1}.bpt-dir-forward{opacity:0}` +
    `.bpt-marker-blink{opacity:0}.bpt-phase-before{opacity:1}.bpt-phase-after{opacity:0}` +
    `.bpt-route-backward,.bpt-route-forward{stroke-dashoffset:${ROUTE_LEN}}` +
    `.bpt-trail-wide{stroke-dashoffset:${WIDE_TRACE_LEN}}` +
    `.bpt-trail-compact{stroke-dashoffset:${C_TRACE_LEN}}` +
    `.bpt-done{opacity:0}` +
    `.bpt-head-backward,.bpt-head-forward{opacity:0}` +
    `.bpt-fill-backward{clip-path:inset(0 0 0 100%)}` +
    `.bpt-fill-forward{clip-path:inset(0 100% 0 0)}` +
    `@media (prefers-reduced-motion:reduce){` +
    `.bpt-label,.bpt-active,.bpt-dir-backward,.bpt-dir-forward,.bpt-marker,` +
    `.bpt-marker-blink,.bpt-marker-turn,.bpt-phase-before,.bpt-phase-after,` +
    `.bpt-route-backward,.bpt-route-forward,.bpt-head-backward,.bpt-head-forward,` +
    `.bpt-fill-backward,.bpt-fill-forward,.bpt-done,` +
    `.bpt-trail-wide,.bpt-trail-compact{animation:none}` +
    `.bpt-dir-backward{opacity:0}.bpt-dir-forward{opacity:1}` +
    `.bpt-phase-before{opacity:0}.bpt-phase-after{opacity:1}` +
    // The resolved state is the plan executed: the planning graphic fully
    // amber, and every milestone and the whole lower line completed in green.
    `.bpt-route-backward,.bpt-route-forward{stroke-dashoffset:0}` +
    `.bpt-head-backward,.bpt-head-forward{opacity:1}` +
    `.bpt-fill-backward,.bpt-fill-forward{clip-path:none}` +
    `.bpt-done{opacity:1}` +
    `.bpt-trail-wide,.bpt-trail-compact{stroke-dashoffset:0}` +
    // With the fill animations off, every label still visible is a completed
    // one — the planning faces are hidden above — so they read as completed
    // rather than falling back to the neutral they started from.
    `.bpt-label{fill:${SUCCESS}}}`
  );
})();

const entranceDelay = (i: number) => ENTRANCE_BASE + (LAST - i) * ENTRANCE_STAGGER;
/** Each station lights exactly as the trace passes it. */
const lightDelay = (fraction: number) => Math.round(TRACE_START + fraction * TRACE_DURATION);

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties;

const traceStyle = (len: number) =>
  ({
    '--hero-delay': `${TRACE_START}ms`,
    '--trace-len': `${len}`,
    '--trace-duration': `${TRACE_DURATION}ms`,
  }) as CSSProperties;

const HEADING_BACKWARD = 'Plan backward from when the field needs it.';
const HEADING_FORWARD = 'Manage forward to make sure it gets there.';

/** Straight segments only: two `L` commands give a clean mitred right angle. */
const routeTo = (from: number, to: number) =>
  `M${from} ${ROUTE_Y} L${to} ${ROUTE_Y} L${to} ${ROUTE_ELBOW}`;

const routeHead = (x: number) =>
  `M${x - ROUTE_HALF} ${ROUTE_ELBOW} L${x + ROUTE_HALF} ${ROUTE_ELBOW} L${x} ${ROUTE_ELBOW + ROUTE_HEAD} Z`;

const DESCRIPTION =
  'JiTpro works backward from the required on-site date to determine the required date ' +
  'for every commitment, then follows those commitments forward to protect field execution.';

/* Neutral structure — the rule, the leader lines, and the unreached nodes.
   `--jp-border` is the approved token for connectors and hairlines (§8.8); its
   opacity varies by role, which is why every use below sets it explicitly. */
const HAIRLINE = 'var(--jp-border)';
/* The trace and the nodes it has reached persist once the run resolves, so they
   are timeline structure rather than an active state: Brand Amber (§48.3). */
const AMBER = 'var(--jp-brand-amber)';

/* The travelling indicator. Drawn around its own origin so a single translate
   places it, and provided as a mirrored pair rather than a rotation — swapping
   the two lets it reuse the direction classes that already drive the heading,
   which is what guarantees it can never point against its travel. */

type Props = {
  /** False on repeat visits within the session — render the resolved state. */
  animate: boolean;
};

export default function BackwardPlannedTimeline({ animate }: Props) {
  /* The sequence runs once and holds its final frame. Replay bumps this key,
     which remounts the visual — the simplest way to restart a tree of CSS
     animations from the top, intro included, with nothing left to reset. */
  const [runId, setRunId] = useState(0);
  const playing = animate || runId > 0;

  const anim = (name: string, ms: number) =>
    playing ? { className: name, style: delay(ms) } : { className: '', style: undefined };

  const trace = (len: number) =>
    playing ? { className: 'hero-trace', style: traceStyle(len) } : { className: '', style: undefined };

  const chrome = anim('hero-fade-in', CHROME_DELAY);
  const headingClass =
    'col-start-1 row-start-1 font-mono text-[0.6875rem] leading-relaxed tracking-[0.1em] text-jp-text-muted sm:text-xs';

  return (
    <div className="relative">
      <style>{LOOP_CSS}</style>

      {/* The animation itself carries one stable description; the heading that
          swaps with direction is decorative and hidden from assistive tech. */}
      <div
        key={runId}
        className="relative"
        role="img"
        aria-label={DESCRIPTION}
        style={{ '--bpt-loop-delay': `${playing ? LOOP_START_MS : 0}ms` } as CSSProperties}
      >
        {/* Warm depth carrying the section's key light — no panel, no border. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 -inset-y-14 bg-[radial-gradient(52%_50%_at_58%_50%,color-mix(in_oklab,var(--jp-brand-amber)_10%,transparent),transparent_72%)]"
        />

        {/* Direction of planning — centred on the whole timeline, never on one
            column of it. */}
        <div
          aria-hidden="true"
          className={`relative mb-4 sm:mb-5 ${chrome.className}`}
          style={chrome.style}
        >
          {/* Each sentence is two identical layers: the muted one in flow sets
              the box, and an amber copy pinned over it is uncovered as the
              phase progresses. Identical text, identical box, so nothing moves,
              rewraps, or changes width as the amber passes through. */}
          <div className="grid justify-items-center text-center">
            {(
              [
                ['backward', HEADING_BACKWARD],
                ['forward', HEADING_FORWARD],
              ] as const
            ).map(([dir, text]) => (
              <p key={dir} className={`bpt-dir-${dir} relative ${headingClass}`}>
                {text}
                <span className={`absolute inset-0 text-jp-brand-amber bpt-fill-${dir}`}>
                  {text}
                </span>
              </p>
            ))}
          </div>
          {/* Wide layout only. On the compact layout the plan runs vertically,
              so only Design Complete sits below this indicator — a route to
              Required On-Site could not reach its endpoint, and a pointer that
              cannot reach what it names is decoration (§46.1). There the
              heading above and the marker's own up/down travel carry the
              direction instead. */}
          <svg
            viewBox={`0 0 600 ${ROUTE_H}`}
            className="mt-3 hidden h-auto w-full sm:block"
            focusable="false"
          >
            {/* Both states use the same direction classes as the heading and
                the travelling marker, so the route cannot disagree with the
                timeline about which way the plan is running (§46.3). */}
            {/* Each route is drawn twice over identical geometry: the muted one
                is the whole journey, the amber one is the part already made.
                The amber is revealed by its own dash offset, so it follows the
                elbow rather than sliding across as a bar. */}
            {(
              [
                ['backward', ANCHOR_X, LINE_START],
                ['forward', LINE_START, ANCHOR_X],
              ] as const
            ).map(([dir, from, to]) => (
              <g key={dir} className={`bpt-dir-${dir}`}>
                <path
                  d={routeTo(from, to)}
                  fill="none"
                  stroke={HAIRLINE}
                  strokeOpacity="0.26"
                  strokeWidth="1"
                />
                <path d={routeHead(to)} fill={HAIRLINE} fillOpacity="0.45" />
                <path
                  className={`bpt-route-${dir}`}
                  d={routeTo(from, to)}
                  fill="none"
                  stroke={AMBER}
                  strokeWidth="1"
                />
                <path className={`bpt-head-${dir}`} d={routeHead(to)} fill={AMBER} />
              </g>
            ))}
          </svg>
        </div>

        {/* Wide annotated line — sm and up */}
        <svg
          viewBox="0 126 600 188"
          className="relative hidden h-auto w-full sm:block"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Certainty accumulates toward the field date. userSpaceOnUse is
                required: a straight line has a zero-height bounding box, and an
                objectBoundingBox gradient on one is not rendered at all. */}
            <linearGradient
              id="bpt-line"
              gradientUnits="userSpaceOnUse"
              x1={LINE_START}
              y1="0"
              x2={LINE_END}
              y2="0"
            >
              <stop offset="0%" stopColor={HAIRLINE} stopOpacity="0.22" />
              <stop offset="55%" stopColor={HAIRLINE} stopOpacity="0.45" />
              <stop offset="100%" stopColor={HAIRLINE} stopOpacity="0.75" />
            </linearGradient>
            {/* Illuminated, not neon: one soft amber shadow, no bloom or rings. */}
            <filter id="bpt-glow-w" x="-100%" y="-300%" width="300%" height="700%">
              {/* flood-color is set through `style` rather than the presentation
                  attribute: attribute-level var() support on filter primitives is
                  thinner than it is for fill/stroke, and a failure here renders
                  black. Inline style is unambiguously CSS, so var() always resolves. */}
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2"
                style={{ floodColor: 'var(--jp-brand-amber)' }}
                floodOpacity="0.7"
              />
            </filter>
          </defs>

          <g {...anim('hero-fade-in', ENTRANCE_BASE)}>
            <line
              x1={LINE_START}
              y1={LINE_Y}
              x2={LINE_END}
              y2={LINE_Y}
              stroke="url(#bpt-line)"
              strokeWidth="1"
            />
          </g>
          <line
            x1={LINE_START}
            y1={LINE_Y}
            x2={LINE_END}
            y2={LINE_Y}
            stroke={AMBER}
            strokeOpacity="0.8"
            strokeWidth="1.25"
            {...trace(WIDE_TRACE_LEN)}
          />
          {/* The success trail: the executed length of the plan, accumulating
              behind the marker and never receding. */}
          <line
            className="bpt-trail-wide"
            x1={LINE_START}
            y1={LINE_Y}
            x2={LINE_END}
            y2={LINE_Y}
            stroke={SUCCESS}
            strokeWidth="1.5"
          />

          {STATIONS.map((station, i) => {
            const above = i % 2 === 0;
            const faces = facesOf(station, i);
            const entrance = anim('hero-plan-in', entranceDelay(i));
            const light = anim('hero-light', lightDelay((station.x - LINE_START) / WIDE_TRACE_LEN));
            // A wrapped label above the line starts higher so its last line
            // still clears the leader. Taken from the tallest face so both
            // share one baseline and the swap cannot shift the text.
            const maxLines = Math.max(...faces.map((p) => (p.face.wideLines ?? [p.face.label]).length));
            const labelY = above ? LINE_Y - 36 - (maxLines - 1) * 19 : LINE_Y + 50;

            return (
              <g key={station.label}>
                <g {...entrance}>
                  {/* Leader line out to the label */}
                  <line
                    x1={station.x}
                    y1={above ? LINE_Y - 8 : LINE_Y + 8}
                    x2={station.x}
                    y2={above ? LINE_Y - 26 : LINE_Y + 26}
                    stroke={HAIRLINE}
                    strokeOpacity="0.38"
                    strokeWidth="1"
                  />
                  {/* The phase opacity and the lit-state fill are two separate
                      animations, so they must live on two separate elements.
                      `animation` is a shorthand: two class rules carrying it on
                      one element do not merge, the later simply replaces the
                      earlier and the other effect silently disappears. */}
                  {faces.map(({ face, phase, resolved }) => (
                    <g key={face.label} className={phase}>
                      <text
                        x={station.x}
                        textAnchor="middle"
                        className={labelClass(station, i, resolved)}
                        fontSize="15"
                        fontWeight="500"
                      >
                        {(face.wideLines ?? [face.label]).map((line, li) => (
                          <tspan key={line} x={station.x} y={labelY + li * 19}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  ))}

                  {/* Unreached state */}
                  {station.terminus && (
                    <circle cx={station.x} cy={LINE_Y} r="6.5" fill="none" stroke={HAIRLINE} strokeOpacity="0.3" />
                  )}
                  <circle
                    cx={station.x}
                    cy={LINE_Y}
                    r={station.terminus ? 3 : 2.5}
                    fill={HAIRLINE}
                    fillOpacity="0.75"
                  />
                </g>

                {/* Reached — lights as the trace arrives */}
                <g {...light}>
                  {station.terminus && (
                    <circle cx={station.x} cy={LINE_Y} r="6.5" fill="none" stroke={AMBER} strokeOpacity="0.4" />
                  )}
                  <circle cx={station.x} cy={LINE_Y} r={station.terminus ? 3.5 : 3} fill={AMBER} />
                </g>

                {/* Completed — over the reached state, and it stays. */}
                <g className={`bpt-done bpt-done-${i}`}>
                  {station.terminus && (
                    <circle cx={station.x} cy={LINE_Y} r="6.5" fill="none" stroke={SUCCESS} strokeOpacity="0.55" />
                  )}
                  <circle cx={station.x} cy={LINE_Y} r={station.terminus ? 3.5 : 3} fill={SUCCESS} />
                </g>

                {/* Lit while the marker is here — draws the eye from the line out
                    to the label, which may be on either side of it. */}
                <g className={`bpt-active bpt-active-${i}`}>
                  <line
                    x1={station.x}
                    y1={above ? LINE_Y - 7 : LINE_Y + 7}
                    x2={station.x}
                    y2={above ? LINE_Y - 28 : LINE_Y + 28}
                    stroke="var(--jp-brand-amber-active)"
                    strokeWidth="1.25"
                  />
                </g>
              </g>
            );
          })}

          {/* The marker walking the line, drawn last so it passes over the
              stations. Its entrance is part of the blink rule rather than a
              separate fade — one declaration owns its opacity end to end. */}
          <g className="bpt-marker bpt-marker-wide">
            <g
              className="bpt-marker-blink"
              transform={`translate(${STATIONS[LAST].x - ARROW_LEAD} ${LINE_Y})`}
            >
              {/* One head, turned rather than swapped — see `turnRule`. */}
              <g className="bpt-marker-turn">
                <path d={ARROW_LEFT} fill={ARROW_FILL} filter="url(#bpt-glow-w)" />
              </g>
            </g>
          </g>
        </svg>

        {/* Vertical variant — below sm */}
        <svg
          viewBox="0 30 340 352"
          className="relative block h-auto w-full sm:hidden"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id="bpt-line-v"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1={C_SPINE_TOP}
              x2="0"
              y2={C_SPINE_END}
            >
              <stop offset="0%" stopColor={HAIRLINE} stopOpacity="0.22" />
              <stop offset="55%" stopColor={HAIRLINE} stopOpacity="0.45" />
              <stop offset="100%" stopColor={HAIRLINE} stopOpacity="0.75" />
            </linearGradient>
            <filter id="bpt-glow-c" x="-300%" y="-100%" width="700%" height="300%">
              {/* flood-color is set through `style` rather than the presentation
                  attribute: attribute-level var() support on filter primitives is
                  thinner than it is for fill/stroke, and a failure here renders
                  black. Inline style is unambiguously CSS, so var() always resolves. */}
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2"
                style={{ floodColor: 'var(--jp-brand-amber)' }}
                floodOpacity="0.7"
              />
            </filter>
          </defs>

          <g {...anim('hero-fade-in', ENTRANCE_BASE)}>
            <line
              x1={C_SPINE_X}
              y1={C_SPINE_TOP}
              x2={C_SPINE_X}
              y2={C_SPINE_END}
              stroke="url(#bpt-line-v)"
              strokeWidth="1"
            />
          </g>
          <line
            x1={C_SPINE_X}
            y1={C_SPINE_TOP}
            x2={C_SPINE_X}
            y2={C_SPINE_END}
            stroke={AMBER}
            strokeOpacity="0.8"
            strokeWidth="1.25"
            {...trace(C_TRACE_LEN)}
          />
          {/* Same success trail, same shared progress — only the axis differs. */}
          <line
            className="bpt-trail-compact"
            x1={C_SPINE_X}
            y1={C_SPINE_TOP}
            x2={C_SPINE_X}
            y2={C_SPINE_END}
            stroke={SUCCESS}
            strokeWidth="1.5"
          />

          {STATIONS.map((station, i) => {
            const y = compactY(i);
            const entrance = anim('hero-plan-in', entranceDelay(i));
            const light = anim('hero-light', lightDelay((y - C_SPINE_TOP) / C_TRACE_LEN));

            return (
              <g key={station.label}>
                <g {...entrance}>
                  {/* Same faces, same shared schedule — the compact layout has
                      no timing of its own, only its own geometry. */}
                  {facesOf(station, i).map(({ face, phase, resolved }) => (
                    <g key={face.label} className={phase}>
                      <text
                        x="30"
                        y={y}
                        dominantBaseline="middle"
                        className={labelClass(station, i, resolved)}
                        fontSize="14.5"
                        fontWeight="500"
                      >
                        {face.label}
                      </text>
                    </g>
                  ))}
                  {station.terminus && (
                    <circle cx={C_SPINE_X} cy={y} r="6" fill="none" stroke={HAIRLINE} strokeOpacity="0.3" />
                  )}
                  <circle
                    cx={C_SPINE_X}
                    cy={y}
                    r={station.terminus ? 3 : 2.5}
                    fill={HAIRLINE}
                    fillOpacity="0.75"
                  />
                </g>

                <g {...light}>
                  {station.terminus && (
                    <circle cx={C_SPINE_X} cy={y} r="6" fill="none" stroke={AMBER} strokeOpacity="0.4" />
                  )}
                  <circle cx={C_SPINE_X} cy={y} r={station.terminus ? 3.5 : 3} fill={AMBER} />
                </g>

                <g className={`bpt-done bpt-done-${i}`}>
                  {station.terminus && (
                    <circle cx={C_SPINE_X} cy={y} r="6" fill="none" stroke={SUCCESS} strokeOpacity="0.55" />
                  )}
                  <circle cx={C_SPINE_X} cy={y} r={station.terminus ? 3.5 : 3} fill={SUCCESS} />
                </g>

                <g className={`bpt-active bpt-active-${i}`}>
                  <line x1="18" y1={y} x2="25" y2={y} stroke="var(--jp-brand-amber-active)" strokeWidth="1.25" />
                </g>
              </g>
            );
          })}

          {/* The marker walking the spine, drawn last so it passes over the
              stations. Backward is upward here, so the pair points up/down. */}
          <g className="bpt-marker bpt-marker-compact">
            <g
              className="bpt-marker-blink"
              transform={`translate(${C_SPINE_X} ${compactY(LAST) - ARROW_LEAD_COMPACT})`}
            >
              {/* Same rule, same turn — up becomes down through the same 180°. */}
              <g className="bpt-marker-turn">
                <path d={ARROW_UP} fill={ARROW_FILL} filter="url(#bpt-glow-c)" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* The method sentence that used to sit here was removed 2026-08-25. The
          homepage stated backward planning three times before the methodology
          section arrived — here, in the section below, and in the method itself.
          The hero's job is to show that the sequence exists and is long; naming
          the method is the methodology section's job. DESCRIPTION still carries
          it for assistive technology, where there is no redundancy. */}

      {/* Deliberately quiet — the hero has one call to action and this must not
          read as a second one. Hidden under reduced motion, where there is no
          animation to replay. */}
      <div className="relative mt-1 flex justify-center motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          aria-label="Replay the timeline animation"
          className="inline-flex items-center gap-1.5 rounded px-3 py-3.5 font-mono text-[0.6875rem] tracking-[0.1em] text-jp-text-muted transition-colors duration-200 hover:text-jp-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jp-text-primary motion-reduce:transition-none"
        >
          <RotateCcw size={13} aria-hidden="true" className="shrink-0" />
          Replay
        </button>
      </div>
    </div>
  );
}
