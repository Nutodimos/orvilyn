"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { steps } from "@/data/steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { EASING } from "@/lib/motion";

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="w-full bg-[var(--orange-tint)] py-20 md:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHeading title="How it works" align="left" />

        {/* Desktop Process Flow (lg+) */}
        <div className="hidden lg:block relative mt-16">
          {/* Connector tracks */}
          <div
            className="absolute top-5 h-[2px] bg-[var(--line)] z-0"
            style={{
              left: "20px",
              width: "calc((100% - 6rem) / 4 * 3 + 6rem)",
            }}
          />
          <motion.div
            initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASING }}
            style={{
              left: "20px",
              width: "calc((100% - 6rem) / 4 * 3 + 6rem)",
              transformOrigin: "left",
            }}
            className="absolute top-5 h-[2px] bg-[var(--orange)] z-0"
          />

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--orange)] text-[var(--on-orange)] font-bold text-base flex items-center justify-center shadow-sm shrink-0">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)] mt-6 mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--muted)] text-base leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Process Flow (below lg) */}
        <div className="lg:hidden relative mt-12 pl-4">
          {/* Vertical Connector Line */}
          <div className="absolute top-5 bottom-8 left-[35px] w-[2px] bg-[var(--line)] z-0" />
          <motion.div
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASING }}
            style={{ transformOrigin: "top" }}
            className="absolute top-5 bottom-8 left-[35px] w-[2px] bg-[var(--orange)] z-0"
          />

          <div className="flex flex-col gap-10 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[var(--orange)] text-[var(--on-orange)] font-bold text-base flex items-center justify-center shadow-sm shrink-0">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--ink)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[var(--muted)] text-base leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Process Link */}
        <div className="mt-14 lg:mt-16 text-left">
          <Button
            href="/how-we-work"
            variant="link"
            className="font-semibold text-base"
          >
            See the full process
          </Button>
        </div>
      </div>
    </section>
  );
}
