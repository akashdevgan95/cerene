import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// components
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalProvider } from "@/components/providers/global-provider";

export const metadata: Metadata = {
  title: "CereneAI – Personalized AI Therapy, 24/7",
  description:
    "Join CereneAI, the future of mental health support. Our AI-powered therapy platform offers 24/7 emotional guidance, privacy-first design, and personalized care anytime you need it.",
  keywords: [
    "AI therapy",
    "mental health",
    "online therapy",
    "AI mental health app",
    "therapy chatbot",
    "emotional support",
    "personalized AI assistant",
  ],
  openGraph: {
    title: "CereneAI – Personalized AI Therapy, 24/7",
    description:
      "CereneAI is your always-available AI therapy companion, providing real-time emotional support with cutting-edge privacy-first technology.",
    url: "https://cerene.ai",
    siteName: "CereneAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CereneAI – AI-powered therapy reimagined",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CereneAI – Personalized AI Therapy, 24/7",
    description:
      "Always-on, AI-powered mental health support. CereneAI delivers private, personalized therapy whenever you need it.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          defer
          data-domain="cerene.ai"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <GlobalProvider>{children}</GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
