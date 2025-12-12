-- Run this to LOCK DOWN your database to only Authenticated Users (You)
-- 1. Drop the "Public Insert" policy we made for testing
drop policy if exists "Public posts insert" on posts;
drop policy if exists "Public posts delete" on posts;

-- 2. Create STRICT Content Policies
-- Allow anyone to READ posts (Public Blog)
create policy "Enable read access for all users" on posts for select using (true);

-- Allow ONLY Authenticated users to INSERT/UPDATE/DELETE posts (Admin)
create policy "Enable insert for authenticated users only" on posts for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on posts for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on posts for delete using (auth.role() = 'authenticated');
