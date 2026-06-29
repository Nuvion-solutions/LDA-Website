import {
  Scale,
  Home,
  Plane,
  FileSignature,
  Stamp,
  Car,
  Folder,
  type LucideIcon,
} from "lucide-react";
import type { Language } from "./translations";

export type Service = {
  id: string;
  slug: string;
  title: string;
  titleEs: string;
  short: string;
  shortEs: string;
  icon: LucideIcon;
  what: string;
  whatEs: string;
  documents: string;
  documentsEs: string;
  who: string;
  whoEs: string;
};

export const SERVICES: Service[] = [
  {
    id: "divorce",
    slug: "divorce-family-law",
    title: "Divorce & Family Law Documents",
    titleEs: "Divorcio y Documentos de Derecho Familiar",
    short:
      "Petitions, responses, custody and support forms, and settlement paperwork.",
    shortEs:
      "Peticiones, respuestas, formularios de custodia y manutención, y documentos de acuerdo.",
    icon: Scale,
    what:
      "Document preparation for individuals handling their own family law matters in California courts.",
    whatEs:
      "Preparación de documentos para personas que manejan sus propios asuntos de derecho familiar en los tribunales de California.",
    documents:
      "Petition for Dissolution, Response, QDRO forms, Marital Settlement Agreement, child custody and support forms, FL series court forms.",
    documentsEs:
      "Petición de Disolución, Respuesta, formularios QDRO, Acuerdo de Liquidación Matrimonial, formularios de custodia y manutención de menores, formularios judiciales de la serie FL.",
    who: "For individuals seeking to prepare their own family law paperwork.",
    whoEs:
      "Para personas que buscan preparar sus propios trámites de derecho familiar.",
  },
  {
    id: "eviction",
    slug: "eviction-paperwork",
    title: "Eviction (Unlawful Detainer) Paperwork",
    titleEs: "Trámites de Desalojo (Unlawful Detainer)",
    short:
      "3-Day Notices, UD-100, UD-105, and related unlawful detainer forms.",
    shortEs:
      "Avisos de 3 días, UD-100, UD-105 y formularios relacionados de desalojo.",
    icon: Home,
    what:
      "Document preparation for landlords who need eviction paperwork prepared accurately and on time.",
    whatEs:
      "Preparación de documentos para propietarios que necesitan trámites de desalojo preparados con precisión y a tiempo.",
    documents:
      "3-Day Notice to Pay or Quit, UD-100 Complaint, UD-105 Summons, Proof of Service, and related Unlawful Detainer forms.",
    documentsEs:
      "Aviso de 3 días para Pagar o Desalojar, Demanda UD-100, Citación UD-105, Prueba de Notificación y formularios relacionados.",
    who: "For landlords who need eviction paperwork prepared correctly.",
    whoEs:
      "Para propietarios que necesitan trámites de desalojo preparados correctamente.",
  },
  {
    id: "immigration",
    slug: "immigration-documents",
    title: "Immigration Documents",
    titleEs: "Documentos de Inmigración",
    short:
      "USCIS forms including I-130, I-485, N-400, I-131, and supporting paperwork.",
    shortEs:
      "Formularios USCIS incluyendo I-130, I-485, N-400, I-131 y documentación de apoyo.",
    icon: Plane,
    what:
      "Document preparation assistance for individuals completing their own USCIS filings.",
    whatEs:
      "Asistencia en la preparación de documentos para personas que presentan sus propias solicitudes ante USCIS.",
    documents:
      "USCIS forms including I-130, I-485, N-400, I-131, and related supporting documentation.",
    documentsEs:
      "Formularios USCIS incluyendo I-130, I-485, N-400, I-131 y documentación de apoyo relacionada.",
    who: "For individuals preparing their own immigration paperwork.",
    whoEs:
      "Para personas que preparan sus propios trámites de inmigración.",
  },
  {
    id: "living-trust",
    slug: "living-trust",
    title: "Living Trust Documents",
    titleEs: "Documentos de Fideicomiso en Vida",
    short:
      "Revocable Living Trust, Pour-Over Will, Certification of Trust, and Schedule of Assets.",
    shortEs:
      "Fideicomiso Revocable en Vida, Testamento Pour-Over, Certificación de Fideicomiso e Inventario de Bienes.",
    icon: FileSignature,
    what:
      "Document preparation for individuals creating their own estate planning paperwork.",
    whatEs:
      "Preparación de documentos para personas que crean sus propios trámites de planificación patrimonial.",
    documents:
      "Revocable Living Trust, Pour-Over Will, Certification of Trust, Schedule of Assets.",
    documentsEs:
      "Fideicomiso Revocable en Vida, Testamento Pour-Over, Certificación de Fideicomiso, Inventario de Bienes.",
    who: "For individuals who want to prepare their estate planning documents.",
    whoEs:
      "Para personas que desean preparar sus documentos de planificación patrimonial.",
  },
  {
    id: "power-of-attorney",
    slug: "power-of-attorney",
    title: "Power of Attorney",
    titleEs: "Poder Notarial",
    short:
      "General, Durable, and Healthcare Directive forms prepared at your direction.",
    shortEs:
      "Formularios de Poder General, Duradero y Directiva de Salud preparados según sus instrucciones.",
    icon: Stamp,
    what:
      "Document preparation for individuals designating decision-making authority.",
    whatEs:
      "Preparación de documentos para personas que designan autoridad para tomar decisiones.",
    documents:
      "General Power of Attorney, Durable Power of Attorney, Healthcare Directive forms.",
    documentsEs:
      "Poder Notarial General, Poder Notarial Duradero, formularios de Directiva de Salud.",
    who: "For individuals who need to designate decision-making authority.",
    whoEs:
      "Para personas que necesitan designar autoridad para tomar decisiones.",
  },
  {
    id: "dmv",
    slug: "dmv-administrative",
    title: "DMV & Administrative Forms",
    titleEs: "Formularios del DMV y Administrativos",
    short:
      "DMV form completion assistance and general administrative paperwork.",
    shortEs:
      "Asistencia para completar formularios del DMV y trámites administrativos generales.",
    icon: Car,
    what:
      "Clerical assistance with DMV and administrative paperwork — client submits all forms directly.",
    whatEs:
      "Asistencia clerical con formularios del DMV y trámites administrativos — el cliente presenta todos los formularios directamente.",
    documents:
      "DMV form completion assistance, general administrative paperwork organization and preparation.",
    documentsEs:
      "Asistencia para completar formularios del DMV, organización y preparación de trámites administrativos generales.",
    who: "For individuals who need help completing DMV and administrative forms accurately.",
    whoEs:
      "Para personas que necesitan ayuda para completar formularios del DMV y administrativos con precisión.",
  },
  {
    id: "tax-organization",
    slug: "tax-document-organization",
    title: "Tax Document Organization (Clerical)",
    titleEs: "Organización de Documentos de Impuestos (Clerical)",
    short:
      "Clerical organization and preparation of tax paperwork — no tax advice.",
    shortEs:
      "Organización y preparación clerical de documentos de impuestos — sin asesoría fiscal.",
    icon: Folder,
    what:
      "Clerical document organization and preparation assistance. We do not provide tax advice. Clients submit all tax documents directly.",
    whatEs:
      "Organización clerical de documentos y asistencia en la preparación. No brindamos asesoría fiscal. Los clientes presentan todos los documentos de impuestos directamente.",
    documents:
      "Document organization, clerical assembly of records, and preparation assistance for tax paperwork.",
    documentsEs:
      "Organización de documentos, recopilación clerical de registros y asistencia en la preparación de trámites de impuestos.",
    who: "For individuals who need organizational support for their tax documents.",
    whoEs:
      "Para personas que necesitan apoyo de organización para sus documentos de impuestos.",
  },
];

export const HOMEPAGE_SERVICES = SERVICES.slice(0, 6);

// The broader breadth of document types we prepare, grouped by area. Shown on
// the services page below the featured services — captures long-tail search
// interest and signals full-service range without bloating the intake form,
// which keeps its focused set of primary services plus an "Other" catch-all.
export type ServiceCategory = {
  title: string;
  titleEs: string;
  items: string[];
  itemsEs: string[];
};

export const ADDITIONAL_SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "Family Law",
    titleEs: "Derecho Familiar",
    items: [
      "Divorce & legal separation",
      "Annulments",
      "Child custody & visitation",
      "Child & spousal support (and modifications)",
      "Paternity",
      "Marital settlement agreements",
      "Pre-nuptial & post-nuptial agreements",
      "Qualified Domestic Relations Orders (QDRO)",
      "Adoption",
      "Guardianships",
      "Emancipation of minors",
      "Name changes",
    ],
    itemsEs: [
      "Divorcio y separación legal",
      "Anulaciones",
      "Custodia y visitas de menores",
      "Manutención de menores y cónyuge (y modificaciones)",
      "Paternidad",
      "Acuerdos de liquidación matrimonial",
      "Acuerdos prenupciales y postnupciales",
      "Órdenes QDRO (relaciones domésticas calificadas)",
      "Adopción",
      "Tutelas",
      "Emancipación de menores",
      "Cambios de nombre",
    ],
  },
  {
    title: "Estate Planning",
    titleEs: "Planificación Patrimonial",
    items: [
      "Living trusts",
      "Wills",
      "Certification of trust",
      "Health care directives",
      "Powers of attorney",
      "Probate",
    ],
    itemsEs: [
      "Fideicomisos en vida",
      "Testamentos",
      "Certificación de fideicomiso",
      "Directivas de atención médica",
      "Poderes notariales",
      "Sucesiones (probate)",
    ],
  },
  {
    title: "Housing & Real Estate",
    titleEs: "Vivienda y Bienes Raíces",
    items: [
      "Evictions / unlawful detainer",
      "Deeds & quitclaim deeds",
      "Assignment of personal property",
    ],
    itemsEs: [
      "Desalojos / unlawful detainer",
      "Escrituras y escrituras de finiquito (quitclaim)",
      "Asignación de bienes personales",
    ],
  },
  {
    title: "Civil & Collections",
    titleEs: "Civil y Cobranzas",
    items: [
      "Small claims",
      "Civil actions",
      "Collections",
      "Wage garnishments",
      "Settlement agreements & stipulations",
      "Orders to show cause",
    ],
    itemsEs: [
      "Reclamos menores (small claims)",
      "Acciones civiles",
      "Cobranzas",
      "Embargos de salario",
      "Acuerdos de conciliación y estipulaciones",
      "Órdenes para mostrar causa",
    ],
  },
  {
    title: "Business",
    titleEs: "Negocios",
    items: ["Corporations, partnerships & LLCs"],
    itemsEs: ["Corporaciones, sociedades y LLCs"],
  },
  {
    title: "Immigration",
    titleEs: "Inmigración",
    items: ["Immigration & citizenship documents"],
    itemsEs: ["Documentos de inmigración y ciudadanía"],
  },
  {
    title: "Other Document Services",
    titleEs: "Otros Servicios de Documentos",
    items: [
      "Bankruptcy",
      "Mediation",
      "Notary",
      "Document typing & preparation",
      "Resumes",
    ],
    itemsEs: [
      "Bancarrota",
      "Mediación",
      "Notaría",
      "Mecanografía y preparación de documentos",
      "Currículums",
    ],
  },
];

// Resolve a localized category (title + items), falling back to English.
export function localizedCategory(
  cat: ServiceCategory,
  lang: Language,
): { title: string; items: string[] } {
  if (lang === "es") {
    return {
      title: cat.titleEs || cat.title,
      items: cat.itemsEs.length > 0 ? cat.itemsEs : cat.items,
    };
  }
  return { title: cat.title, items: cat.items };
}

// Resolve a localized field on a Service. Falls back to the English value
// if the Spanish field is missing.
export function localized<K extends "title" | "short" | "what" | "documents" | "who">(
  service: Service,
  field: K,
  lang: Language,
): string {
  if (lang === "es") {
    const esKey = `${field}Es` as `${K}Es`;
    return (service[esKey] as string) || service[field];
  }
  return service[field];
}
