-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table that extends auth.users
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  referral_code text unique not null,
  referred_by uuid references public.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on users for select
  using ( true );

create policy "Users can insert their own profile."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on users for update
  using ( auth.uid() = id );

-- Create credits table
create table public.credits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  amount integer not null,
  source_type text check (source_type in ('signup', 'referral', 'recursive_referral')) not null,
  source_user_id uuid references public.users(id), -- The user who caused this credit (e.g. the new signup)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.credits enable row level security;

-- Create policies
create policy "Users can view their own credits."
  on credits for select
  using ( auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
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

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to distribute recursive referral credits
create or replace function public.distribute_referral_credits()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  current_referrer_id uuid;
  current_depth integer := 0;
  credit_amount integer;
  base_amount integer := 100;
begin
  current_referrer_id := new.referred_by;
  
  -- Loop up the referral chain
  while current_referrer_id is not null and current_depth < 10 loop -- Limit depth to 10
    -- Calculate credit: 100 / (depth + 2)
    -- Depth 0 (Direct): 100 / 2 = 50
    -- Depth 1 (Indirect): 100 / 3 = 33
    -- Depth 2 (Indirect): 100 / 4 = 25
    credit_amount := base_amount / (current_depth + 2);
    
    if credit_amount > 0 then
      insert into public.credits (user_id, amount, source_type, source_user_id)
      values (current_referrer_id, credit_amount, 'recursive_referral', new.id);
    end if;
    
    -- Move up the tree
    select referred_by into current_referrer_id from public.users where id = current_referrer_id;
    current_depth := current_depth + 1;
  end loop;
  
  return new;
end;
$$;

-- Trigger for referral distribution
create trigger on_user_referred
  after insert on public.users
  for each row
  when (new.referred_by is not null)
  execute procedure public.distribute_referral_credits();
