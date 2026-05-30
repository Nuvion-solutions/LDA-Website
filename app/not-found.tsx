"use client";

import Link from "next/link";
import { Home, FileText } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--color-navy)] text-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
          {t("notfound_eyebrow")}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">
          {t("notfound_title")}
        </h1>
        <p className="text-[var(--color-body-light)] text-lg leading-relaxed max-w-xl mx-auto mb-10">
          {t("notfound_body")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-6 py-3 rounded-sm text-sm tracking-wide transition-colors"
          >
            <Home className="h-4 w-4" aria-hidden />
            {t("notfound_home")}
          </Link>
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 border border-[var(--color-gold)]/50 hover:border-[var(--color-gold)] text-[var(--color-gold-light)] hover:text-[var(--color-gold)] px-6 py-3 rounded-sm text-sm tracking-wide transition-colors"
          >
            <FileText className="h-4 w-4" aria-hidden />
            {t("notfound_cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
