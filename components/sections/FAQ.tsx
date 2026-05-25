"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";

const FAQS = [
  {
    q: "Are you attorneys?",
    a: "No. We are not attorneys and do not provide legal advice or representation. We are Registered Legal Document Assistants who prepare documents at your direction.",
  },
  {
    q: "Can you tell me what I should file?",
    a: "No. We cannot choose forms, give legal strategy, or advise you on your rights. You direct us on what documents you need prepared.",
  },
  {
    q: "What documents do you help with?",
    a: "We prepare documents for divorce and family law, eviction (unlawful detainer), immigration (USCIS forms), living trusts and estate planning, powers of attorney, DMV forms, and tax document organization (clerical).",
  },
  {
    q: "Do you submit documents for me?",
    a: "No. You review, sign, and submit your own documents.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the type and complexity of documents. After intake, we provide pricing before beginning any work. Your consultation is free.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--color-offwhite)] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[var(--color-navy)] text-xs tracking-[0.22em] uppercase mb-4 opacity-70">
            Common Questions
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="border border-[var(--color-border-light)] bg-white rounded-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left hover:bg-[var(--color-offwhite)] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-serif text-lg md:text-xl text-[var(--color-navy)]">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-[var(--color-gold)] shrink-0" aria-hidden />
                  ) : (
                    <Plus className="h-5 w-5 text-[var(--color-gold)] shrink-0" aria-hidden />
                  )}
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${i}`}
                    className="px-5 md:px-6 pb-5 text-[var(--color-body-dark)] leading-relaxed opacity-90"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
