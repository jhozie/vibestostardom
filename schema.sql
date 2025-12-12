-- Run this in your Supabase SQL Editor

-- 1. Create Messages Table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Posts Table
create table posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Grid/Public Access (Optional - usually better to use RLS policies)
-- For simplicity in this demo, we allow public insert to messages (Contact Form)
alter table messages enable row level security;
create policy "Public messages insert" on messages for insert with check (true);

-- For Blog, we allow public read
alter table posts enable row level security;
create policy "Public posts read" on posts for select using (true);
