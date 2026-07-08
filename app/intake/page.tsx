import type { Metadata } from "next";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { IntakeHero } from "@/components/intake/IntakeHero";

export const metadata: Metadata = {
  title: "Start Your Intake",
  description:
    "Tell us what documents you need prepared. We respond within 1 business day with pricing & next steps. Registered LDA #87, Sonoma County.",
  alternates: {
    canonical: "/intake",
    languages: { en: "/intake", es: "/es/intake", "x-default": "/intake" },
  },
  openGraph: {
    title: "Start Your Intake | California Legal Document Excellence",
    description:
      "Tell us what documents you need prepared. We follow up within 1 business day. Free consultation.",
    url: "/intake",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function IntakePage() {
  return (
    <>
      <IntakeHero />
      <section className="bg-[var(--color-offwhite)] py-8 md:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <IntakeForm />
        </div>
      </section>
    </>
  );
}
