"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  FileText,
  CheckSquare,
  Wand2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dataStore } from "@/lib/store";
import { Campaign, ContentItem, CampaignTask } from "@/types/database";
import { formatDate } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [tasks, setTasks] = useState<CampaignTask[]>([]);

  useEffect(() => {
    setCampaigns(dataStore.getCampaigns(user?.id));
    setContent(dataStore.getContentItems(user?.id));
    setTasks(dataStore.getTasks(user?.id));
  }, [user]);

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const publishedContent = content.filter((c) => c.status === "published").length;

  const handleToggleTask = (id: string) => {
    dataStore.toggleTaskStatus(id);
    setTasks(dataStore.getTasks(user?.id));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Workspace Live
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Welcome back, {user?.displayName || "Creator"}!
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You have <span className="text-primary font-bold">{activeCampaigns} active campaigns</span> and{" "}
            <span className="text-foreground font-semibold">{pendingTasks} pending tasks</span> to execute this week.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/ai-studio"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-600 transition-colors shadow-sm"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Generate with AI Studio
            </Link>
            <Link
              href="/dashboard/campaigns"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Total Campaigns</span>
            <Layers className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{campaigns.length}</div>
          <p className="text-[11px] text-muted-foreground">{activeCampaigns} currently active</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Content Pipeline</span>
            <FileText className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{content.length}</div>
          <p className="text-[11px] text-muted-foreground">{publishedContent} published live</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Pending Tasks</span>
            <CheckSquare className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{pendingTasks}</div>
          <p className="text-[11px] text-muted-foreground">{tasks.length - pendingTasks} completed</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Cadence Consistency</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">94%</div>
          <p className="text-[11px] text-emerald-500 font-medium">On-track for Q4 goals</p>
        </div>
      </div>

      {/* Two Column Grid: Active Campaigns & Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Campaigns Column */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Active Campaigns
            </h2>
            <Link
              href="/dashboard/campaigns"
              className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {campaigns.slice(0, 3).map((camp) => (
              <div
                key={camp.id}
                className="p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="font-semibold text-sm text-foreground">{camp.name}</h3>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                      camp.status === "active"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                  {camp.objective}
                </p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
                  <span>Audience: {camp.target_audience}</span>
                  <span>{formatDate(camp.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Tasks Column */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-amber-500" /> Action Items & Tasks
            </h2>
            <Link
              href="/dashboard/tasks"
              className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className="p-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      task.status === "completed"
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-border group-hover:border-primary"
                    }`}
                  >
                    {task.status === "completed" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span
                    className={`text-xs ${
                      task.status === "completed"
                        ? "line-through text-muted-foreground"
                        : "text-foreground font-medium"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {task.due_date && (
                  <span className="text-[10px] text-muted-foreground font-mono shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {task.due_date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
