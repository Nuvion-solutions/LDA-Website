"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";

export function CTABanner() {
  const { t } = useLanguage();
  return (
    <section className="bg-[var(--color-gold)]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)] leading-tight mb-5">
          {t("cta_heading")}
        </h2>
        <p className="text-[var(--color-navy)]/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          {t("cta_sub")}
        </p>
        <Link
          href="/intake"
          className="inline-flex items-center justify-center bg-[var(--color-navy)] hover:bg-[var(--color-navy-mid)] text-white font-medium px-8 py-4 rounded-sm tracking-wide transition-colors"
        >
          {t("cta_button")}
        </Link>
      </motion.div>
    </section>
  );
}
