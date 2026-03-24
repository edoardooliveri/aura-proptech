"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Check, ArrowRight, Bot, Globe, MessageCircle,
  BarChart3, Palette, Shield, Headphones, Star,
  Sparkles, Loader2,
} from "lucide-react";

// ── Smooth animation helpers ────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(10px)" } as const,
  animate: { opacity: 1, y: 0, filter: "blur(0px)" } as const,
  transition: { duration: 0.8, delay, ease } as const,
});

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(8px)" } as const,
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" } as const,
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.7, delay, ease } as const,
});

// ── Servizi inclusi ─────────────────────────────────────────────
const services = [
  {
    icon: Bot,
    title: "AI Concierge Personalizzata",
    desc: "Assistente AI che parla con la voce della tua agenzia. Nome, personalità, tone of voice — tutto configurato sul tuo brand. Risponde in < 2 secondi, 24/7/365.",
    tag: "CORE",
  },
  {
    icon: Globe,
    title: "Sito Web di Lusso",
    desc: "Un sito immobiliare premium, progettato per convertire. Design dark/light, responsive, con gestione portfolio integrata e pannello admin zero-competenze.",
    tag: "INCLUSO",
  },
  {
    icon: MessageCircle,
    title: "Integrazione WhatsApp Business",
    desc: "Core AI risponde anche su WhatsApp. I tuoi clienti scrivono dove preferiscono — l'AI cattura, qualifica e prenota. Tutto converge nel pannello unico.",
    tag: "BETA",
  },
  {
    icon: BarChart3,
    title: "Report Mensile sull'Efficienza",
    desc: "Ogni mese ricevi un report dettagliato: lead generati, tempo risparmiato, tasso di conversione, ROI reale. Numeri concreti, non metriche vanity.",
    tag: "ANALYTICS",
  },
  {
    icon: Palette,
    title: "Personalizzazione Totale",
    desc: "Colori, logo, nome dell'assistente, tono. Nessun template generico. Il tuo cliente vedrà un'estensione naturale del tuo team — non un prodotto di terzi.",
    tag: "BRANDING",
  },
  {
    icon: Shield,
    title: "Database Immobili Real-Time",
    desc: "Aggiungi, modifica, rimuovi proprietà dal pannello admin. Core AI si aggiorna istantaneamente. Zero rischio di dati obsoleti o immobili fantasma.",
    tag: "REAL-TIME",
  },
];

// ── Tutto incluso ─────────────────────────────────────────────
const included = [
  "Setup e onboarding in 48 ore",
  "Migrazione contenuti dal tuo sito attuale",
  "Configurazione brand completa (colori, logo, tono)",
  "Training AI sulle tue zone e il tuo portfolio",
  "Pannello admin intuitivo con tutorial",
  "Integrazione WhatsApp Business API",
  "Report efficienza mensile automatico",
  "Supporto tecnico prioritario via email e chat",
  "Aggiornamenti e miglioramenti AI continui",
  "Nessun vincolo annuale — disdici quando vuoi",
];

// ── FAQ ───────────────────────────────────────────────────────
const faqs = [
  {
    q: "Quanto ci vuole per andare live?",
    a: "48 ore dal pagamento del setup. Giorno 1: call di onboarding + raccolta dati. Giorno 2: configurazione e test. Fine giorno 2: Core AI è live sul tuo sito.",
  },
  {
    q: "Posso disdire quando voglio?",
    a: "Sì. Nessun contratto annuale. Paghi mese per mese. Se disdici, il servizio si ferma alla fine del mese pagato. Il setup di €1.499 non è rimborsabile.",
  },
  {
    q: "E se non ho un sito?",
    a: "Perfetto. Aura Elite include un sito web premium progettato per convertire. Non devi fare nulla — lo costruiamo noi basandoci sul tuo brand.",
  },
  {
    q: "L'AI risponde anche su WhatsApp?",
    a: "Sì. Core AI è integrato con WhatsApp Business API. I tuoi clienti scrivono su WhatsApp, l'AI risponde, qualifica il lead e ti notifica quando è caldo.",
  },
  {
    q: "Come gestite i dati dei miei clienti?",
    a: "Database dedicato per ogni agenzia. Nessuna condivisione di dati tra clienti. Hosting europeo, compliant GDPR. I tuoi dati sono tuoi — sempre.",
  },
];

export default function PricingPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleCheckout() {
    if (checkoutLoading) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* ── NEON GLOW ORBS ─────────────────────────────────────── */}
      <div className="neon-orb-pink" style={{ top: "-200px", right: "-200px" }} />
      <div className="neon-orb-blue" style={{ top: "30%", left: "-300px" }} />
      <div className="neon-orb-purple" style={{ bottom: "20%", right: "-200px", opacity: 0.6 }} />
      <div className="neon-orb-blue" style={{ bottom: "-200px", left: "20%", opacity: 0.4 }} />

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16 glass-strong">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-mono font-bold text-sm tracking-tight">
            AURA<span className="gradient-blue">PROPTECH</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/#demo"
            className="text-sm font-mono hover:text-white transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            Demo
          </Link>
          <Link
            href="/#problema"
            className="text-sm font-mono hover:text-white transition-colors duration-300 hidden md:block"
            style={{ color: "var(--text-secondary)" }}
          >
            Come funziona
          </Link>
        </div>
      </nav>

      <main className="pt-16 relative z-10">

        {/* ── HERO PRICING ──────────────────────────────────────── */}
        <section className="relative py-32 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-10 pulse-glow"
              style={{
                background: "rgba(255,45,120,0.08)",
                border: "1px solid rgba(255,45,120,0.25)",
                color: "#FF2D78",
              }}
            >
              <Sparkles size={12} />
              Un unico piano. Tutto incluso. Zero sorprese.
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-mono text-6xl md:text-7xl lg:text-8xl font-bold leading-[1] tracking-tighter mb-6"
            >
              <span className="gradient-hero">AURA ELITE</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Il pacchetto completo per trasformare la tua agenzia
              in una macchina da lead automatizzata.
            </motion.p>
          </div>
        </section>

        {/* ── PRICING CARD — il pezzo forte ─────────────────────── */}
        <section className="px-6 -mt-8 mb-28">
          <motion.div
            {...fadeUp(0.3)}
            className="max-w-2xl mx-auto"
          >
            {/* Animated gradient border */}
            <div
              className="rounded-3xl p-px border-shimmer overflow-hidden"
              style={{
                boxShadow: "0 0 80px rgba(0,112,243,0.2), 0 0 160px rgba(255,45,120,0.1), 0 40px 100px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{ background: "rgba(8,12,25,0.95)", backdropFilter: "blur(20px)" }}
              >
                {/* Top glow line */}
                <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #FF2D78, #0070F3, transparent)" }} />

                <div className="p-10 md:p-14 text-center">
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-8"
                    style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)", color: "white" }}
                  >
                    <Star size={12} className="fill-current" />
                    PIANO UNICO
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-baseline justify-center gap-3 mb-2">
                      <span
                        className="text-7xl md:text-8xl font-mono font-bold tracking-tighter"
                        style={{ color: "white" }}
                      >
                        €149
                      </span>
                      <span className="text-xl font-mono" style={{ color: "var(--text-muted)" }}>
                        /mese
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px flex-1 max-w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
                      <span
                        className="text-sm font-mono px-3 py-1 rounded-full"
                        style={{ background: "rgba(255,45,120,0.08)", border: "1px solid rgba(255,45,120,0.2)", color: "#FF2D78" }}
                      >
                        + €1.499 setup una tantum
                      </span>
                      <div className="h-px flex-1 max-w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
                    </div>
                  </div>

                  <p className="text-sm font-mono mt-4 mb-10" style={{ color: "var(--text-muted)" }}>
                    Operativo in 48h · Disdici quando vuoi · Nessun vincolo
                  </p>

                  {/* CTA — Stripe Checkout */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="group inline-flex items-center justify-center gap-2.5 w-full max-w-md px-8 py-5 rounded-2xl font-mono font-bold text-lg text-white transition-all disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                      boxShadow: "0 0 40px rgba(0,112,243,0.4), 0 8px 32px rgba(0,0,0,0.4)",
                    }}
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Reindirizzamento a Stripe...
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        ATTIVA AURA ELITE ORA
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs font-mono mt-5" style={{ color: "var(--text-muted)" }}>
                    Il setup si ripaga con una singola provvigione in più.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px mx-10" style={{ background: "rgba(255,255,255,0.05)" }} />

                {/* ROI strip */}
                <div className="grid grid-cols-3 gap-0 divide-x" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  {[
                    { value: "€3.287", label: "Costo primo anno", color: "var(--blue-bright)" },
                    { value: "€72.000+", label: "Valore recuperato", color: "#00C781" },
                    { value: "22x", label: "ROI medio", color: "#FF2D78" },
                  ].map((s, i) => (
                    <div key={i} className="py-6 text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                      <p className="text-2xl font-mono font-bold" style={{ color: s.color }}>
                        {s.value}
                      </p>
                      <p className="text-[10px] font-mono mt-1" style={{ color: "var(--text-muted)" }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── SERVIZI INCLUSI ───────────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeUpView(0)}
              className="text-center mb-16"
            >
              <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
                COSA INCLUDE AURA ELITE
              </p>
              <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
                <span style={{ color: "var(--text-primary)" }}>6 servizi.</span>{" "}
                <span className="gradient-blue">Un unico prezzo.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  {...fadeUpView(i * 0.08)}
                  className="rounded-2xl p-6 relative overflow-hidden card-interactive-blue"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(0,112,243,0.08)", border: "1px solid rgba(0,112,243,0.15)" }}
                      >
                        <s.icon size={18} style={{ color: "var(--blue-bright)" }} />
                      </div>
                      <span
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(0,112,243,0.08)", color: "var(--blue)", border: "1px solid rgba(0,112,243,0.15)" }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="font-mono font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHECKLIST TUTTO INCLUSO ────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              {...fadeUpView(0)}
              className="text-center mb-14"
            >
              <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
                ZERO COSTI NASCOSTI
              </p>
              <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold">
                Tutto incluso nel prezzo.{" "}
                <span className="gradient-blue">Tutto.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUpView(0.1)}
              className="rounded-2xl p-8 md:p-10 glass"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {included.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(0,199,129,0.08)", border: "1px solid rgba(0,199,129,0.15)" }}
                    >
                      <Check size={11} style={{ color: "#00C781" }} />
                    </div>
                    <span className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              {...fadeUpView(0)}
              className="text-center mb-14"
            >
              <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
                DOMANDE FREQUENTI
              </p>
              <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold">
                Prima che tu chieda.
              </h2>
            </motion.div>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  {...fadeUpView(i * 0.06)}
                  className="rounded-xl p-6 card-interactive"
                >
                  <h3 className="font-mono font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINALE ─────────────────────────────────────────── */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <motion.div
            {...fadeUpView(0)}
            className="max-w-3xl mx-auto relative z-10"
          >
            <p className="text-xs font-mono font-semibold mb-6 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
              LA SCELTA E&apos; SEMPLICE
            </p>
            <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              €1.499 adesso, o<br />
              <span className="gradient-hero">
                €72.000 ogni anno. Per sempre.
              </span>
            </h2>
            <p className="text-lg mb-14" style={{ color: "var(--text-secondary)" }}>
              Il setup si ripaga al primo cliente chiuso con l&apos;AI.
              Tutto il resto è profitto netto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-mono font-bold text-base text-white transition-all hover:scale-105 disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                  boxShadow: "0 0 40px rgba(0,112,243,0.3), 0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {checkoutLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Zap size={18} />
                )}
                ATTIVA AURA ELITE ORA
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="mailto:info@auraproptech.io"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-mono font-semibold text-base transition-all hover:scale-105 glass"
                style={{ color: "var(--blue-bright)" }}
              >
                <Headphones size={16} />
                Parla con noi
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-10 px-6 text-center relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            <Zap size={11} className="text-white" />
          </div>
          <span className="font-mono font-bold text-sm">
            AURA<span className="gradient-blue">PROPTECH</span>
          </span>
        </div>
        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          © 2026 Aura PropTech · Built in Italy · Powered by Gemini AI
        </p>
      </footer>
    </div>
  );
}
