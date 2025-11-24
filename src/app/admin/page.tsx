import { verifyAdminSession, getAdminStats, getSignupTimeline, getInviteStats, getTopReferrers, getRecentActivity, getUserConversionRatesInAdmin } from '@/lib/dal'
import { AdminStats } from '@/components/admin/AdminStats'
import { ConversionTable } from '@/components/admin/ConversionTable'
import { SignupChart } from '@/components/admin/SignupChart'
import { InviteProgressChart } from '@/components/admin/InviteProgressChart'
import { TopReferrersTable } from '@/components/admin/TopReferrersTable'
import { ActivityTimeline } from '@/components/admin/ActivityTimeline'
import Link from 'next/link'

// Force dynamic rendering and disable caching for real-time data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminDashboard() {
  await verifyAdminSession()

  const [stats, users, timeline24h, timeline30d, timeline6m, inviteStats, topReferrers, recentActivity] = await Promise.all([
    getAdminStats(),
    getUserConversionRatesInAdmin(),
    getSignupTimeline('24h'),
    getSignupTimeline('30d'),
    getSignupTimeline('6m'),
    getInviteStats(),
    getTopReferrers(10),
    getRecentActivity(20),
  ])

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <span>🎛️</span>
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-1">UAP Platform Analytics & Oversight</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/20 rounded-lg text-white transition-all"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Overview Stats */}
        <AdminStats stats={stats} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SignupChart data24h={timeline24h} data30d={timeline30d} data6m={timeline6m} />
          <InviteProgressChart stats={inviteStats} />
        </div>

        {/* Leaderboard */}
        <TopReferrersTable referrers={topReferrers} />

        {/* Conversion Table */}
        <ConversionTable users={users} />

        {/* Activity Timeline */}
        <ActivityTimeline activities={recentActivity} />
      </div>
    </div>
  )
}
