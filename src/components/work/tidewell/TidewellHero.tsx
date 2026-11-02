"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, PauseCircle, PlayCircle } from "lucide-react";
import { TidewellVideoPlayer } from "./TidewellVideoPlayer";
import { useMotion } from "./motionContext";

export function TidewellHero() {
  const { isMotionPaused, toggleMotionPause } = useMotion();

  return (
    <section className="w-full pt-10 pb-12 md:pt-16 md:pb-20 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Navigation & Global Pause Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--ink)] hover:text-[var(--orange-strong)] transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>All work</span>
          </Link>

          {/* Accessible Motion Pause Control */}
          <button
            type="button"
            onClick={toggleMotionPause}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--orange-tint)] transition-[background-color,color] cursor-pointer"
            aria-pressed={isMotionPaused}
          >
            {isMotionPaused ? (
              <>
                <PlayCircle size={15} className="text-[var(--orange)]" />
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
            {/* Fictional Brand Label (Non-negotiable) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-xs text-[var(--ink)] text-[0.75rem] font-semibold select-none w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span>Self-initiated / fictional brand</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--ink)] leading-none tracking-tight mb-4">
              Tidewell
            </h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold text-[var(--ink)] leading-snug mb-4">
              A motion system for water at its source.
            </p>

            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-6">
              Tidewell is a fictional sparkling mineral water. The identity treats motion as water
              finding its level: it rises, settles, and holds. Every frame is drawn from shapes,
              type, gradients and Canvas2D water. No footage. No 3D.
            </p>

            {/* Meta Row */}
            <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-mono text-[var(--muted)]">
              <span>2026</span>
              <span>·</span>
              <span>10 pieces</span>
              <span>·</span>
              <span>16:9 + 9:16</span>
              <span>·</span>
              <span>Diffusion Studio</span>
            </div>
          </div>

          {/* Right Column: Framed Title Card (logo-reveal) */}
          <div className="lg:col-span-6">
            <TidewellVideoPlayer
              id="logo-reveal"
              src="/work/tidewell/video/logo-reveal.mp4"
              poster="/work/tidewell/posters/logo-reveal.webp"
              aspectRatio="16/9"
              isLoop={false}
              fizzTime={3.8}
              preload="metadata"
              ariaLabel="Tidewell opening title card: three bubbles rise and merge into the dot of the wordmark. Pure at the source."
              caption="Opening title card · 5.8 s · fizz at 3.8 s"
              transcript="Three bubbles rise and merge into the dot of the wordmark. The word tidewell settles, followed by Pure at the source. A single fizz is heard at 3.8 s."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
