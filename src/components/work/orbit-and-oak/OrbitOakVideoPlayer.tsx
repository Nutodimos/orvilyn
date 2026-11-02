"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, FileText } from "lucide-react";
import { useOrbitOakMotion } from "./motionContext";

interface OrbitOakVideoPlayerProps {
  id: string;
  src: string;
  poster: string;
  aspectRatio?: "16/9" | "9/16";
  isLoop?: boolean;
  signatureCueTime?: number; // seconds
  cueLabel?: string;
  caption?: string;
  ariaLabel: string;
  transcript?: string;
  preload?: "metadata" | "none";
  className?: string;
}

export function OrbitOakVideoPlayer({
  id,
  src,
  poster,
  aspectRatio = "16/9",
  isLoop = false,
  signatureCueTime,
  cueLabel,
  caption,
  ariaLabel,
  transcript,
  preload = "none",
  className = "",
}: OrbitOakVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isMotionPaused, activeAudioId, requestAudio, muteAllAudio } =
    useOrbitOakMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const isMuted = activeAudioId !== id;

  // Pause if user toggles motion pause or system prefers-reduced-motion
  useEffect(() => {
    if (isMotionPaused && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isMotionPaused, isPlaying]);

  // IntersectionObserver for viewport playback
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (isMotionPaused) return;

          // For narrative master pieces: play once when in view, hold last frame
          if (!isLoop && hasPlayedOnce) {
            return;
          }

          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setHasPlayedOnce(true);
            })
            .catch(() => {});
        } else {
          // Pause when offscreen to conserve resources
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: [0, 0.35, 0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMotionPaused, isLoop, hasPlayedOnce]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hasEnded) {
      video.currentTime = 0;
      setHasEnded(false);
    }

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [hasEnded]);

  const handleRestart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setHasEnded(false);
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, []);

  const toggleAudio = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      requestAudio(id, signatureCueTime, video);
    } else {
      video.muted = true;
      muteAllAudio();
    }
  }, [id, isMuted, signatureCueTime, requestAudio, muteAllAudio]);

  const handleEnded = useCallback(() => {
    if (!isLoop) {
      setIsPlaying(false);
      setHasEnded(true);
    }
  }, [isLoop]);

  return (
    <div
      ref={containerRef}
      className={`relative group rounded-2xl overflow-hidden bg-[#1B1E4A] border border-[var(--line)] shadow-sm ${className}`}
    >
      {/* Video Container */}
      <div
        className={`relative w-full ${
          aspectRatio === "9/16"
            ? "aspect-[9/16] max-w-[340px] mx-auto"
            : "aspect-video"
        } bg-[#1B1E4A] overflow-hidden`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          muted={isMuted}
          loop={isLoop}
          preload={preload}
          onEnded={handleEnded}
          aria-label={ariaLabel}
          className="w-full h-full object-cover"
        />

        {/* Center Play Overlay on Ended (for hold-on-last-frame pieces) */}
        {hasEnded && !isLoop && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-200">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF4DC] text-[#1B1E4A] font-semibold text-sm shadow-md hover:bg-white active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Replay</span>
            </button>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            {/* Restart button */}
            <button
              type="button"
              onClick={handleRestart}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer"
              aria-label="Restart video"
            >
              <RotateCcw size={13} />
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-xs active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer ${
                !isMuted
                  ? "bg-[#F6B93B] text-[#1B1E4A] font-bold"
                  : "bg-white/15 hover:bg-white/25 text-white"
              }`}
              aria-pressed={!isMuted}
              aria-label={
                isMuted
                  ? `Turn sound on${cueLabel ? ` (${cueLabel})` : ""}`
                  : "Mute video sound"
              }
            >
              {!isMuted ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span className="hidden sm:inline">
                {!isMuted ? "Sound on" : cueLabel || "Unmute"}
              </span>
            </button>
          </div>

          {/* Transcript toggle */}
          {transcript && (
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs backdrop-blur-xs active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer ${
                showTranscript
                  ? "bg-white text-[#1B1E4A] font-semibold"
                  : "bg-white/15 hover:bg-white/25 text-white"
              }`}
              aria-expanded={showTranscript}
              aria-label="Toggle motion transcript"
            >
              <FileText size={12} />
              <span className="hidden md:inline">Script</span>
            </button>
          )}
        </div>
      </div>

      {/* Caption row */}
      {caption && (
        <div className="px-4 py-2.5 bg-[#1B1E4A] border-t border-white/10 text-xs text-[#FFF4DC]/80 flex items-center justify-between">
          <span>{caption}</span>
          {cueLabel && (
            <span className="text-[#F6B93B] font-mono text-[0.7rem]">
              {cueLabel}
            </span>
          )}
        </div>
      )}

      {/* Accessible Transcript Drawer */}
      {showTranscript && transcript && (
        <div className="p-4 bg-[#141638] border-t border-white/10 text-xs text-[#FFF4DC]/90 leading-relaxed font-sans">
          <p className="font-semibold text-[#F6B93B] uppercase tracking-wider text-[0.7rem] mb-1">
            Audio & Visual Transcript
          </p>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}
