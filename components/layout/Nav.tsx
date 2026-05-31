"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Languages } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { CallLink } from "@/components/analytics/CallLink";
import { useLanguage } from "@/lib/language-context";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleLang = () => setLang(lang === "en" ? "es" : "en");

  const links = [
    { href: "/", label: t("nav_home") },
    { href: "/services", label: t("nav_services") },
    { href: "/about", label: t("nav_about") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-navy)] border-b border-[var(--color-gold)]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-3">
          <Link
            href="/"
            className="font-serif text-[var(--color-gold)] tracking-[0.18em] uppercase text-sm md:text-base whitespace-nowrap"
            aria-label={BUSINESS.name}
          >
            <span className="hidden sm:inline">California Legal Document Excellence</span>
            <span className="sm:hidden">CLDE</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-body-light)] hover:text-[var(--color-gold)] transition-colors text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <CallLink
              source="nav_desktop"
              className="flex items-center gap-2 text-[var(--color-body-light)] hover:text-[var(--color-gold)] transition-colors text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {BUSINESS.phone}
            </CallLink>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={
                lang === "en"
                  ? "Switch to Spanish"
                  : "Cambiar a inglés"
              }
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-gold-light)] border border-[var(--color-gold)]/40 px-3 py-2 rounded-sm hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors min-h-[40px]"
            >
              <Languages className="h-3.5 w-3.5" aria-hidden />
              {t("nav_lang_toggle")}
            </button>
            <Link
              href="/intake"
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-5 py-2.5 rounded-sm text-sm tracking-wide transition-colors"
            >
              {t("nav_cta")}
            </Link>
          </nav>

          {/* Mobile right-side controls: language toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={
                lang === "en"
                  ? "Switch to Spanish"
                  : "Cambiar a inglés"
              }
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-gold-light)] border border-[var(--color-gold)]/40 px-2.5 py-2 rounded-sm active:bg-[var(--color-gold)]/10 transition-colors min-h-[40px]"
            >
              <Languages className="h-4 w-4" aria-hidden />
              <span>{t("nav_lang_toggle")}</span>
            </button>
            <button
              type="button"
              className="text-[var(--color-body-light)] hover:text-[var(--color-gold)] transition-colors p-2 -mr-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center"
              aria-label={open ? t("nav_menu_close") : t("nav_menu_open")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="md:hidden fixed left-0 right-0 top-16 z-40 bg-[var(--color-navy)] overflow-y-auto"
          style={{ height: "calc(100dvh - 4rem)" }}
        >
          <nav className="flex flex-col px-6 py-6 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[var(--color-body-light)] hover:text-[var(--color-gold)] font-serif text-2xl py-4 border-b border-[var(--color-border-dark)]"
              >
                {link.label}
              </Link>
            ))}
            <CallLink
              source="nav_mobile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[var(--color-body-light)] hover:text-[var(--color-gold)] py-4 text-lg border-b border-[var(--color-border-dark)]"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {BUSINESS.phone}
            </CallLink>
            <button
              type="button"
              onClick={() => {
                toggleLang();
                setOpen(false);
              }}
              className="flex items-center gap-3 text-[var(--color-body-light)] hover:text-[var(--color-gold)] py-4 text-lg border-b border-[var(--color-border-dark)]"
            >
              <Languages className="h-5 w-5" aria-hidden />
              {t("nav_lang_toggle")}
            </button>
            <Link
              href="/intake"
              onClick={() => setOpen(false)}
              className="mt-6 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-6 py-4 rounded-sm text-center tracking-wide"
            >
              {t("nav_cta")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
