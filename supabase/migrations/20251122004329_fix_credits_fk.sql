-- Drop existing constraints
alter table public.credits
drop constraint if exists credits_user_id_fkey,
drop constraint if exists credits_source_user_id_fkey;

-- Re-add constraints with ON DELETE CASCADE
alter table public.credits
add constraint credits_user_id_fkey
foreign key (user_id)
references public.users(id)
on delete cascade,

add constraint credits_source_user_id_fkey
foreign key (source_user_id)
references public.users(id)
on delete set null; -- If the source user is deleted, keep the credit but nullify the source
