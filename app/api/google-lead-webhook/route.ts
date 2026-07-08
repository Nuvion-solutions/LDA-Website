// POST /api/google-lead-webhook
// Receives leads from a Google Ads lead-form extension and emails them to the
// business via Resend — the SAME delivery path the website intake form uses,
// so ad leads and site leads land in the same inbox, formatted consistently.
//
// Google Ads posts a JSON body shaped like:
//   {
//     "lead_id": "...",
//     "api_version": "1.0",
//     "form_id": 123, "campaign_id": 456,
//     "google_key": "<the shared secret you set in Google Ads>",
//     "is_test": true | false,
//     "user_column_data": [
//       { "column_id": "FULL_NAME", "column_name": "Full Name", "string_value": "Jane Doe" },
//       { "column_id": "EMAIL", "string_value": "jane@example.com" },
//       { "column_id": "PHONE_NUMBER", "string_value": "+17075551234" },
//       ...
//     ]
//   }
// Docs: https://support.google.com/google-ads/answer/7688050 (webhook integration)
//
// Setup:
//   1. In Google Ads → your lead form → "Lead delivery / Webhook integration",
//      set Webhook URL = https://calegaldocumenthelp.com/api/google-lead-webhook
//      and a Key of your choosing.
//   2. Set that same value as GOOGLE_LEAD_WEBHOOK_KEY in the Vercel env.
//   3. Click "Send test data" in Google Ads — it should succeed, and a
//      "[TEST]" lead email should arrive.

import { BUSINESS } from "@/lib/utils";
import { sendLeadEmail, escapeHtml } from "@/lib/lead-email";

export const dynamic = "force-dynamic";

type UserColumn = {
  column_id?: string;
  column_name?: string;
  string_value?: string;
};

type GoogleLeadBody = {
  lead_id?: string;
  api_version?: string;
  form_id?: number | string;
  campaign_id?: number | string;
  gcl_id?: string;
  google_key?: string;
  is_test?: boolean;
  user_column_data?: UserColumn[];
};

// Google's well-known column ids for the standard questions. Anything not in
// this map (custom questions) is shown under its human-readable column_name.
const KNOWN_LABELS: Record<string, string> = {
  FULL_NAME: "Full name",
  FIRST_NAME: "First name",
  LAST_NAME: "Last name",
  EMAIL: "Email",
  PHONE_NUMBER: "Phone",
  POSTAL_CODE: "Postal code",
  CITY: "City",
  REGION: "State/Region",
  COUNTRY: "Country",
  COMPANY_NAME: "Company",
  JOB_TITLE: "Job title",
  STREET_ADDRESS: "Street address",
};

function labelFor(col: UserColumn): string {
  if (col.column_id && KNOWN_LABELS[col.column_id]) {
    return KNOWN_LABELS[col.column_id];
  }
  if (col.column_name && col.column_name.trim() !== "") return col.column_name;
  return col.column_id ?? "Field";
}

function valueById(cols: UserColumn[], id: string): string | undefined {
  const v = cols.find((c) => c.column_id === id)?.string_value;
  return v && v.trim() !== "" ? v.trim() : undefined;
}

function renderEmail(
  rows: Array<{ label: string; value: string }>,
  meta: { name: string; phone?: string; email?: string; isTest: boolean; leadId?: string; campaignId?: string },
): { html: string; text: string } {
  const phoneHref = (meta.phone ?? "").replace(/[^0-9+]/g, "");
  const contactLinks = [
    meta.phone
      ? `<a href="tel:${escapeHtml(phoneHref)}" style="color:#1f3a5f;text-decoration:none;font-weight:600;">📞 ${escapeHtml(meta.phone)}</a>`
      : "",
    meta.email
      ? `<a href="mailto:${escapeHtml(meta.email)}" style="color:#1f3a5f;text-decoration:none;font-weight:600;">✉️ ${escapeHtml(meta.email)}</a>`
      : "",
  ]
    .filter(Boolean)
    .join('<span style="color:#cbd5e1;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>');

  const bodyRows = rows
    .map(
      (r, i) =>
        `<tr>
          <td style="padding:10px 14px;width:42%;color:#5b6573;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;vertical-align:top;background:#fafafa;border-top:${
          i === 0 ? "0" : "1px solid #eceef1"
        };">${escapeHtml(r.label)}</td>
          <td style="padding:10px 14px;color:#111827;font-size:14px;font-weight:500;vertical-align:top;border-top:${
            i === 0 ? "0" : "1px solid #eceef1"
          };border-left:1px solid #eceef1;">${escapeHtml(r.value)}</td>
        </tr>`,
    )
    .join("");

  const banner = meta.isTest
    ? "🧪 TEST LEAD (Google Ads) — ignore"
    : "New lead from Google Ads";

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;background:#f3f4f6;color:#111827;">
    <div style="padding:18px 24px;background:#0D1B2A;">
      <p style="margin:0 0 2px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#9aa6b8;">Google Ads lead form</p>
      <p style="margin:0;font-size:17px;font-weight:600;color:#ffffff;">${escapeHtml(banner)}</p>
    </div>
    <div style="padding:24px;background:#ffffff;">
      <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#0D1B2A;">${escapeHtml(meta.name || "—")}</p>
      ${contactLinks ? `<p style="margin:0 0 20px;font-size:15px;">${contactLinks}</p>` : ""}
      <div style="margin:0 0 16px;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
        <table style="border-collapse:collapse;width:100%;">${bodyRows}</table>
      </div>
      <hr style="margin:8px 0 16px;border:none;border-top:1px solid #e5e7eb;" />
      <p style="font-size:12px;color:#9ca3af;margin:0;">Source: Google Ads${
        meta.campaignId ? ` · Campaign ${escapeHtml(meta.campaignId)}` : ""
      }${meta.leadId ? `<br/>Lead ID: ${escapeHtml(meta.leadId)}` : ""}</p>
    </div>
  </div>`;

  const text = [
    banner.toUpperCase(),
    "",
    `Name: ${meta.name || "—"}`,
    ...(meta.phone ? [`Phone: ${meta.phone}`] : []),
    ...(meta.email ? [`Email: ${meta.email}`] : []),
    "",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    `Source: Google Ads${meta.campaignId ? ` (campaign ${meta.campaignId})` : ""}`,
    ...(meta.leadId ? [`Lead ID: ${meta.leadId}`] : []),
  ].join("\n");

  return { html, text };
}

export async function POST(req: Request) {
  const configuredKey = process.env.GOOGLE_LEAD_WEBHOOK_KEY;

  // Fail closed: without a configured key we can't authenticate Google, so we
  // must not accept (and email out) arbitrary internet POSTs.
  if (!configuredKey) {
    console.error(
      "[google-lead] GOOGLE_LEAD_WEBHOOK_KEY is not set — rejecting webhook call.",
    );
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: GoogleLeadBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Authenticate: the shared key Google echoes in every POST must match ours.
  if (body.google_key !== configuredKey) {
    console.warn("[google-lead] Rejected webhook call: bad or missing google_key.");
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const cols = Array.isArray(body.user_column_data) ? body.user_column_data : [];
  const isTest = body.is_test === true;

  // Pull the common contact fields for the header; fall back to first/last.
  const fullName =
    valueById(cols, "FULL_NAME") ??
    [valueById(cols, "FIRST_NAME"), valueById(cols, "LAST_NAME")]
      .filter(Boolean)
      .join(" ");
  const email = valueById(cols, "EMAIL");
  const phone = valueById(cols, "PHONE_NUMBER");

  // Every answered question becomes a row (including the ones used in the
  // header, so nothing is lost).
  const rows = cols
    .filter((c) => c.string_value && c.string_value.trim() !== "")
    .map((c) => ({ label: labelFor(c), value: c.string_value!.trim() }));

  const apiKey = process.env.RESEND_API_KEY;
  const emailTo = (process.env.INTAKE_EMAIL_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const emailBcc = (process.env.INTAKE_EMAIL_BCC ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const emailFrom = process.env.INTAKE_EMAIL_FROM;

  // Graceful fallback when Resend isn't configured (dev/preview): log and still
  // return 200 so Google's test succeeds.
  if (!apiKey || emailTo.length === 0 || !emailFrom) {
    console.log("[google-lead] Resend not configured — logging lead locally:", {
      isTest,
      leadId: body.lead_id,
      name: fullName,
      email,
      phone,
    });
    return Response.json({ received: true, mode: "local" });
  }

  const { html, text } = renderEmail(rows, {
    name: fullName,
    phone,
    email,
    isTest,
    leadId: body.lead_id,
    campaignId: body.campaign_id != null ? String(body.campaign_id) : undefined,
  });

  const subject = `${isTest ? "🧪 [TEST] " : ""}New Google Ads lead: ${
    fullName || "Unknown"
  }`;

  const result = await sendLeadEmail(
    {
      from: emailFrom,
      to: emailTo,
      ...(emailBcc.length > 0 ? { bcc: emailBcc } : {}),
      subject,
      html,
      text,
      // Replies go straight to the lead when they shared an email.
      ...(email ? { reply_to: email } : {}),
    },
    apiKey,
  );

  if (result.ok) {
    return Response.json({ received: true, lead_id: body.lead_id ?? null });
  }

  // Log enough to recover the lead manually if delivery fails.
  console.error("[google-lead] Resend delivery failed:", {
    reason: result.reason,
    leadId: body.lead_id,
    name: fullName,
    email,
    phone,
  });
  // Return 200 anyway: Google retries on non-2xx, but the lead is already
  // captured in Google Ads' own table, and retries would re-trigger the same
  // failure. We surface the problem in logs instead.
  return Response.json({ received: true, delivery: "failed" });
}

// A friendly GET so hitting the URL in a browser doesn't look broken. Google
// only ever POSTs here.
export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "google-lead-webhook",
    business: BUSINESS.name,
    note: "This endpoint accepts POST requests from Google Ads lead forms only.",
  });
}
