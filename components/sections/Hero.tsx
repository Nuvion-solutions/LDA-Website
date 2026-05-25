"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, CheckCircle2 } from "lucide-react";
import { BUSINESS, SHORT_DISCLAIMER } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animations";

const TRUST_ITEMS = [
  "LDA #87 Registered",
  "Sonoma County",
  "Free Consultation",
  "Remote Services Available",
];

export function Hero() {
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
            Registered Legal Document Assistant · LDA #87 · Sonoma County
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 md:mb-8"
          >
            Professional Document
            <br />
            Preparation You Can
            <br />
            <span className="text-[var(--color-gold)]">Count On.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl text-[var(--color-body-light)] max-w-2xl leading-relaxed mb-8 md:mb-10"
          >
            {BUSINESS.name} helps individuals and families prepare court forms,
            documents, and administrative paperwork — accurately, professionally,
            and at your direction.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
            <Link
              href="/intake"
              className="inline-flex items-center justify-center bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              Start Your Intake
            </Link>
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 border border-white/70 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] text-white px-7 py-3.5 rounded-sm tracking-wide transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call {BUSINESS.phone}
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--color-body-light)] mb-6"
          >
            {TRUST_ITEMS.map((item) => (
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
            {SHORT_DISCLAIMER}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
