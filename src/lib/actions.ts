'use server'

import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const BulkInviteSchema = z.object({
  emails: z.string(),
  message: z.string().optional(),
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

export async function inviteUsers(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized', count: 0, failures: 0 }
  }

  const validatedFields = BulkInviteSchema.safeParse({
    emails: formData.get('emails'),
    message: formData.get('message'),
    referralCode: formData.get('referralCode'),
  })

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid input', count: 0, failures: 0 }
  }

  const { emails, message, referralCode } = validatedFields.data
  
  // Split emails by comma, newline, or space and filter empty
  const emailList = emails.split(/[\s,]+/).filter(e => e.length > 0 && e.includes('@'))

  if (emailList.length === 0) {
    return { success: false, error: 'No valid emails found', count: 0, failures: 0 }
  }

  try {
    // Send emails in parallel
    const results = await Promise.allSettled(emailList.map(email => 
      resend.emails.send({
        from: 'UAP <onboarding@resend.dev>',
        to: [email],
        subject: 'You have been invited to UAP',
        html: `
          <h1>Welcome to the Universal Autonomous Protocol</h1>
          ${message ? `<p><strong>Message from sender:</strong> ${message}</p>` : ''}
          <p>You have been invited to join the network. Use the referral code below to claim your initial mileage credits:</p>
          <p><strong>${referralCode}</strong></p>
          <p><a href="${process.env.NEXT_PUBLIC_URL?.replace('https://', 'https://') || 'http://localhost:3000'}/signup?ref=${referralCode}">Click here to initialize</a></p>
        `,
      })
    ))

    const failures = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && r.value.error))
    
    if (failures.length > 0 && failures.length === emailList.length) {
      return { success: false, error: 'Failed to send all invites', count: 0, failures: emailList.length }
    }

    return { 
      success: true, 
      error: '',
      count: emailList.length - failures.length,
      failures: failures.length 
    }
  } catch (error) {
    console.error('Server error:', error)
    return { success: false, error: 'Failed to send invites', count: 0, failures: 0 }
  }
}
