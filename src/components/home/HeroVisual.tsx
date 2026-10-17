"use client";

import React, { useRef, useEffect, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

function subscribeCoarsePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getCoarseSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

function getServerSnapshot() {
  return false;
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarseSnapshot,
    getServerSnapshot
  );

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (isCoarsePointer || shouldReduceMotion) return;

    const heroSection = containerRef.current?.closest("section");
    if (!heroSection) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      const relativeY = (e.clientY - rect.top) / rect.height;

      const normX = Math.max(-1, Math.min(1, relativeX * 2 - 1));
      const normY = Math.max(-1, Math.min(1, relativeY * 2 - 1));

      rawX.set(normX);
      rawY.set(normY);
    };

    const handlePointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    heroSection.addEventListener("pointermove", handlePointerMove);
    heroSection.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      heroSection.removeEventListener("pointermove", handlePointerMove);
      heroSection.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isCoarsePointer, shouldReduceMotion, rawX, rawY]);

  // Frame A multipliers (depth = 0.6)
  const aX = useTransform(springX, (val) => val * 18 * 0.6);
  const aY = useTransform(springY, (val) => val * 18 * 0.6);
  const aRotY = useTransform(springX, (val) => val * 6 * 0.6);
  const aRotX = useTransform(springY, (val) => -val * 6 * 0.6);

  // Frame B multipliers (depth = 1.2)
  const bX = useTransform(springX, (val) => val * 18 * 1.2);
  const bY = useTransform(springY, (val) => val * 18 * 1.2);
  const bRotY = useTransform(springX, (val) => val * 6 * 1.2);
  const bRotX = useTransform(springY, (val) => -val * 6 * 1.2);

  // Frame C multipliers (depth = 0.9)
  const cX = useTransform(springX, (val) => val * 18 * 0.9);
  const cY = useTransform(springY, (val) => val * 18 * 0.9);
  const cRotY = useTransform(springX, (val) => val * 6 * 0.9);
  const cRotX = useTransform(springY, (val) => -val * 6 * 0.9);

  // Orange Backdrop Panel multipliers (depth = 0.3)
  const panelX = useTransform(springX, (val) => val * 18 * 0.3);
  const panelY = useTransform(springY, (val) => val * 18 * 0.3);
  const panelRotY = useTransform(springX, (val) => val * 6 * 0.3);
  const panelRotX = useTransform(springY, (val) => -val * 6 * 0.3);

  const isInteractive = !shouldReduceMotion && !isCoarsePointer;
  const isFloat = !shouldReduceMotion && isCoarsePointer;

  return (
    <div
      ref={containerRef}
      className="relative z-0 aspect-square w-[min(100%,360px)] lg:w-full lg:max-w-[520px] mt-12 lg:mt-0 mx-auto select-none"
      style={{ perspective: 1000 }}
    >
      {/* ORANGE BACKDROP PANEL */}
      <motion.div
        style={
          isInteractive
            ? {
                x: panelX,
                y: panelY,
                rotateX: panelRotX,
                rotateY: panelRotY,
                rotate: -4,
              }
            : { rotate: -4 }
        }
        className="absolute w-[86%] h-[80%] right-0 bottom-[4%] bg-[var(--orange)] rounded-[40px] z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* FRAME A: BROWSER */}
      <motion.div
        style={
          isInteractive
            ? { x: aX, y: aY, rotateX: aRotX, rotateY: aRotY }
            : undefined
        }
        className={`absolute w-[66%] top-[4%] left-0 bg-[var(--surface)] border border-[var(--line)] rounded-[20px] shadow-[var(--shadow-hero-lift)] overflow-hidden z-10 ${
          isFloat ? "animate-hero-float-a" : ""
        }`}
      >
        {/* Browser top bar */}
        <div className="h-[28px] border-b border-[var(--line)] px-3 flex items-center gap-1.5 bg-[var(--bg)]/50">
          <div className="w-2 h-2 rounded-full bg-[var(--ink)]/20" />
          <div className="w-2 h-2 rounded-full bg-[var(--ink)]/20" />
          <div className="w-2 h-2 rounded-full bg-[var(--ink)]/20" />
        </div>
        {/* Browser skeleton body */}
        <div className="p-4 flex flex-col gap-3">
          <div className="h-[70px] w-full rounded-xl bg-[var(--orange)]" />
          <div className="h-[10px] w-[80%] rounded-full bg-[var(--ink)]/10" />
          <div className="h-[10px] w-[55%] rounded-full bg-[var(--ink)]/10" />
          <div className="h-[22px] w-[90px] rounded-full bg-[var(--orange-tint)]" />
        </div>
      </motion.div>

      {/* FRAME B: PHONE */}
      <motion.div
        style={
          isInteractive
            ? { x: bX, y: bY, rotateX: bRotX, rotateY: bRotY }
            : undefined
        }
        className={`absolute w-[28%] aspect-[9/19] right-0 top-[26%] bg-[var(--surface)] border-[6px] border-[var(--ink)] rounded-[28px] shadow-[var(--shadow-hero-lift)] p-3 flex flex-col gap-[10px] overflow-hidden z-30 ${
          isFloat ? "animate-hero-float-b" : ""
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-[var(--orange)] shrink-0" />
        <div className="h-2 w-full rounded-full bg-[var(--ink)]/10 shrink-0" />
        <div className="h-2 w-[75%] rounded-full bg-[var(--ink)]/10 shrink-0" />
        <div className="h-16 w-full rounded-[12px] bg-[var(--orange-tint)] shrink-0" />
        <div className="h-7 w-full rounded-full bg-[var(--orange)] shrink-0" />
        <div className="h-2 w-[60%] rounded-full bg-[var(--ink)]/10 shrink-0" />
        <div className="mt-auto flex items-center justify-around w-full shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--ink)]/15 shrink-0" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--ink)]/15 shrink-0" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--ink)]/15 shrink-0" />
        </div>
      </motion.div>

      {/* FRAME C: DASHBOARD */}
      <motion.div
        style={
          isInteractive
            ? { x: cX, y: cY, rotateX: cRotX, rotateY: cRotY }
            : undefined
        }
        className={`absolute w-[52%] bottom-[2%] left-[14%] bg-[var(--surface)] border border-[var(--line)] rounded-[20px] shadow-[var(--shadow-hero-lift)] p-4 z-20 ${
          isFloat ? "animate-hero-float-c" : ""
        }`}
      >
        <div className="h-2.5 w-[45%] rounded-full bg-[var(--ink)]/10 mb-4" />
        <div className="flex items-end justify-between h-[80px] gap-2 pt-1">
          <div className="w-full h-[45%] rounded-t-md bg-[var(--orange)]" />
          <div className="w-full h-[80%] rounded-t-md bg-[var(--orange-tint)]" />
          <div className="w-full h-[55%] rounded-t-md bg-[var(--orange)]" />
          <div className="w-full h-[95%] rounded-t-md bg-[var(--orange-tint)]" />
          <div className="w-full h-[70%] rounded-t-md bg-[var(--orange)]" />
        </div>
      </motion.div>
    </div>
  );
}
