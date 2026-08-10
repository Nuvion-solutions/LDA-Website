import { ShieldCheck, BadgeDollarSign, Zap, CalendarClock } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

// The client's four promises — the objection-killers that turn an ad click into
// a lead. Rendered right under the hero form on the service and pricing pages.
// Server component: takes the already-resolved locale so it drops straight into
// the server pages that use it (no language context needed). Keeps the same
// look as the trust strips it replaces, but leads with guarantees and folds the
// registered/bonded + attorney-savings trust signals into a footnote.
export function OfferGuarantees({ lang }: { lang: string }) {
  const es = lang === "es";
  const guarantees = [
    {
      Icon: ShieldCheck,
      title: es ? "Garantía listo para la corte" : "Court-Ready Guarantee",
      sub: es
        ? "Preparado correctamente o lo corregimos gratis"
        : "Prepared right or we fix it free",
    },
    {
      Icon: BadgeDollarSign,
      title: es ? "Precio fijo garantizado" : "Flat-Fee Price Lock",
      sub: es
        ? "Un precio cotizado — nunca más alto"
        : "One quoted price — never higher",
    },
    {
      Icon: Zap,
      title: es ? "Respuesta el mismo día" : "Same-Day Response",
      sub: es
        ? "A menudo en menos de una hora, Lun–Sáb"
        : "Often within the hour, Mon–Sat",
    },
    {
      Icon: CalendarClock,
      title: es ? "Empezamos en 48 horas" : "Start Within 48 Hours",
      sub: es
        ? "Reserve esta semana y comenzamos en 2 días"
        : "Book this week, we begin in two days",
    },
  ];

  return (
    <section className="bg-[var(--color-offwhite)] border-b border-[var(--color-border-light)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 md:py-9">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-navy)] opacity-55 mb-5">
          {es ? "Nuestra promesa" : "Our promise to you"}
        </p>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
          {guarantees.map(({ Icon, title, sub }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-sm bg-white border border-[var(--color-gold)]/40">
                <Icon
                  className="h-5 w-5 text-[var(--color-gold)]"
                  aria-hidden
                  strokeWidth={1.5}
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-navy)] leading-snug">
                  {title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--color-body-dark)] opacity-75 leading-snug">
                  {sub}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-[var(--color-body-dark)] opacity-70 leading-snug">
          {es
            ? `Registrado y afianzado · ${BUSINESS.lda} · Condado de Sonoma · Una fracción del costo de un abogado`
            : `Registered & bonded · ${BUSINESS.lda} · Sonoma County · A fraction of attorney fees`}
        </p>
      </div>
    </section>
  );
}
