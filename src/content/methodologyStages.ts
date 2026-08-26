/**
 * The five stages of the JiTpro methodology, as presented on the homepage.
 *
 * This copy is DOCTRINE, not section copy. It is carried verbatim from the
 * homepage's previous methodology implementation and MUST NOT be renamed,
 * reworded, reordered, or trimmed as a side effect of a layout change. A change
 * to a stage name or to what a stage claims to produce is a product decision
 * and needs its own approval.
 *
 * It lives in `src/content/` rather than inside the section because the stages
 * have a second consumer: the methodology figure renders per-stage state keyed
 * on `id`, so the section and the figure must be reading the same list.
 */

export type MethodologyStage = {
  /** Stable key. The figure keys its accumulated state off this, not the index. */
  id: string;
  title: string;
  body: string;
};

export const METHODOLOGY_STAGES: MethodologyStage[] = [
  {
    id: 'scope-validation',
    title: 'Scope Validation',
    body: 'We validate the contractor’s existing scope against the project documentation to determine whether the work required to complete the project has been identified and covered.',
  },
  {
    id: 'scope-gap-analysis',
    title: 'Scope Gap Analysis',
    body: 'We identify missing, unclear, conflicting, or uncovered scope—and the decisions, information, and responsibilities that must be resolved before they become constraints against the schedule.',
  },
  {
    id: 'commitment-capture',
    title: 'Commitment Capture',
    body: 'Required actions are assigned to responsible parties and tracked as Commitments, giving the project team a clear record of what must happen, who owns the next move, and when it is required.',
  },
  {
    id: 'product-register',
    title: 'Product Register',
    body: 'We identify and register the products, materials, and services the project will need, connecting what must arrive on site to the decisions, approvals, and Commitments required to get it there.',
  },
  {
    id: 'backward-scheduling',
    title: 'Backward Scheduling',
    body: 'Starting with when each product, material, or service is required on site, JiTpro works backward to establish the dates for the Commitments that support it.',
  },
];
