"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check, ArrowRight, Crown, Globe, MessageCircle,
  BarChart3, Palette, Shield, Headphones, Star,
  Sparkles, Brain, Zap as ZapIcon,
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

// ── Pricing Plans ──────────────────────────────────────────────
const plans = [
  {
    id: "starter",
    name: "Starter",
    setup: 400,
    monthly: 49.99,
    badge: false,
    features: [
      "Sito web moderno e responsive",
      "Design personalizzato",
      "SEO ottimizzato",
      "Hosting incluso",
      "Supporto email",
      "Aggiornamenti mensili",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    setup: 1000,
    monthly: 99.99,
    badge: "PIÙ POPOLARE",
    popular: true,
    features: [
      "Tutto di Starter, più:",
      "AI Concierge 24/7",
      "Integrazione WhatsApp Business",
      "Lead scoring automatico",
      "Dashboard analytics",
      "Report mensile performance",
      "Supporto prioritario",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    setup: 2000,
    monthly: 149.99,
    badge: false,
    features: [
      "Tutto di Professional, più:",
      "AI Training personalizzato",
      "Integrazione CRM",
      "Multi-lingua (IT/EN)",
      "API personalizzate",
      "Account manager dedicato",
      "SLA garantito 99.9%",
    ],
  },
];

// ── FAQ ───────────────────────────────────────────────────────
const faqs = [
  {
    q: "Qual è la differenza tra i piani?",
    a: "Starter è perfetto per agenzie piccole che vogliono un sito web moderno. Professional aggiunge AI Concierge e automazione lead. Enterprise include integrazioni avanzate, training personalizzato e supporto dedicato.",
  },
  {
    q: "Posso cambiare piano in qualsiasi momento?",
    a: "Sì, puoi effettuare l'upgrade o il downgrade del tuo piano in qualsiasi momento. Se effettui l'upgrade, pagherai la differenza. Se effettui il downgrade, il credito verrà applicato al mese successivo.",
  },
  {
    q: "Quanto tempo ci vuole per andare live?",
    a: "Il setup varia in base al piano. Starter: 5-7 giorni lavorativi. Professional e Enterprise: 10-14 giorni con onboarding e training inclusi.",
  },
  {
    q: "C'è un contratto minimo o un impegno annuale?",
    a: "No, puoi disdire il tuo abbonamento in qualsiasi momento, senza penalità. Il costo di setup non è rimborsabile, ma i canoni mensili possono essere disdetti senza vincoli.",
  },
  {
    q: "Quali metodi di pagamento accettate?",
    a: "Accettiamo carte di credito (Visa, Mastercard, Amex), bonifici bancari e pagamenti ricorrenti per abbonamenti mensili.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* ── NEON GLOW ORBS ─────────────────────────────────────── */}
      <div className="neon-orb-pink" style={{ top: "-200px", right: "-200px" }} />
      <div className="neon-orb-blue" style={{ top: "30%", left: "-300px" }} />
      <div className="neon-orb-purple" style={{ bottom: "20%", right: "-200px", opacity: 0.6 }} />
      <div className="neon-orb-blue" style={{ bottom: "-200px", left: "20%", opacity: 0.4 }} />

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16 glass-strong">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Aura PropTech" className="h-9" style={{ mixBlendMode: "screen" }} />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/showcase" className="hover:text-white transition-colors">Sito Demo</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link>
        </div>
      </nav>

      <main className="pt-16 relative z-10">

        {/* ── HERO SECTION ──────────────────────────────────────── */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-10 pulse-glow"
              style={{
                background: "rgba(0,112,243,0.08)",
                border: "1px solid rgba(0,112,243,0.25)",
                color: "#0070F3",
              }}
            >
              <Star size={12} className="fill-current" />
              Piani trasparenti e flessibili
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tighter mb-6"
            >
              <span className="gradient-blue">Scegli il piano</span>
              <br />
              perfetto per la tua agenzia
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Tutti i piani includono hosting, supporto e aggiornamenti.
              Nessun costo nascosto, nessun vincolo.
            </motion.p>
          </div>
        </section>

        {/* ── PRICING CARDS ─────────────────────────────────────── */}
        <section className="px-6 py-16 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  {...fadeUpView(idx * 0.1)}
                  className="relative"
                >
                  {/* Popular badge background glow */}
                  {plan.popular && (
                    <div
                      className="absolute inset-0 rounded-3xl opacity-20 blur-2xl -z-10"
                      style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
                    />
                  )}

                  {/* Card */}
                  <div
                    className={`rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col ${
                      plan.popular
                        ? "border-shimmer p-px"
                        : "border border-white border-opacity-10"
                    }`}
                    style={
                      plan.popular
                        ? {
                            boxShadow:
                              "0 0 80px rgba(0,112,243,0.25), 0 0 160px rgba(255,45,120,0.1), 0 40px 100px rgba(0,0,0,0.6)",
                          }
                        : {}
                    }
                  >
                    <div
                      className="rounded-3xl overflow-hidden h-full flex flex-col"
                      style={{
                        background: plan.popular
                          ? "rgba(8,12,25,0.98)"
                          : "rgba(8,12,25,0.7)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* Top glow line for popular */}
                      {plan.popular && (
                        <div
                          className="h-px"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, #0070F3, #7B2FFF, transparent)",
                          }}
                        />
                      )}

                      <div className="p-8 md:p-10 flex flex-col h-full">
                        {/* Badge */}
                        {plan.popular && (
                          <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 w-fit"
                            style={{
                              background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                              color: "white",
                            }}
                          >
                            <Crown size={12} className="fill-current" />
                            {plan.badge}
                          </div>
                        )}

                        {/* Plan name */}
                        <h3 className="font-mono text-2xl md:text-3xl font-bold mb-2">
                          {plan.name}
                        </h3>

                        {/* Price */}
                        <div className="mb-6">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span
                              className="text-5xl md:text-6xl font-mono font-bold"
                              style={{ color: "white" }}
                            >
                              €{plan.monthly.toFixed(2)}
                            </span>
                            <span
                              className="text-lg font-mono"
                              style={{ color: "var(--text-muted)" }}
                            >
                              /mese
                            </span>
                          </div>
                          <p
                            className="text-sm font-mono"
                            style={{ color: "#0070F3" }}
                          >
                            + €{plan.setup.toLocaleString()} setup una tantum
                          </p>
                        </div>

                        {/* Features */}
                        <div className="mb-10 flex-1">
                          <ul className="space-y-3">
                            {plan.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm"
                              >
                                {feature.startsWith("Tutto") ? (
                                  <ZapIcon
                                    size={16}
                                    style={{ color: "#0070F3", marginTop: "2px" }}
                                    className="flex-shrink-0"
                                  />
                                ) : (
                                  <Check
                                    size={16}
                                    style={{ color: "#00C781", marginTop: "2px" }}
                                    className="flex-shrink-0"
                                  />
                                )}
                                <span style={{ color: "var(--text-secondary)" }}>
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Button */}
                        <motion.a
                          href={`/onboarding?plan=${plan.id}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-mono font-bold text-base transition-all duration-300"
                          style={
                            plan.popular
                              ? {
                                  background:
                                    "linear-gradient(135deg, #0070F3, #7B2FFF)",
                                  color: "white",
                                  boxShadow:
                                    "0 0 40px rgba(0,112,243,0.4), 0 8px 32px rgba(0,0,0,0.4)",
                                }
                              : {
                                  background: "rgba(255,255,255,0.05)",
                                  color: "white",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                }
                          }
                        >
                          <ZapIcon size={18} />
                          Inizia ora
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </motion.a>

                        <p
                          className="text-xs font-mono text-center mt-4"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Nessun vincolo. Disdici quando vuoi.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES COMPARISON HINT ───────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeUpView(0)}
              className="rounded-2xl p-8 md:p-12 glass text-center"
            >
              <h3 className="font-mono text-lg font-semibold mb-3">
                Curiosità?
              </h3>
              <p style={{ color: "var(--text-secondary)" }} className="mb-6">
                Confronta in dettaglio tutte le funzionalità di ogni piano, oppure
                contattaci per una consulenza personalizzata.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#faq"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105"
                  style={{
                    background: "rgba(0,112,243,0.1)",
                    border: "1px solid rgba(0,112,243,0.2)",
                    color: "#0070F3",
                  }}
                >
                  Leggi le FAQ
                </Link>
                <a
                  href="mailto:info@auraproptech.io"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                    color: "white",
                  }}
                >
                  <Headphones size={16} />
                  Parla con noi
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="py-28 px-6" id="faq">
          <div className="max-w-3xl mx-auto">
            <motion.div
              {...fadeUpView(0)}
              className="text-center mb-14"
            >
              <p
                className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase"
                style={{ color: "var(--blue)" }}
              >
                DOMANDE FREQUENTI
              </p>
              <h2 className="font-mono text-4xl md:text-5xl font-bold">
                <span style={{ color: "var(--text-primary)" }}>Prima che tu chieda.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  {...fadeUpView(i * 0.06)}
                  className="rounded-xl p-6 card-interactive"
                >
                  <h3
                    className="font-mono font-semibold text-sm mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
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
            <p
              className="text-xs font-mono font-semibold mb-6 tracking-[0.3em] uppercase"
              style={{ color: "var(--blue)" }}
            >
              PRONTO A INIZIARE?
            </p>
            <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="gradient-hero">
                Scegli il tuo piano oggi.
              </span>
            </h2>
            <p
              className="text-lg mb-12"
              style={{ color: "var(--text-secondary)" }}
            >
              Supporto personalizzato, setup rapido e garanzia di soddisfazione al 100%.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-mono font-bold text-base text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                boxShadow: "0 0 40px rgba(0,112,243,0.3), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <ZapIcon size={18} />
              Torna ai piani
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer
        className="py-10 px-6 text-center relative z-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-center mb-4">
          <img src="/logo.png" alt="Aura PropTech" className="h-8" style={{ mixBlendMode: "screen" }} />
        </div>
        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          © 2026 Aura PropTech · Built in Italy · Powered by Gemini AI
        </p>
      </footer>
    </div>
  );
}
