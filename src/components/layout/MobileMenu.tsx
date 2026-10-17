"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASING } from "@/lib/motion";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export function MobileMenu({ isOpen, onClose, id = "mobile-menu" }: MobileMenuProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -16,
      transition: { duration: 0.2, ease: EASING },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: EASING },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 top-[72px] z-40 flex flex-col justify-between bg-[var(--bg)] px-6 py-8 md:hidden overflow-y-auto"
        >
          <nav className="flex flex-col gap-6 pt-4" aria-label="Mobile navigation">
            {site.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`text-[2rem] font-[var(--font-display)] font-bold transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--orange-strong)]"
                      : "text-[var(--ink)] hover:text-[var(--orange-strong)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 pb-4">
            <Button
              href={site.cta.href}
              size="lg"
              variant="primary"
              className="w-full justify-center"
              onClick={onClose}
            >
              {site.cta.label}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
