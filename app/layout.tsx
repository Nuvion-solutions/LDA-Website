import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { StructuredData } from "@/components/seo/StructuredData";
import { Analytics } from "@/components/analytics/Analytics";
import { GoogleAds } from "@/components/analytics/GoogleAds";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/site";
import { LanguageProvider } from "@/lib/language-context";
import { localeFromPathname } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Sonoma County Legal Document Assistant | Divorce, Eviction & Trusts";
const DESCRIPTION =
  "Registered Legal Document Assistant (LDA #87) in Sonoma County, serving the greater North Bay. Divorce, eviction, living trusts, wills, probate, power of attorney & more. Call (707) 318-7031.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | California Legal Document Excellence",
  },
  description: DESCRIPTION,
  keywords: [
    "legal document assistant",
    "LDA Sonoma County",
    "Sonoma County legal document assistant",
    "North Bay legal document help",
    "Napa County LDA",
    "Marin County LDA",
    "divorce paperwork Santa Rosa",
    "eviction forms California",
    "document preparation Santa Rosa CA",
    "registered LDA California",
    "living trust preparation",
    "will preparation Sonoma County",
    "probate document preparation",
  ],
  authors: [{ name: "California Legal Document Excellence, LLC" }],
  creator: "California Legal Document Excellence, LLC",
  publisher: "California Legal Document Excellence, LLC",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description:
      "Registered LDA #87 in Sonoma County, serving the greater North Bay. Divorce, eviction, living trusts, wills, probate & more. Free consultation.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "California Legal Document Excellence, LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Registered LDA #87 in Sonoma County, serving the greater North Bay. Divorce, eviction, trusts, wills, probate & more.",
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
  category: "Legal Services",
  verification: {
    // Paste the content value from Google Search Console's HTML tag method
    // into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION once the domain is verified.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1B2A",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Language is derived from the URL (set by middleware via x-pathname): "/es"
  // routes render Spanish, everything else English. This is what makes the
  // Spanish content server-rendered and indexable.
  const hdrs = await headers();
  const initialLang = localeFromPathname(hdrs.get("x-pathname") ?? "/");

  return (
    <html
      lang={initialLang}
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--color-body-dark)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[var(--color-navy)] focus:px-4 focus:py-2 focus:text-white"
        >
          {initialLang === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <StructuredData />
        <LanguageProvider initialLang={initialLang}>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* Spacer so the fixed mobile bar never covers footer content. */}
          <div className="h-14 md:hidden" aria-hidden />
          <MobileCTABar />
        </LanguageProvider>
        <VercelAnalytics />
        <SpeedInsights />
        <MetaPixel />
        <GoogleAds />
      </body>
      <Analytics />
    </html>
  );
}
