import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { Analytics } from "@/components/analytics/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/site";
import { LanguageProvider, LANG_COOKIE } from "@/lib/language-context";
import type { Language } from "@/lib/translations";

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

const TITLE = "California Legal Document Excellence, LLC | LDA #87 Sonoma County";
const DESCRIPTION =
  "Professional document preparation services in Santa Rosa, CA. Divorce, eviction, immigration, living trust, power of attorney, and more. LDA #87 Sonoma County. Call (707) 909-1240.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | California Legal Document Excellence, LLC",
  },
  description: DESCRIPTION,
  keywords: [
    "legal document assistant",
    "LDA Sonoma County",
    "divorce paperwork Santa Rosa",
    "eviction forms California",
    "document preparation Santa Rosa CA",
    "registered LDA California",
    "living trust preparation",
    "immigration document preparation",
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
      "Professional document preparation services in Santa Rosa, CA. LDA #87 Sonoma County. Free consultation.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "California Legal Document Excellence, LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Professional document preparation services in Santa Rosa, CA. LDA #87 Sonoma County.",
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
  maximumScale: 5,
  themeColor: "#0D1B2A",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LANG_COOKIE)?.value;
  const initialLang: Language = stored === "es" ? "es" : "en";

  return (
    <html
      lang={initialLang}
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--color-body-dark)]">
        <StructuredData />
        <LanguageProvider initialLang={initialLang}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <VercelAnalytics />
        <SpeedInsights />
      </body>
      <Analytics />
    </html>
  );
}
