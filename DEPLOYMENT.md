# CreatorFlow AI — Production Deployment Guide

## Target Deployment: Vercel + Supabase

### 1. Database Provisioning (Supabase)
1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Navigate to **SQL Editor**.
3. Run the migrations located in:
   - `supabase/migrations/20261024000000_profiles_and_campaigns.sql`
   - `supabase/migrations/20261024000001_content_tasks_and_leads.sql`
   - `supabase/migrations/20261024000002_rls_security_policies.sql`
4. Copy the Project URL, Anon Key, and Service Role Key from **Project Settings ➔ API**.

### 2. Application Deployment (Vercel)
1. Import this repository into [Vercel](https://vercel.com).
2. Configure Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key
   - `OPENAI_API_KEY`: (Optional) Your OpenAI Secret Key
   - `NEXT_PUBLIC_APP_URL`: Your production domain
3. Deploy! Next.js 15 automatically configures serverless edge functions and builds the project.

### 3. Post-Deployment Verification
- Test public landing page and dark/light theme switch.
- Submit a test lead and verify in dashboard.
- Register a test user and create a campaign.
- Generate an AI piece and save to Content Planner.
- Verify status transitions.
