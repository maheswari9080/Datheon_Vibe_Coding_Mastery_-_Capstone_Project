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
  Edit2,
  X,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dataStore } from "@/lib/store";
import { ContentItem, ContentStatus, ContentPlatform, ContentType, Campaign } from "@/types/database";
import { formatDate } from "@/lib/utils";

export default function ContentPlannerPage() {
  const { user } = useAuth();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [platform, setPlatform] = useState<ContentPlatform>("linkedin");
  const [contentType, setContentType] = useState<ContentType>("post");
  const [tone, setTone] = useState("Professional");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [formError, setFormError] = useState("");

  const refreshList = () => {
    setContentItems(dataStore.getContentItems(user?.id));
    setCampaigns(dataStore.getCampaigns(user?.id));
  };

  useEffect(() => {
    refreshList();
  }, [user]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setTitle("");
    setBody("");
    setPlatform("linkedin");
    setContentType("post");
    setTone("Professional");
    setSelectedCampaignId(campaigns[0]?.id || "");
    setStatus("draft");
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ContentItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setBody(item.body);
    setPlatform(item.platform);
    setContentType(item.content_type);
    setTone(item.tone);
    setSelectedCampaignId(item.campaign_id || "");
    setStatus(item.status);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Please enter a title.");
      return;
    }
    if (!body.trim()) {
      setFormError("Please enter content text.");
      return;
    }

    dataStore.saveContentItem({
      id: editingItem?.id,
      user_id: user?.id || "cf-user-001-demo",
      campaign_id: selectedCampaignId || null,
      title: title.trim(),
      body: body.trim(),
      platform,
      content_type: contentType,
      tone,
      status,
      metadata: editingItem?.metadata || null,
    });

    setIsModalOpen(false);
    refreshList();
  };

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

  const handleDelete = (id: string, itemTitle: string) => {
    if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
      dataStore.deleteContentItem(id);
      refreshList();
    }
  };

  const getPlatformIcon = (plat: ContentPlatform) => {
    switch (plat) {
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

  const getStatusBadge = (st: ContentStatus) => {
    switch (st) {
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

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Manual Draft
          </button>
          <Link
            href="/dashboard/ai-studio"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-600 transition-colors shadow-md shadow-primary/20"
          >
            <Wand2 className="w-4 h-4" />
            Generate with AI Studio
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 p-4 rounded-2xl border border-border bg-card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
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
              : "Create a manual draft or launch the AI Content Studio."}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-foreground text-xs font-semibold hover:bg-secondary"
            >
              <Plus className="w-3.5 h-3.5" /> Manual Draft
            </button>
            <Link
              href="/dashboard/ai-studio"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-600"
            >
              <Wand2 className="w-3.5 h-3.5" /> Launch AI Studio
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-secondary text-foreground text-xs font-semibold flex items-center gap-1.5 capitalize border border-border">
                      {getPlatformIcon(item.platform)} {item.platform}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {item.content_type}
                    </span>
                  </div>

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
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg border border-border/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    title="Edit draft"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

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

      {/* Manual Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative z-50 w-full max-w-xl bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-2xl animate-fade-in space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {editingItem ? "Edit Content Draft" : "New Content Item"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 5 Lessons from Building with Supabase RLS"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as ContentPlatform)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 capitalize"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">X / Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="blog">Blog</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Format
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as ContentType)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 capitalize"
                  >
                    <option value="post">Post</option>
                    <option value="thread">Thread</option>
                    <option value="script">Video Script</option>
                    <option value="article">Article</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Associated Campaign
                </label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">-- Standalone Item (No Campaign) --</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Draft Content Body
                </label>
                <textarea
                  rows={6}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write or paste your complete content draft here..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none font-sans leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Tone / Style
                  </label>
                  <input
                    type="text"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    placeholder="e.g. Authoritative, Inspiring"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ContentStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 capitalize"
                  >
                    <option value="idea">Idea</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-600 shadow-md shadow-primary/20"
                >
                  {editingItem ? "Update Draft" : "Save Content Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
