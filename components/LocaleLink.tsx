"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/lib/language-context";
import { withLocale } from "@/lib/i18n";

// Drop-in replacement for next/link that prefixes internal hrefs with the
// current locale ("/es") when the site is in Spanish. In English it returns the
// href unchanged, so English output is identical to plain next/link.
//
// Client components use it via an aliased import so existing <Link> call sites
// don't change:  import { LocaleLink as Link } from "@/components/LocaleLink";
export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { lang } = useLanguage();
  const localized = typeof href === "string" ? withLocale(href, lang) : href;
  return <Link href={localized} {...props} />;
}
