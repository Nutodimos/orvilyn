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
  socials: SocialItem[];
  nav: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export const site: SiteConfig = {
  name: "Orvane",
  tagline: "You’ve got a business. We’ll handle the tech.",
  email: "hello@example.com", // TODO: replace with real business email
  whatsapp: "", // TODO: replace; hide in footer if empty
  socials: [], // array of { label, href }; hide the Social column if empty
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
