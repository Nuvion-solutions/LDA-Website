import type { Metadata } from "next";

export { default } from "../../intake/page";

export const metadata: Metadata = {
  title: "Comience Su Solicitud",
  description:
    "Díganos qué documentos necesita preparar. Respondemos dentro de 1 día hábil con el precio y los próximos pasos. LDA #87 registrado, Condado de Sonoma.",
  alternates: {
    canonical: "/es/intake",
    languages: { en: "/intake", es: "/es/intake", "x-default": "/intake" },
  },
  openGraph: {
    title: "Comience Su Solicitud | California Legal Document Excellence",
    description:
      "Díganos qué documentos necesita preparar. Le respondemos dentro de 1 día hábil. Consulta gratuita.",
    url: "/es/intake",
    type: "website",
    locale: "es_US",
  },
  robots: { index: true, follow: true },
};
