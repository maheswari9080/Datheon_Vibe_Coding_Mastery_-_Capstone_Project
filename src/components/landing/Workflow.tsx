"use client";

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  Edit3,
  CalendarCheck,
  ArrowRight,
  Check,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Define Campaign Objective",
    icon: <Compass className="w-5 h-5 text-violet-500" />,
    summary: "Establish your strategic focus before generating random posts.",
    details:
      "Specify your target audience (e.g. 'Early-stage SaaS founders'), desired business goal ('Lead generation for MVP launch'), and timeframe. Grounding your content in a campaign ensures every piece moves the needle.",
  },
  {
    step: "02",
    title: "AI Studio Generation",
    icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
    summary: "Produce structured, platform-calibrated copy in seconds.",
    details:
      "Select your output platform (Twitter thread, LinkedIn post, Instagram caption, or YouTube script), tone, and content topic. The AI generates hooks, drafts, CTAs, and a transparent audience explanation.",
  },
  {
    step: "03",
    title: "Review & Refine Drafts",
    icon: <Edit3 className="w-5 h-5 text-emerald-500" />,
    summary: "Inject your personal voice and save to your persistent library.",
    details:
      "Edit the generated output with zero friction. Save directly into your campaign content items with status tracking from 'Idea' to 'Draft' to 'In Review' in Supabase PostgreSQL.",
  },
  {
    step: "04",
    title: "Publish & Track Milestones",
    icon: <CalendarCheck className="w-5 h-5 text-amber-500" />,
    summary: "Check off campaign tasks and maintain a consistent cadence.",
    details:
      "Attach production tasks with due dates, update publishing status as content goes live, and maintain complete visibility over your publishing pipeline.",
  },
];

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="workflow" className="py-24 bg-card/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" /> End-to-End Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            From Blank Canvas to Published Campaign in 4 Simple Steps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A proven methodology designed to turn sporadic posting into a predictable, high-return growth engine.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
                activeStep === idx
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10 scale-102"
                  : "border-border bg-card/60 hover:bg-secondary/60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-black text-primary px-2 py-0.5 rounded-md bg-primary/10">
                  STEP {s.step}
                </span>
                {s.icon}
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{s.summary}</p>
            </button>
          ))}
        </div>

        {/* Detailed Active Step Card */}
        <div className="p-8 rounded-2xl border border-primary/20 bg-card/90 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Stage {STEPS[activeStep].step} Detailed Breakdown
                </span>
              </div>
              <h4 className="text-2xl font-bold text-foreground">
                {STEPS[activeStep].title}
              </h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {STEPS[activeStep].details}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors"
              >
                Next Workflow Stage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
