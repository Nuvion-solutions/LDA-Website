import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { COUNTIES } from "@/lib/counties";
import { GUIDES } from "@/lib/guides";

// Each page is listed once (the English URL) with hreflang alternates pointing
// to its Spanish counterpart, so Google indexes both language versions and
// understands they're translations of each other.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  type Page = {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  };

  const pages: Page[] = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.85 },
    ...SERVICES.map((s) => ({
      path: `/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { path: "/service-areas", changeFrequency: "monthly", priority: 0.7 },
    ...COUNTIES.map((c) => ({
      path: `/service-areas/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/guides", changeFrequency: "monthly", priority: 0.6 },
    ...GUIDES.map((g) => ({
      path: `/guides/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/intake", changeFrequency: "monthly", priority: 0.9 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  return pages.map((p) => {
    const esPath = p.path === "/" ? "/es" : `/es${p.path}`;
    return {
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: {
          en: `${SITE_URL}${p.path}`,
          es: `${SITE_URL}${esPath}`,
        },
      },
    };
  });
}
