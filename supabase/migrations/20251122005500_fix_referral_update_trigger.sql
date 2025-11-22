-- Create a trigger to handle cases where referred_by is set AFTER signup (e.g. OAuth fix)
create trigger on_user_referred_update
  after update on public.users
  for each row
  when (old.referred_by is null and new.referred_by is not null)
  execute procedure public.distribute_referral_credits();
