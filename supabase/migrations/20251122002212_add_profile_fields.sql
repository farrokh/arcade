-- Add full_name and avatar_url to users table
alter table public.users 
add column if not exists full_name text,
add column if not exists avatar_url text;

-- Update handle_new_user to populate these fields from metadata
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
  
  insert into public.users (id, email, referral_code, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    new_referral_code,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  -- Award initial signup credits (e.g., 100 miles)
  insert into public.credits (user_id, amount, source_type, source_user_id)
  values (new.id, 100, 'signup', new.id);
  
  return new;
end;
$$;
