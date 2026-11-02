import React from "react";
import { Reveal } from "@/components/ui/Reveal";

export function ContactHero() {
  return (
    <section className="pt-20 pb-10 md:pt-28 md:pb-14 bg-[var(--bg)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <h1 className="text-[var(--ink)]">
            Tell us what’s annoying you.
          </h1>
          <p className="text-[var(--muted)] text-[1.25rem] leading-relaxed max-w-[36rem] mt-5">
            No jargon, no pressure. Not sure what you need? Perfect, that’s where most people start.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
