"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Video, Building2, CheckCircle2 } from "lucide-react";

const PERSONAS = [
  {
    id: "students",
    label: "Students & Grads",
    icon: <GraduationCap className="w-4 h-4" />,
    title: "Break Into Tech with High-Signal Proof of Work",
    tagline: "Turn your class projects and self-taught code into compelling LinkedIn and X case studies.",
    benefits: [
      "Explain complex technical code in accessible, recruiter-friendly language",
      "Generate concise X/Twitter threads documenting your build journey",
      "Establish consistent personal branding before graduating",
      "Save 10+ hours per week while balancing classes and exams",
    ],
    example: {
      type: "Portfolio Launch Thread",
      preview: "I built a full-stack Next.js 15 SaaS with Supabase RLS in 48 hours. Here are the 5 architectural lessons I learned the hard way:",
    },
  },
  {
    id: "freelancers",
    label: "Freelancers & Consultants",
    icon: <Briefcase className="w-4 h-4" />,
    title: "Attract High-Ticket Retainers Inbound",
    tagline: "Demonstrate expertise and client ROI through educational breakdowns and client kickoff templates.",
    benefits: [
      "Eliminate manual proposal copywriting with structured campaign frameworks",
      "Position yourself as a specialized authority instead of a commodity",
      "Multi-platform repurposing for LinkedIn thought leadership and newsletters",
      "Track publishing status directly against client deliverables",
    ],
    example: {
      type: "Client Case Study Breakdown",
      preview: "How we increased our client's onboarding conversion by 34% with an interactive wizard and Supabase authentication.",
    },
  },
  {
    id: "creators",
    label: "Content Creators",
    icon: <Video className="w-4 h-4" />,
    title: "Repurpose One Core Idea Across 5 Platforms",
    tagline: "Transform a single video outline into a Twitter thread, newsletter draft, and Instagram carousel in seconds.",
    benefits: [
      "Zero prompt-engineering fatigue with structured output schemas",
      "Tone customization matching personal style (Witty, Inspiring, Deep-Dive)",
      "Never miss publishing days with integrated campaign task checklists",
      "Own your library with direct PostgreSQL data exports",
    ],
    example: {
      type: "Multi-Platform Repurposing",
      preview: "1 Long-form YouTube Script ➔ 1 LinkedIn Post + 1 Twitter Thread + 1 IG Caption + 5 Action Items.",
    },
  },
  {
    id: "founders",
    label: "Founders & Small Biz",
    icon: <Building2 className="w-4 h-4" />,
    title: "Build in Public and Convert Followers into Paid Users",
    tagline: "Drive product adoption without hiring an expensive social media agency.",
    benefits: [
      "Communicate feature updates, release notes, and milestone wins cleanly",
      "Craft compelling call-to-actions that drive qualified signups",
      "Maintain a unified content calendar for marketing and engineering teams",
      "Secure user data with bank-grade tenant isolation",
    ],
    example: {
      type: "Product Launch Announcement",
      preview: "We just crossed 5,000 active users on CreatorFlow AI! Here is what we learned building with Next.js 15 and Supabase:",
    },
  },
];

export function UseCases() {
  const [activeTab, setActiveTab] = useState(0);
  const current = PERSONAS[activeTab];

  return (
    <section id="usecases" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Engineered for Anyone with Ideas to Share
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Whether you are launching your first freelance portfolio or scaling an indie SaaS business, CreatorFlow adapts to your goals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {PERSONAS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === idx
                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-102"
                : "bg-card/60 border-border text-foreground hover:bg-secondary"
            }`}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="p-8 sm:p-10 rounded-2xl border border-border bg-card shadow-lg max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 inline-block">
            {current.label} Playbook
          </span>
          <h3 className="text-2xl font-bold text-foreground mb-3">{current.title}</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {current.tagline}
          </p>

          <ul className="space-y-3">
            {current.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mock Preview Card for Persona */}
        <div className="p-6 rounded-xl border border-border bg-secondary/50 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-primary">{current.example.type}</span>
            <span className="px-2 py-0.5 rounded-md bg-background text-[11px] font-mono text-muted-foreground border border-border">
              CreatorFlow Output
            </span>
          </div>

          <p className="text-xs sm:text-sm text-foreground/90 italic font-serif leading-relaxed border-l-2 border-primary pl-3">
            &ldquo;{current.example.preview}&rdquo;
          </p>

          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Platform Calibrated</span>
            <span className="text-emerald-500 font-medium">98% Audience Relevance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
