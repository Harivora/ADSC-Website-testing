import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Secure API key from environment
const API_SECRET = process.env.NEWSLETTER_API_SECRET;

export async function GET(request: Request) {
  try {
    // Verify API secret is configured
    if (!API_SECRET) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verify authorization
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token || token !== API_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get all subscribers from Supabase
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("email, subscribed_at");

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch subscribers", count: 0 },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      count: data?.length || 0,
      subscribers: data || []
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error", count: 0 },
      { status: 500 }
    );
  }
}
