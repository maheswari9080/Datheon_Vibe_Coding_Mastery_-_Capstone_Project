-- CreatorFlow AI Database Migration: Row-Level Security (RLS)
-- Framework B (FUSION) Security Layer

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 2. Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 3. Campaigns Policies
DROP POLICY IF EXISTS "Users can view own campaigns" ON public.campaigns;
CREATE POLICY "Users can view own campaigns"
    ON public.campaigns FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own campaigns" ON public.campaigns;
CREATE POLICY "Users can insert own campaigns"
    ON public.campaigns FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own campaigns" ON public.campaigns;
CREATE POLICY "Users can update own campaigns"
    ON public.campaigns FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own campaigns" ON public.campaigns;
CREATE POLICY "Users can delete own campaigns"
    ON public.campaigns FOR DELETE
    USING (auth.uid() = user_id);

-- 4. Content Items Policies (With cross-tenant campaign ownership verification)
DROP POLICY IF EXISTS "Users can view own content items" ON public.content_items;
CREATE POLICY "Users can view own content items"
    ON public.content_items FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own content items" ON public.content_items;
CREATE POLICY "Users can insert own content items"
    ON public.content_items FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND (
            campaign_id IS NULL OR
            EXISTS (
                SELECT 1 FROM public.campaigns
                WHERE campaigns.id = content_items.campaign_id
                AND campaigns.user_id = auth.uid()
            )
        )
    );

DROP POLICY IF EXISTS "Users can update own content items" ON public.content_items;
CREATE POLICY "Users can update own content items"
    ON public.content_items FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (
        auth.uid() = user_id AND (
            campaign_id IS NULL OR
            EXISTS (
                SELECT 1 FROM public.campaigns
                WHERE campaigns.id = content_items.campaign_id
                AND campaigns.user_id = auth.uid()
            )
        )
    );

DROP POLICY IF EXISTS "Users can delete own content items" ON public.content_items;
CREATE POLICY "Users can delete own content items"
    ON public.content_items FOR DELETE
    USING (auth.uid() = user_id);

-- 5. Campaign Tasks Policies (Guarantees task and campaign belong to same user)
DROP POLICY IF EXISTS "Users can view own tasks" ON public.campaign_tasks;
CREATE POLICY "Users can view own tasks"
    ON public.campaign_tasks FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own tasks" ON public.campaign_tasks;
CREATE POLICY "Users can insert own tasks"
    ON public.campaign_tasks FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.campaigns
            WHERE campaigns.id = campaign_tasks.campaign_id
            AND campaigns.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can update own tasks" ON public.campaign_tasks;
CREATE POLICY "Users can update own tasks"
    ON public.campaign_tasks FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own tasks" ON public.campaign_tasks;
CREATE POLICY "Users can delete own tasks"
    ON public.campaign_tasks FOR DELETE
    USING (auth.uid() = user_id);

-- 6. Leads Policies (Public insert, strictly private read)
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads"
    ON public.leads FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Service role only read leads" ON public.leads;
CREATE POLICY "Service role only read leads"
    ON public.leads FOR SELECT
    USING (auth.role() = 'service_role');
