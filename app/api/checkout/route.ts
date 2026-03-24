import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ── Configurazione piani ─────────────────────────────────────────
const PLANS = {
  starter: {
    name: "Starter",
    setupAmount: 40000,       // €400,00
    monthlyAmount: 4999,      // €49,99
    setupDesc: "Onboarding, design personalizzato, sito web responsive, SEO ottimizzato.",
    monthlyDesc: "Hosting, aggiornamenti mensili, supporto email.",
  },
  professional: {
    name: "Professional",
    setupAmount: 100000,      // €1.000,00
    monthlyAmount: 9999,      // €99,99
    setupDesc: "Onboarding avanzato, AI Concierge, integrazione WhatsApp Business, training.",
    monthlyDesc: "AI Concierge 24/7, WhatsApp Business, lead scoring, dashboard analytics, report mensile, supporto prioritario.",
  },
  enterprise: {
    name: "Enterprise",
    setupAmount: 200000,      // €2.000,00
    monthlyAmount: 14999,     // €149,99
    setupDesc: "Setup completo, AI training personalizzato, integrazione CRM, configurazione multi-lingua, account manager dedicato.",
    monthlyDesc: "Tutto di Professional + CRM, multi-lingua, API personalizzate, account manager dedicato, SLA 99.9%.",
  },
} as const;

type PlanId = keyof typeof PLANS;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const agencyName: string = body.agencyName || "Agenzia";
    const planId: string = body.plan || "professional";

    // Valida il piano
    if (!(planId in PLANS)) {
      return NextResponse.json(
        { error: `Piano non valido: ${planId}. Piani disponibili: starter, professional, enterprise` },
        { status: 400 }
      );
    }

    const plan = PLANS[planId as PlanId];
    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      metadata: { agency_name: agencyName, plan: planId },
      subscription_data: { metadata: { agency_name: agencyName, plan: planId } },

      line_items: [
        // ── Setup Fee (una tantum) ───────────────────────────────
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Aura ${plan.name} — Setup`,
              description: plan.setupDesc,
            },
            unit_amount: plan.setupAmount,
          },
          quantity: 1,
        },
        // ── Canone Mensile (ricorrente) ──────────────────────────
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Aura ${plan.name} — Canone Mensile`,
              description: plan.monthlyDesc,
            },
            unit_amount: plan.monthlyAmount,
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
