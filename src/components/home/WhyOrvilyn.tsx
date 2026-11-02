import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhyOrvilyn() {
  const points = [
    {
      title: "You talk to the person building it.",
      text: "No account managers, no telephone game.",
    },
    {
      title: "Security isn’t an add-on.",
      text: "It’s in the build from day one.",
    },
    {
      title: "Software that looks alive.",
      text: "Motion design is part of the package, not an upsell.",
    },
  ];

  return (
    <section id="why" className="w-full bg-[var(--bg)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHeading title="Why Orvilyn" align="left" />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {points.map((point, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="flex flex-col items-start h-full">
                {/* 32px x 4px rounded bar */}
                <div
                  className="w-8 h-1 rounded-full bg-[var(--orange)] mb-6 shrink-0"
                  aria-hidden="true"
                />
                <h3 className="text-xl md:text-2xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  {point.title}
                </h3>
                <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
                  {point.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
