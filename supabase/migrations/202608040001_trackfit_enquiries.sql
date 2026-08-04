create sequence if not exists public.trackfit_enquiry_reference_seq;

create table if not exists public.trackfit_enquiries (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  client_submission_id uuid not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  postcode text not null,
  property_type text not null,
  track_type text not null,
  track_quantity text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_contact text not null check (preferred_contact in ('phone', 'email', 'either')),
  customer_notes text,
  photo_paths jsonb not null default '[]'::jsonb check (jsonb_typeof(photo_paths) = 'array'),
  source text not null default 'website_quote',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page text,
  status text not null default 'new' check (status in ('new','contacted','awaiting_photos','survey_booked','quote_preparing','quote_sent','won','lost','completed')),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  internal_notes text,
  quoted_amount numeric(12,2) check (quoted_amount is null or quoted_amount >= 0),
  survey_appointment timestamptz,
  installation_appointment timestamptz,
  last_contacted_at timestamptz,
  assigned_to uuid references auth.users(id) on delete set null
);

create or replace function public.trackfit_set_enquiry_defaults()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.reference_number is null or new.reference_number = '' then
    new.reference_number := 'TF-' || extract(year from now())::int || '-' ||
      lpad(nextval('public.trackfit_enquiry_reference_seq')::text, 6, '0');
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trackfit_enquiries_defaults on public.trackfit_enquiries;
create trigger trackfit_enquiries_defaults before insert or update on public.trackfit_enquiries
for each row execute function public.trackfit_set_enquiry_defaults();

create table if not exists public.trackfit_enquiry_activity (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.trackfit_enquiries(id) on delete cascade,
  created_at timestamptz not null default now(),
  actor_id uuid references auth.users(id) on delete set null,
  activity_type text not null,
  description text not null,
  changes jsonb not null default '{}'::jsonb
);

create index if not exists trackfit_enquiries_created_at_idx on public.trackfit_enquiries (created_at desc);
create index if not exists trackfit_enquiries_status_idx on public.trackfit_enquiries (status);
create index if not exists trackfit_enquiries_track_type_idx on public.trackfit_enquiries (track_type);
create index if not exists trackfit_activity_enquiry_idx on public.trackfit_enquiry_activity (enquiry_id, created_at desc);

create or replace function public.is_trackfit_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'trackfit_admin')::boolean, false);
$$;

alter table public.trackfit_enquiries enable row level security;
alter table public.trackfit_enquiry_activity enable row level security;

revoke all on public.trackfit_enquiries from anon;
revoke all on public.trackfit_enquiry_activity from anon;
grant select, update on public.trackfit_enquiries to authenticated;
grant select, insert on public.trackfit_enquiry_activity to authenticated;

drop policy if exists "TrackFit admins can read enquiries" on public.trackfit_enquiries;
create policy "TrackFit admins can read enquiries" on public.trackfit_enquiries for select to authenticated using (public.is_trackfit_admin());
drop policy if exists "TrackFit admins can update enquiries" on public.trackfit_enquiries;
create policy "TrackFit admins can update enquiries" on public.trackfit_enquiries for update to authenticated using (public.is_trackfit_admin()) with check (public.is_trackfit_admin());
drop policy if exists "TrackFit admins can read activity" on public.trackfit_enquiry_activity;
create policy "TrackFit admins can read activity" on public.trackfit_enquiry_activity for select to authenticated using (public.is_trackfit_admin());
drop policy if exists "TrackFit admins can add activity" on public.trackfit_enquiry_activity;
create policy "TrackFit admins can add activity" on public.trackfit_enquiry_activity for insert to authenticated with check (public.is_trackfit_admin() and actor_id = auth.uid());

do $$ begin
  alter publication supabase_realtime add table public.trackfit_enquiries;
exception when duplicate_object then null;
end $$;

insert into storage.buckets (id, name, public)
values ('trackfit-enquiry-photos', 'trackfit-enquiry-photos', false)
on conflict (id) do update set public = false;

drop policy if exists "TrackFit admins can read enquiry photos" on storage.objects;
create policy "TrackFit admins can read enquiry photos" on storage.objects for select to authenticated
using (bucket_id = 'trackfit-enquiry-photos' and public.is_trackfit_admin());
