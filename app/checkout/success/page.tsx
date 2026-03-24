"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight, Clock, Mail, Sparkles } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(0,199,129,0.12) 0%, rgba(0,112,243,0.06) 50%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-lg w-full text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #00C781, #0070F3)",
            boxShadow: "0 0 40px rgba(0,199,129,0.3), 0 0 80px rgba(0,112,243,0.2)",
          }}
        >
          <CheckCircle size={40} className="text-white" />
        </motion.div>

        <h1 className="font-mono text-3xl md:text-4xl font-bold mb-4">
          Pagamento completato!
        </h1>

        <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
          Benvenuto in Aura PropTech. Il tuo sito sta per prendere vita.
        </p>

        {/* Timeline */}
        <div
          className="rounded-2xl p-6 mb-8 text-left"
          style={{ background: "var(--surface)", border: "1px solid rgba(0,112,243,0.15)" }}
        >
          <p
            className="text-xs font-mono font-semibold mb-4 tracking-[0.2em] uppercase"
            style={{ color: "var(--blue)" }}
          >
            PROSSIMI PASSI
          </p>

          {[
            {
              icon: Mail,
              title: "Email di conferma in arrivo",
              desc: "Riceverai la conferma del pagamento e i dettagli del tuo piano.",
            },
            {
              icon: Clock,
              title: "Setup in lavorazione",
              desc: "Iniziamo a costruire il tuo sito con i dati che hai inserito nell'onboarding.",
            },
            {
              icon: Sparkles,
              title: "Il tuo sito va live",
              desc: "Ti aggiorneremo via email quando sarà tutto pronto. Potrai accedere alla tua dashboard per monitorare le performance.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex gap-4 items-start"
              style={{
                paddingBottom: i < 2 ? 16 : 0,
                marginBottom: i < 2 ? 16 : 0,
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,112,243,0.1)", border: "1px solid rgba(0,112,243,0.2)" }}
              >
                <step.icon size={14} style={{ color: "var(--blue-bright)" }} />
              </div>
              <div>
                <p className="font-mono font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                  {step.title}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-sm text-white transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #00C781, #0070F3)",
            boxShadow: "0 4px 20px rgba(0,199,129,0.3)",
          }}
        >
          Torna alla Home
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
