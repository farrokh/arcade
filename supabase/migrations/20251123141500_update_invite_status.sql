-- Function to update invite status when a user is created or updated with a referrer
create or replace function public.update_invite_status()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.referred_by is not null then
    update public.invites
    set status = 'accepted', updated_at = now()
    where email = new.email
      and referrer_id = new.referred_by
      and status = 'pending';
  end if;
  return new;
end;
$$;

-- Trigger for new users
create trigger on_user_created_update_invite
  after insert on public.users
  for each row
  execute procedure public.update_invite_status();

-- Trigger for updated users (e.g. when referred_by is set later)
create trigger on_user_updated_update_invite
  after update on public.users
  for each row
  when (old.referred_by is null and new.referred_by is not null)
  execute procedure public.update_invite_status();
