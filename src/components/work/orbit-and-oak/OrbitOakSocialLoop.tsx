"use client";

import React from "react";
import { OrbitOakVideoPlayer } from "./OrbitOakVideoPlayer";

export function OrbitOakSocialLoop() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Descriptive info */}
          <div className="lg:col-span-6">
            <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
              04 · Mobile &amp; Vertical Presence
            </span>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-4">
              Authored for the vertical feed.
            </h2>
            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-6">
              Rather than cropping 16:9 widescreen footage into an awkward centre cut, the 9:16 vertical
              loop was natively animated from scratch. Key typography and Nutmeg’s actions are strictly
              contained outside the upper 250px and lower 350px mobile interface zones.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
                <span className="font-mono text-xs text-[#C89B65] font-bold block mb-1">
                  Feed Safe Zones
                </span>
                <p className="text-xs text-[var(--muted)]">
                  Designed so platform UI—status bars, account headers, like buttons, and caption
                  drawers—never overlaps crucial illustrative elements.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
                <span className="font-mono text-xs text-[#C89B65] font-bold block mb-1">
                  Infinite Loop Mechanics
                </span>
                <p className="text-xs text-[var(--muted)]">
                  The rocket’s starry arc exits the top frame precisely as the next launchpad sequence
                  settles, yielding a seamless, hypnosis-free discovery cycle.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 9:16 Mobile Chassis Video Player */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[320px] p-3 rounded-[2.5rem] bg-[#0F1123] border-4 border-[#2A2F6B]/50 shadow-2xl">
              <OrbitOakVideoPlayer
                id="orbit-oak-social-loop"
                src="/work/orbit-and-oak/orbit-oak-social-loop-916.mp4"
                poster="/work/orbit-and-oak/posters/orbit-oak-social-loop-916.webp"
                aspectRatio="9/16"
                isLoop={true}
                caption="Vertical Feed Loop (9:16) — Seamless infinite motion"
                ariaLabel="Orbit and Oak 9:16 vertical social loop animation"
                transcript="Vertical mobile loop showing Nutmeg and the rocket launching through paper-cut stars, engineered to loop seamlessly on social feeds."
                preload="none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
