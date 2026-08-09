import HomeHero from '../components/home/HomeHero';
import ReactiveProjectsSection from '../components/home/ReactiveProjectsSection';
import UrgencySection from '../components/home/UrgencySection';
import HomeThesisStatement from '../components/home/HomeThesisStatement';
import WhatJiTproDoesSection from '../components/home/WhatJiTproDoesSection';
import OutcomesSection from '../components/home/OutcomesSection';
import ProjectWarningSignsSection from '../components/home/ProjectWarningSignsSection';
import HomeFinalCTA from '../components/home/HomeFinalCTA';

/**
 * The homepage runs one argument end to end:
 *
 *   your project depends on work you don't control
 *   → nobody leads it, so your team chases it
 *   → the time available to fix it is quietly disappearing
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
      <ReactiveProjectsSection />
      <UrgencySection />
      <HomeThesisStatement />
      <WhatJiTproDoesSection />
      <OutcomesSection />
      <ProjectWarningSignsSection />
      <HomeFinalCTA />
    </div>
  );
}
