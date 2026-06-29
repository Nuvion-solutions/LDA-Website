// POST /api/intake
// Receives form submissions from the intake form and emails the lead to the
// business via Resend. Falls back to local logging if Resend isn't configured
// (e.g. dev/preview), so the form always succeeds for the user.

import { getDeadlineDate, daysUntil, urgencyTagFor } from "@/lib/urgency";
import type { UrgencyTag } from "@/lib/urgency";

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

  // Step 3 — Immigration
  immigrationForms?: string[];
  immigrationFormsOther?: string;
  immigrationForWhom?: string;
  immigrationStatus?: string;
  immigrationHasDeadline?: string;
  immigrationDeadlineDate?: string;
  immigrationPreviouslyFiled?: string;

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
      title: "Contact",
      fields: [
        { label: "Name", value: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim() },
        { label: "Phone", value: data.phone },
        { label: "Email", value: data.email },
        { label: "Preferred contact", value: data.contactMethod },
        { label: "Best time to reach", value: data.bestTime },
      ],
    },
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
        { label: "Landlord or tenant", value: data.evictionParty },
        { label: "Property type", value: data.evictionPropertyType },
        { label: "Reason", value: data.evictionReason },
        { label: "Notice served", value: data.evictionNoticeServed },
        { label: "Notice type", value: data.evictionNoticeType },
        { label: "Notice date", value: data.evictionNoticeDate },
        { label: "County", value: data.evictionCounty },
        { label: "Tenant vacated", value: data.evictionTenantVacated },
        { label: "Monthly rent", value: data.evictionRent },
        // Immigration
        { label: "Forms", value: join(data.immigrationForms) },
        { label: "Forms (other)", value: data.immigrationFormsOther },
        { label: "For whom", value: data.immigrationForWhom },
        { label: "Current status", value: data.immigrationStatus },
        { label: "Has deadline", value: data.immigrationHasDeadline },
        { label: "Deadline date", value: data.immigrationDeadlineDate },
        { label: "Previously filed", value: data.immigrationPreviouslyFiled },
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEmail(
  sections: Section[],
  meta: {
    urgencyLabel: string;
    submissionId: string;
    submittedAt: string;
    note?: string;
    leadId?: string;
  },
): { html: string; text: string } {
  const htmlSections = sections
    .map((s) => {
      const rows = s.fields
        .map(
          (f) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;vertical-align:top;white-space:nowrap;">${escapeHtml(
              f.label,
            )}</td><td style="padding:4px 0;color:#111827;">${escapeHtml(f.value as string)}</td></tr>`,
        )
        .join("");
      return `<h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:#1f3a5f;">${escapeHtml(
        s.title,
      )}</h3><table style="border-collapse:collapse;font-size:14px;width:100%;">${rows}</table>`;
    })
    .join("");

  const noteHtml = meta.note
    ? `<p style="margin:0 0 16px;padding:10px 14px;background:#fef9c3;border-left:3px solid #ca8a04;font-size:14px;color:#713f12;">${escapeHtml(
        meta.note,
      )}</p>`
    : "";

  const idLine = meta.leadId
    ? `Lead ID: ${escapeHtml(meta.leadId)}<br/>`
    : "";

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#111827;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">New website lead</p>
    <h2 style="margin:0 0 12px;font-size:20px;">${escapeHtml(meta.urgencyLabel)}</h2>
    ${noteHtml}
    ${htmlSections}
    <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
    <p style="font-size:12px;color:#9ca3af;">${idLine}Submission ID: ${escapeHtml(
      meta.submissionId,
    )}<br/>Received: ${escapeHtml(meta.submittedAt)}</p>
  </div>`;

  const text = [
    `NEW WEBSITE LEAD — ${meta.urgencyLabel}`,
    ...(meta.note ? ["", meta.note] : []),
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

// Send via Resend with a short retry on transient (5xx / network) failures so
// a brief hiccup doesn't drop a lead. 4xx is permanent — don't waste retries.
const SEND_RETRY_DELAYS_MS = [1000, 3000];
const SEND_TIMEOUT_MS = 8000;

type ResendPayload = {
  from: string;
  to: string[];
  bcc?: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
};

async function sendLeadEmail(
  payload: ResendPayload,
  apiKey: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const attempts = SEND_RETRY_DELAYS_MS.length + 1;
  let lastReason = "unknown";

  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) return { ok: true };

      if (res.status >= 400 && res.status < 500) {
        return { ok: false, reason: `http_${res.status}` };
      }
      lastReason = `http_${res.status}`;
    } catch (err) {
      clearTimeout(timer);
      lastReason =
        err instanceof Error && err.name === "AbortError" ? "timeout" : "network";
    }

    const delay = SEND_RETRY_DELAYS_MS[i];
    if (delay !== undefined) await new Promise((r) => setTimeout(r, delay));
  }

  return { ok: false, reason: lastReason };
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
    data.elapsedMs < 3000;
  if (honeypotTripped || tooFast) {
    console.warn("[intake] Dropped likely-bot submission:", {
      reason: honeypotTripped ? "honeypot" : "too_fast",
      elapsedMs: data.elapsedMs,
    });
    return Response.json({ success: true, mode: "ignored" });
  }

  // Kill-switch for early capture: set INTAKE_CAPTURE_PARTIAL="false" to stop
  // the contact-step pings (e.g. if they become noisy) without a code change.
  if (partial && process.env.INTAKE_CAPTURE_PARTIAL === "false") {
    return Response.json({ success: true, mode: "partial_disabled" });
  }

  const submissionId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();

  // Urgency — used to flag the subject line so time-sensitive leads stand out.
  const deadlineDate = getDeadlineDate(data);
  const urgencyTag = urgencyTagFor(daysUntil(deadlineDate));
  const urgencyLabel = URGENCY_LABEL[urgencyTag];

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

  // Graceful fallback when Resend isn't configured (dev/preview): log and
  // succeed so the form still works locally.
  if (!apiKey || emailTo.length === 0 || !emailFrom) {
    console.log("[intake] Resend not configured — logging submission locally:", {
      submissionId,
      submittedAt,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      primaryService: data.primaryService,
      urgency: urgencyTag,
    });
    return Response.json({ success: true, mode: "local", submissionId });
  }

  const sections = buildSections(data);
  const { html, text } = renderEmail(sections, {
    urgencyLabel: partial ? "🟡 Intake started — contact captured" : urgencyLabel,
    note: partial
      ? "This visitor completed the contact step but may not have finished the full intake. Their details are below — reaching out is recommended. If they finish, you'll get a second email with full details under the same Lead ID."
      : undefined,
    leadId: data.leadId,
    submissionId,
    submittedAt,
  });

  const isUrgent = urgencyTag !== "standard-lead";
  const name = `${data.firstName ?? "Unknown"} ${data.lastName ?? ""}`.trim();
  const subject = partial
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
