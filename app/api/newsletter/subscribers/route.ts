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

    // Get subscriber count from Supabase
    const { count, error } = await supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch subscriber count" },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
