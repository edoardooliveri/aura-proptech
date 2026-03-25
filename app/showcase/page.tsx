"use client";

import { motion } from "framer-motion";
import { Monitor, MessageCircle, Settings, Database, ArrowRight, Sparkles, Search, Zap } from "lucide-react";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.6, delay, ease } as const,
});

const features = [
  { icon: Monitor, title: "Sito Web Completo", description: "Design moderno, ottimizzato per mobile e pronto per le conversioni" },
  { icon: MessageCircle, title: "AI Concierge Integrata", description: "Chatbot intelligente che guida i clienti 24/7" },
  { icon: Settings, title: "Pannello Admin", description: "Gestisci proprietà, clienti e campagne da un'unica dashboard" },
  { icon: Database, title: "Database in Tempo Reale", description: "Sincronizzazione automatica di proprietà e annunci" },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Aura PropTech" className="h-14" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Prezzi</Link>
          <Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <motion.div {...fadeUpView(0)}>
          <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "#0070F3" }}>SITO DEMO</p>
          <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ecco cosa creiamo{" "}
            <span style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>per la tua agenzia.</span>
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-12" style={{ color: "rgba(255,255,255,0.5)" }}>
            Siti moderni, intelligenti e progettati per convertire. Costruiamo esperienze immobiliari con AI integrata.
          </p>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div {...fadeUpView(0.15)} className="rounded-2xl overflow-hidden mb-16" style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 60px rgba(0,112,243,0.15), 0 40px 80px rgba(0,0,0,0.5)" }}>
          <div className="flex items-center gap-3 px-5 py-3" style={{ background: "rgba(20,25,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA42" }} />
            </div>
            <div className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-xs font-mono text-center" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
              la-tua-agenzia.auraproptech.io
            </div>
          </div>

          <div className="p-8 md:p-12" style={{ background: "linear-gradient(180deg, rgba(10,15,35,1) 0%, rgba(15,20,45,1) 50%, rgba(10,15,30,1) 100%)", minHeight: "400px" }}>
            {/* Navbar mockup */}
            <div className="flex items-center justify-between mb-10 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #0070F3, #3399FF)" }} />
                <div className="h-3 w-32 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>
              <div className="hidden md:flex gap-4">
                {["Immobili", "Ricerca", "Chi siamo", "Contatti"].map(t => (
                  <span key={t} className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Hero mockup */}
            <div className="text-center mb-10">
              <div className="inline-flex px-3 py-1 rounded-full mb-4" style={{ background: "rgba(0,112,243,0.1)", border: "1px solid rgba(0,112,243,0.2)" }}>
                <span className="text-[10px] font-mono" style={{ color: "#0070F3" }}>✦ AI Integrata</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Trova la tua <span style={{ color: "#0070F3" }}>casa ideale</span></h2>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>Ti accompagniamo nella ricerca dell&apos;immobile perfetto</p>
              <div className="flex items-center justify-center gap-2 max-w-sm mx-auto px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Search size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>Cerca per zona, prezzo o tipologia...</span>
              </div>
            </div>

            {/* Property cards mockup */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="h-24 md:h-32" style={{ background: `linear-gradient(135deg, rgba(0,112,243,${0.1+i*0.05}), rgba(123,47,255,${0.05+i*0.03}))` }} />
                  <div className="p-3">
                    <div className="h-2.5 w-3/4 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.12)" }} />
                    <div className="h-2 w-1/2 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <div className="h-3 w-20 rounded-full" style={{ background: "rgba(0,112,243,0.3)" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* AI bubble */}
            <div className="flex justify-end">
              <div className="rounded-2xl p-4 max-w-xs" style={{ background: "rgba(10,15,30,0.95)", border: "1px solid rgba(0,112,243,0.3)", boxShadow: "0 0 30px rgba(0,112,243,0.2)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={12} style={{ color: "#0070F3" }} />
                  <span className="text-[10px] font-mono font-bold" style={{ color: "#0070F3" }}>AI Concierge</span>
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Ciao! Cerchi casa? Dimmi zona e budget, ti trovo le migliori opzioni!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div {...fadeUpView(0)} className="text-center mb-12">
          <h2 className="font-mono text-2xl md:text-4xl font-bold">Cosa include ogni sito</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} {...fadeUpView(i * 0.08)} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,112,243,0.1)", border: "1px solid rgba(0,112,243,0.15)" }}>
                    <Icon size={18} style={{ color: "#0070F3" }} />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-sm mb-1.5">{f.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{f.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div {...fadeUpView(0)} className="rounded-2xl p-10 text-center" style={{ background: "rgba(0,112,243,0.05)", border: "1px solid rgba(0,112,243,0.15)" }}>
          <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">Pronto a trasformare la tua agenzia?</h2>
          <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Prova il configuratore live o scopri i piani disponibili.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/preview" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-sm text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}>
              <Sparkles size={16} /> Configura il tuo sito <ArrowRight size={14} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono font-semibold text-sm transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
              Scopri i prezzi <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 Aura PropTech · Built in Italy</p>
      </footer>
    </div>
  );
}
