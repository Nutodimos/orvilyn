import React from "react";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    number: "1",
    title: "We reply.",
    description: "Within 24 hours, from a real person.",
  },
  {
    number: "2",
    title: "A short call.",
    description: "No jargon, no pressure.",
  },
  {
    number: "3",
    title: "A fixed-price quote.",
    description: "So you know the cost before we start.",
  },
];

export function WhatHappensNext() {
  return (
    <section className="bg-[var(--orange-tint)] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <h2 className="text-[var(--ink)] mb-8 md:mb-12">
            What happens next
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="flex flex-col items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--orange)] text-[var(--on-orange)] font-bold flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-[var(--ink)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
