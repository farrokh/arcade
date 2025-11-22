-- Update handle_new_user to handle referral logic
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public, extensions
as $$
declare
  new_referral_code text;
  referrer_id uuid;
  provided_referral_code text;
begin
  -- Generate a random referral code
  new_referral_code := encode(gen_random_bytes(6), 'hex');
  
  -- Check for provided referral code in metadata
  provided_referral_code := new.raw_user_meta_data->>'referral_code';
  
  if provided_referral_code is not null then
    select id into referrer_id from public.users where referral_code = provided_referral_code;
  end if;
  
  insert into public.users (id, email, referral_code, referred_by, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    new_referral_code,
    referrer_id, -- Insert the looked-up referrer_id
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  -- Award initial signup credits (e.g., 100 miles)
  insert into public.credits (user_id, amount, source_type, source_user_id)
  values (new.id, 100, 'signup', new.id);
  
  return new;
end;
$$;
