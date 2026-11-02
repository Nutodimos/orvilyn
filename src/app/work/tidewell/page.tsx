import type { Metadata } from "next";
import { MotionProvider } from "@/components/work/tidewell/motionContext";
import { TidewellHero } from "@/components/work/tidewell/TidewellHero";
import { TidewellIdea } from "@/components/work/tidewell/TidewellIdea";
import { TidewellBrandFilm } from "@/components/work/tidewell/TidewellBrandFilm";
import { TidewellPrinciples } from "@/components/work/tidewell/TidewellPrinciples";
import { TidewellFlavourSystem } from "@/components/work/tidewell/TidewellFlavourSystem";
import { TidewellSocialLoops } from "@/components/work/tidewell/TidewellSocialLoops";
import { TidewellSystem } from "@/components/work/tidewell/TidewellSystem";
import { TidewellCredits } from "@/components/work/tidewell/TidewellCredits";
import { NextProject } from "@/components/work/NextProject";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Tidewell, motion identity | Orvilyn",
  description:
    "A motion system for water at its source. A self-initiated motion identity for a fictional sparkling mineral water, built with procedural water and custom motion curves.",
  openGraph: {
    title: "Tidewell, motion identity | Orvilyn",
    description:
      "A motion system for water at its source. A self-initiated motion identity for a fictional sparkling mineral water, built with procedural water and custom motion curves.",
    url: "https://orvilyn.com/work/tidewell",
    siteName: "Orvilyn",
    images: [
      {
        url: "/work/tidewell/og-tidewell.jpg",
        width: 1200,
        height: 630,
        alt: "Tidewell Motion Identity by Orvilyn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tidewell, motion identity | Orvilyn",
    description:
      "A motion system for water at its source. A self-initiated motion identity for a fictional sparkling mineral water, built with procedural water and custom motion curves.",
    images: ["/work/tidewell/og-tidewell.jpg"],
  },
};

export default function TidewellCaseStudyPage() {
  return (
    <MotionProvider>
      <main id="main" className="min-h-screen">
        {/* Preload hero video poster */}
        <link
          rel="preload"
          as="image"
          href="/work/tidewell/posters/logo-reveal.webp"
          type="image/webp"
        />

        {/* 01: Hero + Logo Reveal Title Card */}
        <TidewellHero />

        {/* 02: The Idea */}
        <TidewellIdea />

        {/* 03: Brand Film (hero-spot full width) */}
        <TidewellBrandFilm />

        {/* 04: Four Principles */}
        <TidewellPrinciples />

        {/* 05: Flavour System */}
        <TidewellFlavourSystem />

        {/* 06: Social Loops (Snap rail on mobile) */}
        <TidewellSocialLoops />

        {/* 07: The System */}
        <TidewellSystem />

        {/* 08: Credits & Disclosures */}
        <TidewellCredits />

        {/* Sequential Navigation & CTA */}
        <NextProject currentSlug="tidewell" />
        <FinalCta />
      </main>
    </MotionProvider>
  );
}
