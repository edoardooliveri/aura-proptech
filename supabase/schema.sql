-- ============================================================
--  Aura PropTech — Database Schema
--  Progetto Supabase SEPARATO da Armonie Immobiliare
--  Esegui questo SQL nell'SQL Editor del tuo nuovo progetto Supabase
-- ============================================================


-- ── LEADS B2B ─────────────────────────────────────────────────
-- Titolari e agenti che esprimono interesse dalla landing page

create table if not exists leads_b2b (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),

  -- Dati anagrafici
  owner_name      text not null,
  email           text not null,
  phone           text,
  agency_name     text,
  city            text,
  website         text,

  -- Dimensione agenzia
  agents_count    integer,                    -- numero agenti nel team
  daily_requests  integer,                    -- richieste ricevute/giorno
  hours_lost_daily numeric(4,1),              -- ore perse/giorno in admin

  -- Qualificazione commerciale
  plan_interest   text check (
    plan_interest in ('launch', 'scale', 'enterprise', 'unknown')
  ) default 'unknown',
  cta_clicked     text,                       -- quale CTA ha cliccato
  source          text default 'landing_page' check (
    source in ('landing_page', 'demo_chat', 'pricing_section', 'cta_finale', 'referral', 'direct')
  ),

  -- Stima ROI calcolata al momento della richiesta
  roi_hours_monthly   integer,               -- ore/mese risparmiate stimate
  roi_value_annual    integer,               -- €/anno recuperati stimati

  -- Tracking UTM
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  referrer        text,

  -- CRM interno
  status          text default 'new' check (
    status in ('new', 'contacted', 'qualified', 'demo_scheduled', 'converted', 'lost', 'nurturing')
  ),
  priority        text default 'normal' check (
    priority in ('low', 'normal', 'high', 'urgent')
  ),
  notes           text,
  contacted_at    timestamptz,
  demo_at         timestamptz,
  converted_at    timestamptz
);

-- Indici per query comuni
create index if not exists leads_b2b_status_idx      on leads_b2b(status);
create index if not exists leads_b2b_created_at_idx  on leads_b2b(created_at desc);
create index if not exists leads_b2b_email_idx       on leads_b2b(email);
create index if not exists leads_b2b_plan_idx        on leads_b2b(plan_interest);

-- Aggiorna updated_at automaticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger leads_b2b_updated_at
  before update on leads_b2b
  for each row execute function update_updated_at();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
alter table leads_b2b enable row level security;

-- Solo backend autenticato (service role) può leggere/scrivere
-- Il frontend usa insert anonimo solo per nuovi lead (via API route server-side)
-- Nessun accesso pubblico diretto alla tabella

-- Policy: inserimento pubblico disabilitato (gestiamo tutto via API route)
-- Policy: lettura/scrittura solo per service_role (pannello admin futuro)

-- ── VISTA ANALYTICS ──────────────────────────────────────────
create or replace view leads_b2b_analytics as
select
  date_trunc('day', created_at)::date   as day,
  count(*)                              as total_leads,
  count(*) filter (where status = 'converted')    as converted,
  count(*) filter (where plan_interest = 'scale') as scale_interest,
  count(*) filter (where plan_interest = 'enterprise') as enterprise_interest,
  avg(agents_count)                     as avg_agents,
  avg(hours_lost_daily)                 as avg_hours_lost,
  sum(roi_value_annual)                 as total_roi_pipeline
from leads_b2b
group by 1
order by 1 desc;


-- ── CUSTOMERS (paganti via Stripe) ───────────────────────────
-- Inseriti dal webhook /api/webhook a pagamento avvenuto

create table if not exists customers (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz default now(),
  updated_at              timestamptz default now(),

  -- Stripe references
  stripe_customer_id      text unique,
  stripe_subscription_id  text unique,

  -- Dati agenzia
  agency_name             text not null,
  owner_name              text,
  email                   text not null,
  phone                   text,

  -- Piano
  plan                    text default 'elite' check (plan in ('elite')),
  status                  text default 'active' check (
    status in ('active', 'past_due', 'cancelled', 'paused')
  ),
  setup_paid              boolean default false,
  amount_setup            integer default 1499,  -- centesimi/100
  amount_monthly          integer default 149,

  -- Lifecycle
  onboarding_completed    boolean default false,
  live_at                 timestamptz,
  cancelled_at            timestamptz,
  notes                   text
);

create index if not exists customers_email_idx    on customers(email);
create index if not exists customers_status_idx   on customers(status);
create index if not exists customers_stripe_idx   on customers(stripe_customer_id);

create trigger customers_updated_at
  before update on customers
  for each row execute function update_updated_at();

alter table customers enable row level security;


-- ============================================================
--  NOTE DI CONFIGURAZIONE
-- ============================================================
-- 1. Crea un nuovo progetto su supabase.com (NON usare quello di Armonie)
-- 2. Vai su SQL Editor → New Query → incolla questo file → Run
-- 3. Copia Project URL e anon key in .env.local:
--      NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
--      NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
-- 4. Per il pannello admin futuro, usa la service_role key lato server
-- ============================================================
