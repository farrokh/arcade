-- Function to get transactions with recursive referral paths
create or replace function public.get_enriched_transactions(target_user_id uuid)
returns table (
  amount integer,
  source_type text,
  created_at timestamp with time zone,
  source_user jsonb,
  referral_path jsonb
)
language plpgsql
security definer set search_path = public
as $$
begin
  return query
  select
    c.amount,
    c.source_type,
    c.created_at,
    jsonb_build_object(
      'email', u.email,
      'full_name', u.full_name,
      'avatar_url', u.avatar_url
    ) as source_user,
    case
      when c.source_type = 'recursive_referral' then
        (
          select jsonb_agg(p_row)
          from (
            with recursive path as (
              -- Start from the source user (descendant)
              select u2.id, u2.referred_by, u2.full_name, u2.avatar_url, u2.email, 0 as depth
              from users u2
              where u2.id = c.source_user_id
              
              union all
              
              -- Go up the chain
              select u3.id, u3.referred_by, u3.full_name, u3.avatar_url, u3.email, p.depth + 1
              from users u3
              join path p on u3.id = p.referred_by
              where u3.id != target_user_id -- Stop before we reach the target user
            )
            select 
              email,
              full_name,
              avatar_url
            from path
            order by depth desc -- Order from closest to me to furthest
          ) p_row
        )
      else null
    end as referral_path
  from credits c
  left join users u on c.source_user_id = u.id
  where c.user_id = target_user_id
  order by c.created_at desc;
end;
$$;
