import { Hero } from "@/components/home/Hero";
import { ServicesTicker } from "@/components/home/ServicesTicker";
import { ProofStrip } from "@/components/home/ProofStrip";
import { Services } from "@/components/home/Services";
import { MoveBand } from "@/components/home/MoveBand";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SelectedWork } from "@/components/home/SelectedWork";
import { StatementBand } from "@/components/home/StatementBand";
import { Testimonials } from "@/components/home/Testimonials";
import { showTestimonials } from "@/data/testimonials";
import { WhyOrvilyn } from "@/components/home/WhyOrvilyn";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesTicker />
      <ProofStrip />
      <Services />
      <MoveBand />
      <HowItWorks />
      <SelectedWork />
      <StatementBand />
      {showTestimonials && <Testimonials />}
      <WhyOrvilyn />
      <FinalCta />
    </>
  );
}
