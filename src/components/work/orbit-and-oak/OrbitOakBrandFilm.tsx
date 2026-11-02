"use client";

import React from "react";
import { OrbitOakVideoPlayer } from "./OrbitOakVideoPlayer";

export function OrbitOakBrandFilm() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-10">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            02 · Hero Brand Spot (30s)
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            The treehouse launch.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            A 30-second unboxing and launch spot timed to 120 bpm in G major. From a shuddering
            wooden box to an arc flight through paper-cut stars, every cut, click, and bounce lands
            on a musical beat.
          </p>
        </div>

        {/* Video Player */}
        <OrbitOakVideoPlayer
          id="orbit-oak-brand-film"
          src="/work/orbit-and-oak/orbit-oak-brand-spot.mp4"
          poster="/work/orbit-and-oak/posters/orbit-oak-brand-spot.webp"
          aspectRatio="16/9"
          isLoop={false}
          signatureCueTime={22.0}
          cueLabel="Launch chime at 22s"
          caption="Brand Spot (30s) — Ukulele, marimba, Nutmeg pantomime & rocket lift-off"
          ariaLabel="Orbit and Oak 30-second brand and unboxing film"
          transcript="Dusk falls on a treehouse deck. A closed subscription box rattles before the lid pops off, revealing Nutmeg waving happily. Real wooden rocket pieces fly onto the deck and click together one by one. The child holds the finished model in pride, before placing it on the launchpad. After a silent tension hold, the rocket roars into the twilight sky in a shower of marigold sparks, landing on the end-card lockup."
          preload="none"
        />

        {/* Story beats table */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
            <span className="font-mono text-xs text-[#C89B65] font-bold block mb-1">
              01 · 00s – 06s
            </span>
            <h4 className="font-semibold text-sm text-[var(--ink)] mb-1">
              The Box Shudder
            </h4>
            <p className="text-xs text-[var(--muted)]">
              Cardboard rattle and lid pop. Nutmeg tumbles out with playful squash and stretch.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
            <span className="font-mono text-xs text-[#C89B65] font-bold block mb-1">
              02 · 06s – 18s
            </span>
            <h4 className="font-semibold text-sm text-[var(--ink)] mb-1">
              Tactile Assembly
            </h4>
            <p className="text-xs text-[var(--muted)]">
              Four wooden clicks: nozzle, fins, body, nose. Each click steps one musical note higher.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
            <span className="font-mono text-xs text-[#C89B65] font-bold block mb-1">
              03 · 18s – 22s
            </span>
            <h4 className="font-semibold text-sm text-[var(--ink)] mb-1">
              The Proud Beat
            </h4>
            <p className="text-xs text-[var(--muted)]">
              A serene, screen-free moment of pride, followed by a stillness hold on the launchpad.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
            <span className="font-mono text-xs text-[#C89B65] font-bold block mb-1">
              04 · 22s – 30s
            </span>
            <h4 className="font-semibold text-sm text-[var(--ink)] mb-1">
              Spark Lift-Off
            </h4>
            <p className="text-xs text-[var(--muted)]">
              Rising strings culminate in the signature three-note chime as the rocket trails marigold stars.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
