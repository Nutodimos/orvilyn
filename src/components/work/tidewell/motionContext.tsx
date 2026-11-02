"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface MotionContextValue {
  isMotionPaused: boolean;
  toggleMotionPause: () => void;
  activeAudioId: string | null;
  requestAudio: (id: string, fizzTime?: number, videoEl?: HTMLVideoElement | null) => void;
  muteAllAudio: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const systemReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const isMotionPaused = userOverride ?? systemReduced;
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const videoElementsRef = useRef<Map<string, HTMLVideoElement>>(new Map());

  const toggleMotionPause = useCallback(() => {
    setUserOverride((prev) => {
      const current = prev ?? systemReduced;
      return !current;
    });
  }, [systemReduced]);

  const requestAudio = useCallback(
    (id: string, fizzTime?: number, videoEl?: HTMLVideoElement | null) => {
      if (videoEl) {
        videoElementsRef.current.set(id, videoEl);
      }

      // Mute all other videos
      videoElementsRef.current.forEach((el, elId) => {
        if (elId !== id && el) {
          el.muted = true;
        }
      });

      // If unmuting after fizz time has passed, restart at 0 for context
      if (videoEl && fizzTime && videoEl.currentTime > fizzTime) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      }

      setActiveAudioId(id);
    },
    []
  );

  const muteAllAudio = useCallback(() => {
    videoElementsRef.current.forEach((el) => {
      if (el) el.muted = true;
    });
    setActiveAudioId(null);
  }, []);

  return (
    <MotionContext.Provider
      value={{
        isMotionPaused,
        toggleMotionPause,
        activeAudioId,
        requestAudio,
        muteAllAudio,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
