import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Mission } from "@/components/about/Mission";
import { BuiltSection } from "@/components/about/BuiltSection";
import { StudioNote } from "@/components/about/StudioNote";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "About | Orvilyn",
  description:
    "Meet Somidotun, the founder of Orvilyn: an independent studio helping small and medium businesses find their footing online.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <BuiltSection />
      <StudioNote />
      <div className="pt-16 md:pt-24">
        <FinalCta />
      </div>
    </>
  );
}
