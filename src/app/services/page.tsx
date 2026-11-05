import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceRow } from "@/components/services/ServiceRow";
import { TimelineNote } from "@/components/services/TimelineNote";
import { ScopeStatement } from "@/components/services/ScopeStatement";
import { Faq, faqItems } from "@/components/services/Faq";
import { MoveBand } from "@/components/home/MoveBand";
import { FinalCta } from "@/components/home/FinalCta";
import { buildServices } from "@/data/servicesDetail";

export const metadata: Metadata = {
  title: "Services | Orvilyn",
  description:
    "Websites, web apps, internal tools, mobile apps, and motion design, explained in plain English.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Orvilyn",
    description:
      "Websites, web apps, internal tools, mobile apps, and motion design, explained in plain English.",
    url: "/services",
    siteName: "Orvilyn",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
