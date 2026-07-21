import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  BadgeCheck,
  Scale,
  FileCheck2,
  Zap,
} from "lucide-react";
import { SERVICES, localized } from "@/lib/services";
import {
  SERVICE_CHECKLISTS,
  checklistTitle,
  checklistIntro,
  checklistItems,
  checklistNote,
} from "@/lib/checklists";
import { BUSINESS } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { CTABanner } from "@/components/sections/CTABanner";
import { QuickConsultForm } from "@/components/forms/QuickConsultForm";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/server-locale";

// One indexable page per service so we can rank for long-tail local searches
// like "Sonoma County divorce paperwork" — each carries its own title,
// description, canonical, and Service JSON-LD.

// Map a service to its document checklist (checklist keys differ slightly from
// service titles, so this bridges the two).
const CHECKLIST_KEYS: Record<string, string> = {
  divorce: "Divorce & Family Law Documents",
  eviction: "Eviction (Unlawful Detainer) Paperwork",
  "living-trust": "Living Trust Documents",
  "power-of-attorney": "Power of Attorney",
  dmv: "DMV Form Assistance",
  "tax-organization": "Tax Document Organization (Clerical)",
  wills: "Wills & Health Care Directives",
  probate: "Probate Documents",
  "name-change": "Legal Name Change",
  "small-claims": "Small Claims Paperwork",
  guardianship: "Guardianship Documents",
  deeds: "Deeds & Property Transfers",
};

// Pre-select the quick-consult form to the service the visitor landed on, so an
// ad click arrives at a form already about their need. Keyed by service.id;
// values must match the QuickConsultForm SERVICES options. Ids with no clean
// match (dmv, tax-organization, guardianship) are omitted — the form still shows
// with every option, just no preselection.
const QUICK_FORM_SERVICE: Record<string, string> = {
  divorce: "Divorce & Family",
  eviction: "Eviction (Unlawful Detainer)",
  "living-trust": "Living Trust / Estate",
  "power-of-attorney": "Wills & Power of Attorney",
  wills: "Wills & Power of Attorney",
  probate: "Probate",
  "name-change": "Name Change",
  "small-claims": "Small Claims",
  deeds: "Deeds / Property",
};

const SERVICE_AREA = [
  "Sonoma County, California",
  "Napa County, California",
  "Marin County, California",
  "Alameda County, California",
  "Contra Costa County, California",
  "San Francisco County, California",
  "Sacramento County, California",
];

// Topical clusters for the "Related services" section — internal links that
// pass relevance between related pages (e.g. probate ↔ wills ↔ trusts) and
// give visitors who landed on the wrong page a next step instead of a dead end.
const RELATED_SERVICES: Record<string, string[]> = {
  divorce: ["name-change", "deeds", "guardianship"],
  eviction: ["small-claims", "deeds"],
  "living-trust": ["wills", "deeds", "probate"],
  "power-of-attorney": ["wills", "living-trust"],
  dmv: ["power-of-attorney", "tax-organization"],
  "tax-organization": ["dmv", "small-claims"],
  wills: ["living-trust", "probate", "power-of-attorney"],
  probate: ["wills", "living-trust", "deeds"],
  "name-change": ["divorce", "wills"],
  "small-claims": ["eviction", "deeds"],
  guardianship: ["wills", "divorce", "power-of-attorney"],
  deeds: ["living-trust", "probate", "divorce"],
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

// Only the known service slugs are valid; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.title} in Sonoma County, CA`;
  const description = `${service.what} LDA #87 — Sonoma County & the greater North Bay.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/services/${slug}`,
      languages: {
        en: `/services/${slug}`,
        es: `/es/services/${slug}`,
        "x-default": `/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const lang = await getServerLocale();
  const dict = translations[lang];

  const title = localized(service, "title", lang);
  const Icon = service.icon;
  const checklist = SERVICE_CHECKLISTS[CHECKLIST_KEYS[service.id]];

  // Structured data must match the language of the page it's on, so on /es it
  // uses the localized names/descriptions and the /es URLs.
  const localePrefix = lang === "es" ? "/es" : "";
  const pageUrl = `${SITE_URL}${localePrefix}/services/${slug}`;

  // Per-service structured data, linked to the site-wide LegalService entity.
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: "Document Preparation",
    description: localized(service, "what", lang),
    url: pageUrl,
    areaServed: SERVICE_AREA.map((name) => ({ "@type": "Place", name })),
    provider: {
      "@type": "LegalService",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
    },
  };

  const related = (RELATED_SERVICES[service.id] ?? [])
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Breadcrumb trail (Home → Services → this page) for search result display.
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
        name: dict.nav_services,
        item: `${SITE_URL}${localePrefix}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: pageUrl,
      },
    ],
  };

  // FAQPage schema for services that carry FAQs. Google requires the marked-up
  // Q&As to be visible on the page — the section below renders the same data,
  // so on /es both the schema and the visible text use the Spanish fields.
  const faqLd =
    service.faqs && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: lang === "es" ? f.qEs : f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: lang === "es" ? f.aEs : f.a,
            },
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

      {/* Hero — content on the left, a quick-consult form card on the right so
          paid ad clicks (which land here) hit a form immediately. */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-light)] hover:text-[var(--color-gold)] transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {dict.services_page_h1}
              </Link>
              <div className="flex items-start gap-5">
                <div className="shrink-0 hidden sm:flex items-center justify-center w-14 h-14 rounded-sm bg-[var(--color-navy-mid)] border border-[var(--color-gold)]/40">
                  <Icon
                    className="h-7 w-7 text-[var(--color-gold)]"
                    aria-hidden
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h1 className="font-serif text-3xl md:text-5xl leading-tight">
                    {title}
                  </h1>
                  <p className="mt-5 text-[var(--color-body-light)] text-base md:text-lg leading-relaxed">
                    {localized(service, "short", lang)}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-xs text-[var(--color-muted-light)] max-w-2xl">
                {dict.short_disclaimer}
              </p>
            </div>

            <QuickConsultForm defaultService={QUICK_FORM_SERVICE[service.id]} />
          </div>
        </div>
      </section>

      {/* Value strip — answers the two biggest conversion blockers for the paid
          clicks that land here (trust + price) right under the hero form. */}
      <section className="bg-[var(--color-offwhite)] border-b border-[var(--color-border-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-7">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {[
              {
                Icon: BadgeCheck,
                title: lang === "es" ? "Registrado y Afianzado" : "Registered & Bonded",
                sub: lang === "es" ? "LDA #87 · Condado de Sonoma" : "LDA #87 · Sonoma County",
              },
              {
                Icon: Scale,
                title:
                  lang === "es"
                    ? "Una fracción del costo de un abogado"
                    : "A Fraction of Attorney Fees",
                sub:
                  lang === "es"
                    ? "Consulta gratis, presupuesto claro"
                    : "Free consultation, clear quote",
              },
              {
                Icon: FileCheck2,
                title: lang === "es" ? "Documentos listos para la corte" : "Court-Ready Documents",
                sub:
                  lang === "es"
                    ? "Preparados correctamente y a tiempo"
                    : "Prepared right, filed on time",
              },
              {
                Icon: Zap,
                title: lang === "es" ? "Respuesta el mismo día" : "Same-Day Response",
                sub:
                  lang === "es"
                    ? "A menudo en menos de una hora, Lun–Sáb"
                    : "Often within the hour, Mon–Sat",
              },
            ].map(({ Icon: ValueIcon, title: vTitle, sub }) => (
              <li key={vTitle} className="flex items-start gap-3">
                <ValueIcon
                  className="h-5 w-5 mt-0.5 text-[var(--color-gold)] shrink-0"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-sm font-medium text-[var(--color-navy)] leading-snug">
                    {vTitle}
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

      {/* Detail */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-2">
                {dict.services_page_what_it_is}
              </h2>
              <p className="text-[var(--color-body-dark)] leading-relaxed">
                {localized(service, "what", lang)}
              </p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-2">
                {dict.services_page_documents}
              </h2>
              <p className="text-[var(--color-body-dark)] leading-relaxed">
                {localized(service, "documents", lang)}
              </p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-2">
                {dict.services_page_who_for}
              </h2>
              <p className="text-[var(--color-body-dark)] leading-relaxed">
                {localized(service, "who", lang)}
              </p>
            </div>
          </div>

          <div className="mt-8 border-l-2 border-[var(--color-gold)] bg-[var(--color-offwhite)] px-5 py-4 text-sm text-[var(--color-body-dark)]">
            <strong className="text-[var(--color-navy)]">
              {dict.services_page_note_label}
            </strong>{" "}
            {dict.services_page_note_body}
          </div>

          {/* Documents-to-gather checklist (strong, useful, keyword-rich) */}
          {checklist && (
            <div className="mt-12 border border-[var(--color-border-light)] rounded-sm p-7 md:p-8">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-2">
                {checklistTitle(checklist, lang)}
              </h2>
              <p className="text-sm text-[var(--color-body-dark)] opacity-80 mb-5">
                {checklistIntro(checklist, lang)}
              </p>
              <ul className="space-y-2.5">
                {checklistItems(checklist, lang).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check
                      className="h-4 w-4 mt-0.5 text-[var(--color-gold)] shrink-0"
                      aria-hidden
                    />
                    <span className="text-[var(--color-body-dark)]">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-[var(--color-body-dark)] opacity-70 leading-relaxed">
                {checklistNote(checklist, lang)}
              </p>
            </div>
          )}

          {/* Per-service FAQs — visible twin of the FAQPage JSON-LD above. */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-6">
                {lang === "es"
                  ? "Preguntas Frecuentes"
                  : "Frequently Asked Questions"}
              </h2>
              <div className="space-y-6">
                {service.faqs.map((f) => (
                  <div
                    key={f.q}
                    className="border-l-2 border-[var(--color-gold)] pl-5"
                  >
                    <h3 className="font-medium text-[var(--color-navy)] mb-1.5">
                      {lang === "es" ? f.qEs : f.q}
                    </h3>
                    <p className="text-sm text-[var(--color-body-dark)] leading-relaxed">
                      {lang === "es" ? f.aEs : f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            href="/intake"
            className="mt-10 inline-flex items-center gap-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-7 py-3.5 rounded-sm tracking-wide transition-colors"
          >
            {dict.services_page_get_help} {title.split(" ")[0]}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          {/* Related services — topical internal links */}
          {related.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--color-border-light)]">
              <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-60 mb-5">
                {lang === "es" ? "Servicios relacionados" : "Related services"}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <Link
                      key={r.slug}
                      href={`/services/${r.slug}`}
                      className="group flex items-start gap-3 border border-[var(--color-border-light)] rounded-sm p-4 hover:border-[var(--color-gold)] transition-colors"
                    >
                      <RIcon
                        className="h-5 w-5 mt-0.5 text-[var(--color-gold)] shrink-0"
                        aria-hidden
                        strokeWidth={1.5}
                      />
                      <span>
                        <span className="block text-sm font-medium text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
                          {localized(r, "title", lang)}
                        </span>
                        <span className="mt-1 block text-xs text-[var(--color-body-dark)] opacity-80 leading-snug">
                          {localized(r, "short", lang)}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
