import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/layout/main-nav";
import { AppProviders } from "@/components/providers/app-providers";
import { Suspense } from "react";

// Font optimization with variable fonts and subsetting
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

// SEO & Performance optimized metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://adapt2learn-two.vercel.app"),
  title: {
    default: "Adapt2Learn - AI-Native Adaptive Learning Platform",
    template: "%s | Adapt2Learn"
  },
  description: "Transform static courses into living learning experiences. Visualize knowledge as an organic network with real-time AI tutoring and Bayesian Knowledge Tracing.",
  keywords: ["adaptive learning", "AI tutor", "personalized education", "skill tracking", "Bayesian Knowledge Tracing", "learning platform"],
  authors: [{ name: "Adapt2Learn Team" }],
  creator: "Adapt2Learn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adapt2learn-two.vercel.app",
    title: "Adapt2Learn - AI-Native Adaptive Learning Platform",
    description: "Transform static courses into living learning experiences with real-time AI tutoring.",
    siteName: "Adapt2Learn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1A4D2E" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AppProviders>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[var(--color-forest-deep)] focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-[var(--color-forest-light)]"
          >
            Skip to main content
          </a>

          {/* Main Navigation with Suspense boundary */}
          <Suspense fallback={<div className="h-16 bg-white shadow-sm animate-pulse" aria-label="Loading navigation" />}>
            <MainNav />
          </Suspense>

          {/* Main Content Area */}
          <main id="main-content" className="min-h-screen px-4 py-8 md:px-6 lg:px-8 max-w-[1400px] mx-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-20" role="contentinfo">
            <div className="max-w-[1400px] mx-auto px-4 py-8 md:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  © {new Date().getFullYear()} Adapt2Learn. Powered by AI.
                </p>
                <nav aria-label="Footer navigation" className="flex gap-6">
                  <a
                    href="/analytics"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-forest-deep)] transition-colors"
                  >
                    Analytics
                  </a>
                  <a
                    href="/skill-graph"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-forest-deep)] transition-colors"
                  >
                    Skill Graph
                  </a>
                  <a
                    href="/tutor"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-forest-deep)] transition-colors"
                  >
                    AI Tutor
                  </a>
                </nav>
              </div>
            </div>
          </footer>
        </AppProviders>
      </body>
    </html>
  );
}
