import Link from "next/link";

export default function TermsPage() {
  const s = { color: "var(--text-secondary, #D1D5DB)" };
  const h = { color: "var(--text-primary, #fff)" };
  const m = { color: "var(--text-muted, #6B7280)" };
  const a = { color: "#0070F3" };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-xs font-mono hover:underline mb-8 inline-block" style={m}>← Torna alla Home</Link>

        <h1 className="font-mono text-3xl md:text-4xl font-bold mb-2" style={h}>Termini di Servizio</h1>
        <p className="text-xs font-mono mb-10" style={m}>Ultimo aggiornamento: Marzo 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={s}>
          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>1. Descrizione del servizio</h2>
            <p>Aura PropTech, progetto di Edoardo Oliveri con sede a Savona, offre un servizio di creazione e gestione di siti web per agenzie immobiliari con intelligenza artificiale integrata. Il servizio include la progettazione, lo sviluppo, il deploy e la manutenzione del sito web, oltre all&apos;eventuale configurazione dell&apos;assistente AI (a seconda del piano scelto).</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>2. Piani e prezzi</h2>
            <p>Il servizio è disponibile in tre piani, ciascuno con un costo di setup una tantum e un canone mensile:</p>
            <p className="mt-2"><strong>Starter</strong> (Solo sito web): setup €399,99 + IVA, canone €24,99/mese + IVA. Include sito web professionale responsive, pannello admin, database immobili, dominio, hosting, manutenzione e SEO.</p>
            <p className="mt-2"><strong>Professional</strong> (Sito + AI): setup €999,99 + IVA, canone €149,99/mese + IVA. Include tutto lo Starter più AI Concierge 24/7, qualificazione lead automatica, integrazione WhatsApp Business e report mensile.</p>
            <p className="mt-2"><strong>Enterprise</strong> (Full service): setup €1.999,99 + IVA, canone €199,99/mese + IVA. Include tutto il Professional più AI multilingue avanzata, account manager dedicato, personalizzazione avanzata, integrazione CRM e supporto prioritario.</p>
            <p className="mt-2">I prezzi indicati sono al netto di IVA (22%). Aura PropTech si riserva il diritto di modificare i prezzi con un preavviso di 30 giorni.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>3. Pagamento</h2>
            <p>Il pagamento avviene tramite la piattaforma Stripe. Il costo di setup viene addebitato al momento dell&apos;acquisto. Il canone mensile viene addebitato automaticamente con cadenza mensile a partire dalla data di attivazione del servizio. In caso di mancato pagamento, il servizio potrà essere sospeso dopo 7 giorni di ritardo e disattivato dopo 30 giorni.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>4. Tempi di consegna</h2>
            <p>Il sito web viene consegnato entro 7 giorni lavorativi dal ricevimento di tutti i dati necessari attraverso il form di onboarding. Eventuali modifiche richieste dopo la consegna saranno valutate caso per caso.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>5. Diritto di recesso</h2>
            <p>Ai sensi del D.Lgs. 206/2005 (Codice del Consumo), il cliente consumatore ha diritto di recedere dal contratto entro 14 giorni dalla data di acquisto, senza dover fornire alcuna motivazione. Il recesso va comunicato via email a <a href="mailto:edoardo.oliveri07@gmail.com" style={a}>edoardo.oliveri07@gmail.com</a>. In caso di recesso, verrà rimborsato il costo di setup al netto di eventuali lavori già eseguiti.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>6. Cancellazione abbonamento</h2>
            <p>Il cliente può cancellare l&apos;abbonamento mensile in qualsiasi momento. La cancellazione ha effetto dalla fine del periodo di fatturazione corrente. Non sono previsti rimborsi per periodi parziali. Dopo la cancellazione, il sito web rimarrà online fino alla fine del periodo pagato, dopodiché verrà disattivato.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>7. Proprietà intellettuale</h2>
            <p>Il codice sorgente del sito web creato per il cliente è di proprietà di Aura PropTech. Il cliente riceve una licenza d&apos;uso non esclusiva per la durata dell&apos;abbonamento. I contenuti forniti dal cliente (testi, immagini, dati degli immobili) restano di proprietà del cliente. Il brand, il logo e i materiali di Aura PropTech sono di esclusiva proprietà del titolare.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>8. Limitazione di responsabilità</h2>
            <p>Aura PropTech si impegna a garantire un uptime del 99.9% per i siti web ospitati. Non si assume responsabilità per: interruzioni dovute a cause di forza maggiore; danni derivanti dall&apos;uso improprio del servizio da parte del cliente; perdita di dati causata da azioni del cliente; risultati commerciali derivanti dall&apos;uso del sito web o dell&apos;AI.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>9. Foro competente</h2>
            <p>Per qualsiasi controversia derivante dall&apos;interpretazione o dall&apos;esecuzione dei presenti Termini di Servizio, il Foro competente è quello di Savona.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>10. Modifiche ai termini</h2>
            <p>Aura PropTech si riserva il diritto di modificare i presenti Termini di Servizio in qualsiasi momento. Le modifiche saranno comunicate via email con un preavviso di 30 giorni. L&apos;utilizzo continuato del servizio dopo la notifica delle modifiche costituisce accettazione dei nuovi termini.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>11. Contatti</h2>
            <p>Per qualsiasi domanda sui Termini di Servizio: <a href="mailto:edoardo.oliveri07@gmail.com" style={a}>edoardo.oliveri07@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
