# CreatorFlow AI — Elite AI Content Planning & Campaign Management Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%2B%20RLS-3ecf8e.svg?style=flat&logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Tests-Vitest%20Passed-green.svg)](https://vitest.dev/)

> **CreatorFlow AI** is a production-grade AI micro-SaaS engineered following the **TITAN** (Target, Interface, Technology, AI, Non-negotiable quality) and **FUSION** (Foundation, UX, Secure AI, Integration & Launch) software architecture frameworks.

---

## 🌟 Executive Summary

Creators, indie hackers, freelance strategists, and small businesses face acute blank-page paralysis and disjointed publishing workflows. They juggle fragmented spreadsheets, disjointed chat prompts, and unorganized task lists.

**CreatorFlow AI** solves this by unifying:
1. **Strategic Campaign Hub**: Define audience personas, quarterly milestones, and core business objectives.
2. **AI Content Studio**: Produce platform-native copy for Twitter/X, LinkedIn, Instagram, YouTube, and Blogs with explainable audience alignment reasoning.
3. **Publishing Status Pipeline**: Transition items across `Idea` ➔ `Draft` ➔ `Review` ➔ `Scheduled` ➔ `Published`.
4. **Action Item Checklist**: Track production deadlines linked directly to individual campaigns.
5. **Bank-Grade Data Isolation**: Strict PostgreSQL Row-Level Security (RLS) guaranteeing zero tenant data leakage.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User([Creator / Client]) --> |HTTPS / Edge| CDN[Vercel Global Edge Network]
    CDN --> NextApp[Next.js 15 App Router & React 19]

    subgraph Client Presentation Layer
        NextApp --> LP[Public Landing Page & Theme Switcher]
        NextApp --> AuthContext[Auth Context & Session Engine]
        NextApp --> Dash[Protected Dashboard Workspace]
        Dash --> Campaigns[Campaign Manager]
        Dash --> Studio[AI Content Studio Interface]
        Dash --> Planner[Content Pipeline & Status Kanban]
        Dash --> Tasks[Campaign Action Items]
    end

    subgraph Server-Side API & Security
        NextApp --> AIService[/api/ai/generate - Server Action]
        NextApp --> LeadService[/api/leads - Anti-Abuse Rate Limited]
        AIService --> LLM[OpenAI GPT-4o / Claude / Gemini API]
    end

    subgraph Persistence Layer
        Dash --> DB[(Supabase PostgreSQL Database)]
        LeadService --> DB
        DB --> RLS[Row-Level Security Policies]
        RLS --> ProfilesTable[public.profiles]
        RLS --> CampTable[public.campaigns]
        RLS --> ContentTable[public.content_items]
        RLS --> TasksTable[public.campaign_tasks]
        RLS --> LeadsTable[public.leads]
    end
```

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+ or pnpm / yarn

### 1. Clone & Install
```bash
git clone https://github.com/maheswari9080/Datheon_Vibe_Coding_Mastery_-_Capstone_Project.git
cd Datheon_Vibe_Coding_Mastery_-_Capstone_Project
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your credentials (or test in Zero-Key Demo mode out-of-the-box):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Live LLM Key (Built-in smart engine active if absent)
OPENAI_API_KEY=sk-...
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Automated Tests
```bash
npm test
```

### 5. Create Production Bundle
```bash
npm run build
```

---

## 🔐 Database Schema & RLS Migrations

The database migrations are located in `supabase/migrations/`:
- `20261024000000_profiles_and_campaigns.sql`: Profiles, campaigns, automatic auth trigger.
- `20261024000001_content_tasks_and_leads.sql`: Content items, tasks, and leads tables.
- `20261024000002_rls_security_policies.sql`: Complete multi-tenant RLS isolation policies.

To apply migrations using the Supabase CLI:
```bash
supabase db push
```

---

## 📄 License & Standards

Built with strict adherence to Web Interface Guidelines, WCAG 2.2 AA accessibility, OWASP ASVS API security standards, and responsive verification across 360px–1440px viewport profiles.
