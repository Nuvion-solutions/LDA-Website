"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, CheckCircle2 } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { CallLink } from "@/components/analytics/CallLink";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t } = useLanguage();
  const trustItems = [
    t("hero_trust_1"),
    t("hero_trust_2"),
    t("hero_trust_3"),
    t("hero_trust_4"),
    t("hero_trust_5"),
  ];

  return (
    <section className="relative bg-[var(--color-navy)] text-white overflow-hidden">
      {/* Subtle gold glow accent */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.10), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-gold)] text-xs md:text-sm tracking-[0.22em] uppercase mb-6 md:mb-8"
          >
            {t("hero_label")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 md:mb-8"
          >
            {t("hero_headline_1")}
            <br />
            {t("hero_headline_2")}
            <br />
            <span className="text-[var(--color-gold)]">
              {t("hero_headline_3")}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl text-[var(--color-body-light)] max-w-2xl leading-relaxed mb-8 md:mb-10"
          >
            {t("hero_subhead")}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
            <Link
              href="/intake"
              className="inline-flex items-center justify-center bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              {t("hero_cta_primary")}
            </Link>
            <CallLink
              source="hero"
              className="inline-flex items-center justify-center gap-2 border border-white/70 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] text-white px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {t("hero_cta_secondary")} {BUSINESS.phone}
            </CallLink>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--color-body-light)] mb-6"
          >
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-gold)]" aria-hidden />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            className="text-xs text-[var(--color-muted-light)] max-w-2xl leading-relaxed"
          >
            {t("short_disclaimer")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
