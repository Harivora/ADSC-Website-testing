import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, getWelcomeEmailHtml } from '@/lib/email';

// Email validation regex (strict)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Rate limiting: Simple in-memory store (resets on server restart)
// For production, consider Redis or database-based rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 requests
const RATE_WINDOW = 60 * 1000; // Per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

// Sanitize and validate email strictly
function sanitizeEmail(email: unknown): string | null {
  if (!email || typeof email !== 'string') return null;
  
  const trimmed = email.toLowerCase().trim();
  
  // Check length limits
  if (trimmed.length < 5 || trimmed.length > 254) return null;
  
  // Check against regex
  if (!EMAIL_REGEX.test(trimmed)) return null;
  
  // Block disposable email domains (add more as needed)
  const blockedDomains = ['tempmail.com', 'throwaway.com', 'mailinator.com'];
  const domain = trimmed.split('@')[1];
  if (blockedDomains.includes(domain)) return null;
  
  return trimmed;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body safely
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    // Validate and sanitize email
    const sanitizedEmail = sanitizeEmail(body?.email);
    
    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', sanitizedEmail)
      .single();

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed!' },
        { status: 409 }
      );
    }

    // Insert new subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        email: sanitizedEmail,
        subscribed_at: new Date().toISOString(),
      }]);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Send welcome email (don't fail if email fails)
    try {
      await sendEmail({
        to: sanitizedEmail,
        subject: '🎉 Welcome to ADSC Newsletter!',
        html: getWelcomeEmailHtml(sanitizedEmail),
      });
    } catch {
      // Silent fail - don't expose email errors
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// GET: Handle unsubscribe via link from emails
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');

  if (!email) {
    return new NextResponse(getUnsubscribePageHtml('', 'missing'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const sanitizedEmail = sanitizeEmail(email);
  if (!sanitizedEmail) {
    return new NextResponse(getUnsubscribePageHtml(email, 'invalid'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Delete subscriber
  const { error } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('email', sanitizedEmail);

  if (error) {
    return new NextResponse(getUnsubscribePageHtml(sanitizedEmail, 'error'), {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Verify the subscriber was actually deleted (catches silent RLS failures)
  const { data: stillExists } = await supabase
    .from('newsletter_subscribers')
    .select('email')
    .eq('email', sanitizedEmail)
    .single();

  if (stillExists) {
    return new NextResponse(getUnsubscribePageHtml(sanitizedEmail, 'error'), {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return new NextResponse(getUnsubscribePageHtml(sanitizedEmail, 'success'), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

// DELETE: Unsubscribe via API call
export async function DELETE(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeEmail(body?.email);

    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('email', sanitizedEmail);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Verify the subscriber was actually deleted (catches silent RLS failures)
    const { data: stillExists } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', sanitizedEmail)
      .single();

    if (stillExists) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe. The operation was blocked. Please contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed from the newsletter.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// Simple unsubscribe confirmation page HTML
function getUnsubscribePageHtml(email: string, status: 'success' | 'error' | 'missing' | 'invalid'): string {
  const messages = {
    success: {
      title: '✅ Unsubscribed Successfully',
      body: `<strong>${email}</strong> has been removed from the ADSC newsletter. You will no longer receive emails from us.`,
      color: '#3cb179',
    },
    error: {
      title: '❌ Something Went Wrong',
      body: 'We couldn\'t process your request. Please try again later or contact us.',
      color: '#dc3d43',
    },
    missing: {
      title: '⚠️ Missing Email',
      body: 'No email address was provided. Please use the unsubscribe link from your email.',
      color: '#f7ce00',
    },
    invalid: {
      title: '⚠️ Invalid Email',
      body: 'The email address provided is not valid.',
      color: '#f7ce00',
    },
  };

  const msg = messages[status];

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${msg.title}</title>
<style>body{margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;color:#fff}
.card{background:#171717;border-radius:16px;padding:48px;max-width:480px;text-align:center;border:1px solid #262626}
.title{font-size:28px;margin:0 0 16px;color:${msg.color}}
.body{color:#a3a3a3;font-size:16px;line-height:1.6;margin:0 0 24px}
a.btn{display:inline-block;background:linear-gradient(90deg,#dc3d43,#f7ce00,#3cb179);color:#000;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px}</style>
</head><body><div class="card"><p class="title">${msg.title}</p><p class="body">${msg.body}</p><a class="btn" href="https://adsc-atmiya.in">Back to ADSC</a></div></body></html>`;
}
