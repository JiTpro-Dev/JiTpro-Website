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
  'Custom Air Handling & HVAC Equipment': '2027-08-23',
  'Tile Package': '2027-09-13',
  'Passenger Elevator Package': '2027-09-27',
  'Custom Cabinetry & Casework': '2027-10-11',
  'Architectural Metal Railings & Ornamental Metal': '2027-10-18',
  'Plumbing Fixture Package': '2027-10-25',
  'Custom Interior Door Package': '2027-11-08',
  'Decorative Lighting Package': '2027-11-29',
};

const err: string[] = [];
const warn: string[] = [];
const E = (m: string) => err.push(m);

if (SCHEDULE_ITEMS.length !== 15) E(`expected 15 items, got ${SCHEDULE_ITEMS.length}`);

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
/* ------------------------------------------- external commitment milestones */

let nCommit = 0;
let gcOwned = 0;
const roles = new Set<string>();

for (const it of SCHEDULE_ITEMS) {
  const stepIds = new Set(it.steps.map((s) => s.id));
  const seen = new Set<string>();

  for (const c of it.commitments) {
    nCommit++;
    roles.add(c.ownerRole);

    if (seen.has(c.id)) E(`${c.id}: duplicate commitment id`);
    seen.add(c.id);
    if (c.scheduleItemId !== it.id) E(`${c.id}: scheduleItemId ${c.scheduleItemId} != ${it.id}`);

    // 3. The requirement must precede the activity it enables, and land inside
    //    its own package's span so the marker is drawn on its own row.
    if (!stepIds.has(c.requiredForStepId)) E(`${c.id}: requiredForStepId does not resolve`);
    const target = it.steps.find((s) => s.id === c.requiredForStepId);
    if (target) {
      if (c.requiredBy > target.startDate)
        E(`${c.id}: requiredBy ${c.requiredBy} after ${target.id} start ${target.startDate}`);
      if (target.id === it.steps[0].id) E(`${c.id}: targets the package's first step`);
    }
    if (c.requiredBy < it.startDate)
      E(`${c.id}: requiredBy ${c.requiredBy} before package start ${it.startDate}`);
    if (c.requiredBy > it.requiredOnSiteDate)
      E(`${c.id}: requiredBy after Required On-Site`);

    // 4. Accountability must sit outside the GC - that is the whole point.
    if (c.ownerOrganizationId === 'gc') gcOwned++;

    // 6. The two dates are independent. committedFor must never have been
    //    written onto requiredBy, and the variance must reflect both.
    if (c.committedFor !== null) {
      if (c.varianceWorkdays === null) E(`${c.id}: committed but no variance derived`);
      const late = c.committedFor > c.requiredBy;
      if (late && (c.varianceWorkdays ?? 0) <= 0) E(`${c.id}: late commitment, non-positive variance`);
      if (c.status !== 'complete' && late && c.status !== 'beyond-required')
        E(`${c.id}: committed beyond required but status is "${c.status}"`);
    } else if (c.varianceWorkdays !== null) {
      E(`${c.id}: no committed date but variance is not null`);
    }

    if (!c.description || c.description.length < 20) E(`${c.id}: description missing/thin`);
    if (/value|cost|budget|price|\$/i.test(c.description + c.name)) E(`${c.id}: financial language`);
    if (!SCHEDULE_PEOPLE[c.ownerId]) E(`${c.id}: owner does not resolve`);
    if (!SCHEDULE_ORGS[c.ownerOrganizationId]) E(`${c.id}: organization does not resolve`);
  }

  // 1 & 2. Every package reviewed, none mechanically templated.
  if (it.commitments.length === 0) E(`${it.name}: no external commitments identified`);
  // 9. Readability: a row carrying more than three raised markers is a list.
  if (it.commitments.length > 3) E(`${it.name}: ${it.commitments.length} commitments - too dense`);
}

if (gcOwned > 0) E(`${gcOwned} commitment(s) owned by the GC - these are not external`);
if (roles.size < 6) E(`only ${roles.size} distinct owner roles across the project`);

/**
 * 5. THE LOAD-BEARING ASSERTION. Commitments must be a read-only report on the
 * schedule. Every package's Required On-Site and derived start are re-checked
 * against the approved table above AFTER commitments resolve; if adding one
 * had moved any procurement date, the approved-date check would already have
 * failed. This states the invariant explicitly so it cannot regress silently.
 */
for (const it of SCHEDULE_ITEMS) {
  const terminal = it.steps[it.steps.length - 1];
  if (terminal.startDate > it.requiredOnSiteDate) E(`${it.name}: commitments moved the schedule`);
}

console.log('\nEXTERNAL COMMITMENTS:', nCommit, ' roles:', roles.size, ' GC-owned:', gcOwned);
for (const it of SCHEDULE_ITEMS) {
  console.log(`  ${it.name}`);
  for (const c of it.commitments) {
    console.log(
      `     ${c.requiredBy}  ${c.name.padEnd(46)} ${c.ownerRole.padEnd(22)} -> ${c.requiredForStepName.padEnd(34)}` +
      ` committed ${c.committedFor ?? '-'.padEnd(10)} ${c.status}` +
      (c.varianceWorkdays !== null && c.varianceWorkdays !== 0 ? ` (${c.varianceWorkdays > 0 ? '+' : ''}${c.varianceWorkdays}wd)` : ''),
    );
  }
}

/* -------------------------------------- baseline / actual / forecast / health */

const health = { healthy: 0, 'at-risk': 0, impacted: 0 } as Record<string, number>;
let affected = 0;

for (const it of SCHEDULE_ITEMS) {
  health[it.health]++;
  if (it.issues.length > 0 || it.forecastOnSiteDate) affected++;

  // REQUIRED ON-SITE IS THE FIELD REQUIREMENT AND DOES NOT MOVE. It is
  // re-checked against the approved table above; here we assert that nothing
  // in the risk layer has been allowed to stand in for it.
  if (APPROVED[it.name] !== it.requiredOnSiteDate)
    E(`${it.name}: Required On-Site redefined by the risk layer`);
  if (it.forecastOnSiteDate === it.requiredOnSiteDate)
    E(`${it.name}: forecast duplicates the requirement instead of being absent`);

  // Forecast variance must be the working-day distance between the two, and
  // must never be negative - a forecast that beats the requirement is simply
  // met, and is recorded as no variance.
  if (it.forecastOnSiteDate) {
    if (it.forecastOnSiteDate < it.requiredOnSiteDate)
      E(`${it.name}: forecast earlier than requirement - express as met, not negative`);
    const v = workdaysBetween(parse(it.requiredOnSiteDate), parse(it.forecastOnSiteDate)) - 1;
    if (v !== it.forecastVarianceWorkdays)
      E(`${it.name}: forecast variance ${it.forecastVarianceWorkdays} != computed ${v}`);
  } else if (it.forecastVarianceWorkdays !== 0) {
    E(`${it.name}: no forecast but non-zero variance`);
  }

  // Health is derived, so it must agree with the facts that produced it.
  const expected =
    it.forecastVarianceWorkdays > 0 ? 'impacted' : it.issues.length > 0 ? 'at-risk' : 'healthy';
  if (it.health !== expected) E(`${it.name}: health "${it.health}" != derived "${expected}"`);
  if (it.health !== 'healthy' && it.issues.length === 0)
    E(`${it.name}: flagged ${it.health} with no issue attached - risk without a reason`);

  // THE BASELINE MUST NOT HAVE TOUCHED THE FORECAST. Same terminal date (the
  // requirement is shared), different start (that is the whole point).
  if (it.baseline) {
    const terminal = it.steps[it.steps.length - 1];
    const baseTerminal = it.baseline.stepDates[terminal.id];
    if (!baseTerminal) E(`${it.name}: baseline missing the terminal step`);
    else if (baseTerminal.endDate !== it.requiredOnSiteDate)
      E(`${it.name}: baseline does not land on Required On-Site`);
    if (it.baseline.startDate <= it.startDate)
      E(`${it.name}: baseline start ${it.baseline.startDate} not later than forecast ${it.startDate}`);
    const adv = workdaysBetween(parse(it.startDate), parse(it.baseline.startDate)) - 1;
    if (adv !== it.baseline.pathAdvancedWorkdays)
      E(`${it.name}: path advanced ${it.baseline.pathAdvancedWorkdays} != computed ${adv}`);
  }

  for (const i of it.issues) {
    if (i.scheduleItemId !== it.id) E(`${i.id}: issue on the wrong package`);
    if (i.identifiedOn > DATA_DATE) E(`${i.id}: identified after the data date`);
    if (!i.cause || i.cause.length < 20) E(`${i.id}: cause missing/thin`);
    if (!i.impact || i.impact.length < 20) E(`${i.id}: impact missing/thin`);
    if (/value|cost|budget|price|\$/i.test(i.cause + i.impact + i.title))
      E(`${i.id}: financial language`);
    // An issue reads its root commitment rather than restating it, so the two
    // can never carry contradictory versions of the same dates.
    if (i.kind === 'missed-commitment') {
      if (!i.rootCommitment) E(`${i.id}: missed-commitment issue with no root commitment`);
      else if ((i.rootCommitment.completionVarianceWorkdays ?? 0) <= 0)
        E(`${i.id}: root commitment was not actually missed`);
    }
    if (i.kind === 'lead-time') {
      if (i.baselineLeadWorkdays == null || i.currentLeadWorkdays == null)
        E(`${i.id}: lead-time issue missing a lead time`);
      else if (i.currentLeadWorkdays <= i.baselineLeadWorkdays)
        E(`${i.id}: current lead ${i.currentLeadWorkdays} not longer than baseline ${i.baselineLeadWorkdays}`);
    }
  }

  // Completion variance must measure against what was ORIGINALLY owed.
  for (const c of it.commitments) {
    if (c.completionVarianceWorkdays === null) continue;
    const owed = parse(c.baselineRequiredBy ?? c.requiredBy);
    const done = parse(c.completedDate!);
    const v = done >= owed ? workdaysBetween(owed, done) - 1 : -(workdaysBetween(done, owed) - 1);
    if (v !== c.completionVarianceWorkdays)
      E(`${c.id}: completion variance ${c.completionVarianceWorkdays} != computed ${v}`);
    if (c.baselineRequiredBy && c.baselineRequiredBy > c.requiredBy)
      E(`${c.id}: baseline requirement later than the current forecast requirement`);
  }
}

// A controlled representative project: most of it must remain unremarkable.
if (affected !== 3) E(`${affected} affected packages - expected exactly 3`);
if (health.healthy !== 12) E(`${health.healthy} healthy - expected 12`);
if (health['at-risk'] !== 2) E(`${health['at-risk']} at risk - expected 2`);
if (health.impacted !== 1) E(`${health.impacted} impacted - expected 1`);

console.log(
  `\nPACKAGE HEALTH: ${health.healthy} healthy · ${health['at-risk']} at risk · ${health.impacted} impacted`,
);
for (const it of SCHEDULE_ITEMS) {
  if (it.health === 'healthy') continue;
  console.log(`\n  ${it.name}  [${it.health.toUpperCase()}]`);
  console.log(`    Required On-Site ${it.requiredOnSiteDate}` +
    (it.forecastOnSiteDate
      ? `   Forecast On-Site ${it.forecastOnSiteDate}  (+${it.forecastVarianceWorkdays}wd) NOT PROTECTED`
      : '   forecast satisfies the requirement - PROTECTED'));
  if (it.baseline)
    console.log(`    Baseline start ${it.baseline.startDate} vs forecast ${it.startDate} - path advanced ${it.baseline.pathAdvancedWorkdays}wd`);
  for (const i of it.issues) {
    console.log(`    ISSUE ${i.identifiedOn}  ${i.kindLabel}: ${i.title}`);
    if (i.baselineLeadWorkdays != null)
      console.log(`      lead time ${i.baselineLeadWorkdays} -> ${i.currentLeadWorkdays} working days`);
    const rc = i.rootCommitment;
    if (rc)
      console.log(
        `      root: ${rc.name} (${rc.ownerRole})  required ${rc.baselineRequiredBy ?? rc.requiredBy}` +
        `  committed ${rc.committedFor ?? '-'}  completed ${rc.completedDate}  +${rc.completionVarianceWorkdays}wd`,
      );
  }
}

console.log('\nWARNINGS:', warn.length); warn.slice(0, 10).forEach((w) => console.log('  ! ' + w));
console.log('ERRORS  :', err.length); err.forEach((e) => console.log('  X ' + e));
if (err.length) process.exit(1);
