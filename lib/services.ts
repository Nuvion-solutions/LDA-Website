import {
  Scale,
  Home,
  FileSignature,
  Stamp,
  Car,
  Folder,
  ScrollText,
  Landmark,
  PenLine,
  Gavel,
  ShieldCheck,
  KeyRound,
  type LucideIcon,
} from "lucide-react";
import type { Language } from "./translations";

// Per-service FAQs rendered on the service detail page and emitted as FAQPage
// JSON-LD — Google requires the visible content to match the schema, so both
// read from this one source.
export type ServiceFaq = {
  q: string;
  qEs: string;
  a: string;
  aEs: string;
};

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
  faqs?: ServiceFaq[];
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
  {
    id: "wills",
    slug: "wills-health-care-directives",
    title: "Wills & Health Care Directives",
    titleEs: "Testamentos y Directivas de Atención Médica",
    short:
      "Last Will & Testament and Advance Health Care Directive documents prepared at your direction — often same-week.",
    shortEs:
      "Testamento y Directiva Anticipada de Atención Médica preparados según sus instrucciones — a menudo en la misma semana.",
    icon: ScrollText,
    what:
      "Document preparation for individuals creating a Last Will & Testament or Advance Health Care Directive without the cost of a law firm.",
    whatEs:
      "Preparación de documentos para personas que crean un Testamento o una Directiva Anticipada de Atención Médica sin el costo de un bufete de abogados.",
    documents:
      "Last Will & Testament, Advance Health Care Directive (AHCD), HIPAA authorization, guardianship nomination provisions, and related estate planning forms.",
    documentsEs:
      "Testamento, Directiva Anticipada de Atención Médica (AHCD), autorización HIPAA, disposiciones de nominación de tutor y formularios relacionados de planificación patrimonial.",
    who: "For adults who want their wishes in writing — especially parents of minor children and homeowners.",
    whoEs:
      "Para adultos que desean dejar sus deseos por escrito — especialmente padres de hijos menores y propietarios de vivienda.",
    faqs: [
      {
        q: "Do I need a lawyer to make a will in California?",
        qEs: "¿Necesito un abogado para hacer un testamento en California?",
        a: "No. California law lets you prepare your own will. As Registered Legal Document Assistants (LDA #87), we prepare the documents at your direction — you decide what your will says, and we make sure the paperwork is complete and properly formatted for California requirements.",
        aEs: "No. La ley de California le permite preparar su propio testamento. Como Asistentes Legales Registrados (LDA #87), preparamos los documentos según sus instrucciones — usted decide qué dice su testamento y nosotros nos aseguramos de que los trámites estén completos y con el formato correcto según los requisitos de California.",
      },
      {
        q: "How much does will preparation cost compared to an attorney?",
        qEs: "¿Cuánto cuesta la preparación de un testamento comparado con un abogado?",
        a: "Document preparation through an LDA typically costs a fraction of law-firm rates. After your free intake, we quote a flat price before any work begins — no hourly billing and no surprises.",
        aEs: "La preparación de documentos a través de un LDA normalmente cuesta una fracción de las tarifas de un bufete. Después de su consulta inicial gratuita, cotizamos un precio fijo antes de comenzar cualquier trabajo — sin facturación por hora y sin sorpresas.",
      },
      {
        q: "What is an Advance Health Care Directive?",
        qEs: "¿Qué es una Directiva Anticipada de Atención Médica?",
        a: "It's the California document that names who makes medical decisions for you if you can't, and records your treatment wishes. It's one of the most important documents an adult can have, and we can prepare it together with your will.",
        aEs: "Es el documento de California que designa quién toma decisiones médicas por usted si usted no puede, y registra sus deseos de tratamiento. Es uno de los documentos más importantes que un adulto puede tener, y podemos prepararlo junto con su testamento.",
      },
      {
        q: "How fast can my will be ready?",
        qEs: "¿Qué tan rápido puede estar listo mi testamento?",
        a: "Most wills and health care directives are prepared within a few business days once we have your information. Start with the online intake — it takes about 5 minutes — and we'll follow up within one business day.",
        aEs: "La mayoría de los testamentos y directivas se preparan en pocos días hábiles una vez que tenemos su información. Comience con el formulario en línea — toma unos 5 minutos — y le responderemos dentro de un día hábil.",
      },
    ],
  },
  {
    id: "probate",
    slug: "probate-documents",
    title: "Probate Document Preparation",
    titleEs: "Preparación de Documentos de Sucesión (Probate)",
    short:
      "Probate petitions, small-estate affidavits, and court forms after the loss of a loved one — handled with care.",
    shortEs:
      "Peticiones de sucesión, declaraciones de herencia menor y formularios judiciales tras la pérdida de un ser querido — manejados con cuidado.",
    icon: Landmark,
    what:
      "Document preparation for families handling a loved one's estate in California probate court, including small-estate procedures that can avoid full probate.",
    whatEs:
      "Preparación de documentos para familias que manejan el patrimonio de un ser querido en el tribunal de sucesiones de California, incluyendo procedimientos de herencia menor que pueden evitar la sucesión completa.",
    documents:
      "Petition for Probate (DE-111), small estate affidavits, Spousal Property Petition, notice forms, inventory and appraisal forms, and related DE-series court forms.",
    documentsEs:
      "Petición de Sucesión (DE-111), declaraciones de herencia menor, Petición de Propiedad Conyugal, formularios de notificación, formularios de inventario y avalúo, y formularios judiciales relacionados de la serie DE.",
    who: "For executors, spouses, and family members who need estate paperwork prepared correctly during a difficult time.",
    whoEs:
      "Para albaceas, cónyuges y familiares que necesitan trámites patrimoniales preparados correctamente durante un momento difícil.",
    faqs: [
      {
        q: "Does every estate have to go through full probate?",
        qEs: "¿Todo patrimonio debe pasar por la sucesión completa?",
        a: "No. California has simplified procedures for smaller estates, including small-estate affidavits and spousal property petitions that can transfer property without a full probate case. We prepare the documents for whichever procedure you direct.",
        aEs: "No. California tiene procedimientos simplificados para patrimonios menores, incluyendo declaraciones de herencia menor y peticiones de propiedad conyugal que pueden transferir bienes sin un caso de sucesión completo. Preparamos los documentos del procedimiento que usted indique.",
      },
      {
        q: "How much does probate document preparation cost?",
        qEs: "¿Cuánto cuesta la preparación de documentos de sucesión?",
        a: "Far less than attorney probate fees, which California law sets as a percentage of the estate. We charge flat document-preparation fees, quoted up front after your free intake.",
        aEs: "Mucho menos que los honorarios de abogados de sucesión, que la ley de California establece como un porcentaje del patrimonio. Cobramos tarifas fijas de preparación de documentos, cotizadas por adelantado después de su consulta gratuita.",
      },
      {
        q: "What information do you need to get started?",
        qEs: "¿Qué información necesitan para comenzar?",
        a: "The death certificate, a list of the estate's assets, the will if one exists, and names and addresses of heirs. Don't worry if you don't have everything — start the intake and we'll walk you through it.",
        aEs: "El certificado de defunción, una lista de los bienes del patrimonio, el testamento si existe, y los nombres y direcciones de los herederos. No se preocupe si no tiene todo — comience el formulario y le guiaremos paso a paso.",
      },
      {
        q: "Are there court deadlines in probate?",
        qEs: "¿Hay plazos judiciales en la sucesión?",
        a: "Yes — probate involves filing deadlines and notice periods set by the court. If you have a hearing date or deadline approaching, tell us in the intake form and we'll prioritize your paperwork.",
        aEs: "Sí — la sucesión involucra plazos de presentación y períodos de notificación establecidos por el tribunal. Si tiene una fecha de audiencia o un plazo próximo, indíquelo en el formulario y daremos prioridad a sus trámites.",
      },
    ],
  },
  {
    id: "name-change",
    slug: "name-change",
    title: "Legal Name Change Documents",
    titleEs: "Documentos de Cambio de Nombre Legal",
    short:
      "Complete California name change petitions for adults and minors — every court form prepared for you.",
    shortEs:
      "Peticiones completas de cambio de nombre en California para adultos y menores — todos los formularios judiciales preparados para usted.",
    icon: PenLine,
    what:
      "Document preparation for the full California legal name change process — petition, court order, and supporting forms, prepared at your direction.",
    whatEs:
      "Preparación de documentos para el proceso completo de cambio de nombre legal en California — petición, orden judicial y formularios de apoyo, preparados según sus instrucciones.",
    documents:
      "Petition for Change of Name (NC-100), Order to Show Cause (NC-120), Civil Case Cover Sheet, Decree Changing Name (NC-130), and minor name change forms.",
    documentsEs:
      "Petición de Cambio de Nombre (NC-100), Orden de Mostrar Causa (NC-120), Portada de Caso Civil, Decreto de Cambio de Nombre (NC-130) y formularios de cambio de nombre para menores.",
    who: "For adults and parents of minors seeking a court-ordered name change in California.",
    whoEs:
      "Para adultos y padres de menores que buscan un cambio de nombre ordenado por el tribunal en California.",
    faqs: [
      {
        q: "How long does a California name change take?",
        qEs: "¿Cuánto tarda un cambio de nombre en California?",
        a: "Typically two to three months from filing to the court's decree, depending on the county's calendar. Getting the paperwork right the first time avoids rejections that add weeks — that's exactly what we prepare for you.",
        aEs: "Normalmente de dos a tres meses desde la presentación hasta el decreto del tribunal, según el calendario del condado. Preparar los trámites correctamente desde el principio evita rechazos que agregan semanas — eso es exactamente lo que preparamos para usted.",
      },
      {
        q: "What does the name change process involve?",
        qEs: "¿Qué implica el proceso de cambio de nombre?",
        a: "Filing a petition with the superior court, publishing notice in a newspaper in most cases, and attending or waiving a short hearing. We prepare every form; you review, sign, and file.",
        aEs: "Presentar una petición ante el tribunal superior, publicar un aviso en un periódico en la mayoría de los casos, y asistir a (o renunciar a) una breve audiencia. Nosotros preparamos cada formulario; usted revisa, firma y presenta.",
      },
      {
        q: "Can you prepare a name change for my child?",
        qEs: "¿Pueden preparar un cambio de nombre para mi hijo?",
        a: "Yes. Minor name changes use additional forms and notice requirements, and we prepare the complete packet at your direction.",
        aEs: "Sí. Los cambios de nombre de menores usan formularios adicionales y requisitos de notificación, y preparamos el paquete completo según sus instrucciones.",
      },
      {
        q: "How much does it cost?",
        qEs: "¿Cuánto cuesta?",
        a: "We charge a flat document-preparation fee quoted before any work begins — separate from the court's filing fee. Fee waivers exist for the court fee if you qualify, and we can prepare that request too.",
        aEs: "Cobramos una tarifa fija de preparación de documentos cotizada antes de comenzar — separada de la tarifa de presentación del tribunal. Existen exenciones de la tarifa judicial si usted califica, y también podemos preparar esa solicitud.",
      },
    ],
  },
  {
    id: "small-claims",
    slug: "small-claims",
    title: "Small Claims Court Paperwork",
    titleEs: "Trámites de Reclamos Menores",
    short:
      "Claims up to $12,500 — plaintiff claims, defendant responses, and collection forms prepared correctly.",
    shortEs:
      "Reclamos de hasta $12,500 — demandas, respuestas y formularios de cobro preparados correctamente.",
    icon: Gavel,
    what:
      "Document preparation for California small claims court, where individuals can sue for up to $12,500 without an attorney — in fact, attorneys can't represent you at the hearing.",
    whatEs:
      "Preparación de documentos para el tribunal de reclamos menores de California, donde las personas pueden demandar por hasta $12,500 sin abogado — de hecho, los abogados no pueden representarle en la audiencia.",
    documents:
      "Plaintiff's Claim (SC-100), Defendant's Claim (SC-120), Proof of Service (SC-104), Request to Postpone (SC-150), and judgment collection forms.",
    documentsEs:
      "Reclamo del Demandante (SC-100), Reclamo del Demandado (SC-120), Prueba de Notificación (SC-104), Solicitud de Aplazamiento (SC-150) y formularios de cobro de sentencias.",
    who: "For anyone owed money, responding to a claim, or collecting a small claims judgment.",
    whoEs:
      "Para cualquier persona a quien le deben dinero, que responde a un reclamo o que cobra una sentencia de reclamos menores.",
    faqs: [
      {
        q: "How much can I sue for in California small claims court?",
        qEs: "¿Por cuánto puedo demandar en el tribunal de reclamos menores de California?",
        a: "Individuals can generally sue for up to $12,500; businesses are limited to $6,250. Small claims is designed for people to represent themselves — the paperwork just has to be right, and that's what we prepare.",
        aEs: "Las personas generalmente pueden demandar por hasta $12,500; los negocios están limitados a $6,250. Los reclamos menores están diseñados para que las personas se representen a sí mismas — los trámites simplemente tienen que estar correctos, y eso es lo que preparamos.",
      },
      {
        q: "What if I was served with a small claims lawsuit?",
        qEs: "¿Qué pasa si me notificaron una demanda de reclamos menores?",
        a: "Deadlines move quickly once you're served. We can prepare your response paperwork, a counterclaim if you direct one, or a request to postpone the hearing. Start the intake right away and note your hearing date.",
        aEs: "Los plazos avanzan rápido una vez que le notifican. Podemos preparar sus documentos de respuesta, una contrademanda si usted la indica, o una solicitud para aplazar la audiencia. Comience el formulario de inmediato e indique su fecha de audiencia.",
      },
      {
        q: "I won my case — how do I actually collect?",
        qEs: "Gané mi caso — ¿cómo cobro realmente?",
        a: "The court doesn't collect for you. We prepare post-judgment collection documents at your direction, including wage garnishment and bank levy paperwork, to help you turn the judgment into payment.",
        aEs: "El tribunal no cobra por usted. Preparamos documentos de cobro posteriores a la sentencia según sus instrucciones, incluyendo embargos de salario y de cuentas bancarias, para ayudarle a convertir la sentencia en pago.",
      },
      {
        q: "How quickly can my claim be ready to file?",
        qEs: "¿Qué tan rápido puede estar listo mi reclamo para presentar?",
        a: "Usually within a few business days of receiving your information — faster if you have a hearing or deadline. The online intake takes about 5 minutes and we respond within one business day.",
        aEs: "Normalmente dentro de pocos días hábiles después de recibir su información — más rápido si tiene una audiencia o un plazo. El formulario en línea toma unos 5 minutos y respondemos dentro de un día hábil.",
      },
    ],
  },
  {
    id: "guardianship",
    slug: "guardianship",
    title: "Guardianship Documents",
    titleEs: "Documentos de Tutela",
    short:
      "Probate guardianship petitions for relatives caring for a child — complete GC-series court forms.",
    shortEs:
      "Peticiones de tutela para familiares que cuidan a un menor — formularios judiciales completos de la serie GC.",
    icon: ShieldCheck,
    what:
      "Document preparation for probate guardianship of a child in California — the court process that gives a relative or trusted adult legal authority to care for a minor.",
    whatEs:
      "Preparación de documentos para la tutela de un menor en California — el proceso judicial que otorga a un familiar o adulto de confianza la autoridad legal para cuidar a un menor.",
    documents:
      "Petition for Appointment of Guardian (GC-210), Guardianship Questionnaire, Notice of Hearing, Consent forms, Letters of Guardianship (GC-250), and related GC-series forms.",
    documentsEs:
      "Petición de Nombramiento de Tutor (GC-210), Cuestionario de Tutela, Aviso de Audiencia, formularios de Consentimiento, Cartas de Tutela (GC-250) y formularios relacionados de la serie GC.",
    who: "For grandparents, relatives, and trusted adults stepping up to care for a child.",
    whoEs:
      "Para abuelos, familiares y adultos de confianza que asumen el cuidado de un menor.",
    faqs: [
      {
        q: "What's the difference between guardianship and custody?",
        qEs: "¿Cuál es la diferencia entre tutela y custodia?",
        a: "Custody cases happen between parents in family court. Guardianship gives someone who isn't the parent — often a grandparent or relative — legal authority over a child's care, through probate court. We prepare the guardianship court forms at your direction.",
        aEs: "Los casos de custodia ocurren entre padres en el tribunal familiar. La tutela otorga a alguien que no es el padre — a menudo un abuelo o familiar — autoridad legal sobre el cuidado de un menor, a través del tribunal de sucesiones. Preparamos los formularios de tutela según sus instrucciones.",
      },
      {
        q: "How long does guardianship take in California?",
        qEs: "¿Cuánto tarda la tutela en California?",
        a: "A standard guardianship takes roughly two to four months to a hearing, depending on the county. Courts can grant temporary guardianship much faster when a child's situation requires it — tell us in the intake if your situation is urgent.",
        aEs: "Una tutela estándar tarda aproximadamente de dos a cuatro meses hasta la audiencia, según el condado. Los tribunales pueden otorgar una tutela temporal mucho más rápido cuando la situación del menor lo requiere — indíquenos en el formulario si su situación es urgente.",
      },
      {
        q: "The paperwork looks overwhelming. How much do you handle?",
        qEs: "Los trámites parecen abrumadores. ¿Cuánto manejan ustedes?",
        a: "Guardianship petitions involve a large packet of forms plus notice to family members. We prepare the complete packet and the notice documents at your direction — you review, sign, file, and appear at the hearing.",
        aEs: "Las peticiones de tutela involucran un paquete grande de formularios más la notificación a familiares. Preparamos el paquete completo y los documentos de notificación según sus instrucciones — usted revisa, firma, presenta y asiste a la audiencia.",
      },
      {
        q: "How much does it cost?",
        qEs: "¿Cuánto cuesta?",
        a: "A flat document-preparation fee quoted after your free intake — dramatically less than hourly attorney rates. Court filing fee waivers are available if you qualify, and we can prepare that request as well.",
        aEs: "Una tarifa fija de preparación de documentos cotizada después de su consulta gratuita — dramáticamente menos que las tarifas por hora de un abogado. Hay exenciones de tarifas judiciales disponibles si califica, y también podemos preparar esa solicitud.",
      },
    ],
  },
  {
    id: "deeds",
    slug: "deeds-property-transfers",
    title: "Deeds & Property Transfer Documents",
    titleEs: "Escrituras y Documentos de Transferencia de Propiedad",
    short:
      "Quitclaim, grant, interspousal, and trust transfer deeds — prepared and ready to record, usually within days.",
    shortEs:
      "Escrituras de finiquito, de concesión, interconyugales y de transferencia a fideicomiso — preparadas y listas para registrar, normalmente en días.",
    icon: KeyRound,
    what:
      "Document preparation for California real property transfers — adding or removing someone from title, transferring property into a trust, or completing a divorce settlement transfer.",
    whatEs:
      "Preparación de documentos para transferencias de propiedad inmueble en California — agregar o quitar a alguien del título, transferir propiedad a un fideicomiso o completar una transferencia por acuerdo de divorcio.",
    documents:
      "Quitclaim Deed, Grant Deed, Interspousal Transfer Deed, Trust Transfer Deed, and the Preliminary Change of Ownership Report (PCOR) required for recording.",
    documentsEs:
      "Escritura de Finiquito (Quitclaim), Escritura de Concesión (Grant Deed), Escritura de Transferencia Interconyugal, Escritura de Transferencia a Fideicomiso y el Informe Preliminar de Cambio de Propiedad (PCOR) requerido para el registro.",
    who: "For property owners updating title after marriage, divorce, a family transfer, or creating a living trust.",
    whoEs:
      "Para propietarios que actualizan el título después de un matrimonio, divorcio, una transferencia familiar o la creación de un fideicomiso en vida.",
    faqs: [
      {
        q: "What's the difference between a quitclaim deed and a grant deed?",
        qEs: "¿Cuál es la diferencia entre una escritura de finiquito y una de concesión?",
        a: "A grant deed transfers property with basic warranties about title; a quitclaim transfers whatever interest the signer has, with no warranties — common between family members and in divorces. You direct which deed you want, and we prepare it recording-ready.",
        aEs: "Una escritura de concesión transfiere la propiedad con garantías básicas sobre el título; una de finiquito transfiere cualquier interés que tenga el firmante, sin garantías — común entre familiares y en divorcios. Usted indica qué escritura desea y la preparamos lista para registrar.",
      },
      {
        q: "What is a PCOR and do I need one?",
        qEs: "¿Qué es un PCOR y lo necesito?",
        a: "The Preliminary Change of Ownership Report is a county form that must accompany nearly every recorded deed in California. Missing or incorrect PCORs are a top reason recordings get rejected — we prepare it with your deed.",
        aEs: "El Informe Preliminar de Cambio de Propiedad es un formulario del condado que debe acompañar casi toda escritura registrada en California. Los PCOR faltantes o incorrectos son una de las principales razones de rechazo — lo preparamos junto con su escritura.",
      },
      {
        q: "Can a deed transfer affect my property taxes?",
        qEs: "¿Puede una transferencia afectar mis impuestos de propiedad?",
        a: "Some transfers can trigger reassessment while others may qualify for exclusions — that's a legal and tax question we can't advise on. We prepare the documents you direct, and your intake answers help you ask the right questions of the county assessor or a professional.",
        aEs: "Algunas transferencias pueden provocar una reevaluación mientras que otras pueden calificar para exclusiones — esa es una cuestión legal y fiscal sobre la que no podemos asesorar. Preparamos los documentos que usted indique, y sus respuestas del formulario le ayudan a hacer las preguntas correctas al tasador del condado o a un profesional.",
      },
      {
        q: "How fast can my deed be ready?",
        qEs: "¿Qué tan rápido puede estar lista mi escritura?",
        a: "Deed packages are usually prepared within a few business days. Start the 5-minute intake with the property's county and what you're trying to do, and we'll follow up within one business day with a flat quote.",
        aEs: "Los paquetes de escrituras normalmente se preparan en pocos días hábiles. Comience el formulario de 5 minutos con el condado de la propiedad y lo que desea hacer, y le responderemos dentro de un día hábil con una cotización fija.",
      },
    ],
  },
];

// Curated homepage grid (2×3) — the highest-intent services lead; the full
// list of 13 lives on /services, the footer, and the sitemap.
const HOMEPAGE_IDS = [
  "divorce",
  "eviction",
  "living-trust",
  "wills",
  "probate",
  "power-of-attorney",
];
export const HOMEPAGE_SERVICES = HOMEPAGE_IDS.map(
  (id) => SERVICES.find((s) => s.id === id)!,
);

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
      "Child support calculation",
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
      "Cálculo de manutención de menores",
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
    title: "Other Document Services",
    titleEs: "Otros Servicios de Documentos",
    items: [
      "Bankruptcy",
      "Case completion",
      "Mediation",
      "Notary",
      "Document typing & preparation",
      "Resumes",
    ],
    itemsEs: [
      "Bancarrota",
      "Finalización de casos",
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
