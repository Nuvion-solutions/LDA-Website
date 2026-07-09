import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { GUIDES, getGuide, localizedGuide } from "@/lib/guides";
import { SERVICES, localized } from "@/lib/services";
import { BUSINESS } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { CTABanner } from "@/components/sections/CTABanner";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/server-locale";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: { absolute: `${guide.title} | California LDA Guide` },
    description: guide.description,
    alternates: {
      canonical: `/guides/${slug}`,
      languages: {
        en: `/guides/${slug}`,
        es: `/es/guides/${slug}`,
        "x-default": `/guides/${slug}`,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const lang = await getServerLocale();
  const dict = translations[lang];
  const es = lang === "es";

  const title = localizedGuide(guide, "title", lang);
  const service = SERVICES.find((s) => s.id === guide.relatedServiceId);
  const localePrefix = es ? "/es" : "";
  const pageUrl = `${SITE_URL}${localePrefix}/guides/${slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: localizedGuide(guide, "description", lang),
    inLanguage: es ? "es" : "en",
    datePublished: guide.published,
    dateModified: guide.published,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: {
      "@type": "LegalService",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.nav_home,
        item: `${SITE_URL}${localePrefix}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: es ? "Guías" : "Guides",
        item: `${SITE_URL}${localePrefix}/guides`,
      },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl },
    ],
  };

  const faqLd =
    guide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((f) => ({
            "@type": "Question",
            name: es ? f.qEs : f.q,
            acceptedAnswer: { "@type": "Answer", text: es ? f.aEs : f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-light)] hover:text-[var(--color-gold)] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {es ? "Guías" : "Guides"}
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight">
            {title}
          </h1>
          <p className="mt-5 text-[var(--color-body-light)] text-base md:text-lg leading-relaxed">
            {localizedGuide(guide, "intro", lang)}
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {guide.sections.map((sec) => (
            <div key={sec.heading} className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] leading-tight mb-4">
                {es ? sec.headingEs : sec.heading}
              </h2>
              {(es ? sec.bodyEs : sec.body).map((p, i) => (
                <p
                  key={i}
                  className="text-[var(--color-body-dark)] leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Related service CTA */}
          {service && (
            <div className="mt-4 border border-[var(--color-border-light)] rounded-sm p-6 md:p-7 bg-[var(--color-offwhite)]">
              <div className="flex items-start gap-3">
                <BookOpen
                  className="h-6 w-6 text-[var(--color-gold)] shrink-0 mt-0.5"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-[var(--color-body-dark)] leading-relaxed mb-4">
                    {es
                      ? `¿Listo para comenzar? Preparamos los documentos de ${localized(
                          service,
                          "title",
                          lang,
                        )} según sus instrucciones — con un precio fijo cotizado por adelantado.`
                      : `Ready to start? We prepare ${localized(
                          service,
                          "title",
                          lang,
                        )} at your direction — at a flat price quoted up front.`}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--color-navy)] hover:text-[var(--color-gold)] font-medium border-b border-[var(--color-gold)] pb-1 transition-colors"
                    >
                      {es ? "Ver el servicio" : "See the service"}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link
                      href="/intake"
                      className="inline-flex items-center gap-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-6 py-3 rounded-sm tracking-wide transition-colors"
                    >
                      {dict.nav_cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {guide.faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-6">
                {es ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              </h2>
              <div className="space-y-6">
                {guide.faqs.map((f) => (
                  <div
                    key={f.q}
                    className="border-l-2 border-[var(--color-gold)] pl-5"
                  >
                    <h3 className="font-medium text-[var(--color-navy)] mb-1.5">
                      {es ? f.qEs : f.q}
                    </h3>
                    <p className="text-sm text-[var(--color-body-dark)] leading-relaxed">
                      {es ? f.aEs : f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="mt-12 pt-8 border-t border-[var(--color-border-light)] text-xs text-[var(--color-body-dark)] opacity-70 leading-relaxed">
            {dict.short_disclaimer}
          </p>
        </div>
      </article>

      <CTABanner />
    </>
  );
}
