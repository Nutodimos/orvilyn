"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, PauseCircle, PlayCircle } from "lucide-react";
import { OrbitOakVideoPlayer } from "./OrbitOakVideoPlayer";
import { useOrbitOakMotion } from "./motionContext";

export function OrbitOakHero() {
  const { isMotionPaused, toggleMotionPause } = useOrbitOakMotion();

  return (
    <section className="w-full pt-10 pb-12 md:pt-16 md:pb-20 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Navigation & Motion Pause Control */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--ink)] hover:text-[#C89B65] active:scale-[0.97] transition-[transform,color] duration-160 ease-out"
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
                <PlayCircle size={15} className="text-[#F6B93B]" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6B93B]" />
              <span>Self-initiated / fictional brand</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-bold text-[var(--ink)] leading-none tracking-tight mb-4">
              Orbit &amp; Oak
            </h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold text-[var(--ink)] leading-snug mb-4">
              Big questions, small hands. Tactile STEM subscription for curious explorers.
            </p>

            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-6">
              A monthly subscription box that pairs backyard space exploration with woodland crafts.
              Built for kids aged 6 to 11 to foster screen-free wonder, and for parents who want
              enrichment grounded in real materials: build a wooden rocket, grow a sprout under a moon lamp,
              and discover the stars.
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

          {/* Right Column: Hero Video (Sonic Logo Sting) */}
          <div className="lg:col-span-6">
            <OrbitOakVideoPlayer
              id="orbit-oak-hero-sting"
              src="/work/orbit-and-oak/orbit-oak-logo-sting.mp4"
              poster="/work/orbit-and-oak/posters/orbit-oak-logo-sting.webp"
              aspectRatio="16/9"
              isLoop={false}
              signatureCueTime={1.8}
              cueLabel="Spark chime at 1.8s"
              caption="Sonic Logo Sting (4.5s) — Spark chime, wood knock & Nutmeg pop"
              ariaLabel="Orbit and Oak animated sonic logo sting"
              transcript="An orbit ring traces around empty space. An acorn drops into frame with squash and stretch, followed by Nutmeg's planet dot. At 1.8s, the marigold spark blooms with a three-note chime (G-B-D) as letters pop in to reveal the Orbit & Oak wordmark and 'Big questions, small hands.' tagline."
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
