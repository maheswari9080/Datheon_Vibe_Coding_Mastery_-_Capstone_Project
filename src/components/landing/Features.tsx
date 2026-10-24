"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Kanban,
  CheckSquare,
  ShieldCheck,
  Zap,
  Target,
  Share2,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Layers className="w-6 h-6 text-violet-500" />,
    title: "Campaign Management Hub",
    description:
      "Group content into structured campaigns with clear target audiences, commercial objectives, and delivery timelines instead of disconnected posts.",
    badge: "Core Architecture",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
    title: "AI Content Studio",
    description:
      "Generate platform-native copy for LinkedIn, X/Twitter, Instagram, YouTube, and Blogs. Delivers hooks, body drafts, CTAs, and SEO hashtags.",
    badge: "AI Powered",
  },
  {
    icon: <Target className="w-6 h-6 text-rose-500" />,
    title: "Audience Alignment Engine",
    description:
      "Every generated piece provides transparent reasoning on why the tone, length, and call-to-action resonate with your designated demographic.",
    badge: "Explainable AI",
  },
  {
    icon: <Kanban className="w-6 h-6 text-emerald-500" />,
    title: "Publishing Status Pipeline",
    description:
      "Track every idea from inception through to publication. Move seamlessly across Idea, Draft, In Review, Scheduled, and Published statuses.",
    badge: "Workflow Control",
  },
  {
    icon: <CheckSquare className="w-6 h-6 text-amber-500" />,
    title: "Campaign Task Checklist",
    description:
      "Never miss a launch deadline. Link actionable production tasks directly to individual campaigns with due dates and completion tracking.",
    badge: "Task Management",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-cyan-500" />,
    title: "Supabase RLS Data Isolation",
    description:
      "Your ideas and campaigns belong exclusively to you. Built on PostgreSQL Row-Level Security ensuring zero cross-tenant data leakage.",
    badge: "Bank-Grade Security",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          <Zap className="w-3.5 h-3.5" /> Purpose-Built Platform
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Everything You Need to Run Content Like a Media Company
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          No fragmented browser tabs. CreatorFlow integrates strategy, generation, and execution into one intuitive operating system.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="p-7 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-secondary/80 border border-border group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                  {f.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60 flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Explore capability &rarr;
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
