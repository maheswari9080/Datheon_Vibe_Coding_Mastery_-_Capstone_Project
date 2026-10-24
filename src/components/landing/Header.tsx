"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight, Layers } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-violet-500/25 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            CreatorFlow<span className="text-primary font-black ml-0.5">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#workflow" className="hover:text-foreground transition-colors">
            Workflow
          </a>
          <a href="#preview" className="hover:text-foreground transition-colors">
            Interactive Studio
          </a>
          <a href="#usecases" className="hover:text-foreground transition-colors">
            Use Cases
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Buttons & Theme */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-600 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 active:scale-95"
          >
            Launch Studio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border text-foreground hover:bg-secondary"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-secondary text-foreground"
            >
              Features
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-secondary text-foreground"
            >
              Workflow
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-secondary text-foreground"
            >
              Interactive Studio
            </a>
            <a
              href="#usecases"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-secondary text-foreground"
            >
              Use Cases
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-secondary text-foreground"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2.5 text-sm font-semibold rounded-xl border border-border hover:bg-secondary text-foreground"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="w-full text-center py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground shadow-sm"
            >
              Launch Studio Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
