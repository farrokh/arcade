import { getUser, getCredits, getTransactions } from '@/lib/dal'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Stats } from '@/components/Stats'
import { Features } from '@/components/Features'
import { WhyUAP } from '@/components/WhyUAP'
import { CTA } from '@/components/CTA'

export default async function Home() {
  const user = await getUser()
  const mileage = user ? await getCredits(user.id) : 0
  const transactions = user ? await getTransactions(user.id) : []

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero user={user} mileage={mileage} transactions={transactions} />
      
      <Stats />
      <Features />
      <WhyUAP />
      <CTA />
      <Footer />
    </main>
  )
}
