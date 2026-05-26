// POST /api/intake
// Receives form submissions from the intake form and forwards to GoHighLevel
// via a server-side webhook URL. Falls back to local logging if no URL is set.

import { getDeadlineDate, daysUntil, urgencyTagFor } from "@/lib/urgency";

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
};

// Webhook delivery: retry on 5xx + transport errors so transient GHL/network
// hiccups don't drop a lead. Two retries with a short backoff is enough to
// cover the common cases (rolling deploys, brief 502s) without delaying the
// user-facing response by more than a few seconds.
const WEBHOOK_RETRY_DELAYS_MS = [1000, 3000];
const WEBHOOK_TIMEOUT_MS = 8000;

async function deliverToGhl(
  url: string,
  payload: unknown,
  submissionId: string,
): Promise<{ ok: true; status: number } | { ok: false; reason: string }> {
  const attempts = WEBHOOK_RETRY_DELAYS_MS.length + 1;
  let lastReason = "unknown";

  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Submission-Id": submissionId,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) return { ok: true, status: res.status };

      // 4xx is a permanent failure — don't waste retries.
      if (res.status >= 400 && res.status < 500) {
        return { ok: false, reason: `http_${res.status}` };
      }

      lastReason = `http_${res.status}`;
    } catch (err) {
      clearTimeout(timer);
      lastReason =
        err instanceof Error && err.name === "AbortError"
          ? "timeout"
          : "network";
    }

    const delay = WEBHOOK_RETRY_DELAYS_MS[i];
    if (delay !== undefined) {
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  return { ok: false, reason: lastReason };
}

export async function POST(req: Request) {
  let data: IntakeBody;
  try {
    data = await req.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const submissionId = crypto.randomUUID();
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  // Graceful fallback when webhook URL is not configured.
  if (!webhookUrl) {
    console.log("[intake] No GHL_WEBHOOK_URL set — logging submission locally:", {
      submissionId,
      submittedAt: new Date().toISOString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      primaryService: data.primaryService,
      clientCounty: data.clientCounty,
    });
    return Response.json({ success: true, mode: "local", submissionId });
  }

  // Urgency calculation — feed deadline-bearing fields to the shared helper.
  const deadlineDate = getDeadlineDate(data);
  const daysUntilDeadline = daysUntil(deadlineDate);
  const urgencyTag = urgencyTagFor(daysUntilDeadline);

  const ghlPayload = {
    submissionId,
    submittedAt: new Date().toISOString(),
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    contactMethod: data.contactMethod,
    bestTime: data.bestTime,
    primaryService: data.primaryService,
    additionalServices: data.additionalServices?.join(", "),
    consentLDA: data.consentLDA,
    consentContact: data.consentContact,
    source: "Website Intake Form",
    tags: [
      "website-lead",
      "intake-form",
      urgencyTag,
      data.primaryService ?? "general",
    ],
    customFields: {
      // Urgency
      lda_urgency_level: urgencyTag,
      lda_days_until_deadline: daysUntilDeadline?.toString(),
      lda_deadline_date: deadlineDate,

      // Primary
      lda_primary_service: data.primaryService,
      lda_additional_services: data.additionalServices?.join(", "),

      // Divorce
      lda_divorce_type: data.divorceType,
      lda_has_children: data.divorceHasChildren,
      lda_children_count: data.divorceChildrenCount,
      lda_children_ages: data.divorceChildrenAges,
      lda_has_property: data.divorceHasProperty,
      lda_has_assets: data.divorceHasAssets,
      lda_marriage_length: data.divorceMarriageLength,
      lda_filing_county: data.divorceFilingCounty,
      lda_filed_paperwork: data.divorceFiledPaperwork,

      // Eviction
      lda_eviction_party: data.evictionParty,
      lda_property_type: data.evictionPropertyType,
      lda_eviction_reason: data.evictionReason,
      lda_notice_served: data.evictionNoticeServed,
      lda_notice_type: data.evictionNoticeType,
      lda_notice_date: data.evictionNoticeDate,
      lda_eviction_county: data.evictionCounty,
      lda_tenant_vacated: data.evictionTenantVacated,
      lda_monthly_rent: data.evictionRent,

      // Immigration
      lda_immigration_forms: data.immigrationForms?.join(", "),
      lda_immigration_forms_other: data.immigrationFormsOther,
      lda_immigration_for_whom: data.immigrationForWhom,
      lda_immigration_status: data.immigrationStatus,
      lda_immigration_deadline: data.immigrationHasDeadline,
      lda_immigration_deadline_date: data.immigrationDeadlineDate,
      lda_immigration_previously_filed: data.immigrationPreviouslyFiled,

      // Living Trust
      lda_trust_type: data.trustType,
      lda_has_minor_children: data.trustHasMinors,
      lda_owns_property: data.trustOwnsProperty,
      lda_property_count: data.trustPropertyCount,
      lda_trust_has_assets: data.trustHasAssets,
      lda_trust_existing_docs: data.trustExistingDocs,
      lda_trust_successor: data.trustSuccessor,

      // POA
      lda_poa_types: data.poaTypes?.join(", "),
      lda_poa_agent: data.poaAgent,
      lda_poa_has_reason: data.poaHasReason,
      lda_poa_reason: data.poaReason,
      lda_poa_notarize: data.poaNotarize,

      // DMV
      lda_dmv_form_types: data.dmvFormTypes?.join(", "),
      lda_dmv_has_appointment: data.dmvHasAppointment,
      lda_dmv_appointment_date: data.dmvAppointmentDate,
      lda_dmv_details: data.dmvDetails,

      // Tax
      lda_tax_types: data.taxTypes?.join(", "),
      lda_tax_year: data.taxYear,
      lda_tax_has_deadline: data.taxHasDeadline,
      lda_tax_deadline_date: data.taxDeadlineDate,
      lda_tax_notes: data.taxNotes,

      // Other
      lda_other_description: data.otherDescription,
      lda_other_has_deadline: data.otherHasDeadline,
      lda_other_deadline_date: data.otherDeadlineDate,

      // General
      lda_client_county: data.clientCounty,
      lda_source: data.referralSource,
      lda_referral_name: data.referralName,
      lda_notes: data.additionalNotes,
    },
  };

  const result = await deliverToGhl(webhookUrl, ghlPayload, submissionId);

  if (result.ok) {
    return Response.json({ success: true, submissionId, status: result.status });
  }

  // Log enough context to recover the lead manually if GHL delivery fails.
  // Vercel logs roll every 24h, so also wire a durable sink (Sentry/Slack)
  // if you can't tolerate any drop.
  console.error("[intake] GHL webhook failed after retries:", {
    submissionId,
    reason: result.reason,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    primaryService: data.primaryService,
    submittedAt: new Date().toISOString(),
  });

  return Response.json(
    { success: false, submissionId, error: "delivery_failed", reason: result.reason },
    { status: 502 },
  );
}
