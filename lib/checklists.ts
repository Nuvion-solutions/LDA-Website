// Personalized document checklists shown on the intake success page,
// keyed by the primaryService value selected in Step 2 of the intake form.

import type { Language } from "./translations";

export type ServiceChecklist = {
  title: string;
  intro: string;
  items: string[];
  note: string;
  titleEs: string;
  introEs: string;
  itemsEs: string[];
  noteEs: string;
};

export const SERVICE_CHECKLISTS: Record<string, ServiceChecklist> = {
  "Divorce & Family Law Documents": {
    title: "Documents to Gather for Your Divorce Paperwork",
    intro: "Having these ready will help us prepare your documents faster:",
    items: [
      "Marriage certificate",
      "Full legal names and dates of birth for both parties",
      "Current addresses for both parties",
      "List of all real property (addresses, estimated values)",
      "List of financial accounts (bank, retirement, investments)",
      "Vehicle information (make, model, year, estimated value)",
      "Children's full legal names and dates of birth (if applicable)",
      "Any existing court orders or agreements between the parties",
      "Approximate date of separation",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
    titleEs: "Documentos a Reunir para Sus Trámites de Divorcio",
    introEs:
      "Tener esto listo nos ayudará a preparar sus documentos más rápido:",
    itemsEs: [
      "Certificado de matrimonio",
      "Nombres legales completos y fechas de nacimiento de ambas partes",
      "Direcciones actuales de ambas partes",
      "Lista de toda propiedad inmueble (direcciones, valores estimados)",
      "Lista de cuentas financieras (banco, jubilación, inversiones)",
      "Información de vehículos (marca, modelo, año, valor estimado)",
      "Nombres legales completos y fechas de nacimiento de los hijos (si aplica)",
      "Cualquier orden judicial o acuerdo existente entre las partes",
      "Fecha aproximada de separación",
    ],
    noteEs:
      "No necesita todo esto para comenzar — traiga lo que tenga y le guiaremos con el resto.",
  },
  "Eviction (Unlawful Detainer) Paperwork": {
    title: "Documents to Gather for Your Eviction Paperwork",
    intro: "Please have the following available when we follow up:",
    items: [
      "Copy of the current lease or rental agreement",
      "Tenant's full legal name(s) as they appear on the lease",
      "Full address of the rental property",
      "Record of rent payments (or non-payments)",
      "Copy of any notice(s) already served to the tenant",
      "Date(s) the notice(s) were served and how they were served",
      "Any written communications with the tenant about the issue",
    ],
    note:
      "If you've already served a notice, bring a copy — the date and method of service are important for the paperwork.",
    titleEs: "Documentos a Reunir para Sus Trámites de Desalojo",
    introEs:
      "Por favor tenga disponible lo siguiente cuando le contactemos:",
    itemsEs: [
      "Copia del contrato de arrendamiento actual",
      "Nombre(s) legal(es) completo(s) del inquilino tal como aparecen en el contrato",
      "Dirección completa de la propiedad en alquiler",
      "Registro de pagos de alquiler (o impagos)",
      "Copia de cualquier aviso ya entregado al inquilino",
      "Fecha(s) en que se entregaron los avisos y cómo se entregaron",
      "Cualquier comunicación escrita con el inquilino sobre el problema",
    ],
    noteEs:
      "Si ya entregó un aviso, traiga una copia — la fecha y el método de entrega son importantes para los trámites.",
  },
  "Immigration Documents": {
    title: "Documents to Gather for Your Immigration Paperwork",
    intro:
      "The exact documents needed depend on which forms you're filing, but generally you'll need:",
    items: [
      "Valid government-issued photo ID",
      "Passport (yours and any family members involved)",
      "Birth certificates for all applicants",
      "Marriage certificate (if filing for a spouse)",
      "Any prior immigration documents (visa, green card, prior applications)",
      "USCIS receipt notices for any pending applications",
      "Proof of address (utility bill, lease, bank statement)",
      "Two passport-sized photos per applicant",
    ],
    note:
      "Immigration forms have specific photo and document requirements. We'll confirm exactly what's needed for your specific forms when we follow up.",
    titleEs: "Documentos a Reunir para Sus Trámites de Inmigración",
    introEs:
      "Los documentos exactos necesarios dependen de los formularios que presente, pero generalmente necesitará:",
    itemsEs: [
      "Identificación con foto válida emitida por el gobierno",
      "Pasaporte (suyo y de los familiares involucrados)",
      "Certificados de nacimiento de todos los solicitantes",
      "Certificado de matrimonio (si presenta para un cónyuge)",
      "Cualquier documento de inmigración previo (visa, residencia, solicitudes anteriores)",
      "Avisos de recibo de USCIS para cualquier solicitud pendiente",
      "Comprobante de domicilio (factura de servicios, contrato, estado bancario)",
      "Dos fotos tamaño pasaporte por solicitante",
    ],
    noteEs:
      "Los formularios de inmigración tienen requisitos específicos de fotos y documentos. Confirmaremos exactamente qué se necesita para sus formularios específicos cuando le contactemos.",
  },
  "Living Trust Documents": {
    title: "Documents to Gather for Your Living Trust",
    intro: "To prepare your trust documents, please gather:",
    items: [
      "Full legal names and dates of birth for all trustees and beneficiaries",
      "Addresses for all trustees and beneficiaries",
      "Deeds or titles for any real property to be included",
      "List of financial accounts you want to include (account numbers not required yet)",
      "Vehicle titles (if including vehicles)",
      "Names and contact information for your successor trustee(s)",
      "Names and ages of any minor beneficiaries",
      "Existing will or estate documents (if any)",
    ],
    note:
      "We prepare the documents at your direction. You decide what goes into your trust — we handle the paperwork.",
    titleEs: "Documentos a Reunir para Su Fideicomiso en Vida",
    introEs: "Para preparar sus documentos de fideicomiso, por favor reúna:",
    itemsEs: [
      "Nombres legales completos y fechas de nacimiento de todos los fideicomisarios y beneficiarios",
      "Direcciones de todos los fideicomisarios y beneficiarios",
      "Escrituras o títulos de cualquier propiedad inmueble a incluir",
      "Lista de cuentas financieras que desea incluir (números de cuenta aún no requeridos)",
      "Títulos de vehículos (si incluye vehículos)",
      "Nombres e información de contacto de su(s) fideicomisario(s) sucesor(es)",
      "Nombres y edades de beneficiarios menores de edad",
      "Testamento o documentos patrimoniales existentes (si los hay)",
    ],
    noteEs:
      "Preparamos los documentos según sus instrucciones. Usted decide qué incluye su fideicomiso — nosotros manejamos los trámites.",
  },
  "Power of Attorney": {
    title: "Documents to Gather for Your Power of Attorney",
    intro: "Please have the following ready:",
    items: [
      'Full legal name and date of birth of the person granting authority (the "principal")',
      'Full legal name and contact information of the person receiving authority (the "agent")',
      "Government-issued ID for the principal",
      "Description of the specific powers or limitations you want to include (if any)",
      "Name of an alternate agent (recommended in case your first choice is unavailable)",
    ],
    note:
      "Power of Attorney documents typically require notarization. We can help prepare the document — you'll arrange notarization separately.",
    titleEs: "Documentos a Reunir para Su Poder Notarial",
    introEs: "Por favor tenga listo lo siguiente:",
    itemsEs: [
      'Nombre legal completo y fecha de nacimiento de la persona que otorga la autoridad (el "poderdante")',
      'Nombre legal completo e información de contacto de la persona que recibe la autoridad (el "apoderado")',
      "Identificación emitida por el gobierno del poderdante",
      "Descripción de los poderes o limitaciones específicas que desea incluir (si aplica)",
      "Nombre de un apoderado alterno (recomendado en caso de que su primera opción no esté disponible)",
    ],
    noteEs:
      "Los documentos de Poder Notarial generalmente requieren notarización. Podemos ayudar a preparar el documento — usted coordinará la notarización por separado.",
  },
  "DMV Form Assistance": {
    title: "Documents to Gather for DMV Form Assistance",
    intro: "Depending on your DMV matter, you may need:",
    items: [
      "Current vehicle title or pink slip",
      "Valid government-issued photo ID",
      "Current vehicle registration",
      "Proof of insurance",
      "Bill of sale (for transfers)",
      "Release of liability (if selling a vehicle)",
      "DMV appointment confirmation (if you have one)",
    ],
    note:
      "We help you complete the forms — you submit them to the DMV directly.",
    titleEs: "Documentos a Reunir para Asistencia con Formularios del DMV",
    introEs: "Dependiendo de su asunto en el DMV, puede necesitar:",
    itemsEs: [
      "Título actual del vehículo o pink slip",
      "Identificación con foto válida emitida por el gobierno",
      "Registro actual del vehículo",
      "Comprobante de seguro",
      "Comprobante de venta (para transferencias)",
      "Liberación de responsabilidad (si vende un vehículo)",
      "Confirmación de cita del DMV (si tiene una)",
    ],
    noteEs:
      "Le ayudamos a completar los formularios — usted los presenta directamente al DMV.",
  },
  "Tax Document Organization (Clerical)": {
    title: "Documents to Gather for Tax Document Organization",
    intro: "Please gather the following:",
    items: [
      "All W-2 forms from employers",
      "1099 forms (interest, dividends, contract work, etc.)",
      "Prior year tax return (for reference)",
      "Social Security numbers for yourself and dependents",
      "Receipts or records for any deductions you're claiming",
      "Any IRS or state tax notices received",
      "Bank statements if needed for income verification",
    ],
    note:
      "We provide clerical organization and document preparation assistance only. We do not provide tax advice. You submit all tax documents directly.",
    titleEs: "Documentos a Reunir para Organización de Documentos de Impuestos",
    introEs: "Por favor reúna lo siguiente:",
    itemsEs: [
      "Todos los formularios W-2 de los empleadores",
      "Formularios 1099 (intereses, dividendos, trabajo por contrato, etc.)",
      "Declaración de impuestos del año anterior (como referencia)",
      "Números de Seguro Social para usted y sus dependientes",
      "Recibos o registros de cualquier deducción que reclame",
      "Cualquier aviso del IRS o impuestos estatales recibido",
      "Estados bancarios si se necesitan para verificación de ingresos",
    ],
    noteEs:
      "Solo brindamos organización clerical y asistencia en la preparación de documentos. No brindamos asesoría fiscal. Usted presenta todos los documentos de impuestos directamente.",
  },
  default: {
    title: "Documents to Gather",
    intro: "While we review your intake, start gathering:",
    items: [
      "Valid government-issued photo ID",
      "Any existing documents related to your matter",
      "Dates and details relevant to your situation",
      "Contact information for any other parties involved",
    ],
    note:
      "We'll follow up within 1 business day with specific requirements for your documents.",
    titleEs: "Documentos a Reunir",
    introEs: "Mientras revisamos su solicitud, comience a reunir:",
    itemsEs: [
      "Identificación con foto válida emitida por el gobierno",
      "Cualquier documento existente relacionado con su asunto",
      "Fechas y detalles relevantes a su situación",
      "Información de contacto de otras partes involucradas",
    ],
    noteEs:
      "Le contactaremos dentro de 1 día hábil con los requisitos específicos para sus documentos.",
  },
};

// Localized checklist accessors — fall back to English if Spanish missing.
export function checklistTitle(
  c: ServiceChecklist,
  lang: Language,
): string {
  return lang === "es" ? c.titleEs || c.title : c.title;
}

export function checklistIntro(
  c: ServiceChecklist,
  lang: Language,
): string {
  return lang === "es" ? c.introEs || c.intro : c.intro;
}

export function checklistItems(
  c: ServiceChecklist,
  lang: Language,
): string[] {
  return lang === "es" ? c.itemsEs || c.items : c.items;
}

export function checklistNote(
  c: ServiceChecklist,
  lang: Language,
): string {
  return lang === "es" ? c.noteEs || c.note : c.note;
}
