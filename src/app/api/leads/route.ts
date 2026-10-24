import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

// In-memory rate limiting map: IP -> last request timestamp
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Check (1 request every 5 seconds per IP)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const lastRequest = rateLimitMap.get(ip);
    const now = Date.now();

    if (lastRequest && now - lastRequest < 5000) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few seconds before trying again." },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    const body = await req.json();

    // 2. Honeypot check for bots
    if (body.bot_check) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    // 3. Validation
    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (body.name.length > 100) {
      return NextResponse.json({ error: "Name is too long (max 100 characters)." }, { status: 400 });
    }

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim()) || body.email.length > 200) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (body.message && body.message.length > 1000) {
      return NextResponse.json({ error: "Message exceeds maximum length (1000 characters)." }, { status: 400 });
    }

    const leadData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message?.trim() || null,
      created_at: new Date().toISOString(),
    };

    // 4. Persistence
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error: dbError } = await supabase.from("leads").insert(leadData);
        if (dbError) {
          console.error("Supabase lead insertion error:", dbError);
        }
      } catch (err) {
        console.error("Supabase lead write failed:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully recorded. Thank you for connecting!",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to process lead submission. Please try again later." },
      { status: 500 }
    );
  }
}
