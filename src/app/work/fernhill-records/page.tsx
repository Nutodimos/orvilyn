import type { Metadata } from "next";
import { FernhillMotionProvider } from "@/components/work/fernhill-records/motionContext";
import { FernhillHero } from "@/components/work/fernhill-records/FernhillHero";
import { FernhillPremise } from "@/components/work/fernhill-records/FernhillPremise";
import { FernhillBrandFilm } from "@/components/work/fernhill-records/FernhillBrandFilm";
import { FernhillReleaseTemplate } from "@/components/work/fernhill-records/FernhillReleaseTemplate";
import { FernhillSocialLoops } from "@/components/work/fernhill-records/FernhillSocialLoops";
import { FernhillSystem } from "@/components/work/fernhill-records/FernhillSystem";
import { FernhillCredits } from "@/components/work/fernhill-records/FernhillCredits";
import { NextProject } from "@/components/work/NextProject";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Fernhill Records, motion identity | Orvilyn",
  description:
    "Tactile motion identity & vinyl packaging for an analogue listening bar. Self-initiated motion design for Fernhill Records in Edinburgh.",
  openGraph: {
    title: "Fernhill Records, motion identity | Orvilyn",
    description:
      "Tactile motion identity & vinyl packaging for an analogue listening bar. Self-initiated motion design for Fernhill Records in Edinburgh.",
    url: "https://orvilyn.com/work/fernhill-records",
    siteName: "Orvilyn",
    images: [
      {
        url: "/work/fernhill-records/posters/og-fernhill-records.jpg",
        width: 1200,
        height: 630,
        alt: "Fernhill Records Motion Identity by Orvilyn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernhill Records, motion identity | Orvilyn",
    description:
      "Tactile motion identity & vinyl packaging for an analogue listening bar. Self-initiated motion design for Fernhill Records in Edinburgh.",
    images: ["/work/fernhill-records/posters/og-fernhill-records.jpg"],
  },
};

export default function FernhillRecordsPage() {
  return (
    <FernhillMotionProvider>
      <main id="main" className="min-h-screen">
        {/* Preload hero video poster */}
        <link
          rel="preload"
          as="image"
          href="/work/fernhill-records/posters/logo-sting.webp"
          type="image/webp"
        />

        {/* 01: Hero + Sonic Bumper Title Card */}
        <FernhillHero />

        {/* 02: The Core Premise */}
        <FernhillPremise />

        {/* 03: Brand Film (24s hero master reel) */}
        <FernhillBrandFilm />

        {/* 04: Release Template (album announcement) */}
        <FernhillReleaseTemplate />

        {/* 05: Social & Ambient Loops (9:16 vertical + 16:9 visualiser) */}
        <FernhillSocialLoops />

        {/* 06: The Analogue System & Design Tokens */}
        <FernhillSystem />

        {/* 07: Credits & Disclosures */}
        <FernhillCredits />

        {/* Sequential Navigation & Call to Action */}
        <NextProject currentSlug="fernhill-records" />
        <FinalCta />
      </main>
    </FernhillMotionProvider>
  );
}
