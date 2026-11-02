import type { Metadata } from "next";
import { OrbitOakMotionProvider } from "@/components/work/orbit-and-oak/motionContext";
import { OrbitOakHero } from "@/components/work/orbit-and-oak/OrbitOakHero";
import { OrbitOakPremise } from "@/components/work/orbit-and-oak/OrbitOakPremise";
import { OrbitOakBrandFilm } from "@/components/work/orbit-and-oak/OrbitOakBrandFilm";
import { OrbitOakExplainerAndSting } from "@/components/work/orbit-and-oak/OrbitOakExplainerAndSting";
import { OrbitOakSocialLoop } from "@/components/work/orbit-and-oak/OrbitOakSocialLoop";
import { OrbitOakSystem } from "@/components/work/orbit-and-oak/OrbitOakSystem";
import { OrbitOakCredits } from "@/components/work/orbit-and-oak/OrbitOakCredits";
import { NextProject } from "@/components/work/NextProject";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Orbit & Oak, motion identity | Orvilyn",
  description:
    "Tactile STEM subscription box for kids aged 6 to 11. Hands-on crafts meet space exploration with character animation and educational storytelling by Orvilyn.",
  openGraph: {
    title: "Orbit & Oak, motion identity | Orvilyn",
    description:
      "Tactile STEM subscription box for kids aged 6 to 11. Hands-on crafts meet space exploration with character animation and educational storytelling by Orvilyn.",
    url: "https://orvilyn.com/work/orbit-and-oak",
    siteName: "Orvilyn",
    images: [
      {
        url: "/work/orbit-and-oak/posters/og-orbit-and-oak.jpg",
        width: 1200,
        height: 630,
        alt: "Orbit & Oak Motion Identity by Orvilyn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit & Oak, motion identity | Orvilyn",
    description:
      "Tactile STEM subscription box for kids aged 6 to 11. Hands-on crafts meet space exploration with character animation and educational storytelling by Orvilyn.",
    images: ["/work/orbit-and-oak/posters/og-orbit-and-oak.jpg"],
  },
};

export default function OrbitOakCaseStudyPage() {
  return (
    <OrbitOakMotionProvider>
      <main id="main" className="min-h-screen">
        {/* Preload hero video poster */}
        <link
          rel="preload"
          as="image"
          href="/work/orbit-and-oak/posters/orbit-oak-logo-sting.webp"
          type="image/webp"
        />

        {/* 01: Hero + Sonic Logo Sting */}
        <OrbitOakHero />

        {/* 02: Concept & Core Premise */}
        <OrbitOakPremise />

        {/* 03: Brand & Unboxing Spot (30s hero reel) */}
        <OrbitOakBrandFilm />

        {/* 04: Seed Explainer (50s) & Character Rig Turnaround */}
        <OrbitOakExplainerAndSting />

        {/* 05: Vertical Social Loop (9:16) */}
        <OrbitOakSocialLoop />

        {/* 06: Design System & Motion Tokens */}
        <OrbitOakSystem />

        {/* 07: Credits & Disclosures */}
        <OrbitOakCredits />

        {/* Sequential Navigation & Call to Action */}
        <NextProject currentSlug="orbit-and-oak" />
        <FinalCta />
      </main>
    </OrbitOakMotionProvider>
  );
}
