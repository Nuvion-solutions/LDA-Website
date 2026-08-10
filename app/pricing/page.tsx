import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { BadgeDollarSign, Scale, Phone, BadgeCheck } from "lucide-react";
import { BUSINESS, cn } from "@/lib/utils";
import { CTABanner } from "@/components/sections/CTABanner";
import { OfferGuarantees } from "@/components/sections/OfferGuarantees";
import { CallLink } from "@/components/analytics/CallLink";
import { PRICING_CATEGORIES } from "@/lib/pricing";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat-fee pricing for California legal document preparation — divorce, living trusts, probate, eviction & more. A fraction of attorney cost. Free consultation. LDA #87, Sonoma County.",
  alternates: {
    canonical: "/pricing",
    languages: { en: "/pricing", es: "/es/pricing", "x-default": "/pricing" },
  },
  openGraph: {
    title: "Pricing | California Legal Document Excellence",
    description:
      "Flat-fee legal document preparation — a fraction of attorney cost. Free consultation. LDA #87, Sonoma County.",
    url: "/pricing",
    type: "website",
  },
};

export default async function PricingPage() {
  const lang = await getServerLocale();
  const dict = translations[lang];
  const es = lang === "es";

  const values = [
    {
      Icon: BadgeDollarSign,
      title: es ? "Tarifa Fija, Sin Cobro por Hora" : "Flat Fee, No Hourly",
      sub: es ? "Conozca su costo total desde el inicio" : "Know your full cost upfront",
    },
    {
      Icon: Scale,
      title: es ? "Una Fracción del Costo de un Abogado" : "A Fraction of Attorney Fees",
      sub: es ? "Listos para la corte, sin ese precio" : "Court-ready, without the price tag",
    },
    {
      Icon: Phone,
      title: es ? "Consulta Gratis" : "Free Consultation",
      sub: es ? "Presupuesto exacto antes de empezar" : "Exact quote before you begin",
    },
    {
      Icon: BadgeCheck,
      title: es ? "Registrado y Afianzado" : "Registered & Bonded",
      sub: `${BUSINESS.lda} · ${es ? "Condado de Sonoma" : "Sonoma County"}`,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
            {es ? "Precios transparentes de tarifa fija" : "Transparent flat-fee pricing"}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl">
            {es
              ? "Documentos legales a tarifa fija — una fracción del costo de un abogado"
              : "Flat-fee legal documents — a fraction of attorney cost"}
          </h1>
          <p className="mt-6 text-[var(--color-body-light)] text-lg leading-relaxed max-w-2xl">
            {es
              ? "Una tarifa fija por servicio. Sin cobro por hora. Sin sorpresas. Una consulta gratis y un presupuesto exacto antes de empezar."
              : "One flat fee per service. No hourly billing. No surprises. A free consultation and an exact quote before you begin."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/intake"
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              {es ? "Obtenga su presupuesto gratis" : "Get your free quote"}
            </Link>
            <CallLink
              source="pricing_hero"
              className="inline-flex items-center gap-2 border border-[var(--color-gold)]/50 hover:border-[var(--color-gold)] text-[var(--color-body-light)] hover:text-[var(--color-gold)] px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {BUSINESS.phone}
            </CallLink>
          </div>
          <p className="mt-8 text-xs text-[var(--color-muted-light)] max-w-2xl">
            {dict.short_disclaimer}
          </p>
        </div>
      </section>

      {/* Value strip */}
      <section className="bg-[var(--color-offwhite)] border-b border-[var(--color-border-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-7">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {values.map(({ Icon, title, sub }) => (
              <li key={title} className="flex items-start gap-3">
                <Icon
                  className="h-5 w-5 mt-0.5 text-[var(--color-gold)] shrink-0"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-sm font-medium text-[var(--color-navy)] leading-snug">
                    {title}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-body-dark)] opacity-75 leading-snug">
                    {sub}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How pricing works */}
      <section className="bg-white pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border-l-2 border-[var(--color-gold)] bg-[var(--color-offwhite)] px-6 py-5 rounded-sm">
            <p className="font-serif text-lg text-[var(--color-navy)] mb-2">
              {es ? "Cómo funciona nuestra tarifa fija" : "How our flat-fee pricing works"}
            </p>
            <p className="text-sm text-[var(--color-body-dark)] leading-relaxed">
              {es
                ? "Una tarifa fija por servicio, cotizada por adelantado después de su consulta gratis. Los precios a continuación son el máximo para un asunto estándar — su presupuesto exacto depende de la complejidad y nunca sube más de lo cotizado. Los cargos de gobierno, corte, presentación, registro y de terceros (si aplican) son aparte."
                : "One flat fee per service, quoted up front after your free consultation. The prices below are the maximum for a standard matter — your exact quote depends on complexity and never goes higher than what we quote you. Government, court, filing, recording, and any third-party charges are separate."}
            </p>
          </div>
        </div>
      </section>

      {/* Our promise — the guarantees, right before the numbers */}
      <div className="mt-12 md:mt-16">
        <OfferGuarantees lang={lang} />
      </div>

      {/* Pricing categories */}
      {PRICING_CATEGORIES.map((cat, idx) => {
        const CatIcon = cat.icon;
        return (
          <section
            key={cat.id}
            className={cn(
              "py-14 md:py-20",
              idx % 2 === 0 ? "bg-white" : "bg-[var(--color-offwhite)]",
            )}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="shrink-0 hidden sm:flex items-center justify-center w-12 h-12 rounded-sm bg-[var(--color-navy)] border border-[var(--color-gold)]/40">
                  <CatIcon
                    className="h-6 w-6 text-[var(--color-gold)]"
                    aria-hidden
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] leading-tight">
                    {es ? cat.titleEs : cat.title}
                  </h2>
                  <p className="mt-2 text-[var(--color-body-dark)] opacity-80 max-w-2xl leading-relaxed">
                    {es ? cat.blurbEs : cat.blurb}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={cn(
                      "flex flex-col rounded-sm border p-6",
                      pkg.featured
                        ? "border-[var(--color-gold)] bg-[var(--color-gold-tint)]"
                        : "border-[var(--color-border-light)] bg-white",
                    )}
                  >
                    {pkg.featured && (
                      <span className="self-start mb-3 text-[10px] tracking-[0.18em] uppercase font-medium text-[var(--color-navy)] bg-[var(--color-gold)] px-2.5 py-1 rounded-sm">
                        {es ? "Paquete completo" : "Complete package"}
                      </span>
                    )}
                    <h3 className="font-serif text-lg text-[var(--color-navy)] leading-snug">
                      {es ? pkg.nameEs : pkg.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl text-[var(--color-navy)]">
                        {pkg.from ? (es ? "Desde " : "From ") : ""}$
                        {pkg.price.toLocaleString("en-US")}
                      </span>
                      <span className="text-xs text-[var(--color-body-dark)] opacity-60">
                        {es ? "tarifa fija" : "flat fee"}
                      </span>
                    </div>
                    {pkg.vs && (
                      <p className="mt-2 text-xs text-[var(--color-body-dark)] opacity-70">
                        {es ? "Abogados suelen cobrar " : "Attorneys typically charge "}
                        <span className="font-medium">{pkg.vs}</span>
                      </p>
                    )}
                    <p className="mt-3 text-sm text-[var(--color-body-dark)] opacity-90 leading-relaxed">
                      {es ? pkg.descEs : pkg.desc}
                    </p>
                    {pkg.note && (
                      <p className="mt-2 text-xs italic text-[var(--color-body-dark)] opacity-60">
                        {es ? pkg.noteEs : pkg.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {cat.disclosure && (
                <div className="mt-6 border-l-2 border-[var(--color-gold)] bg-white px-5 py-4 rounded-sm shadow-sm">
                  <p className="text-sm text-[var(--color-body-dark)] leading-relaxed">
                    {es ? cat.disclosureEs : cat.disclosure}
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Closing CTA */}
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            {es ? "¿Listo para empezar?" : "Ready to get started?"}
          </h2>
          <p className="mt-4 text-[var(--color-body-light)] text-lg leading-relaxed max-w-2xl mx-auto">
            {es
              ? "Reciba una consulta gratis y un presupuesto exacto y fijo — sin compromiso."
              : "Get a free consultation and an exact, flat-fee quote — no obligation."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/intake"
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              {es ? "Comenzar mi solicitud" : "Start your intake"}
            </Link>
            <CallLink
              source="pricing_footer"
              className="inline-flex items-center gap-2 border border-[var(--color-gold)]/50 hover:border-[var(--color-gold)] text-[var(--color-body-light)] hover:text-[var(--color-gold)] px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {BUSINESS.phone}
            </CallLink>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
