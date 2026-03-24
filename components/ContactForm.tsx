"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ContactForm() {
  const { tx } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message: message.trim() || undefined,
          source: "landing_page",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Errore");
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Errore di rete");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-10 text-center"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(0,199,129,0.2)",
        }}
      >
        <CheckCircle size={40} className="mx-auto mb-4" style={{ color: "#00C781" }} />
        <p className="font-mono font-bold text-lg text-white mb-2">{tx("contact.formSuccess")}</p>
        <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
          {tx("contact.formSuccessSub")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-4 py-2 rounded-lg font-mono text-xs transition-all hover:scale-105"
          style={{ background: "rgba(0,112,243,0.1)", color: "var(--blue-bright)", border: "1px solid rgba(0,112,243,0.2)" }}
        >
          {tx("contact.formAnother")}
        </button>
      </motion.div>
    );
  }

  const inputStyle = {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-muted)" }}>
            {tx("contact.formName")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={tx("contact.formNamePh")}
            className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white bg-transparent outline-none transition-all focus:ring-1"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-muted)" }}>
            {tx("contact.formEmail")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={tx("contact.formEmailPh")}
            className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white bg-transparent outline-none transition-all focus:ring-1"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-mono uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-muted)" }}>
          {tx("contact.formPhone")}
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={tx("contact.formPhonePh")}
          className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white bg-transparent outline-none transition-all focus:ring-1"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="text-[10px] font-mono uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-muted)" }}>
          {tx("contact.formMessage")}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={tx("contact.formMsgPh")}
          rows={4}
          className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white bg-transparent outline-none transition-all focus:ring-1 resize-none"
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono"
          style={{ background: "rgba(255,45,120,0.08)", border: "1px solid rgba(255,45,120,0.2)", color: "#FF2D78" }}
        >
          <AlertCircle size={12} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !name.trim() || !email.trim()}
        className="group flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-mono font-bold text-sm text-white transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
        style={{
          background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
          boxShadow: "0 0 30px rgba(0,112,243,0.25), 0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {tx("contact.formLoading")}
          </>
        ) : (
          <>
            <Send size={16} />
            {tx("contact.formSubmit")}
          </>
        )}
      </button>
    </form>
  );
}
