import React from "react";
import { FernhillVideoPlayer } from "./FernhillVideoPlayer";

export function FernhillBrandFilm() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-8">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            02 · Brand film & narrative reel
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            The full ritual.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            The 24-second flagship film. A turntable platter settles on the table, the
            vinyl record slides out of its sleeve to the spindle, and the stylus drops into
            the groove with a deep signature thump and oxblood flash at 8.5 seconds.
          </p>
        </div>

        {/* Full-width 16:9 master film frame */}
        <div className="w-full">
          <FernhillVideoPlayer
            id="label-reel"
            src="/work/fernhill-records/label-reel.mp4"
            poster="/work/fernhill-records/posters/label-reel.webp"
            aspectRatio="16/9"
            isLoop={false}
            needleDropTime={8.5}
            preload="none"
            ariaLabel="Fernhill Records brand film: a 24-second tactile turntable ritual with paper textures, vinyl disc spin-up, needle drop at 8.5s, botanical fern strips, and final wordmark lockup."
            caption="Hero film · 24.0 s · needle drop thump & oxblood flash at 8.5 s"
            transcript="A tactile cream paper tabletop appears under warm lighting. A turntable platter rises and settles. An album sleeve slides in, and a black vinyl LP slides out to drop gently onto the spindle and accelerate to 33 ⅓ RPM. A tonearm lifts, hovers, and lands on the record, triggering a warm oxblood flash. The scene awakens with botanical torn fern strips, an orange paper sun with coarse halftone shading, and cut fern fronds swaying in rhythm. The artist and catalogue numbers are stamped in typewriter mono before clearing the table for the chunky serif Fernhill Records wordmark, an oxblood accent line, and the tagline 'Turn it over.' The record smoothly decelerates to rest."
          />
        </div>
      </div>
    </section>
  );
}
