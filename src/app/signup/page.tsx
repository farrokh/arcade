import { AuthForm } from '@/components/auth-form'
import { Navbar } from '@/components/Navbar'

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <AuthForm type="signup" />
      </div>
    </main>
  )
}
