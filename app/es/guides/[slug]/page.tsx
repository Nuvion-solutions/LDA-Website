import type { Metadata } from "next";
import { getGuide } from "@/lib/guides";

export { default, generateStaticParams } from "../../../guides/[slug]/page";

// Only known guide slugs are valid (declared statically — Next can't read a
// re-exported route-segment config).
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
    title: { absolute: `${guide.titleEs} | Guía LDA de California` },
    description: guide.descriptionEs,
    alternates: {
      canonical: `/es/guides/${slug}`,
      languages: {
        en: `/guides/${slug}`,
        es: `/es/guides/${slug}`,
        "x-default": `/guides/${slug}`,
      },
    },
    openGraph: {
      title: guide.titleEs,
      description: guide.descriptionEs,
      url: `/es/guides/${slug}`,
      type: "article",
      locale: "es_US",
    },
  };
}
