"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export function ScopeStatement() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[var(--bg)] border-t border-[var(--line)] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <div>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.02em]">
              <span className="block text-[var(--ink)]">Logos, ads, SEO?</span>
              <span className="relative inline-block text-[var(--orange-strong)]">
                Not our thing.
                <motion.span
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="hidden md:inline-block absolute left-full top-[-0.3em] ml-[16px] pointer-events-none"
                >
                  <span className="inline-block -rotate-6 bg-[var(--butter)] text-[var(--ink)] border-2 border-[var(--ink)] rounded-[12px] px-[18px] py-[10px] text-[1.25rem] font-bold leading-none whitespace-nowrap select-none">
                    Straight talk.
                  </span>
                </motion.span>
              </span>
            </h2>
            <p className="text-[var(--muted)] text-[1.25rem] max-w-[36rem] mt-[24px] leading-relaxed">
              We’d rather be great at a few things than average at everything. Not
              sure your idea fits? Ask. If it’s not us, we’ll say so and point
              you somewhere sensible.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
