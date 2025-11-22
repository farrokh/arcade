-- Backfill existing users with metadata from auth.users
update public.users
set
  full_name = auth.users.raw_user_meta_data->>'full_name',
  avatar_url = auth.users.raw_user_meta_data->>'avatar_url'
from auth.users
where public.users.id = auth.users.id;
