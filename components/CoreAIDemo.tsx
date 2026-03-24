"use client";

import { useState, useRef, useEffect, useCallback, Component, type ReactNode, type ErrorInfo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, Zap, AlertCircle, X, TrendingDown, TrendingUp, Clock, Users, Download, FileText, ArrowRight, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { PitchDocument } from "./PitchPDF";
import type { PitchData } from "./PitchPDF";

// ── ErrorBoundary ────────────────────────────────────────────
class ChatErrorBoundary extends Component<
  { children: ReactNode; onReset: () => void },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: ReactNode; onReset: () => void }) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message || "Errore imprevisto" };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[CoreAI ErrorBoundary]", error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-xl mx-auto rounded-2xl p-8 text-center" style={{ background: "#0A0A0F", border: "1px solid rgba(255,45,120,0.3)" }}>
          <AlertCircle size={32} className="mx-auto mb-4" style={{ color: "#FF2D78" }} />
          <p className="font-mono text-sm text-white mb-2">Qualcosa è andato storto</p>
          <p className="font-mono text-xs mb-6" style={{ color: "var(--text-muted)" }}>{this.state.errorMsg}</p>
          <button
            onClick={() => { this.setState({ hasError: false, errorMsg: "" }); this.props.onReset(); }}
            className="px-5 py-2.5 rounded-lg font-mono font-bold text-xs text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            <RotateCcw size={12} className="inline mr-2" />
            RIAVVIA CORE AI
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface ROIMetrics {
  agents: number | null;
  hoursDaily: number | null;
  hoursMonthly: number | null;
  lossMonthly: number | null;
  lossAnnual: number | null;
  auraCostAnnual: number | null;
  roi: number | null;
}

const EMPTY_ROI: ROIMetrics = {
  agents: null, hoursDaily: null, hoursMonthly: null,
  lossMonthly: null, lossAnnual: null, auraCostAnnual: null, roi: null,
};

const WELCOME: ChatMessage = {
  role: "model",
  text: "Questa è una conversazione che potrebbe costarti — o risparmiarti — €72.000 all'anno.\n\nParto con una domanda diretta: quanti agenti lavorano nella tua agenzia, e quante ore al giorno passate a rispondere a richieste che non si trasformano in vendita?",
};

const QUICK_PROMPTS = [
  "Ho 3 agenti, perdiamo circa 2 ore al giorno a testa",
  "Riceviamo 25 richieste al giorno",
  "Non ho budget per un software AI",
  "Il mio sito funziona bene così",
];

const VALUE_PER_HOUR = 150;
const AURA_SETUP = 1499;
const AURA_MONTHLY = 149;

const PDF_TRIGGER_MSG =
  "Ho consolidato i dati della tua agenzia in questo Report Strategico. Scaricalo per vedere dove stai perdendo sangue.";

// ── Extract agency name from conversation ──────────────────────
function extractAgencyName(allMessages: ChatMessage[]): string {
  const texts = allMessages.map((m) => m.text).join(" ");
  const patterns = [
    /(?:agenzia|immobiliare|studio|gruppo|team)\s+[""«]?([A-Z][A-Za-zÀ-ú\s&'.]+)[""»]?/,
    /(?:mi chiamo|sono|siamo|lavoro per|lavoro da)\s+[""«]?([A-Z][A-Za-zÀ-ú\s&'.]{2,30})[""»]?/,
    /(?:chiama|nome è)\s+[""«]?([A-Z][A-Za-zÀ-ú\s&'.]{2,30})[""»]?/,
  ];
  for (const p of patterns) {
    const m = texts.match(p);
    if (m) return m[1].trim();
  }
  return "La Tua Agenzia";
}

function fmt(n: number): string {
  return new Intl.NumberFormat("it-IT").format(Math.round(n));
}

// ── Extract numbers from conversation ─────────────────────────
function extractROI(allMessages: ChatMessage[]): ROIMetrics {
  const userTexts = allMessages
    .filter((m) => m.role === "user")
    .map((m) => m.text.toLowerCase())
    .join(" ");

  let agents: number | null = null;
  let hoursDaily: number | null = null;

  // Agents: "3 agenti", "ho 5 persone", "siamo in 4", "4 agenti"
  const agentPatterns = [
    /(\d+)\s*agent[ei]/,
    /(\d+)\s*person[ae]/,
    /siamo\s+(?:in\s+)?(\d+)/,
    /ho\s+(\d+)\s*(?:agent|person|collaborat)/,
    /team\s*(?:di\s+)?(\d+)/,
  ];
  for (const p of agentPatterns) {
    const m = userTexts.match(p);
    if (m) { agents = parseInt(m[1]); break; }
  }

  // Hours: "2 ore", "3.5 ore", "perdo 2h", "circa 1.5 ore"
  const hourPatterns = [
    /(\d+(?:[.,]\d+)?)\s*or[ea]/,
    /(\d+(?:[.,]\d+)?)\s*h(?:\b|\/)/,
    /perd[oiae]+\s*(?:circa\s+)?(\d+(?:[.,]\d+)?)/,
  ];
  for (const p of hourPatterns) {
    const m = userTexts.match(p);
    if (m) { hoursDaily = parseFloat(m[1].replace(",", ".")); break; }
  }

  if (hoursDaily === null && agents === null) return EMPTY_ROI;

  // Use defaults if only one is provided
  const h = hoursDaily ?? 2.5;
  const a = agents ?? 1;
  const hoursMonthly = h * 20 * a;
  const lossMonthly = hoursMonthly * VALUE_PER_HOUR;
  const lossAnnual = lossMonthly * 12;
  const auraCostAnnual = AURA_SETUP + AURA_MONTHLY * 12;
  const roi = Math.round(lossAnnual / auraCostAnnual);

  return { agents: a, hoursDaily: h, hoursMonthly, lossMonthly, lossAnnual, auraCostAnnual, roi };
}

// ── Extract email from user messages ─────────────────────────
function extractEmail(allMessages: ChatMessage[]): string | null {
  const userTexts = allMessages
    .filter((m) => m.role === "user")
    .map((m) => m.text)
    .join(" ");
  const match = userTexts.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0].toLowerCase() : null;
}

// ── Auto-save lead to Supabase via /api/contact ─────────────
function saveLeadFromChat(msgs: ChatMessage[]) {
  const email = extractEmail(msgs);
  if (!email) return;
  const agencyName = extractAgencyName(msgs);
  // Fire-and-forget — no await, no UI impact
  fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: agencyName,
      email,
      source: "demo_chat",
    }),
  }).catch(() => {});
}

// ╔═══════════════════════════════════════════════════════════╗
//  BADGE COMPONENT — animated ROI chip
// ╚═══════════════════════════════════════════════════════════╝
function ROIBadge({ icon: Icon, label, value, color, delay }: {
  icon: typeof TrendingDown;
  label: string;
  value: string;
  color: "pink" | "blue" | "green";
  delay: number;
}) {
  const colors = {
    pink: { bg: "rgba(255,45,120,0.1)", border: "rgba(255,45,120,0.3)", text: "#FF2D78" },
    blue: { bg: "rgba(0,112,243,0.1)", border: "rgba(0,112,243,0.3)", text: "#2383FF" },
    green: { bg: "rgba(0,199,129,0.1)", border: "rgba(0,199,129,0.3)", text: "#00C781" },
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-mono"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <Icon size={11} style={{ color: colors.text, flexShrink: 0 }} />
      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="text-xs font-bold ml-auto" style={{ color: colors.text }}>{value}</span>
    </motion.div>
  );
}

// ╔═══════════════════════════════════════════════════════════╗
//  ROI PANEL — appears between messages
// ╚═══════════════════════════════════════════════════════════╝
function ROIPanel({ m }: { m: ROIMetrics }) {
  if (!m.lossAnnual) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-1.5 mx-2"
      style={{ minHeight: "8rem" }}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <div className="h-px flex-1" style={{ background: "rgba(255,45,120,0.2)" }} />
        <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          calcolo live
        </span>
        <div className="h-px flex-1" style={{ background: "rgba(0,112,243,0.2)" }} />
      </div>
      {m.agents !== null && (
        <ROIBadge icon={Users} label="Team" value={`${m.agents} agente/i`} color="blue" delay={0} />
      )}
      {m.hoursDaily !== null && (
        <ROIBadge icon={Clock} label="Ore perse/giorno" value={`${m.hoursDaily}h × ${m.agents || 1}`} color="pink" delay={0.08} />
      )}
      <ROIBadge icon={TrendingDown} label="Perdita annua" value={`-€${fmt(m.lossAnnual)}`} color="pink" delay={0.16} />
      <ROIBadge icon={TrendingUp} label="Con Aura Elite" value={`€${fmt(m.auraCostAnnual!)}/anno`} color="blue" delay={0.24} />
      <ROIBadge
        icon={Zap}
        label="ROI"
        value={`${m.roi}x il costo`}
        color="green"
        delay={0.32}
      />
    </motion.div>
  );
}

// ╔═══════════════════════════════════════════════════════════╗
//  MAIN COMPONENT
// ╚═══════════════════════════════════════════════════════════╝
function CoreAIChatInner() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPrompts, setShowPrompts] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [roi, setRoi] = useState<ROIMetrics>(EMPTY_ROI);
  const [showROIPanel, setShowROIPanel] = useState(false);
  const [pdfOffered, setPdfOffered] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pdfTriggeredRef = useRef(false);
  const leadSavedRef = useRef(false);
  const userScrolledUpRef = useRef(false);
  const isScrollingRef = useRef(false);

  // Track if user has manually scrolled up — if so, don't auto-scroll
  const handleScroll = useCallback(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    isScrollingRef.current = true;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    userScrolledUpRef.current = distanceFromBottom > 80;
    // Reset scrolling flag after scroll settles
    clearTimeout((handleScroll as unknown as { _t?: ReturnType<typeof setTimeout> })._t);
    (handleScroll as unknown as { _t?: ReturnType<typeof setTimeout> })._t = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, []);

  // Scroll to bottom — direct assignment, no rAF, no smooth behavior
  const scrollToBottom = useCallback(() => {
    if (userScrolledUpRef.current || isScrollingRef.current) return;
    const el = scrollAreaRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += Math.floor(Math.random() * 800 + 200);
      setCharCount(i);
      if (i >= 48420) { setCharCount(48420); clearInterval(interval); }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Recalculate ROI whenever messages change
  const updateROI = useCallback((msgs: ChatMessage[]) => {
    const newROI = extractROI(msgs);
    if (newROI.lossAnnual !== null) {
      setRoi(newROI);
      setShowROIPanel(true);
    }
  }, []);

  // ── Build PitchData and trigger PDF download ────────────────
  const handleDownloadPDF = useCallback(async () => {
    if (pdfGenerating || !roi.lossAnnual) return;
    setPdfGenerating(true);

    try {
      const agencyName = extractAgencyName(messages);
      const data: PitchData = {
        agencyName,
        hoursLostDaily: roi.hoursDaily ?? 2.5,
        agentsCount: roi.agents ?? 1,
        hoursMonthly: roi.hoursMonthly ?? 50,
        valueMonthly: roi.lossMonthly ?? 7500,
        valueAnnual: roi.lossAnnual,
        auraCostAnnual: roi.auraCostAnnual ?? 3287,
        roi: roi.roi ?? 22,
      };

      const blob = await pdf(<PitchDocument d={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Aura-Report-${agencyName.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError("Errore nella generazione del PDF.");
    } finally {
      setPdfGenerating(false);
    }
  }, [messages, roi, pdfGenerating]);

  // ── Stripe Checkout redirect ───────────────────────────────
  const handleCheckout = useCallback(async () => {
    if (checkoutLoading) return;
    setCheckoutLoading(true);
    try {
      const agencyName = extractAgencyName(messages);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agencyName }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Errore nella creazione del checkout.");
        setCheckoutLoading(false);
      }
    } catch {
      setError("Errore di rete. Riprova.");
      setCheckoutLoading(false);
    }
  }, [messages, checkoutLoading]);

  // ── Trigger PDF offer after enough conversation + ROI data ──
  const maybeTriggerPdf = useCallback(
    (msgs: ChatMessage[], currentROI: ROIMetrics) => {
      if (pdfTriggeredRef.current) return;
      const userMsgCount = msgs.filter((m) => m.role === "user").length;
      if (userMsgCount >= 3 && currentROI.lossAnnual !== null) {
        pdfTriggeredRef.current = true;
        // Delay the PDF message so it feels natural after the AI response
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "model", text: PDF_TRIGGER_MSG },
          ]);
          setPdfOffered(true);
        }, 1800);
      }
    },
    [],
  );

  const sendingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  // Sanitize text: strip zero-width chars, normalize quotes, trim
  const sanitize = (raw: string): string =>
    raw.replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
       .replace(/[\u2018\u2019]/g, "'")
       .replace(/[\u201C\u201D]/g, '"')
       .trim();

  const sendMessage = async (text: string) => {
    const trimmed = sanitize(text);
    if (!trimmed || isLoading || sendingRef.current) return;
    sendingRef.current = true;
    console.log("[CoreAI] sendMessage START:", JSON.stringify(trimmed));

    setShowPrompts(false);
    const userMsg: ChatMessage = { role: "user", text: trimmed };
    const updated = [...messages, userMsg];
    // Add user message + empty model placeholder for streaming
    const streamingMsgs = [...updated, { role: "model" as const, text: "" }];
    setMessages(streamingMsgs);
    setInput("");
    setIsLoading(true);
    setError(null);
    userScrolledUpRef.current = false;

    updateROI(updated);

    // Auto-save lead if user shared their email (once per session)
    if (!leadSavedRef.current && extractEmail(updated)) {
      leadSavedRef.current = true;
      saveLeadFromChat(updated);
    }

    // Abort controller for this request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/core-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated.slice(-12) }),
        signal: controller.signal,
      });

      console.log("[CoreAI] response status:", res.status, "type:", res.headers.get("content-type"));

      // If the API returned JSON (error), parse it
      if (res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error("ReadableStream non supportato dal browser.");

      // ── Incremental stream reader ──────────────────────────
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      let scrollTick = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        // Update the last message (model placeholder) with accumulated text
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "model", text: accumulated };
          return copy;
        });

        // Scroll every ~4 chunks to avoid thrashing
        scrollTick++;
        if (scrollTick % 4 === 0) scrollToBottom();
      }

      console.log("[CoreAI] stream complete, chars:", accumulated.length);

      if (!accumulated.trim()) {
        throw new Error("Risposta vuota.");
      }

      // Final state with complete message
      const withModel = [...updated, { role: "model" as const, text: accumulated }];
      setMessages(withModel);
      setTimeout(scrollToBottom, 50);

      const newROI = extractROI(withModel);
      if (newROI.lossAnnual !== null) {
        setRoi(newROI);
        setShowROIPanel(true);
      }
      maybeTriggerPdf(withModel, newROI);
    } catch (err) {
      if (controller.signal.aborted) {
        console.log("[CoreAI] request aborted");
        return;
      }
      const msg = err instanceof Error ? err.message : "Errore di rete";
      console.error("[CoreAI] sendMessage FAILED:", msg, err);
      setError(msg);
      // Remove both the user message and the empty model placeholder
      setMessages((prev) => {
        const filtered = prev.filter((m, i) => {
          if (i === prev.length - 1 && m.role === "model" && !m.text.trim()) return false;
          if (i === prev.length - 2 && m.role === "user" && m.text === trimmed) return false;
          return true;
        });
        return filtered.length > 0 ? filtered : [WELCOME];
      });
    } finally {
      setIsLoading(false);
      sendingRef.current = false;
      abortRef.current = null;
      console.log("[CoreAI] sendMessage END");
    }
  };

  // Dedicated handler for quick-prompt buttons — debounced with try/catch
  const handleQuickPrompt = useCallback((e: React.MouseEvent, prompt: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading || sendingRef.current) {
      console.warn("[CoreAI] quick prompt blocked: already sending");
      return;
    }
    console.log("[CoreAI] quick prompt clicked:", prompt);
    setTimeout(() => {
      sendMessage(prompt).catch((err) => {
        console.error("[CoreAI] quick prompt handler error:", err);
      });
    }, 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const reset = () => {
    setMessages([WELCOME]);
    setInput("");
    setError(null);
    setShowPrompts(true);
    setRoi(EMPTY_ROI);
    setShowROIPanel(false);
    setPdfOffered(false);
    pdfTriggeredRef.current = false;
    leadSavedRef.current = false;
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div
      className="w-full max-w-xl mx-auto rounded-2xl p-px"
      style={{
        background: "linear-gradient(135deg, #FF2D78 0%, #7B2FFF 50%, #0070F3 100%)",
        boxShadow:
          "0 0 40px rgba(255,45,120,0.2), 0 0 80px rgba(0,112,243,0.2), 0 0 120px rgba(123,47,255,0.1), 0 32px 80px rgba(0,0,0,0.7)",
      }}
    >
    <div
      className="w-full flex flex-col rounded-2xl overflow-hidden relative"
      style={{ background: "#0A0A0F", height: "600px", maxHeight: "600px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,120,0.5), rgba(0,112,243,0.5), transparent)" }}
      />

      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,112,243,0.12)" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
            >
              <Zap size={14} className="text-white" />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: "#00C781", borderColor: "#0A0A0F" }}
            />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none font-mono">
              CORE AI <span style={{ color: "var(--blue)" }}>v2.5</span>
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {charCount.toLocaleString("it-IT")} richieste processate oggi
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded"
            style={{ background: "rgba(0,199,129,0.08)", color: "#00C781", border: "1px solid rgba(0,199,129,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            LIVE
          </div>
          <button
            onClick={reset}
            className="p-1.5 rounded transition-colors hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
            title="Reset"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollAreaRef}
        onScroll={handleScroll}
        className="flex flex-col gap-3 p-4 flex-1 overflow-y-auto overscroll-contain"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={`${i}-${msg.role}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "model" && (
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mr-2 mt-1 self-start"
                style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
              >
                <Zap size={10} className="text-white" />
              </div>
            )}
            <div
              className="max-w-[82%] px-4 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap font-mono"
              style={{
                minHeight: "2.5rem",
                ...(msg.role === "user"
                  ? {
                      background: "rgba(0,112,243,0.15)",
                      color: "#E0E8FF",
                      border: "1px solid rgba(0,112,243,0.3)",
                      borderBottomRightRadius: "4px",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--text-primary)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderBottomLeftRadius: "4px",
                    }),
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* ROI LIVE BADGES — appear after user provides data */}
        <AnimatePresence>
          {showROIPanel && !isLoading && messages.length > 2 && (
            <ROIPanel m={roi} />
          )}
        </AnimatePresence>

        {/* PDF Download Button */}
        <AnimatePresence>
          {pdfOffered && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex justify-center my-2"
            >
              <button
                onClick={handleDownloadPDF}
                disabled={pdfGenerating}
                className="group relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-mono font-bold text-sm text-white transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                style={{
                  background: "linear-gradient(135deg, #FF2D78, #7B2FFF, #0070F3)",
                  boxShadow:
                    "0 0 20px rgba(255,45,120,0.3), 0 0 40px rgba(123,47,255,0.2), 0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {/* Glow pulse ring */}
                <span
                  className="absolute inset-0 rounded-xl animate-pulse pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, #FF2D78, #7B2FFF, #0070F3)",
                    opacity: 0.3,
                    filter: "blur(12px)",
                  }}
                />
                {pdfGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <FileText size={16} />
                    </motion.div>
                    <span className="relative z-10">GENERAZIONE IN CORSO...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} className="relative z-10" />
                    <span className="relative z-10">SCARICA REPORT PDF</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stripe CTA — after PDF offer */}
        <AnimatePresence>
          {pdfOffered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center"
            >
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono font-bold text-xs text-white transition-all duration-300 hover:scale-105 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                  boxShadow: "0 0 16px rgba(0,112,243,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Reindirizzamento...
                  </>
                ) : (
                  <>
                    <Zap size={13} />
                    ATTIVA AURA ELITE ORA
                    <ArrowRight size={12} />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick prompts */}
        <AnimatePresence>
          {showPrompts && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-2 mt-1"
            >
              <p className="text-[10px] text-center font-mono" style={{ color: "var(--text-muted)" }}>
                PROMPT SUGGERITI
              </p>
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={(e) => handleQuickPrompt(e, p)}
                  disabled={isLoading || sendingRef.current}
                  className="text-left text-xs px-3 py-2 rounded-lg border font-mono transition-all hover:scale-[1.01] disabled:opacity-40"
                  style={{
                    borderColor: "rgba(0,112,243,0.2)",
                    color: "var(--blue-bright)",
                    background: "rgba(0,112,243,0.04)",
                  }}
                >
                  &gt; {p}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator — only visible before first chunk arrives */}
        {isLoading && !messages[messages.length - 1]?.text && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
            >
              <Zap size={10} className="text-white" />
            </div>
            <div
              className="px-4 py-2.5 rounded-xl rounded-bl-sm flex gap-1.5 items-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[0, 1, 2].map((j) => (
                <motion.span
                  key={j}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--blue)" }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: j * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono"
              style={{ background: "rgba(255,45,120,0.08)", border: "1px solid rgba(255,45,120,0.2)", color: "#FF2D78" }}
            >
              <AlertCircle size={12} />
              <span className="flex-1">{error}</span>
              <button onClick={() => setError(null)}><X size={11} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.4)" }}
      >
        <span className="text-xs font-mono flex-shrink-0" style={{ color: "var(--blue)" }}>&gt;_</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Scrivi la tua risposta…"
          disabled={isLoading}
          className="flex-1 text-sm bg-transparent outline-none font-mono disabled:opacity-40"
          style={{ color: "var(--text-primary)" }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-20 transition-opacity"
          style={{ background: "linear-gradient(135deg, #FF2D78, #0070F3)" }}
        >
          <Send size={13} className="text-white" />
        </motion.button>
      </div>
    </div>
    </div>
  );
}

// ── Wrapped export with ErrorBoundary ────────────────────────
export default function CoreAIDemo() {
  const [resetKey, setResetKey] = useState(0);
  return (
    <ChatErrorBoundary onReset={() => setResetKey((k) => k + 1)}>
      <CoreAIChatInner key={resetKey} />
    </ChatErrorBoundary>
  );
}
