import { buildItem, type ScheduleItem, type StepSpec } from './scheduleModel';

/**
 * The twelve representative procurement items, in project-flow order.
 *
 * EVERY PATH IS DIFFERENT, by instruction and on purpose. The Building Permit
 * runs an agency-review path with no buyout, fabrication, shipping or delivery
 * at all. Tile runs a short owner-selection-and-order path with no shop-drawing
 * cycle. Heritage Steel runs two full review/revision rounds plus a final
 * review and the longest fabrication in the set. Twelve rows that all looked
 * alike would misrepresent how procurement actually behaves.
 *
 * Durations are working days, chosen to be believable for high-end residential
 * construction. Nothing is a pixel width: the Gantt derives every position from
 * the dates these specs produce, so changing a duration here moves the bar and
 * rewrites the inspection popover together.
 */

const P = (
  id: string,
  name: string,
  family: StepSpec['family'],
  days: number,
  org: StepSpec['org'],
  owner: StepSpec['owner'],
  owed: string,
  gap = 1,
): StepSpec => ({ id, name, family, kind: 'phase', days, org, owner, owed, gap });

const M = (
  id: string,
  name: string,
  family: StepSpec['family'],
  org: StepSpec['org'],
  owner: StepSpec['owner'],
  owed: string,
  gap = 1,
): StepSpec => ({ id, name, family, kind: 'milestone', org, owner, owed, gap });

/* 1 ------------------------------------------------------- Building Permit */
const permit: StepSpec[] = [
  P('pm-1', 'Design Coordination', 'coordination', 15, 'architect', 'JS',
    'Coordinate the permit set across disciplines and resolve open code and zoning questions.'),
  P('pm-2', 'Permit Preparation', 'preparation', 10, 'architect', 'JS',
    'Assemble the permit application, drawings, calculations and supporting documents.'),
  M('pm-3', 'Permit Submission', 'preparation', 'architect', 'JS',
    'Submit the complete permit package to the building department.'),
  P('pm-4', 'Agency Review 1', 'review', 30, 'authority', 'LM',
    'Complete first-cycle plan check and return consolidated correction comments.'),
  P('pm-5', 'Corrections', 'revision', 15, 'architect', 'JS',
    'Resolve every plan-check comment and revise the permit set accordingly.'),
  M('pm-6', 'Resubmittal', 'revision', 'architect', 'JS',
    'Return the corrected permit set with a written response to each comment.'),
  P('pm-7', 'Agency Review 2', 'review', 20, 'authority', 'LM',
    'Verify the corrections and clear the application for issuance.'),
  M('pm-8', 'Permit Issuance', 'approval', 'authority', 'LM',
    'Issue the building permit.'),
  M('pm-9', 'Required On-Site', 'required', 'gc', 'MO',
    'Permit in hand so the field can start work without an inspection hold.'),
];

/* 2 --------------------------------------- Concrete & Reinforcing Package */
const concrete: StepSpec[] = [
  P('cr-1', 'Buyout', 'buyout', 15, 'gc', 'AW',
    'Scope, negotiate and award the concrete and reinforcing subcontract.'),
  P('cr-2', 'Submittal Coordination', 'coordination', 8, 'concrete', 'RH',
    'Coordinate mix designs, reinforcing details, embeds and accessory requirements.'),
  P('cr-3', 'Submittal Preparation', 'preparation', 10, 'concrete', 'RH',
    'Prepare mix design submittals, reinforcing shop drawings and embed layouts.'),
  M('cr-4', 'Initial Submittal', 'preparation', 'concrete', 'RH',
    'Transmit the complete concrete and reinforcing submittal package.'),
  P('cr-5', 'Structural Review', 'review', 12, 'structural', 'MC',
    'Review mix designs and reinforcing drawings against the structural documents.'),
  P('cr-6', 'Revision', 'revision', 7, 'concrete', 'RH',
    'Incorporate review comments and correct the reinforcing drawings.'),
  M('cr-7', 'Resubmittal', 'revision', 'concrete', 'RH',
    'Return the corrected package for final review.'),
  M('cr-8', 'Approval', 'approval', 'structural', 'MC',
    'Approve the reinforcing and mix design submittals for fabrication.'),
  M('cr-9', 'Release / Order', 'approval', 'gc', 'DB',
    'Release the approved package and authorise material fabrication.'),
  P('cr-10', 'Reinforcing Fabrication / Material Preparation', 'production', 20, 'concrete', 'RH',
    'Cut, bend and bundle reinforcing and stage embeds and accessories for delivery.'),
  M('cr-11', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver reinforcing, embeds and accessories to the site.'),
  M('cr-12', 'Required On-Site', 'required', 'gc', 'MO',
    'Reinforcing and embeds on site so foundation placement can proceed.'),
];

/* 3 ------------------------------------------------ Structural Steel Package */
const steel: StepSpec[] = [
  P('ss-1', 'Buyout', 'buyout', 20, 'gc', 'AW',
    'Scope, negotiate and award the structural steel subcontract.'),
  P('ss-2', 'Detailed Coordination', 'coordination', 15, 'steel', 'TW',
    'Coordinate connections, framing interfaces and embed locations with the structural documents.'),
  P('ss-3', 'Shop Drawing Preparation', 'preparation', 25, 'steel', 'TW',
    'Produce erection drawings, connection details and piece drawings for review.'),
  M('ss-4', 'Initial Submittal', 'preparation', 'steel', 'TW',
    'Transmit the complete structural steel shop drawing package.'),
  P('ss-5', 'Structural Review 1', 'review', 15, 'structural', 'MC',
    'Review connections and member sizes and return coordinated comments.'),
  P('ss-6', 'Revision 1', 'revision', 10, 'steel', 'TW',
    'Correct the detailing to resolve every first-cycle review comment.'),
  M('ss-7', 'Resubmittal 1', 'revision', 'steel', 'TW',
    'Return corrected shop drawings with a response to each comment.'),
  P('ss-8', 'Structural Review 2', 'review', 10, 'structural', 'MC',
    'Verify the corrections and confirm the package is ready for approval.'),
  M('ss-9', 'Approval', 'approval', 'structural', 'MC',
    'Approve the structural steel shop drawings.'),
  M('ss-10', 'Release for Fabrication', 'approval', 'gc', 'DB',
    'Release the approved drawings and authorise fabrication to begin.'),
  P('ss-11', 'Fabrication', 'production', 45, 'steel', 'TW',
    'Fabricate, weld and prime all structural steel members and connection assemblies.'),
  P('ss-12', 'Shipping', 'logistics', 8, 'logistics', 'CB',
    'Load and transport the fabricated steel in erection sequence.'),
  M('ss-13', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver steel to the site in the sequence the erector needs it.'),
  M('ss-14', 'Required On-Site', 'required', 'gc', 'MO',
    'Steel on site so erection can begin on schedule.'),
];

/* 4 -------------------------------- Lumber & Engineered Framing Package */
const framing: StepSpec[] = [
  P('lf-1', 'Buyout', 'buyout', 12, 'gc', 'AW',
    'Scope, negotiate and award the framing material package.'),
  P('lf-2', 'Framing / Engineering Coordination', 'coordination', 12, 'lumber', 'ED',
    'Coordinate LVL, glulam and engineered beam sizing with the structural drawings.'),
  P('lf-3', 'Package Preparation', 'preparation', 10, 'lumber', 'ED',
    'Prepare the framing package: engineered member schedules, hangers, connectors and hardware.'),
  P('lf-4', 'Review', 'review', 10, 'structural', 'MC',
    'Review engineered member selections and connector schedules against the structural design.'),
  P('lf-5', 'Revision if required', 'revision', 5, 'lumber', 'ED',
    'Adjust member sizing and hardware selections to match the reviewed design.'),
  M('lf-6', 'Approval', 'approval', 'structural', 'MC',
    'Approve the engineered framing package for order.'),
  M('lf-7', 'Release / Order', 'approval', 'gc', 'DB',
    'Place the framing material order against the approved package.'),
  P('lf-8', 'Supplier Preparation', 'production', 25, 'lumber', 'ED',
    'Mill, cut and stage dimensional lumber, engineered members, hangers and framing hardware.'),
  M('lf-9', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the framing package to the site in framing sequence.'),
  M('lf-10', 'Required On-Site', 'required', 'gc', 'MO',
    'Framing material on site so the framing crew can start.'),
];

/* 5 -------------------- Heritage Steel Windows & Exterior Doors (longest) */
const heritage: StepSpec[] = [
  P('hw-1', 'Buyout', 'buyout', 20, 'gc', 'AW',
    'Scope, negotiate and award the custom steel window and exterior door package.'),
  P('hw-2', 'Detailed Design Coordination', 'coordination', 25, 'heritage', 'PN',
    'Coordinate opening sizes, sightlines, thermal performance and structural attachment with the architect.'),
  P('hw-3', 'Shop Drawing Preparation', 'preparation', 30, 'heritage', 'PN',
    'Produce elevation, section and jamb detail shop drawings for every opening.'),
  M('hw-4', 'Initial Submittal', 'preparation', 'heritage', 'PN',
    'Transmit the complete steel window and door shop drawing package.'),
  P('hw-5', 'Architect Review 1', 'review', 15, 'architect', 'JS',
    'Review sightlines, profiles and detailing against the design intent and return comments.'),
  P('hw-6', 'Revision 1', 'revision', 12, 'heritage', 'PN',
    'Revise the shop drawings to resolve first-cycle architectural comments.'),
  M('hw-7', 'Resubmittal 1', 'revision', 'heritage', 'PN',
    'Return the first revised package with a response to each comment.'),
  P('hw-8', 'Architect Review 2', 'review', 12, 'architect', 'JS',
    'Review the revised window shop drawings and either approve them or return coordinated comments.'),
  P('hw-9', 'Revision 2', 'revision', 10, 'heritage', 'PN',
    'Resolve the remaining second-cycle comments on jamb and head conditions.'),
  M('hw-10', 'Resubmittal 2', 'revision', 'heritage', 'PN',
    'Return the second revised package for final review.'),
  P('hw-11', 'Final Review', 'review', 8, 'architect', 'JS',
    'Confirm all comments are resolved and the package is ready for approval.'),
  M('hw-12', 'Approval', 'approval', 'architect', 'JS',
    'Approve the steel window and exterior door shop drawings.'),
  M('hw-13', 'Release for Fabrication', 'approval', 'gc', 'DB',
    'Release the approved package and authorise fabrication.'),
  P('hw-14', 'Fabrication', 'production', 70, 'heritage', 'PN',
    'Fabricate, glaze and finish every custom steel window and exterior door unit.'),
  P('hw-15', 'Shipping', 'logistics', 15, 'logistics', 'CB',
    'Crate and transport the finished units without damage to finished surfaces.'),
  M('hw-16', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the window and door units to the site.'),
  M('hw-17', 'Required On-Site', 'required', 'gc', 'MO',
    'Windows and exterior doors on site so the building can be closed in.'),
];

/* 6 ------------------ Electrical Switchgear & Distribution Equipment */
const switchgear: StepSpec[] = [
  P('sw-1', 'Buyout', 'buyout', 15, 'gc', 'AW',
    'Scope, negotiate and award the switchgear and distribution equipment package.'),
  P('sw-2', 'Electrical Coordination', 'coordination', 12, 'electrical', 'NR',
    'Coordinate service size, distribution layout and equipment clearances with the design.'),
  P('sw-3', 'Submittal Preparation', 'preparation', 15, 'switchgear', 'VS',
    'Prepare equipment submittals, one-line diagrams and dimensional drawings.'),
  M('sw-4', 'Initial Submittal', 'preparation', 'switchgear', 'VS',
    'Transmit the switchgear and distribution equipment submittal.'),
  P('sw-5', 'Electrical Engineer Review', 'review', 12, 'electrical', 'NR',
    'Review ratings, breaker schedules and clearances against the electrical design.'),
  P('sw-6', 'Revision', 'revision', 8, 'switchgear', 'VS',
    'Correct the equipment submittal to match the reviewed requirements.'),
  M('sw-7', 'Resubmittal', 'revision', 'switchgear', 'VS',
    'Return the corrected equipment submittal.'),
  M('sw-8', 'Approval', 'approval', 'electrical', 'NR',
    'Approve the switchgear and distribution equipment for manufacture.'),
  M('sw-9', 'Release / Order', 'approval', 'gc', 'DB',
    'Place the equipment order against the approved submittal.'),
  P('sw-10', 'Manufacturing', 'production', 60, 'switchgear', 'VS',
    'Manufacture and factory-test the switchgear and distribution equipment.'),
  P('sw-11', 'Shipping', 'logistics', 10, 'logistics', 'CB',
    'Transport the equipment with the rigging and access requirements confirmed.'),
  M('sw-12', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the equipment to the site.'),
  M('sw-13', 'Required On-Site', 'required', 'gc', 'MO',
    'Switchgear on site so electrical rough-in and service can proceed.'),
];

/* 7 ---------------------------------------------- Exterior Stone Package */
const stone: StepSpec[] = [
  P('st-1', 'Buyout', 'buyout', 12, 'gc', 'AW',
    'Scope, negotiate and award the exterior stone package.'),
  P('st-2', 'Material Selection Coordination', 'coordination', 15, 'architect', 'JS',
    'Confirm stone type, finish, coursing and blend with the design team and owner.'),
  P('st-3', 'Sample Coordination', 'coordination', 12, 'stone', 'MR',
    'Provide range samples and a control sample representing the approved blend.'),
  P('st-4', 'Shop Drawing / Layout Preparation', 'preparation', 18, 'stone', 'MR',
    'Produce elevation layouts, coursing drawings and anchor details.'),
  M('st-5', 'Initial Submittal', 'preparation', 'stone', 'MR',
    'Transmit the stone layout drawings and samples.'),
  P('st-6', 'Architect Review', 'review', 12, 'architect', 'JS',
    'Review coursing, joint layout and blend against the design intent.'),
  P('st-7', 'Revision', 'revision', 8, 'stone', 'MR',
    'Adjust the layout drawings to resolve review comments.'),
  M('st-8', 'Resubmittal if required', 'revision', 'stone', 'MR',
    'Return the corrected layout for confirmation.'),
  M('st-9', 'Approval', 'approval', 'architect', 'JS',
    'Approve the stone layout, blend and control sample.'),
  P('st-10', 'Material Procurement', 'production', 25, 'stone', 'MR',
    'Secure and reserve quarry block matching the approved control sample.'),
  P('st-11', 'Fabrication', 'production', 30, 'stone', 'MR',
    'Cut, finish and crate the stone to the approved coursing layout.'),
  P('st-12', 'Shipping', 'logistics', 12, 'logistics', 'CB',
    'Transport crated stone with breakage protection.'),
  M('st-13', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the stone to the site staged by elevation.'),
  M('st-14', 'Required On-Site', 'required', 'gc', 'MO',
    'Stone on site so exterior veneer installation can begin.'),
];

/* 8 ------------------------------------------------------- Tile Package */
const tile: StepSpec[] = [
  P('tl-1', 'Buyout', 'buyout', 8, 'gc', 'AW',
    'Scope, negotiate and award the tile package.'),
  P('tl-2', 'Owner Selection Coordination', 'coordination', 20, 'owner', 'EM',
    'Select tile materials, sizes and finishes for every wet area and finish location.'),
  M('tl-3', 'Sample Approval', 'approval', 'owner', 'EM',
    'Approve the tile samples that define the final selection.'),
  P('tl-4', 'Quantity / Layout Coordination', 'coordination', 10, 'tile', 'DE',
    'Confirm quantities, overage, trim pieces and layout for each area.'),
  M('tl-5', 'Order', 'approval', 'gc', 'DB',
    'Place the tile order against the approved selections and quantities.'),
  P('tl-6', 'Supplier Lead Time', 'production', 35, 'tile', 'DE',
    'Produce and allocate the ordered tile from the same production run.'),
  P('tl-7', 'Shipping', 'logistics', 8, 'logistics', 'CB',
    'Transport the tile order to the site.'),
  M('tl-8', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the tile to the site.'),
  M('tl-9', 'Required On-Site', 'required', 'gc', 'MO',
    'Tile on site so setting can begin behind the waterproofing inspection.'),
];

/* 9 ------------------------------------------ Custom Cabinetry & Casework */
const casework: StepSpec[] = [
  P('cw-1', 'Buyout', 'buyout', 15, 'gc', 'AW',
    'Scope, negotiate and award the custom cabinetry and casework package.'),
  P('cw-2', 'Design Coordination', 'coordination', 20, 'interiors', 'RM',
    'Coordinate cabinet layouts, appliance fits, hardware and finish intent.'),
  P('cw-3', 'Shop Drawing Preparation', 'preparation', 25, 'casework', 'NA',
    'Produce elevation and section shop drawings for every cabinet run.'),
  M('cw-4', 'Initial Submittal', 'preparation', 'casework', 'NA',
    'Transmit the casework shop drawing package.'),
  P('cw-5', 'Architect Review 1', 'review', 12, 'architect', 'JS',
    'Review cabinet elevations, reveals and hardware against the design intent.'),
  P('cw-6', 'Revision', 'revision', 10, 'casework', 'NA',
    'Revise the shop drawings to resolve review comments.'),
  M('cw-7', 'Resubmittal', 'revision', 'casework', 'NA',
    'Return the revised casework package.'),
  M('cw-8', 'Final Approval', 'approval', 'architect', 'JS',
    'Approve the casework shop drawings for fabrication.'),
  M('cw-9', 'Finish Sample Approval', 'approval', 'owner', 'EM',
    'Approve the final casework finish, colour and sheen on a control sample.'),
  M('cw-10', 'Release for Fabrication', 'approval', 'gc', 'DB',
    'Release the approved drawings and finish and authorise fabrication.'),
  P('cw-11', 'Fabrication', 'production', 50, 'casework', 'NA',
    'Fabricate and finish all custom cabinetry and casework.'),
  M('cw-12', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver finished casework to the site under climate-controlled conditions.'),
  M('cw-13', 'Required On-Site', 'required', 'gc', 'MO',
    'Casework on site so installation can follow finished flooring.'),
];

/* 10 ------------------------------------------- Plumbing Fixture Package */
const plumbing: StepSpec[] = [
  P('pl-1', 'Buyout', 'buyout', 8, 'gc', 'AW',
    'Scope, negotiate and award the plumbing fixture package.'),
  P('pl-2', 'Owner Selection Coordination', 'coordination', 25, 'owner', 'EM',
    'Select fixtures, fittings and finishes for every plumbing location.'),
  P('pl-3', 'Fixture Schedule Coordination', 'coordination', 12, 'interiors', 'RM',
    'Assemble the fixture schedule and confirm rough-in requirements for each selection.'),
  M('pl-4', 'Initial Submittal', 'preparation', 'plumbing', 'GK',
    'Transmit the fixture submittal with cut sheets and rough-in dimensions.'),
  P('pl-5', 'Architect / Designer Review', 'review', 10, 'interiors', 'RM',
    'Review the fixture schedule against the selections and confirm finishes.'),
  M('pl-6', 'Approval', 'approval', 'architect', 'JS',
    'Approve the plumbing fixture schedule.'),
  M('pl-7', 'Order', 'approval', 'gc', 'DB',
    'Place the fixture order against the approved schedule.'),
  P('pl-8', 'Supplier Lead Time', 'production', 40, 'plumbing', 'GK',
    'Allocate and stage the ordered fixtures and fittings.'),
  P('pl-9', 'Shipping', 'logistics', 10, 'logistics', 'CB',
    'Transport the fixtures to the site.'),
  M('pl-10', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the fixtures to the site.'),
  M('pl-11', 'Required On-Site', 'required', 'gc', 'MO',
    'Fixtures on site so plumbing trim-out can proceed.'),
];

/* 11 -------------------------------------- Custom Interior Door Package */
const intdoors: StepSpec[] = [
  P('id-1', 'Buyout', 'buyout', 12, 'gc', 'AW',
    'Scope, negotiate and award the custom interior door package.'),
  P('id-2', 'Door / Hardware Coordination', 'coordination', 15, 'doors', 'RP',
    'Coordinate door sizes, cores, hardware sets and swing directions with the door schedule.'),
  P('id-3', 'Shop Drawing Preparation', 'preparation', 20, 'doors', 'RP',
    'Produce door elevations, frame profiles and hardware mounting details.'),
  M('id-4', 'Initial Submittal', 'preparation', 'doors', 'RP',
    'Transmit the interior door and hardware submittal.'),
  P('id-5', 'Architect Review', 'review', 12, 'architect', 'JS',
    'Review door profiles, panel proportions and hardware against the design intent.'),
  P('id-6', 'Revision', 'revision', 8, 'doors', 'RP',
    'Correct the door drawings and hardware sets to resolve comments.'),
  M('id-7', 'Resubmittal', 'revision', 'doors', 'RP',
    'Return the corrected door and hardware package.'),
  M('id-8', 'Approval', 'approval', 'architect', 'JS',
    'Approve the interior door and hardware submittal.'),
  M('id-9', 'Finish Approval', 'approval', 'owner', 'EM',
    'Approve the final door finish on a representative sample.'),
  M('id-10', 'Release for Fabrication', 'approval', 'gc', 'DB',
    'Release the approved package and authorise door fabrication.'),
  P('id-11', 'Fabrication', 'production', 45, 'doors', 'RP',
    'Fabricate, finish and pre-fit the custom interior doors and frames.'),
  M('id-12', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the doors to the site after the building is dried in.'),
  M('id-13', 'Required On-Site', 'required', 'gc', 'MO',
    'Doors on site so interior door installation can begin.'),
];

/* 12 ------------------------------------------ Decorative Lighting Package */
const lighting: StepSpec[] = [
  P('dl-1', 'Buyout', 'buyout', 10, 'gc', 'AW',
    'Scope, negotiate and award the decorative lighting package.'),
  P('dl-2', 'Owner / Designer Selection Coordination', 'coordination', 30, 'owner', 'EM',
    'Select decorative fixtures for every location with the lighting designer.'),
  P('dl-3', 'Fixture Schedule Coordination', 'coordination', 15, 'lighting', 'CF',
    'Assemble the decorative fixture schedule with mounting, lamping and control requirements.'),
  P('dl-4', 'Submittal Preparation', 'preparation', 12, 'lighting', 'CF',
    'Prepare the decorative fixture submittal with cut sheets and mounting details.'),
  M('dl-5', 'Initial Submittal', 'preparation', 'lighting', 'CF',
    'Transmit the decorative lighting submittal.'),
  P('dl-6', 'Designer / Electrical Review', 'review', 12, 'electrical', 'NR',
    'Review fixture loads, control compatibility and mounting against the electrical design.'),
  P('dl-7', 'Revision', 'revision', 8, 'lighting', 'CF',
    'Correct the fixture schedule and submittal to resolve review comments.'),
  M('dl-8', 'Resubmittal if required', 'revision', 'lighting', 'CF',
    'Return the corrected decorative lighting submittal.'),
  M('dl-9', 'Approval', 'approval', 'lighting', 'CF',
    'Approve the decorative lighting schedule and fixtures.'),
  M('dl-10', 'Order', 'approval', 'gc', 'DB',
    'Place the decorative lighting order against the approved schedule.'),
  P('dl-11', 'Manufacturing / Vendor Lead Time', 'production', 45, 'lighting', 'CF',
    'Manufacture and finish the decorative fixtures to the approved specification.'),
  P('dl-12', 'Shipping', 'logistics', 10, 'logistics', 'CB',
    'Transport the decorative fixtures with finish protection.'),
  M('dl-13', 'Delivery', 'logistics', 'logistics', 'CB',
    'Deliver the fixtures to the site.'),
  M('dl-14', 'Required On-Site', 'required', 'gc', 'MO',
    'Decorative fixtures on site so final lighting installation can complete.'),
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  buildItem('itm-permit', 'Building Permit', 'Permits & Approvals', '2027-01-04', permit),
  buildItem('itm-concrete', 'Concrete & Reinforcing Package', 'Structural', '2027-01-18', concrete),
  buildItem('itm-steel', 'Structural Steel Package', 'Structural', '2027-03-15', steel),
  buildItem('itm-framing', 'Lumber & Engineered Framing Package', 'Structural', '2027-04-05', framing),
  buildItem('itm-heritage', 'Heritage Steel Windows & Exterior Doors', 'Exterior Enclosure', '2027-06-07', heritage),
  buildItem('itm-switchgear', 'Electrical Switchgear & Distribution Equipment', 'Electrical', '2027-07-12', switchgear),
  buildItem('itm-stone', 'Exterior Stone Package', 'Exterior Finishes', '2027-08-09', stone),
  buildItem('itm-tile', 'Tile Package', 'Interior Finishes', '2027-09-13', tile),
  buildItem('itm-casework', 'Custom Cabinetry & Casework', 'Interior Finishes', '2027-10-11', casework),
  buildItem('itm-plumbing', 'Plumbing Fixture Package', 'Plumbing', '2027-10-25', plumbing),
  buildItem('itm-intdoors', 'Custom Interior Door Package', 'Interior Finishes', '2027-11-08', intdoors),
  buildItem('itm-lighting', 'Decorative Lighting Package', 'Electrical', '2027-11-29', lighting),
];

/**
 * ONE at-risk example, set explicitly rather than derived, so the status model
 * is visibly independent of the phase family (a REVIEW phase stays review-red
 * whether it is complete, on track or at risk).
 */
function markAtRisk(itemId: string) {
  const item = SCHEDULE_ITEMS.find((i) => i.id === itemId);
  const step = item?.steps.find((s) => s.status === 'on-track');
  if (step) step.status = 'at-risk';
}
markAtRisk('itm-stone');
markAtRisk('itm-casework');
