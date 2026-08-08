import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  FileWarning,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackwardPlannedTimeline from '../components/hero/BackwardPlannedTimeline';
import { ProcurementFailureVideo } from '../components/ProcurementFailureSection';

const chainSteps = [
  'Unresolved answer',
  'Missed release',
  'Lost fabrication window',
  'Late delivery',
  'Field recovery',
];

const solutionSteps = [
  {
    icon: Eye,
    title: 'Expose what is unresolved',
    body: 'Decisions, approvals, assumptions, releases, fabrication windows, and outside constraints are made visible before they become field problems.',
  },
  {
    icon: UserCheck,
    title: 'Show who still owns the answer',
    body: 'JiTpro separates accountability from blame so you can see what has moved onto your project without pretending you control every upstream decision.',
  },
  {
    icon: Clock3,
    title: 'Sequence when it must move',
    body: 'The project works backward from when the field needs each package, so your team can see the date pressure before margin becomes recovery cost.',
  },
];

const outcomes = [
  'Open decisions stop hiding in meetings and memory.',
  'Critical packages are visible before the field is waiting.',
  'Margin exposure is tied to the project, not buried in a generic task list.',
];

const projectSignals = [
  'Selections still moving',
  'Submittals waiting on answers',
  'Approvals consuming float',
  'Long-lead items not released',
  'Delivery dates disconnected from field need',
  'PMs chasing risk from memory',
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-amber-500">
      {children}
    </p>
  );
}

// Per-page-load flag: the hero entrance plays on a fresh load, then stays
// static when the visitor navigates back to the homepage within the same session.
let heroIntroPlayed = false;

const HERO_STAGGER_MS = 70;

// Very light grain over the hero lighting — enough to keep the dark surface
// from reading as flat, not enough to notice on its own.
const HERO_NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Home() {
  const [animateHero] = useState(() => !heroIntroPlayed);
  useEffect(() => {
    heroIntroPlayed = true;
  }, []);

  // Hero copy enters top-down on a 70ms stagger; the last element settles at
  // ~840ms, so everything is readable inside the first second.
  const rise = (step: number) =>
    animateHero
      ? {
          className: 'hero-rise',
          style: { '--hero-delay': `${step * HERO_STAGGER_MS}ms` } as CSSProperties,
        }
      : { className: '', style: undefined };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative isolate overflow-hidden bg-slate-950">
        {/* Lighting, tonal depth and grain. The stack resolves to solid
            slate-950 at the bottom edge so the hand-off to the section below
            has no visible seam. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(78%_58%_at_8%_0%,rgba(51,74,120,0.30),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(52%_48%_at_84%_2%,rgba(245,158,11,0.13),transparent_68%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: `url("${HERO_NOISE}")` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_46%,rgba(2,6,23,0.7)_80%,rgb(2,6,23)_100%)]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(251,191,36,0.32)_26%,rgba(251,191,36,0.5)_52%,transparent)]"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-14 xl:gap-20">
            <div>
              <p
                className={`font-mono text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-amber-400/90 sm:text-xs sm:tracking-[0.26em] ${rise(0).className}`}
                style={rise(0).style}
              >
                Build control before construction
              </p>

              {/* The claim and its explanation are set tight so they read as one
                  continuous thought rather than two stacked blocks. */}
              <h1
                className={`mt-5 font-heading text-[2rem] font-extrabold leading-[1.1] tracking-[-0.022em] text-balance text-slate-50 sm:mt-6 sm:text-[2.75rem] sm:leading-[1.08] lg:text-[3.25rem] xl:text-[3.75rem] xl:leading-[1.06] ${rise(1).className}`}
                style={rise(1).style}
              >
                Every project depends on work you don&apos;t control.
              </h1>
              <p
                className={`mt-2 font-heading text-[1.4375rem] font-semibold leading-[1.22] tracking-[-0.015em] text-balance text-amber-400 sm:mt-2.5 sm:text-[2rem] lg:text-[2.375rem] xl:mt-3 xl:text-[2.75rem] xl:leading-[1.18] ${rise(2).className}`}
                style={rise(2).style}
              >
                Small misses today become expensive recoveries tomorrow.
              </p>

              <p
                className={`mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-slate-300 sm:mt-7 sm:text-[1.1875rem] lg:text-[1.25rem] xl:text-[1.3125rem] ${rise(3).className}`}
                style={rise(3).style}
              >
                JiTpro helps general contractors identify and manage the critical decisions, responsibilities, and commitments that originate across the project team—before those unmanaged dependencies become schedule delays, field recovery, and margin loss.
              </p>

              <div className={`mt-9 sm:mt-10 ${rise(4).className}`} style={rise(4).style}>
                <Link
                  to="/contact/contractor"
                  className="group inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-xl bg-amber-500 px-4 py-4 text-center text-[0.875rem] font-semibold text-slate-950 shadow-[0_12px_30px_-12px_rgba(245,158,11,0.6)] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-[0_20px_44px_-14px_rgba(245,158,11,0.7)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:px-6 sm:text-[0.9375rem]"
                >
                  <span className="[text-wrap:balance]">Start your next project with more control</span>
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="hidden shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 sm:block"
                  />
                </Link>
              </div>
            </div>

            {/* Capped while stacked so the visual stays a companion to the copy
                rather than doubling the hero's height on tablets. */}
            <div
              className={`w-full max-w-[34rem] lg:max-w-none ${rise(2).className}`}
              style={rise(2).style}
            >
              <BackwardPlannedTimeline animate={animateHero} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionLabel>The problem</SectionLabel>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
                Margin disappears when clarity comes too late.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-300">
              <p>
                Most contractors do not lose margin because something failed in the field.
              </p>
              <p>
                They lose it when the field is forced to recover from decisions, approvals, releases, fabrication windows, or deliveries that should have been resolved earlier.
              </p>
              <p>
                And growth makes it worse. The visibility that ran one or two projects out of your head does not stretch to five. Nothing in the field changed—you ran out of room to see everything coming.
              </p>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                <p className="font-heading text-2xl font-semibold leading-snug text-slate-100">You probably do not call it procurement.</p>
                <p className="mt-3 text-slate-300">
                  You call it waiting on design. Waiting on owner selections. Waiting on utility approvals. Waiting on long-lead releases. That is procurement—the path from decision to delivery—and it is running on every one of your projects whether anyone is managing it or not.
                </p>
              </div>
              <p className="font-heading text-2xl font-semibold leading-snug text-slate-100">
                When that path breaks, the schedule absorbs it first. Then the margin does.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionLabel>Why it happens</SectionLabel>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
                Risk transfers before the work begins.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-300">
              <p>
                The moment a project is awarded, unresolved owner decisions, incomplete design, open assumptions, and external constraints begin moving toward you.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {['You may not own the decision.', 'You may not control the design.', 'You may not control the utility, approval, selection, or vendor response.'].map((line) => (
                  <div key={line} className="rounded-xl border border-white/10 bg-slate-950/60 p-4 font-heading text-lg font-semibold leading-snug text-slate-100">
                    {line}
                  </div>
                ))}
              </div>
              <p>
                But once the project starts, the schedule pressure lands on you anyway.
              </p>
              <details className="group rounded-2xl border border-white/10 bg-white/3 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-xl font-semibold text-slate-100">
                  Silent Risk Transfer
                  <span className="text-sm text-amber-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 space-y-4 text-slate-300">
                  <p>
                    Upstream uncertainty becomes downstream responsibility before anyone names it, sequences it, or assigns it a date.
                  </p>
                  <p>
                    JiTpro gives that transferred risk a visible structure so your team can see what has moved onto your plate, who still owns the answer, and when it must be resolved—while there is still time to act.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>How margin becomes recovery</SectionLabel>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
              One missed answer does not stay one missed answer.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              It moves through the project one handoff at a time until recovery starts spending the margin you expected to keep.
            </p>
          </div>

          <div className="mt-14 grid gap-3 lg:grid-cols-5">
            {chainSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                  <span className={`h-2.5 w-2.5 rounded-full ${index < 2 ? 'bg-amber-500' : index < 4 ? 'bg-orange-500' : 'bg-red-500'}`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-100">{step}</h3>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <SectionLabel>You have lived this one</SectionLabel>
            <div className="space-y-4 text-lg leading-8 text-slate-300">
              <p>
                Ongoing design changes keep impacting the structural steel package. You push hard, but the process stalls. Submittals cycle through review after review until the fabricator loses its production slot. Delivery slips eight weeks.
              </p>
              <p>
                Now you&apos;re resequencing trades, expediting steel, paying overtime, and burning management hours just to protect the completion date.
              </p>
              <p>
                The owner insists the steel should have arrived on time. As far as they&apos;re concerned, that&apos;s your responsibility—not theirs.
              </p>
              <p>
                Your original projections showed $255,000 in margin. Recovery for this one procurement package consumed $87,000 of it.
              </p>
              <p className="font-heading text-xl font-semibold leading-snug text-slate-100">
                Nothing failed in the field. The margin was lost the day an unresolved commitment went unmanaged.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm md:p-4">
              <ProcurementFailureVideo />
            </div>
            <p className="mt-4 text-center text-sm text-slate-400">
              Press play to watch a planned procurement schedule meet reality.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionLabel>The JiTpro approach</SectionLabel>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
                Turn hidden risk into a project control plan.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                JiTpro is not a field tool and not another scheduler. It is the layer before execution: one place that holds every critical package&apos;s path from decision to delivery.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                It does not ask you to rebuild your company. It starts with one project and makes the margin threats visible while there is still time to control them.
              </p>
            </div>

            <div className="grid gap-4">
              {solutionSteps.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-slate-800 bg-white/3 p-6">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-slate-100">{item.title}</h3>
                        <p className="mt-2 leading-7 text-slate-400">{item.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>What changes</SectionLabel>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
              Your team stops carrying project risk in their heads.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {outcomes.map((point) => (
              <div key={point} className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
                <CheckCircle2 className="mb-5 text-amber-400" size={24} />
                <p className="text-lg leading-8 text-slate-200">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionLabel>Start where the risk is</SectionLabel>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
              If these are showing up on one upcoming project, start there.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              JiTpro is not a rescue tool. It is the system you put in place before the next project starts absorbing preventable procurement pressure.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <div className="grid gap-3">
              {projectSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-3">
                  <FileWarning className="text-amber-400" size={18} />
                  <span className="text-slate-200">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-950 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
            <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
              <div className="aspect-4/5 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL}assets/team/jeff.jpg`}
                  alt="Jeff Kaufman, Founder of JiTpro"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <SectionLabel>Built by a builder</SectionLabel>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
                &ldquo;JiTpro is the system I wish I&apos;d had 38 years ago.&rdquo;
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Jeff Kaufman has spent 38 years delivering complex construction projects, managing hundreds of millions of dollars in work across luxury residential, hospitality, wineries, and commercial construction. Over those years, one pattern became impossible to ignore: projects were routinely awarded with incomplete information, unresolved owner decisions, and procurement commitments that no one had fully identified or taken control of.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                JiTpro applies a different approach. It identifies every missing decision and commitment at project award, assigns each one to the responsible party with a deadline, and sequences procurement backward from the dates materials are actually needed in the field—giving contractors visibility while they still have time to protect their schedule and margin.
              </p>
              <Link
                to="/founder-story"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300 focus:outline-hidden focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Read Jeff&apos;s story
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-950 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300">
            <ShieldCheck size={28} />
          </div>
          <SectionLabel>Start with one upcoming project</SectionLabel>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-50 md:text-6xl">
            You do not need to change how your whole company works.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Start with the next project. Put its critical packages on one board—what is unresolved, who owns the answer, and when it must move—while there is still time to act on it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact/contractor"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400 focus:outline-hidden focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Protect your next project
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/roles/general-contractors"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/3 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-white/6 focus:outline-hidden focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              See how it works for GCs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
