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

interface FernhillMotionContextValue {
  isMotionPaused: boolean;
  toggleMotionPause: () => void;
  activeAudioId: string | null;
  requestAudio: (
    id: string,
    needleDropTime?: number,
    videoEl?: HTMLVideoElement | null
  ) => void;
  muteAllAudio: () => void;
}

const FernhillMotionContext = createContext<FernhillMotionContextValue | null>(null);

export function FernhillMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
    (
      id: string,
      needleDropTime?: number,
      videoEl?: HTMLVideoElement | null
    ) => {
      if (videoEl) {
        videoElementsRef.current.set(id, videoEl);
      }

      // Mute any other currently playing video
      videoElementsRef.current.forEach((el, elId) => {
        if (elId !== id && el) {
          el.muted = true;
        }
      });

      // If unmuting after the signature needle drop or cue has elapsed,
      // rewind to start so user catches the full analogue sequence
      if (videoEl && needleDropTime && videoEl.currentTime > needleDropTime) {
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
    <FernhillMotionContext.Provider
      value={{
        isMotionPaused,
        toggleMotionPause,
        activeAudioId,
        requestAudio,
        muteAllAudio,
      }}
    >
      {children}
    </FernhillMotionContext.Provider>
  );
}

export function useFernhillMotion() {
  const context = useContext(FernhillMotionContext);
  if (!context) {
    throw new Error(
      "useFernhillMotion must be used within a FernhillMotionProvider"
    );
  }
  return context;
}
