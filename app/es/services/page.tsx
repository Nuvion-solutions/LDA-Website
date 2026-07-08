import type { Metadata } from "next";

export { default } from "../../services/page";

export const metadata: Metadata = {
  title: "Servicios de Preparación de Documentos",
  description:
    "Preparación de documentos para divorcio y derecho familiar, desalojos, fideicomisos en vida, testamentos, sucesión, poderes notariales, cambios de nombre, reclamos menores, escrituras y más. LDA #87 registrado sirviendo el Condado de Sonoma y el North Bay.",
  alternates: {
    canonical: "/es/services",
    languages: { en: "/services", es: "/es/services", "x-default": "/services" },
  },
  openGraph: {
    title:
      "Servicios de Preparación de Documentos | California Legal Document Excellence",
    description:
      "Divorcio, desalojo, fideicomiso en vida, testamentos, sucesión, poder notarial, DMV y preparación de documentos de impuestos. LDA #87 registrado, Condado de Sonoma.",
    url: "/es/services",
    type: "website",
    locale: "es_US",
  },
};
