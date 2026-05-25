"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-navy)] border-b border-[var(--color-gold)]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-[var(--color-gold)] tracking-[0.18em] uppercase text-sm md:text-base whitespace-nowrap"
            aria-label={BUSINESS.name}
          >
            <span className="hidden sm:inline">California Legal Document Excellence</span>
            <span className="sm:hidden">CLDE</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-body-light)] hover:text-[var(--color-gold)] transition-colors text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="flex items-center gap-2 text-[var(--color-body-light)] hover:text-[var(--color-gold)] transition-colors text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {BUSINESS.phone}
            </a>
            <Link
              href="/intake"
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-5 py-2.5 rounded-sm text-sm tracking-wide transition-colors"
            >
              Start Your Intake
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-[var(--color-body-light)] hover:text-[var(--color-gold)] transition-colors p-2 -mr-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[var(--color-navy)] flex flex-col">
          <nav className="flex flex-col px-6 py-8 gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[var(--color-body-light)] hover:text-[var(--color-gold)] font-serif text-2xl py-4 border-b border-[var(--color-border-dark)]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[var(--color-body-light)] hover:text-[var(--color-gold)] py-4 text-lg border-b border-[var(--color-border-dark)]"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {BUSINESS.phone}
            </a>
            <Link
              href="/intake"
              onClick={() => setOpen(false)}
              className="mt-6 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-medium px-6 py-4 rounded-sm text-center tracking-wide"
            >
              Start Your Intake
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
