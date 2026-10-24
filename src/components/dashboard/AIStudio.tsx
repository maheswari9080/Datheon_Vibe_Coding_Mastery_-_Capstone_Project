"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wand2,
  Sparkles,
  Layers,
  Copy,
  Check,
  Save,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Target,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dataStore } from "@/lib/store";
import {
  ContentPlatform,
  ContentType,
  Campaign,
  AIGenerateResponse,
} from "@/types/database";

export function AIStudio() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const preselectedCampaignId = searchParams.get("campaignId") || "";

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(preselectedCampaignId);

  // Form parameters
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [platform, setPlatform] = useState<ContentPlatform>("linkedin");
  const [contentType, setContentType] = useState<ContentType>("post");
  const [tone, setTone] = useState("Professional & Insightful");
  const [objective, setObjective] = useState("Lead Generation & Authority");
  const [keywords, setKeywords] = useState("");

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AIGenerateResponse | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const list = dataStore.getCampaigns(user?.id);
    setCampaigns(list);

    if (preselectedCampaignId) {
      const match = list.find((c) => c.id === preselectedCampaignId);
      if (match) {
        setSelectedCampaignId(match.id);
        setTargetAudience(match.target_audience);
        setObjective(match.objective);
      }
    } else if (list.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(list[0].id);
      setTargetAudience(list[0].target_audience);
      setObjective(list[0].objective);
    }
  }, [user, preselectedCampaignId]);

  const handleCampaignChange = (cId: string) => {
    setSelectedCampaignId(cId);
    const match = campaigns.find((c) => c.id === cId);
    if (match) {
      setTargetAudience(match.target_audience);
      setObjective(match.objective);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSavedSuccess(false);

    if (!topic.trim()) {
      setError("Please enter a content topic.");
      return;
    }
    if (!targetAudience.trim()) {
      setError("Please define your target audience.");
      return;
    }

    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          targetAudience: targetAudience.trim(),
          platform,
          contentType,
          tone,
          objective,
          keywords: keywords
            ? keywords
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
            : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation request failed.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to generate AI content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `${result.headline}\n\n${result.draft}\n\n${result.callToAction}`
    );
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleSaveToContent = () => {
    if (!result) return;

    dataStore.saveContentItem({
      user_id: user?.id || "cf-user-001-demo",
      campaign_id: selectedCampaignId || null,
      title: result.headline,
      body: result.draft,
      platform,
      content_type: contentType,
      tone,
      status: "draft",
      metadata: {
        callToAction: result.callToAction,
        keywords: result.keywords,
        explanation: result.explanation,
        variations: result.variations,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
          <Wand2 className="w-6 h-6 text-primary" /> AI Content Studio
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Produce audience-calibrated copy across 5 platforms with explainable AI reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Configuration */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-border bg-card space-y-5 shadow-sm">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="w-4 h-4 text-primary" /> Content Parameters
          </h2>

          {error && (
            <div className="p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Link to Campaign (Optional)
              </label>
              <select
                value={selectedCampaignId}
                onChange={(e) => handleCampaignChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">-- Standalone (No Campaign) --</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Content Topic or Core Idea <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 5 security best practices when implementing Supabase RLS in Next.js 15"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Target Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as ContentPlatform)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 capitalize"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">X / Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube Script</option>
                  <option value="blog">Blog Article</option>
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
                  <option value="post">Standard Post</option>
                  <option value="thread">Multi-Post Thread</option>
                  <option value="script">Video Script</option>
                  <option value="article">Long-Form Article</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Target Audience <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Full-stack developers, SaaS founders"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Voice & Tone
              </label>
              <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="e.g. Authoritative, Inspiring, Tactical"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Campaign Objective
              </label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="e.g. Authority building, lead generation"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Specific Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. #Nextjs, Supabase, RLS, WebDev"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full mt-3 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Audience Copy...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Platform Content</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Pane: AI Structured Output */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !isGenerating && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-border bg-card/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">Studio Ready</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                Enter your topic, choose your target platform, and generate calibrated copy structured with hooks, body drafts, CTAs, and audience reasoning.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-border bg-card/60 animate-pulse space-y-4">
              <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto" />
              <h3 className="text-base font-bold text-foreground">AI Reasoning in Progress</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                Analyzing audience demographic, platform tone constraints, and crafting high-retention copy...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-fade-in">
              {/* Output Header Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card">
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Validated Structured Response
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-secondary text-foreground text-xs font-medium transition-colors"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSaveToContent}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-600 transition-colors shadow-sm"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved to Planner!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save to Planner</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Headline */}
              <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-bold text-primary">
                  Hook / Title
                </span>
                <h3 className="text-lg font-bold text-foreground">{result.headline}</h3>
                <p className="text-xs text-muted-foreground">{result.description}</p>
              </div>

              {/* Main Body Draft */}
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Content Draft ({platform})
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary text-primary">
                    {contentType}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line font-sans">
                  {result.draft}
                </div>

                {/* Call To Action */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-secondary/50 text-xs">
                  <span className="font-semibold text-primary">Call to Action: </span>
                  <span className="text-foreground">{result.callToAction}</span>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {result.keywords?.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded-md bg-secondary text-primary font-mono text-[11px]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audience Alignment Rationale */}
              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Target className="w-4 h-4 text-primary" /> Audience Alignment Rationale
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              {/* Variations */}
              {result.variations && result.variations.length > 0 && (
                <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                  <div className="text-xs font-bold text-foreground">
                    Alternative Angle Hooks
                  </div>
                  <ul className="space-y-2">
                    {result.variations.map((v, i) => (
                      <li
                        key={i}
                        className="p-2.5 rounded-lg border border-border/60 bg-secondary/40 text-xs text-foreground/90 font-mono"
                      >
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
