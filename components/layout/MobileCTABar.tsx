"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { CallLink } from "@/components/analytics/CallLink";
import { useLanguage } from "@/lib/language-context";

// Persistent bottom action bar on mobile, where most paid (Facebook) traffic
// lands. Keeps "Call" and "Start Intake" one tap away no matter how far the
// visitor has scrolled. Hidden on desktop (which has the nav CTA) and on the
// intake page itself, where the form is already the focus.
export function MobileCTABar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith("/intake")) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 flex border-t border-[var(--color-border-light)] bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      <CallLink
        source="mobile_bar"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[var(--color-navy)] font-medium border-r border-[var(--color-border-light)]"
      >
        <Phone className="h-4 w-4" aria-hidden />
        {t("hero_cta_secondary")}
      </CallLink>
      <Link
        href="/intake"
        className="flex-1 flex items-center justify-center py-3.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-medium tracking-wide"
      >
        {t("hero_cta_primary")}
      </Link>
    </div>
  );
}
