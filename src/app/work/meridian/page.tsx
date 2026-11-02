import type { Metadata } from "next";
import { MeridianMotionProvider } from "@/components/work/meridian/motionContext";
import { MeridianHero } from "@/components/work/meridian/MeridianHero";
import { MeridianPremise } from "@/components/work/meridian/MeridianPremise";
import { MeridianBrandFilm } from "@/components/work/meridian/MeridianBrandFilm";
import { MeridianCutdownAndSting } from "@/components/work/meridian/MeridianCutdownAndSting";
import { MeridianSocialLoop } from "@/components/work/meridian/MeridianSocialLoop";
import { MeridianSystem } from "@/components/work/meridian/MeridianSystem";
import { MeridianCredits } from "@/components/work/meridian/MeridianCredits";
import { NextProject } from "@/components/work/NextProject";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Meridian, motion identity | Orvilyn",
  description:
    "Calm money-tracking app for freelancers, designed with executive challenger fintech vitality. A self-initiated motion identity and product film system by Orvilyn.",
  openGraph: {
    title: "Meridian, motion identity | Orvilyn",
    description:
      "Calm money-tracking app for freelancers, designed with executive challenger fintech vitality. A self-initiated motion identity and product film system by Orvilyn.",
    url: "https://orvilyn.com/work/meridian",
    siteName: "Orvilyn",
    images: [
      {
        url: "/work/meridian/posters/og-meridian.jpg",
        width: 1200,
        height: 630,
        alt: "Meridian Motion Identity by Orvilyn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian, motion identity | Orvilyn",
    description:
      "Calm money-tracking app for freelancers, designed with executive challenger fintech vitality. A self-initiated motion identity and product film system by Orvilyn.",
    images: ["/work/meridian/posters/og-meridian.jpg"],
  },
};

export default function MeridianCaseStudyPage() {
  return (
    <MeridianMotionProvider>
      <main id="main" className="min-h-screen">
        {/* Preload hero video poster */}
        <link
          rel="preload"
          as="image"
          href="/work/meridian/posters/hero-spot.webp"
          type="image/webp"
        />

        {/* 01: Hero + Sonic Bumper Title Card */}
        <MeridianHero />

        {/* 02: The Core Premise & Taglines */}
        <MeridianPremise />

        {/* 03: Brand Film (30s hero master reel) */}
        <MeridianBrandFilm />

        {/* 04: Pre-roll Cutdown (15s) & Sonic Logo Sting (5s) */}
        <MeridianCutdownAndSting />

        {/* 05: Social & Vertical Kiosk Loop (9:16 mobile chassis) */}
        <MeridianSocialLoop />

        {/* 06: Obsidian Design System, Palette & Contact Sheet */}
        <MeridianSystem />

        {/* 07: Credits & Disclosures */}
        <MeridianCredits />

        {/* Sequential Navigation & Call to Action */}
        <NextProject currentSlug="meridian" />
        <FinalCta />
      </main>
    </MeridianMotionProvider>
  );
}
