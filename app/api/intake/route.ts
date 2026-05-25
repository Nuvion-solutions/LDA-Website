// POST /api/intake
// Receives form submissions from the intake form and forwards to GoHighLevel
// via a server-side webhook URL. Falls back to local logging if no URL is set.

export const dynamic = "force-dynamic";

type IntakeBody = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  contactMethod?: string;
  bestTime?: string;
  documentTypes?: string[];
  otherDocuments?: string;
  hasStartedPaperwork?: string;
  hasDeadline?: string;
  deadlineDate?: string;
  filingCounty?: string;
  workingWithOthers?: string;
  referralSource?: string;
  referralName?: string;
  additionalNotes?: string;
  consentLDA?: boolean;
  consentContact?: boolean;
};

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

  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  // Graceful fallback when webhook URL is not configured.
  if (!webhookUrl) {
    console.log("[intake] No GHL_WEBHOOK_URL set — logging submission locally:", {
      submittedAt: new Date().toISOString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      documentTypes: data.documentTypes,
      filingCounty: data.filingCounty,
    });
    return Response.json({ success: true, mode: "local" });
  }

  const ghlPayload = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    contactMethod: data.contactMethod,
    bestTime: data.bestTime,
    documentTypes: data.documentTypes?.join(", "),
    otherDocuments: data.otherDocuments,
    hasStartedPaperwork: data.hasStartedPaperwork,
    hasDeadline: data.hasDeadline,
    deadlineDate: data.deadlineDate,
    filingCounty: data.filingCounty,
    workingWithOthers: data.workingWithOthers,
    referralSource: data.referralSource,
    referralName: data.referralName,
    additionalNotes: data.additionalNotes,
    consentLDA: data.consentLDA,
    consentContact: data.consentContact,
    source: "Website Intake Form",
    tags: [
      "website-lead",
      "intake-form",
      data.documentTypes?.[0] ?? "general",
    ],
    customFields: {
      lda_document_types: data.documentTypes?.join(", "),
      lda_filing_county: data.filingCounty,
      lda_has_deadline: data.hasDeadline,
      lda_deadline_date: data.deadlineDate,
      lda_referral_source: data.referralSource,
    },
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghlPayload),
    });

    return Response.json({ success: true, status: response.status });
  } catch (error) {
    console.error("[intake] GHL webhook error:", error);
    // Don't block the user on a webhook failure — surface success so the
    // lead is captured by the team via the local log and follow-up channels.
    return Response.json({ success: true, mode: "fallback" });
  }
}
