import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function sendEmail(to: string, subject: string, html: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Aura PropTech <noreply@auraproptech.io>",
      to: [to],
      subject,
      html,
    }),
  });
}

// ── POST /api/notifications ──────────────────────────────────
// Body: { type, clientId }
// Types: "site_ready" | "expiring_30" | "expiring_7" | "renewal_confirmed" | "review_request"
export async function POST(req: NextRequest) {
  try {
    const { type, clientId } = await req.json();

    if (!type || !clientId) {
      return NextResponse.json({ error: "type and clientId required" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // Fetch client from onboarding_data
    const { data: client, error } = await supabase
      .from("onboarding_data")
      .select("*")
      .eq("id", clientId)
      .single();

    if (error || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const email = client.data?.email || "";
    const name = client.agency_name || "Cliente";

    switch (type) {
      case "site_ready":
        await sendEmail(
          email,
          `Il tuo sito è online! — ${name}`,
          `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0070F3;">Il tuo sito è online!</h1>
            <p>Ciao ${name},</p>
            <p>Siamo felici di comunicarti che il tuo sito web è stato completato e messo online.</p>
            <p>Puoi visitarlo all'indirizzo che ti abbiamo comunicato. Se hai domande o richieste di modifica, accedi alla tua dashboard cliente.</p>
            <p>Grazie per aver scelto Aura PropTech!</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Aura PropTech · Built in Italy</p>
          </div>
          `
        );
        break;

      case "expiring_30":
        await sendEmail(
          email,
          `Il tuo abbonamento scade tra 30 giorni — ${name}`,
          `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #F59E0B;">Promemoria scadenza abbonamento</h1>
            <p>Ciao ${name},</p>
            <p>Ti informiamo che il tuo abbonamento Aura PropTech scade tra <strong>30 giorni</strong>.</p>
            <p>Per continuare a usufruire del servizio senza interruzioni, il rinnovo avverrà automaticamente tramite il metodo di pagamento registrato.</p>
            <p>Se desideri modificare il piano o disdire, contattaci rispondendo a questa email.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Aura PropTech · Built in Italy</p>
          </div>
          `
        );
        break;

      case "expiring_7":
        await sendEmail(
          email,
          `Scadenza imminente — tra 7 giorni — ${name}`,
          `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #FF2D78;">Scadenza tra 7 giorni</h1>
            <p>Ciao ${name},</p>
            <p>Il tuo abbonamento scade tra <strong>7 giorni</strong>. Il rinnovo è automatico — se vuoi modificare o disdire, fallo entro la scadenza.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Aura PropTech · Built in Italy</p>
          </div>
          `
        );
        break;

      case "renewal_confirmed":
        await sendEmail(
          email,
          `Rinnovo confermato — ${name}`,
          `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00C781;">Rinnovo confermato!</h1>
            <p>Ciao ${name},</p>
            <p>Il pagamento per il rinnovo del tuo abbonamento è stato ricevuto con successo. Il tuo sito continuerà a funzionare senza interruzioni.</p>
            <p>Grazie per la fiducia!</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Aura PropTech · Built in Italy</p>
          </div>
          `
        );
        break;

      case "review_request":
        await sendEmail(
          email,
          `Come ti trovi con il tuo sito? — ${name}`,
          `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8B5CF6;">Come ti trovi?</h1>
            <p>Ciao ${name},</p>
            <p>Sono passati 30 giorni da quando il tuo sito è online. Ci piacerebbe sapere come ti trovi!</p>
            <p>La tua opinione è importante per noi e per i futuri clienti. Potresti dedicarci 2 minuti per rispondere a queste domande?</p>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 8px 0;">⭐ Quanto sei soddisfatto del sito? (1-5)</li>
              <li style="margin: 8px 0;">⭐ L'AI Concierge ti è utile? (1-5)</li>
              <li style="margin: 8px 0;">⭐ Consiglieresti Aura PropTech? (1-5)</li>
            </ul>
            <p>Rispondi semplicemente a questa email con le tue valutazioni e un breve commento.</p>
            <p>Grazie mille!</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Aura PropTech · Built in Italy</p>
          </div>
          `
        );
        break;

      default:
        return NextResponse.json({ error: "Unknown notification type" }, { status: 400 });
    }

    // Log notification
    try {
      await supabase.from("notifications_log").insert([{
        client_id: clientId,
        type,
        sent_at: new Date().toISOString(),
      }]);
    } catch { /* table may not exist yet */ }

    return NextResponse.json({ ok: true, type, sentTo: email });
  } catch (err) {
    console.error("[Notifications API] Error:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
