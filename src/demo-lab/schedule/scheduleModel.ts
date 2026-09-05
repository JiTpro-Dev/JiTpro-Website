/**
 * PROCUREMENT SCHEDULE - data model, participants, phase families and the
 * working-day engine. PROTOTYPE ONLY.
 *
 * Everything the schedule renders is derived from this file. Geometry, labels,
 * dates, durations, accountability and inspection content all read the same
 * record, so a fixture change moves the bar and rewrites the popover together.
 * Nothing about a phase is authored twice.
 */

import { PEOPLE, ORGANIZATIONS } from '../../components/demo/fixtures/project';

/* ------------------------------------------------------------ participants */

/**
 * Additional representative participants. The approved production people and
 * organizations are reused as-is; these extend them for the trades, designers,
 * suppliers and the agency that a procurement schedule needs.
 *
 * Names are deliberately plain. Constructed for demonstration; no real firm or
 * person is depicted.
 */
export const SCHEDULE_PEOPLE = {
  ...PEOPLE,
  MO: { initials: 'MO', name: 'Miguel Ortiz', role: 'Superintendent' },
  NR: { initials: 'NR', name: 'Nathan Reyes', role: 'Electrical Engineer' },
  CF: { initials: 'CF', name: 'Claire Fielding', role: 'Lighting Designer' },
  RM: { initials: 'RM', name: 'Rachel Marston', role: 'Interior Designer' },
  PN: { initials: 'PN', name: 'Peter Novak', role: 'Project Coordinator' },
  TW: { initials: 'TW', name: 'Tom Whitfield', role: 'Detailing Manager' },
  ED: { initials: 'ED', name: 'Erin Doyle', role: 'Account Manager' },
  VS: { initials: 'VS', name: 'Victor Salas', role: 'Applications Engineer' },
  MR: { initials: 'MR', name: 'Marco Ruiz', role: 'Fabrication Manager' },
  DE: { initials: 'DE', name: 'Dana Ellis', role: 'Sales Manager' },
  NA: { initials: 'NA', name: 'Nils Andersen', role: 'Shop Manager' },
  GK: { initials: 'GK', name: 'Grace Kim', role: 'Specification Consultant' },
  RP: { initials: 'RP', name: 'Ruth Palmer', role: 'Order Manager' },
  CB: { initials: 'CB', name: 'Carl Bishop', role: 'Dispatch Manager' },
  RH: { initials: 'RH', name: 'Robert Hale', role: 'Estimator' },
} as const;

export type SchedulePersonKey = keyof typeof SCHEDULE_PEOPLE;

export const SCHEDULE_ORGS = {
  ...ORGANIZATIONS,
  electrical: 'Calder Power Engineering',
  lighting: 'Fielding Lighting Design',
  interiors: 'Marston Interior Design',
  heritage: 'Heritage Steel Window & Door',
  steel: 'Granite Ridge Steel Fabricators',
  lumber: 'Cascade Building Supply',
  switchgear: 'Northgate Electrical Systems',
  stone: 'Cordova Stone Works',
  tile: 'Meridian Tile Supply',
  casework: 'Harlow Cabinetmakers',
  plumbing: 'Waterline Fixture Group',
  doors: 'Ashgrove Door Company',
  logistics: 'Summit Freight Services',
} as const;

export type ScheduleOrgKey = keyof typeof SCHEDULE_ORGS;

/* ---------------------------------------------------------- phase families */

/**
 * Nine families. The family is a VISUAL classification - it decides colour,
 * legend entry and marker shape. It is NOT a status and NOT the task's
 * identity: "Architect Review 2" and "Agency Review 1" are both REVIEW, and
 * inspection is where the exact task is read.
 */
export type PhaseFamily =
  | 'buyout'
  | 'coordination'
  | 'preparation'
  | 'review'
  | 'revision'
  | 'approval'
  | 'production'
  | 'logistics'
  | 'required';

export const PHASE_FAMILIES: { key: PhaseFamily; label: string }[] = [
  { key: 'buyout', label: 'Buyout' },
  { key: 'coordination', label: 'Coordination' },
  { key: 'preparation', label: 'Preparation' },
  { key: 'review', label: 'Review' },
  { key: 'revision', label: 'Revision' },
  { key: 'approval', label: 'Approval' },
  { key: 'production', label: 'Production' },
  { key: 'logistics', label: 'Logistics' },
  { key: 'required', label: 'Required On-Site' },
];

/**
 * Status is ORTHOGONAL to family (governing instruction Section 60). A REVIEW
 * phase is red-family whether it is complete or at risk; how it is performing
 * is carried by the status badge, never by the bar's hue.
 */
export type PhaseStatus = 'complete' | 'on-track' | 'at-risk' | 'upcoming';

export const STATUS_LABEL: Record<PhaseStatus, string> = {
  complete: 'Complete',
  'on-track': 'On Track',
  'at-risk': 'At Risk',
  upcoming: 'Upcoming',
};

/* ------------------------------------------------------ working-day engine */

const MS = 86400000;

export function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}
export function parse(s: string): Date {
  return new Date(s + 'T00:00:00Z');
}
function isWorkday(d: Date): boolean {
  const g = d.getUTCDay();
  return g !== 0 && g !== 6;
}
/** Previous working day strictly before `d`. */
export function prevWorkday(d: Date): Date {
  const r = new Date(d.getTime() - MS);
  while (!isWorkday(r)) r.setUTCDate(r.getUTCDate() - 1);
  return r;
}
/** Step back `n` working days from `d` (n=0 returns d). */
export function subWorkdays(d: Date, n: number): Date {
  let r = new Date(d);
  for (let i = 0; i < n; i++) r = prevWorkday(r);
  return r;
}
/** Snap onto a working day, moving backwards if necessary. */
export function snapBack(d: Date): Date {
  const r = new Date(d);
  while (!isWorkday(r)) r.setUTCDate(r.getUTCDate() - 1);
  return r;
}
/** Inclusive count of working days between two dates. */
export function workdaysBetween(a: Date, b: Date): number {
  let n = 0;
  const r = new Date(a);
  while (r <= b) {
    if (isWorkday(r)) n++;
    r.setUTCDate(r.getUTCDate() + 1);
  }
  return n;
}

/* --------------------------------------------------------------- the model */

/** Authored input. Durations are working days; `gap` is slack BEFORE the step. */
export type StepSpec = {
  id: string;
  name: string;
  family: PhaseFamily;
  kind: 'phase' | 'milestone';
  /** Working days. Duration phases only. */
  days?: number;
  /** Working days of float between this step and the one after it. */
  gap?: number;
  org: ScheduleOrgKey;
  owner: SchedulePersonKey;
  /** What this party owes the project during this step. */
  owed: string;
  /** Explicit status override; otherwise derived from the data date. */
  status?: PhaseStatus;
  commitmentId?: string;
};

/** Resolved output. This is what the Gantt and the popover both read. */
export type ScheduleStep = {
  id: string;
  scheduleItemId: string;
  kind: 'phase' | 'milestone';
  family: PhaseFamily;
  name: string;
  /** Duration phases: inclusive span. Milestones: start === end === the date. */
  startDate: string;
  endDate: string;
  durationWorkdays: number;
  status: PhaseStatus;
  responsibleOrganizationId: ScheduleOrgKey;
  responsibleOrganization: string;
  commitmentOwnerId: SchedulePersonKey;
  commitmentOwnerName: string;
  commitmentOwnerRole: string;
  whatIsOwed: string;
  nextStepId?: string;
  nextHandoffLabel?: string;
  nextHandoffParty?: string;
  /** Declared, not built. The future Commitment Register link. */
  commitmentId?: string;
  requiredOnSiteDate: string;
};

export type ScheduleItem = {
  id: string;
  name: string;
  category: string;
  requiredOnSiteDate: string;
  steps: ScheduleStep[];
  /** Derived: the step spanning the data date, if any. */
  currentStepId?: string;
  startDate: string;
  durationWorkdays: number;
};

/**
 * THE REPRESENTATIVE DATA DATE.
 *
 * Fixed in fixture data, never `new Date()`. The schedule runs into late 2027;
 * binding the marker to the real clock would put it far left of every bar today
 * and would keep drifting, making a static demonstration incoherent within
 * months.
 *
 * 2027-05-20 was chosen by testing candidates against the resulting spread. It
 * yields 4 packages complete, 6 in flight and 2 not yet started, and the six
 * active ones sit at six DIFFERENT stages - shipping, manufacturing, material
 * procurement, buyout, shop drawing preparation and owner selection. That is
 * what makes the board read as a real project rather than twelve synchronised
 * demo rows.
 */
export const DATA_DATE = '2027-05-20';

/* --------------------------------------------------- backward-schedule pass */

/**
 * Resolve one item by walking its sequence BACKWARD from the Required On-Site
 * date. Nothing here is positioned; only dates are produced. Pixels come later,
 * from these dates.
 */
export function buildItem(
  id: string,
  name: string,
  category: string,
  requiredOnSiteDate: string,
  specs: StepSpec[],
): ScheduleItem {
  const ros = parse(requiredOnSiteDate);
  const out: ScheduleStep[] = [];
  let cursor = snapBack(ros);

  for (let i = specs.length - 1; i >= 0; i--) {
    const s = specs[i];
    let start: Date;
    let end: Date;

    if (s.kind === 'milestone') {
      end = new Date(cursor);
      start = new Date(cursor);
      cursor = subWorkdays(cursor, Math.max(1, s.gap ?? 1));
    } else {
      const d = Math.max(1, s.days ?? 1);
      end = new Date(cursor);
      start = subWorkdays(end, d - 1);
      cursor = subWorkdays(start, Math.max(1, s.gap ?? 1));
    }

    const person = SCHEDULE_PEOPLE[s.owner];
    out.unshift({
      id: s.id,
      scheduleItemId: id,
      kind: s.kind,
      family: s.family,
      name: s.name,
      startDate: iso(start),
      endDate: iso(end),
      durationWorkdays: s.kind === 'milestone' ? 0 : workdaysBetween(start, end),
      status: s.status ?? 'upcoming',
      responsibleOrganizationId: s.org,
      responsibleOrganization: SCHEDULE_ORGS[s.org],
      commitmentOwnerId: s.owner,
      commitmentOwnerName: person.name,
      commitmentOwnerRole: person.role,
      whatIsOwed: s.owed,
      commitmentId: s.commitmentId,
      requiredOnSiteDate,
    });
  }

  // Handoffs: each step points at the next, and names the party receiving it.
  for (let i = 0; i < out.length; i++) {
    const next = out[i + 1];
    if (next) {
      out[i].nextStepId = next.id;
      out[i].nextHandoffLabel = next.name;
      out[i].nextHandoffParty = next.responsibleOrganization;
    }
  }

  // Status, derived from the fixed data date unless the spec overrode it.
  const dd = parse(DATA_DATE);
  for (let i = 0; i < out.length; i++) {
    if (specs[i].status) continue;
    const st = parse(out[i].startDate);
    const en = parse(out[i].endDate);
    out[i].status = en < dd ? 'complete' : st > dd ? 'upcoming' : 'on-track';
  }

  const current = out.find((s) => s.status === 'on-track' || s.status === 'at-risk');
  return {
    id,
    name,
    category,
    requiredOnSiteDate,
    steps: out,
    currentStepId: current?.id,
    startDate: out[0].startDate,
    durationWorkdays: workdaysBetween(parse(out[0].startDate), parse(requiredOnSiteDate)),
  };
}
