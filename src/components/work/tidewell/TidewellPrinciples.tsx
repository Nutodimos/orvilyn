import React from "react";
import { TidewellVideoPlayer } from "./TidewellVideoPlayer";

interface PrincipleItem {
  id: string;
  num: string;
  title: string;
  rule: string;
  videoSrc: string;
  posterSrc: string;
  fizzTime?: number;
  caption: string;
  ariaLabel: string;
  transcript: string;
}

const principles: PrincipleItem[] = [
  {
    id: "principle-1",
    num: "01",
    title: "Moves like water.",
    rule: "Fast first, then a long settle. The only linear move in the system is the comparison that exposes it.",
    videoSrc: "/work/tidewell/video/principle-1.mp4",
    posterSrc: "/work/tidewell/posters/principle-1.webp",
    caption: "Principle 1 · 3.5 s · waterOut vs linear",
    ariaLabel: "Principle 1 demonstration comparing natural waterOut curve above against a linear drop below.",
    transcript: "A split demonstration. The top ball uses the custom waterOut easing, accelerating quickly then taking a long physical settle. The lower ball moves at an unnatural, rigid linear pace for contrast.",
  },
  {
    id: "principle-2",
    num: "02",
    title: "Rise and release.",
    rule: "Everything starts below the mark, overshoots by a hair, and releases. Related elements stagger; they never march.",
    videoSrc: "/work/tidewell/video/principle-2.mp4",
    posterSrc: "/work/tidewell/posters/principle-2.webp",
    caption: "Principle 2 · 3.5 s · staggered risers",
    ariaLabel: "Principle 2 demonstration: five staggered risers overshooting slightly and settling with calm rings.",
    transcript: "Five staggered vertical risers surge upwards, each overshooting its baseline by a tiny fraction before settling into position and generating soft settle rings.",
  },
  {
    id: "principle-3",
    num: "03",
    title: "Surface tension.",
    rule: "Two bodies prefer one. They stretch, neck, merge, and only then settle. Parting is a thinning bridge, not a fade.",
    videoSrc: "/work/tidewell/video/principle-3.mp4",
    posterSrc: "/work/tidewell/posters/principle-3.webp",
    caption: "Principle 3 · 3.5 s · droplet merging",
    ariaLabel: "Principle 3 demonstration: two fluid droplets approach, stretch, neck, and merge together.",
    transcript: "Two droplets approach each other horizontally, neck together forming a liquid meniscus, snap into a single merged volume, and gently relax into equilibrium.",
  },
  {
    id: "principle-4",
    num: "04",
    title: "Calm punctuation.",
    rule: "One fizz. One citrus flash. Then stillness. The pause is the point.",
    videoSrc: "/work/tidewell/video/principle-4.mp4",
    posterSrc: "/work/tidewell/posters/principle-4.webp",
    fizzTime: 2.0,
    caption: "Principle 4 · 3.5 s · fizz at 2.0 s",
    ariaLabel: "Principle 4 demonstration: one droplet rises, triggers a crisp fizz flash, followed by deliberate stillness.",
    transcript: "A single droplet rises from below. At 2.0 s, a brief burst of citrus bubbles radiates outward with a crisp audio fizz, immediately resolving into total stillness.",
  },
];

export function TidewellPrinciples() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#1F5F5B] text-[#F4F7F5] tidewell-scope">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="block text-xs uppercase font-mono tracking-widest text-[#F4F7F5]/70 mb-3">
            03 · Motion rules
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[#F4F7F5] leading-snug tracking-tight mb-3">
            Four rules.
          </h2>
          <p className="text-[#F4F7F5]/80 text-base md:text-lg leading-relaxed">
            The behavioural physics that govern every transition, wipe, and bubble in the identity.
          </p>
        </div>

        {/* 2x2 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {principles.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-2xl bg-[#123B38]/50 p-5 md:p-6 border border-[#F4F7F5]/10"
            >
              {/* Card Video Player */}
              <TidewellVideoPlayer
                id={p.id}
                src={p.videoSrc}
                poster={p.posterSrc}
                aspectRatio="16/9"
                isLoop={false}
                fizzTime={p.fizzTime}
                preload="none"
                ariaLabel={p.ariaLabel}
                caption={p.caption}
                transcript={p.transcript}
                className="mb-5"
              />

              {/* Principle Info */}
              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="text-xs font-mono font-bold text-[#F4F7F5]/50">{p.num}</span>
                <h3 className="text-lg md:text-xl font-bold text-[#F4F7F5] tracking-tight">
                  {p.title}
                </h3>
              </div>

              <p className="text-sm md:text-base text-[#F4F7F5]/80 leading-relaxed font-sans">
                {p.rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
