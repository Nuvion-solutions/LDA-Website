// URL-based locale helpers. English is the default and lives at the root
// (unprefixed) — its URLs and rendered hrefs are untouched. Spanish lives under
// a "/es" prefix. Every helper is a no-op for English, so the English render
// path is byte-identical to before i18n routing existed.

import type { Language } from "./translations";

export const LOCALES: Language[] = ["en", "es"];
export const DEFAULT_LOCALE: Language = "en";

// The locale a given pathname belongs to. "/es" and "/es/..." are Spanish;
// everything else is English.
export function localeFromPathname(pathname: string): Language {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

// Prefix an internal href for the given locale. English → unchanged.
// External links, anchors, and already-prefixed hrefs pass through untouched.
export function withLocale(href: string, lang: Language): string {
  if (lang !== "es") return href;
  if (!href.startsWith("/")) return href; // external, mailto:, tel:, #anchor
  if (href === "/es" || href.startsWith("/es/")) return href; // already prefixed
  if (href === "/") return "/es";
  return `/es${href}`;
}

// The English-equivalent path for any path (strips the /es prefix). Used to
// build hreflang pairs and to power the language toggle.
export function stripLocale(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

// The path for the same page in the other language (used by the toggle).
export function pathForLocale(pathname: string, lang: Language): string {
  const base = stripLocale(pathname);
  return withLocale(base, lang);
}
