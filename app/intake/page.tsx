import type { Metadata } from "next";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { SHORT_DISCLAIMER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Start Your Intake",
  description:
    "Tell us what documents you need prepared. We'll follow up within 1 business day with pricing, required information, and next steps. LDA #87 Sonoma County.",
  alternates: { canonical: "/intake" },
  openGraph: {
    title: "Start Your Intake | California Legal Document Excellence, LLC",
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
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
            Start Your Intake
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-5">
            Tell us what you need.
          </h1>
          <p className="text-[var(--color-body-light)] text-base md:text-lg leading-relaxed max-w-2xl">
            We&apos;ll review your intake and follow up with pricing, required
            information, and next steps — usually within 1 business day. Pricing
            provided after intake — your consultation is free.
          </p>
          <p className="mt-4 text-xs text-[var(--color-muted-light)] max-w-2xl">
            {SHORT_DISCLAIMER}
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-offwhite)] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <IntakeForm />
        </div>
      </section>
    </>
  );
}
