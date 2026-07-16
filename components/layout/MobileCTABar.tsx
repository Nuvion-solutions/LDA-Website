"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { Phone, MessageSquareText } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { CallLink } from "@/components/analytics/CallLink";
import { sendGAEvent } from "@next/third-parties/google";
import { useLanguage } from "@/lib/language-context";
import { stripLocale } from "@/lib/i18n";

// Persistent bottom action bar on mobile, where most paid traffic lands. Keeps
// the three lowest-friction lead paths — Call, Text, and Start Intake — one tap
// away no matter how far the visitor has scrolled. Hidden on desktop (which has
// the nav CTA) and on the intake page itself, where the form is the focus.
export function MobileCTABar() {
  const pathname = usePathname();
  const { t, lang } = useLanguage();
  const es = lang === "es";

  // Hide on the intake page (English or Spanish) where the form is the focus.
  if (stripLocale(pathname ?? "/").startsWith("/intake")) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 flex border-t border-[var(--color-border-light)] bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      <CallLink
        source="mobile_bar"
        className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[var(--color-navy)] text-xs font-medium border-r border-[var(--color-border-light)]"
      >
        <Phone className="h-5 w-5" aria-hidden />
        {es ? "Llamar" : "Call"}
      </CallLink>
      <a
        href={`sms:${BUSINESS.phoneTel}`}
        onClick={() => {
          try {
            sendGAEvent("event", "text_click", { source: "mobile_bar" });
            // Texting is the same "Contact" conversion as a call click.
            if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL) {
              window.gtag?.("event", "conversion", {
                send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL,
              });
            }
          } catch {
            /* never block the SMS */
          }
        }}
        className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[var(--color-navy)] text-xs font-medium border-r border-[var(--color-border-light)]"
      >
        <MessageSquareText className="h-5 w-5" aria-hidden />
        {es ? "Texto" : "Text"}
      </a>
      <Link
        href="/intake"
        className="flex-[1.4] flex items-center justify-center py-2.5 bg-[var(--color-gold)] text-[var(--color-navy)] text-sm font-medium tracking-wide text-center"
      >
        {t("hero_cta_primary")}
      </Link>
    </div>
  );
}
