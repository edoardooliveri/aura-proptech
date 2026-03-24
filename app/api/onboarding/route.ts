import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, plan, agencyName, ...rest } = body;

    if (!agencyName) {
      return NextResponse.json({ error: "Nome agenzia obbligatorio" }, { status: 400 });
    }

    // Save to Supabase
    let savedId: string | null = null;
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("onboarding_data")
        .insert([{
          session_id: sessionId || null,
          agency_name: agencyName,
          plan: plan || "professional",
          data: rest,
          status: "pending",
        }])
        .select()
        .single();

      if (error) {
        console.error("[Onboarding API] Supabase error:", error);
      } else {
        savedId = data?.id;
      }
    }

    // Send email notification via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const zones = rest.zonesPrimary?.split("\n").filter(Boolean).join(", ") || "—";
      const emailBody = `
        <h2>Nuovo onboarding: ${agencyName}</h2>
        <p><strong>Piano:</strong> ${plan}</p>
        <p><strong>Session:</strong> ${sessionId || "N/A"}</p>
        <hr/>
        <h3>Contatti</h3>
        <p>Tel: ${rest.phoneMobile || "—"} | Fisso: ${rest.phoneFixed || "—"}</p>
        <p>Email: ${rest.email || "—"}</p>
        <p>Indirizzo: ${rest.address || "—"}</p>
        <p>WhatsApp: ${rest.whatsapp || "—"}</p>
        <h3>Branding</h3>
        <p>Colori: ${rest.colorPrimary} / ${rest.colorDark} / ${rest.colorLight}</p>
        <h3>Stile & Grafica</h3>
        <p>Tema: ${rest.stylePreset || "—"}</p>
        <p>Font: ${rest.fontPairing || "—"}</p>
        <p>Layout: ${rest.layoutPreference || "—"}</p>
        <p>Siti ispirazione: ${rest.inspirationUrls || "—"}</p>
        <p>Note stile: ${rest.styleNotes || "—"}</p>
        <h3>Zone</h3>
        <p>Principali: ${zones}</p>
        <p>Secondarie: ${rest.zonesSecondary?.split("\n").filter(Boolean).join(", ") || "—"}</p>
        ${plan !== "starter" ? `
        <h3>AI Concierge</h3>
        <p>Nome: ${rest.aiName || "—"} | Ruolo: ${rest.aiRole || "—"}</p>
        <p>Anni: ${rest.aiYears || "—"} | Area: ${rest.aiArea || "—"}</p>
        <p>Benvenuto: ${rest.aiWelcome || "—"}</p>
        <p>Personalità: ${rest.aiPersonality || "—"}</p>
        ` : ""}
      `;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Aura PropTech <noreply@auraproptech.io>",
            to: ["edoardo.oliveri07@gmail.com"],
            subject: `🆕 Onboarding: ${agencyName} (${plan})`,
            html: emailBody,
          }),
        });
      } catch (emailErr) {
        console.warn("[Onboarding API] Email error:", emailErr);
      }
    }

    return NextResponse.json({ ok: true, id: savedId });
  } catch (err) {
    console.error("[Onboarding API] Error:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
