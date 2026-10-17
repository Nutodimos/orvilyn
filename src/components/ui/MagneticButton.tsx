"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

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

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarseSnapshot,
    getServerSnapshot
  );

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.3 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const isDisabled = Boolean(shouldReduceMotion || isCoarsePointer);

  if (isDisabled) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const targetX = Math.max(-10, Math.min(10, deltaX * 0.25));
    const targetY = Math.max(-10, Math.min(10, deltaY * 0.25));

    rawX.set(targetX);
    rawY.set(targetY);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
