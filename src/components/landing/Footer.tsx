"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/40 backdrop-blur-sm pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-foreground">
                CreatorFlow<span className="text-primary font-black ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The purpose-built workspace for creators, indie builders, and social teams to plan campaigns and produce audience-matched content with verified AI.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground pt-1">
              <a
                href="https://github.com/maheswari9080/Datheon_Vibe_Coding_Mastery_-_Capstone_Project"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Campaign Management
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-foreground transition-colors">
                  AI Content Studio
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-foreground transition-colors">
                  Multi-Channel Pipeline
                </a>
              </li>
              <li>
                <a href="#usecases" className="hover:text-foreground transition-colors">
                  Creator Templates
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <span className="hover:text-foreground cursor-pointer">Solopreneurs & Freelancers</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">Digital Marketing Agencies</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">YouTube & TikTok Creators</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">B2B SaaS Growth Marketers</span>
              </li>
            </ul>
          </div>

          {/* Security & Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <span className="inline-flex items-center gap-1.5 text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Supabase PostgreSQL + RLS
                </span>
              </li>
              <li>Next.js 15 App Router + RSC</li>
              <li>Server-Side AI Secrets Isolation</li>
              <li>Vercel Edge-Optimized Deployment</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>
            © {new Date().getFullYear()} CreatorFlow AI. All rights reserved. Built with the TITAN + FUSION frameworks.
          </p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
