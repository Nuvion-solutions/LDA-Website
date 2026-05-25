"use client";

import { useLanguage } from "@/lib/language-context";

export function IntakeHero() {
  const { t } = useLanguage();
  return (
    <section className="bg-[var(--color-navy)] text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-5">
          {t("intake_eyebrow")}
        </p>
        <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-5">
          {t("intake_heading")}
        </h1>
        <p className="text-[var(--color-body-light)] text-base md:text-lg leading-relaxed max-w-2xl">
          {t("intake_sub")}
        </p>
        <p className="mt-4 text-xs text-[var(--color-muted-light)] max-w-2xl">
          {t("short_disclaimer")}
        </p>
      </div>
    </section>
  );
}
