import React from "react";
import { promises } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";

export function Promises() {
  return (
    <section className="w-full bg-[var(--ink)] text-[var(--bg)] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div>
          <Reveal delay={0}>
            <span className="block text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--bg)]/60">
              Our promises
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--bg)] mt-[12px]">
              Four things you can hold us to.
            </h2>
          </Reveal>
        </div>

        <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 md:gap-x-[48px]">
          {promises.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.08}>
              <div className="border-t border-[var(--bg)]/15 pt-[24px] pb-[32px]">
                <h3 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-[var(--bg)]">
                  {item.title}
                </h3>
                <p className="text-[var(--bg)]/70 text-[1.0625rem] mt-[8px] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
