'use server'

import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const InviteSchema = z.object({
  email: z.string().email(),
  referralCode: z.string().min(1),
})

export async function inviteUser(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = InviteSchema.safeParse({
    email: formData.get('email'),
    referralCode: formData.get('referralCode'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid email or referral code' }
  }

  const { email, referralCode } = validatedFields.data

  try {
    const { error } = await resend.emails.send({
      from: 'UAP <onboarding@resend.dev>',
      to: [email],
      subject: 'You have been invited to UAP',
      html: `
        <h1>Welcome to the Universal Autonomous Protocol</h1>
        <p>You have been invited to join the network. Use the referral code below to claim your initial mileage credits:</p>
        <p><strong>${referralCode}</strong></p>
        <p><a href="${process.env.NEXT_PUBLIC_URL?.replace('https://', 'https://') || 'http://localhost:3000'}/signup?ref=${referralCode}">Click here to initialize</a></p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { error: 'Failed to send invite' }
    }

    return { success: true }
  } catch (error) {
    console.error('Server error:', error)
    return { error: 'Failed to send invite' }
  }
}
