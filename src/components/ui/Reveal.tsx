"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { scrollRevealVariants } from "@/lib/motion";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
  aboveTheFold?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  amount = 0.2,
  aboveTheFold = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || aboveTheFold) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
