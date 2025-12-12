-- Run this to fix the "RLS Policy" error
-- WARNING: This allows ANYONE to create posts. 
-- In a real production app, we would add strict Auth policies.

create policy "Public posts insert" on posts for insert with check (true);
create policy "Public posts delete" on posts for delete using (true);
