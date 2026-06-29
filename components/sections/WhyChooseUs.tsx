"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  BadgeDollarSign,
  MessageSquareText,
  Scale,
} from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";

export function WhyChooseUs() {
  const { t } = useLanguage();
  const pillars = [
    { icon: Sparkles, title: t("why_1_title"), body: t("why_1_body") },
    {
      icon: BadgeDollarSign,
      title: t("why_2_title"),
      body: t("why_2_body"),
    },
    {
      icon: MessageSquareText,
      title: t("why_3_title"),
      body: t("why_3_body"),
    },
    {
      icon: Scale,
      title: t("why_4_title"),
      body: t("why_4_body"),
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <p className="text-[var(--color-navy)] text-xs tracking-[0.22em] uppercase mb-4 opacity-70">
            {t("why_eyebrow")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-navy)] leading-tight">
            {t("why_heading")}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
        >
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="border-l-2 border-[var(--color-gold)] pl-6 py-2"
              >
                <Icon
                  className="h-8 w-8 text-[var(--color-gold)] mb-5"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-2xl text-[var(--color-navy)] mb-3">
                  {p.title}
                </h3>
                <p className="text-[var(--color-body-dark)] leading-relaxed opacity-85">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
