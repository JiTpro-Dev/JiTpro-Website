import HomeHero from '../components/home/HomeHero';
import PriorityClaritySection from '../components/home/PriorityClaritySection';
import ReactiveProjectsSection from '../components/home/ReactiveProjectsSection';
import UrgencySection from '../components/home/UrgencySection';
import HomeThesisStatement from '../components/home/HomeThesisStatement';
import WhatJiTproDoesSection from '../components/home/WhatJiTproDoesSection';
import OutcomesSection from '../components/home/OutcomesSection';
import HomeFinalCTA from '../components/home/HomeFinalCTA';

/**
 * The homepage runs one argument end to end:
 *
 *   your project depends on work you don't control
 *   → the problem that stops the field in six months often already exists today
 *   → capacity is finite, so knowing the priority matters more than urgency
 *   → small misses nobody leads compound while your team chases them
 *   → by the time the field feels it, recovery may be the only option
 *   → JiTpro helps you act while there is still time
 *   → start with one project
 *
 * Sections removed in the simplified rebuild — founder, risk transfer, the
 * failure chain, the structural steel example — are preserved in
 * `src/archive/homepage/`, with the whole previous page kept at
 * `src/pages/Home.before-simplified-homepage.tsx`.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-jp-background text-jp-text-primary">
      <HomeHero />
      <PriorityClaritySection />
      <ReactiveProjectsSection />
      <UrgencySection />
      <HomeThesisStatement />
      <WhatJiTproDoesSection />
      <OutcomesSection />
      <HomeFinalCTA />
    </div>
  );
}
