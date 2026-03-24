"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Zap, Brain, Clock, TrendingUp, Shield, Cpu,
  ArrowRight, ChevronDown, Check, Star,
  PhoneOff, MailWarning, Moon, Timer, Users, Sparkles,
  Globe, Monitor, MessageCircle, Database, Settings,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import CoreAIDemo from "@/components/CoreAIDemo";
import ContactForm from "@/components/ContactForm";
import { useI18n } from "@/lib/i18n";

// ── Smooth stagger animation config ────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(10px)" } as const,
  animate: { opacity: 1, y: 0, filter: "blur(0px)" } as const,
  transition: { duration: 0.8, delay, ease } as const,
});

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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const navLinks: [string, string][] = [
    [tx("nav.problem"), "#problema"],
    [tx("nav.solution"), "#soluzione"],
    [tx("nav.demo"), "#demo"],
    [tx("nav.pricing"), "#prezzi"],
    [tx("nav.blog"), "/blog"],
    [tx("nav.contact"), "#contatti"],
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* ── NEON GLOW ORBS ─────────────────────────────────────── */}
      <div className="neon-orb-pink" style={{ top: "-200px", left: "-200px" }} />
      <div className="neon-orb-blue" style={{ top: "-100px", right: "-200px" }} />
      <div className="neon-orb-purple" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <div className="neon-orb-pink" style={{ bottom: "-300px", right: "-100px", opacity: 0.5 }} />
      <div className="neon-orb-blue" style={{ bottom: "20%", left: "-300px", opacity: 0.4 }} />

      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12 h-16 glass-strong"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-mono font-bold text-sm tracking-tight">
            AURA<span className="gradient-blue">PROPTECH</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
          {navLinks.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-white transition-colors duration-300">{l}</a>
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

          <a
            href="#demo"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-semibold transition-all duration-300 hover:scale-105 pulse-glow"
            style={{
              background: "rgba(0,112,243,0.12)",
              border: "1px solid rgba(0,112,243,0.3)",
              color: "var(--blue-bright)",
            }}
          >
            <Zap size={13} />
            {tx("nav.demoLive")}
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
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="relative max-w-5xl mx-auto">

          {/* BETA Badge */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono mb-10 pulse-glow"
            style={{
              background: "rgba(0,112,243,0.08)",
              border: "1px solid rgba(0,112,243,0.25)",
              color: "var(--blue-bright)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            V0.1 BETA
            <span style={{ color: "var(--text-muted)" }}>·</span>
            {tx("hero.badge")}
          </motion.div>

          {/* Giant hero title */}
          <motion.h1
            {...fadeUp(0.15)}
            className="font-mono text-4xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-[1] tracking-tighter mb-6 md:mb-8"
          >
            <span style={{ color: "var(--text-primary)" }}>{tx("hero.title1")}</span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>{tx("hero.title2")}</span>
            <br />
            <span className="gradient-hero">{tx("hero.title3")}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14"
            style={{ color: "var(--text-secondary)" }}
          >
            {tx("hero.sub")}
          </motion.p>

          <motion.div
            {...fadeUp(0.45)}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-14 md:mb-20"
          >
            <a
              href="#showcase"
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-mono font-bold text-sm md:text-base text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                boxShadow: "0 0 40px rgba(0,112,243,0.3), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Zap size={18} />
              {tx("hero.cta1")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#problema"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-mono font-semibold text-base transition-all hover:scale-105 glass"
              style={{ color: "var(--text-secondary)" }}
            >
              {tx("hero.cta2")}
              <ChevronDown size={16} />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.6)}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto"
          >
            {[
              { n: "< 2s", l: tx("hero.statResp") },
              { n: "24/7", l: tx("hero.statOp") },
              { n: "48h", l: tx("hero.statSetup") },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-4xl font-mono font-bold gradient-blue">{s.n}</p>
                <p className="text-[11px] mt-1.5 font-mono tracking-wide uppercase" style={{ color: "var(--text-muted)" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── IL PROBLEMA ─────────────────────────────────────────── */}
      <section id="problema" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            {...fadeUpView(0)}
            className="text-center mb-20"
          >
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--pink)" }}>
              {tx("problem.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("problem.title1")}</span>
              <br />
              <span className="gradient-pink-blue">{tx("problem.title2")}</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("problem.sub")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {t.problem.items.map((p, i) => {
              const Icon = problemIcons[i];
              return (
                <motion.div
                  key={i}
                  {...fadeUpView(i * 0.1)}
                  className="rounded-2xl p-7 relative overflow-hidden card-interactive"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,45,120,0.06) 0%, transparent 60%)" }}
                  />
                  <div className="flex items-start gap-5 relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,45,120,0.08)", border: "1px solid rgba(255,45,120,0.15)" }}
                    >
                      <Icon size={20} style={{ color: "var(--pink)" }} />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-3xl font-mono font-bold gradient-pink-blue">{problemStats[i]}</span>
                        <span className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>{p.label[lang]}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc[lang]}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LA SOLUZIONE ────────────────────────────────────────── */}
      <section id="soluzione" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            {...fadeUpView(0)}
            className="text-center mb-20"
          >
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
              {tx("solution.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("solution.title1")}</span>{" "}
              <span className="gradient-blue">Core AI</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("solution.sub")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.solution.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.div
                  key={i}
                  {...fadeUpView(i * 0.08)}
                  className="rounded-2xl p-6 relative overflow-hidden card-interactive-blue"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(0,112,243,0.08)", border: "1px solid rgba(0,112,243,0.15)" }}
                      >
                        <Icon size={18} style={{ color: "var(--blue-bright)" }} />
                      </div>
                      <span
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(0,112,243,0.08)", color: "var(--blue)", border: "1px solid rgba(0,112,243,0.15)" }}
                      >
                        {f.tag[lang]}
                      </span>
                    </div>
                    <h3 className="font-mono font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                      {f.title[lang]}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {f.desc[lang]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEMO ────────────────────────────────────────────────── */}
      <section id="demo" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            {...fadeUpView(0)}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
              {tx("demo.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("demo.title")}</span>{" "}
              <span className="gradient-blue">Core AI</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("demo.sub")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <CoreAIDemo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="flex flex-col gap-6 lg:pt-4"
            >
              <div className="rounded-2xl p-6 glass">
                <p className="text-xs font-mono mb-5 uppercase tracking-widest" style={{ color: "var(--blue)" }}>
                  {tx("demo.roiTag")}
                </p>
                {[
                  { value: "2.5h" },
                  { value: "50h" },
                  { value: "600h", green: true },
                  { value: "- 67%", green: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                    style={{ borderColor: "rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>{t.demo.roiRows[i][lang]}</span>
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color: row.green ? "var(--green)" : "var(--blue-bright)" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                  {tx("demo.inAction")}
                </p>
                {t.demo.actionItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                    <Check size={13} style={{ color: "var(--green)", flexShrink: 0 }} />
                    {item[lang]}
                  </div>
                ))}
              </div>

              <a
                href="#prezzi"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-mono font-bold text-sm text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                  boxShadow: "0 0 30px rgba(0,112,243,0.25), 0 8px 24px rgba(0,0,0,0.4)",
                }}
              >
                {tx("demo.activateCta")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHOWCASE / CASO STUDIO ───────────────────────────────── */}
      <section id="showcase" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            {...fadeUpView(0)}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--pink)" }}>
              {tx("showcase.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("showcase.title1")}</span>{" "}
              <span className="gradient-pink-blue">{tx("showcase.title2")}</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("showcase.sub")}
            </p>
          </motion.div>

          {/* Browser mockup */}
          <motion.div
            {...fadeUpView(0.15)}
            className="rounded-2xl overflow-hidden mb-12"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 80px rgba(0,112,243,0.15), 0 40px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ background: "rgba(20,25,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA42" }} />
              </div>
              <div
                className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-xs font-mono text-center"
                style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}
              >
                armonie-immobiliare.it
              </div>
            </div>

            {/* Site preview — gradient visual with feature highlights */}
            <div
              className="relative"
              style={{
                background: "linear-gradient(180deg, rgba(10,15,35,1) 0%, rgba(15,20,45,1) 50%, rgba(10,15,30,1) 100%)",
                minHeight: "400px",
              }}
            >
              {/* Abstract site representation */}
              <div className="p-8 md:p-12">
                {/* Navbar mockup */}
                <div className="flex items-center justify-between mb-10 opacity-60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #C9A96E, #8B7355)" }} />
                    <div className="h-3 w-32 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                  </div>
                  <div className="hidden md:flex gap-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-2.5 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                    ))}
                  </div>
                </div>

                {/* Hero mockup */}
                <div className="text-center mb-10">
                  <div className="h-4 w-48 mx-auto mb-4 rounded-full" style={{ background: "rgba(201,169,110,0.3)" }} />
                  <div className="h-8 md:h-10 w-3/4 max-w-lg mx-auto mb-3 rounded-lg" style={{ background: "rgba(255,255,255,0.12)" }} />
                  <div className="h-8 md:h-10 w-1/2 max-w-xs mx-auto mb-6 rounded-lg" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className="h-10 w-40 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.4), rgba(139,115,85,0.4))" }}
                    >
                      <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>
                        🔍 {lang === "it" ? "Cerca immobili..." : "Search properties..."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Property cards mockup */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[1,2,3].map(i => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-24 md:h-32"
                        style={{
                          background: `linear-gradient(135deg, rgba(${60+i*30},${80+i*20},${120+i*15},0.3), rgba(${40+i*20},${60+i*15},${100+i*10},0.2))`,
                        }}
                      />
                      <div className="p-3">
                        <div className="h-2.5 w-3/4 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.12)" }} />
                        <div className="h-2 w-1/2 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.06)" }} />
                        <div className="h-3 w-20 rounded-full" style={{ background: "rgba(201,169,110,0.3)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Chat bubble overlay */}
              <div
                className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
              >
                <div
                  className="rounded-2xl p-4 max-w-xs"
                  style={{
                    background: "rgba(10,15,30,0.95)",
                    border: "1px solid rgba(0,112,243,0.3)",
                    boxShadow: "0 0 30px rgba(0,112,243,0.2), 0 8px 32px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} style={{ color: "var(--blue-bright)" }} />
                    <span className="text-[10px] font-mono font-bold" style={{ color: "var(--blue-bright)" }}>
                      AI Concierge
                    </span>
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {lang === "it"
                      ? "Ciao! Sono Barbara 😊 Stai cercando casa a Savona? Dimmi zona e budget, ti trovo le migliori!"
                      : "Hi! I'm Barbara 😊 Looking for a home in Savona? Tell me the area and budget, I'll find the best ones!"}
                  </p>
                </div>
                {/* Chat trigger button */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mt-2 ml-auto"
                  style={{
                    background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                    boxShadow: "0 0 20px rgba(0,112,243,0.4)",
                  }}
                >
                  <MessageCircle size={18} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Client badge */}
          <motion.div {...fadeUpView(0.2)} className="text-center mb-10">
            <p className="font-mono font-bold text-lg" style={{ color: "var(--text-primary)" }}>
              {tx("showcase.clientName")}
            </p>
            <p className="text-xs font-mono mt-1" style={{ color: "var(--text-muted)" }}>
              {tx("showcase.clientLocation")}
            </p>
          </motion.div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {(t.showcase?.features ?? []).map((f, i) => {
              const icons = [Monitor, MessageCircle, Settings, Database];
              const Icon = icons[i] ?? Monitor;
              return (
                <motion.div
                  key={i}
                  {...fadeUpView(0.1 + i * 0.08)}
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: i % 2 === 0 ? "rgba(0,112,243,0.08)" : "rgba(255,45,120,0.08)",
                        border: i % 2 === 0 ? "1px solid rgba(0,112,243,0.15)" : "1px solid rgba(255,45,120,0.15)",
                      }}
                    >
                      <Icon size={18} style={{ color: i % 2 === 0 ? "var(--blue-bright)" : "var(--pink)" }} />
                    </div>
                    <div>
                      <h3 className="font-mono font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>
                        {f.title[lang]}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {f.desc[lang]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            {...fadeUpView(0)}
            className="rounded-2xl p-10 relative overflow-hidden glass"
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--blue), transparent)" }}
            />
            <div className="flex justify-center gap-1 mb-6">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={16} className="fill-current" style={{ color: "#F59E0B" }} />
              ))}
            </div>
            <p className="text-lg leading-relaxed mb-6 italic" style={{ color: "var(--text-secondary)" }}>
              &quot;{tx("social.quote")}&quot;
            </p>
            <p className="font-mono font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              Armonie Immobiliare
            </p>
            <p className="text-xs font-mono mt-1" style={{ color: "var(--text-muted)" }}>
              {tx("social.pilot")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUpView(0)} className="text-center mb-14">
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
              {tx("testimonials.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("testimonials.title1")} </span>
              <span className="gradient-blue">{tx("testimonials.title2")}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: lang === "it"
                  ? "Da quando abbiamo il sito con AI, i lead qualificati sono triplicati. L'assistente risponde ai clienti anche alle 3 di notte."
                  : "Since we got the AI-powered site, qualified leads tripled. The assistant responds to clients even at 3 AM.",
                name: "Marco Ferretti",
                agency: "Ferretti Immobiliare, Milano",
                plan: "Professional",
                color: "#0070F3",
              },
              {
                quote: lang === "it"
                  ? "Il ROI è stato incredibile. In 3 mesi abbiamo recuperato l'investimento e ora l'AI gestisce il 70% delle prime interazioni."
                  : "The ROI was incredible. In 3 months we recouped the investment and now AI handles 70% of first interactions.",
                name: "Giulia Marchetti",
                agency: "Casa & Sole, Rimini",
                plan: "Enterprise",
                color: "#FF2D78",
              },
              {
                quote: lang === "it"
                  ? "Anche senza AI, il sito che ci hanno fatto è anni luce avanti rispetto a quello che avevamo. Professionale e veloce."
                  : "Even without AI, the site they built is light years ahead of what we had. Professional and fast.",
                name: "Antonio Russo",
                agency: "Russo Real Estate, Napoli",
                plan: "Starter",
                color: "#64748b",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                {...fadeUpView(0.1 + i * 0.1)}
                className="rounded-2xl p-6 flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} fill="#FBBF24" color="#FBBF24" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm font-bold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                    <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{t.agency}</p>
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}40` }}
                  >
                    {t.plan}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUpView(0)} className="text-center mb-14">
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--pink)" }}>
              {tx("beforeAfter.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("beforeAfter.title1")} </span>
              <span className="gradient-pink-blue">{tx("beforeAfter.title2")}</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("beforeAfter.sub")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* BEFORE */}
            <motion.div {...fadeUpView(0.1)} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,45,120,0.2)" }}>
              <div className="px-4 py-2 text-center" style={{ background: "rgba(255,45,120,0.08)" }}>
                <span className="text-[10px] font-mono font-bold tracking-widest" style={{ color: "var(--pink)" }}>{tx("beforeAfter.before")}</span>
              </div>
              <div className="p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                {/* Old-style site mockup */}
                <div className="rounded-lg overflow-hidden" style={{ background: "#f5f5f5", border: "1px solid #ddd" }}>
                  <div className="px-4 py-2 flex items-center gap-2" style={{ background: "#e0e0e0" }}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#ccc" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: "#ccc" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: "#ccc" }} />
                    </div>
                    <div className="flex-1 h-4 rounded bg-white mx-2" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-gray-300" />
                      <div className="h-3 w-24 rounded bg-gray-300" />
                      <div className="ml-auto flex gap-3">
                        <div className="h-2 w-10 rounded bg-gray-200" />
                        <div className="h-2 w-10 rounded bg-gray-200" />
                        <div className="h-2 w-10 rounded bg-gray-200" />
                      </div>
                    </div>
                    <div className="h-20 rounded mb-3" style={{ background: "linear-gradient(135deg, #d0d0d0, #e8e8e8)" }} />
                    <div className="h-3 w-3/4 rounded bg-gray-300 mb-2" />
                    <div className="h-3 w-1/2 rounded bg-gray-200 mb-4" />
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="rounded" style={{ background: "#e8e8e8" }}>
                          <div className="h-10 bg-gray-200" />
                          <div className="p-1.5">
                            <div className="h-1.5 w-full rounded bg-gray-300 mb-1" />
                            <div className="h-1.5 w-2/3 rounded bg-gray-200" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-4">
                  {[
                    lang === "it" ? "Template generico, non personalizzato" : "Generic, non-personalized template",
                    lang === "it" ? "Nessuna AI, solo form di contatto" : "No AI, just contact form",
                    lang === "it" ? "Design datato, non responsive" : "Dated design, not responsive",
                    lang === "it" ? "Nessuna qualificazione lead" : "No lead qualification",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono" style={{ color: "var(--pink)" }}>
                      <span>✗</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AFTER */}
            <motion.div {...fadeUpView(0.2)} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,199,129,0.2)" }}>
              <div className="px-4 py-2 text-center" style={{ background: "rgba(0,199,129,0.08)" }}>
                <span className="text-[10px] font-mono font-bold tracking-widest" style={{ color: "var(--green)" }}>{tx("beforeAfter.after")}</span>
              </div>
              <div className="p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                {/* Modern Aura site mockup */}
                <div className="rounded-lg overflow-hidden" style={{ background: "#0A0F1E", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="px-4 py-2 flex items-center gap-2" style={{ background: "rgba(20,25,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#FF5F57" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: "#FFBD2E" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: "#28CA42" }} />
                    </div>
                    <div className="flex-1 h-4 rounded mx-2" style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded" style={{ background: "linear-gradient(135deg, #C9A96E, #8B7355)" }} />
                      <div className="h-3 w-24 rounded" style={{ background: "rgba(255,255,255,0.15)" }} />
                      <div className="ml-auto flex gap-3">
                        <div className="h-2 w-10 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
                        <div className="h-2 w-10 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <div className="inline-flex px-2 py-0.5 rounded-full mb-2" style={{ background: "rgba(201,169,110,0.15)" }}>
                        <span className="text-[7px]" style={{ color: "#C9A96E" }}>✦ AI</span>
                      </div>
                      <div className="h-4 w-3/4 mx-auto rounded mb-1.5" style={{ background: "rgba(255,255,255,0.12)" }} />
                      <div className="h-3 w-1/2 mx-auto rounded mb-3" style={{ background: "rgba(201,169,110,0.3)" }} />
                      <div className="h-7 w-32 mx-auto rounded-lg" style={{ background: "rgba(201,169,110,0.2)", border: "1px solid rgba(201,169,110,0.3)" }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div className="h-10" style={{ background: `linear-gradient(135deg, rgba(201,169,110,${0.1+i*0.05}), rgba(100,80,50,0.1))` }} />
                          <div className="p-1.5">
                            <div className="h-1.5 w-full rounded mb-1" style={{ background: "rgba(255,255,255,0.1)" }} />
                            <div className="h-1.5 w-12 rounded" style={{ background: "rgba(201,169,110,0.3)" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* AI bubble */}
                    <div className="flex justify-end mt-2">
                      <div className="rounded-lg p-2 max-w-[120px]" style={{ background: "rgba(10,15,30,0.95)", border: "1px solid rgba(0,112,243,0.2)" }}>
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles size={6} style={{ color: "#0070F3" }} />
                          <span className="text-[6px] font-bold" style={{ color: "#0070F3" }}>AI</span>
                          <span className="ml-auto w-1 h-1 rounded-full bg-green-400" />
                        </div>
                        <div className="h-1 w-full rounded mb-0.5" style={{ background: "rgba(255,255,255,0.08)" }} />
                        <div className="h-1 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-4">
                  {[
                    lang === "it" ? "Design moderno, brand personalizzato" : "Modern design, custom brand",
                    lang === "it" ? "AI Concierge che risponde 24/7" : "AI Concierge answering 24/7",
                    lang === "it" ? "Responsive, SEO ottimizzato, veloce" : "Responsive, SEO optimized, fast",
                    lang === "it" ? "Lead qualificati automaticamente" : "Automatically qualified leads",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono" style={{ color: "var(--green)" }}>
                      <Check size={11} /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preview CTA */}
          <motion.div {...fadeUpView(0.3)} className="text-center mt-10">
            <Link
              href="/preview"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-mono font-bold text-sm text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FF2D78, #7B2FFF)",
                boxShadow: "0 0 30px rgba(255,45,120,0.2), 0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              <Sparkles size={16} />
              {tx("beforeAfter.tryCta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING CTA ───────────────────────────────────────────── */}
      <section id="prezzi" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            {...fadeUpView(0)}
            className="text-center mb-14"
          >
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
              {tx("pricing.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("pricing.title1")}</span>{" "}
              <span className="gradient-blue">{tx("pricing.title2")}</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("pricing.sub")}
            </p>
          </motion.div>

          <motion.div {...fadeUpView(0.15)}>
            <div
              className="rounded-2xl p-px border-shimmer overflow-hidden"
              style={{
                boxShadow: "0 0 60px rgba(0,112,243,0.2), 0 0 120px rgba(255,45,120,0.1), 0 40px 80px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="rounded-2xl p-10 flex flex-col items-center text-center"
                style={{ background: "rgba(10,15,30,0.95)", backdropFilter: "blur(20px)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} style={{ color: "var(--blue-bright)" }} />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--blue-bright)" }}>
                    Aura Elite
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold" style={{ color: "var(--text-primary)" }}>€149</span>
                  <span className="text-sm font-mono ml-1" style={{ color: "var(--text-muted)" }}>{tx("pricing.perMonth")}</span>
                </div>
                <p className="text-sm font-mono mb-8" style={{ color: "var(--text-muted)" }}>
                  {tx("pricing.setup")}
                </p>

                <div className="flex flex-col gap-3 mb-10 w-full max-w-sm">
                  {t.pricing.highlights.map((item, j) => (
                    <div key={j} className="flex items-center gap-2.5 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                      <Check size={13} style={{ color: "var(--blue-bright)", flexShrink: 0 }} />
                      {item[lang]}
                    </div>
                  ))}
                </div>

                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-mono font-bold text-sm text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                    boxShadow: "0 0 30px rgba(0,112,243,0.3), 0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  {tx("pricing.detailsCta")}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINALE ──────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <motion.div
          {...fadeUpView(0)}
          className="max-w-3xl mx-auto relative z-10"
        >
          <p className="text-xs font-mono font-semibold mb-6 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
            {tx("cta.tag")}
          </p>
          <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span style={{ color: "var(--text-primary)" }}>{tx("cta.title1")}</span>
            <br />
            <span className="gradient-hero">{tx("cta.title2")}</span>
          </h2>
          <p className="text-lg mb-14" style={{ color: "var(--text-secondary)" }}>
            {tx("cta.sub")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#showcase"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-mono font-bold text-base text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0070F3, #7B2FFF)",
                boxShadow: "0 0 40px rgba(0,112,243,0.3), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Zap size={18} />
              {tx("cta.btn1")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#prezzi"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-mono font-semibold text-base transition-all hover:scale-105 glass"
              style={{ color: "var(--blue-bright)" }}
            >
              {tx("cta.btn2")}
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── CONTATTACI ──────────────────────────────────────────── */}
      <section id="contatti" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            {...fadeUpView(0)}
            className="text-center mb-14"
          >
            <p className="text-xs font-mono font-semibold mb-5 tracking-[0.3em] uppercase" style={{ color: "var(--blue)" }}>
              {tx("contact.tag")}
            </p>
            <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "var(--text-primary)" }}>{tx("contact.title1")}</span>{" "}
              <span className="gradient-blue">{tx("contact.title2")}</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {tx("contact.sub")}
            </p>
          </motion.div>

          <motion.div
            {...fadeUpView(0.15)}
            className="grid lg:grid-cols-5 gap-10"
          >
            <div
              className="lg:col-span-3 rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <ContactForm />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              {[
                {
                  label: tx("contact.emailLabel"),
                  value: "edoardo.oliveri07@gmail.com",
                  href: "mailto:edoardo.oliveri07@gmail.com",
                },
                {
                  label: tx("contact.responseLabel"),
                  value: tx("contact.responseValue"),
                },
                {
                  label: tx("contact.setupLabel"),
                  value: tx("contact.setupValue"),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="font-mono text-sm font-semibold hover:underline" style={{ color: "var(--blue-bright)" }}>
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {item.value}
                    </p>
                  )}
                </div>
              ))}

              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(0,112,243,0.05)",
                  border: "1px solid rgba(0,112,243,0.15)",
                }}
              >
                <p className="font-mono text-xs font-bold mb-1" style={{ color: "var(--blue-bright)" }}>
                  {tx("contact.tryNow")}
                </p>
                <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  {tx("contact.tryNowSub")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="py-10 px-4 md:px-6 text-center relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0070F3, #7B2FFF)" }}
          >
            <Zap size={11} className="text-white" />
          </div>
          <span className="font-mono font-bold text-sm">
            AURA<span className="gradient-blue">PROPTECH</span>
          </span>
        </div>
        <p className="text-xs font-mono mb-3" style={{ color: "var(--text-muted)" }}>
          {tx("footer.copy")}
        </p>
        <div className="flex items-center justify-center gap-4">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Termini di Servizio", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
          ].map((link, i) => (
            <Link key={i} href={link.href} className="text-[10px] font-mono hover:underline" style={{ color: "var(--text-muted)" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
