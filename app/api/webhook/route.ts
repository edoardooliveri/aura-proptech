import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

// Stripe sends raw body — we need to disable Next.js body parsing
export const runtime = "nodejs";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Supabase service-role client for server-side writes
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[Webhook] Supabase non configurata — skip DB insert.");
    return null;
  }
  return createClient(url, key);
}

// ── Notifica email via Resend (opzionale) ────────────────────────
async function notifyEdoardo(agencyName: string, email: string, amount: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL || "info@auraproptech.io";

  // Log sempre, anche senza Resend
  console.log(
    `\n🎉 NUOVO PARTNER! Prepara il setup per: ${agencyName}\n` +
    `   Email: ${email}\n` +
    `   Importo: ${amount}\n`
  );

  if (!resendKey) {
    console.warn("[Webhook] RESEND_API_KEY non configurata — notifica solo in console.");
    return;
  }

  try {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Core AI <notifiche@auraproptech.io>",
      to: [notifyEmail],
      subject: `Nuovo Partner: ${agencyName}`,
      html: `
        <div style="font-family:monospace;background:#0A0A0F;color:#fff;padding:40px;border-radius:16px;">
          <h1 style="color:#0070F3;">Edoardo, abbiamo un nuovo partner!</h1>
          <h2 style="color:#FF2D78;">Prepara il setup per ${agencyName}</h2>
          <hr style="border-color:#222;" />
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Importo:</strong> ${amount}</p>
          <p><strong>Piano:</strong> Aura Elite (€1.499 setup + €149/mese)</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString("it-IT")}</p>
          <hr style="border-color:#222;" />
          <p style="color:#00C781;">Setup da completare entro 48h</p>
        </div>
      `,
    });
    console.log("[Webhook] Email notifica inviata a", notifyEmail);
  } catch (e) {
    console.error("[Webhook] Errore invio email:", e);
  }
}

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  // ── Verifica firma Stripe ────────────────────────────────────
  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");
    if (!sig || !endpointSecret) {
      return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
    }
    event = getStripe().webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("[Webhook] Signature error:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // ── Gestisci evento checkout completato ──────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customFields = session.custom_fields || [];
    const agencyField = customFields.find((f) => f.key === "agency_name");
    const agencyName =
      agencyField?.text?.value ||
      session.metadata?.agency_name ||
      "Agenzia sconosciuta";

    const customerEmail = session.customer_details?.email || "n/a";
    const customerName = session.customer_details?.name || "";
    const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id || null;
    const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id || null;
    const amountTotal = session.amount_total
      ? `€${(session.amount_total / 100).toFixed(2)}`
      : "n/a";

    // ── Inserisci in Supabase ────────────────────────────────
    const supabase = getSupabase();
    if (supabase) {
      const { error: dbError } = await supabase.from("customers").insert({
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        agency_name: agencyName,
        owner_name: customerName,
        email: customerEmail,
        plan: "elite",
        status: "active",
        setup_paid: true,
        amount_setup: 1499,
        amount_monthly: 149,
      });

      if (dbError) {
        console.error("[Webhook] Supabase insert error:", dbError.message);
      } else {
        console.log("[Webhook] Customer saved:", agencyName);
      }
    }

    // ── Notifica ─────────────────────────────────────────────
    await notifyEdoardo(agencyName, customerEmail, amountTotal);
  }

  // ── Gestisci cancellazione subscription ──────────────────────
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const supabase = getSupabase();
    if (supabase) {
      await supabase
        .from("customers")
        .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
        .eq("stripe_subscription_id", sub.id);
      console.log("[Webhook] Subscription cancelled:", sub.id);
    }
  }

  return NextResponse.json({ received: true });
}
