// Shared FAQ data — used by both the visible FAQ component and the
// FAQPage JSON-LD schema so they stay in sync (Google requires matching
// visible content for rich-snippet eligibility).

export type FaqEntry = {
  question: string;
  answer: string;
  // Spanish translation — surfaced via the language toggle.
  questionEs: string;
  answerEs: string;
};

export const FAQS: FaqEntry[] = [
  {
    question: "Are you attorneys?",
    answer:
      "No. California Legal Document Excellence, LLC is not a law firm and does not provide legal advice or legal representation. We are Registered Legal Document Assistants who prepare documents at the client's direction.",
    questionEs: "¿Son abogados?",
    answerEs:
      "No. California Legal Document Excellence, LLC no es un bufete de abogados y no brinda asesoramiento legal ni representación legal. Somos Asistentes Legales Registrados que preparan documentos según las instrucciones del cliente.",
  },
  {
    question: "Can you tell me what I should file?",
    answer:
      "No. We cannot choose forms, give legal strategy, or advise you on your legal rights. You direct us on what documents you want prepared.",
    questionEs: "¿Pueden decirme qué debo presentar?",
    answerEs:
      "No. No podemos elegir formularios, dar estrategia legal ni asesorarle sobre sus derechos legales. Usted nos indica qué documentos desea preparar.",
  },
  {
    question: "What documents do you help prepare?",
    answer:
      "We assist with divorce and family law forms, eviction (unlawful detainer) paperwork, living trusts, wills and health care directives, probate documents, legal name changes, small claims paperwork, guardianship petitions, deeds and property transfers, power of attorney forms, DMV form assistance, and tax document organization (clerical).",
    questionEs: "¿Qué documentos ayudan a preparar?",
    answerEs:
      "Ayudamos con formularios de divorcio y derecho familiar, trámites de desalojo (unlawful detainer), fideicomisos en vida, testamentos y directivas de atención médica, documentos de sucesión, cambios de nombre legal, trámites de reclamos menores, peticiones de tutela, escrituras y transferencias de propiedad, formularios de poder notarial, asistencia con formularios del DMV y organización de documentos de impuestos (clerical).",
  },
  {
    question: "Do you submit the documents for me?",
    answer:
      "No. You review, sign, and submit your own documents. We prepare them at your direction.",
    questionEs: "¿Presentan los documentos por mí?",
    answerEs:
      "No. Usted revisa, firma y presenta sus propios documentos. Nosotros los preparamos según sus instrucciones.",
  },
  {
    question: "How much does document preparation cost?",
    answer:
      "Pricing depends on the type and complexity of the documents. After intake, we provide pricing before beginning any work. Your initial consultation is free.",
    questionEs: "¿Cuánto cuesta la preparación de documentos?",
    answerEs:
      "El precio depende del tipo y la complejidad de los documentos. Después de la solicitud inicial, le proporcionamos el precio antes de comenzar cualquier trabajo. Su consulta inicial es gratuita.",
  },
  {
    question: "How is this different from doing it myself?",
    answer:
      "We help organize the information and prepare the paperwork in a clean, professional, and complete format so you do not have to struggle through confusing forms alone.",
    questionEs: "¿En qué se diferencia esto de hacerlo yo mismo?",
    answerEs:
      "Le ayudamos a organizar la información y preparar los documentos de forma limpia, profesional y completa para que no tenga que lidiar solo con formularios confusos.",
  },
];
