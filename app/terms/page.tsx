import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BUSINESS } from "@/lib/utils";
import { LANG_COOKIE } from "@/lib/language-context";
import { translations, type Language } from "@/lib/translations";
import {
  LegalDocument,
  type LegalSection,
} from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the California Legal Document Excellence, LLC website and the document preparation services we provide as a Registered Legal Document Assistant.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | California Legal Document Excellence, LLC",
    description:
      "The terms that govern your use of our website and document preparation services.",
    url: "/terms",
    type: "website",
  },
};

type Content = {
  eyebrow: string;
  title: string;
  lastUpdatedLabel: string;
  intro: string;
  sections: LegalSection[];
};

const LAST_UPDATED = { en: "May 29, 2026", es: "29 de mayo de 2026" };

const CONTENT: Record<Language, Content> = {
  en: {
    eyebrow: "Terms",
    title: "Terms of Service",
    lastUpdatedLabel: "Last updated:",
    intro: `These Terms of Service ("Terms") govern your use of the website of ${BUSINESS.name} and the document preparation services we offer. Please read them carefully. By using our website or engaging our services, you agree to these Terms.`,
    sections: [
      {
        heading: "Not a Law Firm — No Legal Advice",
        paragraphs: [
          `${BUSINESS.name} is a Registered Legal Document Assistant (${BUSINESS.lda}, ${BUSINESS.county}). We are not a law firm, and we are not attorneys. We do not provide legal advice, legal opinions, legal representation, or legal counsel, and we cannot tell you what your legal rights are or how to proceed in your matter.`,
          "We prepare documents at your specific direction. Communicating with us does not create an attorney-client relationship. If you need legal advice, you should consult a licensed attorney.",
        ],
      },
      {
        heading: "Our Services",
        paragraphs: [
          "We provide self-help document preparation and related clerical services for people who have decided how they wish to proceed and who are representing themselves. We type and prepare documents based on the information and instructions you provide.",
          "We do not choose forms for you, select legal strategies, or make decisions on your behalf. The choices and content of your documents are yours.",
        ],
      },
      {
        heading: "Your Responsibilities",
        paragraphs: [
          "You are responsible for the accuracy, completeness, and truthfulness of the information you provide to us. The quality of the documents we prepare depends on the accuracy of that information.",
          "You are responsible for reviewing all documents before signing or filing them, for meeting any deadlines that apply to your matter, and for filing or submitting documents with the appropriate court or agency.",
        ],
      },
      {
        heading: "Fees and Payment",
        paragraphs: [
          "Fees for our services are described to you before work begins and are confirmed in a written contract for services. Payment terms are set out in that contract. Government filing fees and other third-party costs are separate from our service fees and are your responsibility.",
        ],
      },
      {
        heading: "No Guarantee of Outcomes",
        paragraphs: [
          "We do not guarantee any particular result. Courts, government agencies, and other third parties make their own decisions based on their own rules and requirements, which are outside our control.",
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          "To the fullest extent permitted by law, our total liability arising out of or relating to our services or these Terms is limited to the amount you paid us for the specific service at issue. We are not liable for indirect, incidental, or consequential damages, including damages resulting from inaccurate information you provide or from deadlines you do not meet.",
        ],
      },
      {
        heading: "Website Content and Intellectual Property",
        paragraphs: [
          "The content on this website, including text, graphics, and logos, is the property of the business and is provided for general informational purposes only. It is not a substitute for advice from a licensed professional and may not reflect the most current legal requirements.",
        ],
      },
      {
        heading: "Third-Party Links",
        paragraphs: [
          "Our website may link to third-party websites for your convenience. We do not control and are not responsible for the content, policies, or practices of those websites.",
        ],
      },
      {
        heading: "Governing Law",
        paragraphs: [
          "These Terms are governed by the laws of the State of California, without regard to its conflict-of-law principles. Any dispute relating to these Terms or our services will be handled in the appropriate courts located in California.",
        ],
      },
      {
        heading: "Changes to These Terms",
        paragraphs: [
          "We may update these Terms from time to time. When we do, we will revise the “Last updated” date above. Your continued use of our website after changes are posted means you accept the updated Terms.",
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `If you have questions about these Terms, contact us at ${BUSINESS.phone} or ${BUSINESS.email}.`,
        ],
      },
    ],
  },
  es: {
    eyebrow: "Términos",
    title: "Términos de Servicio",
    lastUpdatedLabel: "Última actualización:",
    intro: `Estos Términos de Servicio ("Términos") rigen el uso del sitio web de ${BUSINESS.name} y los servicios de preparación de documentos que ofrecemos. Léalos detenidamente. Al usar nuestro sitio web o contratar nuestros servicios, usted acepta estos Términos.`,
    sections: [
      {
        heading: "No Somos un Bufete de Abogados — Sin Asesoramiento Legal",
        paragraphs: [
          `${BUSINESS.name} es un Asistente de Documentos Legales Registrado (${BUSINESS.lda}, ${BUSINESS.county}). No somos un bufete de abogados y no somos abogados. No brindamos asesoramiento legal, opiniones legales, representación legal ni consejo legal, y no podemos decirle cuáles son sus derechos legales ni cómo proceder en su asunto.`,
          "Preparamos documentos bajo su dirección específica. Comunicarse con nosotros no crea una relación de abogado-cliente. Si necesita asesoramiento legal, debe consultar a un abogado con licencia.",
        ],
      },
      {
        heading: "Nuestros Servicios",
        paragraphs: [
          "Brindamos servicios de preparación de documentos de autoayuda y servicios administrativos relacionados para personas que ya han decidido cómo desean proceder y que se representan a sí mismas. Escribimos y preparamos documentos según la información y las instrucciones que usted proporciona.",
          "No elegimos formularios por usted, no seleccionamos estrategias legales ni tomamos decisiones en su nombre. Las decisiones y el contenido de sus documentos son suyos.",
        ],
      },
      {
        heading: "Sus Responsabilidades",
        paragraphs: [
          "Usted es responsable de la exactitud, integridad y veracidad de la información que nos proporciona. La calidad de los documentos que preparamos depende de la exactitud de esa información.",
          "Usted es responsable de revisar todos los documentos antes de firmarlos o presentarlos, de cumplir con los plazos que apliquen a su asunto y de presentar los documentos ante el tribunal o la agencia correspondiente.",
        ],
      },
      {
        heading: "Tarifas y Pago",
        paragraphs: [
          "Las tarifas de nuestros servicios se le describen antes de comenzar el trabajo y se confirman en un contrato de servicios por escrito. Las condiciones de pago se establecen en ese contrato. Las tarifas gubernamentales de presentación y otros costos de terceros son aparte de nuestras tarifas de servicio y son su responsabilidad.",
        ],
      },
      {
        heading: "Sin Garantía de Resultados",
        paragraphs: [
          "No garantizamos ningún resultado en particular. Los tribunales, las agencias gubernamentales y otros terceros toman sus propias decisiones según sus propias reglas y requisitos, los cuales están fuera de nuestro control.",
        ],
      },
      {
        heading: "Limitación de Responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, nuestra responsabilidad total derivada o relacionada con nuestros servicios o estos Términos se limita al monto que usted nos pagó por el servicio específico en cuestión. No somos responsables de daños indirectos, incidentales o consecuentes, incluidos los daños derivados de información inexacta que usted proporcione o de plazos que no cumpla.",
        ],
      },
      {
        heading: "Contenido del Sitio Web y Propiedad Intelectual",
        paragraphs: [
          "El contenido de este sitio web, incluidos los textos, gráficos y logotipos, es propiedad del negocio y se proporciona únicamente con fines informativos generales. No sustituye el consejo de un profesional con licencia y puede no reflejar los requisitos legales más actuales.",
        ],
      },
      {
        heading: "Enlaces a Terceros",
        paragraphs: [
          "Nuestro sitio web puede enlazar a sitios de terceros para su conveniencia. No controlamos ni somos responsables del contenido, las políticas ni las prácticas de esos sitios.",
        ],
      },
      {
        heading: "Ley Aplicable",
        paragraphs: [
          "Estos Términos se rigen por las leyes del Estado de California, sin tener en cuenta sus principios de conflicto de leyes. Cualquier disputa relacionada con estos Términos o nuestros servicios se tramitará en los tribunales correspondientes ubicados en California.",
        ],
      },
      {
        heading: "Cambios a Estos Términos",
        paragraphs: [
          "Podemos actualizar estos Términos de vez en cuando. Cuando lo hagamos, revisaremos la fecha de “Última actualización” que aparece arriba. El uso continuo de nuestro sitio web después de publicar los cambios significa que acepta los Términos actualizados.",
        ],
      },
      {
        heading: "Contáctenos",
        paragraphs: [
          `Si tiene preguntas sobre estos Términos, comuníquese con nosotros al ${BUSINESS.phone} o ${BUSINESS.email}.`,
        ],
      },
    ],
  },
};

export default async function TermsPage() {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LANG_COOKIE)?.value;
  const lang: Language = stored === "es" ? "es" : "en";
  const content = CONTENT[lang];

  return (
    <LegalDocument
      eyebrow={content.eyebrow}
      title={content.title}
      lastUpdatedLabel={content.lastUpdatedLabel}
      lastUpdated={LAST_UPDATED[lang]}
      intro={content.intro}
      sections={content.sections}
      disclaimer={translations[lang].full_disclaimer}
    />
  );
}
