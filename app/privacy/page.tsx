import type { Metadata } from "next";
import { getServerLocale } from "@/lib/server-locale";
import { BUSINESS } from "@/lib/utils";
import { translations, type Language } from "@/lib/translations";
import {
  LegalDocument,
  type LegalSection,
} from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How California Legal Document Excellence, LLC collects, uses, and protects the information you share through our website and intake form.",
  alternates: {
    canonical: "/privacy",
    languages: { en: "/privacy", es: "/es/privacy", "x-default": "/privacy" },
  },
  openGraph: {
    title: "Privacy Policy | California Legal Document Excellence",
    description:
      "How we collect, use, and protect the information you share with us.",
    url: "/privacy",
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
    eyebrow: "Your Privacy",
    title: "Privacy Policy",
    lastUpdatedLabel: "Last updated:",
    intro: `This Privacy Policy explains how ${BUSINESS.name} ("we," "us," or "our") collects, uses, shares, and protects information when you visit our website or submit our online intake form. By using our website or providing information to us, you agree to the practices described below.`,
    sections: [
      {
        heading: "Information We Collect",
        paragraphs: [
          "When you contact us or complete our intake form, we collect the information you choose to provide. This includes your name, phone number, email address, preferred contact method, and details about the document preparation services you are requesting.",
          "Depending on the service, our intake form may ask for sensitive details you voluntarily share — such as information about your family, marriage, children, property, finances, or rental situation. You decide what to share; you may leave optional fields blank or contact us by phone instead.",
          "We also automatically receive limited technical information, such as your browser type and the pages you view, through standard website operation and our hosting provider.",
        ],
      },
      {
        heading: "How We Use Your Information",
        paragraphs: [
          "We use the information you provide to respond to your inquiry, follow up about your request, prepare the documents you ask us to prepare at your direction, communicate with you about your matter, and improve our services.",
          "We do not sell your personal information, and we do not use it for purposes unrelated to the services you request.",
        ],
      },
      {
        heading: "Communications Consent",
        paragraphs: [
          "When you submit our intake form and check the contact-consent box, you authorize us to contact you by phone, text message (SMS), and email at the contact information you provide, including for follow-up about your request.",
          "Message and data rates may apply. Message frequency varies. You can opt out of text messages at any time by replying STOP, and you can ask us to stop contacting you by phone or email by telling us directly. Consent to receive messages is not a condition of using our services.",
        ],
      },
      {
        heading: "How We Share Information",
        paragraphs: [
          "We share your information only with trusted service providers that help us operate our business — for example, our customer-relationship and communications platform, our website hosting provider, and similar vendors — and only as needed for them to perform services on our behalf.",
          "We may also disclose information if required by law, to comply with legal process, or to protect our rights, safety, or the safety of others. We do not sell or rent your personal information to third parties.",
        ],
      },
      {
        heading: "Data Retention",
        paragraphs: [
          "We keep your information only as long as needed to respond to your request, provide the services you ask for, and meet our legal and record-keeping obligations. When information is no longer needed, we take reasonable steps to delete or securely store it.",
        ],
      },
      {
        heading: "How We Protect Your Information",
        paragraphs: [
          "We use reasonable administrative and technical safeguards to protect the information you share, including encrypted (HTTPS) transmission of form submissions. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Your Choices and California Privacy Rights",
        paragraphs: [
          "You may request that we access, correct, or delete the personal information you have provided to us by contacting us using the details below. California residents may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and to request its deletion, subject to legal exceptions.",
          "We will not discriminate against you for exercising any of these rights.",
        ],
      },
      {
        heading: "Children's Privacy",
        paragraphs: [
          "Our website and services are intended for adults. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.",
        ],
      },
      {
        heading: "Third-Party Links",
        paragraphs: [
          "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any site you visit.",
        ],
      },
      {
        heading: "Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date above. Your continued use of our website after changes are posted means you accept the updated policy.",
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `If you have questions about this Privacy Policy or how we handle your information, contact us at ${BUSINESS.phone} or ${BUSINESS.email}.`,
        ],
      },
    ],
  },
  es: {
    eyebrow: "Su Privacidad",
    title: "Política de Privacidad",
    lastUpdatedLabel: "Última actualización:",
    intro: `Esta Política de Privacidad explica cómo ${BUSINESS.name} ("nosotros" o "nuestro") recopila, usa, comparte y protege su información cuando visita nuestro sitio web o envía nuestro formulario de admisión en línea. Al usar nuestro sitio web o proporcionarnos información, usted acepta las prácticas descritas a continuación.`,
    sections: [
      {
        heading: "Información Que Recopilamos",
        paragraphs: [
          "Cuando se comunica con nosotros o completa nuestro formulario de admisión, recopilamos la información que usted decide proporcionar. Esto incluye su nombre, número de teléfono, correo electrónico, método de contacto preferido y detalles sobre los servicios de preparación de documentos que solicita.",
          "Según el servicio, nuestro formulario puede solicitar detalles delicados que usted comparte de forma voluntaria, como información sobre su familia, matrimonio, hijos, propiedades, finanzas, estatus migratorio o situación de alquiler. Usted decide qué compartir; puede dejar en blanco los campos opcionales o comunicarse con nosotros por teléfono.",
          "También recibimos automáticamente información técnica limitada, como el tipo de navegador y las páginas que visita, a través del funcionamiento normal del sitio web y nuestro proveedor de alojamiento.",
        ],
      },
      {
        heading: "Cómo Usamos Su Información",
        paragraphs: [
          "Usamos la información que proporciona para responder a su consulta, dar seguimiento a su solicitud, preparar los documentos que nos pide preparar bajo su dirección, comunicarnos con usted sobre su asunto y mejorar nuestros servicios.",
          "No vendemos su información personal ni la usamos para fines no relacionados con los servicios que solicita.",
        ],
      },
      {
        heading: "Consentimiento para Comunicaciones",
        paragraphs: [
          "Cuando envía nuestro formulario y marca la casilla de consentimiento de contacto, nos autoriza a comunicarnos con usted por teléfono, mensaje de texto (SMS) y correo electrónico mediante la información de contacto que proporciona, incluso para dar seguimiento a su solicitud.",
          "Pueden aplicar tarifas de mensajes y datos. La frecuencia de los mensajes varía. Puede cancelar los mensajes de texto en cualquier momento respondiendo STOP, y puede pedirnos que dejemos de contactarlo por teléfono o correo electrónico diciéndonoslo directamente. El consentimiento para recibir mensajes no es una condición para usar nuestros servicios.",
        ],
      },
      {
        heading: "Cómo Compartimos la Información",
        paragraphs: [
          "Compartimos su información únicamente con proveedores de servicios de confianza que nos ayudan a operar nuestro negocio —por ejemplo, nuestra plataforma de gestión de clientes y comunicaciones, nuestro proveedor de alojamiento web y proveedores similares— y solo en la medida necesaria para que presten servicios en nuestro nombre.",
          "También podemos divulgar información si la ley lo exige, para cumplir con un proceso legal o para proteger nuestros derechos, seguridad o la seguridad de otros. No vendemos ni alquilamos su información personal a terceros.",
        ],
      },
      {
        heading: "Conservación de Datos",
        paragraphs: [
          "Conservamos su información solo durante el tiempo necesario para responder a su solicitud, prestar los servicios que pide y cumplir con nuestras obligaciones legales y de mantenimiento de registros. Cuando la información ya no se necesita, tomamos medidas razonables para eliminarla o almacenarla de forma segura.",
        ],
      },
      {
        heading: "Cómo Protegemos Su Información",
        paragraphs: [
          "Usamos medidas administrativas y técnicas razonables para proteger la información que comparte, incluida la transmisión cifrada (HTTPS) de los envíos del formulario. Sin embargo, ningún método de transmisión o almacenamiento es completamente seguro y no podemos garantizar una seguridad absoluta.",
        ],
      },
      {
        heading: "Sus Opciones y Derechos de Privacidad en California",
        paragraphs: [
          "Puede solicitar que accedamos, corrijamos o eliminemos la información personal que nos ha proporcionado comunicándose con nosotros mediante los datos que aparecen a continuación. Los residentes de California pueden tener derechos adicionales bajo la Ley de Privacidad del Consumidor de California (CCPA), incluido el derecho a saber qué información personal recopilamos y a solicitar su eliminación, sujeto a las excepciones legales.",
          "No lo discriminaremos por ejercer cualquiera de estos derechos.",
        ],
      },
      {
        heading: "Privacidad de los Menores",
        paragraphs: [
          "Nuestro sitio web y servicios están destinados a adultos. No recopilamos a sabiendas información personal de menores. Si cree que un menor nos ha proporcionado información personal, comuníquese con nosotros para que podamos eliminarla.",
        ],
      },
      {
        heading: "Enlaces a Terceros",
        paragraphs: [
          "Nuestro sitio web puede contener enlaces a sitios de terceros. No somos responsables de las prácticas de privacidad ni del contenido de esos sitios. Le recomendamos revisar la política de privacidad de cualquier sitio que visite.",
        ],
      },
      {
        heading: "Cambios a Esta Política",
        paragraphs: [
          "Podemos actualizar esta Política de Privacidad de vez en cuando. Cuando lo hagamos, revisaremos la fecha de “Última actualización” que aparece arriba. El uso continuo de nuestro sitio web después de publicar los cambios significa que acepta la política actualizada.",
        ],
      },
      {
        heading: "Contáctenos",
        paragraphs: [
          `Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos su información, comuníquese con nosotros al ${BUSINESS.phone} o ${BUSINESS.email}.`,
        ],
      },
    ],
  },
};

export default async function PrivacyPage() {
  const lang: Language = await getServerLocale();
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
