import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, referralCode } = await request.json();

  if (!email || !referralCode) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'AutoPilot <onboarding@resend.dev>', // Use resend.dev for testing if domain not verified
      to: [email],
      subject: 'You have been invited to join AutoPilot',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Join the Future of Driving</h1>
          <p>You've been invited to join AutoPilot, the revolutionary self-driving car system.</p>
          <p>Sign up now and get <strong>100 miles</strong> of autonomous driving credit instantly.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/signup?ref=${referralCode}" style="display: inline-block; background-color: #06b6d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px;">
            Accept Invite
          </a>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
