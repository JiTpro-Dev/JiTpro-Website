/* PROTOTYPE QA HARNESS - dev-only, not shipped. Validates the fixture against
   the governing instruction's Sections 66 (dates) and 67 (accountability). */
import { SCHEDULE_ITEMS } from './scheduleFixture';
import { DATA_DATE, SCHEDULE_ORGS, SCHEDULE_PEOPLE, parse, workdaysBetween } from './scheduleModel';

const APPROVED: Record<string, string> = {
  'Building Permit': '2027-01-04',
  'Concrete & Reinforcing Package': '2027-01-18',
  'Structural Steel Package': '2027-03-15',
  'Lumber & Engineered Framing Package': '2027-04-05',
  'Heritage Steel Windows & Exterior Doors': '2027-06-07',
  'Electrical Switchgear & Distribution Equipment': '2027-07-12',
  'Exterior Stone Package': '2027-08-09',
  'Tile Package': '2027-09-13',
  'Custom Cabinetry & Casework': '2027-10-11',
  'Plumbing Fixture Package': '2027-10-25',
  'Custom Interior Door Package': '2027-11-08',
  'Decorative Lighting Package': '2027-11-29',
};

const err: string[] = [];
const warn: string[] = [];
const E = (m: string) => err.push(m);

if (SCHEDULE_ITEMS.length !== 12) E(`expected 12 items, got ${SCHEDULE_ITEMS.length}`);

let earliest = '9999', latest = '0000';
for (const it of SCHEDULE_ITEMS) {
  const approved = APPROVED[it.name];
  if (!approved) E(`unknown item name: ${it.name}`);
  else if (approved !== it.requiredOnSiteDate)
    E(`${it.name}: RoS ${it.requiredOnSiteDate} != approved ${approved}`);

  const last = it.steps[it.steps.length - 1];
  if (last.family !== 'required') E(`${it.name}: terminal step is "${last.name}", not Required On-Site`);
  if (last.endDate > it.requiredOnSiteDate) E(`${it.name}: terminal milestone after RoS`);

  const ids = new Set(it.steps.map((s) => s.id));
  for (let i = 0; i < it.steps.length; i++) {
    const s = it.steps[i];
    if (s.startDate > s.endDate) E(`${s.id}: start ${s.startDate} > end ${s.endDate}`);
    if (s.kind === 'milestone' && s.durationWorkdays !== 0) E(`${s.id}: milestone has duration`);
    if (s.kind === 'phase') {
      const calc = workdaysBetween(parse(s.startDate), parse(s.endDate));
      if (calc !== s.durationWorkdays) E(`${s.id}: duration ${s.durationWorkdays} != computed ${calc}`);
      if (s.durationWorkdays < 1) E(`${s.id}: non-positive duration`);
    }
    if (s.endDate > it.requiredOnSiteDate) E(`${s.id}: ends after RoS (${s.endDate} > ${it.requiredOnSiteDate})`);
    const nxt = it.steps[i + 1];
    if (nxt) {
      if (s.endDate > nxt.startDate) E(`${s.id} ends ${s.endDate} after successor ${nxt.id} starts ${nxt.startDate}`);
      if (s.nextStepId !== nxt.id) E(`${s.id}: nextStepId ${s.nextStepId} != ${nxt.id}`);
      const gap = workdaysBetween(parse(s.endDate), parse(nxt.startDate)) - 1;
      if (gap > 8) warn.push(`${s.id} -> ${nxt.id}: ${gap} working-day gap`);
    } else if (s.nextStepId) E(`${s.id}: terminal step has nextStepId`);
    if (s.nextStepId && !ids.has(s.nextStepId)) E(`${s.id}: nextStepId does not resolve`);
    if (!SCHEDULE_ORGS[s.responsibleOrganizationId]) E(`${s.id}: org does not resolve`);
    if (!SCHEDULE_PEOPLE[s.commitmentOwnerId]) E(`${s.id}: owner does not resolve`);
    if (!s.whatIsOwed || s.whatIsOwed.length < 20) E(`${s.id}: whatIsOwed missing/thin`);
    if (/value|cost|budget|price|\$/i.test(s.whatIsOwed + s.name)) E(`${s.id}: financial language`);
  }
  const owners = new Set(it.steps.map((s) => s.commitmentOwnerId));
  if (owners.size < 3) E(`${it.name}: only ${owners.size} distinct owners - accountability not moving`);
  const orgs = new Set(it.steps.map((s) => s.responsibleOrganizationId));
  if (orgs.size < 3) E(`${it.name}: only ${orgs.size} distinct organizations`);
  if (it.startDate < earliest) earliest = it.startDate;
  if (it.requiredOnSiteDate > latest) latest = it.requiredOnSiteDate;
}

const st = { complete: 0, 'on-track': 0, 'at-risk': 0, upcoming: 0 } as Record<string, number>;
for (const it of SCHEDULE_ITEMS) for (const s of it.steps) st[s.status]++;

console.log('DATA DATE:', DATA_DATE);
console.log('TIMELINE :', earliest, '->', latest);
console.log('ITEMS    :', SCHEDULE_ITEMS.length, ' STEPS:', SCHEDULE_ITEMS.reduce((n, i) => n + i.steps.length, 0));
console.log('STATUS   :', JSON.stringify(st));
console.log('\nPER ITEM:');
for (const it of SCHEDULE_ITEMS) {
  const cur = it.steps.find((s) => s.id === it.currentStepId);
  console.log(
    `  ${it.name.padEnd(46)} start ${it.startDate}  RoS ${it.requiredOnSiteDate}  steps ${String(it.steps.length).padStart(2)}  ` +
    `${it.durationWorkdays}wd  current: ${cur ? cur.name + ' [' + cur.status + '] ' + cur.responsibleOrganization : '(none active)'}`,
  );
}
console.log('\nWARNINGS:', warn.length); warn.slice(0, 10).forEach((w) => console.log('  ! ' + w));
console.log('ERRORS  :', err.length); err.forEach((e) => console.log('  X ' + e));
if (err.length) process.exit(1);
