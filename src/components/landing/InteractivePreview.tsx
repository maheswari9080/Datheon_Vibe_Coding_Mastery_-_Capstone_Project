"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  RefreshCw,
} from "lucide-react";

interface MockPreview {
  headline: string;
  draft: string;
  cta: string;
  keywords: string[];
}

const PRESET_TOPICS = [
  {
    topic: "Launching our AI Content Planner MVP",
    platform: "LinkedIn",
    tone: "Professional & Inspiring",
    preview: {
      headline: "Stop burning out on content production. Here is how we automated our multi-channel workflow.",
      draft:
        "Creators don't fail from lack of ideas — they fail from lack of execution architecture.\n\nOver the past 6 months, we built CreatorFlow AI to eliminate blank-page paralysis:\n• One-click audience tone matching\n• Unified campaign task tracker\n• Zero generic template slop\n\nAre you still juggling 5 different spreadsheets for your weekly content calendar?",
      cta: "Drop a comment with 'FLOW' and I'll send you our complete planning template.",
      keywords: ["#CreatorEconomy", "#Productivity", "#SaaSLaunch", "#BuildInPublic"],
    },
  },
  {
    topic: "5 High-Income Skills Every Student Can Learn in 2026",
    platform: "Twitter",
    tone: "Action-Oriented",
    preview: {
      headline: "5 high-income digital skills you can learn in 30 days while in university:",
      draft:
        "1. AI Prompt & Workflow Automation (saves teams 10+ hrs/wk)\n2. Technical Copywriting & Audience Hooks\n3. Micro-SaaS Product Prototyping\n4. Database Design (PostgreSQL + RLS)\n5. Video Storyboarding for Short-Form\n\nDegrees get you interviews. Proof of work gets you contracts.",
      cta: "Bookmark this thread and start Skill #1 this weekend.",
      keywords: ["#StudentLife", "#CareerAdvice", "#IndieDev", "#Skills"],
    },
  },
  {
    topic: "Client Onboarding Secrets for Freelance Designers",
    platform: "Instagram",
    tone: "Educational",
    preview: {
      headline: "How I doubled my freelance retention with a 24-hour welcome portal.",
      draft:
        "The first 24 hours of a new client relationship dictate whether they renew or micromanage you.\n\nHere's my 3-step ritual:\n1. Video welcome walkthrough with zero jargon\n2. Shared campaign milestone checklist with clear due dates\n3. Unified assets folder with client guidelines\n\nTransparency creates premium pricing power.",
      cta: "Save this post for your next client kickoff!",
      keywords: ["#FreelanceTips", "#ClientRetention", "#DesignAgency", "#CreatorFlow"],
    },
  },
];

export function InteractivePreview() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const active = PRESET_TOPICS[selectedIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${active.preview.headline}\n\n${active.preview.draft}\n\n${active.preview.cta}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPreset = (idx: number) => {
    setIsSimulating(true);
    setTimeout(() => {
      setSelectedIdx(idx);
      setIsSimulating(false);
    }, 300);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return <Linkedin className="w-4 h-4 text-blue-500" />;
      case "Twitter":
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case "Instagram":
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case "YouTube":
        return <Youtube className="w-4 h-4 text-red-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="preview" className="py-20 bg-muted/40 border-y border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Experience the AI Content Studio Live
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Select a sample content topic below to see how CreatorFlow crafts structured, audience-aligned copy in real-time.
          </p>
        </div>

        {/* Topic selector pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {PRESET_TOPICS.map((p, idx) => (
            <button
              key={p.topic}
              onClick={() => handleSelectPreset(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                selectedIdx === idx
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                  : "bg-card/70 border-border text-foreground hover:bg-secondary"
              }`}
            >
              {getPlatformIcon(p.platform)}
              <span className="truncate max-w-[200px] sm:max-w-none">{p.topic}</span>
            </button>
          ))}
        </div>

        {/* Studio Window Mockup */}
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Window Header */}
          <div className="px-5 py-3.5 border-b border-border bg-secondary/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-muted-foreground ml-2">creatorflow-studio // live-demo</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1">
                {getPlatformIcon(active.platform)} {active.platform}
              </span>
              <span className="text-muted-foreground hidden sm:inline">• Tone: {active.tone}</span>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {isSimulating ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground animate-pulse">
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                <span className="text-sm font-medium">Synthesizing audience draft...</span>
              </div>
            ) : (
              <>
                {/* Headline Card */}
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">
                    Attention Hook / Headline
                  </div>
                  <div className="text-base sm:text-lg font-bold text-foreground">
                    {active.preview.headline}
                  </div>
                </div>

                {/* Draft Content */}
                <div className="p-5 rounded-xl border border-border bg-card/60">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Generated Content Body
                    </span>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-border hover:bg-secondary text-foreground transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line font-sans">
                    {active.preview.draft}
                  </p>

                  {/* Call to action & keywords */}
                  <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Target CTA: </span>
                      {active.preview.cta}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {active.preview.keywords.map((kw) => (
                        <span key={kw} className="px-2 py-0.5 rounded-md bg-secondary text-primary font-mono text-[11px]">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    💡 This is an interactive preview. Sign in to customize audience, format, keywords, and direct campaign saving.
                  </p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-600 transition-colors shadow-sm"
                  >
                    Open Full AI Studio
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
