import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; phone?: string; message?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body non valido" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim() || null;
  const message = body.message?.trim() || null;
  const source = body.source || "landing_page";

  if (!name || !email) {
    return NextResponse.json({ error: "Nome e email sono obbligatori." }, { status: 400 });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.warn("[Contact] Supabase non configurata — log only.");
    console.log("[Contact] Lead:", { name, email, phone, message, source });
    return NextResponse.json({ ok: true });
  }

  try {
    const { error: dbError } = await supabase.from("leads_b2b").insert({
      owner_name: name,
      email,
      phone,
      notes: message,
      source,
      status: "new",
      plan_interest: "unknown",
    });

    if (dbError) {
      console.error("[Contact] Supabase error:", dbError.message);
      return NextResponse.json({ error: "Errore nel salvataggio." }, { status: 500 });
    }

    console.log("[Contact] Lead saved:", email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Errore server";
    console.error("[Contact]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
