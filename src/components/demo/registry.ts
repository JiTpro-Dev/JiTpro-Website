import type { ComponentType } from 'react';
import CommitmentRegisterScreen from './screens/CommitmentRegisterScreen';

/**
 * The canonical screen registry, keyed by the methodology stage `id` in
 * `src/content/methodologyStages.ts`.
 *
 * This is the seam that makes the next screen additive rather than
 * architectural: adding one means a fixture file, a screen component, and a
 * line here. A stage with no entry keeps its raster, which is how the other
 * four screens continue to render while only the Commitment Register has been
 * migrated.
 */
export type DemoScreenId = 'commitment-capture';

export const DEMO_SCREENS: Record<DemoScreenId, { component: ComponentType }> = {
  'commitment-capture': { component: CommitmentRegisterScreen },
};

export function hasDemoScreen(stageId: string): stageId is DemoScreenId {
  return stageId in DEMO_SCREENS;
}
