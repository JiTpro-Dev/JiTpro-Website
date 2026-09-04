/**
 * Content for the long-form explainer page at `/learn-more`
 * (Design System Section 50, approved 2026-09-03).
 *
 * The copy lives here rather than inside the section components because the
 * page is ONE ARGUMENT IN NUMBERED PARTS (Section 50.1) and the argument has
 * to be readable as a whole. A reviewer checking whether section 02 sets up
 * section 03 should be able to read them side by side without opening two
 * components.
 *
 * BINDING CONSTRAINTS ON EVERY STRING IN THIS FILE:
 *
 *   - Section 20.1 applies in full (Section 50.2). "Procurement" stays
 *     retired, JiTpro is never described as software or as a layer, and the
 *     operating requirement is never stated as a guaranteed outcome. No
 *     delivery guarantee, no conformance warranty, no quantified improvement.
 *   - Section 50.2, external parties: owners, architects, engineers, vendors
 *     and subcontractors are participants the project depends on, never
 *     adversaries. The failure named is always an unmanaged dependency.
 *   - Section 50.2, qualification: the "probably not for" list disqualifies by
 *     POSTURE, never by character.
 *   - Section 50.7: NO EM DASHES, including as `&mdash;`.
 *   - Section 20.1, long-lead terminology: no lead time is stated anywhere,
 *     and nothing here may imply JiTpro is a long-lead-item service.
 *   - Section 20.1, audience: no revenue band, employee count, or project
 *     value. The reader recognizes themselves through symptoms.
 *
 * The guide (Section 50.4) is generated from GUIDE_SECTIONS, and each section
 * component takes its `id` and `ordinal` from the same list, so the table of
 * contents cannot drift from the page it addresses.
 */

export type GuideSection = {
  /** Stable anchor id. Matches the ordinal slug (Section 50.3). */
  id: string;
  /** Two-digit sequence marker, rendered per Section 48.9. */
  ordinal: string;
  /** Title as it appears in the guide and as the section's own h2 subject. */
  title: string;
};

export const GUIDE_SECTIONS: GuideSection[] = [
  { id: '00-at-a-glance', ordinal: '00', title: 'JiTpro at a glance' },
  { id: '01-accepted-chaos', ordinal: '01', title: 'The chaos you have learned to accept' },
  { id: '02-what-you-control', ordinal: '02', title: 'What you control and what you do not' },
  { id: '03-control-starts-earlier', ordinal: '03', title: 'Control starts earlier' },
  { id: '04-the-method', ordinal: '04', title: 'The JiTpro method' },
  { id: '05-what-jitpro-produces', ordinal: '05', title: 'What JiTpro produces' },
  { id: '06-what-changes', ordinal: '06', title: 'What changes when you know earlier' },
  { id: '07-one-project', ordinal: '07', title: 'Start with one project' },
  { id: '08-first-project', ordinal: '08', title: 'What the first project looks like' },
  { id: '09-who-its-for', ordinal: '09', title: 'Who JiTpro is for' },
  { id: '10-built-by-contractors', ordinal: '10', title: 'Built by contractors' },
  { id: '11-start', ordinal: '11', title: 'Start your first project' },
];

/** Convenience lookup so a section cannot invent an id the guide does not know. */
export const SECTION = Object.fromEntries(
  GUIDE_SECTIONS.map((s) => [s.ordinal, s]),
) as Record<string, GuideSection>;

/** The anchor the opening's secondary action sends the reader to. */
export const GUIDE_ANCHOR_ID = 'in-this-guide';

/* ------------------------------------------------------------------ 00 */

export type GlanceItem = { label: string; body: string };

/**
 * Six items, scannable in well under a minute. Deliberately not cards with
 * icons (Sections 48.2, 48.4): hairline separation and whitespace.
 */
export const GLANCE_ITEMS: GlanceItem[] = [
  {
    label: 'What it is',
    body: 'A contractor-led project control and readiness program.',
  },
  {
    label: 'Who it is for',
    body: 'Growth-stage general contractors managing increasingly complex projects.',
  },
  {
    label: 'Where we start',
    body: 'One project. Not the whole company.',
  },
  {
    label: 'What we do',
    body: 'Identify what the project depends on, establish responsibility and accountability, and organize the work backward from when the field needs it.',
  },
  {
    label: 'What changes',
    body: 'Problems surface earlier, accountability becomes visible, and the team has more time to act.',
  },
  {
    label: 'What you protect',
    body: 'Schedule, productivity, and profit.',
  },
];

/* ------------------------------------------------------------------ 01 */

/**
 * The lived reality, in the reader's own vocabulary. Each is a condition, not
 * an accusation: nothing here says anyone failed, only that something the
 * field will depend on is not yet resolved.
 */
export const CHAOS_CONDITIONS: string[] = [
  'Architectural information that is not yet complete where the work has to be built.',
  'Specifications that describe the intent but not the condition in front of you.',
  'Selections that remain open while the work that depends on them gets closer.',
  'Owner decisions that are still being considered and still being changed.',
  'Responsibilities that everyone assumes are covered by someone else.',
  'Scope gaps between two subcontracts that neither party reads as theirs.',
  'Drawings and specifications that do not fully agree with each other.',
  'Products that have to coordinate with field conditions that are still developing.',
  'Commitments made in meetings, on calls, in email, and in text messages.',
  'Dependencies nobody is tracking, because nobody has needed them yet.',
];

/* ------------------------------------------------------------------ 02 */

export type ControlPair = {
  /** The dependency category, stated once and read across both columns. */
  subject: string;
  /** The part that genuinely belongs to someone else. */
  outside: string;
  /** The part that has always belonged to the contractor. */
  inside: string;
};

/**
 * The paired-condition comparison (Section 50.6). The columns are
 * typographically equal and the contrast is carried by the words. The right
 * column is never a promise about the left one: it describes management of the
 * dependency, never control of the person.
 */
export const CONTROL_PAIRS: ControlPair[] = [
  {
    subject: 'Owner decisions',
    outside: 'When the owner makes the final decision, and whether they change it later.',
    inside:
      'When the decision is identified, who carries it, the date it has to be made by, and what happens to the work behind it if that date moves.',
  },
  {
    subject: 'Architectural information',
    outside: 'How quickly a design question is answered, and how complete the answer is.',
    inside:
      'Which questions are asked, how early they are asked, what the answer is needed for, and when the field stops being able to wait for it.',
  },
  {
    subject: 'Engineering information',
    outside: 'When an engineered condition is resolved and released.',
    inside:
      'That the condition is identified as a dependency before it is urgent, with an owner and a required-by date attached to it.',
  },
  {
    subject: 'Selections',
    outside: 'What the owner ultimately chooses.',
    inside:
      'The list of selections the project is waiting on, what each one releases, and the date each one stops being a choice and starts being a delay.',
  },
  {
    subject: 'Vendor information',
    outside: 'When a vendor returns information or confirms what they can supply.',
    inside:
      'What information the project needs from them, who is asking for it, when it was asked for, and whether it is moving.',
  },
  {
    subject: 'Subcontractor commitments',
    outside: 'Whether a subcontractor honors a date they agreed to.',
    inside:
      'That the commitment was made explicitly, recorded, given a date, and tracked, so a missed one is visible while it is still recoverable.',
  },
  {
    subject: 'Product coordination',
    outside: 'How a manufactured product is fabricated and when it ships.',
    inside:
      'That the product is registered, that what it has to coordinate with is understood, and that every approval and release behind it carries an owner and a date.',
  },
];

/* ------------------------------------------------------------------ 03 */

export type ChainLink = {
  /** The step, stated as the thing that has to be true. */
  label: string;
  /** What the step waits on. Never a date, never a duration (Section 50.6). */
  note: string;
};

/**
 * The backward dependency sequence (Section 50.6). It reads backward BY
 * CONSTRUCTION: the field need date is stated first and every step after it is
 * earlier than the one before. Nothing here carries a date, a duration, or a
 * count, so the figure's provenance is methodological (Section 48.10).
 */
export const BACKWARD_CHAIN: ChainLink[] = [
  {
    label: 'The field needs it',
    note: 'The crew is ready, the work in front of it is complete, and this is what the next activity depends on.',
  },
  {
    label: 'It has to be onsite',
    note: 'Received, inspected, and staged where the work is happening.',
  },
  {
    label: 'It has to be delivered',
    note: 'Released for shipment against a date the field can actually use.',
  },
  {
    label: 'It has to be fabricated',
    note: 'Built to what was approved, not to what was assumed.',
  },
  {
    label: 'Shop drawings have to be approved',
    note: 'Reviewed and returned, with the comments resolved rather than carried forward.',
  },
  {
    label: 'It has to be coordinated',
    note: 'Checked against adjacent trades and the conditions it will actually meet in the field.',
  },
  {
    label: 'The selection has to be final',
    note: 'The choice is made and will not be revisited after the work behind it starts.',
  },
  {
    label: 'The design information has to exist',
    note: 'The detail, dimension, or performance requirement the product is built to.',
  },
  {
    label: 'The decision has to be made',
    note: 'Someone has to own it, and it has to be made by a date the rest of this chain can live with.',
  },
];

/* ------------------------------------------------------------------ 04 */

export type MethodStep = { title: string; body: string };

/**
 * The method as the reader experiences it, in five verbs. This is NOT a
 * restatement of `src/content/methodologyStages.ts`, which is product doctrine
 * naming the five stages and what each PRODUCES. That doctrine is rendered as
 * written in section 05 and MUST NOT be reworded here or there.
 */
export const METHOD_STEPS: MethodStep[] = [
  {
    title: 'Understand the project',
    body: 'Drawings, specifications, contracts, subcontracts, the schedule, the commitments already made, and the conditions the project is actually being built under. We start from your documents, not from a template.',
  },
  {
    title: 'Find the gaps',
    body: 'Missing information, unclear responsibility, scope that no subcontract picks up, decisions nobody has been asked to make, and coordination the project is quietly assuming will resolve itself.',
  },
  {
    title: 'Establish accountability',
    body: 'Every gap becomes a named item: who owns the next move, what specifically is required, and when it has to be complete. An owner and a date, on the record, before it is urgent.',
  },
  {
    title: 'Plan backward from the field',
    body: 'Each product, material, and service is tied to the date the field needs it. Then every approval, release, selection, and decision behind it is dated backward from that point.',
  },
  {
    title: 'Maintain control',
    body: 'Track whether the dependencies are moving, surface the ones that are not while meaningful options still exist, and give your team the information to intervene early.',
  },
];

/* ------------------------------------------------------------------ 05 */

/**
 * What each methodology stage PRODUCES, explained for a reader deciding
 * whether this is worth their next project.
 *
 * Keyed by the stage `id` in `src/content/methodologyStages.ts`. The stage
 * titles, bodies, and screen captions come from that file unchanged; these
 * three lines are the long-form page's own addition, answering the reader's
 * three questions in order.
 */
export type ProducedOutput = {
  /** Methodology stage id this expands. */
  stageId: string;
  /** What the reader is looking at. */
  what: string;
  /** What it exposes that was not visible before. */
  exposes: string;
  /** Why a contractor cares, in field and decision terms. */
  matters: string;
};

export const PRODUCED_OUTPUTS: ProducedOutput[] = [
  {
    stageId: 'scope-validation',
    what: 'A line-by-line check of the work the project requires against the coverage you actually hold.',
    exposes: 'Where the documents agree, where they conflict, and where a requirement is carried by only one source.',
    matters:
      'Scope you believe is covered and scope that is genuinely covered are not the same thing. This is where the difference shows up, while it is still a conversation rather than a change order.',
  },
  {
    stageId: 'scope-gap-analysis',
    what: 'Every gap the validation found, sorted by what kind of gap it is.',
    exposes:
      'Definition gaps, responsibility gaps, and interface gaps between trades, each with a responsible party and a date it becomes a constraint.',
    matters:
      'A gap with a name, an owner, and a required-by date is work. The same gap without them is a surprise waiting for the field to find it.',
  },
  {
    stageId: 'commitment-capture',
    what: 'The record of what people agreed to do, taken out of meetings, calls, email, and text.',
    exposes: 'Who owns the next move, what they committed to, when it is due, and whether it is on track, at risk, or overdue.',
    matters:
      'Your team already chases these. The register is what lets them chase the few that are actually slipping instead of all of them.',
  },
  {
    stageId: 'product-register',
    what: 'The products, materials, equipment, and services the project will depend on, in one place.',
    exposes:
      'What each one is waiting on, the approvals and commitments behind it, and the date it has to be on site for the field to keep moving.',
    matters:
      'Importance is not determined by size, cost, or how obviously critical something looks today. An ordinary item can stop a crew just as completely as an obvious one.',
  },
  {
    stageId: 'backward-scheduling',
    what: 'A schedule built from the date the field needs each item, working back through everything required to get there.',
    exposes: 'Which dependency chains still have room, which are tight, and which have already run out of it.',
    matters:
      'This is what turns a required onsite date into an actionable date for a decision, an approval, or a release, weeks or months before anyone would otherwise be looking at it.',
  },
];

/* ------------------------------------------------------------------ 06 */

export type ChangePair = { without: string; with: string };

/**
 * The second paired-condition comparison (Section 50.6). Same rules: equal
 * typography, no colour carrying the contrast, and each row is one subject
 * read twice. The right column deliberately stops short of a promise
 * (Section 20.1 claim strength): better chances and more time, never
 * guaranteed schedules.
 */
export const CHANGE_PAIRS: ChangePair[] = [
  {
    without: 'The problem surfaces in construction.',
    with: 'The problem surfaces before construction.',
  },
  {
    without: 'It is unclear who owns the next move.',
    with: 'Responsibility is visible and on the record.',
  },
  {
    without: 'The field waits while the answer is chased.',
    with: 'The right people have time to work the answer.',
  },
  {
    without: 'Trades get resequenced around what is missing.',
    with: 'Alternatives are still available and still cheap.',
  },
  {
    without: 'Material gets expedited at whatever it costs.',
    with: 'Dates are set early enough to be met normally.',
  },
  {
    without: 'Work gets redone to match what actually arrived.',
    with: 'Coordination is resolved before anything is built.',
  },
  {
    without: 'Management moves from planning to firefighting.',
    with: 'Management works the exceptions, not everything.',
  },
  {
    without: 'Margin pays for the recovery.',
    with: 'Field dates have a far better chance to hold.',
  },
];

/* ------------------------------------------------------------------ 08 */

export type Phase = { name: string; body: string };

/**
 * Deliberately high level. No durations, no deliverable counts, and no
 * commercial terms are stated here, because none are approved (Appendix C: a
 * TODO is not permission, and neither is an absent decision).
 */
export const FIRST_PROJECT_PHASES: Phase[] = [
  {
    name: 'Project intake',
    body: 'We start from what you already have: documents, contracts and subcontracts, the current schedule, the team, and where the project stands today.',
  },
  {
    name: 'Project interrogation',
    body: 'We work through the scope, the commitments already made, the products the project will depend on, the information it is waiting on, and the design questions that are still open.',
  },
  {
    name: 'Control structure',
    body: 'Every dependency gets an owner, a required-by date, and a place in the chain that leads back from the date the field needs the result.',
  },
  {
    name: 'Active management',
    body: 'We track movement, surface what is not moving, and keep your team supplied with what they need to escalate early rather than react late.',
  },
];

/* ------------------------------------------------------------------ 09 */

/** Qualification by posture, never by character (Section 50.2). */
export const FIT_FOR: string[] = [
  'You have already paid for preventable project chaos, and you know roughly what it cost.',
  'You are growing, and it is getting harder to personally stay ahead of everything the way you used to.',
  'Your projects carry real dependencies: design information, selections, products, approvals, and decisions made outside your company.',
  'You would rather prevent the next recovery effort than diagnose the last one.',
  'You are willing to establish accountability early, including around decisions your company does not own.',
];

export const FIT_NOT_FOR: string[] = [
  'Firefighting is accepted as simply part of being a builder.',
  'The goal is another piece of software, without changing how projects are managed.',
  'Information that could be driven now is left until construction forces the issue.',
  'Creating accountability around decisions outside the company is treated as out of bounds.',
];
