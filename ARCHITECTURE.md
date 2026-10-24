# CreatorFlow AI — Architectural Specification

## 1. System Vision & Framework Foundations

CreatorFlow AI is designed as a modular, enterprise-ready micro-SaaS delivering an all-in-one content planning and campaign orchestration operating system.

### TITAN Framework Compliance
- **Target Product**: Solves blank-page paralysis and disjointed campaign scheduling for students, freelancers, creators, and founders.
- **Interface Intelligence**: Distinct visual hierarchy, glassmorphism surface layers, dark/light theme switching with local persistence, and responsive layouts verified at 360px, 390px, 768px, 1024px, and 1440px.
- **Technology Architecture**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Supabase PostgreSQL with RLS, and isolated server-side AI handlers.
- **AI Intelligence**: Genuine structured AI studio output producing hooks, drafts, CTAs, SEO keywords, variations, and audience alignment rationale.
- **Non-Negotiable Quality**: Zero mocked claims presented as live, zero exposed secrets, and fully tested failure paths.

---

## 2. Layered Architecture

### Presentation & UI Layer
- **Client Components**: Pure reactive components managing UI state (e.g., `ThemeToggle`, `InteractivePreview`, `LeadForm`, `AIStudio`).
- **Server Components**: High-performance streaming SSR components.
- **Theme Provider**: Centralized theme context synchronizing with `localStorage` and system media queries.

### API & Orchestration Layer
- `/api/ai/generate`:
  - Enforces POST-only method.
  - Sanitizes and validates user input (character limits, non-empty checks).
  - Isolates provider API keys securely on the server.
  - Returns strictly typed JSON response matching `AIGenerateResponse`.
- `/api/leads`:
  - Rate-limited by client IP (5-second throttle).
  - Honeypot bot protection.
  - RFC 5322 compliant email regex validation.

### Data & Security Layer (Supabase PostgreSQL)
- **Multi-Tenant Isolation**: Row-Level Security (RLS) is enabled on all private tables (`profiles`, `campaigns`, `content_items`, `campaign_tasks`).
- Every query evaluates `auth.uid() = user_id`.
- Content items and tasks explicitly verify foreign-key campaign ownership before permitting insert or update operations.
- The `leads` table enforces write-only permissions for the public role and read-only for the service role.
