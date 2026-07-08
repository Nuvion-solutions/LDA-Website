// Server-side Meta Conversions API (CAPI) client.
// Sends conversion events to Meta directly from the server so leads aren't
// lost to browser-side blocking (iOS/Safari ITP, ad blockers). Each event
// carries the same event_id as the corresponding browser-pixel event, so Meta
// deduplicates the pair and leads are never double-counted.
//
// Config (module no-ops when unset, so dev/preview stay clean):
//   NEXT_PUBLIC_FB_PIXEL_ID   — pixel/dataset id, shared with the browser pixel
//   META_CAPI_ACCESS_TOKEN    — Conversions API token (Events Manager →
//                               dataset Settings → Conversions API). Server-only.
//   META_CAPI_TEST_EVENT_CODE — routes events to Events Manager's Test Events
//                               tab for verification. Remove in production.

const GRAPH_API_VERSION = "v23.0";
const SEND_TIMEOUT_MS = 5000;
const RETRY_DELAY_MS = 1000;

// SHA-256 → lowercase hex, per Meta's user_data hashing requirements.
async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Meta requires normalizing PII before hashing — a hash of un-normalized
// input can never match Meta's records, silently zeroing match quality.

function normalizeEmail(email: string): string | null {
  const e = email.trim().toLowerCase();
  return e.includes("@") ? e : null;
}

// Digits only, with country code. This is a California business, so bare
// 10-digit numbers get the US "1" prefix.
function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return digits;
  return digits.length > 6 ? digits : null;
}

function normalizeName(name: string): string | null {
  const n = name.trim().toLowerCase();
  return n.length > 0 ? n : null;
}

// Extracts one cookie value from a raw Cookie header (used for Meta's _fbp
// browser id and _fbc click id, which materially improve match quality).
export function readCookie(
  cookieHeader: string | null,
  name: string,
): string | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) {
      const value = part.slice(eq + 1).trim();
      return value !== "" ? value : undefined;
    }
  }
  return undefined;
}

export type MetaLeadParams = {
  // Shared with the browser pixel's Lead event — Meta dedupes the pair by
  // (event_name, event_id), so this MUST match the browser eventID exactly.
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  // Mirrors the browser event's custom data (content_name = service).
  contentName?: string;
};

// Fire-and-forget: logs failures but never throws, so a Meta outage can never
// break an intake submission. Intended to be called inside next/server after().
export async function sendMetaLeadEvent(params: MetaLeadParams): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId) return;
  if (!accessToken) {
    console.warn(
      "[meta-capi] NEXT_PUBLIC_FB_PIXEL_ID is set but META_CAPI_ACCESS_TOKEN is not — skipping server Lead event.",
    );
    return;
  }

  const email = params.email && normalizeEmail(params.email);
  const phone = params.phone && normalizePhone(params.phone);
  const firstName = params.firstName && normalizeName(params.firstName);
  const lastName = params.lastName && normalizeName(params.lastName);

  const userData: Record<string, unknown> = {
    ...(email ? { em: [await sha256Hex(email)] } : {}),
    ...(phone ? { ph: [await sha256Hex(phone)] } : {}),
    ...(firstName ? { fn: [await sha256Hex(firstName)] } : {}),
    ...(lastName ? { ln: [await sha256Hex(lastName)] } : {}),
    // Per Meta's spec these are sent un-hashed.
    ...(params.clientIp ? { client_ip_address: params.clientIp } : {}),
    ...(params.userAgent ? { client_user_agent: params.userAgent } : {}),
    ...(params.fbp ? { fbp: params.fbp } : {}),
    ...(params.fbc ? { fbc: params.fbc } : {}),
  };

  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;
  const body = JSON.stringify({
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: params.eventSourceUrl,
        event_id: params.eventId,
        user_data: userData,
        ...(params.contentName
          ? { custom_data: { content_name: params.contentName } }
          : {}),
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  });

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

  // One retry on transient (5xx / network) failures; 4xx is permanent.
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) {
        console.log("[meta-capi] Lead event sent:", {
          eventId: params.eventId,
          ...(testEventCode ? { testEventCode } : {}),
        });
        return;
      }

      // Never log the URL — it contains the access token.
      const detail = (await res.text().catch(() => "")).slice(0, 500);
      if (res.status < 500) {
        console.error("[meta-capi] Lead event rejected:", {
          eventId: params.eventId,
          status: res.status,
          detail,
        });
        return;
      }
      console.warn("[meta-capi] Transient failure:", {
        status: res.status,
        attempt,
      });
    } catch (err) {
      clearTimeout(timer);
      console.warn("[meta-capi] Transient failure:", {
        reason:
          err instanceof Error && err.name === "AbortError"
            ? "timeout"
            : "network",
        attempt,
      });
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  }

  console.error("[meta-capi] Lead event failed after retries:", {
    eventId: params.eventId,
  });
}
