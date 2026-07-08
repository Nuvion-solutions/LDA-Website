import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";

// Spanish service detail. Re-uses the English page's renderer, static params,
// and dynamicParams guard — only the metadata is localized here. The render
// language is resolved from the URL, so at /es/services/... it renders Spanish.
export { default, generateStaticParams } from "../../../services/[slug]/page";

// Only known service slugs are valid (declared statically — Next can't read a
// re-exported route-segment config).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.titleEs} en el Condado de Sonoma, CA`;
  const description = `${service.whatEs} LDA #87 — Condado de Sonoma y el North Bay.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/es/services/${slug}`,
      languages: {
        en: `/services/${slug}`,
        es: `/es/services/${slug}`,
        "x-default": `/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/es/services/${slug}`,
      type: "website",
      locale: "es_US",
    },
  };
}
