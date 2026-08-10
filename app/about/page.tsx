import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { CTABanner } from "@/components/sections/CTABanner";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the registered Legal Document Assistants behind California Legal Document Excellence — serving Sonoma County & the greater North Bay. LDA #87.",
  alternates: {
    canonical: "/about",
    languages: { en: "/about", es: "/es/about", "x-default": "/about" },
  },
  openGraph: {
    title: "About Us | California Legal Document Excellence",
    description:
      "Meet the registered Legal Document Assistants serving Sonoma County & the greater North Bay. LDA #87.",
    url: "/about",
    type: "website",
  },
};

// Equal co-founders. We present them by initial (privacy preference — no full
// names, no photos). Trust is carried by the verifiable LDA registration and
// bond, and by distinct, human bios — not by faces. A. Khan holds LDA #87.
const TEAM = [
  {
    initials: "A",
    name: "A. Khan",
    role: "Co-Founder & Principal",
    roleEs: "Cofundador y Principal",
    credential: "Registered LDA #87",
    credentialEs: "Asistente Legal Registrado · LDA #87",
    bio: "Our Registered Legal Document Assistant (LDA #87) — personally bound by California's registration and bonding requirements, and personally accountable for every document we prepare. The standard is simple: each form leaves complete, correctly formatted, and ready for the court or agency the first time.",
    bioEs:
      "Nuestro Asistente Legal de Documentos Registrado (LDA #87) — personalmente sujeto a los requisitos de registro y fianza de California, y personalmente responsable de cada documento que preparamos. El estándar es simple: cada formulario sale completo, con el formato correcto y listo para el tribunal o la agencia a la primera.",
  },
  {
    initials: "C",
    name: "C. Newton",
    role: "Co-Founder & Principal",
    roleEs: "Cofundador y Principal",
    credential: "",
    credentialEs: "",
    bio: "Focused on making the process feel human — plain English, no jargon, and answers to the questions people are often too intimidated to ask. You'll always know exactly where your documents stand.",
    bioEs:
      "Enfocado en hacer que el proceso se sienta humano — lenguaje claro, sin tecnicismos y respuestas a las preguntas que muchos tienen miedo de hacer. Siempre sabrá exactamente en qué punto están sus documentos.",
  },
  {
    initials: "S",
    name: "S. Khan",
    role: "Co-Founder & Principal",
    roleEs: "Cofundadora y Principal",
    credential: "",
    credentialEs: "",
    bio: "Our details person — watching deadlines, county-specific requirements, and the small formatting rules that keep a filing from getting bounced. Built the step-by-step way we work so nothing slips through.",
    bioEs:
      "Nuestra persona de los detalles — atenta a los plazos, los requisitos específicos de cada condado y las pequeñas reglas de formato que evitan que una presentación sea rechazada. Creó el método paso a paso con el que trabajamos para que nada se escape.",
  },
];

export default async function AboutPage() {
  const lang = await getServerLocale();
  const dict = translations[lang];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
            {dict.about_eyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl">
            {dict.about_h1_lead} {BUSINESS.name}
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-navy)] text-xs tracking-[0.22em] uppercase mb-4 opacity-70">
            {dict.about_mission_eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-navy)] leading-tight mb-6">
            {dict.about_mission_heading}
          </h2>
          <p className="text-[var(--color-body-dark)] text-lg leading-relaxed">
            {dict.about_mission_body}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[var(--color-offwhite)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-navy)] text-xs tracking-[0.22em] uppercase mb-4 opacity-70">
            {dict.about_team_eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)] leading-tight mb-6">
            {dict.about_team_heading}
          </h2>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mb-12">
            <ShieldCheck
              className="h-4 w-4 text-[var(--color-gold)] shrink-0"
              aria-hidden
              strokeWidth={1.75}
            />
            <span className="font-medium text-[var(--color-navy)]">
              {lang === "es"
                ? "LDA #87 registrado — verificable públicamente con el Secretario del Condado de Sonoma."
                : "Registered LDA #87 — publicly verifiable with the Sonoma County Clerk."}
            </span>
            <span className="text-[var(--color-body-dark)] opacity-70">
              {lang === "es"
                ? "· Afianzado · LLC con licencia · Condado de Sonoma"
                : "· Bonded · Licensed LLC · Sonoma County"}
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TEAM.map((member) => (
              <article
                key={member.name}
                className="bg-white border border-[var(--color-border-light)] p-7 md:p-8 rounded-sm"
              >
                <div
                  className="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-navy)] border border-[var(--color-gold)]/40"
                  aria-hidden
                >
                  <span className="font-serif text-xl text-[var(--color-gold)]">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[var(--color-navy)] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm uppercase tracking-[0.15em] text-[var(--color-gold)] mb-3 font-medium">
                  {lang === "es" ? member.roleEs : member.role}
                </p>
                {member.credential && (
                  <p className="inline-flex items-center gap-1.5 mb-4 text-xs font-medium text-[var(--color-navy)] bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/40 rounded-full px-2.5 py-1">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-[var(--color-gold)]"
                      aria-hidden
                      strokeWidth={1.75}
                    />
                    {lang === "es" ? member.credentialEs : member.credential}
                  </p>
                )}
                <p className="text-[var(--color-body-dark)] leading-relaxed text-sm md:text-base opacity-90">
                  {lang === "es" ? member.bioEs : member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why we started */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-navy)] text-xs tracking-[0.22em] uppercase mb-4 opacity-70">
            {dict.about_why_eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-navy)] leading-tight mb-6">
            {dict.about_why_heading}
          </h2>
          <p className="text-[var(--color-body-dark)] text-lg leading-relaxed">
            {BUSINESS.name} {dict.about_why_body_tail}
          </p>
        </div>
      </section>

      {/* Prominent LDA Disclosure */}
      <section className="bg-[var(--color-navy)] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-[var(--color-gold)] bg-[var(--color-navy-mid)] p-8 md:p-10 rounded-sm">
            <div className="flex items-start gap-4">
              <ShieldCheck
                className="h-8 w-8 text-[var(--color-gold)] shrink-0"
                aria-hidden
                strokeWidth={1.5}
              />
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-gold)] mb-4">
                  {dict.about_disclosure_title}
                </h2>
                <p className="text-[var(--color-body-light)] leading-relaxed">
                  {dict.full_disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
