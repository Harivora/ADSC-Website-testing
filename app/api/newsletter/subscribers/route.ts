import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Secure API key from environment
const API_SECRET = process.env.NEWSLETTER_API_SECRET || "ABCD1234EFGH5678IJKL91011MNOPQR12";

export async function GET(request: Request) {
  try {
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
      console.error("Supabase error:", error);
      console.error("Error details:", error.message, error.details, error.hint);
      return NextResponse.json(
        { error: `Failed to fetch subscribers: ${error.message}`, count: 0 },
        { status: 500 }
      );
    }

    console.log("Fetched subscribers:", data?.length || 0);
    
    return NextResponse.json({ 
      count: data?.length || 0,
      subscribers: data || []
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Internal server error", count: 0 },
      { status: 500 }
    );
  }
}
