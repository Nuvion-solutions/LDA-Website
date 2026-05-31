"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HOMEPAGE_SERVICES, localized } from "@/lib/services";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";

export function ServicesPreview() {
  const { t, lang } = useLanguage();
  return (
    <section className="bg-[var(--color-navy)] text-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <p className="text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase mb-4">
            {t("services_eyebrow")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">
            {t("services_heading")}
          </h2>
          <p className="mt-5 text-[var(--color-body-light)] text-base md:text-lg leading-relaxed">
            {t("services_sub")}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {HOMEPAGE_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={fadeUp}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full bg-[var(--color-navy-mid)] hover:bg-[var(--color-navy-light)] border border-[var(--color-border-dark)] hover:border-[var(--color-gold)] rounded-sm p-7 transition-all duration-300"
                >
                  <Icon
                    className="h-9 w-9 text-[var(--color-gold)] mb-5"
                    aria-hidden
                    strokeWidth={1.5}
                  />
                  <h3 className="font-serif text-xl md:text-2xl mb-3 leading-snug">
                    {localized(service, "title", lang)}
                  </h3>
                  <p className="text-sm text-[var(--color-body-light)] leading-relaxed mb-5">
                    {localized(service, "short", lang)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gold)] group-hover:gap-2.5 transition-all">
                    {t("services_learn_more")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
