import React from "react";
import { Reveal } from "@/components/ui/Reveal";

export function MoneyNote() {
  return (
    <section className="w-full bg-[var(--surface)] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-[44rem]">
          <Reveal>
            <h2 className="text-[var(--ink)]">The money, plainly.</h2>
            {/* // TODO: only enable after payment terms are confirmed. */}
            <p className="text-[var(--muted)] text-[1.125rem] mt-[16px] leading-relaxed">
              You pay in stages, not all at once. The stages are in your quote, so
              there are no surprises.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
