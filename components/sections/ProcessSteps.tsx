"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";

export function ProcessSteps() {
  const { t } = useLanguage();
  const steps = [
    { n: 1, title: t("process_1_title"), body: t("process_1_body") },
    { n: 2, title: t("process_2_title"), body: t("process_2_body") },
    { n: 3, title: t("process_3_title"), body: t("process_3_body") },
    { n: 4, title: t("process_4_title"), body: t("process_4_body") },
  ];

  return (
    <section className="bg-[var(--color-offwhite)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-2xl mb-12 md:mb-16 text-center mx-auto"
        >
          <p className="text-[var(--color-navy)] text-xs tracking-[0.22em] uppercase mb-4 opacity-70">
            {t("process_eyebrow")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)] leading-tight">
            {t("process_heading")}
          </h2>
          <p className="mt-5 text-[var(--color-body-dark)] text-base md:text-lg leading-relaxed opacity-80">
            {t("process_sub")}
          </p>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {steps.map((step) => (
            <motion.li key={step.n} variants={fadeUp} className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-navy)] font-serif text-xl font-semibold mb-5">
                {step.n}
              </div>
              <h3 className="font-serif text-xl text-[var(--color-navy)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-body-dark)] leading-relaxed opacity-80">
                {step.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
