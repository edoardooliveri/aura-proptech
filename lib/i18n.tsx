"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "it" | "en";

const t = {
  // ── Navbar ──────────────────────────────────────────────────
  nav: {
    problem: { it: "Problema", en: "Problem" },
    solution: { it: "Soluzione", en: "Solution" },
    demo: { it: "Demo", en: "Demo" },
    pricing: { it: "Prezzi", en: "Pricing" },
    contact: { it: "Contatti", en: "Contact" },
    demoLive: { it: "Demo Live", en: "Live Demo" },
  },

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    badge: { it: "AI-First Real Estate Platform", en: "AI-First Real Estate Platform" },
    title1: { it: "Il futuro del", en: "The future of" },
    title2: { it: "real estate è", en: "real estate is" },
    title3: { it: "artificiale.", en: "artificial." },
    sub: {
      it: "Un assistente AI ultra-intelligente, sempre online, che parla con i tuoi clienti, qualifica i lead e fissa appuntamenti — mentre tu sei in trattativa o a dormire.",
      en: "An ultra-intelligent AI assistant, always online, that talks to your clients, qualifies leads and books appointments — while you're closing deals or sleeping.",
    },
    cta1: { it: "Prova Core AI adesso", en: "Try Core AI now" },
    cta2: { it: "Come funziona", en: "How it works" },
    statResp: { it: "Risposta", en: "Response" },
    statOp: { it: "Operativo", en: "Uptime" },
    statSetup: { it: "Setup", en: "Setup" },
  },

  // ── Problem ─────────────────────────────────────────────────
  problem: {
    tag: { it: "IL PROBLEMA", en: "THE PROBLEM" },
    title1: { it: "Il sito immobiliare", en: "The real estate website" },
    title2: { it: "del 2025 è rotto.", en: "of 2025 is broken." },
    sub: {
      it: "Statico, muto, lento. Mentre il tuo sito dorme, i tuoi competitor con l'AI stanno già rispondendo ai tuoi clienti.",
      en: "Static, silent, slow. While your site sleeps, your AI-powered competitors are already answering your clients.",
    },
    items: [
      {
        label: { it: "dei lead abbandona", en: "of leads abandon" },
        desc: {
          it: "Se non rispondi entro un'ora, due terzi dei potenziali clienti contattano un'altra agenzia. Il tuo sito dorme mentre loro cercano.",
          en: "If you don't respond within an hour, two-thirds of potential clients contact another agency. Your site sleeps while they search.",
        },
      },
      {
        label: { it: "al giorno sprecate", en: "wasted per day" },
        desc: {
          it: "Ogni agente perde in media 3.5 ore ogni giorno a rispondere alle stesse domande di pre-qualifica. Ore sottratte alle trattative vere.",
          en: "Each agent wastes an average of 3.5 hours every day answering the same pre-qualification questions. Hours stolen from real deals.",
        },
      },
      {
        label: { it: "dei siti: zero risposta", en: "of sites: zero response" },
        desc: {
          it: "Moduli di contatto ignorati per ore. Nessuna chat. Nessun assistente. Il cliente aspetta — poi sparisce.",
          en: "Contact forms ignored for hours. No chat. No assistant. The client waits — then disappears.",
        },
      },
      {
        label: { it: "e ancora siti statici", en: "and still static sites" },
        desc: {
          it: "Foto, prezzi, un numero di telefono. I siti immobiliari sono rimasti al 2012. Il mercato si è evoluto. Loro no.",
          en: "Photos, prices, a phone number. Real estate sites are stuck in 2012. The market evolved. They didn't.",
        },
      },
    ],
  },

  // ── Solution ────────────────────────────────────────────────
  solution: {
    tag: { it: "LA SOLUZIONE", en: "THE SOLUTION" },
    title1: { it: "Presenta:", en: "Introducing:" },
    sub: {
      it: "Non un chatbot. Non un FAQ automatizzato. Un'entità intelligente che capisce, ragiona e agisce — come il tuo agente più capace, ma sempre disponibile.",
      en: "Not a chatbot. Not an automated FAQ. An intelligent entity that understands, reasons and acts — like your best agent, but always available.",
    },
    features: [
      {
        title: { it: "Capisce le emozioni", en: "Understands emotions" },
        desc: {
          it: "Non risponde a parole chiave. Comprende il contesto, il tono e l'urgenza del cliente — come farebbe il tuo agente migliore.",
          en: "Doesn't respond to keywords. Understands the context, tone and urgency of the client — like your best agent would.",
        },
        tag: { it: "NLP avanzato", en: "Advanced NLP" },
      },
      {
        title: { it: "Non dorme mai", en: "Never sleeps" },
        desc: {
          it: "Ore 3 di notte, domenica di Pasqua, ferragosto. Core AI risponde in meno di 2 secondi, sempre, senza straordinari.",
          en: "3 AM, Easter Sunday, mid-August. Core AI responds in under 2 seconds, always, no overtime pay.",
        },
        tag: { it: "24/7 · 365gg", en: "24/7 · 365 days" },
      },
      {
        title: { it: "Qualifica e converte", en: "Qualifies & converts" },
        desc: {
          it: "Raccoglie budget, zona, tempistiche e tipo di immobile in modo naturale. Ti consegna lead caldi, non contatti freddi.",
          en: "Collects budget, area, timeline and property type naturally. Delivers hot leads, not cold contacts.",
        },
        tag: { it: "Lead scoring", en: "Lead scoring" },
      },
      {
        title: { it: "Il tuo brand, non il nostro", en: "Your brand, not ours" },
        desc: {
          it: "Nessun logo 'Powered by'. L'AI parla con la voce della tua agenzia, i tuoi colori, il tuo tono. Invisibile quanto vuoi.",
          en: "No 'Powered by' logo. The AI speaks with your agency's voice, your colors, your tone. As invisible as you want.",
        },
        tag: { it: "White label", en: "White label" },
      },
      {
        title: { it: "Impara dal tuo portfolio", en: "Learns from your portfolio" },
        desc: {
          it: "Connesso al tuo database immobili in tempo reale. Sa cosa hai disponibile, i prezzi esatti, le caratteristiche. Zero allucinazioni.",
          en: "Connected to your property database in real-time. Knows what's available, exact prices, features. Zero hallucinations.",
        },
        tag: { it: "Real-time DB", en: "Real-time DB" },
      },
      {
        title: { it: "Un team intero, un costo fisso", en: "A whole team, one fixed cost" },
        desc: {
          it: "Gestisce in parallelo centinaia di conversazioni simultanee. Nessun burnout, nessuna malattia, nessun turno da coprire.",
          en: "Handles hundreds of simultaneous conversations in parallel. No burnout, no sick days, no shifts to cover.",
        },
        tag: { it: "Scalabile", en: "Scalable" },
      },
    ],
  },

  // ── Demo ────────────────────────────────────────────────────
  demo: {
    tag: { it: "DEMO INTERATTIVA", en: "INTERACTIVE DEMO" },
    title: { it: "Parla con", en: "Talk to" },
    sub: {
      it: "Dimmi quante richieste ricevi al giorno. Core AI calcola in tempo reale quante ore stai perdendo — e quanto risparmieresti.",
      en: "Tell me how many requests you get per day. Core AI calculates in real-time how many hours you're losing — and how much you'd save.",
    },
    roiTag: { it: "ROI MEDIO DOCUMENTATO", en: "DOCUMENTED AVERAGE ROI" },
    roiRows: [
      { it: "Ore risparmiate/giorno per agente", en: "Hours saved/day per agent" },
      { it: "Ore/mese liberate (20gg lavorativi)", en: "Hours/month freed (20 working days)" },
      { it: "Ore/anno per agente", en: "Hours/year per agent" },
      { it: "Lead persi per risposta tardiva", en: "Leads lost to late response" },
    ],
    inAction: { it: "IN AZIONE", en: "IN ACTION" },
    actionItems: [
      { it: "Risposta intelligente e contestuale in < 2 secondi", en: "Smart, contextual response in < 2 seconds" },
      { it: "Qualificazione automatica del lead con domande mirate", en: "Automatic lead qualification with targeted questions" },
      { it: "Calcolo ROI personalizzato sui tuoi dati reali", en: "Custom ROI calculation on your real data" },
      { it: "In produzione: connesso al tuo database immobili", en: "In production: connected to your property database" },
    ],
    activateCta: { it: "Attivalo nella mia agenzia", en: "Activate it in my agency" },
  },

  // ── Social proof ────────────────────────────────────────────
  social: {
    quote: {
      it: "Da quando abbiamo attivato Core AI, riceviamo lead già qualificati con budget e zona. I clienti arrivano in agenzia sapendo cosa vogliono. Abbiamo ridotto il tempo medio di chiusura del 40% e recuperato quasi 3 ore al giorno per agente.",
      en: "Since we activated Core AI, we receive leads already qualified with budget and area. Clients arrive at our agency knowing what they want. We reduced average closing time by 40% and recovered nearly 3 hours per day per agent.",
    },
    pilot: { it: "Savona · Riviera di Ponente · Cliente Pilota", en: "Savona · Italian Riviera · Pilot Client" },
  },

  // ── Pricing ─────────────────────────────────────────────────
  pricing: {
    tag: { it: "PRICING", en: "PRICING" },
    title1: { it: "Un unico piano.", en: "One single plan." },
    title2: { it: "Zero compromessi.", en: "Zero compromises." },
    sub: {
      it: "Tutto incluso. Nessun contratto annuale. Operativo in 48 ore.",
      en: "All included. No annual contract. Live in 48 hours.",
    },
    perMonth: { it: "/mese", en: "/month" },
    setup: { it: "+ €1.499 setup una tantum", en: "+ €1,499 one-time setup" },
    highlights: [
      { it: "AI Concierge personalizzata 24/7", en: "Custom AI Concierge 24/7" },
      { it: "Sito Web di Lusso incluso", en: "Luxury Website included" },
      { it: "Integrazione WhatsApp Business", en: "WhatsApp Business integration" },
      { it: "Report Mensile sull'efficienza", en: "Monthly efficiency report" },
      { it: "Setup in 48h · Disdici quando vuoi", en: "Setup in 48h · Cancel anytime" },
    ],
    detailsCta: { it: "Scopri tutti i dettagli", en: "See all details" },
  },

  // ── CTA Finale ──────────────────────────────────────────────
  cta: {
    tag: { it: "INIZIA ORA", en: "START NOW" },
    title1: { it: "Il tuo competitor", en: "Your competitor" },
    title2: { it: "sta già leggendo questa pagina.", en: "is already reading this page." },
    sub: {
      it: "Ogni giorno senza AI è un giorno in cui stai regalando lead ai tuoi concorrenti. Setup in 48 ore. Disdici quando vuoi.",
      en: "Every day without AI is a day you're giving leads to your competitors. Setup in 48 hours. Cancel anytime.",
    },
    btn1: { it: "Prova Core AI gratis", en: "Try Core AI free" },
    btn2: { it: "Vedi i piani", en: "View plans" },
  },

  // ── Contact ─────────────────────────────────────────────────
  contact: {
    tag: { it: "CONTATTACI", en: "CONTACT US" },
    title1: { it: "Parliamo del", en: "Let's talk about" },
    title2: { it: "tuo progetto.", en: "your project." },
    sub: {
      it: "Raccontaci della tua agenzia. Ti ricontatteremo entro 24 ore con una proposta personalizzata.",
      en: "Tell us about your agency. We'll get back to you within 24 hours with a tailored proposal.",
    },
    emailLabel: { it: "Email", en: "Email" },
    responseLabel: { it: "Risposta", en: "Response" },
    responseValue: { it: "Entro 24 ore lavorative", en: "Within 24 business hours" },
    setupLabel: { it: "Setup", en: "Setup" },
    setupValue: { it: "Operativo in 48h dal pagamento", en: "Live within 48h of payment" },
    tryNow: { it: "Preferisci provare subito?", en: "Prefer to try right away?" },
    tryNowSub: {
      it: "Scorri in alto e parla con Core AI. Scopri il tuo ROI in 2 minuti.",
      en: "Scroll up and talk to Core AI. Discover your ROI in 2 minutes.",
    },
    // Form fields
    formName: { it: "Nome *", en: "Name *" },
    formEmail: { it: "Email *", en: "Email *" },
    formPhone: { it: "Telefono", en: "Phone" },
    formMessage: { it: "Messaggio", en: "Message" },
    formNamePh: { it: "Mario Rossi", en: "John Doe" },
    formEmailPh: { it: "mario@agenzia.it", en: "john@agency.com" },
    formPhonePh: { it: "+39 333 1234567", en: "+1 555 123 4567" },
    formMsgPh: {
      it: "Raccontaci della tua agenzia e delle tue esigenze...",
      en: "Tell us about your agency and your needs...",
    },
    formSubmit: { it: "Invia messaggio", en: "Send message" },
    formLoading: { it: "Invio in corso...", en: "Sending..." },
    formSuccess: { it: "Messaggio ricevuto", en: "Message received" },
    formSuccessSub: {
      it: "Ti ricontatteremo entro 24 ore. Preparati a scoprire il tuo ROI.",
      en: "We'll get back to you within 24 hours. Get ready to discover your ROI.",
    },
    formAnother: { it: "Invia un altro messaggio", en: "Send another message" },
  },

  // ── Footer ──────────────────────────────────────────────────
  footer: {
    copy: { it: "© 2026 Aura PropTech · Built in Italy · Powered by Gemini AI", en: "© 2026 Aura PropTech · Built in Italy · Powered by Gemini AI" },
  },
} as const;

// ── Type-safe accessor ────────────────────────────────────────
type Translations = typeof t;
type TranslationValue = { it: string; en: string };

// Recursive get
function getNestedValue(obj: unknown, path: string): TranslationValue | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  if (current && typeof current === "object" && "it" in current && "en" in current) {
    return current as TranslationValue;
  }
  return undefined;
}

// ── Context ───────────────────────────────────────────────────
interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  tx: (path: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("it");

  const tx = (path: string): string => {
    const val = getNestedValue(t, path);
    return val ? val[lang] : path;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tx }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
