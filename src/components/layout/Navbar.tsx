"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

function subscribeScroll(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  if (typeof window === "undefined") return false;
  return window.scrollY > 8;
}

function getScrollServerSnapshot() {
  return false;
}

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-[72px] w-full transition-[border-color,background-color,box-shadow] duration-200 bg-[var(--bg)]/90 backdrop-blur-md ${
          isScrolled
            ? "border-b border-[var(--line)] shadow-[0_2px_12px_rgba(31,27,22,0.04)]"
            : "border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--orange)]"
            aria-label="Orvilyn home"
          >
            {/* Logo mark from brand assets; TODO: Replace with full logo.svg when provided */}
            <Image
              src="/brand/logo-mark.png"
              alt="Orvilyn logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
            <span className="font-[var(--font-display)] font-extrabold text-xl tracking-tight text-[var(--ink)]">
              Orvilyn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-7">
              {site.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[0.95rem] font-medium transition-colors duration-200 py-1 ${
                      isActive
                        ? "text-[var(--orange-strong)]"
                        : "text-[var(--ink)] hover:text-[var(--orange-strong)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--orange)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <Button href={site.cta.href} variant="primary" size="md">
              {site.cta.label}
            </Button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-lg text-[var(--ink)] hover:text-[var(--orange-strong)] transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        id="mobile-menu"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
