import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Work | Orvane",
};

export default function WorkPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-28">
      <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)] mb-4">
        Work
      </h1>
      <p className="text-[var(--muted)] text-lg mb-8">
        This page is coming soon.
      </p>
      <Button href="/" variant="link">
        Back to home
      </Button>
    </div>
  );
}
