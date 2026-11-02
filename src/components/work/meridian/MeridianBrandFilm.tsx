import React from "react";
import { MeridianVideoPlayer } from "./MeridianVideoPlayer";

export function MeridianBrandFilm() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-8">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            02 · Hero spot
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            The full sequence.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            The complete 30-second hero narrative spot. Erratic cashflow tension builds across
            obsidian glass before the golden Meridian horizon levels the frame, sweeps tax reserves,
            and lands on an assured $4,280 safe-to-spend balance.
          </p>
        </div>

        {/* Full-width 16:9 master narrative film */}
        <div className="w-full mb-8">
          <MeridianVideoPlayer
            id="hero-spot"
            src="/work/meridian/hero-spot.mp4"
            poster="/work/meridian/posters/hero-spot.webp"
            aspectRatio="16/9"
            isLoop={false}
            signatureCueTime={10.8}
            cueLabel="horizon chime at 10.8s"
            preload="none"
            ariaLabel="Meridian hero spot: erratic cash flow line levels into a tranquil golden horizon, taxes auto-stash with coin sounds, invoices flip to paid, and safe-to-spend balance resolves."
            caption="Hero narrative film · 30.0 s · constant 30 fps · held final frame"
            transcript="A top-down obsidian frame displays an irregular, jagged income line with sharp peaks and steep plunges, representing the erratic financial swings of freelancing. As freelance tension builds with chaotic notification pills, Meridian activates: the erratic line dips with anticipation before smoothly leveling out into a tranquil golden horizon line accompanied by a resonant chime. An incoming payment card slides in and automatically splits off a 25% tax set-aside with bouncing gold coins into a protected jar. Client invoice cards smoothly flip to paid with electric mint checkmarks. A hero card counts up to a calm $4,280 safe-to-spend balance amidst a warm pulsing halo. Golden sunlight washes across the frame, resting on the laser-precise Meridian wordmark, early access badge, and the tagline 'Steady money for unsteady months.'"
          />
        </div>

        {/* Key Audio Synchronization Moments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
            <span className="block font-mono text-xs text-[#F59E0B] font-bold mb-1">
              10.8 s · Leveling Horizon
            </span>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Warm resonant chime sounds as erratic tension lines flatten into calm gold.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
            <span className="block font-mono text-xs text-[#F59E0B] font-bold mb-1">
              15.0 s · Tax Jar Auto-Stash
            </span>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Tactile coins cascade into the protected reserve as 25% is automatically allocated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
            <span className="block font-mono text-xs text-[#00E599] font-bold mb-1">
              18.5 s · Invoice Reversals
            </span>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Triple melodic dings confirm client payments flipping to verified checkmarks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
            <span className="block font-mono text-xs text-[#06B6D4] font-bold mb-1">
              28.2 s · Brand Settle
            </span>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Signature brand chime rings out over the held wordmark and early access badge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
