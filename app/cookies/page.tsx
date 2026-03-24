import Link from "next/link";

export default function CookiePage() {
  const s = { color: "var(--text-secondary, #D1D5DB)" };
  const h = { color: "var(--text-primary, #fff)" };
  const m = { color: "var(--text-muted, #6B7280)" };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-xs font-mono hover:underline mb-8 inline-block" style={m}>← Torna alla Home</Link>

        <h1 className="font-mono text-3xl md:text-4xl font-bold mb-2" style={h}>Cookie Policy</h1>
        <p className="text-xs font-mono mb-10" style={m}>Ultimo aggiornamento: Marzo 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={s}>
          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>1. Cosa sono i cookie</h2>
            <p>I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell&apos;utente quando visita un sito web. Servono a migliorare l&apos;esperienza di navigazione, ricordare le preferenze dell&apos;utente e raccogliere informazioni statistiche sull&apos;utilizzo del sito.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>2. Cookie tecnici (necessari)</h2>
            <p>Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati. Includono: cookie di sessione per mantenere lo stato di navigazione; cookie di preferenza lingua (italiano/inglese); cookie di sicurezza per la protezione contro attacchi CSRF. Questi cookie non raccolgono informazioni personali e vengono eliminati alla chiusura del browser o dopo un breve periodo.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>3. Cookie analitici</h2>
            <p>Utilizziamo Google Analytics 4 per raccogliere informazioni anonimizzate sull&apos;utilizzo del sito. Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito, quali pagine vengono visitate maggiormente e da dove provengono i visitatori. I dati raccolti sono aggregati e anonimi. L&apos;indirizzo IP viene anonimizzato prima della memorizzazione. L&apos;utente può disattivare Google Analytics installando il componente aggiuntivo del browser per la disattivazione di Google Analytics.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>4. Cookie di terze parti</h2>
            <p>Il sito utilizza servizi di terze parti che potrebbero impostare propri cookie: Stripe per l&apos;elaborazione dei pagamenti (necessari per il checkout sicuro); Vercel Analytics per metriche di performance del sito. Questi cookie sono soggetti alle rispettive policy sulla privacy dei fornitori.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>5. Come gestire i cookie</h2>
            <p>Puoi gestire le preferenze sui cookie direttamente dal tuo browser. Tutti i browser moderni permettono di accettare, rifiutare o eliminare i cookie attraverso le impostazioni. Tieni presente che disabilitare i cookie tecnici potrebbe compromettere il funzionamento del sito. Per istruzioni specifiche, consulta la guida del tuo browser: Chrome, Firefox, Safari, Edge.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>6. Aggiornamenti</h2>
            <p>Questa Cookie Policy può essere aggiornata periodicamente. L&apos;ultima data di aggiornamento è indicata in cima alla pagina. Ti consigliamo di visitare questa pagina periodicamente per restare informato sulle nostre pratiche relative ai cookie.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>7. Contatti</h2>
            <p>Per domande sulla Cookie Policy: <a href="mailto:edoardo.oliveri07@gmail.com" style={{ color: "#0070F3" }}>edoardo.oliveri07@gmail.com</a></p>
            <p className="mt-2">Per la privacy policy completa, consulta la nostra <Link href="/privacy" style={{ color: "#0070F3" }}>Privacy Policy</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
