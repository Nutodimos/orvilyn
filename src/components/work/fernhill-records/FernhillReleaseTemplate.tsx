import React from "react";
import { FernhillVideoPlayer } from "./FernhillVideoPlayer";

export function FernhillReleaseTemplate() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-8">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            03 · Release announcement template
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Stamped for physical release.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            A modular 10-second release template for social and retail announcements.
            The LP sleeve slides into view, the disc emerges, and typewriter tracklists
            stamp onto torn cream cards with tactile mechanical foley.
          </p>
        </div>

        {/* Grid: Video Player + Catalogue Card Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <FernhillVideoPlayer
              id="album-announcement"
              src="/work/fernhill-records/album-announcement.mp4"
              poster="/work/fernhill-records/posters/album-announcement.webp"
              aspectRatio="16/9"
              isLoop={false}
              needleDropTime={1.0}
              preload="none"
              ariaLabel="Fernhill Records album announcement: LP sleeve slides in, disc emerges, and typewriter copy stamps THE HIGH WATER MARKS, Morning on the Sound, tracklist, and catalogue details."
              caption="Release template · 10.0 s · sleeve slide at 1.0 s · card slap at 3.67 s"
              transcript="An album sleeve slides in, presenting release artwork. A black vinyl disc spins outward as stamped typewriter text displays the artist name 'THE HIGH WATER MARKS', album title 'MORNING ON THE SOUND', full tracklist, and release date against a torn cream paper card."
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-[#FBF6E8] border border-[#DCCFB0] text-[#1A1714]">
              <span className="text-xs uppercase font-mono tracking-wider text-[#6E1F24] font-bold block mb-1">
                Catalogue Stamp · FHL-042
              </span>
              <h3 className="text-xl font-bold font-serif mb-0.5">
                The High Water Marks
              </h3>
              <p className="text-xs font-mono text-[#5F7B57] font-semibold mb-3">
                Morning on the Sound · 33 ⅓ RPM
              </p>

              <div className="pt-3 border-t border-[#DCCFB0]/60 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#1A1714]/80">
                  <span>01</span>
                  <span>The Low Water Mark</span>
                </div>
                <div className="flex justify-between text-[#1A1714]/80">
                  <span>02</span>
                  <span>Cold Harbour Light</span>
                </div>
                <div className="flex justify-between text-[#1A1714]/80">
                  <span>03</span>
                  <span>Three Sheets to the Wind</span>
                </div>
                <div className="flex justify-between text-[#1A1714]/80 font-bold text-[#6E1F24]">
                  <span>04</span>
                  <span>Turn It Over</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCCFB0]/60 flex items-center justify-between text-[11px] font-mono text-[#1A1714]/70">
                <span>Release</span>
                <span>October 24, 2026</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--muted)] leading-relaxed">
              <span className="font-semibold text-[var(--ink)] block mb-1">
                Modular Release Rules
              </span>
              Typography sizes and tracklist cards auto-align to accommodate 4 to 12
              tracks without visual crowding. The disc spin speed remains mathematically
              constant across release teasers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
