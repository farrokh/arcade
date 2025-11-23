import { verifySession, getProfile } from '@/lib/dal'
import { SettingsForm } from '@/components/dashboard/SettingsForm'

export default async function SettingsPage() {
  const user = await verifySession()
  const profile = await getProfile(user.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-400 mt-2">Manage your profile and preferences.</p>
      </div>

      <SettingsForm 
        fullName={profile?.full_name || ''} 
        email={user.email || ''} 
        referralCode={profile?.referral_code || ''}
      />
    </div>
  )
}
