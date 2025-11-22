import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const getUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

export const verifySession = cache(async () => {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  return user
})

export const getProfile = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('users')
    .select('referral_code, full_name, avatar_url')
    .eq('id', userId)
    .single()
  return data
})

export const getCredits = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('credits')
    .select('amount')
    .eq('user_id', userId)
  
  return data?.reduce((acc, curr) => acc + curr.amount, 0) || 0
})

export const getReferrals = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('users')
    .select('email, created_at, full_name, avatar_url')
    .eq('referred_by', userId)
    .order('created_at', { ascending: false })
  return data
})

export const getReferrer = cache(async (referralCode: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('users')
    .select('referral_code, full_name, avatar_url') // Added referral_code
    .eq('referral_code', referralCode)
    .single()
  return data
})

export const getTransactions = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('credits')
    .select(`
      amount,
      source_type,
      created_at,
      source_user:source_user_id (
        email,
        full_name,
        avatar_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return data?.map(tx => ({
    ...tx,
    source_user: Array.isArray(tx.source_user) ? tx.source_user[0] : tx.source_user
  }))
})
