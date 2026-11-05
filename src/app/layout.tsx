import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const title = "Orvilyn | Websites, apps, and tools for your business";
const description =
  "Orvilyn builds websites, web apps, internal tools, mobile apps, and motion design for businesses that want the tech handled.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://orvilyn.com"
  ),
  title,
  description,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title,
    description,
    siteName: "Orvilyn",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Orvilyn",
  url: "https://orvilyn.com",
  logo: "https://orvilyn.com/brand/logo-mark.png",
  image: "https://orvilyn.com/opengraph-image",
  description,
  founder: {
    "@type": "Person",
    name: "Somidotun Aina",
    jobTitle: "Founder & Lead Engineer",
  },
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@orvilyn.com",
  },
  knowsAbout: [
    "Web Development",
    "Web Applications",
    "Internal Tools",
    "Mobile Applications",
    "Motion Design",
    "Next.js",
    "React",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased font-[var(--font-body)] flex flex-col">
        {/* Skip to content accessible link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--surface)] focus:text-[var(--ink)] focus:border focus:border-[var(--line)] focus:rounded-lg focus:shadow-lg focus:font-semibold"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
