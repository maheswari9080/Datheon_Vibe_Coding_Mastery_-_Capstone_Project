"use client";

import { Campaign, ContentItem, CampaignTask, Lead } from "@/types/database";

const LOCAL_STORAGE_KEYS = {
  CAMPAIGNS: "creatorflow_campaigns",
  CONTENT: "creatorflow_content",
  TASKS: "creatorflow_tasks",
  LEADS: "creatorflow_leads",
};

const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-001",
    user_id: "cf-user-001-demo",
    name: "Q4 Micro-SaaS Product Launch",
    objective: "Acquire 500 active beta users via LinkedIn and Twitter build-in-public threads",
    target_audience: "Indie hackers, full-stack engineers, and SaaS founders",
    status: "active",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "camp-002",
    user_id: "cf-user-001-demo",
    name: "Weekly Technical Deep-Dive Newsletter",
    objective: "Establish technical domain authority on AI agents and RLS security architectures",
    target_audience: "Senior developers, software engineering students, and engineering leads",
    status: "active",
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "camp-003",
    user_id: "cf-user-001-demo",
    name: "Student Dev Career Kickstart",
    objective: "Share interview prep breakdowns and portfolio guides for new grads",
    target_audience: "Computer science university students and bootcamp grads",
    status: "planning",
    created_at: new Date(Date.now() - 21 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SEED_CONTENT: ContentItem[] = [
  {
    id: "cont-001",
    user_id: "cf-user-001-demo",
    campaign_id: "camp-001",
    title: "Why Most AI Wrappers Fail vs Genuine Micro-SaaS",
    body: "The difference between a thin wrapper and an enduring SaaS is workflow context.\n\nThin wrappers give you a raw prompt input and paste generic AI text.\nEnduring products integrate:\n1. Campaign persistence\n2. Status pipelines\n3. Explainable audience rationale",
    platform: "linkedin",
    content_type: "post",
    tone: "Analytical & Authoritative",
    status: "scheduled",
    metadata: {
      callToAction: "What feature turns an AI tool into an indispensable daily workflow for you?",
      keywords: ["#SaaS", "#SoftwareArchitecture", "#AIProduct"],
      explanation: "Targets technical founders looking for architectural depth rather than marketing hype.",
      variations: [
        "Are you building an AI wrapper or an actual software operating system?",
        "3 architectural layers every production AI SaaS must implement.",
      ],
    },
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cont-002",
    user_id: "cf-user-001-demo",
    campaign_id: "camp-001",
    title: "10 Lessons from Deploying Next.js 15 with Supabase RLS",
    body: "1. Always enforce database-level policies rather than trusting API middleware.\n2. Foreign key verification prevents cross-tenant leaks.\n3. Server actions must isolate provider keys completely.\n4. Design for offline/demo resilience.",
    platform: "twitter",
    content_type: "thread",
    tone: "Direct & Practical",
    status: "published",
    metadata: {
      callToAction: "Retweet the top tweet if you deploy with Supabase!",
      keywords: ["#Nextjs", "#Supabase", "#WebDev"],
      explanation: "Appeals to developers seeking concise, actionable production tips.",
    },
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cont-003",
    user_id: "cf-user-001-demo",
    campaign_id: "camp-002",
    title: "How to Build Explainable AI into Content Planning",
    body: "When AI generates copy, users want to know WHY it chose that tone, CTA, and hook.\n\nProviding transparent rationale builds user trust and makes AI output actionable.",
    platform: "blog",
    content_type: "article",
    tone: "Educational",
    status: "draft",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SEED_TASKS: CampaignTask[] = [
  {
    id: "task-001",
    user_id: "cf-user-001-demo",
    campaign_id: "camp-001",
    title: "Record 2-minute demo video walkthrough for LinkedIn launch",
    status: "completed",
    due_date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-002",
    user_id: "cf-user-001-demo",
    campaign_id: "camp-001",
    title: "Schedule launch day X/Twitter announcement thread",
    status: "pending",
    due_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-003",
    user_id: "cf-user-001-demo",
    campaign_id: "camp-002",
    title: "Outline newsletter issue #14 on prompt engineering vs RAG",
    status: "pending",
    due_date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SEED_LEADS: Lead[] = [
  {
    id: "lead-001",
    name: "Elena Rostova",
    email: "elena@creatorstudio.io",
    message: "Interested in the enterprise agency multi-seat tier for our 12 creators.",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "lead-002",
    name: "Marcus Vance",
    email: "marcus@indiegrowth.co",
    message: "Loved the landing page demo. Would like to connect regarding custom API integrations.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const dataStore = {
  // CAMPAIGNS
  getCampaigns(userId?: string): Campaign[] {
    if (typeof window === "undefined") return SEED_CAMPAIGNS;
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.CAMPAIGNS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CAMPAIGNS, JSON.stringify(SEED_CAMPAIGNS));
      return SEED_CAMPAIGNS;
    }
    try {
      const parsed: Campaign[] = JSON.parse(raw);
      return userId ? parsed.filter((c) => c.user_id === userId || c.user_id === "cf-user-001-demo") : parsed;
    } catch {
      return SEED_CAMPAIGNS;
    }
  },

  saveCampaign(campaign: Omit<Campaign, "id" | "created_at" | "updated_at"> & { id?: string }): Campaign {
    const list = this.getCampaigns();
    const now = new Date().toISOString();
    let saved: Campaign;

    if (campaign.id) {
      // update
      list.forEach((item, idx) => {
        if (item.id === campaign.id) {
          list[idx] = { ...item, ...campaign, updated_at: now };
          saved = list[idx];
        }
      });
      saved = saved! || { ...campaign, id: campaign.id, created_at: now, updated_at: now };
    } else {
      // create
      saved = {
        ...campaign,
        id: "camp-" + Math.random().toString(36).substring(2, 9),
        created_at: now,
        updated_at: now,
      };
      list.unshift(saved);
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.CAMPAIGNS, JSON.stringify(list));
    return saved;
  },

  deleteCampaign(id: string): void {
    const list = this.getCampaigns().filter((c) => c.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CAMPAIGNS, JSON.stringify(list));
  },

  // CONTENT ITEMS
  getContentItems(userId?: string): ContentItem[] {
    if (typeof window === "undefined") return SEED_CONTENT;
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTENT);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CONTENT, JSON.stringify(SEED_CONTENT));
      return SEED_CONTENT;
    }
    try {
      const parsed: ContentItem[] = JSON.parse(raw);
      return userId ? parsed.filter((c) => c.user_id === userId || c.user_id === "cf-user-001-demo") : parsed;
    } catch {
      return SEED_CONTENT;
    }
  },

  saveContentItem(item: Omit<ContentItem, "id" | "created_at" | "updated_at"> & { id?: string }): ContentItem {
    const list = this.getContentItems();
    const now = new Date().toISOString();
    let saved: ContentItem;

    if (item.id) {
      list.forEach((existing, idx) => {
        if (existing.id === item.id) {
          list[idx] = { ...existing, ...item, updated_at: now };
          saved = list[idx];
        }
      });
      saved = saved! || { ...item, id: item.id, created_at: now, updated_at: now };
    } else {
      saved = {
        ...item,
        id: "cont-" + Math.random().toString(36).substring(2, 9),
        created_at: now,
        updated_at: now,
      };
      list.unshift(saved);
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.CONTENT, JSON.stringify(list));
    return saved;
  },

  deleteContentItem(id: string): void {
    const list = this.getContentItems().filter((c) => c.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CONTENT, JSON.stringify(list));
  },

  // CAMPAIGN TASKS
  getTasks(userId?: string): CampaignTask[] {
    if (typeof window === "undefined") return SEED_TASKS;
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(SEED_TASKS));
      return SEED_TASKS;
    }
    try {
      const parsed: CampaignTask[] = JSON.parse(raw);
      return userId ? parsed.filter((t) => t.user_id === userId || t.user_id === "cf-user-001-demo") : parsed;
    } catch {
      return SEED_TASKS;
    }
  },

  saveTask(task: Omit<CampaignTask, "id" | "created_at" | "updated_at"> & { id?: string }): CampaignTask {
    const list = this.getTasks();
    const now = new Date().toISOString();
    let saved: CampaignTask;

    if (task.id) {
      list.forEach((existing, idx) => {
        if (existing.id === task.id) {
          list[idx] = { ...existing, ...task, updated_at: now };
          saved = list[idx];
        }
      });
      saved = saved! || { ...task, id: task.id, created_at: now, updated_at: now };
    } else {
      saved = {
        ...task,
        id: "task-" + Math.random().toString(36).substring(2, 9),
        created_at: now,
        updated_at: now,
      };
      list.unshift(saved);
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(list));
    return saved;
  },

  toggleTaskStatus(id: string): CampaignTask | undefined {
    const list = this.getTasks();
    let updated: CampaignTask | undefined;
    list.forEach((t) => {
      if (t.id === id) {
        t.status = t.status === "completed" ? "pending" : "completed";
        t.updated_at = new Date().toISOString();
        updated = t;
      }
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(list));
    return updated;
  },

  deleteTask(id: string): void {
    const list = this.getTasks().filter((t) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(list));
  },

  // LEADS
  getLeads(): Lead[] {
    if (typeof window === "undefined") return SEED_LEADS;
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.LEADS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.LEADS, JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_LEADS;
    }
  },

  saveLead(lead: Omit<Lead, "id" | "created_at">): Lead {
    const list = this.getLeads();
    const saved: Lead = {
      ...lead,
      id: "lead-" + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    list.unshift(saved);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LEADS, JSON.stringify(list));
    return saved;
  },
};
