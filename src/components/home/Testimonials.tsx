import React from "react";
import { featured } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialMarquee } from "./TestimonialMarquee";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="w-full bg-[var(--surface)] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 mb-12">
        <SectionHeading title="What people say" align="center" />
      </div>

      {/* Full-bleed Marquee */}
      <TestimonialMarquee />

      {/* 2 Featured Testimonial Cards */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featured.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="h-full bg-[var(--bg)] border border-[var(--line)] rounded-[20px] p-8 md:p-10 flex flex-col justify-between shadow-[var(--shadow-card)] relative">
                <div>
                  {/* Large decorative quote mark */}
                  <span
                    className="font-[var(--font-display)] font-extrabold text-[4rem] leading-none not-italic text-[var(--orange)] select-none -mb-3 block"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <p className="text-[1.125rem] text-[var(--ink)] leading-relaxed mb-6 font-normal">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-[var(--ink)] mb-6">
                    {item.result}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base text-[var(--ink)]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">{item.role}</p>
                  </div>
                  {item.isPlaceholder && (
                    <span className="px-2 py-0.5 text-[0.75rem] font-medium text-[var(--muted)] border border-[var(--line)] rounded-full bg-[var(--surface)] shrink-0">
                      Placeholder
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
