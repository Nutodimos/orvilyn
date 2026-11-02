import React from "react";
import { motionPieces } from "@/data/motion";
import { MotionTile } from "./MotionTile";
import { Reveal } from "@/components/ui/Reveal";

export function MotionSection() {
  const gridColsClass =
    motionPieces.length === 2 || motionPieces.length === 4
      ? "grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <section
      id="motion"
      className="scroll-mt-24 w-full bg-[var(--ink)] text-[var(--bg)] py-24 md:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <span className="block text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--bg)]/60 mb-2">
            Motion
          </span>
          <h2 className="text-[var(--bg)]">Motion work.</h2>
          <p className="text-[var(--bg)]/70 text-[1.125rem] mt-3 max-w-xl">
            Personal pieces that show what motion can do for a brand.
          </p>

          <div className={`grid ${gridColsClass} mt-10`}>
            {motionPieces.map((piece) => (
              <MotionTile key={piece.title} piece={piece} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
