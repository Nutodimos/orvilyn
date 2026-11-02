import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceRow } from "@/components/services/ServiceRow";
import { TimelineNote } from "@/components/services/TimelineNote";
import { ScopeStatement } from "@/components/services/ScopeStatement";
import { Faq } from "@/components/services/Faq";
import { MoveBand } from "@/components/home/MoveBand";
import { FinalCta } from "@/components/home/FinalCta";
import { buildServices } from "@/data/servicesDetail";

export const metadata: Metadata = {
  title: "Services | Orvilyn",
  description:
    "Websites, web apps, internal tools, mobile apps, and motion design, explained in plain English.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      {buildServices.map((service) => (
        <ServiceRow key={service.id} item={service} />
      ))}
      <TimelineNote />
      <div id="motion" className="scroll-mt-24">
        <MoveBand />
      </div>
      <ScopeStatement />
      <Faq />
      <FinalCta />
    </>
  );
}
