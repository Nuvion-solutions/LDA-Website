"use client";

import type { ReactNode } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { BUSINESS } from "@/lib/utils";

// A click-to-call link that fires a GA4 `phone_click` conversion event before
// the call connects. Phone calls are the highest-intent lead for an LDA, so we
// track every call surface (hero, nav, footer, intake) with a `source` label to
// see which placements drive calls. If GA isn't configured the event simply
// queues in the dataLayer with no consumer — safe to render anywhere.
export function CallLink({
  source,
  className,
  children,
  onClick,
}: {
  source: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={`tel:${BUSINESS.phoneTel}`}
      className={className}
      onClick={() => {
        try {
          sendGAEvent("event", "phone_click", { source });
          // Google Ads "Website click-to-call" conversion (Contact category).
          // The full send_to value (AW-XXXX/label) lives in the env var.
          if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL) {
            window.gtag?.("event", "conversion", {
              send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL,
            });
          }
        } catch {
          // Never let analytics block the call.
        }
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
