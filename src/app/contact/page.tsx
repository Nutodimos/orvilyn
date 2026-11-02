import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDoors, getDoors } from "@/components/contact/ContactDoors";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";

export const metadata: Metadata = {
  title: "Contact | Orvilyn",
  description:
    "Tell us what’s annoying you. Reach Orvilyn by form, WhatsApp, or a quick booked call.",
};

export default function ContactPage() {
  const doors = getDoors();

  return (
    <main>
      <ContactHero />

      <section className="py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {doors.length > 0 ? (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
              <div className="order-first lg:order-none lg:col-span-5">
                <ContactDoors />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl">
              <ContactForm />
            </div>
          )}
        </div>
      </section>

      <WhatHappensNext />
    </main>
  );
}
