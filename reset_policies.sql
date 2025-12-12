-- RUN THIS TO RESET AND FIX ALL PERMISSIONS
-- This ensures a clean slate for the 'posts' table.

-- 1. Drop ALL potential existing policies to stop conflicts
drop policy if exists "Public posts insert" on posts;
drop policy if exists "Public posts delete" on posts;
drop policy if exists "Enable read access for all users" on posts;
drop policy if exists "Enable insert for authenticated users only" on posts;
drop policy if exists "Enable update for authenticated users only" on posts;
drop policy if exists "Enable delete for authenticated users only" on posts;
drop policy if exists "Public Read" on posts;
drop policy if exists "Admin Insert" on posts;
drop policy if exists "Admin Update" on posts;
drop policy if exists "Admin Delete" on posts;

-- 2. Ensure RLS is On
alter table posts enable row level security;

-- 3. Create Simple, Robust Policies

-- EVERYONE can READ posts
create policy "Public Read" 
on posts for select 
using (true);

-- ONLY LOGGED IN users can INSERT/UPDATE/DELETE
create policy "Admin Insert" 
on posts for insert 
to authenticated 
with check (true);

create policy "Admin Update" 
on posts for update 
to authenticated 
using (true);

create policy "Admin Delete" 
on posts for delete 
to authenticated 
using (true);
