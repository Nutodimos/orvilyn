"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import { marquee, type MarqueeTestimonial } from "@/data/testimonials";

function MarqueeCard({ item }: { item: MarqueeTestimonial }) {
  return (
    <div className="inline-flex items-center bg-[var(--bg)] border border-[var(--line)] rounded-full px-5 py-3 mr-4 whitespace-nowrap text-sm md:text-base shrink-0 select-none shadow-sm">
      <span className="text-[var(--ink)] font-medium">&ldquo;{item.quote}&rdquo;</span>
      <span className="text-[var(--muted)] ml-2">
        · {item.name}, {item.role}
      </span>
      {item.isPlaceholder && (
        <span className="ml-3 px-2 py-0.5 text-[0.75rem] font-medium text-[var(--muted)] border border-[var(--line)] rounded-full bg-[var(--surface)]">
          Placeholder
        </span>
      )}
    </div>
  );
}

export function TestimonialMarquee() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-5 flex flex-wrap justify-center gap-4">
        {marquee.map((item, idx) => (
          <MarqueeCard key={idx} item={item} />
        ))}
      </div>
    );
  }

  const maskStyles: React.CSSProperties = {
    maskImage:
      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  };

  return (
    <div
      className="w-full overflow-hidden py-2"
      style={maskStyles}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {/* First set of 6 items */}
        <div className="flex shrink-0">
          {marquee.map((item, idx) => (
            <MarqueeCard key={`set1-${idx}`} item={item} />
          ))}
        </div>

        {/* Second set of 6 items (duplicate for seamless loop) */}
        <div className="flex shrink-0" aria-hidden="true">
          {marquee.map((item, idx) => (
            <MarqueeCard key={`set2-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
