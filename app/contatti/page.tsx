"use client";

import { motion } from "framer-motion";
import { Mail, Clock, Zap, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.6, delay, ease } as const,
});

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Aura PropTech" className="h-14" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/showcase" className="hover:text-white transition-colors">Sito Demo</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Prezzi</Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-10 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <motion.div {...fadeUpView(0)}>
          <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "#0070F3" }}>CONTATTACI</p>
          <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Parliamo del{" "}
            <span style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>tuo progetto.</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Raccontaci della tua agenzia. Ti ricontatteremo entro 24 ore con una proposta personalizzata.
          </p>
        </motion.div>
      </section>

      {/* Form + Info */}
      <section className="pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div {...fadeUpView(0.15)} className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <ContactForm />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Mail size={14} style={{ color: "#0070F3" }} />
                <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
              </div>
              <a href="mailto:edoardo.oliveri07@gmail.com" className="font-mono text-sm font-semibold hover:underline" style={{ color: "#0070F3" }}>
                edoardo.oliveri07@gmail.com
              </a>
            </div>

            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Risposta</p>
              </div>
              <p className="font-mono text-sm font-semibold">Entro 24 ore lavorative</p>
            </div>

            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Setup</p>
              </div>
              <p className="font-mono text-sm font-semibold">Operativo in 48h dal pagamento</p>
            </div>

            <div className="rounded-xl p-5" style={{ background: "rgba(0,112,243,0.05)", border: "1px solid rgba(0,112,243,0.15)" }}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} style={{ color: "#0070F3" }} />
                <p className="font-mono text-xs font-bold" style={{ color: "#0070F3" }}>Preferisci provare subito?</p>
              </div>
              <p className="text-xs font-mono mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                Vai sulla homepage e parla con Core AI. Scopri il tuo ROI in 2 minuti.
              </p>
              <Link href="/#demo" className="inline-flex items-center gap-1 text-xs font-mono font-semibold" style={{ color: "#0070F3" }}>
                Prova Core AI <ArrowRight size={12} />
              </Link>
            </div>
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
