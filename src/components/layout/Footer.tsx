import React from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export function Footer() {
  const currentYear = 2026;

  const pages = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "How we work", href: "/how-we-work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="w-full bg-[var(--surface)] border-t border-[var(--line)] py-14">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-16">
          {/* Brand info */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-3"
              aria-label="Orvilyn home"
            >
              {/* Logo mark from brand assets; TODO: Replace with full logo.svg when provided */}
              <Image
                src="/brand/logo-mark.png"
                alt="Orvilyn logo"
                width={28}
                height={28}
                className="h-7 w-auto object-contain"
              />
              <span className="font-[var(--font-display)] font-extrabold text-lg tracking-tight text-[var(--ink)]">
                Orvilyn
              </span>
            </Link>
            <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">
              {site.tagline}
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
            {/* Pages Column */}
            <div>
              <h3 className="font-[var(--font-display)] font-bold text-sm uppercase tracking-wider text-[var(--ink)] mb-4">
                Pages
              </h3>
              <ul className="flex flex-col gap-2.5">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--orange-strong)] transition-colors duration-200"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-[var(--font-display)] font-bold text-sm uppercase tracking-wider text-[var(--ink)] mb-4">
                Contact
              </h3>
              <ul className="flex flex-col gap-2.5">
                {site.email && site.email !== "hello@example.com" ? (
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-[var(--muted)] hover:text-[var(--orange-strong)] transition-colors duration-200"
                    >
                      {site.email}
                    </a>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-[var(--muted)] hover:text-[var(--orange-strong)] transition-colors duration-200"
                    >
                      Get in touch
                    </Link>
                  </li>
                )}
                {site.whatsapp ? (
                  <li>
                    <a
                      href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--muted)] hover:text-[var(--orange-strong)] transition-colors duration-200"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            {/* Social Column - only if site.socials is not empty */}
            {site.socials && site.socials.length > 0 && (
              <div>
                <h3 className="font-[var(--font-display)] font-bold text-sm uppercase tracking-wider text-[var(--ink)] mb-4">
                  Social
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {site.socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--muted)] hover:text-[var(--orange-strong)] transition-colors duration-200"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-[var(--line)]">
          <p className="text-sm text-[var(--muted)]">
            © {currentYear} Orvilyn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
