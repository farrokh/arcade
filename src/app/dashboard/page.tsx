import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { InviteSection } from '@/components/dashboard/InviteSection'
import { ReferralTable } from '@/components/dashboard/ReferralTable'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile for referral code
  const { data: profile } = await supabase
    .from('users')
    .select('referral_code')
    .eq('id', user.id)
    .single()

  // Fetch total credits
  const { data: credits } = await supabase
    .from('credits')
    .select('amount')
    .eq('user_id', user.id)

  const totalMileage = credits?.reduce((acc, curr) => acc + curr.amount, 0) || 0

  // Fetch direct referrals
  const { data: referrals } = await supabase
    .from('users')
    .select('email, created_at')
    .eq('referred_by', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back, {user.email}</p>
        </div>

        <StatsCards mileage={totalMileage} referralCount={referrals?.length || 0} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <InviteSection referralCode={profile?.referral_code || ''} />
          <ReferralTable referrals={referrals || []} />
        </div>
      </main>
    </div>
  )
}
