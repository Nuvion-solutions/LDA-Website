import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import {
  SERVICES,
  localized,
  ADDITIONAL_SERVICE_CATEGORIES,
  localizedCategory,
} from "@/lib/services";
import { SHORT_DISCLAIMER } from "@/lib/utils";
import { CTABanner } from "@/components/sections/CTABanner";
import { LANG_COOKIE } from "@/lib/language-context";
import { translations, type Language } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Document Preparation Services",
  description:
    "Document preparation for divorce & family law, evictions, immigration, living trusts, wills, probate, powers of attorney, name changes, small claims, deeds & more. Registered LDA #87 serving Sonoma County & the North Bay.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Document Preparation Services | California Legal Document Excellence",
    description:
      "Divorce, eviction, immigration, living trust, power of attorney, DMV & tax document preparation. Registered LDA #87, Sonoma County.",
    url: "/services",
    type: "website",
  },
};

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LANG_COOKIE)?.value;
  const lang: Language = stored === "es" ? "es" : "en";
  const dict = translations[lang];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
            {dict.services_page_eyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl">
            {dict.services_page_h1}
          </h1>
          <p className="mt-6 text-[var(--color-body-light)] text-base md:text-lg max-w-2xl leading-relaxed">
            {dict.services_page_sub}
          </p>
          <p className="mt-4 text-xs text-[var(--color-muted-light)] max-w-2xl">
            {SHORT_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const title = localized(service, "title", lang);
            return (
              <article
                key={service.id}
                id={service.slug}
                className="scroll-mt-24"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-sm bg-[var(--color-navy)]">
                    <Icon
                      className="h-7 w-7 text-[var(--color-gold)]"
                      aria-hidden
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-4xl text-[var(--color-navy)] leading-tight">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-[var(--color-gold)] transition-colors"
                      >
                        {title}
                      </Link>
                    </h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-2">
                      {dict.services_page_what_it_is}
                    </h3>
                    <p className="text-[var(--color-body-dark)] leading-relaxed">
                      {localized(service, "what", lang)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-2">
                      {dict.services_page_documents}
                    </h3>
                    <p className="text-[var(--color-body-dark)] leading-relaxed">
                      {localized(service, "documents", lang)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-2">
                      {dict.services_page_who_for}
                    </h3>
                    <p className="text-[var(--color-body-dark)] leading-relaxed">
                      {localized(service, "who", lang)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-l-2 border-[var(--color-gold)] bg-[var(--color-offwhite)] px-5 py-4 text-sm text-[var(--color-body-dark)]">
                  <strong className="text-[var(--color-navy)]">
                    {dict.services_page_note_label}
                  </strong>{" "}
                  {dict.services_page_note_body}
                </div>

                <Link
                  href="/intake"
                  className="mt-6 inline-flex items-center gap-2 text-[var(--color-navy)] hover:text-[var(--color-gold)] font-medium border-b border-[var(--color-gold)] pb-1 transition-colors"
                >
                  {dict.services_page_get_help} {title.split(" ")[0]}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Broader breadth — full range of document types, grouped by area */}
      <section className="bg-[var(--color-offwhite)] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-4">
            {dict.services_more_eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-navy)] leading-tight max-w-2xl">
            {dict.services_more_h2}
          </h2>
          <p className="mt-4 text-[var(--color-body-dark)] leading-relaxed max-w-2xl">
            {dict.services_more_sub}
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ADDITIONAL_SERVICE_CATEGORIES.map((cat) => {
              const c = localizedCategory(cat, lang);
              return (
                <div
                  key={cat.title}
                  className="bg-white border border-[var(--color-border-light)] rounded-sm p-6"
                >
                  <h3 className="font-serif text-lg text-[var(--color-navy)] mb-3">
                    {c.title}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-[var(--color-body-dark)]">
                    {c.items.map((item) => (
                      <li key={item} className="leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-[var(--color-body-dark)]">
            {dict.services_more_foot}{" "}
            <Link
              href="/intake"
              className="font-medium text-[var(--color-navy)] hover:text-[var(--color-gold)] border-b border-[var(--color-gold)] pb-0.5 transition-colors"
            >
              {dict.services_more_foot_link}
            </Link>
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
