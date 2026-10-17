"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export interface MoveBandProps {
  videoSrc?: string;
}

export function MoveBand({ videoSrc = "" }: MoveBandProps) {
  const shouldReduceMotion = useReducedMotion();
  const moveService = services.find((s) => s.group === "move");

  return (
    <section className="w-full bg-[var(--ink)] text-[var(--bg)] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <Reveal>
            <div className="flex flex-col items-start">
              <span className="text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[var(--bg)]/60 block mb-4">
                Move
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--bg)] mb-4">
                {moveService?.title ?? "Motion that makes people stop scrolling."}
              </h2>
              <p className="text-[var(--bg)]/80 text-base md:text-lg leading-relaxed mb-4 max-w-xl">
                {moveService?.description ??
                  "Logo animations, promo clips, and explainers."}
              </p>
              <span className="text-[0.8rem] text-[var(--bg)]/60 uppercase tracking-[0.06em] font-semibold block mb-8">
                {moveService?.tech ?? "Motion design"}
              </span>
              <Button href="/work" variant="primary">
                See motion work
              </Button>
            </div>
          </Reveal>

          {/* Right Column: Media Slot */}
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-[var(--bg)]/[0.08] flex items-center justify-center">
              {videoSrc ? (
                <video
                  src={videoSrc}
                  autoPlay={!shouldReduceMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                  {/* Shape 1: Circle (var(--orange)) */}
                  <div
                    className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full bg-[var(--orange)] opacity-90 animate-shape-1"
                    style={{ left: "15%", top: "18%" }}
                    aria-hidden="true"
                  />
                  {/* Shape 2: Rounded Square (var(--butter)) */}
                  <div
                    className="absolute w-28 h-28 md:w-36 md:h-36 rounded-[24px] bg-[var(--butter)] opacity-90 animate-shape-2"
                    style={{ right: "16%", bottom: "16%" }}
                    aria-hidden="true"
                  />
                  {/* Shape 3: Pill (var(--bg)) */}
                  <div
                    className="absolute w-36 h-18 md:w-48 md:h-24 rounded-full bg-[var(--bg)] opacity-85 animate-shape-3"
                    style={{ left: "34%", top: "38%" }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
