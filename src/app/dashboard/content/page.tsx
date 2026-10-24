"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Trash2,
  Copy,
  Check,
  Wand2,
  Clock,
  Layers,
  Search,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dataStore } from "@/lib/store";
import { ContentItem, ContentStatus, ContentPlatform } from "@/types/database";
import { formatDate } from "@/lib/utils";

export default function ContentPlannerPage() {
  const { user } = useAuth();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const refreshList = () => {
    setContentItems(dataStore.getContentItems(user?.id));
  };

  useEffect(() => {
    refreshList();
  }, [user]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = (id: string, newStatus: ContentStatus) => {
    const item = contentItems.find((c) => c.id === id);
    if (item) {
      dataStore.saveContentItem({
        ...item,
        status: newStatus,
      });
      refreshList();
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      dataStore.deleteContentItem(id);
      refreshList();
    }
  };

  const getPlatformIcon = (platform: ContentPlatform) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-3.5 h-3.5 text-blue-500" />;
      case "twitter":
        return <Twitter className="w-3.5 h-3.5 text-sky-400" />;
      case "instagram":
        return <Instagram className="w-3.5 h-3.5 text-pink-500" />;
      case "youtube":
        return <Youtube className="w-3.5 h-3.5 text-red-500" />;
      case "blog":
        return <Globe className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-primary" />;
    }
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "scheduled":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "review":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "draft":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-secondary text-muted-foreground border-border";
    }
  };

  const filteredItems = contentItems.filter((item) => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || item.platform === platformFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPlatform && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-primary" /> Content Pipeline & Planner
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Track content drafts from initial idea to live publishing across all your social channels.
          </p>
        </div>

        <Link
          href="/dashboard/ai-studio"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-600 transition-colors shadow-md shadow-primary/20 shrink-0"
        >
          <Wand2 className="w-4 h-4" />
          Generate with AI Studio
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 p-4 rounded-2xl border border-border bg-card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["all", "idea", "draft", "review", "scheduled", "published"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === st
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-64">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content drafts..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        {/* Platform sub-filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60 text-xs">
          <span className="text-muted-foreground font-medium text-[11px]">Platform:</span>
          {["all", "twitter", "linkedin", "instagram", "youtube", "blog"].map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatformFilter(plat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors ${
                platformFilter === plat
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Items List / Cards */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-border bg-card/40 space-y-3">
          <FileText className="w-10 h-10 text-muted-foreground/60 mx-auto" />
          <h3 className="text-base font-bold text-foreground">No content items found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {searchQuery || statusFilter !== "all" || platformFilter !== "all"
              ? "No items match your active filters."
              : "Launch the AI Content Studio to craft your first draft in seconds."}
          </p>
          <Link
            href="/dashboard/ai-studio"
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
          >
            <Wand2 className="w-3.5 h-3.5" /> Launch AI Studio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Platform and status header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-secondary text-foreground text-xs font-semibold flex items-center gap-1.5 capitalize border border-border">
                      {getPlatformIcon(item.platform)} {item.platform}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {item.content_type}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value as ContentStatus)}
                    className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    <option value="idea">Idea</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>

                <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed font-sans line-clamp-4 mb-4">
                  {item.body}
                </p>

                {item.metadata?.callToAction && (
                  <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/80 text-[11px] text-foreground mb-3">
                    <span className="font-semibold text-primary">Target CTA: </span>
                    {item.metadata.callToAction}
                  </div>
                )}
              </div>

              {/* Bottom Card Controls */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" /> {formatDate(item.created_at)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item.id, `${item.title}\n\n${item.body}`)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/80 hover:bg-secondary text-foreground transition-colors text-[11px] font-medium"
                    title="Copy content draft"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded-lg border border-border/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
