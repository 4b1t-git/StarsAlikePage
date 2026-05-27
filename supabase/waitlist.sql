-- Tabla simple para landing waitlist
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'landing',
  created_at timestamptz not null default now()
);

-- RLS: solo service-role escribe. No exponer anon.
alter table public.waitlist enable row level security;
-- (sin policies => nadie con anon key puede leer/escribir).
