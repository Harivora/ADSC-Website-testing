import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, getWelcomeEmailHtml } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed!' },
        { status: 409 }
      );
    }

    // Insert new subscriber
    const { data: insertData, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          subscribed_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      return NextResponse.json(
        { error: `Failed to subscribe: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Successfully inserted:', insertData);

    // Send welcome email
    const emailResult = await sendEmail({
      to: email.toLowerCase(),
      subject: '🎉 Welcome to ADSC Newsletter!',
      html: getWelcomeEmailHtml(email.toLowerCase()),
    });

    if (!emailResult.success) {
      console.error('Welcome email failed:', emailResult.error);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
