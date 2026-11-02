"use client";

import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { marquee, type MarqueeTestimonial } from "@/data/testimonials";

function MarqueeCard({ item }: { item: MarqueeTestimonial }) {
  return (
    <div className="inline-flex items-center bg-[var(--bg)] border border-[var(--line)] rounded-full px-5 py-3 mr-4 whitespace-nowrap text-sm md:text-base shrink-0 select-none shadow-sm">
      <span className="text-[var(--ink)] font-medium">&ldquo;{item.quote}&rdquo;</span>
      <span className="text-[var(--muted)] ml-2">
        · {item.name}, {item.role}
      </span>
    </div>
  );
}

export function TestimonialMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const [isTouchPaused, setIsTouchPaused] = useState(false);

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
      onTouchStart={() => setIsTouchPaused(true)}
      onTouchEnd={() => setIsTouchPaused(false)}
      onTouchCancel={() => setIsTouchPaused(false)}
    >
      <div
        className="flex w-max animate-marquee [@media(hover:hover)_and_(pointer:fine)]:hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        style={{ animationPlayState: isTouchPaused ? "paused" : undefined }}
      >
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
