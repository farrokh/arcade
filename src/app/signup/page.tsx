import { Suspense } from 'react'
import { AuthForm } from '@/components/auth-form'
import { Navbar } from '@/components/Navbar'
import { getReferrer } from '@/lib/dal'
import { getUser } from '@/lib/dal'
import { redirect } from 'next/navigation'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  const params = await searchParams
  let referrer = null

  if (params.ref) {
    referrer = await getReferrer(params.ref)
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <AuthForm type="signup" referrer={referrer} />
        </Suspense>
      </div>
    </main>
  )
}
