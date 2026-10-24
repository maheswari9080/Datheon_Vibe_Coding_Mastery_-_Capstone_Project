export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CampaignStatus = "planning" | "active" | "completed" | "paused";

export type ContentPlatform =
  | "twitter"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "blog";

export type ContentType = "post" | "thread" | "script" | "article";

export type ContentStatus =
  | "idea"
  | "draft"
  | "review"
  | "scheduled"
  | "published";

export type TaskStatus = "pending" | "completed";

export interface Profile {
  id: string;
  display_name: string;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  objective: string;
  target_audience: string;
  status: CampaignStatus;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  user_id: string;
  campaign_id: string | null;
  title: string;
  body: string;
  platform: ContentPlatform;
  content_type: ContentType;
  tone: string;
  status: ContentStatus;
  metadata?: {
    callToAction?: string;
    keywords?: string[];
    explanation?: string;
    variations?: string[];
  } | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignTask {
  id: string;
  user_id: string;
  campaign_id: string;
  title: string;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  message?: string | null;
  created_at: string;
}

export interface AIGenerateRequest {
  topic: string;
  targetAudience: string;
  platform: ContentPlatform;
  contentType: ContentType;
  tone: string;
  objective: string;
  keywords?: string[];
}

export interface AIGenerateResponse {
  headline: string;
  draft: string;
  description: string;
  callToAction: string;
  keywords: string[];
  variations: string[];
  explanation: string;
}
