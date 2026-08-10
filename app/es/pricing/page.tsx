import type { Metadata } from "next";

export { default } from "../../pricing/page";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Precios de tarifa fija para la preparación de documentos legales en California — divorcio, fideicomisos, sucesiones, desalojo y más. Una fracción del costo de un abogado. Consulta gratis. LDA #87, Condado de Sonoma.",
  alternates: {
    canonical: "/es/pricing",
    languages: { en: "/pricing", es: "/es/pricing", "x-default": "/pricing" },
  },
  openGraph: {
    title: "Precios | California Legal Document Excellence",
    description:
      "Preparación de documentos legales a tarifa fija — una fracción del costo de un abogado. Consulta gratis. LDA #87.",
    url: "/es/pricing",
    type: "website",
    locale: "es_US",
  },
};
