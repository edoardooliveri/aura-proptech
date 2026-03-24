import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura PropTech — L'AI che lavora per la tua agenzia",
  description:
    "Smetti di inseguire i lead. L'assistente AI di Aura PropTech cattura, qualifica e converte i clienti 24/7 — mentre tu ti concentri sulle trattative.",
  keywords: ["AI immobiliare", "proptech", "assistente virtuale", "lead generation", "agenzia immobiliare"],
  openGraph: {
    title: "Aura PropTech — L'AI che lavora per la tua agenzia",
    description: "Smetti di inseguire i lead. Lascia che la tua AI li catturi per te.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-black text-white">
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
