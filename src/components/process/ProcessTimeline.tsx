"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/process";
import { StepRow } from "@/components/process/StepRow";

export function ProcessTimeline() {
  const stepsWrapperRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef<HTMLDivElement>(null);
  const [railHeight, setRailHeight] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: stepsWrapperRef,
    offset: ["start 70%", "end 70%"],
  });

  const shouldReduceMotion = useReducedMotion();
  const clampedProgress = useTransform(scrollYProgress, [0, 1], [0, 1], {
    clamp: true,
  });
  const scaleY = shouldReduceMotion ? 1 : clampedProgress;

  useEffect(() => {
    const updateHeight = () => {
      if (lastStepRef.current && stepsWrapperRef.current) {
        const containerRect = stepsWrapperRef.current.getBoundingClientRect();
        const lastStepRect = lastStepRef.current.getBoundingClientRect();
        setRailHeight(lastStepRect.top - containerRect.top + 22);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && stepsWrapperRef.current) {
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(stepsWrapperRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <section className="w-full bg-[var(--bg)] py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-4xl">
          <div ref={stepsWrapperRef} className="relative">
            {/* Rail */}
            <div
              className="absolute left-0 top-0 pointer-events-none z-0"
              style={{
                height:
                  railHeight !== null
                    ? `${railHeight}px`
                    : "calc(100% - 260px)",
                width: "44px",
              }}
              aria-hidden="true"
            >
              <div className="absolute top-0 bottom-0 left-[21px] w-[2px] bg-[var(--line)]" />
              <motion.div
                className="absolute top-0 bottom-0 left-[21px] w-[2px] bg-[var(--orange)]"
                style={{
                  transformOrigin: "top",
                  scaleY,
                }}
              />
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-[56px] md:gap-[80px]">
              {processSteps.map((step, index) => (
                <StepRow
                  key={step.id}
                  step={step}
                  ref={
                    index === processSteps.length - 1 ? lastStepRef : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
