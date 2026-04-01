-- ── Customers ────────────────────────────────────────────────────────────────
create table customers (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  full_name       text not null,
  phone           text,
  email           text,
  address         text,
  is_vip          boolean not null default false,
  vip_discount_pct integer not null default 0,
  notes           text,
  qr_target       text not null default 'estimate'
                    check (qr_target in ('estimate', 'portal')),
  created_at      timestamptz not null default now()
);

-- ── Jobs ─────────────────────────────────────────────────────────────────────
create table jobs (
  id               uuid primary key default gen_random_uuid(),
  customer_id      uuid not null references customers(id) on delete cascade,
  description      text not null,
  service_type     text not null
                     check (service_type in ('spring','opener','off-track','installation','other')),
  status           text not null default 'appointment_confirmed'
                     check (status in ('waiting_for_parts','appointment_confirmed','job_completed')),
  cost             numeric(10,2),
  technician_notes text,
  completed_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── Appointments ─────────────────────────────────────────────────────────────
create table appointments (
  id               uuid primary key default gen_random_uuid(),
  customer_id      uuid references customers(id) on delete set null,
  name             text not null,
  phone            text not null,
  email            text,
  address          text not null,
  preferred_date   date,
  preferred_time   text check (preferred_time in ('morning','afternoon','evening')),
  service_interest text,
  source           text not null default 'website',
  status           text not null default 'new'
                     check (status in ('new','contacted','converted','closed')),
  created_at       timestamptz not null default now()
);

-- ── Site Events ───────────────────────────────────────────────────────────────
create table site_events (
  id           uuid primary key default gen_random_uuid(),
  event_type   text not null
                 check (event_type in ('estimate_request','qr_scan','portal_login','customer_created')),
  customer_id  uuid references customers(id) on delete set null,
  metadata     jsonb,
  created_at   timestamptz not null default now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
create index on jobs (customer_id);
create index on jobs (created_at);
create index on appointments (created_at);
create index on site_events (event_type, created_at);
create index on site_events (customer_id);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- All tables are accessed via the service_role key from the server,
-- so RLS is enabled but only the service role (bypass) is needed.
alter table customers enable row level security;
alter table jobs enable row level security;
alter table appointments enable row level security;
alter table site_events enable row level security;

-- Service role bypasses RLS automatically.
-- No additional policies needed for server-side operations.
-- Add policies here if you later use anon key + RLS for customer reads.
