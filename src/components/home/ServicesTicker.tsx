"use client";

import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";

const items = [
  "Websites",
  "Web apps",
  "Internal tools",
  "Mobile apps",
  "Motion design",
];

export function ServicesTicker() {
  const shouldReduceMotion = useReducedMotion();
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  if (shouldReduceMotion) {
    return (
      <div className="w-full bg-[var(--ink)] text-[var(--bg)] min-h-[64px] flex items-center justify-center py-2 px-5">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {items.map((item, idx) => (
            <React.Fragment key={item}>
              <span className="font-[var(--font-display)] font-bold text-[1.125rem] whitespace-nowrap">
                {item}
              </span>
              {idx < items.length - 1 && (
                <span
                  className="w-2 h-2 rounded-full bg-[var(--orange)] shrink-0"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-[var(--ink)] text-[var(--bg)] h-16 flex items-center overflow-hidden select-none"
      onTouchStart={() => setIsTouchPaused(true)}
      onTouchEnd={() => setIsTouchPaused(false)}
      onTouchCancel={() => setIsTouchPaused(false)}
    >
      <div
        className="flex w-max animate-ticker [@media(hover:hover)_and_(pointer:fine)]:hover:[animation-play-state:paused]"
        style={{ animationPlayState: isTouchPaused ? "paused" : undefined }}
      >
        {/* First set of 5 items */}
        <div className="flex shrink-0 items-center gap-6 pr-6">
          {items.map((item) => (
            <React.Fragment key={item}>
              <span className="font-[var(--font-display)] font-bold text-[1.125rem] whitespace-nowrap">
                {item}
              </span>
              <span
                className="w-2 h-2 rounded-full bg-[var(--orange)] shrink-0"
                aria-hidden="true"
              />
            </React.Fragment>
          ))}
        </div>

        {/* Second set of 5 items (duplicate for seamless loop) */}
        <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
          {items.map((item, idx) => (
            <React.Fragment key={`dup-${idx}`}>
              <span className="font-[var(--font-display)] font-bold text-[1.125rem] whitespace-nowrap">
                {item}
              </span>
              <span
                className="w-2 h-2 rounded-full bg-[var(--orange)] shrink-0"
                aria-hidden="true"
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
