"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { statements } from "@/data/site";

export function StatementBand() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[var(--bg)] py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative">
        <div className="flex flex-col font-[var(--font-display)] font-extrabold text-[clamp(2.25rem,7vw,6rem)] leading-[1.02] tracking-[-0.02em]">
          <span className="text-[var(--ink)]">{statements[0]}</span>
          <span className="text-[var(--ink)]">{statements[1]}</span>
          <div>
            <span className="relative inline-block text-[var(--orange-strong)]">
              {statements[2]}
              <motion.span
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="hidden md:inline-block absolute left-full top-[-0.4em] ml-4 pointer-events-none"
              >
                <span className="inline-block -rotate-6 bg-[var(--butter)] text-[var(--ink)] border-2 border-[var(--ink)] rounded-[12px] px-[18px] py-[10px] text-[1.25rem] font-bold leading-none whitespace-nowrap select-none shadow-sm">
                  Promise.
                </span>
              </motion.span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
