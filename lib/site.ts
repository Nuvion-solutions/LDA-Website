// Central source of truth for the production site URL.
// Set NEXT_PUBLIC_SITE_URL in .env.local once the real domain is registered.
// Until then, a placeholder is used so metadataBase, sitemap, robots, and
// JSON-LD all resolve without error during local dev / preview builds.

const PLACEHOLDER = "https://example.com";

function normalize(raw: string | undefined): string {
  if (!raw) return PLACEHOLDER;
  return raw.replace(/\/+$/, "");
}

export const SITE_URL = normalize(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.startsWith("/")) path = "/" + path;
  return SITE_URL + path;
}
