import React from "react";
import { Reveal } from "@/components/ui/Reveal";

export function WorkHero() {
  return (
    <section className="w-full bg-[var(--bg)] pt-20 pb-10 md:pt-28 md:pb-14">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <h1 className="text-[var(--ink)]">Selected work.</h1>
          <p className="text-[var(--muted)] text-[1.25rem] leading-relaxed max-w-[36rem] mt-5">
            Real projects, real problems, and what happened next. Open any of
            them for the full story.
          </p>
          <p className="text-[var(--muted)] text-[0.95rem] mt-3">
            Built by Somidotun, before and alongside Orvilyn.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
