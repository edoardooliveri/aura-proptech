"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Zap, Brain, Clock, TrendingUp, Shield, Cpu,
  ArrowRight, Check, Globe, Moon, Timer, PhoneOff, MailWarning, Users,
} from "lucide-react";
import Link from "next/link";
import CoreAIDemo from "@/components/CoreAIDemo";
import { useI18n } from "@/lib/i18n";

// ── Animation Config ────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(8px)" } as const,
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" } as const,
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.7, delay, ease } as const,
});

const problemIcons = [Moon, Timer, PhoneOff, MailWarning];
const problemStats = ["67%", "3.5h", "82%", "2026"];
const featureIcons = [Brain, Clock, TrendingUp, Shield, Cpu, Users];

export default function LandingPage() {
  const { lang, setLang, t, tx } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const navLinks: [string, string][] = [
    ["Sito Demo", "/showcase"],
    ["Blog", "/blog"],
    ["Prezzi", "/pricing"],
    ["Contatti", "/contatti"],
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12 h-20 bg-black border-b border-white/5"
      >
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Aura PropTech" className="h-14" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-white transition-colors duration-300">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "it" ? "en" : "it")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-secondary)",
            }}
          >
            <Globe size={11} />
            {lang === "it" ? "EN" : "IT"}
          </button>

          {/* CTA Button */}
          <a
            href="#demo"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(0,112,243,0.12)",
              border: "1px solid rgba(0,112,243,0.3)",
              color: "var(--blue-bright)",
            }}
          >
            <Zap size={13} />
            Prova Core AI
          </a>
        </div>
      </motion.nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 text-center"
        style={{ paddingTop: "64px" }}
      >
        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono mb-8"
            style={{
              background: "rgba(0,112,243,0.08)",
              border: "1px solid rgba(0,112,243,0.25)",
              color: "var(--blue-bright)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            V0.1 BETA
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter mb-6"
          >
            <span style={{ color: "var(--text-primary)" }}>{tx("hero.title1")}</span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>{tx("hero.title2")}</span>{" "}
            <span className="gradient-hero">{tx("hero.title3")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            {tx("hero.sub")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#demo"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-mono font-bold text-base text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                boxShadow: "0 0 40px rgba(0,112,243,0.3), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Zap size={18} />
              {tx("hero.cta1")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/showcase"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-mono font-semibold text-base transition-all hover:scale-105 glass"
              style={{ color: "var(--text-secondary)" }}
            >
              {tx("hero.cta2")}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROBLEM SECTION ─────────────────────────────────────── */}
      <section id="problema" className="relative py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUpView()}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4">
              {tx("problem.title")}
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("problem.sub")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {t.problem.items.map((item: any, i: number) => {
              const Icon = problemIcons[i];
              return (
                <motion.div
                  key={i}
                  {...fadeUpView(i * 0.1)}
                  className="p-8 rounded-xl glass"
                  style={{ borderBottom: "1px solid rgba(0,112,243,0.2)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ background: "rgba(0,112,243,0.1)" }}
                    >
                      <Icon size={24} style={{ color: "var(--blue-bright)" }} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-2xl font-bold gradient-blue">{problemStats[i]}</span>
                        <h3 className="font-mono font-bold text-lg">{item.label[lang]}</h3>
                      </div>
                      <p style={{ color: "var(--text-secondary)" }}>{item.desc[lang]}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ────────────────────────────────────── */}
      <section id="soluzione" className="relative py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUpView()}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4">
              {tx("solution.title")}
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("solution.sub")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.solution.features.map((item: any, i: number) => {
              const Icon = featureIcons[i];
              return (
                <motion.div
                  key={i}
                  {...fadeUpView(i * 0.08)}
                  className="p-8 rounded-xl glass"
                  style={{ borderBottom: "1px solid rgba(0,112,243,0.2)" }}
                >
                  <div
                    className="p-3 rounded-lg mb-4 w-fit"
                    style={{ background: "rgba(0,112,243,0.1)" }}
                  >
                    <Icon size={24} style={{ color: "var(--blue-bright)" }} />
                  </div>
                  <h3 className="font-mono font-bold text-lg mb-2">{item.title[lang]}</h3>
                  <p style={{ color: "var(--text-secondary)" }}>{item.desc[lang]}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEMO SECTION ────────────────────────────────────────── */}
      <section id="demo" className="relative py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUpView()}
            className="text-center mb-12"
          >
            <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4">
              {tx("demo.title")}
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("demo.sub")}
            </p>
          </motion.div>

          {/* Core AI Demo Component */}
          <motion.div
            {...fadeUpView()}
            className="mb-16"
          >
            <CoreAIDemo />
          </motion.div>

          {/* ROI Stats */}
          <motion.div
            {...fadeUpView()}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { label: tx("demo.roi1"), value: "3x" },
              { label: tx("demo.roi2"), value: "68%" },
              { label: tx("demo.roi3"), value: "2w" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-8 rounded-xl glass text-center"
                style={{ borderBottom: "1px solid rgba(0,112,243,0.2)" }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-blue mb-2">
                  {stat.value}
                </div>
                <p style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...fadeUpView()}
            className="mb-10"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">
              {tx("cta.title")}
            </h2>
            <p className="text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
              {tx("cta.sub")}
            </p>
          </motion.div>

          <motion.div
            {...fadeUpView()}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/showcase"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-mono font-bold text-base text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                boxShadow: "0 0 40px rgba(0,112,243,0.3), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {tx("cta.showcase")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-mono font-bold text-base transition-all duration-300 hover:scale-105 glass"
              style={{ color: "var(--text-secondary)" }}
            >
              {tx("cta.pricing")}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="relative border-t border-gray-800 px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="Aura PropTech" className="h-12" />
              </div>
              <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                {tx("footer.tagline")}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-mono font-bold text-sm mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/showcase" className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#demo" className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-mono font-bold text-sm mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
                    Termini di Servizio
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            <p>{tx("footer.copy")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
