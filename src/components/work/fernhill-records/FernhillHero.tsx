"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, PauseCircle, PlayCircle } from "lucide-react";
import { FernhillVideoPlayer } from "./FernhillVideoPlayer";
import { useFernhillMotion } from "./motionContext";

export function FernhillHero() {
  const { isMotionPaused, toggleMotionPause } = useFernhillMotion();

  return (
    <section className="w-full pt-10 pb-12 md:pt-16 md:pb-20 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Navigation & Motion Pause Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--ink)] hover:text-[#C2602B] active:scale-[0.97] transition-[transform,color] duration-160 ease-out"
          >
            <ArrowLeft size={16} />
            <span>All work</span>
          </Link>

          {/* Accessible Motion Pause Toggle */}
          <button
            type="button"
            onClick={toggleMotionPause}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[#FBF6E8] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer"
            aria-pressed={isMotionPaused}
          >
            {isMotionPaused ? (
              <>
                <PlayCircle size={15} className="text-[#C2602B]" />
                <span>Resume motion</span>
              </>
            ) : (
              <>
                <PauseCircle size={15} className="text-[var(--muted)]" />
                <span>Pause motion</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Meta */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Non-negotiable fictional brand label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-xs text-[var(--ink)] text-[0.75rem] font-semibold select-none w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6E1F24]" />
              <span>Self-initiated / fictional brand</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-bold text-[var(--ink)] leading-none tracking-tight mb-4">
              Fernhill Records
            </h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold text-[var(--ink)] leading-snug mb-4">
              Tactile motion identity & vinyl packaging for an analogue listening bar.
            </p>

            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-6">
              Fernhill Records is an independent vinyl record label and warm listening
              space in Edinburgh. The motion identity is anchored in analogue rituals:
              felt platters rising, paper sleeves sliding, needle drops, and tactile
              letterpress stamps. Zero digital synthetic whooshes.
            </p>

            {/* Meta Row */}
            <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-mono text-[var(--muted)]">
              <span>2026</span>
              <span>·</span>
              <span>5 deliverables</span>
              <span>·</span>
              <span>16:9 + 9:16</span>
              <span>·</span>
              <span>Diffusion Studio</span>
            </div>
          </div>

          {/* Right Column: Framed Sonic Bumper / Title Card */}
          <div className="lg:col-span-6">
            <FernhillVideoPlayer
              id="logo-sting"
              src="/work/fernhill-records/logo-sting.mp4"
              poster="/work/fernhill-records/posters/logo-sting.webp"
              aspectRatio="16/9"
              isLoop={false}
              needleDropTime={1.0}
              preload="metadata"
              ariaLabel="Fernhill Records sonic logo: tonearm drops onto spinning vinyl groove with needle drop thump, revealing the wordmark and tagline Turn it over."
              caption="Identity open & sonic bumper · 5.0 s · needle drop at 1.0 s"
              transcript="A macro shot of a spinning vinyl disc. A tonearm drops onto the groove with a deep analogue thump and brief oxblood flash, revealing the Fernhill Records wordmark and tagline 'Turn it over.' stamped onto warm textured paper."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
