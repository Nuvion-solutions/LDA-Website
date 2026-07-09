import type { Metadata } from "next";

export { default } from "../../guides/page";

export const metadata: Metadata = {
  title: "Guías — Ayuda con Documentos Legales de California",
  description:
    "Guías claras de procesos legales comunes en California — divorcio sin oposición, el proceso de desalojo, fideicomiso en vida vs. testamento y más. De un LDA #87 registrado.",
  alternates: {
    canonical: "/es/guides",
    languages: { en: "/guides", es: "/es/guides", "x-default": "/guides" },
  },
  openGraph: {
    title: "Guías | California Legal Document Excellence",
    description:
      "Guías claras de procesos legales comunes en California. De un LDA #87 registrado.",
    url: "/es/guides",
    type: "website",
    locale: "es_US",
  },
};
