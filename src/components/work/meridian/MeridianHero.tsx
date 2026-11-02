"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, PauseCircle, PlayCircle } from "lucide-react";
import { MeridianVideoPlayer } from "./MeridianVideoPlayer";
import { useMeridianMotion } from "./motionContext";

export function MeridianHero() {
  const { isMotionPaused, toggleMotionPause } = useMeridianMotion();

  return (
    <section className="w-full pt-10 pb-12 md:pt-16 md:pb-20 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Navigation & Motion Pause Control */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--ink)] hover:text-[#F59E0B] active:scale-[0.97] transition-[transform,color] duration-160 ease-out"
          >
            <ArrowLeft size={16} />
            <span>All work</span>
          </Link>

          {/* Accessible Motion Pause Toggle */}
          <button
            type="button"
            onClick={toggleMotionPause}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[#F3F4F6] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer"
            aria-pressed={isMotionPaused}
          >
            {isMotionPaused ? (
              <>
                <PlayCircle size={15} className="text-[#F59E0B]" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span>Self-initiated / fictional brand</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-bold text-[var(--ink)] leading-none tracking-tight mb-4">
              Meridian
            </h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold text-[var(--ink)] leading-snug mb-4">
              Calm money-tracking for freelancers, built with executive challenger vitality.
            </p>

            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-6">
              Freelancing swings between sharp cashflow peaks and unpredictable dry spells.
              Meridian transforms that jagged financial stress into a calm, level golden horizon.
              Motion is used not as decoration, but as an emotional transition from financial anxiety
              to immediate certainty.
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

          {/* Right Column: Framed Identity Open / Bumper */}
          <div className="lg:col-span-6">
            <MeridianVideoPlayer
              id="bumper-6s"
              src="/work/meridian/bumper-6s.mp4"
              poster="/work/meridian/posters/bumper-6s.webp"
              aspectRatio="16/9"
              isLoop={false}
              signatureCueTime={1.0}
              cueLabel="chime at 1.0s"
              preload="metadata"
              ariaLabel="Meridian identity bumper: erratic cash flow line levels out into a warm golden horizon with a resonant chime, settling on the Meridian wordmark."
              caption="Identity open & bumper · 6.0 s · chime at 1.0 s"
              transcript="The signature 6-second identity bumper showing the jagged line leveling into the golden horizon with a warm chime, followed by the kinetic rise and specular gleam of the Meridian wordmark and the spoken brand promise: 'Steady money for unsteady months.'"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
