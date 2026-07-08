import type { Metadata } from "next";

export { default } from "../../privacy/page";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo California Legal Document Excellence recopila, usa y protege su información.",
  alternates: {
    canonical: "/es/privacy",
    languages: { en: "/privacy", es: "/es/privacy", "x-default": "/privacy" },
  },
  openGraph: {
    title: "Política de Privacidad | California Legal Document Excellence",
    description:
      "Cómo California Legal Document Excellence recopila, usa y protege su información.",
    url: "/es/privacy",
    type: "website",
    locale: "es_US",
  },
};
