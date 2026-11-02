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

export const metadata: Metadata = {
  metadataBase: new URL("https://orvilyn.com"),
  title: "Orvilyn | Websites, apps, and tools for your business",
  description:
    "Orvilyn builds websites, web apps, internal tools, mobile apps, and motion design for businesses that want the tech handled.",
  openGraph: {
    title: "Orvilyn | Websites, apps, and tools for your business",
    description:
      "Orvilyn builds websites, web apps, internal tools, mobile apps, and motion design for businesses that want the tech handled.",
  },
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
