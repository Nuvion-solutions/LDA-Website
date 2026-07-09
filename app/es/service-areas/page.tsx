import type { Metadata } from "next";

export { default } from "../../service-areas/page";

export const metadata: Metadata = {
  title: "Áreas de Servicio — Condados del North Bay",
  description:
    "LDA #87 registrado preparando documentos judiciales y legales en todo el North Bay — condados de Sonoma, Marin, Napa y Solano. Divorcio, desalojo, fideicomisos, sucesión y más.",
  alternates: {
    canonical: "/es/service-areas",
    languages: {
      en: "/service-areas",
      es: "/es/service-areas",
      "x-default": "/service-areas",
    },
  },
  openGraph: {
    title: "Áreas de Servicio | California Legal Document Excellence",
    description:
      "Preparación de documentos judiciales y legales en los condados de Sonoma, Marin, Napa y Solano. LDA #87 registrado.",
    url: "/es/service-areas",
    type: "website",
    locale: "es_US",
  },
};
