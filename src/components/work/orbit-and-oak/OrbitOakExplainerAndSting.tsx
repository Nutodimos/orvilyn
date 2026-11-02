"use client";

import React from "react";
import { OrbitOakVideoPlayer } from "./OrbitOakVideoPlayer";

export function OrbitOakExplainerAndSting() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            03 · Educational Storytelling &amp; Character Design
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Step-by-step experiment storytelling.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            The 50-second educational explainer shows how instructions can feel as playful as a cartoon
            without compromising scientific clarity. Alongside, the character turnaround showcases Nutmeg’s
            weight, expressions, and squash-and-stretch rig.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 50s Seed Explainer */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <OrbitOakVideoPlayer
              id="orbit-oak-seed-explainer"
              src="/work/orbit-and-oak/orbit-oak-seed-explainer.mp4"
              poster="/work/orbit-and-oak/posters/orbit-oak-seed-explainer.webp"
              aspectRatio="16/9"
              isLoop={false}
              signatureCueTime={32.0}
              cueLabel="Sprout chime at 32s"
              caption="Seed Explainer (50s) — Grow a seed under a moon lamp"
              ariaLabel="Orbit and Oak 50-second animated seed explainer film"
              transcript="An educational step-by-step guide narrated by a warm adult voice: pot, seed, and moon lamp are introduced. The seed is planted and watered. A timelapse through a round portal window cycles through day and night while Nutmeg yawns. At 32s, the sprout bursts through the soil with a marigold spark. The moon lamp illuminates the sprout as it reaches for the warm light."
              preload="none"
            />
            <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--bg)]">
              <h4 className="font-semibold text-sm text-[var(--ink)] mb-1">
                Visualizing Patience
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Rather than jumping abruptly to the result, the explainer cycles day and night outside
                a round observatory window while Nutmeg yawns—teaching children the natural rhythm of plant growth.
              </p>
            </div>
          </div>

          {/* Mascot Turnaround Sheet */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <OrbitOakVideoPlayer
              id="orbit-oak-mascot-sheet"
              src="/work/orbit-and-oak/orbit-oak-mascot-sheet.mp4"
              poster="/work/orbit-and-oak/posters/orbit-oak-mascot-sheet.webp"
              aspectRatio="16/9"
              isLoop={true}
              caption="Nutmeg Mascot Rig — Turnaround, physics & expressions"
              ariaLabel="Nutmeg character expressions and turnaround showcase"
              transcript="Nutmeg character sheet showing turnaround views, acorn helmet follow-through, and expressive eye reactions ranging from curiosity to joyful triumph."
              preload="none"
            />
            <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--bg)]">
              <h4 className="font-semibold text-sm text-[var(--ink)] mb-1">
                Nutmeg’s Design Logic
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Nutmeg’s eyes carry 100% of the emotion. The wooden acorn cap acts as an astronaut helmet
                with a 4-to-6 frame secondary delay on head tilts to communicate physical momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
