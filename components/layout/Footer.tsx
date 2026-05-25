"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { SERVICES } from "@/lib/services";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[var(--color-navy)] text-[var(--color-body-light)] border-t border-[var(--color-gold)]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1 — Business */}
          <div>
            <h3 className="font-serif text-[var(--color-gold)] text-lg mb-4">
              {BUSINESS.name}
            </h3>
            <p className="text-sm text-[var(--color-muted-light)] mb-4">
              {BUSINESS.lda}, {BUSINESS.county}
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--color-gold)] shrink-0" aria-hidden />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-[var(--color-gold)] shrink-0" aria-hidden />
                <a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-[var(--color-gold)]">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-[var(--color-gold)] shrink-0" aria-hidden />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-[var(--color-gold)] break-all">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-[var(--color-gold)] shrink-0" aria-hidden />
                <span>{BUSINESS.hours}</span>
              </li>
            </ul>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="font-serif text-[var(--color-gold)] text-lg mb-4">
              {t("footer_col_quicklinks")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="hover:text-[var(--color-gold)]">
                  {t("footer_link_services")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--color-gold)]">
                  {t("footer_link_about")}
                </Link>
              </li>
              <li>
                <Link href="/intake" className="hover:text-[var(--color-gold)]">
                  {t("footer_link_intake")}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[var(--color-gold)]">
                  {t("footer_link_faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3 className="font-serif text-[var(--color-gold)] text-lg mb-4">
              {t("footer_col_services")}
            </h3>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="hover:text-[var(--color-gold)]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payments */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border-dark)]">
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted-light)] mb-3">
            {t("footer_payment_heading")}
          </p>
          <div className="flex flex-wrap gap-2">
            {["Credit / Debit", "Zelle", "Venmo"].map((p) => (
              <span
                key={p}
                className="text-xs px-3 py-1.5 border border-[var(--color-gold)]/40 text-[var(--color-gold-light)] rounded-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer + copyright */}
        <div className="mt-10 pt-8 border-t border-[var(--color-border-dark)] space-y-4">
          <p className="text-xs leading-relaxed text-[var(--color-muted-light)]">
            <strong className="text-[var(--color-gold-light)]">
              {t("footer_disclosure_label")}{" "}
            </strong>
            {t("full_disclaimer")}
          </p>
          <p className="text-xs text-[var(--color-muted-light)]">
            © {year} {BUSINESS.name}. {t("footer_rights")} {BUSINESS.lda},{" "}
            {BUSINESS.county}.
          </p>
        </div>
      </div>
    </footer>
  );
}
