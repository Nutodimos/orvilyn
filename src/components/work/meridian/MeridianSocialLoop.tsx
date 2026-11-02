import React from "react";
import { MeridianVideoPlayer } from "./MeridianVideoPlayer";
import { Smartphone, CheckCircle } from "lucide-react";

export function MeridianSocialLoop() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Context & Safe Zone Standards */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
              04 · Vertical mobile loop
            </span>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-4">
              Designed natively for the phone.
            </h2>
            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-6">
              A 9:16 vertical mobile presentation engineered for social feeds and handheld kiosks.
              Framed inside a sleek obsidian iPhone silhouette with burned-in electric mint subtitles.
            </p>

            {/* Safe zone specs from MERIDIAN.md */}
            <div className="space-y-3 p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
              <div className="flex items-center gap-2.5 text-xs font-mono text-[var(--ink)]">
                <Smartphone size={16} className="text-[#F59E0B]" />
                <span className="font-semibold uppercase tracking-wider">
                  Mobile Safe Zone Standards
                </span>
              </div>
              <ul className="space-y-2 text-xs md:text-sm text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-[#00E599] shrink-0 mt-0.5" />
                  <span>
                    <strong>Top 250 px clear:</strong> leaves system status bars and native app headers clean.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-[#00E599] shrink-0 mt-0.5" />
                  <span>
                    <strong>Bottom 350 px clear:</strong> protects burned-in captions (at y=1630 px) from feed engagement overlays.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-[#00E599] shrink-0 mt-0.5" />
                  <span>
                    <strong>Periodic seamless loop:</strong> 15.0 s (450 frames) cycles without jarring jump-cuts.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: 9:16 Video Player */}
          <div className="lg:col-span-6 flex justify-center">
            <MeridianVideoPlayer
              id="social-loop-916"
              src="/work/meridian/social-loop-916.mp4"
              poster="/work/meridian/posters/social-loop-916.webp"
              aspectRatio="9/16"
              isLoop={true}
              preload="none"
              ariaLabel="Meridian vertical 9:16 mobile presentation within an iPhone silhouette with burned-in subtitles, looping through the leveling graph and invoice tracker."
              caption="Vertical 9:16 feed format · 15.0 s loop · 2.29 MB"
              transcript="Vertical 9:16 mobile presentation framed within an iPhone silhouette. Features burned-in mint subtitles positioned safely above the bottom navigation margin. Loops seamlessly through the leveling graph, tax jar allocation, and invoice tracker."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
