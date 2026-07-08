// Shared lead-email delivery. Both the website intake form
// (app/api/intake) and the Google Ads lead-form webhook
// (app/api/google-lead-webhook) send through this one path so leads land in
// the same inbox, formatted consistently, with the same retry behaviour —
// "leads the same way every time," regardless of source.

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Send via Resend with a short retry on transient (5xx / network) failures so
// a brief hiccup doesn't drop a lead. 4xx is permanent — don't waste retries.
const SEND_RETRY_DELAYS_MS = [1000, 3000];
const SEND_TIMEOUT_MS = 8000;

export type ResendPayload = {
  from: string;
  to: string[];
  bcc?: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
};

export async function sendLeadEmail(
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
