-- Add milestones column to track reached milestones
alter table public.users 
add column if not exists milestones jsonb default '[]'::jsonb;

-- Add last_celebrated_milestone to track which milestone was last shown to the user
alter table public.users 
add column if not exists last_celebrated_milestone integer default 0;

-- Add comment for documentation
comment on column public.users.milestones is 'Array of reached invite milestones (e.g. [5, 10, 50])';
comment on column public.users.last_celebrated_milestone is 'The highest milestone for which the celebration animation has been shown';
