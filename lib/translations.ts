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

  // Services page
  services_page_eyebrow: "What We Prepare",
  services_page_h1: "Document Preparation Services",
  services_page_sub:
    "We prepare court forms, administrative paperwork, and other documents at your direction. Below is a complete list of the document types we work with.",
  services_page_what_it_is: "What It Is",
  services_page_documents: "Documents We Prepare",
  services_page_who_for: "Who This Is For",
  services_page_note_label: "Note:",
  services_page_note_body:
    "We prepare documents at your direction. We do not provide legal advice.",
  services_page_get_help: "Get Help With",

  // About page
  about_eyebrow: "About Us",
  about_h1_lead: "About",
  about_mission_eyebrow: "Our Mission",
  about_mission_heading: "Making professional document preparation accessible.",
  about_mission_body:
    "Our mission is to make professional document preparation accessible and affordable. We help individuals and families navigate complicated paperwork with confidence — preparing documents that are clean, organized, and ready for submission.",
  about_team_eyebrow: "Our Team",
  about_team_heading: "The people behind the work.",
  about_why_eyebrow: "Why We Started",
  about_why_heading: "Built to serve our community.",
  about_why_body_lead: "",
  about_why_body_tail:
    "was founded to give individuals and families access to professional document preparation services without the confusion and high cost of doing everything alone. We believe everyone deserves organized, accurate, and professionally prepared paperwork — regardless of their budget.",
  about_disclosure_title: "LDA Disclosure",

  // Branch fields — common option labels
  opt_yes: "Yes",
  opt_no: "No",
  opt_not_sure: "Not sure",
  opt_not_sure_yet: "Not sure yet",
  opt_partially: "Partially",
  opt_uncontested: "Uncontested",
  opt_contested: "Contested",
  opt_landlord: "Landlord",
  opt_tenant: "Tenant",
  opt_residential: "Residential",
  opt_commercial: "Commercial",
  opt_myself: "Myself",
  opt_family_member: "Family member",
  opt_both: "Both",
  opt_individual: "Individual",
  opt_married_couple: "Married couple",

  // Step 3 — Divorce
  div_q_type: "Is this a joint/uncontested divorce or is the other party contesting?",
  div_q_children: "Do you and your spouse have minor children together?",
  div_q_children_count: "How many children?",
  div_q_children_ages: "Ages of children",
  div_q_children_ages_placeholder: "e.g. 5, 8, 12",
  div_q_property: "Do you own real property together (home, land)?",
  div_q_assets:
    "Do you have retirement accounts, pensions, or significant assets to divide?",
  div_q_marriage_length: "Approximately how long were you married?",
  div_q_marriage_placeholder: "Select length…",
  div_q_filing_county: "What county will you be filing in?",
  div_q_filing_county_placeholder: "Select county…",
  div_q_filed_paperwork: "Have you already filed any paperwork with the court?",

  // Step 3 — Eviction
  evi_q_party: "Are you the landlord or the tenant?",
  evi_q_property_type: "Is this a residential or commercial property?",
  evi_q_reason: "What is the reason for the eviction?",
  evi_q_reason_placeholder: "Select reason…",
  evi_q_notice_served: "Has a written notice already been served to the tenant?",
  evi_q_notice_type: "What type of notice?",
  evi_q_notice_type_placeholder: "Select notice type…",
  evi_q_notice_date: "Date the notice was served",
  evi_q_county: "What county is the property located in?",
  evi_q_county_placeholder: "Select county…",
  evi_q_tenant_vacated: "Has the tenant already vacated?",
  evi_q_rent: "Approximate monthly rent amount",
  evi_q_rent_placeholder: "Select range…",

  // Step 3 — Immigration
  imm_q_forms: "What type of immigration form do you need help preparing?",
  imm_q_forms_other: "Please describe which other form(s)",
  imm_q_for_whom: "Is this application for yourself or a family member?",
  imm_q_status: "What is your current immigration status?",
  imm_q_status_placeholder: "Select status…",
  imm_q_deadline: "Do you have a filing deadline or appointment date?",
  imm_q_deadline_date: "What is the date?",
  imm_q_previously_filed: "Have you previously filed any immigration forms?",

  // Step 3 — Living Trust
  trust_q_type: "Is this trust for an individual or a couple?",
  trust_q_minors:
    "Do you have minor children or grandchildren you want to include as beneficiaries?",
  trust_q_property: "Do you own real property (home, land, rental property)?",
  trust_q_property_count: "How many properties?",
  trust_q_assets:
    "Do you have significant financial accounts or assets to include?",
  trust_q_existing:
    "Do you already have a will or existing estate planning documents?",
  trust_q_successor: "Who would you like to name as your successor trustee?",

  // Step 3 — POA
  poa_q_types: "What type of Power of Attorney do you need?",
  poa_q_agent: "Who will be the agent (the person given authority)?",
  poa_q_reason_yn:
    "Is there a specific reason or deadline for needing this document?",
  poa_q_reason: "Please describe",
  poa_q_reason_placeholder: 'e.g. "upcoming surgery", "traveling abroad"',
  poa_q_notarize: "Do you need this document notarized?",

  // Step 3 — DMV
  dmv_q_forms: "What type of DMV form do you need help completing?",
  dmv_q_appointment: "Do you have a DMV appointment scheduled?",
  dmv_q_appointment_date: "What is the appointment date?",
  dmv_q_details: "Additional details about what you need",
  dmv_q_details_placeholder: "Optional",

  // Step 3 — Tax
  tax_q_types: "What type of tax document assistance do you need?",
  tax_q_year: "What tax year(s) are involved?",
  tax_q_year_placeholder: "Select year…",
  tax_q_deadline: "Do you have a filing deadline?",
  tax_q_deadline_date: "What is the deadline?",
  tax_q_notes: "Additional notes",

  // Step 3 — Other
  other_q_description:
    "Please describe what documents you need help preparing",
  other_q_deadline: "Do you have a deadline or court date?",
  other_q_deadline_date: "What is the date?",

  // Step 3 — Generic
  branch_no_service: "Please select a service on the previous step.",

  // Review summary labels
  rs_name: "Name",
  rs_phone: "Phone",
  rs_email: "Email",
  rs_preferred_contact: "Preferred contact",
  rs_best_time: "Best time",
  rs_primary_service: "Primary service",
  rs_additional_services: "Additional services",
  rs_divorce_type: "Divorce type",
  rs_minor_children: "Minor children",
  rs_children_count: "Number of children",
  rs_children_ages: "Ages of children",
  rs_real_property: "Real property",
  rs_significant_assets: "Significant assets",
  rs_marriage_length: "Marriage length",
  rs_filing_county: "Filing county",
  rs_already_filed: "Already filed",
  rs_party: "Party",
  rs_property_type: "Property type",
  rs_eviction_reason: "Eviction reason",
  rs_notice_served: "Notice served",
  rs_notice_type: "Notice type",
  rs_notice_date: "Notice date",
  rs_property_county: "Property county",
  rs_tenant_vacated: "Tenant vacated",
  rs_monthly_rent: "Monthly rent",
  rs_immigration_forms: "Immigration forms",
  rs_other_forms_detail: "Other forms detail",
  rs_application_for: "Application for",
  rs_immigration_status: "Immigration status",
  rs_deadline: "Deadline",
  rs_previously_filed: "Previously filed",
  rs_trust_for: "Trust for",
  rs_minor_beneficiaries: "Minor beneficiaries",
  rs_owns_real_property: "Owns real property",
  rs_property_count: "Number of properties",
  rs_existing_estate_docs: "Existing estate docs",
  rs_successor_trustee: "Successor trustee",
  rs_poa_types: "POA types",
  rs_poa_agent: "POA agent",
  rs_poa_reason: "POA reason",
  rs_notarize: "Notarize",
  rs_dmv_forms: "DMV forms",
  rs_dmv_appointment: "DMV appointment",
  rs_dmv_details: "DMV details",
  rs_tax_assistance: "Tax assistance",
  rs_tax_year: "Tax year",
  rs_tax_deadline: "Tax deadline",
  rs_tax_notes: "Tax notes",
  rs_description: "Description",
  rs_your_county: "Your county",
  rs_heard_via: "Heard about us via",
  rs_referred_by: "Referred by",
  rs_additional_notes: "Additional notes",
  rs_late_afternoon_display: "Late Afternoon",

  // Generic placeholders
  placeholder_optional: "Optional",
  placeholder_select: "Select…",
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

  // Services page
  services_page_eyebrow: "Lo Que Preparamos",
  services_page_h1: "Servicios de Preparación de Documentos",
  services_page_sub:
    "Preparamos formularios judiciales, trámites administrativos y otros documentos según sus instrucciones. A continuación se presenta una lista completa de los tipos de documentos con los que trabajamos.",
  services_page_what_it_is: "Qué Es",
  services_page_documents: "Documentos Que Preparamos",
  services_page_who_for: "Para Quién Es",
  services_page_note_label: "Nota:",
  services_page_note_body:
    "Preparamos documentos según sus instrucciones. No brindamos asesoramiento legal.",
  services_page_get_help: "Obtener Ayuda con",

  // About page
  about_eyebrow: "Acerca de Nosotros",
  about_h1_lead: "Acerca de",
  about_mission_eyebrow: "Nuestra Misión",
  about_mission_heading:
    "Hacer accesible la preparación profesional de documentos.",
  about_mission_body:
    "Nuestra misión es hacer que la preparación profesional de documentos sea accesible y asequible. Ayudamos a individuos y familias a navegar trámites complicados con confianza — preparando documentos limpios, organizados y listos para presentar.",
  about_team_eyebrow: "Nuestro Equipo",
  about_team_heading: "Las personas detrás del trabajo.",
  about_why_eyebrow: "Por Qué Empezamos",
  about_why_heading: "Construido para servir a nuestra comunidad.",
  about_why_body_lead: "",
  about_why_body_tail:
    "fue fundada para dar a individuos y familias acceso a servicios profesionales de preparación de documentos sin la confusión y el alto costo de hacerlo todo solos. Creemos que todos merecen trámites organizados, precisos y profesionalmente preparados — sin importar su presupuesto.",
  about_disclosure_title: "Divulgación de LDA",

  // Branch fields — common option labels
  opt_yes: "Sí",
  opt_no: "No",
  opt_not_sure: "No estoy seguro",
  opt_not_sure_yet: "Aún no estoy seguro",
  opt_partially: "Parcialmente",
  opt_uncontested: "Sin oposición",
  opt_contested: "Disputado",
  opt_landlord: "Propietario",
  opt_tenant: "Inquilino",
  opt_residential: "Residencial",
  opt_commercial: "Comercial",
  opt_myself: "Para mí",
  opt_family_member: "Familiar",
  opt_both: "Ambos",
  opt_individual: "Individual",
  opt_married_couple: "Pareja casada",

  // Step 3 — Divorce
  div_q_type:
    "¿Es un divorcio conjunto/sin oposición o la otra parte está disputando?",
  div_q_children: "¿Usted y su cónyuge tienen hijos menores en común?",
  div_q_children_count: "¿Cuántos hijos?",
  div_q_children_ages: "Edades de los hijos",
  div_q_children_ages_placeholder: "ej. 5, 8, 12",
  div_q_property: "¿Poseen bienes inmuebles juntos (casa, terreno)?",
  div_q_assets:
    "¿Tienen cuentas de jubilación, pensiones o bienes significativos para dividir?",
  div_q_marriage_length:
    "¿Aproximadamente cuánto tiempo estuvieron casados?",
  div_q_marriage_placeholder: "Seleccione duración…",
  div_q_filing_county: "¿En qué condado presentará?",
  div_q_filing_county_placeholder: "Seleccione condado…",
  div_q_filed_paperwork:
    "¿Ya ha presentado algún documento ante el tribunal?",

  // Step 3 — Eviction
  evi_q_party: "¿Es usted el propietario o el inquilino?",
  evi_q_property_type: "¿Es una propiedad residencial o comercial?",
  evi_q_reason: "¿Cuál es la razón del desalojo?",
  evi_q_reason_placeholder: "Seleccione razón…",
  evi_q_notice_served:
    "¿Ya se ha entregado un aviso escrito al inquilino?",
  evi_q_notice_type: "¿Qué tipo de aviso?",
  evi_q_notice_type_placeholder: "Seleccione tipo de aviso…",
  evi_q_notice_date: "Fecha en que se entregó el aviso",
  evi_q_county: "¿En qué condado se encuentra la propiedad?",
  evi_q_county_placeholder: "Seleccione condado…",
  evi_q_tenant_vacated: "¿El inquilino ya desocupó?",
  evi_q_rent: "Monto aproximado de alquiler mensual",
  evi_q_rent_placeholder: "Seleccione rango…",

  // Step 3 — Immigration
  imm_q_forms:
    "¿Qué tipo de formulario de inmigración necesita ayuda para preparar?",
  imm_q_forms_other: "Por favor describa cuál(es) otro(s) formulario(s)",
  imm_q_for_whom: "¿Esta solicitud es para usted o un familiar?",
  imm_q_status: "¿Cuál es su estatus migratorio actual?",
  imm_q_status_placeholder: "Seleccione estatus…",
  imm_q_deadline:
    "¿Tiene una fecha límite de presentación o fecha de cita?",
  imm_q_deadline_date: "¿Cuál es la fecha?",
  imm_q_previously_filed:
    "¿Ha presentado formularios de inmigración previamente?",

  // Step 3 — Living Trust
  trust_q_type: "¿Este fideicomiso es para un individuo o una pareja?",
  trust_q_minors:
    "¿Tiene hijos o nietos menores que desea incluir como beneficiarios?",
  trust_q_property:
    "¿Posee bienes inmuebles (casa, terreno, propiedad en alquiler)?",
  trust_q_property_count: "¿Cuántas propiedades?",
  trust_q_assets:
    "¿Tiene cuentas financieras o bienes significativos para incluir?",
  trust_q_existing:
    "¿Ya tiene un testamento o documentos de planificación patrimonial existentes?",
  trust_q_successor:
    "¿A quién le gustaría nombrar como su fideicomisario sucesor?",

  // Step 3 — POA
  poa_q_types: "¿Qué tipo de Poder Notarial necesita?",
  poa_q_agent: "¿Quién será el apoderado (la persona con autoridad)?",
  poa_q_reason_yn:
    "¿Hay una razón o fecha límite específica para necesitar este documento?",
  poa_q_reason: "Por favor describa",
  poa_q_reason_placeholder:
    'ej. "cirugía próxima", "viaje al extranjero"',
  poa_q_notarize: "¿Necesita que este documento sea notariado?",

  // Step 3 — DMV
  dmv_q_forms:
    "¿Qué tipo de formulario del DMV necesita ayuda para completar?",
  dmv_q_appointment: "¿Tiene una cita del DMV programada?",
  dmv_q_appointment_date: "¿Cuál es la fecha de la cita?",
  dmv_q_details: "Detalles adicionales sobre lo que necesita",
  dmv_q_details_placeholder: "Opcional",

  // Step 3 — Tax
  tax_q_types:
    "¿Qué tipo de asistencia con documentos de impuestos necesita?",
  tax_q_year: "¿Qué año(s) fiscal(es) están involucrados?",
  tax_q_year_placeholder: "Seleccione año…",
  tax_q_deadline: "¿Tiene una fecha límite de presentación?",
  tax_q_deadline_date: "¿Cuál es la fecha límite?",
  tax_q_notes: "Notas adicionales",

  // Step 3 — Other
  other_q_description:
    "Por favor describa qué documentos necesita ayuda para preparar",
  other_q_deadline: "¿Tiene una fecha límite o fecha de tribunal?",
  other_q_deadline_date: "¿Cuál es la fecha?",

  // Step 3 — Generic
  branch_no_service: "Por favor seleccione un servicio en el paso anterior.",

  // Review summary labels
  rs_name: "Nombre",
  rs_phone: "Teléfono",
  rs_email: "Correo",
  rs_preferred_contact: "Contacto preferido",
  rs_best_time: "Mejor hora",
  rs_primary_service: "Servicio principal",
  rs_additional_services: "Servicios adicionales",
  rs_divorce_type: "Tipo de divorcio",
  rs_minor_children: "Hijos menores",
  rs_children_count: "Número de hijos",
  rs_children_ages: "Edades de los hijos",
  rs_real_property: "Bienes inmuebles",
  rs_significant_assets: "Bienes significativos",
  rs_marriage_length: "Duración del matrimonio",
  rs_filing_county: "Condado de presentación",
  rs_already_filed: "Ya presentado",
  rs_party: "Parte",
  rs_property_type: "Tipo de propiedad",
  rs_eviction_reason: "Razón del desalojo",
  rs_notice_served: "Aviso entregado",
  rs_notice_type: "Tipo de aviso",
  rs_notice_date: "Fecha del aviso",
  rs_property_county: "Condado de la propiedad",
  rs_tenant_vacated: "Inquilino desocupó",
  rs_monthly_rent: "Alquiler mensual",
  rs_immigration_forms: "Formularios de inmigración",
  rs_other_forms_detail: "Detalle de otros formularios",
  rs_application_for: "Solicitud para",
  rs_immigration_status: "Estatus migratorio",
  rs_deadline: "Fecha límite",
  rs_previously_filed: "Presentado previamente",
  rs_trust_for: "Fideicomiso para",
  rs_minor_beneficiaries: "Beneficiarios menores",
  rs_owns_real_property: "Posee bienes inmuebles",
  rs_property_count: "Número de propiedades",
  rs_existing_estate_docs: "Documentos patrimoniales existentes",
  rs_successor_trustee: "Fideicomisario sucesor",
  rs_poa_types: "Tipos de Poder",
  rs_poa_agent: "Apoderado",
  rs_poa_reason: "Razón del Poder",
  rs_notarize: "Notarizar",
  rs_dmv_forms: "Formularios del DMV",
  rs_dmv_appointment: "Cita del DMV",
  rs_dmv_details: "Detalles del DMV",
  rs_tax_assistance: "Asistencia de impuestos",
  rs_tax_year: "Año fiscal",
  rs_tax_deadline: "Fecha límite de impuestos",
  rs_tax_notes: "Notas de impuestos",
  rs_description: "Descripción",
  rs_your_county: "Su condado",
  rs_heard_via: "Se enteró de nosotros vía",
  rs_referred_by: "Referido por",
  rs_additional_notes: "Notas adicionales",
  rs_late_afternoon_display: "Tarde-Noche",

  // Generic placeholders
  placeholder_optional: "Opcional",
  placeholder_select: "Seleccione…",
};

export const translations = { en, es } as const;

export type TranslationKey = keyof typeof en;

// Radio / select option values displayed to the user. The stored value is
// always the English string (matches the Zod enum); this map only translates
// the visible label.
export const OPTION_LABELS: Record<string, { en: string; es: string }> = {
  Yes: { en: "Yes", es: "Sí" },
  No: { en: "No", es: "No" },
  "Not sure": { en: "Not sure", es: "No estoy seguro" },
  "Not sure yet": { en: "Not sure yet", es: "Aún no estoy seguro" },
  Partially: { en: "Partially", es: "Parcialmente" },
  Uncontested: { en: "Uncontested", es: "Sin oposición" },
  Contested: { en: "Contested", es: "Disputado" },
  Landlord: { en: "Landlord", es: "Propietario" },
  Tenant: { en: "Tenant", es: "Inquilino" },
  Residential: { en: "Residential", es: "Residencial" },
  Commercial: { en: "Commercial", es: "Comercial" },
  Myself: { en: "Myself", es: "Para mí" },
  "Family member": { en: "Family member", es: "Familiar" },
  Both: { en: "Both", es: "Ambos" },
  Individual: { en: "Individual", es: "Individual" },
  "Married couple": { en: "Married couple", es: "Pareja casada" },

  // Marriage length
  "Less than 1 year": { en: "Less than 1 year", es: "Menos de 1 año" },
  "1-5 years": { en: "1-5 years", es: "1-5 años" },
  "5-10 years": { en: "5-10 years", es: "5-10 años" },
  "10-20 years": { en: "10-20 years", es: "10-20 años" },
  "20+ years": { en: "20+ years", es: "20+ años" },

  // Eviction reasons
  "Non-payment of rent": {
    en: "Non-payment of rent",
    es: "Falta de pago del alquiler",
  },
  "Lease violation": { en: "Lease violation", es: "Violación del contrato" },
  "End of lease": { en: "End of lease", es: "Fin del contrato" },
  "Owner move-in": { en: "Owner move-in", es: "Mudanza del propietario" },
  Other: { en: "Other", es: "Otro" },

  // Notice types — keep form numbering identical (3-Day, 30-Day, etc.)
  "3-Day Notice to Pay or Quit": {
    en: "3-Day Notice to Pay or Quit",
    es: "Aviso de 3 días para Pagar o Desalojar",
  },
  "3-Day Notice to Cure": {
    en: "3-Day Notice to Cure",
    es: "Aviso de 3 días para Corregir",
  },
  "30-Day Notice": { en: "30-Day Notice", es: "Aviso de 30 días" },
  "60-Day Notice": { en: "60-Day Notice", es: "Aviso de 60 días" },

  // Rent ranges
  "Under $1,000": { en: "Under $1,000", es: "Menos de $1,000" },
  "$1,000-$2,000": { en: "$1,000-$2,000", es: "$1,000-$2,000" },
  "$2,000-$3,000": { en: "$2,000-$3,000", es: "$2,000-$3,000" },
  "$3,000+": { en: "$3,000+", es: "$3,000+" },
  "Prefer not to say": { en: "Prefer not to say", es: "Prefiero no decir" },

  // Immigration statuses
  "US Citizen": { en: "US Citizen", es: "Ciudadano estadounidense" },
  "Lawful Permanent Resident": {
    en: "Lawful Permanent Resident",
    es: "Residente Permanente Legal",
  },
  DACA: { en: "DACA", es: "DACA" },
  Pending: { en: "Pending", es: "En trámite" },
  "Visa holder": { en: "Visa holder", es: "Titular de visa" },

  // Immigration forms (display only — values stay English for GHL)
  "I-130 (Petition for Alien Relative)": {
    en: "I-130 (Petition for Alien Relative)",
    es: "I-130 (Petición para Familiar)",
  },
  "I-485 (Adjustment of Status)": {
    en: "I-485 (Adjustment of Status)",
    es: "I-485 (Ajuste de Estatus)",
  },
  "N-400 (Naturalization Application)": {
    en: "N-400 (Naturalization Application)",
    es: "N-400 (Solicitud de Naturalización)",
  },
  "I-131 (Travel Document/Advance Parole)": {
    en: "I-131 (Travel Document/Advance Parole)",
    es: "I-131 (Documento de Viaje/Permiso Adelantado)",
  },
  "I-765 (Employment Authorization)": {
    en: "I-765 (Employment Authorization)",
    es: "I-765 (Autorización de Empleo)",
  },
  "DACA Renewal": { en: "DACA Renewal", es: "Renovación de DACA" },
  "I-751 (Remove Conditions on Residence)": {
    en: "I-751 (Remove Conditions on Residence)",
    es: "I-751 (Remover Condiciones de Residencia)",
  },
  "Other / Not Sure": { en: "Other / Not Sure", es: "Otro / No estoy seguro" },

  // POA types
  "General / Financial Power of Attorney": {
    en: "General / Financial Power of Attorney",
    es: "Poder General / Financiero",
  },
  "Durable Power of Attorney": {
    en: "Durable Power of Attorney",
    es: "Poder Duradero",
  },
  "Healthcare Directive / Advance Directive": {
    en: "Healthcare Directive / Advance Directive",
    es: "Directiva de Salud / Directiva Anticipada",
  },
  "Limited Power of Attorney (specific purpose)": {
    en: "Limited Power of Attorney (specific purpose)",
    es: "Poder Limitado (propósito específico)",
  },
  "Not sure — I need help understanding the options": {
    en: "Not sure — I need help understanding the options",
    es: "No estoy seguro — necesito ayuda para entender las opciones",
  },

  // Agent options
  "Spouse/partner": { en: "Spouse/partner", es: "Cónyuge/pareja" },
  "Adult child": { en: "Adult child", es: "Hijo adulto" },
  "Other family member": {
    en: "Other family member",
    es: "Otro familiar",
  },
  Friend: { en: "Friend", es: "Amigo" },
  Professional: { en: "Professional", es: "Profesional" },

  // DMV forms
  "Vehicle title transfer": {
    en: "Vehicle title transfer",
    es: "Transferencia de título de vehículo",
  },
  "Registration forms": { en: "Registration forms", es: "Formularios de registro" },
  "Address change": { en: "Address change", es: "Cambio de dirección" },
  "License plate application": {
    en: "License plate application",
    es: "Solicitud de placa",
  },
  "Disabled placard application": {
    en: "Disabled placard application",
    es: "Solicitud de placa para discapacitados",
  },
  "Other DMV paperwork": {
    en: "Other DMV paperwork",
    es: "Otros trámites del DMV",
  },

  // Tax types
  "Organizing/sorting tax documents": {
    en: "Organizing/sorting tax documents",
    es: "Organización/clasificación de documentos de impuestos",
  },
  "Completing tax forms (clerical preparation only — client submits)": {
    en: "Completing tax forms (clerical preparation only — client submits)",
    es: "Completar formularios de impuestos (preparación clerical solamente — el cliente presenta)",
  },
  "Prior year document organization": {
    en: "Prior year document organization",
    es: "Organización de documentos de años anteriores",
  },
  "Other clerical tax assistance": {
    en: "Other clerical tax assistance",
    es: "Otra asistencia clerical de impuestos",
  },

  // Tax years
  "2024": { en: "2024", es: "2024" },
  "2023": { en: "2023", es: "2023" },
  "2022": { en: "2022", es: "2022" },
  "Multiple years": { en: "Multiple years", es: "Múltiples años" },

  // Contact method (also used by ReviewSummary)
  Phone: { en: "Phone", es: "Teléfono" },
  Email: { en: "Email", es: "Correo" },
  Text: { en: "Text", es: "Mensaje de texto" },

  // Best time
  Morning: { en: "Morning", es: "Mañana" },
  Afternoon: { en: "Afternoon", es: "Tarde" },
  LateAfternoon: { en: "Late Afternoon", es: "Tarde-Noche" },

  // Counties (commonly unchanged; included for completeness)
  Sonoma: { en: "Sonoma", es: "Sonoma" },
  Napa: { en: "Napa", es: "Napa" },
  Marin: { en: "Marin", es: "Marin" },
  Alameda: { en: "Alameda", es: "Alameda" },
  "Contra Costa": { en: "Contra Costa", es: "Contra Costa" },
  "San Francisco": { en: "San Francisco", es: "San Francisco" },
  Sacramento: { en: "Sacramento", es: "Sacramento" },
  Solano: { en: "Solano", es: "Solano" },

  // Referral sources
  "Google Search": { en: "Google Search", es: "Búsqueda en Google" },
  "Social Media": { en: "Social Media", es: "Redes sociales" },
  Referral: { en: "Referral", es: "Referencia" },
  Nextdoor: { en: "Nextdoor", es: "Nextdoor" },
};

export function optionLabel(value: string, lang: Language): string {
  return OPTION_LABELS[value]?.[lang] ?? value;
}

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
