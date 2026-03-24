"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Zap } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(8px)" } as const,
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" } as const,
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.7, delay, ease } as const,
});

const articles = [
  {
    slug: "ai-rivoluzione-immobiliare-2026",
    title: "Come l'AI sta rivoluzionando il settore immobiliare nel 2026",
    excerpt: "Dall'assistenza clienti automatizzata alla valutazione intelligente degli immobili: l'intelligenza artificiale sta trasformando il modo in cui le agenzie immobiliari lavorano e conquistano clienti.",
    date: "20 Marzo 2026",
    readTime: "8 min",
    tag: "Trend",
  },
  {
    slug: "perche-sito-immobiliare-ai",
    title: "Perché il tuo sito immobiliare ha bisogno di un assistente AI",
    excerpt: "Il 67% dei lead viene perso perché nessuno risponde entro la prima ora. Un assistente AI risolve questo problema, 24 ore su 24, 7 giorni su 7.",
    date: "15 Marzo 2026",
    readTime: "6 min",
    tag: "Strategia",
  },
  {
    slug: "lead-generation-core-ai",
    title: "Lead generation automatica: come funziona Core AI",
    excerpt: "Core AI non è un chatbot generico. È un sistema che qualifica i lead, estrae budget e preferenze, e li passa all'agente pronto per la vendita.",
    date: "10 Marzo 2026",
    readTime: "5 min",
    tag: "Prodotto",
  },
  {
    slug: "caso-studio-armonie-immobiliare",
    title: "Caso studio: come Armonie Immobiliare ha triplicato i lead con l'AI",
    excerpt: "Da sito vetrina a macchina di lead generation. Il percorso di Armonie Immobiliare di Savona con il piano Professional di Aura PropTech.",
    date: "5 Marzo 2026",
    readTime: "10 min",
    tag: "Case Study",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar mini */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12 h-16 glass-strong">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Aura PropTech" className="h-9" style={{ mixBlendMode: "screen" }} />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/showcase" className="hover:text-white transition-colors">Sito Demo</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Prezzi</Link>
          <Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
            BLOG
          </p>
          <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span style={{ color: "var(--text-primary)" }}>Insight per </span>
            <span className="gradient-blue">agenzie immobiliari.</span>
          </h1>
          <p className="text-lg font-mono" style={{ color: "var(--text-secondary)" }}>
            Guide, strategie e casi studio su AI, siti web e lead generation nel settore immobiliare.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {articles.map((article, i) => (
            <motion.div key={article.slug} {...fadeUpView(i * 0.08)}>
              <Link href={`/blog/${article.slug}`}>
                <div
                  className="group rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(0,112,243,0.1)", color: "var(--blue-bright)", border: "1px solid rgba(0,112,243,0.2)" }}
                    >
                      {article.tag}
                    </span>
                    <div className="flex items-center gap-3 text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><Calendar size={10} />{article.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{article.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-mono text-lg md:text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {article.title}
                  </h2>
                  <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold group-hover:gap-2.5 transition-all" style={{ color: "var(--blue-bright)" }}>
                    Leggi <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
