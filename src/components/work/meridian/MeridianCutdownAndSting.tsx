import React from "react";
import { MeridianVideoPlayer } from "./MeridianVideoPlayer";

export function MeridianCutdownAndSting() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-10">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            03 · Cutdown & Sonic Logo
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Speed & sonic resonance.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            Derived deliverables built for tight media placements: a rapid 15-second cutdown
            for paid acquisition, paired with a pristine 5-second sonic logo sting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Pre-roll Cutdown (15s) */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
              15s Pre-Roll Cutdown
            </h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Fast-paced overview designed for paid pre-roll and quick feeds. Settle chime at 3.6s,
              coins at 5.2s, invoice dings at 7.6s.
            </p>
            <MeridianVideoPlayer
              id="cutdown-15s"
              src="/work/meridian/cutdown-15s.mp4"
              poster="/work/meridian/posters/cutdown-15s.webp"
              aspectRatio="16/9"
              isLoop={false}
              signatureCueTime={3.6}
              cueLabel="settle chime at 3.6s"
              preload="none"
              ariaLabel="Meridian 15-second cutdown video showing quick transformation from erratic cash flow to financial calm."
              caption="15.0 s cutdown · 3.50 MB · holds last frame"
              transcript="A fast-paced 15-second cutdown highlighting the journey from erratic cash flow to financial calm. Chaos chips pop and clear as the jagged line snaps into the golden Meridian horizon with a chime. The interface rapidly previews automatic tax savings, invoice tracking, and safe-to-spend balance calculations before concluding on the held Meridian brand card."
            />
          </div>

          {/* Sonic Logo Sting (5s) */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
              5s Sonic Logo Sting
            </h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Minimal sonic open. A delicate golden horizon expands with a pulsing pip,
              leading into specular gleam across the wordmark.
            </p>
            <MeridianVideoPlayer
              id="logo-sting"
              src="/work/meridian/logo-sting.mp4"
              poster="/work/meridian/posters/logo-sting.webp"
              aspectRatio="16/9"
              isLoop={false}
              signatureCueTime={1.0}
              cueLabel="signature chime at 1.0s"
              preload="none"
              ariaLabel="Meridian 5-second sonic logo sting: pulsing pip on golden horizon expands into the specular shimmer sweep of the wordmark."
              caption="5.0 s sonic sting · 1.02 MB · holds last frame"
              transcript="A minimal, elegant sonic logo open. A delicate golden horizon expands from center with a pulsing pip, leading into the specular shimmer sweep across the Meridian wordmark and signature brand chime."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
