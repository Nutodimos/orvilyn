"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, FileText } from "lucide-react";
import { useMotion } from "./motionContext";

interface TidewellVideoPlayerProps {
  id: string;
  src: string;
  poster: string;
  aspectRatio?: "16/9" | "9/16";
  isLoop?: boolean;
  fizzTime?: number; // seconds
  caption?: string;
  ariaLabel: string;
  transcript?: string;
  preload?: "metadata" | "none";
  className?: string;
}

export function TidewellVideoPlayer({
  id,
  src,
  poster,
  aspectRatio = "16/9",
  isLoop = false,
  fizzTime,
  caption,
  ariaLabel,
  transcript,
  preload = "none",
  className = "",
}: TidewellVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isMotionPaused, activeAudioId, requestAudio, muteAllAudio } = useMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const isMuted = activeAudioId !== id;

  // When global motion is paused, pause video
  useEffect(() => {
    if (isMotionPaused && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isMotionPaused, isPlaying]);

  // IntersectionObserver (~0.35 threshold)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          // If reduced motion is on or motion is paused globally, do not autoplay
          if (isMotionPaused) return;

          // For narrative films: play once when in view, hold last frame
          if (!isLoop && hasPlayedOnce) {
            return;
          }

          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setHasPlayedOnce(true);
            })
            .catch(() => {
              // Browser autoplay policy prevented playback
            });
        } else {
          // Pause when offscreen to save GPU decode cycles
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
      requestAudio(id, fizzTime, video);
    } else {
      video.muted = true;
      muteAllAudio();
    }
  }, [fizzTime, id, isMuted, muteAllAudio, requestAudio]);

  const handleVideoEnded = useCallback(() => {
    if (!isLoop) {
      setIsPlaying(false);
      setHasEnded(true);
    }
  }, [isLoop]);

  const aspectClass =
    aspectRatio === "9/16" ? "aspect-[9/16] max-w-[340px] mx-auto" : "aspect-video w-full";

  return (
    <figure className={`flex flex-col ${className}`} ref={containerRef}>
      {/* Video Container Frame */}
      <div
        className={`relative ${aspectClass} rounded-[20px] md:rounded-[24px] overflow-hidden bg-[#123B38] border border-[var(--line)] shadow-[0_12px_36px_rgba(18,59,56,0.12)]`}
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

        {/* Floating Controls Bar (Quiet, bottom-anchored, never obstructing baked-in type) */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-[#123B38]/80 via-[#123B38]/40 to-transparent flex items-center justify-between gap-2 z-10 transition-opacity duration-200">
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Play/Pause (Always available) */}
            <button
              type="button"
              onClick={handlePlayToggle}
              className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--orange-tint)] hover:text-[var(--orange-strong)] active:scale-[0.97] transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-[var(--orange)] cursor-pointer"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>

            {/* Replay Button (For play-once pieces) */}
            {!isLoop && (
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--orange-tint)] hover:text-[var(--orange-strong)] active:scale-[0.97] transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-[var(--orange)] cursor-pointer"
                aria-label="Replay from start"
                title="Replay"
              >
                <RotateCcw size={14} />
              </button>
            )}

            {/* Sound Toggle (Only when film has audio track / fizz) */}
            {fizzTime !== undefined && (
              <button
                type="button"
                onClick={handleSoundToggle}
                className={`inline-flex items-center gap-1.5 px-2.5 h-8 md:h-9 rounded-full text-xs font-semibold cursor-pointer active:scale-[0.97] transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-[var(--orange)] ${
                  !isMuted
                    ? "bg-[var(--orange)] text-[var(--on-orange)]"
                    : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--orange-tint)]"
                }`}
                aria-label={isMuted ? `Unmute audio (fizz at ${fizzTime}s)` : "Mute audio"}
                title={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {!isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span className="hidden sm:inline">{!isMuted ? "Sound on" : "Sound"}</span>
              </button>
            )}
          </div>

          {/* Transcript / Info Toggle Button */}
          {transcript && (
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              className={`inline-flex items-center gap-1 px-2.5 h-8 md:h-9 rounded-full text-xs font-medium cursor-pointer transition-[background-color,color] focus-visible:outline-2 focus-visible:outline-[var(--orange)] ${
                showTranscript
                  ? "bg-[var(--surface)] text-[var(--ink)]"
                  : "bg-black/30 backdrop-blur-sm text-white/90 hover:bg-black/50"
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

      {/* Caption & Metadata */}
      {caption && (
        <figcaption className="mt-2.5 text-xs md:text-sm text-[var(--muted)] flex items-center justify-between font-mono">
          <span>{caption}</span>
          {isLoop && <span className="text-[11px] tracking-wider uppercase text-[var(--muted)]">Seamless loop</span>}
        </figcaption>
      )}

      {/* Accessible Transcript Card */}
      {transcript && showTranscript && (
        <div className="mt-3 p-3.5 bg-[var(--surface)] border border-[var(--line)] rounded-xl text-xs md:text-sm text-[var(--muted)] leading-relaxed">
          <p className="font-semibold text-[var(--ink)] mb-1">Visual & audio description:</p>
          <p>{transcript}</p>
        </div>
      )}
    </figure>
  );
}
