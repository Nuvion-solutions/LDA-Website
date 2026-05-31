import { BUSINESS } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";

// JSON-LD structured data for Google's Knowledge Graph + local pack.
// Renders two graphs: a LegalService (with full LocalBusiness fields) and
// a WebSite entry to help with sitelinks search box rendering.

// Service-area business: we surface city/region/country only (no street
// address) so Google can still place us in local results without exposing
// a specific office location.
const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Santa Rosa",
  addressRegion: "CA",
  addressCountry: "US",
};

// Geographic coordinates for Santa Rosa, CA (approximate centroid — used
// only as a hint for Google's local indexing).
const GEO = {
  "@type": "GeoCoordinates",
  latitude: 38.4404,
  longitude: -122.7141,
};

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "17:00",
  },
];

const SERVICE_AREA = [
  "Sonoma County, California",
  "Napa County, California",
  "Marin County, California",
  "Alameda County, California",
  "Contra Costa County, California",
  "San Francisco County, California",
  "Sacramento County, California",
];

export function StructuredData() {
  const legalService = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: "California Legal Document Excellence",
    description:
      "Registered Legal Document Assistant (LDA #87, Sonoma County) providing professional document preparation services for divorce, eviction, immigration, living trust, power of attorney, DMV forms, and tax document organization. Not a law firm; we do not provide legal advice or representation.",
    url: SITE_URL,
    // The auto-generated brand images double as the org logo/image so Google's
    // Knowledge Panel and local results have something to render.
    logo: `${SITE_URL}/icon`,
    image: `${SITE_URL}/opengraph-image`,
    // The people behind the practice — credibility signal for a new business.
    founder: [
      { "@type": "Person", name: "Carson C. Newton" },
      { "@type": "Person", name: "S. Khan" },
      { "@type": "Person", name: "A. Khan" },
    ],
    // sameAs links every profile that confirms this is the same business.
    // Add the Google Business Profile URL + any social pages here once live —
    // this is one of the strongest trust/entity signals for local SEO.
    sameAs: [],
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: SERVICE_AREA.map((name) => ({ "@type": "Place", name })),
    priceRange: "$$",
    paymentAccepted: ["Credit Card", "Debit Card", "Zelle", "Venmo"],
    currenciesAccepted: "USD",
    knowsAbout: SERVICES.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Document Preparation Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.what,
          serviceType: "Document Preparation",
          provider: { "@id": `${SITE_URL}/#business` },
        },
      })),
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "LDA Registration",
      value: "LDA #87, Sonoma County, California",
    },
    disclaimer:
      "California Legal Document Excellence, LLC is a Registered Legal Document Assistant. We are not a law firm and do not provide legal advice, legal representation, or legal counsel. All document preparation services are provided at the client's direction.",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is data, not user content — safe to inject as a stringified literal.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
