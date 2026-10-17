import type { Metadata } from "next";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact | Orvane",
};

export default function ContactPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-28">
      <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)] mb-4">
        Contact
      </h1>
      <p className="text-[var(--muted)] text-lg mb-6">
        This page is coming soon.
      </p>
      <div className="mb-8">
        <a
          href={`mailto:${site.email}`}
          className="text-lg font-medium text-[var(--orange-strong)] underline underline-offset-4 hover:opacity-85 transition-opacity"
        >
          {site.email}
        </a>
      </div>
      <Button href="/" variant="link">
        Back to home
      </Button>
    </div>
  );
}
