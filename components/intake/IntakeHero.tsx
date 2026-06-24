"use client";

import { useLanguage } from "@/lib/language-context";

export function IntakeHero() {
  const { t } = useLanguage();
  return (
    <section className="bg-[var(--color-navy)] text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 text-center">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-3">
          {t("intake_eyebrow")}
        </p>
        <h1 className="font-serif text-2xl md:text-3xl leading-tight mb-3">
          {t("intake_heading")}
        </h1>
        <p className="text-[var(--color-body-light)] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {t("intake_sub")}
        </p>
        <p className="mt-3 text-xs text-[var(--color-muted-light)] max-w-2xl mx-auto">
          {t("short_disclaimer")}
        </p>
      </div>
    </section>
  );
}
