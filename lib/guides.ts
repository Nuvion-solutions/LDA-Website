// Educational guides. These target informational searches ("how to file an
// uncontested divorce in California") and funnel readers to the relevant
// service page + intake. Content is general process information, NOT legal
// advice — every guide keeps that framing, consistent with our LDA role.
//
// Bilingual, data-driven (same pattern as services/counties) so each guide
// renders EN at /guides/[slug] and ES at /es/guides/[slug].

import type { Language } from "./translations";

export type GuideSection = {
  heading: string;
  headingEs: string;
  body: string[];
  bodyEs: string[];
};

export type GuideFaq = {
  q: string;
  a: string;
  qEs: string;
  aEs: string;
};

export type Guide = {
  slug: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  // Short label for cards/lists.
  summary: string;
  summaryEs: string;
  // Service this guide funnels to (id from lib/services.ts).
  relatedServiceId: string;
  // ISO date the guide was published (for Article schema).
  published: string;
  intro: string;
  introEs: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-file-uncontested-divorce-california",
    title: "How to File for an Uncontested Divorce in California",
    titleEs: "Cómo Solicitar un Divorcio Sin Oposición en California",
    description:
      "A plain-English overview of the uncontested divorce process in California — residency, forms, the six-month waiting period, and how document preparation helps.",
    descriptionEs:
      "Una explicación clara del proceso de divorcio sin oposición en California — residencia, formularios, el período de espera de seis meses y cómo ayuda la preparación de documentos.",
    summary:
      "The steps, forms, and timeline for an uncontested California divorce — and where a document assistant fits in.",
    summaryEs:
      "Los pasos, formularios y plazos de un divorcio sin oposición en California — y dónde encaja un asistente de documentos.",
    relatedServiceId: "divorce",
    published: "2026-07-08",
    intro:
      "An uncontested divorce — where both spouses agree on the terms — is the most straightforward way to end a marriage in California, and many couples complete it without hiring an attorney. This guide walks through the general process so you know what to expect. It is general information, not legal advice; as a Registered Legal Document Assistant, we prepare your forms at your direction.",
    introEs:
      "Un divorcio sin oposición — en el que ambos cónyuges están de acuerdo con los términos — es la forma más sencilla de terminar un matrimonio en California, y muchas parejas lo completan sin contratar a un abogado. Esta guía explica el proceso general para que sepa qué esperar. Es información general, no asesoría legal; como Asistente Legal Registrado, preparamos sus formularios según sus instrucciones.",
    sections: [
      {
        heading: "1. Confirm the residency requirement",
        headingEs: "1. Confirme el requisito de residencia",
        body: [
          "To file for divorce in California, at least one spouse must have lived in the state for the past six months and in the county where you file for the past three months.",
          "If you don't meet the residency requirement yet, you may still be able to file for a legal separation and amend it to a divorce later.",
        ],
        bodyEs: [
          "Para solicitar el divorcio en California, al menos un cónyuge debe haber vivido en el estado durante los últimos seis meses y en el condado donde presenta durante los últimos tres meses.",
          "Si aún no cumple con el requisito de residencia, es posible que pueda solicitar una separación legal y convertirla en divorcio más adelante.",
        ],
      },
      {
        heading: "2. Prepare and file the petition",
        headingEs: "2. Prepare y presente la petición",
        body: [
          "The case starts with a Petition (form FL-100) and, when there are children, related custody and support forms. You file these with the superior court in your county and pay the filing fee (a fee waiver is available if you qualify).",
          "This is where accurate paperwork matters most — errors or missing forms are a common reason petitions get rejected and delayed.",
        ],
        bodyEs: [
          "El caso comienza con una Petición (formulario FL-100) y, cuando hay hijos, formularios relacionados de custodia y manutención. Los presenta ante el tribunal superior de su condado y paga la tarifa de presentación (hay una exención de tarifa disponible si califica).",
          "Aquí es donde los trámites correctos importan más — los errores o formularios faltantes son una razón común por la que se rechazan y retrasan las peticiones.",
        ],
      },
      {
        heading: "3. Serve your spouse",
        headingEs: "3. Notifique a su cónyuge",
        body: [
          "The other spouse must be formally served with the paperwork by someone over 18 who is not part of the case. In an uncontested divorce, the served spouse often signs a form acknowledging receipt and agreeing not to contest.",
          "Proper service is legally important — the six-month clock (below) starts from the date of service.",
        ],
        bodyEs: [
          "El otro cónyuge debe ser notificado formalmente con los documentos por alguien mayor de 18 años que no sea parte del caso. En un divorcio sin oposición, el cónyuge notificado a menudo firma un formulario reconociendo la recepción y aceptando no oponerse.",
          "La notificación adecuada es legalmente importante — el reloj de seis meses (más abajo) comienza desde la fecha de notificación.",
        ],
      },
      {
        heading: "4. Exchange financial disclosures",
        headingEs: "4. Intercambien declaraciones financieras",
        body: [
          "Both spouses must exchange declarations of their income, expenses, assets, and debts. This step is required even when everything is agreed — the court needs it to finalize the divorce.",
          "A written marital settlement agreement records how you're dividing property, debts, and support, and becomes part of the judgment.",
        ],
        bodyEs: [
          "Ambos cónyuges deben intercambiar declaraciones de sus ingresos, gastos, bienes y deudas. Este paso es obligatorio incluso cuando todo está acordado — el tribunal lo necesita para finalizar el divorcio.",
          "Un acuerdo de liquidación matrimonial por escrito registra cómo dividen los bienes, las deudas y la manutención, y se convierte en parte de la sentencia.",
        ],
      },
      {
        heading: "5. The six-month waiting period and judgment",
        headingEs: "5. El período de espera de seis meses y la sentencia",
        body: [
          "California law imposes a mandatory six-month waiting period from the date the responding spouse is served before a divorce can be final. You can prepare and submit the judgment paperwork during this time.",
          "Once the court approves the judgment and the waiting period has passed, the divorce is final.",
        ],
        bodyEs: [
          "La ley de California impone un período de espera obligatorio de seis meses desde la fecha en que se notifica al cónyuge que responde antes de que un divorcio pueda finalizar. Puede preparar y presentar los documentos de la sentencia durante este tiempo.",
          "Una vez que el tribunal aprueba la sentencia y ha pasado el período de espera, el divorcio es definitivo.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do both spouses have to agree for a divorce to be uncontested?",
        qEs: "¿Ambos cónyuges deben estar de acuerdo para que un divorcio sea sin oposición?",
        a: "Yes — an uncontested divorce means both spouses agree on the major terms (property, support, custody). If you can't agree, the case is contested and typically needs an attorney. We can still prepare the documents for an uncontested case at your direction.",
        aEs: "Sí — un divorcio sin oposición significa que ambos cónyuges están de acuerdo con los términos principales (bienes, manutención, custodia). Si no pueden ponerse de acuerdo, el caso es disputado y normalmente necesita un abogado. Aún podemos preparar los documentos para un caso sin oposición según sus instrucciones.",
      },
      {
        q: "Can it really be final in exactly six months?",
        qEs: "¿Realmente puede finalizar en exactamente seis meses?",
        a: "Six months is the earliest a California divorce can be final — the actual time depends on how quickly the paperwork is completed and the court's schedule. Getting the forms right the first time avoids delays that push it out further.",
        aEs: "Seis meses es lo más pronto que un divorcio en California puede finalizar — el tiempo real depende de qué tan rápido se completen los trámites y del calendario del tribunal. Preparar los formularios correctamente desde el principio evita retrasos que lo alargan más.",
      },
    ],
  },
  {
    slug: "california-eviction-process-for-landlords",
    title: "The California Eviction Process for Landlords, Step by Step",
    titleEs: "El Proceso de Desalojo en California para Propietarios, Paso a Paso",
    description:
      "How the unlawful detainer (eviction) process works in California — notices, filing, service, the hearing, and why correct paperwork keeps it on track.",
    descriptionEs:
      "Cómo funciona el proceso de desalojo (unlawful detainer) en California — avisos, presentación, notificación, la audiencia y por qué los trámites correctos lo mantienen en curso.",
    summary:
      "The notice, court forms, and timeline of a California unlawful detainer — and the errors that restart the clock.",
    summaryEs:
      "El aviso, los formularios judiciales y los plazos de un desalojo en California — y los errores que reinician el reloj.",
    relatedServiceId: "eviction",
    published: "2026-07-08",
    intro:
      "Evicting a tenant in California means following the unlawful detainer process exactly — the rules are strict, and a single mistake in the notice or paperwork can force you to start over. This guide explains the general steps. It's general information, not legal advice; we prepare the notices and court forms at your direction.",
    introEs:
      "Desalojar a un inquilino en California significa seguir el proceso de unlawful detainer exactamente — las reglas son estrictas, y un solo error en el aviso o los trámites puede obligarle a empezar de nuevo. Esta guía explica los pasos generales. Es información general, no asesoría legal; preparamos los avisos y formularios judiciales según sus instrucciones.",
    sections: [
      {
        heading: "1. Serve the correct written notice",
        headingEs: "1. Entregue el aviso escrito correcto",
        body: [
          "Almost every eviction starts with a written notice. The type depends on the reason — for example, a 3-Day Notice to Pay Rent or Quit for unpaid rent, or a 30- or 60-day notice to end certain tenancies.",
          "The notice has to state the right amount, dates, and language, and be served correctly. Getting this wrong is the single most common reason evictions fail.",
        ],
        bodyEs: [
          "Casi todo desalojo comienza con un aviso escrito. El tipo depende de la razón — por ejemplo, un Aviso de 3 días para Pagar la Renta o Desalojar por renta no pagada, o un aviso de 30 o 60 días para terminar ciertos arrendamientos.",
          "El aviso debe indicar la cantidad, las fechas y el lenguaje correctos, y ser entregado correctamente. Hacer esto mal es la razón más común por la que fallan los desalojos.",
        ],
      },
      {
        heading: "2. File the unlawful detainer lawsuit",
        headingEs: "2. Presente la demanda de unlawful detainer",
        body: [
          "If the tenant doesn't comply with the notice, the next step is filing an unlawful detainer complaint (form UD-100) and summons with the superior court, along with a copy of the notice and lease.",
          "This officially begins the court case. Because unlawful detainer moves faster than most lawsuits, accurate, complete forms matter.",
        ],
        bodyEs: [
          "Si el inquilino no cumple con el aviso, el siguiente paso es presentar una demanda de unlawful detainer (formulario UD-100) y citación ante el tribunal superior, junto con una copia del aviso y el contrato de arrendamiento.",
          "Esto comienza oficialmente el caso judicial. Como el unlawful detainer avanza más rápido que la mayoría de las demandas, los formularios correctos y completos importan.",
        ],
      },
      {
        heading: "3. Serve the tenant and await a response",
        headingEs: "3. Notifique al inquilino y espere una respuesta",
        body: [
          "The tenant must be served with the complaint and summons. They then have a limited number of days to respond in writing.",
          "If the tenant doesn't respond in time, you may be able to request a default judgment. If they do respond, the case proceeds to a hearing.",
        ],
        bodyEs: [
          "El inquilino debe ser notificado con la demanda y la citación. Luego tiene un número limitado de días para responder por escrito.",
          "Si el inquilino no responde a tiempo, es posible que pueda solicitar una sentencia en rebeldía. Si responde, el caso avanza a una audiencia.",
        ],
      },
      {
        heading: "4. The hearing and judgment",
        headingEs: "4. La audiencia y la sentencia",
        body: [
          "At the hearing, both sides present their case and the judge decides. If the landlord prevails, the court issues a judgment for possession.",
          "Only the sheriff can carry out a lockout — a landlord may never remove a tenant or their belongings personally.",
        ],
        bodyEs: [
          "En la audiencia, ambas partes presentan su caso y el juez decide. Si el propietario gana, el tribunal emite una sentencia de posesión.",
          "Solo el alguacil (sheriff) puede llevar a cabo un desalojo físico — un propietario nunca puede sacar a un inquilino o sus pertenencias personalmente.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a California eviction take?",
        qEs: "¿Cuánto tarda un desalojo en California?",
        a: "An uncontested unlawful detainer often resolves in roughly 30–45 days, but a defective notice or paperwork error can add weeks or restart the process. Correct documents are the biggest factor you control.",
        aEs: "Un unlawful detainer sin oposición a menudo se resuelve en aproximadamente 30 a 45 días, pero un aviso defectuoso o un error de papeleo puede agregar semanas o reiniciar el proceso. Los documentos correctos son el factor más importante que usted controla.",
      },
      {
        q: "Can I change the locks or shut off utilities instead?",
        qEs: "¿Puedo cambiar las cerraduras o cortar los servicios en su lugar?",
        a: "No. 'Self-help' evictions — changing locks, removing belongings, or shutting off utilities — are illegal in California and can expose a landlord to penalties. The unlawful detainer court process is the lawful path.",
        aEs: "No. Los desalojos por 'mano propia' — cambiar cerraduras, quitar pertenencias o cortar servicios — son ilegales en California y pueden exponer al propietario a sanciones. El proceso judicial de unlawful detainer es la vía legal.",
      },
    ],
  },
  {
    slug: "living-trust-vs-will-california",
    title: "Living Trust vs. Will in California: Which Do You Need?",
    titleEs: "Fideicomiso en Vida vs. Testamento en California: ¿Cuál Necesita?",
    description:
      "How a living trust and a will differ in California, how probate factors in, and how to decide which estate planning documents fit your situation.",
    descriptionEs:
      "Cómo se diferencian un fideicomiso en vida y un testamento en California, cómo influye la sucesión (probate) y cómo decidir qué documentos de planificación patrimonial se ajustan a su situación.",
    summary:
      "How a will and a living trust differ, what probate means, and how to decide which one fits.",
    summaryEs:
      "Cómo se diferencian un testamento y un fideicomiso en vida, qué significa la sucesión y cómo decidir cuál se ajusta.",
    relatedServiceId: "living-trust",
    published: "2026-07-08",
    intro:
      "'Should I get a will or a living trust?' is one of the most common estate planning questions in California. Both put your wishes in writing, but they work differently — especially when it comes to probate. This guide explains the difference in plain terms. It's general information, not legal advice; we prepare whichever documents you direct.",
    introEs:
      "'¿Debo tener un testamento o un fideicomiso en vida?' es una de las preguntas más comunes de planificación patrimonial en California. Ambos ponen sus deseos por escrito, pero funcionan de manera diferente — especialmente en cuanto a la sucesión (probate). Esta guía explica la diferencia en términos sencillos. Es información general, no asesoría legal; preparamos los documentos que usted indique.",
    sections: [
      {
        heading: "What a will does",
        headingEs: "Qué hace un testamento",
        body: [
          "A will states who receives your property, names an executor, and can nominate guardians for minor children. It only takes effect after death.",
          "A will generally must go through probate — the public court process that validates the will and oversees distributing the estate, which can take many months.",
        ],
        bodyEs: [
          "Un testamento indica quién recibe sus bienes, nombra a un albacea y puede nominar tutores para hijos menores. Solo entra en vigor después del fallecimiento.",
          "Un testamento generalmente debe pasar por la sucesión (probate) — el proceso judicial público que valida el testamento y supervisa la distribución del patrimonio, lo que puede tardar muchos meses.",
        ],
      },
      {
        heading: "What a living trust does",
        headingEs: "Qué hace un fideicomiso en vida",
        body: [
          "A revocable living trust holds your assets during your life and passes them to your beneficiaries after death — generally without probate. You stay in control of everything while you're alive and can change it any time.",
          "Avoiding probate can save your family significant time and cost, which is why trusts are popular in higher-value California counties.",
        ],
        bodyEs: [
          "Un fideicomiso revocable en vida mantiene sus bienes durante su vida y los transfiere a sus beneficiarios después del fallecimiento — generalmente sin sucesión. Usted mantiene el control de todo mientras vive y puede cambiarlo en cualquier momento.",
          "Evitar la sucesión puede ahorrarle a su familia tiempo y costo significativos, por lo que los fideicomisos son populares en los condados de California de mayor valor.",
        ],
      },
      {
        heading: "How to decide",
        headingEs: "Cómo decidir",
        body: [
          "As a general rule, people who own real estate or have larger estates often benefit from a living trust to avoid probate, while a will may be enough for simpler situations. Many people have both — a trust plus a 'pour-over' will that catches anything not in the trust.",
          "Which is right for you is a personal and legal decision. We can't advise which to choose, but once you decide, we prepare the documents accurately.",
        ],
        bodyEs: [
          "Como regla general, las personas que poseen bienes inmuebles o tienen patrimonios más grandes a menudo se benefician de un fideicomiso en vida para evitar la sucesión, mientras que un testamento puede ser suficiente para situaciones más simples. Muchas personas tienen ambos — un fideicomiso más un testamento 'pour-over' que cubre lo que no esté en el fideicomiso.",
          "Cuál es adecuado para usted es una decisión personal y legal. No podemos aconsejar cuál elegir, pero una vez que decida, preparamos los documentos con precisión.",
        ],
      },
      {
        heading: "Don't forget a health care directive and power of attorney",
        headingEs: "No olvide una directiva de atención médica y un poder notarial",
        body: [
          "A complete estate plan usually also includes an Advance Health Care Directive (who makes medical decisions if you can't) and a Power of Attorney (who handles finances). These work alongside a will or trust.",
          "We can prepare these together with your will or trust so your plan is complete.",
        ],
        bodyEs: [
          "Un plan patrimonial completo generalmente también incluye una Directiva Anticipada de Atención Médica (quién toma decisiones médicas si usted no puede) y un Poder Notarial (quién maneja las finanzas). Estos funcionan junto con un testamento o fideicomiso.",
          "Podemos preparar estos junto con su testamento o fideicomiso para que su plan esté completo.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a living trust always better than a will?",
        qEs: "¿Un fideicomiso en vida siempre es mejor que un testamento?",
        a: "Not always — it depends on your assets and goals. A trust avoids probate but takes more to set up and 'fund'; a will is simpler but goes through probate. The right choice is personal, and we prepare whichever you direct.",
        aEs: "No siempre — depende de sus bienes y objetivos. Un fideicomiso evita la sucesión pero requiere más para establecerse y 'financiarse'; un testamento es más simple pero pasa por la sucesión. La elección correcta es personal, y preparamos el que usted indique.",
      },
      {
        q: "What does it mean to 'fund' a trust?",
        qEs: "¿Qué significa 'financiar' un fideicomiso?",
        a: "Funding means transferring your assets — like retitling real estate with a trust-transfer deed — into the trust's name. A trust only avoids probate for assets actually placed in it. We can prepare the trust transfer deed for real property.",
        aEs: "Financiar significa transferir sus bienes — como cambiar el título de bienes inmuebles con una escritura de transferencia a fideicomiso — al nombre del fideicomiso. Un fideicomiso solo evita la sucesión de los bienes que realmente se colocan en él. Podemos preparar la escritura de transferencia a fideicomiso para bienes inmuebles.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function localizedGuide<
  K extends "title" | "description" | "summary" | "intro",
>(guide: Guide, field: K, lang: Language): string {
  if (lang === "es") {
    const es = guide[`${field}Es` as keyof Guide];
    if (typeof es === "string" && es.length > 0) return es;
  }
  return guide[field] as string;
}
