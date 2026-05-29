import { GoogleAnalytics } from "@next/third-parties/google";

// Loads Google Analytics 4 only when a measurement ID is configured via
// NEXT_PUBLIC_GA_ID. Until that env var is set (e.g. in dev, in previews, or
// before the GA property exists) this renders nothing, so it's safe to ship.
// Pageviews on client-side route changes are tracked automatically by the
// GoogleAnalytics component; see components/intake/IntakeForm.tsx for the
// `generate_lead` conversion event fired on a successful intake submission.
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
