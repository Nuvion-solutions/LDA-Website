import type { Metadata } from "next";

// Spanish home. Renders the same component as the English home ("/"); the
// language is resolved from the URL, so at "/es" everything renders in Spanish.
export { default } from "../page";

export const metadata: Metadata = {
  title: "Asistente de Documentos Legales en el Condado de Sonoma",
  description:
    "Asistente Legal Registrado (LDA #87) en el Condado de Sonoma, sirviendo el North Bay. Divorcio, desalojo, fideicomisos en vida, testamentos, sucesión, poder notarial y más. Llame al (707) 318-7031.",
  alternates: {
    canonical: "/es",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
  openGraph: {
    title: "California Legal Document Excellence | Documentos Legales",
    description:
      "Asistente Legal Registrado (LDA #87) en el Condado de Sonoma. Divorcio, desalojo, fideicomisos, testamentos y más. Consulta gratuita.",
    url: "/es",
    type: "website",
    locale: "es_US",
  },
};
