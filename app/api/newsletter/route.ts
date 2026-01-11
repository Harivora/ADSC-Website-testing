import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, getWelcomeEmailHtml } from '@/lib/email';

// Email validation regex (strict)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Rate limiting: Simple in-memory store (resets on server restart)
// For production, consider Redis or database-based rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 50; // Max 50 requests
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
      console.error('Subscription error:', error.message);
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
      console.error('Welcome email failed');
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
