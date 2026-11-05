import type { Metadata } from "next";
import { showMoneySection } from "@/data/process";
import { ProcessHero } from "@/components/process/ProcessHero";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { Promises } from "@/components/process/Promises";
import { MoneyNote } from "@/components/process/MoneyNote";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "How we work | Orvilyn",
  description:
    "From first call to launch day and after: how Orvilyn works, step by step, in plain English.",
  alternates: {
    canonical: "/how-we-work",
  },
};

export default function HowWeWorkPage() {
  return (
    <>
      <ProcessHero />
      <ProcessTimeline />
      <Promises />
      {showMoneySection && <MoneyNote />}
      <div className="pt-20 md:pt-28">
        <FinalCta />
      </div>
    </>
  );
}
