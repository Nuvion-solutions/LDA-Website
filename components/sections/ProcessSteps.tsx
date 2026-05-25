"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const STEPS = [
  {
    n: 1,
    title: "Free Consultation",
    body: "Tell us what documents you need prepared.",
  },
  {
    n: 2,
    title: "Document Preparation",
    body: "We prepare your paperwork carefully and professionally.",
  },
  {
    n: 3,
    title: "Client Review & Signing",
    body: "You review, approve, and sign your documents.",
  },
  {
    n: 4,
    title: "You Submit",
    body: "You file and submit your documents directly.",
  },
];

export function ProcessSteps() {
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
            The Process
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)] leading-tight">
            How It Works
          </h2>
          <p className="mt-5 text-[var(--color-body-dark)] text-base md:text-lg leading-relaxed opacity-80">
            A clear, simple process from your first call to the final filing —
            so you always know what comes next.
          </p>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {STEPS.map((step) => (
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
