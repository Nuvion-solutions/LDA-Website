"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { FAQS } from "@/lib/faqs";
import { useLanguage } from "@/lib/language-context";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { lang, t } = useLanguage();

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
            {t("faq_eyebrow")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)]">
            {t("faq_heading")}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const q = lang === "es" ? item.questionEs : item.question;
            const a = lang === "es" ? item.answerEs : item.answer;
            return (
              <div
                key={item.question}
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
                    {q}
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
                    {a}
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
