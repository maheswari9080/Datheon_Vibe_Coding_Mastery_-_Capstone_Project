"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Play, Flame, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-8 hover:bg-primary/15 transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CreatorFlow 2.0 • AI Campaign & Content Studio</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.12]">
          Stop Staring at Blank Drafts.{" "}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Plan, Generate & Publish
          </span>{" "}
          with Genuine AI.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The purpose-built operating system for students, freelancers, creators, and small businesses. Organize multi-channel campaigns, generate platform-tuned drafts, and track progress — without fluff.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/25 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary/35 transition-all duration-200 active:scale-95"
          >
            Start Creating Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#preview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-foreground font-semibold text-base hover:bg-secondary transition-all duration-200"
          >
            <Play className="w-4 h-4 text-violet-500 fill-violet-500" />
            Try Interactive Studio
          </a>
        </div>

        {/* Trust & Transparency checklist */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Supabase RLS security
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-500" /> Multi-platform formatting
          </span>
        </div>

        {/* Metrics Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-2xl border border-border/80 bg-card/40 backdrop-blur-md">
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground">10x</div>
            <div className="text-xs text-muted-foreground mt-0.5">Faster Content Ideation</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground">5+</div>
            <div className="text-xs text-muted-foreground mt-0.5">Platforms Supported</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground">100%</div>
            <div className="text-xs text-muted-foreground mt-0.5">Isolated User Data</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground">&lt; 2s</div>
            <div className="text-xs text-muted-foreground mt-0.5">AI Response Latency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
