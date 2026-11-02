import React from "react";
import { FernhillVideoPlayer } from "./FernhillVideoPlayer";

export function FernhillSocialLoops() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-10">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            04 · Ambient & social loops
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Feeds, stories & venue kiosks.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-2">
            Two seamless 6-second periodic loops. The mathematical cycling wraps cleanly
            without a noticeable reset cut, creating continuous atmospheric motion.
          </p>
          <p className="text-xs font-mono text-[var(--muted)]">
            Strict safe area compliance: top 250 px and bottom 350 px kept clear of critical typography.
          </p>
        </div>

        {/* 2-Column Responsive Layout: 9:16 Vertical Loop + 16:9 Ambient Visualiser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 9:16 Vertical Poster Loop */}
          <div className="lg:col-span-5 flex flex-col">
            <FernhillVideoPlayer
              id="gig-poster-loop"
              src="/work/fernhill-records/gig-poster-loop.mp4"
              poster="/work/fernhill-records/posters/gig-poster-loop.webp"
              aspectRatio="9/16"
              isLoop={true}
              preload="none"
              ariaLabel="Fernhill Records vertical 9:16 gig poster loop: Friday Vinyl Sessions, wobbling halftone sun, botanical ferns, and spinning vinyl disc."
              caption="Vertical loop · 9:16 · 6.0 s · silent"
              transcript="A 9:16 vertical poster on warm cream paper featuring a wobbling halftone sun, botanical fern fronds swaying in rhythm, and a spinning record disc announcing 'FERNHILL LISTENING BAR · FRIDAY VINYL SESSIONS · SLOW MUSIC, GOOD COMPANY.'"
              className="mb-4"
            />
            <div className="px-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-semibold text-[#5F7B57]">
                  9:16 Vertical
                </span>
                <span className="text-sm font-bold text-[var(--ink)]">
                  Friday Vinyl Sessions Kiosk
                </span>
              </div>
              <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                Authored for vertical social stories and physical portrait display totems at
                the Edinburgh listening bar entrance.
              </p>
            </div>
          </div>

          {/* 16:9 Ambient Listening Visualiser */}
          <div className="lg:col-span-7 flex flex-col">
            <FernhillVideoPlayer
              id="visualiser-social"
              src="/work/fernhill-records/visualiser-social.mp4"
              poster="/work/fernhill-records/posters/visualiser-social.webp"
              aspectRatio="16/9"
              isLoop={true}
              needleDropTime={0.0}
              preload="none"
              ariaLabel="Fernhill Records 16:9 listening visualiser: spinning record with micro tonearm drift, orange halftone sun, and framing botanical leaves."
              caption="Listening visualiser · 16:9 · 6.0 s · surface hiss loop"
              transcript="A close-up turntable listening scene featuring a spinning vinyl record, a tonearm resting in the groove with subtle audio-reactive drift, an orange halftone sun, and botanical leaves framing the shot."
              className="mb-4"
            />
            <div className="px-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-semibold text-[#C2602B]">
                  16:9 Ambient
                </span>
                <span className="text-sm font-bold text-[var(--ink)]">
                  Audio-Reactive Turntable Scene
                </span>
              </div>
              <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                Subtle micro-drift on the tonearm tracking against a seamless vinyl surface hiss bed.
                Designed for stream backdrops, digital album previews, and website banners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
