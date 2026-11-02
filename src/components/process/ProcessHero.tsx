import React from "react";
import { Reveal } from "@/components/ui/Reveal";

const pills = ["4 steps", "1 fixed price", "0 jargon"];

export function ProcessHero() {
  return (
    <section className="w-full bg-[var(--bg)] pt-20 pb-6 md:pt-28 md:pb-10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal delay={0}>
          <h1 className="text-[var(--ink)]">How we work.</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-[var(--muted)] text-[1.25rem] max-w-[38rem] mt-[20px] leading-relaxed">
            No mystery, no disappearing acts. Here’s exactly what happens, from
            the first call to launch day and after.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex flex-wrap gap-[12px] mt-[28px]">
            {pills.map((pill) => (
              <span
                key={pill}
                className="border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[8px] font-semibold text-[0.9rem] text-[var(--ink)] rounded-[var(--radius-btn)] select-none"
              >
                {pill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
