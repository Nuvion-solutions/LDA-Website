import type { Metadata } from "next";

export { default } from "../../terms/page";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description:
    "Los términos que rigen el uso del sitio web y los servicios de preparación de documentos de California Legal Document Excellence.",
  alternates: {
    canonical: "/es/terms",
    languages: { en: "/terms", es: "/es/terms", "x-default": "/terms" },
  },
  openGraph: {
    title: "Términos de Servicio | California Legal Document Excellence",
    description:
      "Los términos que rigen el uso del sitio web y los servicios de preparación de documentos.",
    url: "/es/terms",
    type: "website",
    locale: "es_US",
  },
};
