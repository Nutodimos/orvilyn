import React from "react";
import type { Metadata } from "next";
import { ThanksContent } from "@/components/thanks/ThanksContent";

export const metadata: Metadata = {
  title: "Thank You | Orvilyn",
  description: "We’ve received your note and will be in touch within 24 hours.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return (
    <main className="py-12 md:py-20 flex-1 flex flex-col justify-center">
      <ThanksContent />
    </main>
  );
}
