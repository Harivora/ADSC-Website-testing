import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";

// This endpoint tests the email and database connections
const API_SECRET = process.env.NEWSLETTER_API_SECRET || "ABCD1234EFGH5678IJKL91011MNOPQR12";

export async function GET(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== API_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
  };

  // Test 1: Check environment variables
  results.envVars = {
    GMAIL_USER: process.env.GMAIL_USER ? "✅ Set" : "❌ Not set",
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? "✅ Set" : "❌ Not set",
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Not set",
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set (length: " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ")" : "❌ Not set",
    NEWSLETTER_API_SECRET: process.env.NEWSLETTER_API_SECRET ? "✅ Set" : "❌ Not set (using default)",
  };

  // Test 2: Test Supabase connection
  try {
    const { data, error, count } = await supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact" });

    if (error) {
      results.supabase = {
        status: "❌ Error",
        error: error.message,
        hint: error.hint,
        details: error.details,
      };
    } else {
      results.supabase = {
        status: "✅ Connected",
        subscriberCount: count,
        subscribers: data?.map(s => s.email) || [],
      };
    }
  } catch (err) {
    results.supabase = {
      status: "❌ Exception",
      error: String(err),
    };
  }

  // Test 3: Test email sending (only if testEmail param is provided)
  const url = new URL(request.url);
  const testEmail = url.searchParams.get("testEmail");

  if (testEmail) {
    try {
      const result = await sendEmail({
        to: testEmail,
        subject: "🧪 ADSC Newsletter Test Email",
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #1a1a1a; color: #fff;">
            <h1 style="color: #ca8a04;">Email Test Successful! ✅</h1>
            <p>This is a test email from the ADSC Newsletter system.</p>
            <p>Time: ${new Date().toISOString()}</p>
            <hr style="border-color: #333;" />
            <p style="color: #888;">If you received this, your email configuration is working correctly.</p>
          </div>
        `,
      });

      results.emailTest = {
        status: result.success ? "✅ Sent" : "❌ Failed",
        to: testEmail,
        error: result.error ? String(result.error) : undefined,
      };
    } catch (err) {
      results.emailTest = {
        status: "❌ Exception",
        error: String(err),
      };
    }
  } else {
    results.emailTest = {
      status: "⏭️ Skipped",
      hint: "Add ?testEmail=your@email.com to test email sending",
    };
  }

  return NextResponse.json(results, { status: 200 });
}
