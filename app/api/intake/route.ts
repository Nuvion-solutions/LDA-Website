// POST /api/intake
// Receives form submissions from the intake form and emails the lead to the
// business via Resend. Falls back to local logging if Resend isn't configured
// (e.g. dev/preview), so the form always succeeds for the user.

import { after } from "next/server";

import { getDeadlineDate, daysUntil, urgencyTagFor } from "@/lib/urgency";
import type { UrgencyTag } from "@/lib/urgency";
import { BUSINESS } from "@/lib/utils";
import { translations } from "@/lib/translations";
import { sendMetaLeadEvent, readCookie } from "@/lib/meta-capi";
import { absoluteUrl } from "@/lib/site";
import { sendLeadEmail, escapeHtml } from "@/lib/lead-email";

export const dynamic = "force-dynamic";

type IntakeBody = {
  // Step 1
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  contactMethod?: string;
  bestTime?: string;

  // Step 2
  primaryService?: string;
  needsMoreServices?: string;
  additionalServices?: string[];

  // Step 3 — Divorce
  divorceType?: string;
  divorceHasChildren?: string;
  divorceChildrenCount?: string;
  divorceChildrenAges?: string;
  divorceHasProperty?: string;
  divorceHasAssets?: string;
  divorceMarriageLength?: string;
  divorceFilingCounty?: string;
  divorceFiledPaperwork?: string;

  // Step 3 — Eviction
  evictionParty?: string;
  evictionPropertyType?: string;
  evictionReason?: string;
  evictionNoticeServed?: string;
  evictionNoticeType?: string;
  evictionNoticeDate?: string;
  evictionCounty?: string;
  evictionTenantVacated?: string;
  evictionRent?: string;

  // Step 3 — Living Trust
  trustType?: string;
  trustHasMinors?: string;
  trustOwnsProperty?: string;
  trustPropertyCount?: string;
  trustHasAssets?: string;
  trustExistingDocs?: string;
  trustSuccessor?: string;

  // Step 3 — POA
  poaTypes?: string[];
  poaAgent?: string;
  poaHasReason?: string;
  poaReason?: string;
  poaNotarize?: string;

  // Step 3 — DMV
  dmvFormTypes?: string[];
  dmvHasAppointment?: string;
  dmvAppointmentDate?: string;
  dmvDetails?: string;

  // Step 3 — Tax
  taxTypes?: string[];
  taxYear?: string;
  taxHasDeadline?: string;
  taxDeadlineDate?: string;
  taxNotes?: string;

  // Step 3 — Wills & Health Care Directives
  willsFor?: string;
  willsDocuments?: string;
  willsOwnsProperty?: string;
  willsHasMinors?: string;
  willsExistingDocs?: string;

  // Step 3 — Probate
  probateRelation?: string;
  probateHasWill?: string;
  probateHasRealEstate?: string;
  probateEstateValue?: string;
  probateCounty?: string;
  probateHasDeadline?: string;
  probateDeadlineDate?: string;

  // Step 3 — Name Change
  nameChangeFor?: string;
  nameChangeReason?: string;
  nameChangeCounty?: string;
  nameChangeHasCourtDate?: string;
  nameChangeCourtDate?: string;

  // Step 3 — Small Claims
  smallClaimsRole?: string;
  smallClaimsAmount?: string;
  smallClaimsCounty?: string;
  smallClaimsHasHearing?: string;
  smallClaimsHearingDate?: string;
  smallClaimsDescription?: string;

  // Step 3 — Guardianship
  guardianshipType?: string;
  guardianshipRelation?: string;
  guardianshipCounty?: string;
  guardianshipHasCourtDate?: string;
  guardianshipCourtDate?: string;

  // Step 3 — Deeds & Property Transfers
  deedType?: string;
  deedReason?: string;
  deedCounty?: string;
  deedPropertyCount?: string;

  // Step 3 — Other
  otherDescription?: string;
  otherHasDeadline?: string;
  otherDeadlineDate?: string;

  // Step 4
  clientCounty?: string;
  referralSource?: string;
  referralName?: string;
  additionalNotes?: string;

  // Step 5
  consentLDA?: boolean;
  consentContact?: boolean;

  // Early-capture: a "partial" ping fired after the contact step so a visitor
  // who abandons the rest of the form is still a reachable lead. leadId ties
  // the partial ping to the eventual full submission.
  partial?: boolean;
  leadId?: string;

  // Visitor's site language, used to localize the confirmation email.
  lang?: "en" | "es";

  // Which surface submitted the lead (e.g. "quick_consult_hero"). Lightweight
  // sources collect only name/phone/service and skip the full-intake email +
  // consent, so the spam filter treats them like the early partial ping.
  source?: string;

  // Spam mitigation (not user-facing; see POST handler)
  website?: string;
  elapsedMs?: number;
};

// Human-readable label + emoji for each urgency level, used in the email
// subject and header so the business can triage at a glance.
const URGENCY_LABEL: Record<UrgencyTag, string> = {
  "urgent-7-days": "🔴 URGENT — deadline within 7 days",
  "urgent-14-days": "🟠 Deadline within 14 days",
  "deadline-30-days": "🟡 Deadline within 30 days",
  "standard-lead": "Standard",
};

type Field = { label: string; value: string | undefined };
type Section = { title: string; fields: Field[] };

function join(value: string[] | undefined): string | undefined {
  return value && value.length > 0 ? value.join(", ") : undefined;
}

// Builds the labeled sections for the lead email. Service-specific fields are
// only populated for the chosen service, so empty values are filtered out
// before rendering — the email only shows what the client actually answered.
function buildSections(data: IntakeBody): Section[] {
  const sections: Section[] = [
    {
      title: "Service requested",
      fields: [
        { label: "Primary service", value: data.primaryService },
        { label: "Wants additional services", value: data.needsMoreServices },
        { label: "Additional services", value: join(data.additionalServices) },
      ],
    },
    {
      title: "Details",
      fields: [
        // Divorce
        { label: "Divorce type", value: data.divorceType },
        { label: "Has children", value: data.divorceHasChildren },
        { label: "Number of children", value: data.divorceChildrenCount },
        { label: "Children ages", value: data.divorceChildrenAges },
        { label: "Has property", value: data.divorceHasProperty },
        { label: "Has assets", value: data.divorceHasAssets },
        { label: "Marriage length", value: data.divorceMarriageLength },
        { label: "Filing county", value: data.divorceFilingCounty },
        { label: "Already filed paperwork", value: data.divorceFiledPaperwork },
        // Eviction
        { label: "Role", value: data.evictionParty },
        { label: "Property type", value: data.evictionPropertyType },
        { label: "Reason", value: data.evictionReason },
        { label: "Notice served", value: data.evictionNoticeServed },
        { label: "Notice type", value: data.evictionNoticeType },
        { label: "Notice date", value: data.evictionNoticeDate },
        { label: "County", value: data.evictionCounty },
        { label: "Tenant vacated", value: data.evictionTenantVacated },
        { label: "Monthly rent", value: data.evictionRent },
        // Living Trust
        { label: "Trust type", value: data.trustType },
        { label: "Has minor children", value: data.trustHasMinors },
        { label: "Owns property", value: data.trustOwnsProperty },
        { label: "Number of properties", value: data.trustPropertyCount },
        { label: "Has assets", value: data.trustHasAssets },
        { label: "Existing estate docs", value: data.trustExistingDocs },
        { label: "Successor trustee", value: data.trustSuccessor },
        // POA
        { label: "POA types", value: join(data.poaTypes) },
        { label: "Agent", value: data.poaAgent },
        { label: "Has specific reason", value: data.poaHasReason },
        { label: "Reason", value: data.poaReason },
        { label: "Needs notarization", value: data.poaNotarize },
        // DMV
        { label: "DMV form types", value: join(data.dmvFormTypes) },
        { label: "Has appointment", value: data.dmvHasAppointment },
        { label: "Appointment date", value: data.dmvAppointmentDate },
        { label: "Details", value: data.dmvDetails },
        // Tax
        { label: "Tax help types", value: join(data.taxTypes) },
        { label: "Tax year", value: data.taxYear },
        { label: "Has deadline", value: data.taxHasDeadline },
        { label: "Deadline date", value: data.taxDeadlineDate },
        { label: "Notes", value: data.taxNotes },
        // Wills & Health Care Directives
        { label: "Documents for", value: data.willsFor },
        { label: "Documents needed", value: data.willsDocuments },
        { label: "Owns real estate", value: data.willsOwnsProperty },
        { label: "Has minor children", value: data.willsHasMinors },
        { label: "Existing will/directive", value: data.willsExistingDocs },
        // Probate
        { label: "Relationship to decedent", value: data.probateRelation },
        { label: "Left a will", value: data.probateHasWill },
        { label: "Estate includes real estate", value: data.probateHasRealEstate },
        { label: "Estate value", value: data.probateEstateValue },
        { label: "Decedent's county", value: data.probateCounty },
        { label: "Has court date/deadline", value: data.probateHasDeadline },
        { label: "Deadline date", value: data.probateDeadlineDate },
        // Name change
        { label: "Name change for", value: data.nameChangeFor },
        { label: "Reason", value: data.nameChangeReason },
        { label: "Filing county", value: data.nameChangeCounty },
        { label: "Court date scheduled", value: data.nameChangeHasCourtDate },
        { label: "Court date", value: data.nameChangeCourtDate },
        // Small claims
        { label: "Situation", value: data.smallClaimsRole },
        { label: "Claim amount", value: data.smallClaimsAmount },
        { label: "Case county", value: data.smallClaimsCounty },
        { label: "Hearing scheduled", value: data.smallClaimsHasHearing },
        { label: "Hearing date", value: data.smallClaimsHearingDate },
        { label: "Dispute description", value: data.smallClaimsDescription },
        // Guardianship
        { label: "Guardianship type", value: data.guardianshipType },
        { label: "Relationship to child", value: data.guardianshipRelation },
        { label: "Filing county", value: data.guardianshipCounty },
        { label: "Court date/urgent", value: data.guardianshipHasCourtDate },
        { label: "Court date", value: data.guardianshipCourtDate },
        // Deeds
        { label: "Deed type", value: data.deedType },
        { label: "Transfer reason", value: data.deedReason },
        { label: "Property county", value: data.deedCounty },
        { label: "Number of properties", value: data.deedPropertyCount },
        // Other
        { label: "Description", value: data.otherDescription },
        { label: "Has deadline", value: data.otherHasDeadline },
        { label: "Deadline date", value: data.otherDeadlineDate },
      ],
    },
    {
      title: "General",
      fields: [
        { label: "Client county", value: data.clientCounty },
        { label: "How they heard about us", value: data.referralSource },
        { label: "Referral name", value: data.referralName },
        { label: "Additional notes", value: data.additionalNotes },
      ],
    },
  ];

  // Drop empty fields, then drop any section left with nothing to show.
  return sections
    .map((s) => ({ ...s, fields: s.fields.filter((f) => f.value && f.value.trim() !== "") }))
    .filter((s) => s.fields.length > 0);
}

type Contact = {
  name: string;
  phone?: string;
  email?: string;
  preferredContact?: string;
  bestTime?: string;
};

function renderEmail(
  sections: Section[],
  meta: {
    urgencyLabel: string;
    submissionId: string;
    submittedAt: string;
    contact: Contact;
    note?: string;
    leadId?: string;
  },
): { html: string; text: string } {
  const c = meta.contact;
  const phoneHref = (c.phone ?? "").replace(/[^0-9+]/g, "");

  // Each section is a titled card; each answer is its own bordered row with the
  // question label on the left and the client's answer on the right, so the
  // reader can scan straight down and immediately see what every answer means.
  const htmlSections = sections
    .map((s) => {
      const rows = s.fields
        .map(
          (f, i) =>
            `<tr>
              <td style="padding:10px 14px;width:42%;color:#5b6573;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;vertical-align:top;background:#fafafa;border-top:${
              i === 0 ? "0" : "1px solid #eceef1"
            };">${escapeHtml(f.label)}</td>
              <td style="padding:10px 14px;color:#111827;font-size:14px;font-weight:500;vertical-align:top;border-top:${
                i === 0 ? "0" : "1px solid #eceef1"
              };border-left:1px solid #eceef1;">${escapeHtml(f.value as string)}</td>
            </tr>`,
        )
        .join("");
      return `<div style="margin:0 0 16px;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
        <div style="padding:8px 14px;background:#0D1B2A;color:#c9a84c;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(
          s.title,
        )}</div>
        <table style="border-collapse:collapse;width:100%;">${rows}</table>
      </div>`;
    })
    .join("");

  const noteHtml = meta.note
    ? `<p style="margin:0 0 16px;padding:10px 14px;background:#fef9c3;border-left:3px solid #ca8a04;font-size:14px;color:#713f12;border-radius:0 4px 4px 0;">${escapeHtml(
        meta.note,
      )}</p>`
    : "";

  const contactLinks = [
    c.phone
      ? `<a href="tel:${escapeHtml(phoneHref)}" style="color:#1f3a5f;text-decoration:none;font-weight:600;">📞 ${escapeHtml(
          c.phone,
        )}</a>`
      : "",
    c.email
      ? `<a href="mailto:${escapeHtml(c.email)}" style="color:#1f3a5f;text-decoration:none;font-weight:600;">✉️ ${escapeHtml(
          c.email,
        )}</a>`
      : "",
  ]
    .filter(Boolean)
    .join('<span style="color:#cbd5e1;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>');

  const subline = [
    c.preferredContact ? `Prefers ${escapeHtml(c.preferredContact)}` : "",
    c.bestTime ? `Best time: ${escapeHtml(c.bestTime)}` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const idLine = meta.leadId ? `Lead ID: ${escapeHtml(meta.leadId)}<br/>` : "";

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;background:#f3f4f6;color:#111827;">
    <div style="padding:18px 24px;background:#0D1B2A;">
      <p style="margin:0 0 2px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#9aa6b8;">New website lead</p>
      <p style="margin:0;font-size:17px;font-weight:600;color:#ffffff;">${escapeHtml(
        meta.urgencyLabel,
      )}</p>
    </div>
    <div style="padding:24px;background:#ffffff;">
      ${noteHtml}
      <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#0D1B2A;">${escapeHtml(
        c.name || "—",
      )}</p>
      <p style="margin:0 0 ${subline ? "4px" : "20px"};font-size:15px;">${contactLinks}</p>
      ${
        subline
          ? `<p style="margin:0 0 20px;font-size:13px;color:#6b7280;">${subline}</p>`
          : ""
      }
      ${htmlSections}
      <hr style="margin:8px 0 16px;border:none;border-top:1px solid #e5e7eb;" />
      <p style="font-size:12px;color:#9ca3af;margin:0;">${idLine}Submission ID: ${escapeHtml(
        meta.submissionId,
      )}<br/>Received: ${escapeHtml(meta.submittedAt)}</p>
    </div>
  </div>`;

  const text = [
    `NEW WEBSITE LEAD — ${meta.urgencyLabel}`,
    ...(meta.note ? ["", meta.note] : []),
    "",
    `CONTACT`,
    `  Name: ${c.name || "—"}`,
    ...(c.phone ? [`  Phone: ${c.phone}`] : []),
    ...(c.email ? [`  Email: ${c.email}`] : []),
    ...(c.preferredContact ? [`  Prefers: ${c.preferredContact}`] : []),
    ...(c.bestTime ? [`  Best time: ${c.bestTime}`] : []),
    "",
    ...sections.flatMap((s) => [
      s.title.toUpperCase(),
      ...s.fields.map((f) => `  ${f.label}: ${f.value}`),
      "",
    ]),
    ...(meta.leadId ? [`Lead ID: ${meta.leadId}`] : []),
    `Submission ID: ${meta.submissionId}`,
    `Received: ${meta.submittedAt}`,
  ].join("\n");

  return { html, text };
}

// Confirmation email sent to the person who submitted the intake. Localized to
// their site language; reply-to is set to the business inbox by the caller so a
// reply reaches the LDA, not the unmonitored send address.
function buildConfirmationEmail(
  data: IntakeBody,
  lang: "en" | "es",
): { subject: string; html: string; text: string } {
  const firstName = (data.firstName ?? "").trim();
  const service = (data.primaryService ?? "").trim();
  const phone = BUSINESS.phone;
  const disclaimer = translations[lang].short_disclaimer;

  const copy =
    lang === "es"
      ? {
          subject: "Recibimos su solicitud — California Legal Document Excellence",
          greeting: firstName ? `Hola ${firstName},` : "Hola,",
          body: `Gracias por comunicarse con California Legal Document Excellence. Recibimos su solicitud${
            service ? ` sobre ${service}` : ""
          } y la revisaremos para responderle dentro de 1 día hábil con los próximos pasos y el precio.`,
          contact: `Si necesita comunicarse antes, llámenos al ${phone} o simplemente responda a este correo.`,
          signoff:
            "California Legal Document Excellence\nAsistente Legal Registrado · LDA #87 · Condado de Sonoma",
        }
      : {
          subject: "We received your intake — California Legal Document Excellence",
          greeting: firstName ? `Hi ${firstName},` : "Hi there,",
          body: `Thank you for reaching out to California Legal Document Excellence. We've received your intake${
            service ? ` for ${service}` : ""
          } — expect a same-day response with next steps and pricing, usually within the hour during business hours (Mon–Sat, 9am–5pm).`,
          contact: `Need help right away? Call or text us at ${phone}, or just reply to this email.`,
          signoff:
            "California Legal Document Excellence\nRegistered Legal Document Assistant · LDA #87 · Sonoma County",
        };

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111827;line-height:1.55;">
    <p style="margin:0 0 16px;">${escapeHtml(copy.greeting)}</p>
    <p style="margin:0 0 16px;">${escapeHtml(copy.body)}</p>
    <p style="margin:0 0 16px;">${escapeHtml(copy.contact)}</p>
    <p style="margin:0 0 16px;white-space:pre-line;color:#1f3a5f;">${escapeHtml(copy.signoff)}</p>
    <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
    <p style="font-size:12px;color:#9ca3af;">${escapeHtml(disclaimer)}</p>
  </div>`;

  const text = [
    copy.greeting,
    "",
    copy.body,
    "",
    copy.contact,
    "",
    copy.signoff,
    "",
    disclaimer,
  ].join("\n");

  return { subject: copy.subject, html, text };
}

// Best-effort, per-instance rate limit. Serverless instances are ephemeral and
// not shared, so this throttles bursts against a warm instance rather than
// enforcing a strict global limit. The window is generous so a real person
// re-submitting is never blocked; it only stops scripted floods.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateBuckets.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  rateBuckets.set(ip, recent);
  if (rateBuckets.size > 5000) {
    for (const [key, times] of rateBuckets) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateBuckets.delete(key);
      }
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

// --- Content-based spam filtering ------------------------------------------
// Bots that slip past the honeypot/timing checks (or post directly to the API)
// still tend to use placeholder data. These are high-signal checks that catch
// the common junk with effectively no false positives for real clients.

function isBadEmail(email?: string): boolean {
  if (!email) return true;
  const e = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return true; // not a real address
  const domain = e.split("@")[1] ?? "";
  // RFC-reserved + common placeholder domains real users never actually use.
  if (
    [
      "example.com",
      "example.net",
      "example.org",
      "test.com",
      "test.net",
      "test.org",
      "sample.com",
    ].includes(domain)
  )
    return true;
  if (/\.(test|invalid|localhost|example)$/.test(domain)) return true;
  return false;
}

// Reserved fictional numbers: 555-0100 through 555-0199 (the "movie" numbers).
function isFakePhone(phone?: string): boolean {
  return !!phone && /555[\s.\-]?01\d\d/.test(phone);
}

// A usable phone number: at least 10 digits and not a reserved fake number.
// Lets phone-first leads (the hero quick-form) through without an email.
function isBadPhone(phone?: string): boolean {
  if (!phone) return true;
  if (phone.replace(/[^0-9]/g, "").length < 10) return true;
  return isFakePhone(phone);
}

function hasLinks(...texts: (string | undefined)[]): boolean {
  const blob = texts.filter(Boolean).join(" ");
  return /https?:\/\/|www\.|\[url|<a\s|href=/i.test(blob);
}

// Returns a short reason string if the submission looks like spam, else null.
function spamReason(data: IntakeBody, partial: boolean): string | null {
  const emailProvided = !!(data.email && data.email.trim());
  const phoneOk = !isBadPhone(data.phone);

  // A provided email must look real (catches example.com/test bots). A missing
  // email is fine on its own — phone-first leads (the hero quick-form) have none.
  if (emailProvided && isBadEmail(data.email)) return "bad_email";
  // Every real lead must be reachable: require a valid email OR a valid phone.
  if (!emailProvided && !phoneOk) return "no_contact";
  if (
    hasLinks(
      data.additionalNotes,
      data.otherDescription,
      data.dmvDetails,
      data.taxNotes,
      data.poaReason,
      data.smallClaimsDescription,
      data.referralName,
      data.firstName,
      data.lastName,
    )
  )
    return "link_spam";
  // Consent + service are markers the full multi-step intake always sends. The
  // lightweight hero quick-form (name + phone + service), the call-capture
  // callback form (name + phone only), and the early partial ping legitimately
  // omit them, so only enforce them on full submissions.
  const lightweight =
    partial ||
    data.source === "quick_consult_hero" ||
    data.source === "call_capture";
  if (!lightweight) {
    if (data.consentLDA !== true || data.consentContact !== true)
      return "missing_consent";
    if (!data.primaryService || data.primaryService.trim() === "")
      return "no_service";
  }
  return null;
}

export async function POST(req: Request) {
  // Throttle scripted floods before doing any work.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (ip !== "unknown" && rateLimited(ip)) {
    return Response.json(
      { success: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let data: IntakeBody;
  try {
    data = await req.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Spam mitigation. The hidden `website` honeypot is never filled by a real
  // user; a non-empty value means a bot auto-filled every field. `elapsedMs`
  // is how long the form was on screen — a multi-step form takes far longer
  // than a few seconds, so a near-instant submit is bot-like. In both cases we
  // return a success-shaped response (so bots get no signal to adapt) but
  // never send the junk lead.
  const partial = data.partial === true;
  const honeypotTripped =
    typeof data.website === "string" && data.website.trim() !== "";
  // The too-fast check guards the full submission; the early-capture ping
  // legitimately fires within seconds (just the contact step), so skip it
  // there. Honeypot + rate limiting still apply to both.
  const tooFast =
    !partial &&
    typeof data.elapsedMs === "number" &&
    data.elapsedMs >= 0 &&
    data.elapsedMs < 5000;
  const spam = spamReason(data, partial);

  // Email delivery config — read once here so both the filtered-submission
  // fail-safe (immediately below) and the normal lead send can use it.
  const apiKey = process.env.RESEND_API_KEY;
  const emailTo = (process.env.INTAKE_EMAIL_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  // Optional monitoring copy, invisible to the primary recipient. Set this to
  // silently receive every lead (e.g. while verifying delivery); remove the
  // env var to stop, no code change needed.
  const emailBcc = (process.env.INTAKE_EMAIL_BCC ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const emailFrom = process.env.INTAKE_EMAIL_FROM;

  if (honeypotTripped || tooFast || spam) {
    console.warn("[intake] Dropped likely-bot submission:", {
      reason: honeypotTripped ? "honeypot" : tooFast ? "too_fast" : spam,
      elapsedMs: data.elapsedMs,
      firstName: data.firstName,
      phone: data.phone,
      email: data.email,
    });

    // Fail-safe so a real person is NEVER silently lost to a false positive.
    // Honeypot / too-fast / link-spam are near-certain bots and stay silent.
    // But the content filters (bad_email / no_contact / missing_consent /
    // no_service) once dropped real hero quick-form leads while the visitor saw
    // a success screen — see git "Fix: hero quick-consult form now delivers its
    // lead email". So when a filtered submission is still reachable (has a phone
    // or email), email the business a "review this" copy of the lead instead of
    // discarding it — it lands durably in the inbox. Scheduled via after() so it
    // never delays or fails the response, and reuses the normal lead template.
    const nearCertainBot = honeypotTripped || tooFast || spam === "link_spam";
    const reachable = !!(data.phone?.trim() || data.email?.trim());
    if (!nearCertainBot && reachable && apiKey && emailTo.length > 0 && emailFrom) {
      const who =
        `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim() || "Unknown";
      const { html: alertHtml, text: alertText } = renderEmail(
        buildSections(data),
        {
          urgencyLabel: "⚠️ Auto-filtered — review (possible real lead)",
          note: `Our spam filter flagged this submission as "${spam}", but it has real contact info and may be a real person. Review and reach out if so.`,
          submissionId: crypto.randomUUID(),
          submittedAt: new Date().toISOString(),
          contact: {
            name: who,
            phone: data.phone,
            email: data.email,
            preferredContact: data.contactMethod,
            bestTime: data.bestTime,
          },
        },
      );
      after(async () => {
        await sendLeadEmail(
          {
            from: emailFrom,
            to: emailTo,
            ...(emailBcc.length > 0 ? { bcc: emailBcc } : {}),
            subject: `⚠️ Filtered submission — review: ${who}`,
            html: alertHtml,
            text: alertText,
            ...(data.email ? { reply_to: data.email } : {}),
          },
          apiKey,
        );
      });
    }

    return Response.json({ success: true, mode: "ignored" });
  }

  // Kill-switch for early capture: set INTAKE_CAPTURE_PARTIAL="false" to stop
  // the contact-step pings (e.g. if they become noisy) without a code change.
  if (partial && process.env.INTAKE_CAPTURE_PARTIAL === "false") {
    return Response.json({ success: true, mode: "partial_disabled" });
  }

  const submissionId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();

  // Server-side Meta "Lead" event (Conversions API). Called on every success
  // response for a full submission — exactly when the browser pixel fires its
  // Lead — and scheduled via after() so it runs once the response is sent and
  // can never delay or fail the submission. Both events carry leadId as the
  // event id, so Meta deduplicates the pair instead of double-counting; the
  // server event survives iOS/Safari pixel blocking when the browser one is
  // lost. No-ops unless META_CAPI_ACCESS_TOKEN is configured.
  const scheduleMetaLead = () => {
    if (partial) return;
    const cookieHeader = req.headers.get("cookie");
    const capiParams = {
      eventId: data.leadId ?? submissionId,
      eventSourceUrl: req.headers.get("referer") ?? absoluteUrl("/intake"),
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      clientIp: ip !== "unknown" ? ip : undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
      fbp: readCookie(cookieHeader, "_fbp"),
      fbc: readCookie(cookieHeader, "_fbc"),
      contentName: data.primaryService,
    };
    after(() => sendMetaLeadEvent(capiParams));
  };

  // Urgency — used to flag the subject line so time-sensitive leads stand out.
  const deadlineDate = getDeadlineDate(data);
  const urgencyTag = urgencyTagFor(daysUntil(deadlineDate));
  const urgencyLabel = URGENCY_LABEL[urgencyTag];

  // Fallback when Resend isn't configured. In dev/preview: log and succeed so
  // the form still works without email config. On PRODUCTION: a missing config
  // is a misconfiguration (e.g. an env var was rotated or removed) — NEVER
  // silently accept a lead we can't deliver. Return an error so the form tells
  // the visitor to call instead of showing a false "thank you" and firing a
  // phantom conversion. This is a last-resort guard; env is normally set.
  if (!apiKey || emailTo.length === 0 || !emailFrom) {
    const isProd = process.env.VERCEL_ENV === "production";
    console.error("[intake] Resend not configured:", {
      env: process.env.VERCEL_ENV ?? "unknown",
      action: isProd ? "REJECTED — production misconfiguration" : "logged locally",
      submissionId,
      submittedAt,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      primaryService: data.primaryService,
      urgency: urgencyTag,
    });
    if (isProd) {
      return Response.json(
        { success: false, error: "email_not_configured" },
        { status: 503 },
      );
    }
    scheduleMetaLead();
    return Response.json({ success: true, mode: "local", submissionId });
  }

  // A callback request comes from the call-capture modal: the visitor tapped
  // Call/Text but asked to be called back instead. Frame the email so the
  // business knows to dial out, not wait for an inbound call.
  const isCallback = data.source === "call_capture";

  const sections = buildSections(data);
  const { html, text } = renderEmail(sections, {
    urgencyLabel: isCallback
      ? "📞 Callback requested — tapped Call/Text"
      : partial
        ? "🟡 Intake started — contact captured"
        : urgencyLabel,
    note: isCallback
      ? "This visitor tapped Call or Text on the website and left their number for a callback instead. The site promises a same-day response — call them back."
      : partial
        ? "This visitor completed the contact step but may not have finished the full intake. Their details are below — reaching out is recommended. If they finish, you'll get a second email with full details under the same Lead ID."
        : undefined,
    leadId: data.leadId,
    submissionId,
    submittedAt,
    contact: {
      name: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
      phone: data.phone,
      email: data.email,
      preferredContact: data.contactMethod,
      bestTime: data.bestTime,
    },
  });

  const isUrgent = urgencyTag !== "standard-lead";
  const name = `${data.firstName ?? "Unknown"} ${data.lastName ?? ""}`.trim();
  const subject = isCallback
    ? `📞 Callback request — ${name}`
    : partial
      ? `🟡 Intake started — ${name}`
      : `${isUrgent ? `${urgencyLabel} — ` : ""}New lead: ${name} (${
          data.primaryService ?? "general"
        })`.trim();

  const result = await sendLeadEmail(
    {
      from: emailFrom,
      to: emailTo,
      ...(emailBcc.length > 0 ? { bcc: emailBcc } : {}),
      subject,
      html,
      text,
      // Replies go straight to the client — set reply-to so the business can
      // respond to the lead directly from the notification email.
      ...(data.email ? { reply_to: data.email } : {}),
    },
    apiKey,
  );

  if (result.ok) {
    scheduleMetaLead();
    // Send the submitter a localized confirmation (full submissions only, and
    // only once the business notification succeeded so a retry can't duplicate
    // it). Best-effort: a failed confirmation never fails the submission.
    if (!partial && data.email) {
      const lang = data.lang === "es" ? "es" : "en";
      const conf = buildConfirmationEmail(data, lang);
      const confResult = await sendLeadEmail(
        {
          from: emailFrom,
          to: [data.email],
          subject: conf.subject,
          html: conf.html,
          text: conf.text,
          // Replies from the client go to the monitored business inbox.
          reply_to: emailTo[0],
        },
        apiKey,
      );
      if (!confResult.ok) {
        console.error("[intake] Confirmation email failed:", {
          submissionId,
          reason: confResult.reason,
        });
      }
    }
    return Response.json({ success: true, submissionId });
  }

  // Log enough context to recover the lead manually if delivery fails. Vercel
  // logs roll, so wire a durable sink (Sentry/Slack) if you can't tolerate any
  // drop.
  console.error("[intake] Resend delivery failed after retries:", {
    submissionId,
    reason: result.reason,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    primaryService: data.primaryService,
    submittedAt,
  });

  return Response.json(
    { success: false, submissionId, error: "delivery_failed", reason: result.reason },
    { status: 502 },
  );
}
