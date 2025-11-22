-- Update handle_new_user to include extensions in search_path
-- This ensures gen_random_bytes (pgcrypto) and uuid_generate_v4 (uuid-ossp) are accessible
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public, extensions
as $$
declare
  new_referral_code text;
begin
  -- Generate a random referral code (simple implementation)
  new_referral_code := encode(gen_random_bytes(6), 'hex');
  
  insert into public.users (id, email, referral_code)
  values (new.id, new.email, new_referral_code);
  
  -- Award initial signup credits (e.g., 100 miles)
  insert into public.credits (user_id, amount, source_type, source_user_id)
  values (new.id, 100, 'signup', new.id);
  
  return new;
end;
$$;
