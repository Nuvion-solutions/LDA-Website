"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Phone, X } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { sendGAEvent } from "@next/third-parties/google";
import { useLanguage } from "@/lib/language-context";

// ---------------------------------------------------------------------------
// Call-capture: turns anonymous call/text taps into followable leads.
//
// Tapping a phone link fires the Google Ads click-to-call conversion, but if
// the visitor hangs up before dialing, calls after hours, or clicks on a
// desktop where tel:/sms: links usually dead-end, the lead is lost with no
// name or number on our side. This modal closes that gap:
//   - mobile ("fallback"): the dialer/SMS app still opens instantly — zero
//     friction for real callers — and the modal waits underneath offering a
//     callback for anyone who didn't get through.
//   - desktop ("primary"): the dead tel:/sms: navigation is prevented and the
//     modal becomes the path — the number to dial from a phone, plus the
//     callback form.
// The form posts to /api/intake (source "call_capture") so the lead lands in
// the same inbox as every other form, and fires the same lead conversions as
// the quick-consult form.
// ---------------------------------------------------------------------------

const OPEN_EVENT = "clde:open-call-capture";

type CaptureKind = "call" | "text";
type CaptureMode = "fallback" | "primary";
type OpenDetail = { kind: CaptureKind; mode: CaptureMode };

// Shared click handler for every call/text surface. Call it from the anchor's
// onClick after analytics. On mobile the native app opens as usual (default
// not prevented) and the modal waits as a fallback; on desktop the navigation
// is prevented and the modal is the primary path.
export function captureCallClick(
  e: { preventDefault: () => void },
  kind: CaptureKind,
) {
  if (typeof window === "undefined") return;
  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  if (!isMobile) e.preventDefault();
  window.dispatchEvent(
    new CustomEvent<OpenDetail>(OPEN_EVENT, {
      detail: { kind, mode: isMobile ? "fallback" : "primary" },
    }),
  );
}

export function CallCaptureModal() {
  const { lang } = useLanguage();
  const es = lang === "es";
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<OpenDetail>({
    kind: "call",
    mode: "fallback",
  });
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<OpenDetail>).detail;
      if (d) setDetail(d);
      setSubmitted(false);
      setError(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(false);
    const leadId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `cb_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          phone,
          contactMethod: "phone",
          source: "call_capture",
          leadId,
          lang,
          website,
        }),
      });
      if (!res.ok) throw new Error("failed");
      // A spam-filtered submission gets a success-shaped response (mode
      // "ignored") — never delivered, so it must not count as a conversion.
      const result = await res.json().catch(() => null);
      const delivered = result?.mode !== "ignored";
      // A callback request is a real lead — fire the same conversion set as
      // the quick-consult form so it counts like any other form lead.
      if (delivered && process.env.NEXT_PUBLIC_GA_ID) {
        sendGAEvent("event", "generate_lead", { service: "Callback" });
      }
      if (delivered && process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
        window.fbq?.("track", "Lead", { content_name: "Callback" }, { eventID: leadId });
      }
      if (delivered && process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL) {
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

  if (!open) return null;

  const primary = detail.mode === "primary";
  const isText = detail.kind === "text";
  const contactHref = isText
    ? `sms:${BUSINESS.phoneTel}`
    : `tel:${BUSINESS.phoneTel}`;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center bg-black/50 p-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label={es ? "Solicitar una llamada" : "Request a callback"}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-sm bg-white text-[var(--color-body-dark)] rounded-md shadow-xl border border-black/5 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[var(--color-gold)] text-xs font-semibold tracking-[0.14em] uppercase">
            {es ? "Consulta Gratis" : "Free Consultation"}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={es ? "Cerrar" : "Close"}
            className="-mt-1 -mr-1 p-1 text-[var(--color-body-dark)]/50 hover:text-[var(--color-navy)]"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle2
              className="h-10 w-10 text-[var(--color-gold)] mx-auto mb-3"
              aria-hidden
            />
            <h3 className="font-serif text-xl mb-1.5">
              {es
                ? `¡Gracias${firstName ? `, ${firstName}` : ""}!`
                : `Thank you${firstName ? `, ${firstName}` : ""}!`}
            </h3>
            <p className="text-sm text-[var(--color-body-dark)]/80 leading-relaxed">
              {es
                ? `Le llamaremos pronto al ${phone} — el mismo día en horario de oficina.`
                : `We'll call you back at ${phone} — same day during business hours.`}
            </p>
          </div>
        ) : (
          <>
            {primary ? (
              <>
                <h3 className="font-serif text-2xl leading-tight mt-1">
                  {isText
                    ? es
                      ? "Envíenos un texto"
                      : "Text us anytime"
                    : es
                      ? "Llámenos directamente"
                      : "Call us directly"}
                </h3>
                <a
                  href={contactHref}
                  className="mt-2 inline-flex items-center gap-2 text-xl font-semibold text-[var(--color-navy)]"
                >
                  <Phone className="h-5 w-5 text-[var(--color-gold)]" aria-hidden />
                  {BUSINESS.phone}
                </a>
                <p className="text-sm text-[var(--color-body-dark)]/70 mt-1">
                  {es
                    ? "Lun–sáb, 9am–5pm. ¿Prefiere que le llamemos? Deje sus datos:"
                    : "Mon–Sat, 9am–5pm. Prefer we call you? Leave your info:"}
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-2xl leading-tight mt-1">
                  {es ? "¿No pudo comunicarse?" : "Didn't get through?"}
                </h3>
                <p className="text-sm text-[var(--color-body-dark)]/70 mt-1">
                  {es
                    ? "Deje su nombre y número y le devolveremos la llamada el mismo día en horario de oficina (lun–sáb 9–5)."
                    : "Leave your name and number and we'll call you back — same day during business hours (Mon–Sat 9–5)."}
                </p>
              </>
            )}

            <form onSubmit={onSubmit} className="mt-4 space-y-3" noValidate>
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
                <label htmlFor="cb-name" className="sr-only">
                  {es ? "Nombre" : "First name"}
                </label>
                <input
                  id="cb-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={es ? "Nombre" : "First name"}
                  className="w-full rounded-sm border border-black/15 px-3.5 py-2.5 text-sm focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                />
              </div>
              <div>
                <label htmlFor="cb-phone" className="sr-only">
                  {es ? "Teléfono" : "Phone"}
                </label>
                <input
                  id="cb-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={es ? "Teléfono" : "Phone number"}
                  className="w-full rounded-sm border border-black/15 px-3.5 py-2.5 text-sm focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                />
              </div>

              {error && (
                <p className="text-sm text-red-700">
                  {es
                    ? `No se pudo enviar. Por favor llámenos al ${BUSINESS.phone}.`
                    : `Couldn't send — please call us at ${BUSINESS.phone}.`}
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
                    ? "Solicitar una llamada"
                    : "Request a callback"}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--color-body-dark)]/55">
                <Lock className="h-3 w-3 shrink-0" aria-hidden />
                {es
                  ? "Su información es privada y confidencial."
                  : "Your information is private & confidential."}
              </p>
            </form>

            <p className="mt-3 text-[11px] leading-snug text-[var(--color-body-dark)]/55">
              {es
                ? "LDA #87 · Condado de Sonoma. No somos un bufete de abogados y no damos asesoría legal."
                : "Registered LDA #87 · Sonoma County. Not a law firm; we do not give legal advice."}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
