"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, FileText } from "lucide-react";
import { useFernhillMotion } from "./motionContext";

interface FernhillVideoPlayerProps {
  id: string;
  src: string;
  poster: string;
  aspectRatio?: "16/9" | "9/16";
  isLoop?: boolean;
  needleDropTime?: number; // seconds
  caption?: string;
  ariaLabel: string;
  transcript?: string;
  preload?: "metadata" | "none";
  className?: string;
}

export function FernhillVideoPlayer({
  id,
  src,
  poster,
  aspectRatio = "16/9",
  isLoop = false,
  needleDropTime,
  caption,
  ariaLabel,
  transcript,
  preload = "none",
  className = "",
}: FernhillVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isMotionPaused, activeAudioId, requestAudio, muteAllAudio } =
    useFernhillMotion();

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

  // IntersectionObserver for deliberate viewport playback
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
          // Pause when offscreen to conserve GPU decode cycles
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
      requestAudio(id, needleDropTime, video);
    } else {
      video.muted = true;
      muteAllAudio();
    }
  }, [id, isMuted, muteAllAudio, needleDropTime, requestAudio]);

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
      {/* Video Container Frame */}
      <div
        className={`relative ${aspectClass} rounded-[20px] md:rounded-[24px] overflow-hidden bg-[#14110F] border border-[#3E342B]/40 shadow-[0_16px_40px_rgba(20,17,15,0.18)]`}
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
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-[#14110F]/85 via-[#14110F]/45 to-transparent flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={handlePlayToggle}
              className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FBF6E8] text-[#1A1714] hover:bg-[#F1E7D0] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#C2602B] cursor-pointer"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>

            {/* Replay Button for narrative play-once pieces */}
            {!isLoop && (
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FBF6E8] text-[#1A1714] hover:bg-[#F1E7D0] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#C2602B] cursor-pointer"
                aria-label="Replay from start"
                title="Replay"
              >
                <RotateCcw size={14} />
              </button>
            )}

            {/* Sound Toggle (for films with audio) */}
            {needleDropTime !== undefined && (
              <button
                type="button"
                onClick={handleSoundToggle}
                className={`inline-flex items-center gap-1.5 px-3 h-8 md:h-9 rounded-full text-xs font-semibold cursor-pointer active:scale-[0.97] transition-[transform,background-color,color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#C2602B] ${
                  !isMuted
                    ? "bg-[#6E1F24] text-[#FBF6E8] shadow-sm"
                    : "bg-[#FBF6E8] text-[#1A1714] hover:bg-[#F1E7D0]"
                }`}
                aria-label={
                  isMuted
                    ? `Unmute audio (needle drop at ${needleDropTime}s)`
                    : "Mute audio"
                }
                title={isMuted ? "Unmute audio" : "Mute audio"}
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
              className={`inline-flex items-center gap-1 px-2.5 h-8 md:h-9 rounded-full text-xs font-medium cursor-pointer active:scale-[0.97] transition-[transform,background-color,color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#C2602B] ${
                showTranscript
                  ? "bg-[#FBF6E8] text-[#1A1714]"
                  : "bg-black/40 backdrop-blur-xs text-[#F1E7D0] hover:bg-black/60"
              }`}
              aria-expanded={showTranscript}
              aria-label="Toggle visual transcript"
            >
              <FileText size={13} />
              <span className="hidden sm:inline">Transcript</span>
            </button>
          )}
        </div>
      </div>

      {/* Caption & Format Indicator */}
      {caption && (
        <figcaption className="mt-2.5 text-xs md:text-sm text-[var(--muted)] flex items-center justify-between font-mono">
          <span>{caption}</span>
          {isLoop && (
            <span className="text-[11px] tracking-wider uppercase text-[var(--muted)]">
              Seamless loop
            </span>
          )}
        </figcaption>
      )}

      {/* Accessible Description */}
      {transcript && showTranscript && (
        <div className="mt-3 p-4 bg-[#FBF6E8] border border-[#DCCFB0] rounded-xl text-xs md:text-sm text-[#1A1714]/85 leading-relaxed">
          <p className="font-semibold text-[#1A1714] mb-1">
            Visual & audio description:
          </p>
          <p>{transcript}</p>
        </div>
      )}
    </figure>
  );
}
