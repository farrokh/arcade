create table invites (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  referrer_id uuid references users(id) not null,
  status text default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table invites enable row level security;

-- Policies
create policy "Users can view their own sent invites"
  on invites for select
  using (auth.uid() = referrer_id);

create policy "Users can insert their own invites"
  on invites for insert
  with check (auth.uid() = referrer_id);
