import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { ArrowRight, MapPin } from "lucide-react";
import { COUNTIES, localizedCounty } from "@/lib/counties";
import { CTABanner } from "@/components/sections/CTABanner";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "Service Areas — North Bay Counties",
  description:
    "Registered LDA #87 preparing court & legal documents across the North Bay — Sonoma, Marin, Napa & Solano counties. Divorce, eviction, living trusts, probate & more.",
  alternates: {
    canonical: "/service-areas",
    languages: {
      en: "/service-areas",
      es: "/es/service-areas",
      "x-default": "/service-areas",
    },
  },
  openGraph: {
    title: "Service Areas | California Legal Document Excellence",
    description:
      "Court & legal document preparation across Sonoma, Marin, Napa & Solano counties. Registered LDA #87.",
    url: "/service-areas",
    type: "website",
  },
};

export default async function ServiceAreasPage() {
  const lang = await getServerLocale();
  const dict = translations[lang];
  const es = lang === "es";

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
            {es ? "Áreas de Servicio" : "Service Areas"}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl">
            {es
              ? "Sirviendo el North Bay de California"
              : "Serving California's North Bay"}
          </h1>
          <p className="mt-6 text-[var(--color-body-light)] text-base md:text-lg max-w-2xl leading-relaxed">
            {es
              ? "Como Asistente Legal Registrado (LDA #87) con base en el Condado de Sonoma, preparamos documentos judiciales y legales para familias y propietarios en todo el North Bay — y ofrecemos servicio remoto en toda California."
              : "As a Registered Legal Document Assistant (LDA #87) based in Sonoma County, we prepare court and legal documents for families and property owners across the North Bay — and offer remote service throughout California."}
          </p>
          <p className="mt-6 text-xs text-[var(--color-muted-light)] max-w-2xl">
            {dict.short_disclaimer}
          </p>
        </div>
      </section>

      {/* County cards */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {COUNTIES.map((county) => {
              const countyName = localizedCounty(county, "name", lang);
              return (
                <Link
                  key={county.slug}
                  href={`/service-areas/${county.slug}`}
                  className="group border border-[var(--color-border-light)] rounded-sm p-7 md:p-8 hover:border-[var(--color-gold)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin
                      className="h-6 w-6 text-[var(--color-gold)] shrink-0"
                      aria-hidden
                      strokeWidth={1.5}
                    />
                    <h2 className="font-serif text-2xl text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
                      {es
                        ? `Condado de ${countyName}`
                        : `${countyName} County`}
                    </h2>
                  </div>
                  <p className="text-sm text-[var(--color-body-dark)] opacity-85 leading-relaxed mb-4">
                    {localizedCounty(county, "intro", lang)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
                    {es
                      ? `Ver Condado de ${countyName}`
                      : `View ${countyName} County`}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
