"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette, Type, Search, Home, Phone, Mail,
  MessageCircle, Sparkles, ArrowRight, RotateCcw,
} from "lucide-react";

const themes = [
  { id: "dark", label: "Elegante Scuro", bg: "#0A0F1E", card: "#141928", accent: "#C9A96E", text: "#FFFFFF", muted: "#8892A8" },
  { id: "light", label: "Luminoso Moderno", bg: "#FAFAFA", card: "#FFFFFF", accent: "#0070F3", text: "#1A1A2E", muted: "#6B7280" },
  { id: "warm", label: "Classico Caldo", bg: "#FFF8F0", card: "#FFFFFF", accent: "#8B4513", text: "#2C1810", muted: "#8B7355" },
  { id: "neon", label: "Tech Minimal", bg: "#000000", card: "#0A1628", accent: "#00FF88", text: "#FFFFFF", muted: "#4B5563" },
  { id: "sea", label: "Mediterraneo", bg: "#F0F8FF", card: "#FFFFFF", accent: "#0077B6", text: "#023E7D", muted: "#5A8DB5" },
];

const fonts = [
  { id: "modern", title: "Space Grotesk", body: "Inter" },
  { id: "elegant", title: "Playfair Display", body: "Lato" },
  { id: "clean", title: "Poppins", body: "Open Sans" },
  { id: "bold", title: "Montserrat", body: "Source Sans Pro" },
];

export default function PreviewPage() {
  const [agencyName, setAgencyName] = useState("La Tua Agenzia");
  const [primaryColor, setPrimaryColor] = useState("#C9A96E");
  const [themeId, setThemeId] = useState("dark");
  const [fontId, setFontId] = useState("modern");

  const theme = themes.find((t) => t.id === themeId) ?? themes[0];
  const font = fonts.find((f) => f.id === fontId) ?? fonts[0];

  const reset = () => {
    setAgencyName("La Tua Agenzia");
    setPrimaryColor("#C9A96E");
    setThemeId("dark");
    setFontId("modern");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Aura PropTech" className="h-9" style={{ mixBlendMode: "screen" }} />
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,112,243,0.1)", color: "#0070F3", border: "1px solid rgba(0,112,243,0.2)" }}>
              Configuratore Live
            </span>
            <a href="/#prezzi" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold text-white" style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}>
              Scegli un piano <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left panel — Controls */}
          <div className="lg:col-span-4 xl:col-span-3">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-xl font-bold">Personalizza</h2>
                <button onClick={reset} className="flex items-center gap-1 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  <RotateCcw size={11} /> Reset
                </button>
              </div>

              {/* Agency name */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-muted)" }}>Nome agenzia</label>
                <input
                  className="w-full bg-transparent rounded-xl px-4 py-3 text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-blue-500"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
              </div>

              {/* Primary color */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider mb-1.5 flex items-center gap-1.5 block" style={{ color: "var(--text-muted)" }}>
                  <Palette size={10} /> Colore brand
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    className="flex-1 bg-transparent rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                  />
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>Tema</label>
                <div className="flex flex-col gap-1.5">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setThemeId(t.id)}
                      className="flex items-center gap-3 p-2.5 rounded-lg text-left transition-all"
                      style={{
                        background: themeId === t.id ? "rgba(0,112,243,0.1)" : "transparent",
                        border: themeId === t.id ? "1px solid rgba(0,112,243,0.3)" : "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded" style={{ background: t.bg, border: "1px solid rgba(255,255,255,0.1)" }} />
                        <div className="w-4 h-4 rounded" style={{ background: t.accent }} />
                      </div>
                      <span className="text-xs font-mono" style={{ color: themeId === t.id ? "#0070F3" : "var(--text-secondary)" }}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5 block" style={{ color: "var(--text-muted)" }}>
                  <Type size={10} /> Font
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {fonts.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontId(f.id)}
                      className="p-2.5 rounded-lg text-left transition-all"
                      style={{
                        background: fontId === f.id ? "rgba(0,112,243,0.1)" : "rgba(255,255,255,0.02)",
                        border: fontId === f.id ? "1px solid rgba(0,112,243,0.3)" : "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <p className="text-xs font-bold" style={{ color: fontId === f.id ? "#0070F3" : "var(--text-primary)" }}>{f.title}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{f.body}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right panel — Live preview */}
          <div className="lg:col-span-8 xl:col-span-9">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {/* Browser frame */}
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 80px rgba(0,112,243,0.1), 0 40px 80px rgba(0,0,0,0.5)" }}>
                {/* Chrome */}
                <div className="flex items-center gap-3 px-5 py-3" style={{ background: "rgba(20,25,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA42" }} />
                  </div>
                  <div className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-xs font-mono text-center" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>
                    {agencyName.toLowerCase().replace(/\s+/g, "-")}.auraproptech.io
                  </div>
                </div>

                {/* Site preview */}
                <div style={{ background: theme.bg, minHeight: "600px", transition: "all 0.5s ease" }}>
                  {/* Navbar */}
                  <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${theme.muted}20` }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: primaryColor }}>
                        <Home size={14} style={{ color: theme.bg }} />
                      </div>
                      <span className="font-bold text-sm" style={{ color: theme.text }}>{agencyName}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                      {["Immobili", "Ricerca", "Chi siamo", "Contatti"].map((item) => (
                        <span key={item} className="text-xs" style={{ color: theme.muted }}>{item}</span>
                      ))}
                    </div>
                  </div>

                  {/* Hero */}
                  <div className="px-6 py-16 md:py-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono mb-6" style={{ background: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                      <Sparkles size={10} /> AI Integrata
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: theme.text }}>
                      Trova la tua<br />
                      <span style={{ color: primaryColor }}>casa ideale</span>
                    </h1>
                    <p className="text-sm max-w-md mx-auto mb-8" style={{ color: theme.muted }}>
                      {agencyName} ti accompagna nella ricerca dell&apos;immobile perfetto con l&apos;aiuto dell&apos;intelligenza artificiale.
                    </p>
                    <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
                      <div
                        className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl text-xs"
                        style={{ background: `${theme.muted}15`, border: `1px solid ${theme.muted}20`, color: theme.muted }}
                      >
                        <Search size={14} /> Cerca per zona, prezzo o tipologia...
                      </div>
                      <button className="px-5 py-3 rounded-xl text-xs font-bold" style={{ background: primaryColor, color: theme.bg }}>
                        Cerca
                      </button>
                    </div>
                  </div>

                  {/* Property cards */}
                  <div className="px-6 pb-10">
                    <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: theme.muted }}>In evidenza</p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: "Appartamento Centro", price: "€285.000", rooms: "3 locali" },
                        { name: "Villa con giardino", price: "€520.000", rooms: "5 locali" },
                        { name: "Bilocale ristrutturato", price: "€165.000", rooms: "2 locali" },
                      ].map((prop, i) => (
                        <div key={i} className="rounded-xl overflow-hidden" style={{ background: theme.card, border: `1px solid ${theme.muted}15` }}>
                          <div className="h-24" style={{ background: `linear-gradient(135deg, ${primaryColor}30, ${primaryColor}10)` }} />
                          <div className="p-3">
                            <p className="text-xs font-bold mb-0.5" style={{ color: theme.text }}>{prop.name}</p>
                            <p className="text-[10px] mb-2" style={{ color: theme.muted }}>{prop.rooms}</p>
                            <p className="text-sm font-bold" style={{ color: primaryColor }}>{prop.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Bubble */}
                  <div className="absolute bottom-4 right-4 md:relative md:bottom-auto md:right-auto md:px-6 md:pb-8">
                    <div className="flex justify-end">
                      <div className="rounded-2xl p-4 max-w-xs" style={{ background: theme.card, border: `1px solid ${primaryColor}30`, boxShadow: `0 0 20px ${primaryColor}20` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles size={12} style={{ color: primaryColor }} />
                          <span className="text-[10px] font-bold" style={{ color: primaryColor }}>AI Concierge</span>
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        </div>
                        <p className="text-xs" style={{ color: theme.muted }}>
                          Ciao! Come posso aiutarti? Dimmi zona e budget, ti trovo le migliori opzioni.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-5 flex items-center justify-between" style={{ borderTop: `1px solid ${theme.muted}15` }}>
                    <span className="text-[10px]" style={{ color: theme.muted }}>{agencyName} · Powered by Aura PropTech</span>
                    <div className="flex gap-4">
                      <Phone size={12} style={{ color: theme.muted }} />
                      <Mail size={12} style={{ color: theme.muted }} />
                      <MessageCircle size={12} style={{ color: theme.muted }} />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs font-mono mt-4" style={{ color: "var(--text-muted)" }}>
                Questa è un&apos;anteprima. Il sito finale sarà ancora più dettagliato e personalizzato.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
