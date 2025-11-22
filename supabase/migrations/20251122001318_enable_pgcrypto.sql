-- Enable pgcrypto for gen_random_bytes (required for referral code generation)
create extension if not exists "pgcrypto";
