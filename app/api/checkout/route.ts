import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const agencyName: string = body.agencyName || "Agenzia";

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      metadata: { agency_name: agencyName },
      subscription_data: { metadata: { agency_name: agencyName } },

      line_items: [
        // ── Setup Fee (una tantum) ───────────────────────────────
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Aura Elite — Setup",
              description:
                "Onboarding, configurazione AI, sito web premium, training personalizzato. Operativo in 48h.",
            },
            unit_amount: 149900, // €1.499,00
          },
          quantity: 1,
        },
        // ── Canone Mensile (ricorrente) ──────────────────────────
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Aura Elite — Canone Mensile",
              description:
                "AI Concierge 24/7, hosting sito, WhatsApp Business, report mensile, aggiornamenti continui.",
            },
            unit_amount: 14900, // €149,00
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,

      allow_promotion_codes: true,
      billing_address_collection: "required",

      custom_fields: [
        {
          key: "agency_name",
          label: { type: "custom", custom: "Nome della tua Agenzia" },
          type: "text",
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Errore Stripe";
    console.error("[Checkout]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
