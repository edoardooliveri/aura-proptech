import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ── POST /api/reviews ────────────────────────────────────────
// Submit a review from a client
// Body: { clientId, agencyName, rating, comment, plan }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, agencyName, rating, comment, plan } = body;

    if (!agencyName || !rating) {
      return NextResponse.json({ error: "agencyName and rating required" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([{
        client_id: clientId || null,
        agency_name: agencyName,
        rating: Math.min(5, Math.max(1, rating)),
        comment: comment || "",
        plan: plan || "professional",
        approved: false, // Needs admin approval before showing on landing
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error("[Reviews API] Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Notify admin about new review
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Aura PropTech <noreply@auraproptech.io>",
          to: ["edoardo.oliveri07@gmail.com"],
          subject: `⭐ Nuova recensione: ${agencyName} (${rating}/5)`,
          html: `
            <h2>Nuova recensione da ${agencyName}</h2>
            <p><strong>Rating:</strong> ${"⭐".repeat(rating)} (${rating}/5)</p>
            <p><strong>Piano:</strong> ${plan}</p>
            <p><strong>Commento:</strong></p>
            <blockquote style="border-left: 3px solid #0070F3; padding-left: 12px; margin: 16px 0;">
              ${comment || "Nessun commento"}
            </blockquote>
            <p>Vai al pannello admin per approvare e pubblicare la recensione sul sito.</p>
          `,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[Reviews API] Error:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

// ── GET /api/reviews ─────────────────────────────────────────
// Fetch approved reviews for the landing page
export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ reviews: [] });
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("agency_name, rating, comment, plan, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("[Reviews API] Fetch error:", error);
      return NextResponse.json({ reviews: [] });
    }

    return NextResponse.json({ reviews: data || [] });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}
