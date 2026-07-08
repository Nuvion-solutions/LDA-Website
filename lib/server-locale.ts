import "server-only";
import { headers } from "next/headers";
import { localeFromPathname } from "./i18n";
import type { Language } from "./translations";

// The render language for the current request, derived from the URL path
// (middleware exposes it via x-pathname). "/es/..." → Spanish, else English.
// This is what lets the same page component serve both the English route and
// its "/es" counterpart, rendering the right language server-side for SEO.
export async function getServerLocale(): Promise<Language> {
  const h = await headers();
  return localeFromPathname(h.get("x-pathname") ?? "/");
}
