import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { COUNTIES, getCounty, localizedCounty } from "@/lib/counties";
import { SERVICES, localized } from "@/lib/services";
import { BUSINESS } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { CTABanner } from "@/components/sections/CTABanner";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/server-locale";

// One indexable page per county so we can rank for local searches like
// "legal document assistant Marin County" — each carries county-specific
// content (court, cities, featured services, FAQs), its own metadata, and
// Service + Breadcrumb + FAQ structured data.

export function generateStaticParams() {
  return COUNTIES.map((c) => ({ county: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string }>;
}): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) return {};

  const title = `Legal Document Assistant in ${county.name} County, CA`;
  const description = `Court & legal document preparation for ${county.name} County — divorce, eviction, living trusts, probate & more. Registered LDA #87. Serving ${county.seat} & ${county.name} County.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/service-areas/${slug}`,
      languages: {
        en: `/service-areas/${slug}`,
        es: `/es/service-areas/${slug}`,
        "x-default": `/service-areas/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/service-areas/${slug}`,
      type: "website",
    },
  };
}

export default async function CountyPage({
  params,
}: {
  params: Promise<{ county: string }>;
}) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  const lang = await getServerLocale();
  const dict = translations[lang];
  const es = lang === "es";

  const countyName = localizedCounty(county, "name", lang);
  const countyLabel = es
    ? `Condado de ${countyName}`
    : `${countyName} County`;
  const heading = es
    ? `Asistente de Documentos Legales en el Condado de ${countyName}`
    : `Legal Document Assistant in ${countyName} County`;

  const featured = county.topServiceIds
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const localePrefix = es ? "/es" : "";
  const pageUrl = `${SITE_URL}${localePrefix}/service-areas/${slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: heading,
    serviceType: "Document Preparation",
    description: localizedCounty(county, "intro", lang),
    url: pageUrl,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${county.name} County, California`,
    },
    provider: {
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
        name: es ? "Áreas de Servicio" : "Service Areas",
        item: `${SITE_URL}${localePrefix}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: countyLabel,
        item: pageUrl,
      },
    ],
  };

  const faqLd =
    county.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: county.faqs.map((f) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-light)] hover:text-[var(--color-gold)] transition-colors mb-8"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            {es ? "Áreas de Servicio" : "Service Areas"}
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl">
            {heading}
          </h1>
          <p className="mt-5 text-[var(--color-body-light)] text-base md:text-lg max-w-2xl leading-relaxed">
            {localizedCounty(county, "intro", lang)}
          </p>
          <p className="mt-6 text-xs text-[var(--color-muted-light)] max-w-2xl">
            {dict.short_disclaimer}
          </p>
        </div>
      </section>

      {/* Featured services for this county */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-4xl text-[var(--color-navy)] leading-tight mb-8">
            {es
              ? `Cómo ayudamos en el Condado de ${countyName}`
              : `How we help in ${countyName} County`}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {featured.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-start gap-4 border border-[var(--color-border-light)] rounded-sm p-6 hover:border-[var(--color-gold)] transition-colors"
                >
                  <SIcon
                    className="h-6 w-6 mt-0.5 text-[var(--color-gold)] shrink-0"
                    aria-hidden
                    strokeWidth={1.5}
                  />
                  <span>
                    <span className="block font-serif text-lg text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
                      {localized(s, "title", lang)}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--color-body-dark)] opacity-80 leading-snug">
                      {localized(s, "short", lang)}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 text-[var(--color-navy)] hover:text-[var(--color-gold)] font-medium border-b border-[var(--color-gold)] pb-1 transition-colors"
          >
            {es ? "Ver todos los servicios" : "See all services"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* County-specific context + cities */}
      <section className="bg-[var(--color-offwhite)] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] leading-tight mb-5">
              {es
                ? `Trámites en el Condado de ${countyName}`
                : `Filing in ${countyName} County`}
            </h2>
            <p className="text-[var(--color-body-dark)] leading-relaxed">
              {localizedCounty(county, "local", lang)}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-4">
              {es ? "Ciudades que servimos" : "Cities we serve"}
            </h3>
            <ul className="space-y-2">
              {county.cities.map((city) => (
                <li
                  key={city}
                  className="flex items-center gap-2 text-sm text-[var(--color-body-dark)]"
                >
                  <Check
                    className="h-4 w-4 text-[var(--color-gold)] shrink-0"
                    aria-hidden
                  />
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* County FAQ */}
      {county.faqs.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-8">
              {es ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-6">
              {county.faqs.map((f) => (
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
        </section>
      )}

      <CTABanner />
    </>
  );
}
