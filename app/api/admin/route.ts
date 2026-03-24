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
  // ── Auth check ──────────────────────────────────────────────
  const { password } = await req.json().catch(() => ({ password: "" }));
  const adminPw = process.env.ADMIN_PASSWORD;

  if (!adminPw || password !== adminPw) {
    return NextResponse.json({ error: "Accesso negato." }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase non configurata." }, { status: 500 });
  }

  try {
    // Run queries in parallel
    const [customersRes, leadsRes] = await Promise.all([
      supabase
        .from("customers")
        .select("id, created_at, agency_name, owner_name, email, status, plan, amount_monthly, setup_paid")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("leads_b2b")
        .select("id, created_at, owner_name, email, agency_name, status, plan_interest, source")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    const customers = customersRes.data || [];
    const leads = leadsRes.data || [];

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter((c) => c.status === "active").length;
    const cancelledCustomers = customers.filter((c) => c.status === "cancelled").length;
    const totalLeads = leads.length;
    const convertedLeads = leads.filter((l) => l.status === "converted").length;

    // MRR = active customers * amount_monthly
    const mrr = customers
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + (c.amount_monthly || 149), 0);

    return NextResponse.json({
      stats: {
        totalCustomers,
        activeCustomers,
        cancelledCustomers,
        totalLeads,
        convertedLeads,
        mrr,
      },
      customers: customers.slice(0, 10),
      leads: leads.slice(0, 10),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Errore database";
    console.error("[Admin API]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
