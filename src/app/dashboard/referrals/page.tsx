import { verifySession, getProfile, getReferrals, getCredits, getPendingInvites } from '@/lib/dal'
import { ReferralStats } from '@/components/dashboard/ReferralStats'
import { BulkInviteForm } from '@/components/dashboard/BulkInviteForm'
import { ReferralTable } from '@/components/dashboard/ReferralTable'

export default async function ReferralsPage() {
  const user = await verifySession()
  const profile = await getProfile(user.id)
  const referrals = await getReferrals(user.id)
  const pendingInvites = await getPendingInvites(user.id)
  const totalEarned = await getCredits(user.id) // Ideally this should be just referral earnings, but using total for now

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Network Referrals</h1>
        <p className="text-gray-400 mt-2">Manage your fleet expansion and track rewards.</p>
      </div>

      <ReferralStats 
        referrals={referrals || []} 
        totalEarned={totalEarned} 
        pendingInvitesCount={pendingInvites?.length || 0}
      />
      
      <div className="grid grid-cols-1 gap-8">
        <BulkInviteForm referralCode={profile?.referral_code || ''} />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Referral History</h2>
          <ReferralTable referrals={referrals || []} pendingInvites={pendingInvites || []} />
        </div>
      </div>
    </div>
  )
}
