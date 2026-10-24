-- CreatorFlow AI Database Migration: Content Items, Campaign Tasks, and Leads
-- Framework B (FUSION) Foundation Layer

-- 1. Create Content Items Table
CREATE TABLE IF NOT EXISTS public.content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'instagram', 'youtube', 'blog')),
    content_type TEXT NOT NULL CHECK (content_type IN ('post', 'thread', 'script', 'article')),
    tone TEXT NOT NULL DEFAULT 'Professional',
    status TEXT NOT NULL DEFAULT 'idea' CHECK (status IN ('idea', 'draft', 'review', 'scheduled', 'published')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Content Items Indexes
CREATE INDEX IF NOT EXISTS idx_content_user_id ON public.content_items(user_id);
CREATE INDEX IF NOT EXISTS idx_content_campaign_id ON public.content_items(campaign_id);
CREATE INDEX IF NOT EXISTS idx_content_platform ON public.content_items(platform);
CREATE INDEX IF NOT EXISTS idx_content_status ON public.content_items(status);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON public.content_items(created_at DESC);

-- 2. Create Campaign Tasks Table
CREATE TABLE IF NOT EXISTS public.campaign_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    due_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Campaign Tasks Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.campaign_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_campaign_id ON public.campaign_tasks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.campaign_tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.campaign_tasks(due_date);

-- 3. Create Leads Table (Public Capture)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Leads Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
