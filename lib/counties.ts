// County / service-area landing pages. Each county carries genuinely distinct
// content — its own superior court, county seat, cities served, the services
// most relevant locally, and county-specific FAQs — so these read as useful
// local pages rather than near-duplicate "doorway" pages. Bilingual to match
// the rest of the site.

import type { Language } from "./translations";

export type CountyFaq = {
  q: string;
  a: string;
  qEs: string;
  aEs: string;
};

export type County = {
  slug: string; // e.g. "sonoma"
  name: string; // e.g. "Sonoma" — rendered as "{name} County"
  nameEs: string;
  seat: string; // county seat / court city
  court: string; // superior court name (same in both languages)
  cities: string[]; // main cities served (proper nouns; unchanged in ES)
  // Featured services for this county, by service id (see lib/services.ts).
  topServiceIds: string[];
  intro: string;
  introEs: string;
  local: string; // county-specific context (court, filings, local angle)
  localEs: string;
  faqs: CountyFaq[];
};

export const COUNTIES: County[] = [
  {
    slug: "sonoma",
    name: "Sonoma",
    nameEs: "Sonoma",
    seat: "Santa Rosa",
    court: "Superior Court of California, County of Sonoma",
    cities: [
      "Santa Rosa",
      "Petaluma",
      "Rohnert Park",
      "Windsor",
      "Healdsburg",
      "Sonoma",
      "Sebastopol",
      "Cloverdale",
    ],
    topServiceIds: ["divorce", "eviction", "living-trust", "probate"],
    intro:
      "Sonoma County is our home. As a Registered Legal Document Assistant (LDA #87) based here, we prepare court and legal documents for Santa Rosa, Petaluma, and communities across the county — accurately, affordably, and at your direction.",
    introEs:
      "El Condado de Sonoma es nuestra sede. Como Asistente Legal Registrado (LDA #87) con base aquí, preparamos documentos judiciales y legales para Santa Rosa, Petaluma y comunidades de todo el condado — con precisión, a precio accesible y según sus instrucciones.",
    local:
      "Filings for Sonoma County residents generally go through the Superior Court of California, County of Sonoma, in Santa Rosa, which handles family law, unlawful detainer (eviction), probate, and civil matters. Many local families also come to us for living trusts and deeds after buying property or rebuilding — we make sure the paperwork meets the court's and county recorder's requirements the first time.",
    localEs:
      "Los trámites de los residentes del Condado de Sonoma generalmente se presentan ante el Tribunal Superior de California, Condado de Sonoma, en Santa Rosa, que maneja derecho familiar, desalojos (unlawful detainer), sucesiones y asuntos civiles. Muchas familias locales también acuden a nosotros para fideicomisos en vida y escrituras después de comprar una propiedad o reconstruir — nos aseguramos de que los trámites cumplan con los requisitos del tribunal y del registrador del condado desde el principio.",
    faqs: [
      {
        q: "Where do I file legal documents in Sonoma County?",
        qEs: "¿Dónde presento documentos legales en el Condado de Sonoma?",
        a: "Most cases are filed at the Superior Court of California, County of Sonoma, in Santa Rosa. We prepare your documents correctly for that court; you review, sign, and file them (or file online where the court allows it).",
        aEs: "La mayoría de los casos se presentan en el Tribunal Superior de California, Condado de Sonoma, en Santa Rosa. Preparamos sus documentos correctamente para ese tribunal; usted los revisa, firma y presenta (o los presenta en línea donde el tribunal lo permita).",
      },
      {
        q: "Do you serve all of Sonoma County?",
        qEs: "¿Sirven a todo el Condado de Sonoma?",
        a: "Yes — Santa Rosa, Petaluma, Rohnert Park, Windsor, Healdsburg, Sonoma, Sebastopol, Cloverdale, and everywhere in between. We also offer remote service, so you don't have to come to us.",
        aEs: "Sí — Santa Rosa, Petaluma, Rohnert Park, Windsor, Healdsburg, Sonoma, Sebastopol, Cloverdale y todo lo que hay entre ellos. También ofrecemos servicio remoto, así que no tiene que venir a nuestra oficina.",
      },
    ],
  },
  {
    slug: "marin",
    name: "Marin",
    nameEs: "Marin",
    seat: "San Rafael",
    court: "Superior Court of California, County of Marin",
    cities: [
      "San Rafael",
      "Novato",
      "Mill Valley",
      "San Anselmo",
      "Larkspur",
      "Corte Madera",
      "Sausalito",
      "Tiburon",
    ],
    topServiceIds: ["living-trust", "deeds", "probate", "wills"],
    intro:
      "We prepare legal documents for Marin County residents — from San Rafael and Novato to Mill Valley and Tiburon. With Marin's high property values, estate planning and probate paperwork are especially common, and we handle them at a fraction of law-firm cost.",
    introEs:
      "Preparamos documentos legales para residentes del Condado de Marin — desde San Rafael y Novato hasta Mill Valley y Tiburon. Con los altos valores de propiedad de Marin, los trámites de planificación patrimonial y sucesión son especialmente comunes, y los manejamos por una fracción del costo de un bufete.",
    local:
      "Marin County court filings go through the Superior Court of California, County of Marin, at the Civic Center in San Rafael. Because home values here are high, a properly funded living trust can save families a great deal of time and cost by avoiding probate — and when probate is needed, correct paperwork keeps it moving. We also prepare grant, quitclaim, and trust-transfer deeds for the county recorder.",
    localEs:
      "Los trámites judiciales del Condado de Marin se presentan ante el Tribunal Superior de California, Condado de Marin, en el Civic Center de San Rafael. Como los valores de las viviendas aquí son altos, un fideicomiso en vida debidamente financiado puede ahorrarles a las familias mucho tiempo y costo al evitar la sucesión — y cuando la sucesión es necesaria, los trámites correctos la mantienen avanzando. También preparamos escrituras de concesión, finiquito (quitclaim) y transferencia a fideicomiso para el registrador del condado.",
    faqs: [
      {
        q: "Why is a living trust worth it in Marin County?",
        qEs: "¿Por qué vale la pena un fideicomiso en vida en el Condado de Marin?",
        a: "California probate costs are set as a percentage of the estate's value, so in a high-value county like Marin a living trust that avoids probate can save your family significant money and months of court time. We prepare the trust at your direction.",
        aEs: "Los costos de sucesión en California se establecen como un porcentaje del valor del patrimonio, así que en un condado de alto valor como Marin, un fideicomiso en vida que evita la sucesión puede ahorrarle a su familia dinero significativo y meses de tiempo judicial. Preparamos el fideicomiso según sus instrucciones.",
      },
      {
        q: "Do you prepare deeds for Marin County property?",
        qEs: "¿Preparan escrituras para propiedades del Condado de Marin?",
        a: "Yes — grant deeds, quitclaim deeds, interspousal transfers, and trust-transfer deeds, together with the Preliminary Change of Ownership Report the county recorder requires. You record them with the Marin County Recorder.",
        aEs: "Sí — escrituras de concesión, de finiquito (quitclaim), transferencias interconyugales y de transferencia a fideicomiso, junto con el Informe Preliminar de Cambio de Propiedad que exige el registrador del condado. Usted las registra con el Registrador del Condado de Marin.",
      },
    ],
  },
  {
    slug: "napa",
    name: "Napa",
    nameEs: "Napa",
    seat: "Napa",
    court: "Superior Court of California, County of Napa",
    cities: [
      "Napa",
      "American Canyon",
      "St. Helena",
      "Calistoga",
      "Yountville",
    ],
    topServiceIds: ["living-trust", "deeds", "divorce", "eviction"],
    intro:
      "We prepare legal and court documents for Napa County — the city of Napa, American Canyon, St. Helena, Calistoga, and Yountville. We serve the county's English- and Spanish-speaking communities alike, in the language you're most comfortable with.",
    introEs:
      "Preparamos documentos legales y judiciales para el Condado de Napa — la ciudad de Napa, American Canyon, St. Helena, Calistoga y Yountville. Servimos por igual a las comunidades de habla inglesa y española del condado, en el idioma con el que se sienta más cómodo.",
    local:
      "Napa County cases are filed at the Superior Court of California, County of Napa, in the city of Napa, covering family law, unlawful detainer, and probate. Napa Valley's property values make living trusts and deeds a frequent need, while the county's active rental market means eviction (unlawful detainer) paperwork comes up often — we prepare both, and everything is available in Spanish.",
    localEs:
      "Los casos del Condado de Napa se presentan ante el Tribunal Superior de California, Condado de Napa, en la ciudad de Napa, cubriendo derecho familiar, desalojos y sucesiones. Los valores de propiedad de Napa Valley hacen que los fideicomisos en vida y las escrituras sean una necesidad frecuente, mientras que el activo mercado de alquiler del condado significa que los trámites de desalojo (unlawful detainer) surgen a menudo — preparamos ambos, y todo está disponible en español.",
    faqs: [
      {
        q: "¿Ofrecen servicio en español en el Condado de Napa?",
        qEs: "¿Ofrecen servicio en español en el Condado de Napa?",
        a: "Yes — we prepare documents and communicate in both English and Spanish. Our full intake, service pages, and follow-up are available in Spanish for Napa County clients.",
        aEs: "Sí — preparamos documentos y nos comunicamos en inglés y español. Nuestro formulario completo, las páginas de servicios y el seguimiento están disponibles en español para clientes del Condado de Napa.",
      },
      {
        q: "Can you help a Napa County landlord with an eviction?",
        qEs: "¿Pueden ayudar a un propietario del Condado de Napa con un desalojo?",
        a: "Yes. We prepare the required notices and the unlawful detainer court forms for filing at the Napa County court, at your direction. Getting the notice and paperwork exactly right avoids delays that can restart the process.",
        aEs: "Sí. Preparamos los avisos requeridos y los formularios judiciales de desalojo (unlawful detainer) para presentar en el tribunal del Condado de Napa, según sus instrucciones. Preparar el aviso y los trámites exactamente bien evita retrasos que pueden reiniciar el proceso.",
      },
    ],
  },
  {
    slug: "solano",
    name: "Solano",
    nameEs: "Solano",
    seat: "Fairfield",
    court: "Superior Court of California, County of Solano",
    cities: [
      "Fairfield",
      "Vallejo",
      "Vacaville",
      "Benicia",
      "Suisun City",
      "Dixon",
      "Rio Vista",
    ],
    topServiceIds: ["eviction", "divorce", "small-claims", "name-change"],
    intro:
      "We prepare court and legal documents for Solano County — Vallejo, Fairfield, Vacaville, Benicia, and the surrounding communities. From family law to small claims and eviction paperwork, we help you file correctly without the cost of a law firm.",
    introEs:
      "Preparamos documentos judiciales y legales para el Condado de Solano — Vallejo, Fairfield, Vacaville, Benicia y las comunidades cercanas. Desde derecho familiar hasta reclamos menores y trámites de desalojo, le ayudamos a presentar correctamente sin el costo de un bufete de abogados.",
    local:
      "Solano County filings go through the Superior Court of California, County of Solano, in Fairfield, with a branch in Vallejo. The county's active rental market makes eviction (unlawful detainer) paperwork common, and its courts handle a steady volume of family law, small claims, and name-change cases — all of which we prepare at your direction.",
    localEs:
      "Los trámites del Condado de Solano se presentan ante el Tribunal Superior de California, Condado de Solano, en Fairfield, con una sucursal en Vallejo. El activo mercado de alquiler del condado hace comunes los trámites de desalojo (unlawful detainer), y sus tribunales manejan un volumen constante de casos de derecho familiar, reclamos menores y cambios de nombre — todos los cuales preparamos según sus instrucciones.",
    faqs: [
      {
        q: "Where are Solano County cases heard?",
        qEs: "¿Dónde se atienden los casos del Condado de Solano?",
        a: "At the Superior Court of California, County of Solano, in Fairfield, with a branch courthouse in Vallejo. We prepare your documents for the correct location; you review, sign, and file them.",
        aEs: "En el Tribunal Superior de California, Condado de Solano, en Fairfield, con un tribunal sucursal en Vallejo. Preparamos sus documentos para la ubicación correcta; usted los revisa, firma y presenta.",
      },
      {
        q: "How much can I sue for in Solano County small claims?",
        qEs: "¿Por cuánto puedo demandar en reclamos menores del Condado de Solano?",
        a: "California small claims limits apply countywide — generally up to $12,500 for individuals. We prepare the plaintiff or defendant paperwork for the Solano County court at your direction.",
        aEs: "Los límites de reclamos menores de California aplican en todo el condado — generalmente hasta $12,500 para individuos. Preparamos los trámites de demandante o demandado para el tribunal del Condado de Solano según sus instrucciones.",
      },
    ],
  },
];

export function getCounty(slug: string): County | undefined {
  return COUNTIES.find((c) => c.slug === slug);
}

// Localized text accessor, falling back to English if a Spanish field is empty.
export function localizedCounty<
  K extends "name" | "intro" | "local",
>(county: County, field: K, lang: Language): string {
  if (lang === "es") {
    const es = county[`${field}Es` as keyof County];
    if (typeof es === "string" && es.length > 0) return es;
  }
  return county[field] as string;
}
