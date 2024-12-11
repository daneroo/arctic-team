create table if not exists public.places (
    id serial primary key,
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

-- Allow public write access for insert
create policy "Allow public insert access"
    on public.places
    for insert
    to anon
    with check (true);

-- Allow public write access for update
create policy "Allow public update access"
    on public.places
    for update
    to anon
    using (true);

-- Allow public write access for delete
create policy "Allow public delete access"
    on public.places
    for delete
    to anon
    using (true);

 