"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export interface MotionBumperItem {
  id: string;
  title: string;
  tagline: string;
  desktopVideo: string;
  mobileVideo: string;
  poster: string;
  href: string;
}

export const MOTION_BUMPERS: MotionBumperItem[] = [
  {
    id: "meridian",
    title: "Meridian",
    tagline: "Fintech motion system & product films",
    desktopVideo: "/work/meridian/bumper-6s.mp4",
    mobileVideo: "/work/meridian/social-loop-916.mp4",
    poster: "/work/meridian/posters/hero-spot.webp",
    href: "/work/meridian",
  },
  {
    id: "tidewell",
    title: "Tidewell",
    tagline: "Procedural water motion & brand identity",
    desktopVideo: "/work/tidewell/video/logo-reveal.mp4",
    mobileVideo: "/work/tidewell/video/loop-a.mp4",
    poster: "/work/tidewell/posters/logo-reveal.webp",
    href: "/work/tidewell",
  },
  {
    id: "fernhill-records",
    title: "Fernhill Records",
    tagline: "Tactile motion identity & vinyl packaging",
    desktopVideo: "/work/fernhill-records/logo-sting.mp4",
    mobileVideo: "/work/fernhill-records/visualiser-social.mp4",
    poster: "/work/fernhill-records/posters/label-reel.webp",
    href: "/work/fernhill-records",
  },
  {
    id: "orbit-and-oak",
    title: "Orbit & Oak",
    tagline: "STEM subscription & character animation",
    desktopVideo: "/work/orbit-and-oak/orbit-oak-logo-sting.mp4",
    mobileVideo: "/work/orbit-and-oak/orbit-oak-social-loop-916.mp4",
    poster: "/work/orbit-and-oak/posters/orbit-oak-brand-spot.webp",
    href: "/work/orbit-and-oak",
  },
];

export interface MoveBandProps {
  videoSrc?: string;
}

export function MoveBand({ videoSrc }: MoveBandProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const moveService = services.find((s) => s.group === "move");

  // Detect mobile viewport to alternate between 9:16 vertical and 16:9 widescreen videos
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance through bumpers every 6.5s
  useEffect(() => {
    if (shouldReduceMotion || videoSrc) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOTION_BUMPERS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [currentIndex, shouldReduceMotion, videoSrc]);

  const current = MOTION_BUMPERS[currentIndex];
  const activeVideoSrc = videoSrc || (isMobile ? current.mobileVideo : current.desktopVideo);

  // Reload and start video on piece change
  useEffect(() => {
    if (videoRef.current && !shouldReduceMotion) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay handled safely by browser policy
      });
    }
  }, [currentIndex, isMobile, shouldReduceMotion]);

  return (
    <section className="w-full bg-[var(--ink)] text-[var(--bg)] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <Reveal>
            <div className="flex flex-col items-start">
              <span className="text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[var(--bg)]/60 block mb-4">
                Move
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--bg)] mb-4">
                {moveService?.title ?? "Motion that makes people stop scrolling."}
              </h2>
              <p className="text-[var(--bg)]/80 text-base md:text-lg leading-relaxed mb-4 max-w-xl">
                {moveService?.description ??
                  "Logo animations, promo clips, and explainers."}
              </p>
              <span className="text-[0.8rem] text-[var(--bg)]/60 uppercase tracking-[0.06em] font-semibold block mb-8">
                {moveService?.tech ?? "Motion design"}
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <Button href="/work#motion" variant="primary">
                  See all motion work
                </Button>
                <Link
                  href={current.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--bg)]/80 hover:text-[var(--orange)] transition-colors duration-160 py-2"
                >
                  <span>Explore {current.title}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Alternating Interactive Bumper Card */}
          <Reveal delay={0.1}>
            <Link
              href={current.href}
              aria-label={`View ${current.title} case study`}
              className="group relative w-full rounded-[24px] overflow-hidden bg-[var(--bg)]/[0.08] border border-white/10 flex flex-col justify-between aspect-[4/5] sm:aspect-[16/10] shadow-2xl transition-[transform,box-shadow,border-color] duration-200 ease-out hover:border-white/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
            >
              {/* Active Video */}
              <video
                ref={videoRef}
                key={`${current.id}-${isMobile ? "mob" : "desk"}`}
                src={activeVideoSrc}
                poster={current.poster}
                autoPlay={!shouldReduceMotion}
                muted
                playsInline
                preload="metadata"
                onEnded={() => {
                  if (!videoSrc) {
                    setCurrentIndex((prev) => (prev + 1) % MOTION_BUMPERS.length);
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Gradient Scrim for Legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none"
                aria-hidden="true"
              />

              {/* Top overlay badge: Project info & Click affordance */}
              <div className="relative z-10 p-4 md:p-6 flex items-start justify-between w-full pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--orange)] animate-pulse" />
                  <span className="text-xs font-semibold tracking-wide text-white">
                    {current.title}
                  </span>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/90 flex items-center gap-1 transition-[transform,background-color,color] duration-160 group-hover:scale-105 group-hover:bg-[var(--orange)] group-hover:text-[var(--on-orange)] group-hover:border-transparent">
                  <span>View case study</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </div>
              </div>

              {/* Bottom overlay: Description & Interactive Indicators */}
              <div className="relative z-10 p-4 md:p-6 flex items-end justify-between w-full pointer-events-none">
                <p className="text-xs md:text-sm font-medium text-white/90 drop-shadow max-w-[65%] line-clamp-1">
                  {current.tagline}
                </p>

                {/* Playlist Dot Indicators */}
                <div
                  className="flex items-center gap-1.5 pointer-events-auto bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {MOTION_BUMPERS.map((piece, idx) => (
                    <button
                      key={piece.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentIndex(idx);
                      }}
                      aria-label={`Switch to ${piece.title}`}
                      aria-current={idx === currentIndex ? "true" : "false"}
                      className={`h-2 rounded-full transition-[width,background-color] duration-200 cursor-pointer ${
                        idx === currentIndex
                          ? "w-5 bg-[var(--orange)]"
                          : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
