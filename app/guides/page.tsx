import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { ArrowRight, BookOpen } from "lucide-react";
import { GUIDES, localizedGuide } from "@/lib/guides";
import { CTABanner } from "@/components/sections/CTABanner";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "Guides — California Legal Document Help",
  description:
    "Plain-English guides to common California legal processes — uncontested divorce, the eviction process, living trust vs. will, and more. From a Registered LDA #87.",
  alternates: {
    canonical: "/guides",
    languages: { en: "/guides", es: "/es/guides", "x-default": "/guides" },
  },
  openGraph: {
    title: "Guides | California Legal Document Excellence",
    description:
      "Plain-English guides to common California legal processes. From a Registered LDA #87.",
    url: "/guides",
    type: "website",
  },
};

export default async function GuidesPage() {
  const lang = await getServerLocale();
  const es = lang === "es";

  return (
    <>
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
            {es ? "Guías" : "Guides"}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl">
            {es
              ? "Guías Claras de Procesos Legales en California"
              : "Plain-English Guides to California Legal Processes"}
          </h1>
          <p className="mt-6 text-[var(--color-body-light)] text-base md:text-lg max-w-2xl leading-relaxed">
            {es
              ? "Explicaciones claras de procesos comunes en California — qué esperar, qué formularios intervienen y dónde encaja la preparación de documentos. Información general, no asesoría legal."
              : "Clear explanations of common California processes — what to expect, which forms are involved, and where document preparation fits in. General information, not legal advice."}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group border border-[var(--color-border-light)] rounded-sm p-7 md:p-8 hover:border-[var(--color-gold)] transition-colors flex flex-col"
              >
                <BookOpen
                  className="h-6 w-6 text-[var(--color-gold)] mb-4"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <h2 className="font-serif text-xl md:text-2xl text-[var(--color-navy)] leading-snug group-hover:text-[var(--color-gold)] transition-colors mb-3">
                  {localizedGuide(guide, "title", lang)}
                </h2>
                <p className="text-sm text-[var(--color-body-dark)] opacity-85 leading-relaxed mb-5">
                  {localizedGuide(guide, "summary", lang)}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
                  {es ? "Leer la guía" : "Read the guide"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
