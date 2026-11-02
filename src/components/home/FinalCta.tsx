import React from "react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

interface FinalCtaProps {
  className?: string;
}

export function FinalCta({ className = "" }: FinalCtaProps = {}) {
  return (
    <section className={`w-full bg-[var(--bg)] pb-20 md:pb-28 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[var(--orange)] text-[var(--on-orange)] p-10 md:p-16 text-center shadow-[var(--shadow-card)]">
            {/* Decorative circle 1: large top-right, partly clipped */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 pointer-events-none"
              aria-hidden="true"
            />
            {/* Decorative circle 2: smaller bottom-left */}
            <div
              className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-white/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--on-orange)]">
                Got something that’s annoying you? Let’s fix it.
              </h2>

              <div className="mt-8">
                <MagneticButton>
                  <Button href={site.cta.href} variant="dark" size="lg">
                    {site.cta.label}
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
