"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Layers,
  FileText,
  Wand2,
  CheckSquare,
  Users,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, signOut, isConfigured } = useAuth();

  const NAV_ITEMS = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "Campaigns",
      href: "/dashboard/campaigns",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      label: "Content Planner",
      href: "/dashboard/content",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "AI Content Studio",
      href: "/dashboard/ai-studio",
      icon: <Wand2 className="w-4 h-4 text-primary" />,
      badge: "AI",
    },
    {
      label: "Campaign Tasks",
      href: "/dashboard/tasks",
      icon: <CheckSquare className="w-4 h-4" />,
    },
    {
      label: "Inbound Leads",
      href: "/dashboard/leads",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 h-full border-r border-border bg-card/90 backdrop-blur-md flex flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2 pt-2">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-foreground">
              CreatorFlow<span className="text-primary font-black ml-0.5">AI</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Status pill */}
        <div className="px-2">
          <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/50 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <span className={`w-2 h-2 rounded-full ${isConfigured ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
              {isConfigured ? "Supabase PostgreSQL" : "Local Sandbox Store"}
            </span>
            <Shield className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User profile & Sign Out */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center border border-primary/30">
            {user?.displayName?.[0]?.toUpperCase() || "C"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {user?.displayName || "Creator"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-border/80 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 text-muted-foreground text-xs font-medium transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
