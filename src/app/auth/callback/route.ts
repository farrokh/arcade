import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Check for referral code in cookies
      const cookieStore = await cookies()
      const referralCode = cookieStore.get('referral_code')?.value

      if (referralCode) {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Check if user already has a referrer
          const { data: profile } = await supabase
            .from('users')
            .select('referred_by')
            .eq('id', user.id)
            .single()

          if (profile && !profile.referred_by) {
            // Find referrer ID
            const { data: referrer } = await supabase
              .from('users')
              .select('id')
              .eq('referral_code', referralCode)
              .single()

            if (referrer) {
              // Update user with referrer
              // This will trigger 'on_user_referred_update' in the database to award credits
              await supabase
                .from('users')
                .update({ referred_by: referrer.id })
                .eq('id', user.id)
            }
          }
        }
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
