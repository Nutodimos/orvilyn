"use client";

import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { ProcessStep } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";

export interface StepRowProps {
  step: ProcessStep;
}

export const StepRow = forwardRef<HTMLDivElement, StepRowProps>(
  function StepRow({ step }, ref) {
    const rowRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rowRef, { margin: "-40% 0px -40% 0px" });
    const shouldReduceMotion = useReducedMotion();
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useImperativeHandle(ref, () => rowRef.current as HTMLDivElement);

    useEffect(() => {
      if (inView) {
        setHasBeenInView(true);
      }
    }, [inView]);

    const isActive = Boolean(shouldReduceMotion || hasBeenInView);

    return (
      <div
        ref={rowRef}
        className="grid grid-cols-[44px_1fr] gap-[24px] md:gap-[40px] items-start"
      >
        {/* Circle in the rail */}
        <div
          className={`relative z-10 w-[44px] h-[44px] rounded-full flex items-center justify-center font-bold text-[1.125rem] border-2 transition-colors duration-300 select-none ${
            isActive
              ? "bg-[var(--orange)] border-[var(--orange)] text-[var(--on-orange)]"
              : "bg-[var(--surface)] border-[var(--line)] text-[var(--muted)]"
          }`}
        >
          {step.number}
        </div>

        {/* Content block */}
        <Reveal className="min-w-0">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.15] text-[var(--ink)]">
              {step.title}
            </h2>
            <p className="text-[var(--muted)] text-[1.125rem] max-w-[38rem] mt-[10px] leading-relaxed">
              {step.summary}
            </p>

            {/* Panel */}
            <div className="mt-[24px] bg-[var(--surface)] border border-[var(--line)] rounded-[20px] p-[24px] shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[28px]">
                {/* We do */}
                <div>
                  <h3 className="text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--muted)] mb-[12px]">
                    We do
                  </h3>
                  <ul className="flex flex-col gap-[8px]">
                    {step.weDo.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-[10px] text-[0.975rem] text-[var(--ink)] leading-snug"
                      >
                        <span
                          className="w-[6px] h-[6px] rounded-full bg-[var(--ink)]/40 mt-[0.55em] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* You do */}
                <div>
                  <h3 className="text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--muted)] mb-[12px]">
                    You do
                  </h3>
                  <ul className="flex flex-col gap-[8px]">
                    {step.youDo.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-[10px] text-[0.975rem] text-[var(--ink)] leading-snug"
                      >
                        <span
                          className="w-[6px] h-[6px] rounded-full bg-[var(--ink)]/40 mt-[0.55em] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* You get */}
                <div>
                  <h3 className="text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--muted)] mb-[12px]">
                    You get
                  </h3>
                  <div className="bg-[var(--orange-tint)] rounded-[14px] p-[16px] flex items-start gap-[10px]">
                    <Check
                      size={18}
                      className="text-[var(--ink)] shrink-0 mt-[2px]"
                      aria-hidden="true"
                    />
                    <span className="text-[0.975rem] font-semibold text-[var(--ink)] leading-snug">
                      {step.youGet}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }
);
