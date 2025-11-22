import { AuthForm } from '@/components/auth-form'
import { Navbar } from '@/components/Navbar'
import { getReferrer } from '@/lib/dal'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const params = await searchParams
  let referrer = null

  if (params.ref) {
    referrer = await getReferrer(params.ref)
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <AuthForm type="signup" referrer={referrer} />
      </div>
    </main>
  )
}
