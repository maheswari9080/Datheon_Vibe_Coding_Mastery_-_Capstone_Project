"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-xs font-semibold text-muted-foreground">
          Loading CreatorFlow Workspace...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0 shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Top Header */}
      <header className="md:hidden border-b border-border bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg border border-border text-foreground hover:bg-secondary"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight">CreatorFlow</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 bg-card h-full shadow-2xl">
            <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
