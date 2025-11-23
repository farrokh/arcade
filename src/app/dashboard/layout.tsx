import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <DashboardNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
