import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, getEventEmailHtml } from '@/lib/email';

// This endpoint requires an API secret to prevent unauthorized access
const API_SECRET = process.env.NEWSLETTER_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify API secret is configured
    if (!API_SECRET) {
      console.error('NEWSLETTER_API_SECRET not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || token !== API_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body safely
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { eventName, eventDescription, eventDate, registerUrl } = body;

    // Validate required fields
    if (!eventName || !eventDescription || !eventDate) {
      return NextResponse.json(
        { error: 'Missing required fields: eventName, eventDescription, eventDate' },
        { status: 400 }
      );
    }

    // Get all subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('email');

    if (fetchError) {
      console.error('Fetch subscribers error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch subscribers.' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No subscribers found.' },
        { status: 200 }
      );
    }

    // Generate email HTML
    const emailHtml = getEventEmailHtml({
      name: eventName,
      description: eventDescription,
      date: eventDate,
      registerUrl,
    });

    // Send emails (in batches to avoid rate limits)
    const batchSize = 50;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      const emails = batch.map((s) => s.email);

      const result = await sendEmail({
        to: emails,
        subject: `📅 New Event: ${eventName}`,
        html: emailHtml,
      });

      if (result.success) {
        successCount += emails.length;
      } else {
        failCount += emails.length;
        console.error('Batch email failed:', result.error);
      }

      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({
      message: 'Broadcast complete',
      totalSubscribers: subscribers.length,
      successCount,
      failCount,
    });
  } catch {
    console.error('Broadcast API error');
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
