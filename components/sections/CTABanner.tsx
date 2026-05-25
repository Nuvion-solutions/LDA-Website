"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function CTABanner() {
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
          Ready to Get Your Documents Prepared?
        </h2>
        <p className="text-[var(--color-navy)]/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Start with a free consultation — tell us what you need and we&apos;ll
          take care of the rest. Pricing provided after intake — your
          consultation is free.
        </p>
        <Link
          href="/intake"
          className="inline-flex items-center justify-center bg-[var(--color-navy)] hover:bg-[var(--color-navy-mid)] text-white font-medium px-8 py-4 rounded-sm tracking-wide transition-colors"
        >
          Start Your Intake
        </Link>
      </motion.div>
    </section>
  );
}
