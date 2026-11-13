export interface NavItem {
  label: string;
  href: string;
}

export interface SocialItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  email: string;
  whatsapp: string;
  bookingUrl: string;
  whatsappMessage: string;
  socials: SocialItem[];
  nav: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export const site: SiteConfig = {
  name: "Orvilyn",
  tagline: "You’ve got a business. We’ll handle the tech.",
  email: "hello@orvilyn.com",
  whatsapp: "+2348071658176", // TODO: replace; hide in footer if empty
  bookingUrl: "https://calendly.com/somidotunaina/30min",
  whatsappMessage: "Hi Orvilyn, I found you through your website and I’d like to talk about…",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/orvilyn",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@orvilyn5",
    },
  ],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "How we work", href: "/how-we-work" },
    { label: "About", href: "/about" },
  ],
  cta: {
    label: "Tell us what’s annoying you",
    href: "/contact",
  },
};

export const statements = [
  "No jargon.",
  "No disappearing acts.",
  "No surprise bills.",
];
