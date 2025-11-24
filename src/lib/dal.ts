import 'server-only'
import { createAdminClient } from '@/lib/supabase/admin'

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
    .select('referral_code, full_name, avatar_url, email')
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
  const { data, error } = await supabase
    .rpc('get_enriched_transactions', { target_user_id: userId })
  
  if (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
  
  return data
})

export const getPendingInvites = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('invites')
    .select('email, created_at, status')
    .eq('referrer_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  
  return data || []
})

// Admin-only functions
export async function verifyAdminSession() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  
  if (!adminSession) {
    redirect('/admin/login')
  }
  
  return true
}

export async function getAdminStats() {
  const supabase = createAdminClient()
  
  // Get total users
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
  
  console.log('Total users:', totalUsers)
  
  // Get total invites
  const { count: totalInvites } = await supabase
    .from('invites')
    .select('*', { count: 'exact', head: true })
  
  console.log('Total invites:', totalInvites)
  
  // Get pending invites
  const { count: pendingInvites } = await supabase
    .from('invites')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
  
  console.log('Pending invites:', pendingInvites)
  
  // Get total credits distributed
  const { data: creditsData } = await supabase
    .from('credits')
    .select('amount')
  
  const totalCredits = creditsData?.reduce((acc, curr) => acc + curr.amount, 0) || 0
  
  // Calculate overall conversion rate
  const acceptedInvites = (totalInvites || 0) - (pendingInvites || 0)
  const conversionRate = totalInvites ? (acceptedInvites / totalInvites) * 100 : 0
  
  return {
    totalUsers: totalUsers || 0,
    totalInvites: totalInvites || 0,
    pendingInvites: pendingInvites || 0,
    acceptedInvites,
    totalCredits,
    conversionRate: Math.round(conversionRate * 10) / 10,
  }
}

export async function getUserConversionRatesInAdmin() {
  const supabase = createAdminClient()
  
  // Get all users with their invite and referral counts
  const { data: users } = await supabase
    .from('users')
    .select('id, email, full_name, created_at')
    .order('created_at', { ascending: false })
  
  if (!users) return []
  
  const userStats = await Promise.all(users.map(async (user) => {
    // Get invites sent
    const { count: invitesSent } = await supabase
      .from('invites')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_id', user.id)
    
    // Get successful referrals
    const { count: successfulReferrals } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('referred_by', user.id)
    
    // Get total credits earned
    const { data: credits } = await supabase
      .from('credits')
      .select('amount')
      .eq('user_id', user.id)
    
    const totalCredits = credits?.reduce((acc, curr) => acc + curr.amount, 0) || 0
    
    const conversionRate = invitesSent ? ((successfulReferrals || 0) / invitesSent) * 100 : 0
    
    return {
      email: user.email,
      fullName: user.full_name,
      invitesSent: invitesSent || 0,
      successfulReferrals: successfulReferrals || 0,
      conversionRate: Math.round(conversionRate * 10) / 10,
      totalCredits,
      joinedAt: user.created_at,
    }
  }))
  
  return userStats
}

export async function getSignupTimeline(timeRange: '24h' | '30d' | '6m' = '24h') {
  const supabase = createAdminClient()
  
  let startDate: Date
  let groupBy: 'hour' | 'day' | 'week'
  let periods: number
  
  const now = new Date()
  
  switch (timeRange) {
    case '24h':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      groupBy = 'hour'
      periods = 24
      break
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      groupBy = 'day'
      periods = 30
      break
    case '6m':
      startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
      groupBy = 'week'
      periods = 26 // ~26 weeks in 6 months
      break
  }
  
  const { data } = await supabase
    .from('users')
    .select('created_at')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true })
  
  // Create a map of all time periods with zero counts
  const allPeriods: Record<string, number> = {}
  
  for (let i = 0; i < periods; i++) {
    const periodDate = new Date(now)
    let key: string
    
    if (groupBy === 'hour') {
      periodDate.setHours(now.getHours() - (periods - 1 - i))
      periodDate.setMinutes(0, 0, 0)
      key = `${periodDate.toISOString().split('T')[0]}T${periodDate.getHours().toString().padStart(2, '0')}:00`
    } else if (groupBy === 'day') {
      periodDate.setDate(now.getDate() - (periods - 1 - i))
      periodDate.setHours(0, 0, 0, 0)
      key = periodDate.toISOString().split('T')[0]
    } else {
      // Week grouping - start from beginning of week
      const daysAgo = (periods - 1 - i) * 7
      periodDate.setDate(now.getDate() - daysAgo)
      periodDate.setHours(0, 0, 0, 0)
      // Get start of week (Sunday)
      const dayOfWeek = periodDate.getDay()
      periodDate.setDate(periodDate.getDate() - dayOfWeek)
      key = periodDate.toISOString().split('T')[0]
    }
    
    allPeriods[key] = 0
  }
  
  // Fill in actual signup counts
  if (data && data.length > 0) {
    data.forEach(user => {
      const date = new Date(user.created_at)
      let key: string
      
      if (groupBy === 'hour') {
        const hourDate = new Date(date)
        hourDate.setMinutes(0, 0, 0)
        key = `${hourDate.toISOString().split('T')[0]}T${hourDate.getHours().toString().padStart(2, '0')}:00`
      } else if (groupBy === 'day') {
        key = date.toISOString().split('T')[0]
      } else {
        // Week grouping - get start of week
        const weekStart = new Date(date)
        weekStart.setHours(0, 0, 0, 0)
        const dayOfWeek = weekStart.getDay()
        weekStart.setDate(weekStart.getDate() - dayOfWeek)
        key = weekStart.toISOString().split('T')[0]
      }
      
      if (allPeriods[key] !== undefined) {
        allPeriods[key]++
      }
    })
  }
  
  return Object.entries(allPeriods)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([datetime, count]) => ({
      date: datetime,
      count,
    }))
}

export async function getInviteStats() {
  const supabase = createAdminClient()
  
  const { count: pending } = await supabase
    .from('invites')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
  
  const { count: accepted } = await supabase
    .from('invites')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'accepted')
  
  return {
    pending: pending || 0,
    accepted: accepted || 0,
  }
}

export async function getTopReferrers(limit = 10) {
  const supabase = createAdminClient()
  
  const { data: users } = await supabase
    .from('users')
    .select('id, email, full_name, avatar_url')
  
  if (!users) return []
  
  const referrerStats = await Promise.all(users.map(async (user) => {
    const { count: referralCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('referred_by', user.id)
    
    const { data: credits } = await supabase
      .from('credits')
      .select('amount')
      .eq('user_id', user.id)
      .in('source_type', ['referral', 'recursive_referral'])
    
    const creditsEarned = credits?.reduce((acc, curr) => acc + curr.amount, 0) || 0
    
    return {
      email: user.email,
      fullName: user.full_name,
      avatarUrl: user.avatar_url,
      referralCount: referralCount || 0,
      creditsEarned,
    }
  }))
  
  return referrerStats
    .filter(stat => stat.referralCount > 0)
    .sort((a, b) => b.referralCount - a.referralCount)
    .slice(0, limit)
}

export async function getRecentActivity(limit = 20) {
  const supabase = createAdminClient()
  
  // Get recent signups
  const { data: signups } = await supabase
    .from('users')
    .select('email, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  // Get recent invites
  const { data: invites } = await supabase
    .from('invites')
    .select('email, created_at, status, referrer_id')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  // Get recent credits
  const { data: credits } = await supabase
    .from('credits')
    .select('amount, source_type, created_at, user_id')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  const activities = [
    ...(signups?.map(s => ({
      type: 'signup' as const,
      email: s.email,
      name: s.full_name,
      timestamp: s.created_at,
    })) || []),
    ...(invites?.map(i => ({
      type: 'invite' as const,
      email: i.email,
      status: i.status,
      timestamp: i.created_at,
    })) || []),
    ...(credits?.map(c => ({
      type: 'credit' as const,
      amount: c.amount,
      sourceType: c.source_type,
      timestamp: c.created_at,
    })) || []),
  ]
  

  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

