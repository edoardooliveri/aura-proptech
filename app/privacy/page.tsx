import Link from "next/link";

export default function PrivacyPage() {
  const s = { color: "var(--text-secondary, #D1D5DB)" };
  const h = { color: "var(--text-primary, #fff)" };
  const m = { color: "var(--text-muted, #6B7280)" };
  const a = { color: "#0070F3" };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-xs font-mono hover:underline mb-8 inline-block" style={m}>← Torna alla Home</Link>

        <h1 className="font-mono text-3xl md:text-4xl font-bold mb-2" style={h}>Privacy Policy</h1>
        <p className="text-xs font-mono mb-10" style={m}>Ultimo aggiornamento: Marzo 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={s}>
          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>1. Titolare del trattamento</h2>
            <p>Il Titolare del trattamento dei dati personali è Edoardo Oliveri, con sede operativa a Savona (SV), titolare del progetto Aura PropTech. Per qualsiasi richiesta relativa alla privacy, puoi contattarci all&apos;indirizzo email: <a href="mailto:edoardo.oliveri07@gmail.com" style={a}>edoardo.oliveri07@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>2. Dati raccolti</h2>
            <p>Raccogliamo i seguenti tipi di dati personali: dati identificativi (nome, cognome) forniti attraverso i form di contatto e onboarding; dati di contatto (email, telefono, indirizzo) forniti per la creazione del sito web del cliente; dati di pagamento elaborati tramite Stripe (non conserviamo dati delle carte di credito); dati di navigazione raccolti tramite cookie analitici (Google Analytics); dati tecnici come indirizzo IP e tipo di browser.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>3. Base giuridica del trattamento</h2>
            <p>Il trattamento dei dati personali si basa su: il consenso dell&apos;interessato per l&apos;invio di comunicazioni commerciali; l&apos;esecuzione di un contratto per la fornitura dei servizi Aura PropTech; l&apos;obbligo legale per la conservazione dei dati fiscali e contabili; il legittimo interesse per il miglioramento dei servizi e la sicurezza della piattaforma.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>4. Finalità del trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalità: fornitura del servizio di creazione siti web con AI integrata; gestione dei pagamenti e della fatturazione tramite Stripe; comunicazioni relative al servizio (onboarding, aggiornamenti, supporto); analisi statistiche anonimizzate per migliorare il servizio; adempimento di obblighi di legge.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>5. Conservazione dei dati</h2>
            <p>I dati personali sono conservati per il tempo necessario al raggiungimento delle finalità per cui sono raccolti. In particolare: i dati contrattuali sono conservati per 10 anni dalla cessazione del rapporto; i dati di contatto per finalità commerciali sono conservati fino alla revoca del consenso; i dati di navigazione sono conservati per 26 mesi.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>6. Diritti dell&apos;interessato</h2>
            <p>Ai sensi del Regolamento UE 2016/679 (GDPR), l&apos;interessato ha diritto di: accedere ai propri dati personali; rettificare dati inesatti o incompleti; cancellare i propri dati (&ldquo;diritto all&apos;oblio&rdquo;); limitare il trattamento; portare i propri dati presso un altro titolare; opporsi al trattamento; revocare il consenso in qualsiasi momento. Per esercitare questi diritti, contattare: <a href="mailto:edoardo.oliveri07@gmail.com" style={a}>edoardo.oliveri07@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>7. Cookie</h2>
            <p>Questo sito utilizza cookie tecnici e analitici. Per maggiori informazioni, consulta la nostra <Link href="/cookies" style={a}>Cookie Policy</Link>.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>8. Trasferimento dati</h2>
            <p>Alcuni dati potrebbero essere trasferiti verso paesi extra-UE (Stripe negli USA, Google Analytics, Supabase). In tali casi, il trasferimento avviene nel rispetto delle garanzie previste dal GDPR, incluse le Clausole Contrattuali Standard approvate dalla Commissione Europea.</p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-bold mb-3" style={h}>9. Contatti</h2>
            <p>Per qualsiasi questione relativa alla privacy: <a href="mailto:edoardo.oliveri07@gmail.com" style={a}>edoardo.oliveri07@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
