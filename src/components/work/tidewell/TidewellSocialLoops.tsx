import React from "react";
import { TidewellVideoPlayer } from "./TidewellVideoPlayer";

interface SocialLoop {
  id: string;
  num: string;
  name: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  ariaLabel: string;
  transcript: string;
}

const loops: SocialLoop[] = [
  {
    id: "loop-a",
    num: "01",
    name: "Rising",
    description: "Rising tide with procedural water bubbles, authored without key type for pure atmospheric presence.",
    videoSrc: "/work/tidewell/video/loop-a.mp4",
    posterSrc: "/work/tidewell/posters/loop-a.webp",
    ariaLabel: "Feed loop 01: Rising tide with upward moving water bubbles.",
    transcript: "A vertical 9:16 animation showing continuous rising water layers with upward floating mineral bubbles, wrapping seamlessly every 6 seconds.",
  },
  {
    id: "loop-b",
    num: "02",
    name: "Flavours",
    description: "Seamless colour transitions across Plain Sparkling, Sea Salt & Lime, and Sunlit Yuzu.",
    videoSrc: "/work/tidewell/video/loop-b.mp4",
    posterSrc: "/work/tidewell/posters/loop-b.webp",
    ariaLabel: "Feed loop 02: Flavour sequence through Plain Sparkling, Sea Salt & Lime, and Yuzu.",
    transcript: "Vertical waves transition fluidly through three brand colours, displaying typography for Plain Sparkling, Sea Salt & Lime, and Yuzu within the 9:16 safe area.",
  },
  {
    id: "loop-c",
    num: "03",
    name: "Wave",
    description: "Layered periodic wave physics calibrated for continuous ambient feed display.",
    videoSrc: "/work/tidewell/video/loop-c.mp4",
    posterSrc: "/work/tidewell/posters/loop-c.webp",
    ariaLabel: "Feed loop 03: Layered waves oscillating in seamless 6-second cycles.",
    transcript: "Layered water waves rise and crest smoothly against a clean background, looping seamlessly with micro-bubbles surfacing along the wave crests.",
  },
];

export function TidewellSocialLoops() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-10">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            05 · Social loops
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Made for the feed.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-2">
            Three six-second loops, authored at 1080×1920. They are periodic at 6 seconds, so the
            wrap reads as continuous water rather than a reset.
          </p>
          <p className="text-xs font-mono text-[var(--muted)]">
            Safe area strictly preserved: zero key typography in the top 250 px or bottom 350 px.
          </p>
        </div>

        {/* Responsive Layout: Snap Rail on Mobile, 3-column Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth -mx-5 px-5 md:mx-0 md:px-0">
          {loops.map((loop) => (
            <div
              key={loop.id}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex flex-col"
            >
              <TidewellVideoPlayer
                id={loop.id}
                src={loop.videoSrc}
                poster={loop.posterSrc}
                aspectRatio="9/16"
                isLoop={true}
                preload="none"
                ariaLabel={loop.ariaLabel}
                caption={`Loop ${loop.num} · ${loop.name}`}
                transcript={loop.transcript}
                className="mb-4"
              />

              <div className="px-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-semibold text-[var(--muted)]">
                    Loop {loop.num}
                  </span>
                  <span className="text-sm font-bold text-[var(--ink)]">
                    {loop.name}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                  {loop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
