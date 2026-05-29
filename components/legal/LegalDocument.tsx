import { CTABanner } from "@/components/sections/CTABanner";

// Presentational shell for long-form legal pages (Privacy, Terms).
// Receives already-localized content from the page (server component picks
// the language from the cookie, mirroring the About page pattern).

export type LegalSection = { heading: string; paragraphs: string[] };

export function LegalDocument({
  eyebrow,
  title,
  lastUpdatedLabel,
  lastUpdated,
  intro,
  sections,
  disclaimer,
}: {
  eyebrow: string;
  title: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  disclaimer: string;
}) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
            {eyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            {title}
          </h1>
          <p className="mt-5 text-sm text-[var(--color-muted-light)]">
            {lastUpdatedLabel} {lastUpdated}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-body-dark)] text-lg leading-relaxed mb-12">
            {intro}
          </p>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-serif text-2xl text-[var(--color-navy)] mb-3">
                  {s.heading}
                </h2>
                <div className="space-y-3">
                  {s.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[var(--color-body-dark)] leading-relaxed opacity-90"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Required LDA disclosure */}
          <div className="mt-14 border-l-4 border-[var(--color-gold)] bg-[var(--color-offwhite)] p-5 md:p-6">
            <p className="text-sm text-[var(--color-body-dark)] leading-relaxed">
              {disclaimer}
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
