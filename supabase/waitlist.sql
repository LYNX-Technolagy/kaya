-- ============================================================================
-- Kaya landing page — waitlist table.
-- ============================================================================

create extension if not exists "uuid-ossp";

create table if not exists waitlist (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null,
  source      text,
  referrer    text,
  created_at  timestamptz not null default now()
);

create unique index if not exists waitlist_email_unique
  on waitlist (lower(email));

alter table waitlist enable row level security;

drop policy if exists "waitlist insert public" on waitlist;
create policy "waitlist insert public" on waitlist
  for insert with check (true);

drop policy if exists "waitlist read owner" on waitlist;
create policy "waitlist read owner" on waitlist
  for select using (auth.role() = 'authenticated');