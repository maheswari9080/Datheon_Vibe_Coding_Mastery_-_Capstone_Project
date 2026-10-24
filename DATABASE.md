# CreatorFlow AI — Database & Schema Specification

## Relational Entity-Relationship Model

```mermaid
erDiagram
    PROFILES ||--o{ CAMPAIGNS : owns
    PROFILES ||--o{ CONTENT_ITEMS : creates
    PROFILES ||--o{ CAMPAIGN_TASKS : executes
    CAMPAIGNS ||--o{ CONTENT_ITEMS : contains
    CAMPAIGNS ||--o{ CAMPAIGN_TASKS : schedules
    LEADS {
        uuid id PK
        text name
        text email
        text message
        timestamptz created_at
    }
    PROFILES {
        uuid id PK,FK
        text display_name
        text avatar_url
        timestamptz created_at
        timestamptz updated_at
    }
    CAMPAIGNS {
        uuid id PK
        uuid user_id FK
        text name
        text objective
        text target_audience
        text status
        timestamptz created_at
        timestamptz updated_at
    }
    CONTENT_ITEMS {
        uuid id PK
        uuid user_id FK
        uuid campaign_id FK
        text title
        text body
        text platform
        text content_type
        text tone
        text status
        jsonb metadata
        timestamptz created_at
        timestamptz updated_at
    }
    CAMPAIGN_TASKS {
        uuid id PK
        uuid user_id FK
        uuid campaign_id FK
        text title
        text status
        date due_date
        timestamptz created_at
        timestamptz updated_at
    }
```

## Table Definitions & Constraints

### 1. `public.profiles`
- Primary Key: `id UUID REFERENCES auth.users(id) ON DELETE CASCADE`
- Automatically provisioned upon user signup via PostgreSQL trigger `on_auth_user_created`.

### 2. `public.campaigns`
- Primary Key: `id UUID DEFAULT gen_random_uuid()`
- Foreign Key: `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE`
- Status CHECK: `status IN ('planning', 'active', 'completed', 'paused')`
- Indexed on: `user_id`, `status`, `created_at DESC`

### 3. `public.content_items`
- Primary Key: `id UUID DEFAULT gen_random_uuid()`
- Foreign Keys: `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE`, `campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL`
- Platform CHECK: `platform IN ('twitter', 'linkedin', 'instagram', 'youtube', 'blog')`
- Status CHECK: `status IN ('idea', 'draft', 'review', 'scheduled', 'published')`
- Indexed on: `user_id`, `campaign_id`, `platform`, `status`

### 4. `public.campaign_tasks`
- Primary Key: `id UUID DEFAULT gen_random_uuid()`
- Foreign Keys: `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE`, `campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE`
- Status CHECK: `status IN ('pending', 'completed')`
- Indexed on: `user_id`, `campaign_id`, `status`, `due_date`

### 5. `public.leads`
- Primary Key: `id UUID DEFAULT gen_random_uuid()`
- Attributes: `name TEXT`, `email TEXT`, `message TEXT`, `created_at TIMESTAMPTZ`
- Public INSERT enabled with service-role read restriction.
