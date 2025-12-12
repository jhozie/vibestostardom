-- Enable Admin Access to Messages
-- Currently 'messages' only allows Public Insert. We need Authenticated Select.

-- 1. Enable RLS (just in case)
alter table messages enable row level security;

-- 2. Allow Authenticated Users (Admin) to SEE messages
create policy "Admin View Messages" 
on messages for select 
to authenticated 
using (true);

-- 3. (Optional) Allow Admin to DELETE messages
create policy "Admin Delete Messages" 
on messages for delete 
to authenticated 
using (true);
