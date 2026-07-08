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

const TEAM = [
  {
    name: "Carson C. Newton",
    role: "Principal/Founder",
    roleEs: "Principal/Fundador",
    bio: "Co-founder and principal of California Legal Document Excellence, LLC. Oversees document preparation operations and quality standards.",
    bioEs:
      "Cofundador y principal de California Legal Document Excellence, LLC. Supervisa las operaciones de preparación de documentos y los estándares de calidad.",
  },
  {
    name: "S. Khan",
    role: "Principal/Founder",
    roleEs: "Principal/Fundador",
    bio: "Co-founder and principal of California Legal Document Excellence, LLC.",
    bioEs: "Cofundador y principal de California Legal Document Excellence, LLC.",
  },
  {
    name: "A. Khan",
    role: "Principal/Founder",
    roleEs: "Principal/Fundador",
    bio: "Co-founder and principal of California Legal Document Excellence, LLC.",
    bioEs: "Cofundador y principal de California Legal Document Excellence, LLC.",
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
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)] leading-tight mb-12">
            {dict.about_team_heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {TEAM.map((member) => (
              <article
                key={member.name}
                className="bg-white border border-[var(--color-border-light)] p-7 md:p-8 rounded-sm"
              >
                <h3 className="font-serif text-2xl text-[var(--color-navy)] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm uppercase tracking-[0.15em] text-[var(--color-gold)] mb-4 font-medium">
                  {lang === "es" ? member.roleEs : member.role}
                </p>
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
