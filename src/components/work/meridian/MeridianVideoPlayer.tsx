"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, FileText } from "lucide-react";
import { useMeridianMotion } from "./motionContext";

interface MeridianVideoPlayerProps {
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

export function MeridianVideoPlayer({
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
}: MeridianVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isMotionPaused, activeAudioId, requestAudio, muteAllAudio } =
    useMeridianMotion();

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
  }, [hasPlayedOnce, isLoop, isMotionPaused]);

  const handlePlayToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (hasEnded) {
        video.currentTime = 0;
        setHasEnded(false);
      }
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayedOnce(true);
        })
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [hasEnded]);

  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setHasEnded(false);
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasPlayedOnce(true);
      })
      .catch(() => {});
  }, []);

  const handleSoundToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      requestAudio(id, signatureCueTime, video);
    } else {
      video.muted = true;
      muteAllAudio();
    }
  }, [id, isMuted, muteAllAudio, signatureCueTime, requestAudio]);

  const handleVideoEnded = useCallback(() => {
    if (!isLoop) {
      setIsPlaying(false);
      setHasEnded(true);
    }
  }, [isLoop]);

  const aspectClass =
    aspectRatio === "9/16"
      ? "aspect-[9/16] max-w-[340px] mx-auto"
      : "aspect-video w-full";

  return (
    <figure className={`flex flex-col ${className}`} ref={containerRef}>
      {/* Video Container Frame with Obsidian Glass styling */}
      <div
        className={`relative ${aspectClass} rounded-[20px] md:rounded-[24px] overflow-hidden bg-[#07090E] border border-white/[0.08] shadow-[0_16px_40px_rgba(7,9,14,0.35)]`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          playsInline
          loop={isLoop}
          preload={preload}
          onEnded={handleVideoEnded}
          aria-label={ariaLabel}
          className="w-full h-full object-cover"
        />

        {/* Floating Controls Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-[#07090E]/90 via-[#07090E]/50 to-transparent flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={handlePlayToggle}
              className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-[#07090E] hover:bg-[#F3F4F6] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#F59E0B] cursor-pointer"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>

            {/* Replay Button for narrative play-once pieces */}
            {!isLoop && (
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#F59E0B] cursor-pointer"
                aria-label="Replay from start"
              >
                <RotateCcw size={14} />
              </button>
            )}

            {/* Sound Toggle (for films with audio cues) */}
            {signatureCueTime !== undefined && (
              <button
                type="button"
                onClick={handleSoundToggle}
                className={`inline-flex items-center gap-1.5 px-3 h-8 md:h-9 rounded-full text-xs font-semibold cursor-pointer active:scale-[0.97] transition-[transform,background-color,color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#F59E0B] ${
                  !isMuted
                    ? "bg-[#F59E0B] text-[#07090E] shadow-sm"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                aria-label={
                  isMuted
                    ? `Unmute audio${cueLabel ? ` (${cueLabel})` : ""}`
                    : "Mute audio"
                }
              >
                {!isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span className="hidden sm:inline">
                  {!isMuted ? "Sound on" : "Sound"}
                </span>
              </button>
            )}
          </div>

          {/* Transcript Toggle */}
          {transcript && (
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              className={`inline-flex items-center gap-1 px-2.5 h-8 md:h-9 rounded-full text-xs font-medium cursor-pointer active:scale-[0.97] transition-[transform,background-color,color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#F59E0B] ${
                showTranscript
                  ? "bg-white text-[#07090E]"
                  : "bg-black/50 backdrop-blur-xs text-white/80 hover:bg-black/70 hover:text-white"
              }`}
              aria-expanded={showTranscript}
              aria-label="Toggle transcript"
            >
              <FileText size={13} />
              <span className="hidden sm:inline">Transcript</span>
            </button>
          )}
        </div>
      </div>

      {/* Caption & Metadata */}
      {caption && (
        <figcaption className="mt-2 text-xs md:text-sm text-[var(--muted)] flex items-center justify-between">
          <span>{caption}</span>
        </figcaption>
      )}

      {/* Accessible Transcript Drawer */}
      {transcript && showTranscript && (
        <div
          role="region"
          aria-label={`Transcript for ${ariaLabel}`}
          className="mt-3 p-4 rounded-xl bg-[#101420] border border-white/[0.08] text-xs md:text-sm text-[#E5E7EB] leading-relaxed"
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.06]">
            <span className="font-semibold text-white tracking-wide uppercase text-[0.7rem]">
              Audio & Visual Transcript
            </span>
            <button
              type="button"
              onClick={() => setShowTranscript(false)}
              className="text-white/60 hover:text-white active:scale-[0.97] transition-[transform,color] duration-160 ease-out text-xs"
            >
              Close
            </button>
          </div>
          <p className="whitespace-pre-line text-[#9CA3AF]">{transcript}</p>
        </div>
      )}
    </figure>
  );
}
