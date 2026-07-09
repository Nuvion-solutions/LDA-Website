"use client";

import Script from "next/script";

// Google Ads tag + conversion tracking. It attaches the Ads account to the
// SAME gtag instance that GA4 already loads (components/analytics/Analytics.tsx)
// rather than adding a second gtag.js — Google's rule is one Google tag per
// page. If GA4 isn't configured, this loads gtag.js itself. Renders nothing
// unless NEXT_PUBLIC_GOOGLE_ADS_ID is set, so dev/preview stay clean.
//
// The "Submit lead form" conversion event fires on a successful intake
// submission — see components/intake/IntakeForm.tsx (fired alongside the GA4
// `generate_lead` and Meta `Lead` events, so all three ad platforms get the
// same signal from the same moment).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAds() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!adsId) return null;

  return (
    <>
      {/* Load gtag.js only if GA4 isn't already loading it (one tag per page). */}
      {!gaId && (
        <Script
          id="gtag-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
          strategy="afterInteractive"
        />
      )}
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          ${gaId ? "" : "gtag('js', new Date());"}
          gtag('config', '${adsId}');
        `}
      </Script>
    </>
  );
}
