import type { LucideIcon } from "lucide-react";
import { Scale, ScrollText, Landmark, Home, Building2, Globe } from "lucide-react";

// "Starting at" anchors shown on each service page hero + the pricing page.
// Keyed by Service.id. Values are the honest category floor from the client's
// flat-fee schedule — the lowest standard package a client would actually buy,
// so the anchor is attractive without being misleading.
export const STARTING_AT: Record<string, number> = {
  divorce: 1500,
  eviction: 750,
  "living-trust": 2000,
  "power-of-attorney": 1250,
  dmv: 1000,
  "tax-organization": 1500,
  wills: 1250,
  probate: 2000,
  "name-change": 1500,
  "small-claims": 1250,
  guardianship: 3000,
  deeds: 1000,
};

export type PricingPackage = {
  name: string;
  nameEs: string;
  price: number;
  from?: boolean; // render "From $X" / "Desde $X" when the price is a floor
  desc: string;
  descEs: string;
  vs?: string; // conservative attorney comparison, e.g. "$6,000–$15,000+"
  note?: string; // scope caveat (e.g. DMV clerical-only)
  noteEs?: string;
  featured?: boolean; // flagship "complete" package — highlighted
};

export type PricingCategory = {
  id: string;
  title: string;
  titleEs: string;
  blurb: string;
  blurbEs: string;
  icon: LucideIcon;
  packages: PricingPackage[];
  disclosure?: string; // extra category-level disclosure (immigration)
  disclosureEs?: string;
};

// Curated "signature" packages per area — outcomes, not a wall of line items.
// Attorney comparisons are conservative and only shown where the gap is real.
export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: "divorce-family",
    title: "Divorce & Family Law",
    titleEs: "Divorcio y Derecho Familiar",
    blurb:
      "Uncontested divorce, filings, custody, and family-court paperwork — prepared and court-ready.",
    blurbEs:
      "Divorcio sin disputa, presentaciones, custodia y documentos de la corte familiar — preparados y listos para la corte.",
    icon: Scale,
    packages: [
      {
        name: "Complete Uncontested Divorce",
        nameEs: "Divorcio Completo Sin Disputa",
        price: 4000,
        featured: true,
        desc: "Everything from your initial filing through the final judgment — the full paperwork, start to finish.",
        descEs:
          "Todo, desde la presentación inicial hasta la sentencia final — el paquete completo, de principio a fin.",
        vs: "$6,000–$15,000+",
      },
      {
        name: "Initial Dissolution or Separation Filing",
        nameEs: "Presentación Inicial de Disolución o Separación",
        price: 1500,
        desc: "Petition, summons, and initial filing documents prepared and ready to file.",
        descEs:
          "Petición, citación y documentos iniciales preparados y listos para presentar.",
      },
      {
        name: "Response to Divorce or Separation",
        nameEs: "Respuesta a Divorcio o Separación",
        price: 1500,
        desc: "Complete response paperwork if you've been served.",
        descEs: "Documentos de respuesta completos si le han notificado.",
      },
      {
        name: "Marital Settlement Agreement",
        nameEs: "Acuerdo de Conciliación Matrimonial",
        price: 2500,
        desc: "Your agreed terms drafted into a court-ready settlement agreement.",
        descEs:
          "Sus términos acordados redactados en un acuerdo listo para la corte.",
      },
      {
        name: "Domestic Violence Request or Response",
        nameEs: "Solicitud o Respuesta de Violencia Doméstica",
        price: 2750,
        desc: "Restraining-order request or response package, prepared with care.",
        descEs:
          "Paquete de solicitud o respuesta de orden de restricción, preparado con cuidado.",
      },
    ],
  },
  {
    id: "estate-planning",
    title: "Estate Planning, Wills & Trusts",
    titleEs: "Planificación Patrimonial, Testamentos y Fideicomisos",
    blurb:
      "Protect your family with a living trust, will, and directives — for a fraction of an estate attorney's fee.",
    blurbEs:
      "Proteja a su familia con un fideicomiso en vida, testamento y directivas — por una fracción del costo de un abogado.",
    icon: ScrollText,
    packages: [
      {
        name: "Complete Individual Estate Plan",
        nameEs: "Plan Patrimonial Individual Completo",
        price: 2500,
        featured: true,
        desc: "Living trust, will, power of attorney, and advance health care directive — everything to protect your family, in one flat fee.",
        descEs:
          "Fideicomiso en vida, testamento, poder notarial y directiva médica anticipada — todo para proteger a su familia, en una sola tarifa fija.",
        vs: "$3,000–$6,000+",
      },
      {
        name: "Complete Couple Estate Plan",
        nameEs: "Plan Patrimonial Completo para Parejas",
        price: 3500,
        desc: "The full estate plan for couples, all in one package.",
        descEs: "El plan patrimonial completo para parejas, todo en un paquete.",
        vs: "$4,000–$8,000+",
      },
      {
        name: "Individual Revocable Living Trust",
        nameEs: "Fideicomiso Revocable en Vida Individual",
        price: 2000,
        desc: "A revocable living trust to keep your estate out of probate.",
        descEs:
          "Un fideicomiso revocable en vida para mantener su patrimonio fuera del proceso testamentario.",
      },
      {
        name: "Individual Will Package",
        nameEs: "Paquete de Testamento Individual",
        price: 1500,
        desc: "A properly prepared will that reflects your wishes.",
        descEs:
          "Un testamento correctamente preparado que refleja sus deseos.",
      },
      {
        name: "Power of Attorney + Health Directive",
        nameEs: "Poder Notarial + Directiva Médica",
        price: 1750,
        desc: "Durable power of attorney plus advance health care directive.",
        descEs:
          "Poder notarial duradero más directiva médica anticipada.",
      },
    ],
  },
  {
    id: "probate-guardianship",
    title: "Probate, Guardianship & Conservatorship",
    titleEs: "Sucesiones, Tutela y Conservaduría",
    blurb:
      "Court paperwork for probate, guardianship, and conservatorship — without statutory attorney fees.",
    blurbEs:
      "Documentos de la corte para sucesiones, tutela y conservaduría — sin los honorarios de abogado establecidos por ley.",
    icon: Landmark,
    packages: [
      {
        name: "Complete Routine Probate",
        nameEs: "Sucesión Rutinaria Completa",
        price: 4500,
        featured: true,
        desc: "Full probate administration paperwork, from the initial petition through final distribution.",
        descEs:
          "Documentación completa de administración sucesoria, desde la petición inicial hasta la distribución final.",
        vs: "$10,000–$20,000+ (CA statutory attorney fees)",
      },
      {
        name: "Initial Petition for Probate",
        nameEs: "Petición Inicial de Sucesión",
        price: 2000,
        desc: "Open a probate case with a properly prepared petition.",
        descEs: "Abra un caso sucesorio con una petición correctamente preparada.",
      },
      {
        name: "Guardianship Through Appointment",
        nameEs: "Tutela Hasta el Nombramiento",
        price: 5000,
        desc: "The complete guardianship package, from petition through appointment.",
        descEs:
          "El paquete completo de tutela, desde la petición hasta el nombramiento.",
        vs: "$10,000–$15,000+",
      },
      {
        name: "Standard Conservatorship Petition",
        nameEs: "Petición Estándar de Conservaduría",
        price: 3500,
        desc: "Conservatorship petition paperwork prepared and court-ready.",
        descEs:
          "Documentos de petición de conservaduría preparados y listos para la corte.",
      },
      {
        name: "Small Estate Affidavit",
        nameEs: "Declaración Jurada de Patrimonio Pequeño",
        price: 1500,
        desc: "Transfer assets without full probate when the estate qualifies.",
        descEs:
          "Transfiera bienes sin sucesión completa cuando el patrimonio califica.",
      },
    ],
  },
  {
    id: "eviction-civil",
    title: "Eviction, Small Claims & Civil",
    titleEs: "Desalojo, Reclamos Menores y Civil",
    blurb:
      "Landlord and plaintiff-side paperwork — evictions, small claims, and collections.",
    blurbEs:
      "Documentos para propietarios y demandantes — desalojos, reclamos menores y cobros.",
    icon: Home,
    packages: [
      {
        name: "Complete Routine Eviction (Notice → Writ)",
        nameEs: "Desalojo Rutinario Completo (Aviso → Orden)",
        price: 3000,
        featured: true,
        desc: "For landlords: the full unlawful-detainer paperwork, from notice through the writ of possession.",
        descEs:
          "Para propietarios: los documentos completos de desalojo, desde el aviso hasta la orden de posesión.",
        vs: "$3,500–$10,000+",
      },
      {
        name: "3-Day, 30-Day, or 60-Day Notice",
        nameEs: "Aviso de 3, 30 o 60 Días",
        price: 750,
        desc: "The proper notice prepared and ready to serve — the right first step.",
        descEs:
          "El aviso correcto preparado y listo para entregar — el primer paso adecuado.",
      },
      {
        name: "Landlord Unlawful Detainer Complaint",
        nameEs: "Demanda de Desalojo del Propietario",
        price: 1500,
        desc: "The complaint package to start an eviction.",
        descEs: "El paquete de demanda para iniciar un desalojo.",
      },
      {
        name: "Small Claims Package",
        nameEs: "Paquete de Reclamos Menores",
        price: 1250,
        desc: "Plaintiff or defendant paperwork for small claims court (up to $12,500).",
        descEs:
          "Documentos de demandante o demandado para la corte de reclamos menores (hasta $12,500).",
      },
      {
        name: "Wage Garnishment or Bank Levy",
        nameEs: "Embargo de Salario o Cuenta Bancaria",
        price: 1500,
        desc: "Collect on a judgment you've already won.",
        descEs: "Cobre una sentencia que ya ganó.",
      },
    ],
  },
  {
    id: "business-documents",
    title: "Business, DMV & Document Services",
    titleEs: "Negocios, DMV y Servicios de Documentos",
    blurb:
      "Business formation, DMV paperwork, deeds, notary, and everyday document services.",
    blurbEs:
      "Formación de empresas, trámites del DMV, escrituras, notaría y servicios de documentos.",
    icon: Building2,
    packages: [
      {
        name: "LLC Formation Package",
        nameEs: "Paquete de Formación de LLC",
        price: 2000,
        desc: "Articles of organization, operating agreement, and formation filings.",
        descEs:
          "Acta constitutiva, acuerdo operativo y presentaciones de formación.",
      },
      {
        name: "Corporation Formation Package",
        nameEs: "Paquete de Formación de Corporación",
        price: 2500,
        desc: "The full corporate formation document set.",
        descEs: "El conjunto completo de documentos de formación corporativa.",
      },
      {
        name: "DMV Paperwork & Form Assistance",
        nameEs: "Asistencia con Trámites y Formularios del DMV",
        price: 1000,
        from: true,
        desc: "Title transfers, registration, and DMV forms completed for you.",
        descEs:
          "Transferencias de título, registro y formularios del DMV completados para usted.",
        note: "Document preparation and clerical assistance only.",
        noteEs: "Solo preparación de documentos y asistencia administrativa.",
      },
      {
        name: "Deed Preparation + PCOR",
        nameEs: "Preparación de Escritura + PCOR",
        price: 1000,
        desc: "Grant or quitclaim deed prepared with the required change-of-ownership report.",
        descEs:
          "Escritura de concesión o finiquito preparada con el informe de cambio de propiedad requerido.",
      },
      {
        name: "Notary & Document Services",
        nameEs: "Notaría y Servicios de Documentos",
        price: 1000,
        from: true,
        desc: "Mobile notary coordination, document typing, and professional formatting.",
        descEs:
          "Coordinación de notario móvil, mecanografía de documentos y formato profesional.",
      },
    ],
  },
  {
    id: "immigration",
    title: "Immigration Document Preparation",
    titleEs: "Preparación de Documentos de Inmigración",
    blurb:
      "USCIS form preparation and document assistance — completed accurately at your direction.",
    blurbEs:
      "Preparación de formularios de USCIS y asistencia con documentos — completados con precisión bajo su dirección.",
    icon: Globe,
    disclosure:
      "Immigration document preparation is clerical assistance only, provided at your direction. We are not attorneys or an immigration law firm, we do not provide legal advice, and we do not select forms or advise on your case.",
    disclosureEs:
      "La preparación de documentos de inmigración es únicamente asistencia administrativa, proporcionada bajo su dirección. No somos abogados ni un bufete de inmigración, no brindamos asesoría legal y no seleccionamos formularios ni asesoramos sobre su caso.",
    packages: [
      {
        name: "Naturalization (Form N-400)",
        nameEs: "Naturalización (Formulario N-400)",
        price: 2000,
        desc: "Citizenship application forms completed and organized.",
        descEs:
          "Formularios de solicitud de ciudadanía completados y organizados.",
      },
      {
        name: "Green Card Renewal / Replacement (I-90)",
        nameEs: "Renovación / Reemplazo de Green Card (I-90)",
        price: 1250,
        desc: "Form I-90 prepared for renewal or replacement.",
        descEs: "Formulario I-90 preparado para renovación o reemplazo.",
      },
      {
        name: "Family Petition (I-130)",
        nameEs: "Petición Familiar (I-130)",
        price: 2000,
        desc: "Family petition forms prepared for filing.",
        descEs: "Formularios de petición familiar preparados para presentar.",
      },
      {
        name: "Employment Authorization (I-765)",
        nameEs: "Autorización de Empleo (I-765)",
        price: 1500,
        desc: "Work authorization application prepared.",
        descEs: "Solicitud de autorización de trabajo preparada.",
      },
      {
        name: "Certified Document Translation",
        nameEs: "Traducción de Documentos Certificada",
        price: 1250,
        desc: "Document translation with a certificate of accuracy.",
        descEs: "Traducción de documentos con certificado de exactitud.",
      },
    ],
  },
];
