"use client";

import { useState, useCallback } from "react";
import {
  Users,
  Zap,
  TrendingUp,
  UserX,
  Mail,
  Target,
  Lock,
  ArrowRight,
  RefreshCw,
  LogOut,
} from "lucide-react";

interface Stats {
  totalCustomers: number;
  activeCustomers: number;
  cancelledCustomers: number;
  totalLeads: number;
  convertedLeads: number;
  mrr: number;
}

interface Customer {
  id: string;
  created_at: string;
  agency_name: string;
  owner_name: string | null;
  email: string;
  status: string;
  plan: string;
  amount_monthly: number;
  setup_paid: boolean;
}

interface Lead {
  id: string;
  created_at: string;
  owner_name: string;
  email: string;
  agency_name: string | null;
  status: string;
  plan_interest: string;
  source: string;
}

interface DashboardData {
  stats: Stats;
  customers: Customer[];
  leads: Lead[];
}

function fmt(n: number): string {
  return new Intl.NumberFormat("it-IT").format(n);
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m fa`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h fa`;
  const days = Math.floor(hours / 24);
  return `${days}g fa`;
}

function statusColor(status: string): string {
  switch (status) {
    case "active": return "#00C781";
    case "cancelled": return "#FF2D78";
    case "past_due": return "#FFB224";
    case "converted": return "#00C781";
    case "new": return "#0070F3";
    case "qualified": return "#7B2FFF";
    case "contacted": return "#2383FF";
    default: return "#666";
  }
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: typeof Users;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-2"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}22`,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "#888" }}>
          {label}
        </span>
      </div>
      <p className="text-2xl font-mono font-bold text-white">{value}</p>
      {sub && (
        <p className="text-[11px] font-mono" style={{ color: "#666" }}>{sub}</p>
      )}
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            <Lock size={18} className="text-white" />
          </div>
          <div>
            <p className="font-mono font-bold text-white text-sm">AURA ADMIN</p>
            <p className="font-mono text-[10px]" style={{ color: "#666" }}>Dashboard riservata</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!pw.trim() || loading) return;
            setLoading(true);
            onLogin(pw);
          }}
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white bg-transparent outline-none mb-4"
            style={{
              border: "1px solid rgba(0,112,243,0.3)",
              background: "rgba(0,112,243,0.05)",
            }}
          />
          <button
            type="submit"
            disabled={!pw.trim() || loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono font-bold text-sm text-white transition-all hover:scale-[1.02] disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            {loading ? "Accesso..." : "Accedi"}
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Errore");
      setData(json);
      setAuthed(true);
      setPassword(pw);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore di rete");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, []);

  if (!authed) {
    return (
      <div>
        <LoginScreen onLogin={fetchData} />
        {error && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg font-mono text-xs"
            style={{ background: "rgba(255,45,120,0.15)", color: "#FF2D78", border: "1px solid rgba(255,45,120,0.3)" }}>
            {error}
          </div>
        )}
      </div>
    );
  }

  if (!data) return null;

  const { stats, customers, leads } = data;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-mono font-bold text-sm">
            AURA <span style={{ color: "#0070F3" }}>ADMIN</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchData(password)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all hover:bg-white/5"
            style={{ color: "#888" }}
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Aggiorna
          </button>
          <button
            onClick={() => { setAuthed(false); setData(null); setPassword(""); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all hover:bg-white/5"
            style={{ color: "#888" }}
          >
            <LogOut size={12} />
            Esci
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <StatCard icon={Users} label="Clienti" value={fmt(stats.totalCustomers)} color="#0070F3" />
          <StatCard icon={Zap} label="Attivi" value={fmt(stats.activeCustomers)} color="#00C781" />
          <StatCard icon={UserX} label="Cancellati" value={fmt(stats.cancelledCustomers)} color="#FF2D78" />
          <StatCard icon={Target} label="Lead" value={fmt(stats.totalLeads)} color="#7B2FFF" />
          <StatCard icon={TrendingUp} label="Convertiti" value={fmt(stats.convertedLeads)} color="#00C781" />
          <StatCard
            icon={TrendingUp}
            label="MRR"
            value={`€${fmt(stats.mrr)}`}
            sub={`€${fmt(stats.mrr * 12)}/anno`}
            color="#0070F3"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Customers Table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-mono font-bold text-sm text-white">Clienti</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,112,243,0.1)", color: "#0070F3" }}>
                ULTIMI 10
              </span>
            </div>
            {customers.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-xs" style={{ color: "#666" }}>Nessun cliente ancora</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                {customers.map((c) => (
                  <div key={c.id} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-white truncate">{c.agency_name}</p>
                      <p className="font-mono text-[11px] truncate" style={{ color: "#666" }}>
                        {c.email}
                      </p>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase"
                      style={{ color: statusColor(c.status), background: `${statusColor(c.status)}15` }}
                    >
                      {c.status}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "#555" }}>
                      {timeAgo(c.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leads Table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-mono font-bold text-sm text-white">Lead B2B</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(123,47,255,0.1)", color: "#7B2FFF" }}>
                ULTIMI 10
              </span>
            </div>
            {leads.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-xs" style={{ color: "#666" }}>Nessun lead ancora</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                {leads.map((l) => (
                  <div key={l.id} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-white truncate">
                        {l.agency_name || l.owner_name}
                      </p>
                      <div className="flex items-center gap-2">
                        <Mail size={10} style={{ color: "#555" }} />
                        <p className="font-mono text-[11px] truncate" style={{ color: "#666" }}>
                          {l.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase"
                      style={{ color: statusColor(l.status), background: `${statusColor(l.status)}15` }}
                    >
                      {l.status}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "#555" }}>
                      {l.source}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "#555" }}>
                      {timeAgo(l.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
