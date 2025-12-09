import { Suspense } from 'react'
import { AuthForm } from '@/components/auth-form'
import { Navbar } from '@/components/Navbar'
import { getUser } from '@/lib/dal'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <AuthForm type="login" />
        </Suspense>
      </div>
    </main>
  )
}
