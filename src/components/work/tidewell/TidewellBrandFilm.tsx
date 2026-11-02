import React from "react";
import { TidewellVideoPlayer } from "./TidewellVideoPlayer";

export function TidewellBrandFilm() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-8">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            02 · Brand film
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            The full sequence.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            The complete 12-second hero spot. A bottle fills with sparkling water, the label locks in,
            and the brand line lands on the signature single fizz.
          </p>
        </div>

        {/* Full-width 16:9 narrative film frame */}
        <div className="w-full">
          <TidewellVideoPlayer
            id="hero-spot"
            src="/work/tidewell/video/hero-spot.mp4"
            poster="/work/tidewell/posters/hero-spot.webp"
            aspectRatio="16/9"
            isLoop={false}
            fizzTime={6.2}
            preload="none"
            ariaLabel="Tidewell hero spot: a bottle fills with sparkling water, then the wordmark and taglines appear."
            caption="Hero spot · 12 s · single fizz at 6.2 s"
            transcript="A bottle fills with procedural sparkling water from below. The central label resolves with 'Drawn from the edge.' and 'Rise to it.' before the final wordmark settles. A crisp audio fizz punctuates the mark at 6.2 s."
          />
        </div>
      </div>
    </section>
  );
}
