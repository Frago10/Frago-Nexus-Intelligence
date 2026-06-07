import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragosnexus.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Frago's Nexus Intelligence — Build smarter. Scale faster.",
    template: "%s · Frago's Nexus Intelligence",
  },
  description:
    "Infraestructura de IA de élite para empresas que operan en la frontera. Conectamos inteligencia con acción para generar resultados reales.",
  applicationName: "Frago's Nexus Intelligence",
  generator: "Next.js",
  keywords: [
    "AI consulting",
    "Artificial Intelligence",
    "Automation",
    "SaaS",
    "Machine Learning",
    "Enterprise AI",
    "Nexus Intelligence",
    "LLM",
    "RAG",
    "Agents",
  ],
  authors: [{ name: "Frago's Nexus Intelligence" }],
  creator: "Frago's Nexus Intelligence",
  publisher: "Frago's Nexus Intelligence",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { es: "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Frago's Nexus Intelligence",
    title: "Frago's Nexus Intelligence — Build smarter. Scale faster.",
    description:
      "Infraestructura de IA de élite para empresas que operan en la frontera.",
    url: SITE_URL,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frago's Nexus Intelligence — Build smarter. Scale faster.",
    description:
      "Infraestructura de IA de élite para empresas que operan en la frontera.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#050505" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-inter: 'Inter', system-ui, -apple-system, sans-serif;
                --font-space-grotesk: 'Space Grotesk', 'Inter', system-ui, sans-serif;
                --font-jetbrains: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace;
              }
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-nexus-void text-nexus-chrome">
        {children}
      </body>
    </html>
  );
}
