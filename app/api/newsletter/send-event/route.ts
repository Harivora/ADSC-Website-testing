import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, getEventEmailHtml } from '@/lib/email';
import { events } from '@/constants/projects';

// This endpoint requires an API secret to prevent unauthorized access
// Using a fallback for development, but should be set in production
const API_SECRET = process.env.NEWSLETTER_API_SECRET || "ABCD1234EFGH5678IJKL91011MNOPQR12";

export async function POST(request: NextRequest) {
  try {
    // Verify API secret
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || token !== API_SECRET) {
      console.log('Auth failed. Token provided:', token ? 'yes' : 'no');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId } = await request.json();
    console.log('Received eventId:', eventId);

    // Validate event ID
    if (!eventId) {
      return NextResponse.json(
        { error: 'Missing required field: eventId' },
        { status: 400 }
      );
    }

    // Find the event from the website's event list
    const event = events.find((e) => e.id === eventId);
    console.log('Found event:', event?.name);

    if (!event) {
      return NextResponse.json(
        { error: `Event with ID "${eventId}" not found.` },
        { status: 404 }
      );
    }

    // Get all subscribers
    console.log('Fetching subscribers from Supabase...');
    const { data: subscribers, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('email');

    console.log('Subscribers:', subscribers, 'Error:', fetchError);

    if (fetchError) {
      console.error('Fetch subscribers error:', fetchError);
      return NextResponse.json(
        { error: `Failed to fetch subscribers: ${fetchError.message}` },
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

    // Send emails to all subscribers
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    console.log(`Sending emails to ${subscribers.length} subscribers...`);

    // Send to each subscriber individually (for better deliverability)
    for (const subscriber of subscribers) {
      try {
        console.log('Sending to:', subscriber.email);
        const result = await sendEmail({
          to: subscriber.email,
          subject: `📅 New Event: ${event.name}`,
          html: emailHtml,
        });

        if (result.success) {
          successCount++;
          console.log('✅ Sent to:', subscriber.email);
        } else {
          failCount++;
          errors.push(`${subscriber.email}: ${result.error}`);
          console.log('❌ Failed:', subscriber.email, result.error);
        }
      } catch (err) {
        failCount++;
        errors.push(`${subscriber.email}: ${err}`);
        console.log('❌ Error:', subscriber.email, err);
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
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
  } catch (error) {
    console.error('Send event API error:', error);
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}

// GET endpoint to list all available events
export async function GET(request: NextRequest) {
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
