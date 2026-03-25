"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Building2, Phone, Palette, MapPin, Bot, Send,
  ArrowRight, ArrowLeft, CheckCircle, Loader2,
  Brush, Type, Layout, Image, Upload,
} from "lucide-react";

const steps = [
  { icon: Building2, label: "Agenzia" },
  { icon: Phone, label: "Contatti" },
  { icon: Palette, label: "Branding" },
  { icon: Brush, label: "Stile" },
  { icon: MapPin, label: "Zone" },
  { icon: Bot, label: "AI" },
  { icon: Send, label: "Invio" },
];

const inputClass =
  "w-full bg-transparent rounded-xl px-4 py-3 text-sm font-mono text-white placeholder:text-gray-600 outline-none transition-colors";
const inputStyle = {
  border: "1px solid rgba(255,255,255,0.1)",
};
const focusStyle = "focus:border-blue-500";

// ── Style presets ────────────────────────────────────────────
const stylePresets = [
  {
    id: "elegante-scuro",
    name: "Elegante Scuro",
    desc: "Sfondo scuro, accenti gold, look luxury",
    bg: "#0A0F1E",
    accent: "#C9A96E",
    text: "#FFFFFF",
    preview: "linear-gradient(135deg, #0A0F1E, #1A1F35)",
  },
  {
    id: "luminoso-moderno",
    name: "Luminoso Moderno",
    desc: "Sfondo chiaro, linee pulite, minimal",
    bg: "#FAFAFA",
    accent: "#0070F3",
    text: "#1A1A2E",
    preview: "linear-gradient(135deg, #FAFAFA, #E8F0FE)",
  },
  {
    id: "classico-caldo",
    name: "Classico Caldo",
    desc: "Toni caldi, eleganza tradizionale",
    bg: "#FFF8F0",
    accent: "#8B4513",
    text: "#2C1810",
    preview: "linear-gradient(135deg, #FFF8F0, #F5E6D3)",
  },
  {
    id: "tech-minimal",
    name: "Tech Minimal",
    desc: "Ultra-minimal, accenti neon, futuristico",
    bg: "#000000",
    accent: "#00FF88",
    text: "#FFFFFF",
    preview: "linear-gradient(135deg, #000000, #0A1628)",
  },
  {
    id: "mediterraneo",
    name: "Mediterraneo",
    desc: "Azzurro mare, bianco, atmosfera costiera",
    bg: "#F0F8FF",
    accent: "#0077B6",
    text: "#023E7D",
    preview: "linear-gradient(135deg, #F0F8FF, #CAF0F8)",
  },
];

const fontPairings = [
  { id: "mono-modern", title: "Space Grotesk", body: "Inter", desc: "Moderno & tecnico" },
  { id: "serif-elegant", title: "Playfair Display", body: "Lato", desc: "Elegante & classico" },
  { id: "sans-clean", title: "Poppins", body: "Open Sans", desc: "Pulito & leggibile" },
  { id: "geo-bold", title: "Montserrat", body: "Source Sans Pro", desc: "Bold & geometrico" },
];

const layoutOptions = [
  { id: "hero-image", label: "Hero con immagine grande", icon: Image, desc: "Immagine a tutto schermo con testo sovrapposto" },
  { id: "hero-slider", label: "Slider proprietà", icon: Layout, desc: "Carosello con le proprietà in evidenza" },
  { id: "hero-search", label: "Ricerca in primo piano", icon: Layout, desc: "Barra di ricerca come elemento principale" },
  { id: "hero-video", label: "Video background", icon: Layout, desc: "Video loop della zona servita" },
];

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center"><div className="text-white text-lg">Caricamento...</div></div>}>
      <OnboardingContent />
    </Suspense>
  );
}

function OnboardingContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";
  const planParam = searchParams.get("plan") ?? "professional";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Form state
  const [form, setForm] = useState({
    agencyName: "", tagline: "", description: "", keywords: "",
    phoneMobile: "", phoneFixed: "", email: "", address: "", whatsapp: "", facebook: "",
    colorPrimary: "#0070F3", colorDark: "#0055CC", colorLight: "#3399FF",
    // New style fields
    stylePreset: "elegante-scuro",
    fontPairing: "mono-modern",
    layoutPreference: "hero-image",
    inspirationUrls: "",
    styleNotes: "",
    // Existing fields
    zonesPrimary: "", zonesSecondary: "",
    aiName: "Laura", aiRole: "consulente immobiliare", aiYears: "10",
    aiArea: "", aiWelcome: "", aiPersonality: "",
  });

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const canNext = () => {
    if (step === 0) return form.agencyName.trim().length > 0;
    if (step === 1) return form.phoneMobile.trim().length > 0 && form.email.trim().length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Salva dati onboarding su Supabase
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, plan: planParam, ...form }),
      });

      // 2. Crea sessione checkout Stripe e redirect al pagamento
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planParam, agencyName: form.agencyName }),
      });
      const checkoutData = await checkoutRes.json();

      if (checkoutData.url) {
        window.location.href = checkoutData.url;
        return; // Non serve setDone — il browser naviga a Stripe
      }

      // Fallback se Stripe non risponde
      setDone(true);
    } catch {
      alert("Errore nell'invio. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = steps.length;
  const lastStep = totalSteps - 1;

  if (done) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(0,199,129,0.12) 0%, transparent 70%)" }} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative max-w-md w-full text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00C781, #0070F3)" }}>
            <CheckCircle size={40} />
          </motion.div>
          <h1 className="font-mono text-3xl font-bold mb-4">Dati ricevuti!</h1>
          <p className="text-sm font-mono mb-6" style={{ color: "var(--text-secondary)" }}>
            Abbiamo tutto il necessario. Il tuo sito sarà pronto entro 7 giorni lavorativi. Ti aggiorneremo via email.
          </p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}>
            Torna alla Home <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="flex items-center justify-between px-6 h-16 max-w-4xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Aura PropTech" className="h-14" />
          </a>
          <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,112,243,0.1)", color: "#0070F3", border: "1px solid rgba(0,112,243,0.2)" }}>
            Onboarding · Aura {planParam.charAt(0).toUpperCase() + planParam.slice(1)}
          </span>
        </div>

        {/* Progress */}
        <div className="px-6 pb-3 max-w-4xl mx-auto">
          <div className="flex gap-1">
            {steps.map((s, i) => (
              <div key={i} className="flex-1">
                <div className="h-1 rounded-full transition-all duration-500" style={{ background: i <= step ? "linear-gradient(135deg, #0070F3, #7B2FFF)" : "rgba(255,255,255,0.08)" }} />
                <div className="flex items-center gap-1 mt-1.5">
                  <s.icon size={10} style={{ color: i <= step ? "#0070F3" : "rgba(255,255,255,0.3)" }} />
                  <span className="text-[9px] font-mono" style={{ color: i <= step ? "#0070F3" : "rgba(255,255,255,0.3)" }}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-32 pb-20 px-4 md:px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Agenzia */}
            {step === 0 && (
              <div>
                <h2 className="font-mono text-2xl md:text-3xl font-bold mb-2">La tua agenzia</h2>
                <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>Informazioni base per il tuo nuovo sito.</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Nome agenzia *</label>
                    <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="Immobiliare Rossi" value={form.agencyName} onChange={(e) => set("agencyName", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Tagline / Slogan</label>
                    <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="Il tuo partner immobiliare di fiducia" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Descrizione (per SEO)</label>
                    <textarea className={`${inputClass} ${focusStyle} min-h-[80px]`} style={inputStyle} placeholder="Breve descrizione della tua agenzia per i motori di ricerca..." value={form.description} onChange={(e) => set("description", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Keywords SEO (separate da virgola)</label>
                    <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="immobiliare, Milano, vendita, affitto" value={form.keywords} onChange={(e) => set("keywords", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Contatti */}
            {step === 1 && (
              <div>
                <h2 className="font-mono text-2xl md:text-3xl font-bold mb-2">Contatti</h2>
                <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>Come i clienti possono raggiungerti.</p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Cellulare *</label>
                      <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="320 123 4567" value={form.phoneMobile} onChange={(e) => set("phoneMobile", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Fisso</label>
                      <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="02 1234567" value={form.phoneFixed} onChange={(e) => set("phoneFixed", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Email *</label>
                    <input className={`${inputClass} ${focusStyle}`} style={inputStyle} type="email" placeholder="info@agenzia.it" value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Indirizzo</label>
                    <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="Via Roma 1, 00100 Roma" value={form.address} onChange={(e) => set("address", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>WhatsApp (internaz.)</label>
                      <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="393201234567" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Facebook</label>
                      <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="https://facebook.com/..." value={form.facebook} onChange={(e) => set("facebook", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Branding */}
            {step === 2 && (
              <div>
                <h2 className="font-mono text-2xl md:text-3xl font-bold mb-2">Branding</h2>
                <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>I colori della tua agenzia. Tutto il sito si adatterà.</p>
                <div className="flex flex-col gap-6">
                  {[
                    { key: "colorPrimary", label: "Colore principale", desc: "Il colore brand dominante" },
                    { key: "colorDark", label: "Colore scuro", desc: "Per hover e accenti" },
                    { key: "colorLight", label: "Colore chiaro", desc: "Per sfondi e badge" },
                  ].map((c) => (
                    <div key={c.key} className="flex items-center gap-4">
                      <input
                        type="color"
                        value={form[c.key as keyof typeof form]}
                        onChange={(e) => set(c.key, e.target.value)}
                        className="w-12 h-12 rounded-xl cursor-pointer border-0 bg-transparent"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-mono font-bold" style={{ color: "var(--text-primary)" }}>{c.label}</p>
                        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{c.desc}</p>
                      </div>
                      <input className={`${inputClass} ${focusStyle} w-28`} style={inputStyle} value={form[c.key as keyof typeof form]} onChange={(e) => set(c.key, e.target.value)} />
                    </div>
                  ))}
                  {/* Preview */}
                  <div className="rounded-2xl p-6 mt-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs font-mono mb-3" style={{ color: "var(--text-muted)" }}>Anteprima</p>
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-xl" style={{ background: form.colorPrimary }} />
                      <div className="w-10 h-10 rounded-xl" style={{ background: form.colorDark }} />
                      <div className="w-10 h-10 rounded-xl" style={{ background: form.colorLight }} />
                      <span className="text-sm font-mono font-bold ml-2" style={{ color: form.colorPrimary }}>
                        {form.agencyName || "Nome Agenzia"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Stile & Grafica (NEW) */}
            {step === 3 && (
              <div>
                <h2 className="font-mono text-2xl md:text-3xl font-bold mb-2">Stile & Grafica</h2>
                <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>Scegli lo stile visivo del tuo sito. Possiamo personalizzare tutto dopo.</p>

                {/* Style presets */}
                <div className="mb-8">
                  <label className="text-xs font-mono mb-3 flex items-center gap-2 block" style={{ color: "var(--text-muted)" }}>
                    <Brush size={12} /> TEMA VISIVO
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stylePresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => set("stylePreset", preset.id)}
                        className="rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: form.stylePreset === preset.id ? "rgba(0,112,243,0.1)" : "rgba(255,255,255,0.03)",
                          border: form.stylePreset === preset.id ? "1px solid rgba(0,112,243,0.4)" : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {/* Mini preview bar */}
                        <div className="flex gap-1.5 mb-3">
                          <div className="h-8 flex-1 rounded-lg" style={{ background: preset.preview }} />
                          <div className="h-8 w-8 rounded-lg" style={{ background: preset.accent }} />
                        </div>
                        <p className="text-sm font-mono font-bold" style={{ color: form.stylePreset === preset.id ? "#0070F3" : "var(--text-primary)" }}>{preset.name}</p>
                        <p className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>{preset.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font pairing */}
                <div className="mb-8">
                  <label className="text-xs font-mono mb-3 flex items-center gap-2 block" style={{ color: "var(--text-muted)" }}>
                    <Type size={12} /> COMBINAZIONE FONT
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {fontPairings.map((fp) => (
                      <button
                        key={fp.id}
                        type="button"
                        onClick={() => set("fontPairing", fp.id)}
                        className="rounded-xl p-4 text-left transition-all duration-300"
                        style={{
                          background: form.fontPairing === fp.id ? "rgba(0,112,243,0.1)" : "rgba(255,255,255,0.03)",
                          border: form.fontPairing === fp.id ? "1px solid rgba(0,112,243,0.4)" : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <p className="text-base font-bold mb-0.5" style={{ color: form.fontPairing === fp.id ? "#0070F3" : "var(--text-primary)" }}>{fp.title}</p>
                        <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{fp.body}</p>
                        <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{fp.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layout preference */}
                <div className="mb-8">
                  <label className="text-xs font-mono mb-3 flex items-center gap-2 block" style={{ color: "var(--text-muted)" }}>
                    <Layout size={12} /> LAYOUT HOMEPAGE
                  </label>
                  <div className="flex flex-col gap-2">
                    {layoutOptions.map((lo) => (
                      <button
                        key={lo.id}
                        type="button"
                        onClick={() => set("layoutPreference", lo.id)}
                        className="rounded-xl p-4 text-left transition-all duration-300 flex items-center gap-4"
                        style={{
                          background: form.layoutPreference === lo.id ? "rgba(0,112,243,0.1)" : "rgba(255,255,255,0.03)",
                          border: form.layoutPreference === lo.id ? "1px solid rgba(0,112,243,0.4)" : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,112,243,0.08)" }}>
                          <lo.icon size={18} style={{ color: form.layoutPreference === lo.id ? "#0070F3" : "var(--text-muted)" }} />
                        </div>
                        <div>
                          <p className="text-sm font-mono font-bold" style={{ color: form.layoutPreference === lo.id ? "#0070F3" : "var(--text-primary)" }}>{lo.label}</p>
                          <p className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>{lo.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inspiration URLs */}
                <div className="mb-6">
                  <label className="text-xs font-mono mb-1.5 flex items-center gap-2 block" style={{ color: "var(--text-muted)" }}>
                    <Upload size={12} /> SITI DI ISPIRAZIONE (opzionale)
                  </label>
                  <textarea
                    className={`${inputClass} ${focusStyle} min-h-[80px]`}
                    style={inputStyle}
                    placeholder={"Incolla qui 2-3 link di siti che ti piacciono:\nhttps://www.esempio1.it\nhttps://www.esempio2.it"}
                    value={form.inspirationUrls}
                    onChange={(e) => set("inspirationUrls", e.target.value)}
                  />
                </div>

                {/* Free notes */}
                <div>
                  <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Note aggiuntive sullo stile</label>
                  <textarea
                    className={`${inputClass} ${focusStyle} min-h-[60px]`}
                    style={inputStyle}
                    placeholder="Altre preferenze grafiche, richieste particolari..."
                    value={form.styleNotes}
                    onChange={(e) => set("styleNotes", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Zone */}
            {step === 4 && (
              <div>
                <h2 className="font-mono text-2xl md:text-3xl font-bold mb-2">Zone servite</h2>
                <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>Le zone compariranno nei filtri di ricerca e l&apos;AI le userà nelle conversazioni.</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Zone principali (una per riga)</label>
                    <textarea className={`${inputClass} ${focusStyle} min-h-[140px]`} style={inputStyle} placeholder={"Roma Centro\nTrastevere\nPrati\nEUR\nMonteverde"} value={form.zonesPrimary} onChange={(e) => set("zonesPrimary", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Zone secondarie (opzionale, una per riga)</label>
                    <textarea className={`${inputClass} ${focusStyle} min-h-[100px]`} style={inputStyle} placeholder={"Ostia\nFiumicino\nGuidonia"} value={form.zonesSecondary} onChange={(e) => set("zonesSecondary", e.target.value)} />
                    <p className="text-[10px] font-mono mt-1.5" style={{ color: "var(--text-muted)" }}>L&apos;AI le riconoscerà nelle chat ma non appariranno nei filtri.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: AI Concierge */}
            {step === 5 && (
              <div>
                <h2 className="font-mono text-2xl md:text-3xl font-bold mb-2">AI Concierge</h2>
                {planParam === "starter" ? (
                  <div className="rounded-2xl p-8 text-center mt-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Bot size={40} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                    <p className="font-mono text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
                      Il piano Starter non include l&apos;AI Concierge.
                    </p>
                    <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                      Puoi fare upgrade a Professional in qualsiasi momento per attivare l&apos;assistente AI.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>Configura il tuo assistente AI personalizzato.</p>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Nome assistente</label>
                          <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="Laura" value={form.aiName} onChange={(e) => set("aiName", e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Ruolo</label>
                          <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="consulente immobiliare" value={form.aiRole} onChange={(e) => set("aiRole", e.target.value)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Anni esperienza</label>
                          <input className={`${inputClass} ${focusStyle}`} style={inputStyle} type="number" value={form.aiYears} onChange={(e) => set("aiYears", e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Area competenza</label>
                          <input className={`${inputClass} ${focusStyle}`} style={inputStyle} placeholder="mercato di Roma e Lazio" value={form.aiArea} onChange={(e) => set("aiArea", e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Messaggio di benvenuto</label>
                        <textarea className={`${inputClass} ${focusStyle} min-h-[80px]`} style={inputStyle} placeholder="Ciao! Sono Laura, la tua consulente immobiliare..." value={form.aiWelcome} onChange={(e) => set("aiWelcome", e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--text-muted)" }}>Personalità</label>
                        <textarea className={`${inputClass} ${focusStyle} min-h-[100px]`} style={inputStyle} placeholder={"Descrivi come deve comportarsi l'AI:\n- Tono (formale, amichevole, ecc.)\n- Stile di comunicazione\n- Punti di forza da enfatizzare"} value={form.aiPersonality} onChange={(e) => set("aiPersonality", e.target.value)} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 6: Riepilogo */}
            {step === lastStep && (
              <div>
                <h2 className="font-mono text-2xl md:text-3xl font-bold mb-2">Riepilogo</h2>
                <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>Controlla i dati e invia.</p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Agenzia", value: form.agencyName },
                    { label: "Email", value: form.email },
                    { label: "Telefono", value: form.phoneMobile },
                    { label: "Indirizzo", value: form.address },
                    { label: "Colore brand", value: form.colorPrimary },
                    { label: "Tema visivo", value: stylePresets.find(s => s.id === form.stylePreset)?.name ?? form.stylePreset },
                    { label: "Font", value: fontPairings.find(f => f.id === form.fontPairing)?.title ?? form.fontPairing },
                    { label: "Layout", value: layoutOptions.find(l => l.id === form.layoutPreference)?.label ?? form.layoutPreference },
                    { label: "Zone principali", value: form.zonesPrimary.split("\n").filter(Boolean).length + " zone" },
                    ...(planParam !== "starter" ? [{ label: "AI", value: form.aiName + " — " + form.aiRole }] : []),
                    { label: "Piano", value: "Aura " + (planParam.charAt(0).toUpperCase() + planParam.slice(1)) },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                      <span className="text-sm font-mono font-bold" style={{ color: "var(--text-primary)" }}>{item.value || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm transition-opacity disabled:opacity-30"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft size={14} /> Indietro
          </button>

          {step < lastStep ? (
            <button
              onClick={() => setStep((s) => Math.min(lastStep, s + 1))}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-sm text-white transition-all disabled:opacity-40 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
            >
              Avanti <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-sm text-white transition-all hover:scale-105 disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #00C781, #0070F3)" }}
            >
              {loading ? <><Loader2 size={14} className="animate-spin" /> Invio...</> : <><Send size={14} /> Invia dati</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
