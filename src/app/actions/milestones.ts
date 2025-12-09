'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const MILESTONES = [2,5, 10, 50, 100]

export async function checkMilestones() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { shouldCelebrate: false, milestone: null }
  }

  // Get current user data including milestones
  const { data: userData } = await supabase
    .from('users')
    .select('milestones, last_celebrated_milestone')
    .eq('id', user.id)
    .single()

  if (!userData) {
    return { shouldCelebrate: false, milestone: null }
  }

  console.log('userData', userData)

  const currentMilestones = (userData.milestones as number[]) || []
  const lastCelebrated = userData.last_celebrated_milestone || 0

  // console.log('currentMilestones', userData.milestones)
  // console.log('lastCelebrated', lastCelebrated)

  // Get accepted invite count
  const { count: acceptedInvites } = await supabase
    .from('invites')
    .select('*', { count: 'exact', head: true })
    .eq('referrer_id', user.id)
    .eq('status', 'accepted')

  const inviteCount = acceptedInvites || 0

  console.log('inviteCount', inviteCount)
  
  // Determine reached milestones
  const reachedMilestones = MILESTONES.filter(m => inviteCount >= m)
  console.log('newMilestones', reachedMilestones)
  
  // If no milestones reached, return
  if (reachedMilestones.length === 0) {
    return { shouldCelebrate: false, milestone: null }
  }

  // Check if we need to update the milestones array in DB
  // We want to store all reached milestones
  const newMilestones = [...new Set([...currentMilestones, ...reachedMilestones])].sort((a, b) => a - b)

  
  if (newMilestones.length > currentMilestones.length) {
    await supabase
      .from('users')
      .update({ milestones: newMilestones })
      .eq('id', user.id)
  }

  // Determine if we should celebrate
  // We celebrate the highest reached milestone that hasn't been celebrated yet
  const highestReached = reachedMilestones[reachedMilestones.length - 1]
  
  if (highestReached > lastCelebrated) {
    return { shouldCelebrate: true, milestone: highestReached }
  }

  return { shouldCelebrate: false, milestone: null }
}

export async function markMilestoneCelebrated(milestone: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  await supabase
    .from('users')
    .update({ last_celebrated_milestone: milestone })
    .eq('id', user.id)
  
  revalidatePath('/dashboard')
}
