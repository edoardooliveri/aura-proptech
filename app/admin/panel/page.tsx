"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Users, Globe, BarChart3, CreditCard, Clock,
  CheckCircle, AlertTriangle, Search, Plus, Settings,
  ArrowRight, Send, Bell, Eye, Rocket, Trash2,
  MessageSquare, TrendingUp, Activity,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type Plan = "starter" | "professional" | "enterprise";
type SiteStatus = "pending" | "building" | "review" | "live" | "maintenance" | "suspended";

interface Client {
  id: string;
  agencyName: string;
  email: string;
  plan: Plan;
  siteStatus: SiteStatus;
  siteUrl: string;
  createdAt: string;
  subscriptionEnd: string;
  monthlyRevenue: number;
  aiConversations: number;
  leadsGenerated: number;
  pendingRequests: number;
}

// ── Mock clients data ────────────────────────────────────────
const mockClients: Client[] = [
  {
    id: "1", agencyName: "Armonie Immobiliare", email: "info@armonie.it",
    plan: "professional", siteStatus: "live", siteUrl: "armonie-immobiliare.it",
    createdAt: "2025-12-01", subscriptionEnd: "2026-12-01",
    monthlyRevenue: 99.99, aiConversations: 3420, leadsGenerated: 234, pendingRequests: 0,
  },
  {
    id: "2", agencyName: "Ferretti Immobiliare", email: "info@ferretti.it",
    plan: "professional", siteStatus: "live", siteUrl: "ferretti-immobiliare.it",
    createdAt: "2026-01-15", subscriptionEnd: "2026-07-15",
    monthlyRevenue: 99.99, aiConversations: 1247, leadsGenerated: 89, pendingRequests: 1,
  },
  {
    id: "3", agencyName: "Casa & Sole", email: "info@casaesole.it",
    plan: "enterprise", siteStatus: "live", siteUrl: "casaesole.it",
    createdAt: "2026-02-01", subscriptionEnd: "2026-08-01",
    monthlyRevenue: 149.99, aiConversations: 2890, leadsGenerated: 178, pendingRequests: 2,
  },
  {
    id: "4", agencyName: "Russo Real Estate", email: "info@russoreal.it",
    plan: "starter", siteStatus: "building", siteUrl: "—",
    createdAt: "2026-03-10", subscriptionEnd: "2026-09-10",
    monthlyRevenue: 49.99, aiConversations: 0, leadsGenerated: 0, pendingRequests: 0,
  },
  {
    id: "5", agencyName: "Liguria Home", email: "info@liguriahome.it",
    plan: "professional", siteStatus: "pending", siteUrl: "—",
    createdAt: "2026-03-22", subscriptionEnd: "2026-09-22",
    monthlyRevenue: 99.99, aiConversations: 0, leadsGenerated: 0, pendingRequests: 0,
  },
];

const planConfig: Record<Plan, { color: string; label: string; price: string }> = {
  starter: { color: "#64748b", label: "Starter", price: "€49,99/mese" },
  professional: { color: "#0070F3", label: "Professional", price: "€99,99/mese" },
  enterprise: { color: "#FF2D78", label: "Enterprise", price: "€199,99/mese" },
};

const statusConfig: Record<SiteStatus, { color: string; label: string; icon: typeof CheckCircle }> = {
  pending: { color: "#F59E0B", label: "In attesa", icon: Clock },
  building: { color: "#8B5CF6", label: "In costruzione", icon: Settings },
  review: { color: "#0070F3", label: "In revisione", icon: Eye },
  live: { color: "#00C781", label: "Online", icon: CheckCircle },
  maintenance: { color: "#F59E0B", label: "Manutenzione", icon: AlertTriangle },
  suspended: { color: "#EF4444", label: "Sospeso", icon: Trash2 },
};

type TabType = "overview" | "clients" | "notifications";

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = mockClients.filter(
    (c) =>
      c.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMRR = mockClients.reduce((acc, c) => acc + c.monthlyRevenue, 0);
  const totalLeads = mockClients.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const totalConversations = mockClients.reduce((acc, c) => acc + c.aiConversations, 0);
  const liveClients = mockClients.filter((c) => c.siteStatus === "live").length;
  const pendingRequests = mockClients.reduce((acc, c) => acc + c.pendingRequests, 0);

  const tabs: { id: TabType; label: string; icon: typeof Users }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "clients", label: "Clienti", icon: Users },
    { id: "notifications", label: "Notifiche", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2D78, #7B2FFF)" }}>
              <Zap size={14} />
            </div>
            <span className="font-mono font-bold text-sm">AURA<span style={{ color: "#FF2D78" }}>ADMIN</span></span>
          </div>
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: activeTab === tab.id ? "rgba(255,45,120,0.1)" : "transparent",
                  color: activeTab === tab.id ? "#FF2D78" : "var(--text-muted)",
                  border: activeTab === tab.id ? "1px solid rgba(255,45,120,0.3)" : "1px solid transparent",
                }}
              >
                <tab.icon size={12} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {/* ── OVERVIEW TAB ─────────────────────────────────────── */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="font-mono text-3xl font-bold mb-8">Dashboard Admin</h1>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                {[
                  { label: "MRR Totale", value: `€${totalMRR.toFixed(2)}`, icon: CreditCard, color: "#00C781" },
                  { label: "Clienti attivi", value: mockClients.length.toString(), icon: Users, color: "#0070F3" },
                  { label: "Siti online", value: liveClients.toString(), icon: Globe, color: "#00C781" },
                  { label: "Lead totali", value: totalLeads.toString(), icon: TrendingUp, color: "#8B5CF6" },
                  { label: "Richieste aperte", value: pendingRequests.toString(), icon: MessageSquare, color: pendingRequests > 0 ? "#FF2D78" : "#00C781" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <stat.icon size={14} style={{ color: stat.color }} />
                      <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
                    </div>
                    <p className="text-2xl font-mono font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Revenue by plan */}
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                {(["starter", "professional", "enterprise"] as Plan[]).map((plan) => {
                  const count = mockClients.filter((c) => c.plan === plan).length;
                  const revenue = mockClients.filter((c) => c.plan === plan).reduce((a, c) => a + c.monthlyRevenue, 0);
                  const config = planConfig[plan];
                  return (
                    <div key={plan} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full" style={{ background: `${config.color}15`, color: config.color, border: `1px solid ${config.color}30` }}>
                          {config.label}
                        </span>
                        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{count} clienti</span>
                      </div>
                      <p className="text-xl font-mono font-bold" style={{ color: config.color }}>€{revenue.toFixed(2)}/mese</p>
                    </div>
                  );
                })}
              </div>

              {/* Recent clients that need attention */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="font-mono font-bold text-sm mb-4 flex items-center gap-2">
                  <Activity size={14} style={{ color: "#FF2D78" }} /> Azione richiesta
                </h3>
                <div className="flex flex-col gap-3">
                  {mockClients.filter(c => c.siteStatus === "pending" || c.siteStatus === "building" || c.pendingRequests > 0).map(c => {
                    const sc = statusConfig[c.siteStatus];
                    return (
                      <div key={c.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sc.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-mono font-bold truncate" style={{ color: "var(--text-primary)" }}>{c.agencyName}</p>
                          <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                            {c.siteStatus === "pending" ? "Onboarding ricevuto — creare sito" :
                             c.siteStatus === "building" ? "Sito in costruzione" :
                             `${c.pendingRequests} richieste aperte`}
                          </p>
                        </div>
                        <button className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,112,243,0.1)", color: "#0070F3", border: "1px solid rgba(0,112,243,0.2)" }}>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── CLIENTS TAB ──────────────────────────────────────── */}
          {activeTab === "clients" && (
            <motion.div key="clients" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-mono text-3xl font-bold">Clienti</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}>
                  <Plus size={14} /> Nuovo cliente
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input
                  className="w-full bg-transparent rounded-xl pl-10 pr-4 py-3 text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-blue-500 transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  placeholder="Cerca cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Client list */}
              <div className="flex flex-col gap-3">
                {filteredClients.map((client) => {
                  const pc = planConfig[client.plan];
                  const sc = statusConfig[client.siteStatus];
                  const StatusIcon = sc.icon;
                  return (
                    <motion.div
                      key={client.id}
                      layout
                      className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01]"
                      style={{ background: "rgba(255,255,255,0.03)", border: selectedClient?.id === client.id ? `1px solid ${pc.color}40` : "1px solid rgba(255,255,255,0.06)" }}
                      onClick={() => setSelectedClient(selectedClient?.id === client.id ? null : client)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm" style={{ background: `${pc.color}15`, color: pc.color }}>
                          {client.agencyName.charAt(0)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-mono font-bold truncate" style={{ color: "var(--text-primary)" }}>{client.agencyName}</p>
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${pc.color}15`, color: pc.color, border: `1px solid ${pc.color}30` }}>
                              {pc.label}
                            </span>
                          </div>
                          <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{client.email}</p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-mono flex items-center gap-1" style={{ color: sc.color }}>
                            <StatusIcon size={10} /> {sc.label}
                          </span>
                          {client.pendingRequests > 0 && (
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold" style={{ background: "rgba(255,45,120,0.2)", color: "#FF2D78" }}>
                              {client.pendingRequests}
                            </span>
                          )}
                        </div>

                        {/* Revenue */}
                        <div className="text-right flex-shrink-0 hidden md:block">
                          <p className="text-sm font-mono font-bold" style={{ color: "var(--text-primary)" }}>€{client.monthlyRevenue}</p>
                          <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>/mese</p>
                        </div>
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {selectedClient?.id === client.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 grid grid-cols-2 md:grid-cols-4 gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                              {[
                                { label: "AI Conversazioni", value: client.aiConversations.toLocaleString() },
                                { label: "Lead generati", value: client.leadsGenerated.toString() },
                                { label: "URL", value: client.siteUrl },
                                { label: "Scadenza", value: client.subscriptionEnd },
                              ].map((d, i) => (
                                <div key={i}>
                                  <p className="text-[10px] font-mono mb-1" style={{ color: "var(--text-muted)" }}>{d.label}</p>
                                  <p className="text-xs font-mono font-bold" style={{ color: "var(--text-primary)" }}>{d.value}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex gap-2">
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: "rgba(0,112,243,0.1)", color: "#0070F3", border: "1px solid rgba(0,112,243,0.2)" }}>
                                <Eye size={11} /> Vedi dashboard
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: "rgba(0,199,129,0.1)", color: "#00C781", border: "1px solid rgba(0,199,129,0.2)" }}>
                                <Rocket size={11} /> Deploy
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: "rgba(255,45,120,0.1)", color: "#FF2D78", border: "1px solid rgba(255,45,120,0.2)" }}>
                                <Send size={11} /> Invia notifica
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── NOTIFICATIONS TAB ────────────────────────────────── */}
          {activeTab === "notifications" && (
            <motion.div key="notifications" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="font-mono text-3xl font-bold mb-8">Notifiche automatiche</h1>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Sito pronto",
                    desc: "Email al cliente quando il sito viene messo online",
                    trigger: "Cambio stato → live",
                    enabled: true,
                    color: "#00C781",
                    icon: CheckCircle,
                  },
                  {
                    title: "Scadenza abbonamento",
                    desc: "Promemoria 30 e 7 giorni prima della scadenza",
                    trigger: "Automatico · Cron giornaliero",
                    enabled: true,
                    color: "#F59E0B",
                    icon: AlertTriangle,
                  },
                  {
                    title: "Rinnovo confermato",
                    desc: "Conferma email al cliente dopo pagamento rinnovo",
                    trigger: "Webhook Stripe → payment_intent.succeeded",
                    enabled: true,
                    color: "#0070F3",
                    icon: CreditCard,
                  },
                  {
                    title: "Richiesta recensione",
                    desc: "Email automatica 30 giorni dopo deploy per chiedere feedback",
                    trigger: "30gg dopo cambio stato → live",
                    enabled: true,
                    color: "#8B5CF6",
                    icon: MessageSquare,
                  },
                  {
                    title: "Report mensile",
                    desc: "Statistiche AI, lead e visite inviate il 1° di ogni mese",
                    trigger: "Cron · 1° giorno del mese",
                    enabled: false,
                    color: "#0070F3",
                    icon: BarChart3,
                  },
                  {
                    title: "Nuovo lead B2B",
                    desc: "Notifica push quando arriva un nuovo contatto dal form landing",
                    trigger: "POST /api/leads",
                    enabled: true,
                    color: "#FF2D78",
                    icon: TrendingUp,
                  },
                ].map((notif, i) => (
                  <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${notif.color}10`, border: `1px solid ${notif.color}20` }}>
                          <notif.icon size={18} style={{ color: notif.color }} />
                        </div>
                        <div>
                          <p className="font-mono font-bold text-sm" style={{ color: "var(--text-primary)" }}>{notif.title}</p>
                          <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{notif.trigger}</p>
                        </div>
                      </div>
                      {/* Toggle */}
                      <div
                        className="w-10 h-5 rounded-full flex items-center cursor-pointer transition-all"
                        style={{
                          background: notif.enabled ? `${notif.color}30` : "rgba(255,255,255,0.08)",
                          padding: "2px",
                          justifyContent: notif.enabled ? "flex-end" : "flex-start",
                        }}
                      >
                        <div className="w-4 h-4 rounded-full" style={{ background: notif.enabled ? notif.color : "rgba(255,255,255,0.3)" }} />
                      </div>
                    </div>
                    <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{notif.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
