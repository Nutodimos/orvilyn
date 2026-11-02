import React from "react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100svh-72px)] flex items-center bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 md:py-12 lg:py-0 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* Left Column: Text (60% on lg+) */}
          <div className="w-full lg:w-[60%] flex flex-col items-start z-10">
            {/* Headline */}
            <h1 className="text-[var(--ink)] isolate hero-enter-title">
              <span className="block lg:whitespace-nowrap">
                You’ve got a business.
              </span>
              <span className="block lg:whitespace-nowrap">
                <span className="relative inline-block">
                  We’ll handle the tech.
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[6%] h-[0.38em] bg-[var(--orange)] opacity-[0.55] rounded-[4px] -z-10 animate-marker-swipe"
                  />
                </span>
              </span>
            </h1>

            {/* Subline */}
            <div className="mt-6 hero-enter-desc">
              <p className="text-[var(--muted)] text-xl leading-relaxed max-w-[32rem]">
                Websites, apps, and tools that work, with motion that makes them
                feel alive.
              </p>
            </div>

            {/* Buttons Row */}
            <div className="mt-8 relative z-10 hero-enter-actions">
              <div className="relative z-10 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button href={site.cta.href} variant="primary" size="lg">
                    {site.cta.label}
                  </Button>
                </MagneticButton>

                <Button
                  href="/work"
                  variant="link"
                  className="text-base font-semibold py-2 px-1"
                >
                  See our work
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual (40% on lg+) */}
          <div className="w-full lg:w-[40%] flex items-center justify-center relative [&_.aspect-square]:!mt-6 lg:[&_.aspect-square]:!mt-0">
            {/* Soft radial glow behind visual */}
            <div
              className="absolute w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] rounded-full pointer-events-none -z-0 opacity-80"
              style={{
                background:
                  "radial-gradient(circle, var(--orange-tint) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
