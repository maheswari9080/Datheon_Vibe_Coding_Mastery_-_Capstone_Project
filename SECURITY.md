# CreatorFlow AI — Security & Threat Modeling

## Security Architecture Principles

### 1. Row-Level Security (RLS) Multi-Tenant Guarantee
- PostgreSQL Row-Level Security is strictly enabled across all user data tables.
- All access control is validated inside the database query engine (`auth.uid() = user_id`) rather than solely relying on client application code or middleware.
- Foreign key spoofing is proactively blocked: when attaching a content item or task to a campaign, the policy asserts:
  ```sql
  EXISTS (
    SELECT 1 FROM public.campaigns
    WHERE campaigns.id = target_campaign_id
    AND campaigns.user_id = auth.uid()
  )
  ```

### 2. Zero-Trust API Key Isolation
- All third-party AI keys (`OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`) and the `SUPABASE_SERVICE_ROLE_KEY` are strictly server-side environment variables.
- Client browser bundles only receive `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Public Endpoint Abuse Prevention
- The `/api/leads` endpoint employs:
  - Client IP in-memory rate limiting (1 request per 5 seconds).
  - Honeypot field validation to block automated spam bots.
  - Rigorous input length and format validation.

### 4. Injection & Cross-Site Scripting (XSS) Prevention
- Input text is handled as parameterized SQL by Supabase and sanitized.
- Model outputs are safely rendered using React JSX text nodes rather than `dangerouslySetInnerHTML`.
