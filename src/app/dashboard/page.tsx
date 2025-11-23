import { verifySession, getProfile, getCredits, getReferrals, getTransactions } from '@/lib/dal'

import { StatsCards } from '@/components/dashboard/StatsCards'
import { InviteSection } from '@/components/dashboard/InviteSection'
import { ReferralTable } from '@/components/dashboard/ReferralTable'
import { MileageChart } from '@/components/dashboard/MileageChart'
import { TransactionHistory } from '@/components/dashboard/TransactionHistory'

export default async function DashboardPage() {
  const user = await verifySession()
  const profile = await getProfile(user.id)
  const totalMileage = await getCredits(user.id)
  const referrals = await getReferrals(user.id)
  const transactions = await getTransactions(user.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome back, {user.email}</p>
      </div>

      <StatsCards mileage={totalMileage} referralCount={referrals?.length || 0} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <InviteSection referralCode={profile?.referral_code || ''} />
        <ReferralTable referrals={referrals || []} />
      </div>

      <div className="mt-8">
        <MileageChart transactions={transactions || []} />
        <TransactionHistory 
          transactions={transactions || []} 
          currentUser={profile || { email: user.email || '' }}
        />
      </div>
    </div>
  )
}
