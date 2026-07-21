"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquareText, CheckCircle2 } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { CallLink } from "@/components/analytics/CallLink";
import { sendGAEvent } from "@next/third-parties/google";
import { useLanguage } from "@/lib/language-context";

// Low-friction "Free Consultation" lead card. Three fields only (name, phone,
// service) — the fastest path to a lead. Shown above the fold in the homepage
// hero AND on every service landing page (so paid ad clicks, which mostly land
// on /services/* pages, hit a form immediately instead of a button-hunt). On
// success it fires the SAME conversions as the full intake form
// (GA4 generate_lead + Meta Lead + Google Ads conversion) so a quick lead counts
// exactly like a full intake. The full multi-step intake lives at /intake for
// people who want to give more detail.
//
// `defaultService` pre-selects the service dropdown (e.g. the divorce landing
// page passes "Divorce & Family") so the form arrives already about the
// visitor's need. It must match one of the SERVICES values below, or be omitted.

const SERVICES: { value: string; en: string; es: string }[] = [
  { value: "Divorce & Family", en: "Divorce & Family", es: "Divorcio y Familia" },
  { value: "Living Trust / Estate", en: "Living Trust / Estate", es: "Fideicomiso / Patrimonio" },
  { value: "Wills & Power of Attorney", en: "Wills & Power of Attorney", es: "Testamentos y Poder Notarial" },
  { value: "Eviction (Unlawful Detainer)", en: "Eviction (Unlawful Detainer)", es: "Desalojo (Unlawful Detainer)" },
  { value: "Probate", en: "Probate", es: "Sucesiones (Probate)" },
  { value: "Name Change", en: "Name Change", es: "Cambio de Nombre" },
  { value: "Small Claims", en: "Small Claims", es: "Reclamos Menores" },
  { value: "Deeds / Property", en: "Deeds / Property", es: "Escrituras / Propiedad" },
  { value: "Other", en: "Something else", es: "Otro" },
];

export function QuickConsultForm({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const { lang } = useLanguage();
  const es = lang === "es";
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(false);
    const leadId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `q_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          phone,
          primaryService: service,
          contactMethod: "phone",
          source: "quick_consult_hero",
          leadId,
          lang,
          website,
        }),
      });
      if (!res.ok) throw new Error("failed");
      // Mirror the full intake's conversion events so a quick lead counts too.
      if (process.env.NEXT_PUBLIC_GA_ID) {
        sendGAEvent("event", "generate_lead", { service });
      }
      if (process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
        window.fbq?.("track", "Lead", { content_name: service }, { eventID: leadId });
      }
      if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL) {
        window.gtag?.("event", "conversion", {
          send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
        });
      }
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white text-[var(--color-body-dark)] rounded-md shadow-xl border border-black/5 p-7 md:p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-[var(--color-gold)] mx-auto mb-4" aria-hidden />
        <h3 className="font-serif text-2xl mb-2">
          {es ? `¡Gracias, ${firstName || ""}!` : `Thank you${firstName ? `, ${firstName}` : ""}!`}
        </h3>
        <p className="text-sm text-[var(--color-body-dark)]/80 leading-relaxed">
          {es
            ? `Recibimos su solicitud. Le llamaremos pronto al ${phone}. ¿Necesita ayuda ahora?`
            : `We've got your request and will call you shortly at ${phone}. Need help right now?`}
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
          <CallLink
            source="quick_form_success"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-navy)] text-white px-5 py-2.5 rounded-sm text-sm font-medium"
          >
            <Phone className="h-4 w-4" aria-hidden /> {BUSINESS.phone}
          </CallLink>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white text-[var(--color-body-dark)] rounded-md shadow-xl border border-black/5 p-6 md:p-7">
      <div className="mb-4">
        <p className="text-[var(--color-gold)] text-xs font-semibold tracking-[0.14em] uppercase">
          {es ? "Consulta Gratis" : "Free Consultation"}
        </p>
        <h3 className="font-serif text-2xl leading-tight mt-1">
          {es ? "Empiece en 30 segundos" : "Get Started in 30 Seconds"}
        </h3>
        <p className="text-sm text-[var(--color-body-dark)]/70 mt-1">
          {es
            ? "Sin compromiso. Respuesta el mismo día — a menudo en menos de una hora."
            : "No obligation. Same-day response — often within the hour."}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        {/* Honeypot — hidden from users, catches bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden
        />
        <div>
          <label htmlFor="qc-name" className="sr-only">
            {es ? "Nombre" : "First name"}
          </label>
          <input
            id="qc-name"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={es ? "Nombre" : "First name"}
            className="w-full rounded-sm border border-black/15 px-3.5 py-2.5 text-sm focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
          />
        </div>
        <div>
          <label htmlFor="qc-phone" className="sr-only">
            {es ? "Teléfono" : "Phone"}
          </label>
          <input
            id="qc-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={es ? "Teléfono" : "Phone number"}
            className="w-full rounded-sm border border-black/15 px-3.5 py-2.5 text-sm focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
          />
        </div>
        <div>
          <label htmlFor="qc-service" className="sr-only">
            {es ? "Servicio" : "Service"}
          </label>
          <select
            id="qc-service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-sm border border-black/15 px-3.5 py-2.5 text-sm bg-white focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
          >
            <option value="" disabled>
              {es ? "¿Qué necesita?" : "What do you need help with?"}
            </option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {es ? s.es : s.en}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-700">
            {es
              ? "No se pudo enviar. Por favor llámenos."
              : "Couldn't send — please call us instead."}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-6 py-3 rounded-sm tracking-wide transition-colors disabled:opacity-60"
        >
          {submitting
            ? es
              ? "Enviando…"
              : "Sending…"
            : es
              ? "Solicitar Consulta Gratis"
              : "Get My Free Consultation"}
        </button>
      </form>

      {/* Two even lower-friction paths for people who'd rather talk now. */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <CallLink
          source="quick_form_call"
          className="inline-flex items-center justify-center gap-1.5 border border-black/15 rounded-sm py-2 text-sm font-medium text-[var(--color-navy)] hover:border-[var(--color-gold)]"
        >
          <Phone className="h-4 w-4" aria-hidden /> {es ? "Llamar" : "Call"}
        </CallLink>
        <a
          href={`sms:${BUSINESS.phoneTel}`}
          onClick={() => {
            try {
              sendGAEvent("event", "text_click", { source: "quick_form" });
              // Texting is the same "Contact" conversion as a call click.
              if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL) {
                window.gtag?.("event", "conversion", {
                  send_to:
                    process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL,
                });
              }
            } catch {
              /* never block */
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 border border-black/15 rounded-sm py-2 text-sm font-medium text-[var(--color-navy)] hover:border-[var(--color-gold)]"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden /> {es ? "Texto" : "Text"}
        </a>
      </div>

      <p className="mt-3 text-[11px] leading-snug text-[var(--color-body-dark)]/55">
        {es
          ? "LDA #87 · Condado de Sonoma. No somos un bufete de abogados y no damos asesoría legal."
          : "Registered LDA #87 · Sonoma County. Not a law firm; we do not give legal advice."}
      </p>
    </div>
  );
}
