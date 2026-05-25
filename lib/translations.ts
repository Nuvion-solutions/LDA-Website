// Site-wide UI translations. The English copy is the source of truth;
// Spanish is provided for the language toggle in the Nav.
// Keep all forbidden English terms (attorney, lawyer, legal advice, legal
// counsel, represent, representation, practice of law) confined to the
// required disclaimer strings only. The Spanish equivalents ("abogados",
// "asesoramiento legal", "representación legal") are likewise only used
// inside the corresponding required disclaimers.

export type Language = "en" | "es";

const en = {
  // Nav
  nav_services: "Services",
  nav_about: "About",
  nav_cta: "Start Your Intake",
  nav_lang_toggle: "Español",
  nav_menu_open: "Open menu",
  nav_menu_close: "Close menu",

  // Hero
  hero_label: "Registered Legal Document Assistant · LDA #87 · Sonoma County",
  hero_headline_1: "Professional Document",
  hero_headline_2: "Preparation You Can",
  hero_headline_3: "Count On.",
  hero_subhead:
    "California Legal Document Excellence, LLC helps individuals and families prepare court forms, documents, and administrative paperwork — accurately, professionally, and at your direction.",
  hero_cta_primary: "Start Your Intake",
  hero_cta_secondary: "Call",
  hero_trust_1: "LDA #87 Registered",
  hero_trust_2: "Sonoma County",
  hero_trust_3: "Free Consultation",
  hero_trust_4: "Remote Services Available",

  // Services preview
  services_eyebrow: "Our Services",
  services_heading: "How We Can Help",
  services_sub:
    "We prepare a wide range of court and administrative documents at your direction — clean, polished, and ready for your review.",
  services_learn_more: "Learn More",

  // Process
  process_eyebrow: "The Process",
  process_heading: "How It Works",
  process_sub:
    "A clear, simple process from your first call to the final filing — so you always know what comes next.",
  process_1_title: "Free Consultation",
  process_1_body: "Tell us what documents you need prepared.",
  process_2_title: "Document Preparation",
  process_2_body: "We prepare your paperwork carefully and professionally.",
  process_3_title: "Client Review & Signing",
  process_3_body: "You review, approve, and sign your documents.",
  process_4_title: "You Submit",
  process_4_body: "You file and submit your documents directly.",

  // Why choose us
  why_eyebrow: "Why Choose Us",
  why_heading: "Trusted Document Preparation",
  why_1_title: "Detail-Oriented",
  why_1_body:
    "We take time to prepare documents carefully, with clean formatting and accurate information.",
  why_2_title: "Affordable",
  why_2_body:
    "Professional document preparation at a fraction of the cost of doing it through other channels.",
  why_3_title: "Clear Communication",
  why_3_body:
    "We keep you informed at every step so you always know where your documents stand.",

  // FAQ
  faq_eyebrow: "Common Questions",
  faq_heading: "Frequently Asked Questions",

  // CTA banner
  cta_heading: "Ready to Get Your Documents Prepared?",
  cta_sub:
    "Start with a free consultation — tell us what you need and we'll take care of the rest. Pricing provided after intake — your consultation is free.",
  cta_button: "Start Your Intake",

  // Footer
  footer_col_business: "Business",
  footer_col_quicklinks: "Quick Links",
  footer_col_services: "Services",
  footer_link_services: "Services",
  footer_link_about: "About",
  footer_link_intake: "Start Your Intake",
  footer_link_faq: "FAQ",
  footer_payment_heading: "Payment Methods Accepted",
  footer_disclosure_label: "Important Disclosure:",
  footer_rights: "All rights reserved.",

  // Intake page hero
  intake_eyebrow: "Start Your Intake",
  intake_heading: "Tell us what you need.",
  intake_sub:
    "We'll review your intake and follow up with pricing, required information, and next steps — usually within 1 business day. Pricing provided after intake — your consultation is free.",

  // Intake form — steps & nav
  intake_step_label: "Step",
  intake_step_of: "of",
  intake_step_1: "Contact",
  intake_step_2: "Service",
  intake_step_3: "Details",
  intake_step_4: "General",
  intake_step_5: "Confirm",
  intake_btn_back_home: "Back to home",
  intake_btn_back: "Back",
  intake_btn_continue: "Continue",
  intake_btn_submit: "Submit Intake Request",
  intake_btn_submitting: "Submitting…",

  // Step 1 — Contact
  intake_h_contact: "Contact Information",
  intake_sub_contact: "How can we reach you?",
  intake_f_first: "First Name",
  intake_f_last: "Last Name",
  intake_f_phone: "Phone Number",
  intake_f_email: "Email Address",
  intake_f_contact_method: "Best way to contact you",
  intake_opt_phone: "Phone",
  intake_opt_email: "Email",
  intake_opt_text: "Text",
  intake_f_best_time: "Best time to reach you",
  intake_opt_morning: "Morning (9am – 12pm)",
  intake_opt_afternoon: "Afternoon (12pm – 3pm)",
  intake_opt_late: "Late Afternoon (3pm – 5pm)",
  intake_select_time: "Select a time…",

  // Step 2 — Service
  intake_h_service: "Service Selection",
  intake_sub_service: "What type of document(s) do you need prepared?",
  intake_f_primary_service: "Primary service",
  intake_f_needs_more: "Do you need help with more than one of the above?",
  intake_f_additional_services: "Additional services",
  intake_yes: "Yes",
  intake_no: "No",

  // Step 3 — Details (branch headers)
  intake_h_details: "Service Details",
  intake_sub_details:
    "A few specifics so we can quote and prepare accurately.",

  // Step 4 — General
  intake_h_general: "General Information",
  intake_sub_general: "A few last details to round out your intake.",
  intake_f_client_county: "What county are you located in?",
  intake_f_referral_source: "How did you hear about us?",
  intake_f_referral_name: "Who referred you?",
  intake_f_additional_notes:
    "Is there anything else you'd like us to know?",
  intake_select_county: "Select a county…",
  intake_select_source: "Select a source…",

  // Step 5 — Confirm
  intake_h_confirm: "Review & Confirm",
  intake_sub_confirm:
    "Quick review of what you've told us, then two acknowledgments before you submit.",
  intake_consent_lda:
    "I understand that California Legal Document Excellence, LLC is not a law firm and does not provide legal advice or legal representation. I am directing the preparation of my own documents.",
  intake_consent_contact:
    "I consent to be contacted by phone, email, or text regarding my inquiry.",

  // Submit error
  intake_submit_error_lead:
    "We couldn't submit your intake automatically. Please call us at",
  intake_submit_error_mid: "or email",
  intake_submit_error_tail: "and we'll take it from there.",

  // Success page
  success_thank_you_lead: "Thank you,",
  success_thank_you_tail: "Your intake has been received.",
  success_body:
    "A member of our team will review your request and follow up within 1 business day with pricing, next steps, and any additional information needed.",
  success_contact_lead: "Questions in the meantime? Call us at",
  success_contact_mid: "or email",

  // Urgency banners
  urgency_red_strong: "You have an upcoming deadline.",
  urgency_red_body_1:
    "We will prioritize your intake. Please call us directly at",
  urgency_red_body_2: "to ensure we can assist you in time.",
  urgency_amber_strong: "Your deadline is coming up soon.",
  urgency_amber_body:
    "We'll review your intake as a priority.",

  // Disclaimers
  short_disclaimer:
    "California Legal Document Excellence, LLC is not a law firm and does not provide legal advice or legal representation.",
  full_disclaimer:
    "California Legal Document Excellence, LLC is a Registered Legal Document Assistant (LDA #87, Sonoma County). We are not a law firm and do not provide legal advice, legal representation, or legal counsel. All document preparation services are provided at the client's direction. We are not attorneys.",
} as const;

type Dict = Record<keyof typeof en, string>;

const es: Dict = {
  // Nav
  nav_services: "Servicios",
  nav_about: "Nosotros",
  nav_cta: "Comenzar Solicitud",
  nav_lang_toggle: "English",
  nav_menu_open: "Abrir menú",
  nav_menu_close: "Cerrar menú",

  // Hero
  hero_label: "Asistente Legal Registrado · LDA #87 · Condado de Sonoma",
  hero_headline_1: "Preparación Profesional",
  hero_headline_2: "de Documentos en la que",
  hero_headline_3: "Puede Confiar.",
  hero_subhead:
    "California Legal Document Excellence, LLC ayuda a individuos y familias a preparar formularios judiciales, documentos y trámites administrativos — con precisión, profesionalismo y según sus instrucciones.",
  hero_cta_primary: "Comenzar Solicitud",
  hero_cta_secondary: "Llamar",
  hero_trust_1: "LDA #87 Registrado",
  hero_trust_2: "Condado de Sonoma",
  hero_trust_3: "Consulta Gratuita",
  hero_trust_4: "Servicios Remotos Disponibles",

  // Services preview
  services_eyebrow: "Nuestros Servicios",
  services_heading: "Cómo Podemos Ayudarle",
  services_sub:
    "Preparamos una amplia variedad de documentos judiciales y administrativos según sus instrucciones — limpios, pulidos y listos para su revisión.",
  services_learn_more: "Más Información",

  // Process
  process_eyebrow: "El Proceso",
  process_heading: "Cómo Funciona",
  process_sub:
    "Un proceso claro y simple desde su primera llamada hasta la presentación final — para que siempre sepa qué sigue.",
  process_1_title: "Consulta Gratuita",
  process_1_body: "Díganos qué documentos necesita preparar.",
  process_2_title: "Preparación de Documentos",
  process_2_body:
    "Preparamos sus documentos con cuidado y profesionalismo.",
  process_3_title: "Revisión y Firma del Cliente",
  process_3_body: "Usted revisa, aprueba y firma sus documentos.",
  process_4_title: "Usted Presenta",
  process_4_body: "Usted presenta y entrega sus documentos directamente.",

  // Why choose us
  why_eyebrow: "Por Qué Elegirnos",
  why_heading: "Preparación de Documentos de Confianza",
  why_1_title: "Atentos al Detalle",
  why_1_body:
    "Nos tomamos el tiempo para preparar los documentos con cuidado, con formato limpio e información precisa.",
  why_2_title: "Asequible",
  why_2_body:
    "Preparación profesional de documentos a una fracción del costo de hacerlo por otros canales.",
  why_3_title: "Comunicación Clara",
  why_3_body:
    "Le mantenemos informado en cada paso para que siempre sepa el estado de sus documentos.",

  // FAQ
  faq_eyebrow: "Preguntas Comunes",
  faq_heading: "Preguntas Frecuentes",

  // CTA banner
  cta_heading: "¿Listo para Preparar Sus Documentos?",
  cta_sub:
    "Comience con una consulta gratuita — díganos lo que necesita y nosotros nos encargamos del resto. Precios después de la solicitud — su consulta es gratuita.",
  cta_button: "Comenzar Solicitud",

  // Footer
  footer_col_business: "Negocio",
  footer_col_quicklinks: "Enlaces Rápidos",
  footer_col_services: "Servicios",
  footer_link_services: "Servicios",
  footer_link_about: "Nosotros",
  footer_link_intake: "Comenzar Solicitud",
  footer_link_faq: "Preguntas Frecuentes",
  footer_payment_heading: "Métodos de Pago Aceptados",
  footer_disclosure_label: "Divulgación Importante:",
  footer_rights: "Todos los derechos reservados.",

  // Intake page hero
  intake_eyebrow: "Comenzar Solicitud",
  intake_heading: "Díganos lo que necesita.",
  intake_sub:
    "Revisaremos su solicitud y haremos un seguimiento con precios, información requerida y próximos pasos — generalmente dentro de 1 día hábil. Precios después de la solicitud — su consulta es gratuita.",

  // Intake form — steps & nav
  intake_step_label: "Paso",
  intake_step_of: "de",
  intake_step_1: "Contacto",
  intake_step_2: "Servicio",
  intake_step_3: "Detalles",
  intake_step_4: "General",
  intake_step_5: "Confirmar",
  intake_btn_back_home: "Volver al inicio",
  intake_btn_back: "Atrás",
  intake_btn_continue: "Continuar",
  intake_btn_submit: "Enviar Solicitud",
  intake_btn_submitting: "Enviando…",

  // Step 1 — Contact
  intake_h_contact: "Información de Contacto",
  intake_sub_contact: "¿Cómo podemos comunicarnos con usted?",
  intake_f_first: "Nombre",
  intake_f_last: "Apellido",
  intake_f_phone: "Número de Teléfono",
  intake_f_email: "Correo Electrónico",
  intake_f_contact_method: "Mejor forma de comunicarse con usted",
  intake_opt_phone: "Teléfono",
  intake_opt_email: "Correo",
  intake_opt_text: "Mensaje de texto",
  intake_f_best_time: "Mejor hora para contactarle",
  intake_opt_morning: "Mañana (9am – 12pm)",
  intake_opt_afternoon: "Tarde (12pm – 3pm)",
  intake_opt_late: "Tarde-noche (3pm – 5pm)",
  intake_select_time: "Seleccione una hora…",

  // Step 2 — Service
  intake_h_service: "Selección de Servicio",
  intake_sub_service: "¿Qué tipo de documento(s) necesita preparar?",
  intake_f_primary_service: "Servicio principal",
  intake_f_needs_more: "¿Necesita ayuda con más de uno de los anteriores?",
  intake_f_additional_services: "Servicios adicionales",
  intake_yes: "Sí",
  intake_no: "No",

  // Step 3 — Details
  intake_h_details: "Detalles del Servicio",
  intake_sub_details:
    "Algunos detalles específicos para poder cotizar y preparar con precisión.",

  // Step 4 — General
  intake_h_general: "Información General",
  intake_sub_general: "Unos últimos detalles para completar su solicitud.",
  intake_f_client_county: "¿En qué condado se encuentra?",
  intake_f_referral_source: "¿Cómo se enteró de nosotros?",
  intake_f_referral_name: "¿Quién le refirió?",
  intake_f_additional_notes:
    "¿Hay algo más que le gustaría que sepamos?",
  intake_select_county: "Seleccione un condado…",
  intake_select_source: "Seleccione una fuente…",

  // Step 5 — Confirm
  intake_h_confirm: "Revisar y Confirmar",
  intake_sub_confirm:
    "Una revisión rápida de lo que nos ha dicho, luego dos reconocimientos antes de enviar.",
  intake_consent_lda:
    "Entiendo que California Legal Document Excellence, LLC no es un bufete de abogados y no brinda asesoramiento legal ni representación legal. Estoy dirigiendo la preparación de mis propios documentos.",
  intake_consent_contact:
    "Doy mi consentimiento para ser contactado por teléfono, correo electrónico o mensaje de texto sobre mi consulta.",

  // Submit error
  intake_submit_error_lead:
    "No pudimos enviar su solicitud automáticamente. Por favor llámenos al",
  intake_submit_error_mid: "o envíe un correo a",
  intake_submit_error_tail: "y nos encargaremos de ello.",

  // Success page
  success_thank_you_lead: "Gracias,",
  success_thank_you_tail: "Hemos recibido su solicitud.",
  success_body:
    "Un miembro de nuestro equipo revisará su solicitud y le contactará dentro de 1 día hábil con precios, próximos pasos e información adicional necesaria.",
  success_contact_lead:
    "¿Preguntas mientras tanto? Llámenos al",
  success_contact_mid: "o envíe un correo a",

  // Urgency banners
  urgency_red_strong: "Tiene una fecha límite próxima.",
  urgency_red_body_1:
    "Priorizaremos su solicitud. Por favor llámenos directamente al",
  urgency_red_body_2: "para asegurarnos de poder ayudarle a tiempo.",
  urgency_amber_strong: "Su fecha límite se acerca pronto.",
  urgency_amber_body:
    "Revisaremos su solicitud como prioridad.",

  // Disclaimers
  short_disclaimer:
    "California Legal Document Excellence, LLC no es un bufete de abogados y no brinda asesoramiento legal ni representación legal.",
  full_disclaimer:
    "California Legal Document Excellence, LLC es un Asistente Legal Registrado (LDA #87, Condado de Sonoma). No somos un bufete de abogados y no brindamos asesoramiento legal, representación legal ni consejo legal. Todos los servicios de preparación de documentos se proporcionan según las instrucciones del cliente.",
};

export const translations = { en, es } as const;

export type TranslationKey = keyof typeof en;

// Service names — values stay English (form schema enums), display labels
// are translated.
export const SERVICE_NAME_TRANSLATIONS: Record<string, { en: string; es: string }> = {
  "Divorce & Family Law Documents": {
    en: "Divorce & Family Law Documents",
    es: "Divorcio y Documentos de Derecho Familiar",
  },
  "Eviction (Unlawful Detainer) Paperwork": {
    en: "Eviction (Unlawful Detainer) Paperwork",
    es: "Trámites de Desalojo (Unlawful Detainer)",
  },
  "Immigration Documents": {
    en: "Immigration Documents",
    es: "Documentos de Inmigración",
  },
  "Living Trust Documents": {
    en: "Living Trust Documents",
    es: "Documentos de Fideicomiso en Vida",
  },
  "Power of Attorney": {
    en: "Power of Attorney",
    es: "Poder Notarial",
  },
  "DMV Form Assistance": {
    en: "DMV Form Assistance",
    es: "Asistencia con Formularios del DMV",
  },
  "Tax Document Organization (Clerical)": {
    en: "Tax Document Organization (Clerical)",
    es: "Organización de Documentos de Impuestos (Clerical)",
  },
  "Other / Not Sure": {
    en: "Other / Not Sure",
    es: "Otro / No estoy seguro",
  },
};
