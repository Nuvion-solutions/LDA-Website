import type { Metadata } from "next";

export { default } from "../../about/page";

export const metadata: Metadata = {
  title: "Acerca de Nosotros",
  description:
    "Conozca a los Asistentes Legales Registrados de California Legal Document Excellence — sirviendo el Condado de Sonoma y el North Bay. LDA #87.",
  alternates: {
    canonical: "/es/about",
    languages: { en: "/about", es: "/es/about", "x-default": "/about" },
  },
  openGraph: {
    title: "Acerca de Nosotros | California Legal Document Excellence",
    description:
      "Conozca a los Asistentes Legales Registrados que sirven el Condado de Sonoma y el North Bay. LDA #87.",
    url: "/es/about",
    type: "website",
    locale: "es_US",
  },
};
