import HomeHero from '../components/home/HomeHero';
import ProblemDetectionSection from '../components/home/ProblemDetectionSection';
import ResponseWindowSection from '../components/home/ResponseWindowSection';
import JiTproTurnSection from '../components/home/JiTproTurnSection';
import MethodologySection from '../components/home/MethodologySection';
import HomeConstructionImage from '../components/home/HomeConstructionImage';
import WhatJiTproDoesSection from '../components/home/WhatJiTproDoesSection';
import OutcomesSection from '../components/home/OutcomesSection';
import HomeFinalCTA from '../components/home/HomeFinalCTA';

/**
 * The homepage is built around the buyer's psychological journey, in three
 * narrative acts.
 *
 *   ACT ONE — the problem, on dark
 *     01 Hero               recognition, and enough orientation to continue
 *     02 Detection          why a capable team finds these conditions late
 *     03 Response window    what late discovery does to the available options
 *
 *   ACT TWO — the answer, on light
 *     04 The JiTpro turn    what JiTpro is, who it is for, what it is for
 *     05 Methodology        the five stages, and the field condition they end in
 *
 *   ACT THREE — trust and action, on dark
 *     06 Trust              the construction experience behind the method
 *     07 Outcome and fit    what changes for the team, and what it asks of them
 *     08 Timing and CTA     at award, during buyout, before mobilization
 *
 * Each section creates the question the next one answers. The backgrounds carry
 * the acts, not a section-by-section alternation.
 *
 * REBUILD IN PROGRESS (beat 3 of 5). Slots 01-05 are built. Slots 06-08 are
 * still served by their pre-rebuild components, mounted here in the target
 * order so the page reads coherently between beats:
 *   05  HomeConstructionImage   -> folds in as the methodology's field terminal
 *   06  WhatJiTproDoesSection   -> is removed; its space becomes trust
 *   07  OutcomesSection         -> gains the operational-fit half it never had
 *
 * Section 05's persistent visual column is a reserved footprint, not a drawing.
 * The accumulating methodology figure that belongs there is beat 4, and
 * `HomeConstructionImage` folds into the same section as its §17.1 terminal
 * field band at that point — it renders below as a standalone dark band only
 * until then.
 *
 * The complete pre-rebuild homepage is preserved at tag
 * `homepage-pre-buyer-journey-rebuild-2026-08-25`.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-jp-background text-jp-text-primary">
      <HomeHero />
      <ProblemDetectionSection />
      <ResponseWindowSection />

      <JiTproTurnSection />
      <MethodologySection />

      <HomeConstructionImage />
      <WhatJiTproDoesSection />
      <OutcomesSection />
      <HomeFinalCTA />
    </div>
  );
}
