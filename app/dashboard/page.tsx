"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, Globe, Clock, CheckCircle, AlertTriangle,
  Settings, MessageSquare, CreditCard, Calendar,
  ArrowRight, ExternalLink, Send, Loader2, BarChart3,
  FileText, Shield,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type SiteStatus = "building" | "review" | "live" | "maintenance";
type RequestStatus = "open" | "in_progress" | "done";

interface ModRequest {
  id: string;
  date: string;
  title: string;
  status: RequestStatus;
  response?: string;
}

// ── Mock data (replace with Supabase in production) ──────────
const mockClient = {
  agencyName: "Demo Immobiliare",
  plan: "professional" as const,
  siteUrl: "https://demo-immobiliare.auraproptech.io",
  siteStatus: "live" as SiteStatus,
  subscriptionStart: "2026-02-01",
  subscriptionEnd: "2026-08-01",
  nextPayment: "2026-04-01",
  monthlyPrice: "€149,99",
  aiConversations: 1247,
  leadsGenerated: 89,
  pageViews: 12450,
};

const mockRequests: ModRequest[] = [
  { id: "1", date: "2026-03-20", title: "Aggiungere nuova zona: Albisola", status: "done", response: "Zona aggiunta con successo" },
  { id: "2", date: "2026-03-22", title: "Cambiare foto hero della homepage", status: "in_progress" },
];

const statusConfig: Record<SiteStatus, { label: string; color: string; icon: typeof CheckCircle }> = {
  building: { label: "In costruzione", color: "#F59E0B", icon: Clock },
  review: { label: "In revisione", color: "#8B5CF6", icon: FileText },
  live: { label: "Online", color: "#00C781", icon: CheckCircle },
  maintenance: { label: "Manutenzione", color: "#FF2D78", icon: AlertTriangle },
};

const requestStatusConfig: Record<RequestStatus, { label: string; color: string }> = {
  open: { label: "Aperta", color: "#F59E0B" },
  in_progress: { label: "In lavorazione", color: "#0070F3" },
  done: { label: "Completata", color: "#00C781" },
};

export default function DashboardPage() {
  const [newRequest, setNewRequest] = useState("");
  const [sending, setSending] = useState(false);
  const [requests, setRequests] = useState<ModRequest[]>(mockRequests);

  const client = mockClient;
  const status = statusConfig[client.siteStatus];
  const StatusIcon = status.icon;

  const daysLeft = Math.ceil((new Date(client.subscriptionEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const handleSendRequest = async () => {
    if (!newRequest.trim()) return;
    setSending(true);
    // In production: POST to /api/requests
    await new Promise((r) => setTimeout(r, 800));
    setRequests((prev) => [
      { id: Date.now().toString(), date: new Date().toISOString().split("T")[0], title: newRequest, status: "open" },
      ...prev,
    ]);
    setNewRequest("");
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="flex items-center justify-between px-6 h-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}>
              <Zap size={14} />
            </div>
            <span className="font-mono font-bold text-sm">AURA<span style={{ color: "#0070F3" }}>PROPTECH</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: `${status.color}15`, color: status.color, border: `1px solid ${status.color}40` }}>
              <StatusIcon size={10} className="inline mr-1" /> {status.label}
            </span>
            <a href="/" className="text-xs font-mono hover:underline" style={{ color: "var(--text-muted)" }}>Home</a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 md:px-6 max-w-6xl mx-auto">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-mono text-3xl md:text-4xl font-bold mb-2">{client.agencyName}</h1>
          <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
            Piano {client.plan.charAt(0).toUpperCase() + client.plan.slice(1)} · Dashboard cliente
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Stato sito", value: status.label, icon: Globe, color: status.color },
            { label: "Conversazioni AI", value: client.aiConversations.toLocaleString(), icon: MessageSquare, color: "#0070F3" },
            { label: "Lead generati", value: client.leadsGenerated.toString(), icon: BarChart3, color: "#00C781" },
            { label: "Visite pagina", value: client.pageViews.toLocaleString(), icon: ExternalLink, color: "#8B5CF6" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <stat.icon size={14} style={{ color: stat.color }} />
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
              </div>
              <p className="text-2xl font-mono font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column — Subscription info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 flex flex-col gap-6">
            {/* Subscription card */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-5">
                <CreditCard size={14} style={{ color: "#0070F3" }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Abbonamento</span>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Piano", value: client.plan.charAt(0).toUpperCase() + client.plan.slice(1) },
                  { label: "Canone mensile", value: client.monthlyPrice },
                  { label: "Prossimo pagamento", value: client.nextPayment },
                  { label: "Giorni rimanenti", value: `${daysLeft} giorni` },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                    <span className="text-sm font-mono font-bold" style={{ color: "var(--text-primary)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
              {daysLeft < 30 && (
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(255,45,120,0.08)", border: "1px solid rgba(255,45,120,0.2)" }}>
                  <p className="text-[11px] font-mono" style={{ color: "#FF2D78" }}>
                    <AlertTriangle size={11} className="inline mr-1" /> Il tuo abbonamento scade tra {daysLeft} giorni
                  </p>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Settings size={14} style={{ color: "var(--text-muted)" }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Link rapidi</span>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Visita il tuo sito", href: client.siteUrl, icon: ExternalLink },
                  { label: "Privacy Policy", href: "/privacy", icon: Shield },
                  { label: "Termini di Servizio", href: "/terms", icon: FileText },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-mono transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <link.icon size={14} style={{ color: "var(--text-muted)" }} />
                    <span style={{ color: "var(--text-secondary)" }}>{link.label}</span>
                    <ArrowRight size={12} className="ml-auto" style={{ color: "var(--text-muted)" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Calendar size={14} style={{ color: "var(--text-muted)" }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Timeline</span>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { date: client.subscriptionStart, label: "Inizio abbonamento", done: true },
                  { date: "—", label: "Sito online", done: client.siteStatus === "live" },
                  { date: client.nextPayment, label: "Prossimo rinnovo", done: false },
                  { date: client.subscriptionEnd, label: "Scadenza attuale", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.done ? "#00C781" : "rgba(255,255,255,0.15)" }} />
                    <div className="flex-1">
                      <p className="text-xs font-mono" style={{ color: item.done ? "var(--text-primary)" : "var(--text-muted)" }}>{item.label}</p>
                      <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — Modification requests */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={14} style={{ color: "#0070F3" }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Richieste di modifica</span>
              </div>

              {/* New request form */}
              <div className="mb-6">
                <div className="flex gap-3">
                  <input
                    className="flex-1 bg-transparent rounded-xl px-4 py-3 text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-blue-500 transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    placeholder="Descrivi la modifica che vuoi richiedere..."
                    value={newRequest}
                    onChange={(e) => setNewRequest(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendRequest()}
                  />
                  <button
                    onClick={handleSendRequest}
                    disabled={sending || !newRequest.trim()}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono font-bold text-sm text-white transition-all hover:scale-105 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
                  >
                    {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  </button>
                </div>
              </div>

              {/* Requests list */}
              <div className="flex flex-col gap-3">
                {requests.length === 0 ? (
                  <div className="text-center py-10">
                    <MessageSquare size={30} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                    <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>Nessuna richiesta inviata</p>
                  </div>
                ) : (
                  requests.map((req) => {
                    const rs = requestStatusConfig[req.status];
                    return (
                      <div
                        key={req.id}
                        className="rounded-xl p-4"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-mono font-bold" style={{ color: "var(--text-primary)" }}>{req.title}</p>
                          <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-3"
                            style={{ background: `${rs.color}15`, color: rs.color, border: `1px solid ${rs.color}30` }}
                          >
                            {rs.label}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{req.date}</p>
                        {req.response && (
                          <div className="mt-2 p-2.5 rounded-lg" style={{ background: "rgba(0,199,129,0.05)", border: "1px solid rgba(0,199,129,0.1)" }}>
                            <p className="text-xs font-mono" style={{ color: "#00C781" }}>Risposta: {req.response}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
