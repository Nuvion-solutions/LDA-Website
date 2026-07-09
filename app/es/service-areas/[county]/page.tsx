import type { Metadata } from "next";
import { getCounty } from "@/lib/counties";

export { default, generateStaticParams } from "../../../service-areas/[county]/page";

// Only known county slugs are valid (declared statically — Next can't read a
// re-exported route-segment config).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string }>;
}): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) return {};

  const title = `Asistente de Documentos Legales en el Condado de ${county.nameEs}, CA`;
  const description = `Preparación de documentos judiciales y legales para el Condado de ${county.nameEs} — divorcio, desalojo, fideicomisos, sucesión y más. LDA #87 registrado. Sirviendo ${county.seat} y el Condado de ${county.nameEs}.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/es/service-areas/${slug}`,
      languages: {
        en: `/service-areas/${slug}`,
        es: `/es/service-areas/${slug}`,
        "x-default": `/service-areas/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/es/service-areas/${slug}`,
      type: "website",
      locale: "es_US",
    },
  };
}
