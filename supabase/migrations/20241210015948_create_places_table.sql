create table if not exists public.places (
    id text primary key,
    name text not null,
    latitude double precision not null,
    longitude double precision not null,
    osm_id text
);

-- Set up row level security
alter table public.places enable row level security;

-- Allow public read access
create policy "Allow public read access"
    on public.places
    for select
    to anon
    using (true);
 