import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, getEventEmailHtml } from '@/lib/email';
import { events } from '@/constants/projects';

// This endpoint requires an API secret to prevent unauthorized access
const API_SECRET = process.env.NEWSLETTER_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify API secret
    if (!API_SECRET) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || token !== API_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId, limit } = await request.json();

    // Validate event ID
    if (!eventId) {
      return NextResponse.json(
        { error: 'Missing required field: eventId' },
        { status: 400 }
      );
    }

    // Find the event from the website's event list
    const event = events.find((e) => e.id === eventId);

    if (!event) {
      return NextResponse.json(
        { error: `Event with ID "${eventId}" not found.` },
        { status: 404 }
      );
    }

    // Get all subscribers (with optional limit)
    let query = supabase
      .from('newsletter_subscribers')
      .select('email')
      .order('subscribed_at', { ascending: true });
    
    // Apply limit if provided
    if (limit && typeof limit === 'number' && limit > 0) {
      query = query.limit(limit);
    }

    const { data: subscribers, error: fetchError } = await query;

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch subscribers. Please try again.' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No subscribers found.', eventName: event.name, totalSubscribers: 0 },
        { status: 200 }
      );
    }

    // Generate email HTML using event details from website
    const emailHtml = getEventEmailHtml({
      name: event.name,
      description: event.description,
      date: event.date,
      registerUrl: event.registerUrl || event.viewUrl,
    });

    // Send emails in batches using BCC for privacy and efficiency
    const batchSize = 50;
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      const emails = batch.map((s) => s.email);

      try {
        const result = await sendEmail({
          to: emails,
          subject: `📅 New Event: ${event.name}`,
          html: emailHtml,
        });

        if (result.success) {
          successCount += emails.length;
        } else {
          failCount += emails.length;
          errors.push(`Batch ${Math.floor(i / batchSize) + 1} failed to send`);
        }
      } catch {
        failCount += emails.length;
        errors.push(`Batch ${Math.floor(i / batchSize) + 1} sending error`);
      }

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({
      message: 'Event notification sent!',
      eventName: event.name,
      eventDate: event.date,
      totalSubscribers: subscribers.length,
      successCount,
      failCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to list all available events
export async function GET(request: NextRequest) {
  // Verify API secret is configured
  if (!API_SECRET) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Verify API secret
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== API_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Return list of events with their IDs
  const eventList = events.map((e) => ({
    id: e.id,
    name: e.name,
    date: e.date,
    category: e.category,
  }));

  return NextResponse.json({ events: eventList });
}
