import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

<<<<<<< HEAD
=======
// ── Configurazione piani ────────────────────────────────────────
const PLANS = {
  starter: {
    name: "Aura Starter",
    setupAmount: 39999, // €399,99 + IVA
    monthlyAmount: 2499, // €24,99
    setupDesc:
      "Onboarding, sito web professionale responsive, configurazione brand. Operativo in 7 giorni. Prezzo + IVA.",
    monthlyDesc:
      "Hosting sito, dominio, database immobili, pannello admin, supporto email, aggiornamenti continui.",
  },
  professional: {
    name: "Aura Professional",
    setupAmount: 99999, // €999,99 + IVA
    monthlyAmount: 14999, // €149,99
    setupDesc:
      "Onboarding, configurazione AI, sito web premium, training personalizzato. Operativo in 7 giorni. Prezzo + IVA.",
    monthlyDesc:
      "AI Concierge 24/7, hosting sito, WhatsApp Business, report mensile, aggiornamenti continui.",
  },
  enterprise: {
    name: "Aura Enterprise",
    setupAmount: 199999, // €1.999,99 + IVA
    monthlyAmount: 19999, // €199,99
    setupDesc:
      "Onboarding premium, AI avanzata multilingue, sito web premium, strategia AI personalizzata. Operativo in 7 giorni. Prezzo + IVA.",
    monthlyDesc:
      "AI Concierge multilingue 24/7, hosting, WhatsApp avanzato, analytics custom, account manager dedicato, integrazioni CRM, supporto prioritario.",
  },
} as const;

type PlanId = keyof typeof PLANS;

>>>>>>> 1bfb328 (feat: dashboard cliente, admin panel, configuratore live, notifiche, recensioni, before/after)
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
