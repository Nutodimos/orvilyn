"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { MotionPiece } from "@/data/motion";

interface MotionTileProps {
  piece: MotionPiece;
}

function subscribeMobile(callback: () => void) {
  const mediaQuery = window.matchMedia(
    "(max-width: 1023px), (hover: none), (pointer: coarse)"
  );
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(
    "(max-width: 1023px), (hover: none), (pointer: coarse)"
  ).matches;
}

function getServerSnapshot() {
  return false;
}

export function MotionTile({ piece }: MotionTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerSnapshot
  );

  // Ensure DOM element has muted=true for iOS Safari programmatic autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  // Desktop hover playback (when not in mobile view)
  const handleMouseEnter = () => {
    if (!piece.videoSrc || shouldReduceMotion || isMobile) return;
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (!piece.videoSrc || shouldReduceMotion || isMobile) return;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Mobile: Viewport autoplay on scroll via IntersectionObserver
  useEffect(() => {
    if (!isMobile || shouldReduceMotion || !piece.videoSrc) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        // Play when entering the active viewport
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        } else {
          // Pause when offscreen to preserve battery and GPU memory
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, shouldReduceMotion, piece.videoSrc]);

  // Mobile tap-to-toggle playback
  const handleTouchToggle = () => {
    if (!isMobile || !piece.videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const videoElement = (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full rounded-[20px] overflow-hidden bg-[var(--bg)]/[0.08] flex items-center justify-center select-none transition-transform duration-160 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.01] active:scale-[0.98]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isMobile ? handleTouchToggle : undefined}
      role={isMobile && piece.videoSrc ? "button" : undefined}
      tabIndex={isMobile && piece.videoSrc ? 0 : undefined}
      aria-label={
        isMobile && piece.videoSrc
          ? isPlaying
            ? `Pause ${piece.title} motion preview`
            : `Play ${piece.title} motion preview`
          : undefined
      }
    >
      {piece.videoSrc ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={piece.poster || undefined}
          className="w-full h-full object-cover"
        >
          <source src={piece.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4">
          <span className="font-[family-name:var(--font-display)] font-extrabold text-[1.5rem] text-[var(--bg)]/40 text-center">
            {piece.title}
          </span>
        </div>
      )}

      {/* Desktop subtle play cue overlay for hover */}
      {!isMobile && piece.href && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[var(--orange)] transition-colors duration-200">
          <ArrowUpRight size={16} />
        </div>
      )}

      {/* Mobile touch status indicator (Play / Pause pill) */}
      {isMobile && piece.videoSrc && (
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs flex items-center gap-1.5 text-white/90 text-xs font-medium pointer-events-none transition-opacity duration-160 ease-out">
          {isPlaying ? (
            <>
              <Pause size={12} />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play size={12} className="ml-0.5" />
              <span>Preview</span>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col group">
      {/* On desktop, wrapping the video with Link preserves direct click navigation. On touch, the video acts as a toggle, with Link on title & CTA */}
      {!isMobile && piece.href ? (
        <Link
          href={piece.href}
          className="block focus-visible:outline-2 focus-visible:outline-[var(--orange)] rounded-[20px]"
          aria-label={`View ${piece.title} case study`}
        >
          {videoElement}
        </Link>
      ) : (
        videoElement
      )}

      <div className="mt-3">
        {piece.badge && (
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--bg)]/10 text-[var(--bg)]/80 text-[11px] font-medium tracking-wide mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
            <span>{piece.badge}</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {piece.href ? (
            <Link
              href={piece.href}
              className="font-bold text-[var(--bg)] text-base leading-snug hover:text-[var(--orange)] active:scale-[0.98] transition-[color,transform] duration-160 ease-out inline-flex items-center gap-1"
            >
              <span>{piece.title}</span>
            </Link>
          ) : (
            <h3 className="font-bold text-[var(--bg)] text-base leading-snug">
              {piece.title}
            </h3>
          )}
        </div>

        {piece.kind && (
          <p className="text-[var(--bg)]/60 text-[0.925rem] mt-0.5">
            {piece.kind}
          </p>
        )}

        {piece.href && (
          <Link
            href={piece.href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--orange)] hover:text-[var(--orange-tint)] active:scale-[0.97] mt-2 transition-[color,transform] duration-160 ease-out"
          >
            <span>View case study</span>
            <ArrowUpRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}
