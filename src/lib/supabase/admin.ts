import { createClient } from '@supabase/supabase-js'

/**
 * Admin client that bypasses Row Level Security (RLS)
 * Uses the service role key which has elevated permissions
 * 
 * IMPORTANT: Only use this for admin operations!
 * Never expose this client to the frontend or use it for user-facing operations
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase admin credentials. Please set SUPABASE_SERVICE_ROLE_KEY in your .env file')
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
