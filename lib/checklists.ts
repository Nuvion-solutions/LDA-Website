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
    title: "Documents to Gather for DMV & Administrative Forms",
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
    titleEs: "Documentos a Reunir para Formularios del DMV y Administrativos",
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
  "Wills & Health Care Directives": {
    title: "Information to Gather for Your Will & Health Care Directive",
    intro: "Having these ready will help us prepare your documents faster:",
    items: [
      "Full legal names of the people you want to inherit (beneficiaries)",
      "Who you want as executor of your will (and a backup)",
      "Guardianship choices for minor children (if applicable)",
      "Who should make medical decisions for you if you can't (health care agent)",
      "A general list of major assets (home, accounts, vehicles)",
      "Any specific gifts you want to leave to specific people",
      "Your existing will or directive, if you have one",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
    titleEs: "Información a Reunir para Su Testamento y Directiva Médica",
    introEs:
      "Tener esto listo nos ayudará a preparar sus documentos más rápido:",
    itemsEs: [
      "Nombres legales completos de las personas que heredarán (beneficiarios)",
      "Quién será el albacea de su testamento (y un suplente)",
      "Opciones de tutela para hijos menores (si aplica)",
      "Quién tomará decisiones médicas por usted si usted no puede (agente de salud)",
      "Una lista general de bienes principales (casa, cuentas, vehículos)",
      "Cualquier regalo específico que desee dejar a personas específicas",
      "Su testamento o directiva existente, si tiene uno",
    ],
    noteEs:
      "No necesita todo esto para comenzar — traiga lo que tenga y le guiaremos con el resto.",
  },
  "Probate Documents": {
    title: "Documents to Gather for Probate Paperwork",
    intro: "Please have the following available when we follow up:",
    items: [
      "Certified copy of the death certificate",
      "The original will, if one exists",
      "List of the estate's assets (real estate, accounts, vehicles)",
      "Approximate values of the major assets",
      "Names and addresses of heirs and beneficiaries",
      "Any court notices or deadlines you've received",
      "Mortgage statements or property tax bills for estate real estate",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
    titleEs: "Documentos a Reunir para los Trámites de Sucesión",
    introEs: "Tenga lo siguiente disponible cuando le contactemos:",
    itemsEs: [
      "Copia certificada del certificado de defunción",
      "El testamento original, si existe",
      "Lista de los bienes del patrimonio (inmuebles, cuentas, vehículos)",
      "Valores aproximados de los bienes principales",
      "Nombres y direcciones de herederos y beneficiarios",
      "Cualquier aviso judicial o plazo que haya recibido",
      "Estados de hipoteca o facturas de impuestos de propiedad del patrimonio",
    ],
    noteEs:
      "No necesita todo esto para comenzar — traiga lo que tenga y le guiaremos con el resto.",
  },
  "Legal Name Change": {
    title: "Information to Gather for Your Name Change Petition",
    intro: "Having these ready will help us prepare your petition faster:",
    items: [
      "Current full legal name exactly as it appears on your ID",
      "The new name you want, spelled exactly as desired",
      "Birth certificate (yours, or your child's for a minor name change)",
      "Valid government-issued photo ID",
      "Your county of residence",
      "For a minor: the other parent's name and address, if known",
      "Court date notice, if you've already filed anything",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
    titleEs: "Información a Reunir para Su Petición de Cambio de Nombre",
    introEs:
      "Tener esto listo nos ayudará a preparar su petición más rápido:",
    itemsEs: [
      "Nombre legal actual completo exactamente como aparece en su identificación",
      "El nuevo nombre que desea, escrito exactamente como lo quiere",
      "Certificado de nacimiento (el suyo, o el de su hijo para un cambio de menor)",
      "Identificación con foto válida emitida por el gobierno",
      "Su condado de residencia",
      "Para un menor: el nombre y la dirección del otro padre, si se conocen",
      "Aviso de fecha de audiencia, si ya presentó algo",
    ],
    noteEs:
      "No necesita todo esto para comenzar — traiga lo que tenga y le guiaremos con el resto.",
  },
  "Small Claims Paperwork": {
    title: "Documents to Gather for Your Small Claims Case",
    intro: "Please have the following available when we follow up:",
    items: [
      "Full legal name and address of the person or business involved",
      "The exact amount in dispute and how you calculated it",
      "Contracts, invoices, receipts, or estimates related to the claim",
      "Photos, messages, or emails that document what happened",
      "Key dates (when the debt arose, when you demanded payment)",
      "Your hearing date and case number, if you were served or already filed",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
    titleEs: "Documentos a Reunir para Su Caso de Reclamos Menores",
    introEs: "Tenga lo siguiente disponible cuando le contactemos:",
    itemsEs: [
      "Nombre legal completo y dirección de la persona o negocio involucrado",
      "La cantidad exacta en disputa y cómo la calculó",
      "Contratos, facturas, recibos o presupuestos relacionados con el reclamo",
      "Fotos, mensajes o correos que documenten lo que pasó",
      "Fechas clave (cuándo surgió la deuda, cuándo exigió el pago)",
      "Su fecha de audiencia y número de caso, si le notificaron o ya presentó",
    ],
    noteEs:
      "No necesita todo esto para comenzar — traiga lo que tenga y le guiaremos con el resto.",
  },
  "Guardianship Documents": {
    title: "Information to Gather for Your Guardianship Petition",
    intro: "Having these ready will help us prepare the packet faster:",
    items: [
      "Child's full legal name, date of birth, and current address",
      "Your relationship to the child",
      "Names and addresses of the child's parents, if known",
      "Names and addresses of the child's close relatives (grandparents, siblings)",
      "A short summary of why guardianship is needed",
      "Any existing court orders involving the child",
      "School and doctor information for the child, if available",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
    titleEs: "Información a Reunir para Su Petición de Tutela",
    introEs:
      "Tener esto listo nos ayudará a preparar el paquete más rápido:",
    itemsEs: [
      "Nombre legal completo del menor, fecha de nacimiento y dirección actual",
      "Su relación con el menor",
      "Nombres y direcciones de los padres del menor, si se conocen",
      "Nombres y direcciones de familiares cercanos del menor (abuelos, hermanos)",
      "Un breve resumen de por qué se necesita la tutela",
      "Cualquier orden judicial existente que involucre al menor",
      "Información de la escuela y del médico del menor, si está disponible",
    ],
    noteEs:
      "No necesita todo esto para comenzar — traiga lo que tenga y le guiaremos con el resto.",
  },
  "Deeds & Property Transfers": {
    title: "Documents to Gather for Your Deed",
    intro: "Please have the following available when we follow up:",
    items: [
      "A copy of the current deed (or the property address so it can be looked up)",
      "The property's Assessor's Parcel Number (APN), if you have it",
      "Full legal names of everyone coming off or going onto title",
      "How the new owner(s) will hold title (e.g., joint tenants, trust)",
      "Your trust name and date, if transferring into a living trust",
      "Divorce judgment or settlement, if the transfer is divorce-related",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
    titleEs: "Documentos a Reunir para Su Escritura",
    introEs: "Tenga lo siguiente disponible cuando le contactemos:",
    itemsEs: [
      "Una copia de la escritura actual (o la dirección de la propiedad para buscarla)",
      "El Número de Parcela del Tasador (APN) de la propiedad, si lo tiene",
      "Nombres legales completos de todos los que salen o entran al título",
      "Cómo tendrán el título los nuevos propietarios (p. ej., copropietarios, fideicomiso)",
      "El nombre y la fecha de su fideicomiso, si transfiere a un fideicomiso en vida",
      "Sentencia o acuerdo de divorcio, si la transferencia es por divorcio",
    ],
    noteEs:
      "No necesita todo esto para comenzar — traiga lo que tenga y le guiaremos con el resto.",
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
