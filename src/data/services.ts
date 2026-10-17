export type ServiceGroup = "build" | "move";

export interface ServiceItem {
  group: ServiceGroup;
  icon: "Globe" | "AppWindow" | "Wrench" | "Smartphone" | "Clapperboard";
  title: string;
  description: string;
  tech: string;
}

export const services: ServiceItem[] = [
  {
    group: "build",
    icon: "Globe",
    title: "A website that does its job.",
    description: "Shows what you sell and gets people to call, order, or book.",
    tech: "Websites",
  },
  {
    group: "build",
    icon: "AppWindow",
    title: "An app your customers actually log into.",
    description: "Orders, bookings, accounts, all in one place.",
    tech: "Web apps",
  },
  {
    group: "build",
    icon: "Wrench",
    title: "A tool that replaces the spreadsheet.",
    description: "Your team stops copy-pasting and starts getting things done.",
    tech: "Internal tools",
  },
  {
    group: "build",
    icon: "Smartphone",
    title: "Your business, in their pocket.",
    description: "A proper app on iPhone and Android.",
    tech: "Mobile apps",
  },
  {
    group: "move",
    icon: "Clapperboard",
    title: "Motion that makes people stop scrolling.",
    description: "Logo animations, promo clips, and explainers.",
    tech: "Motion design",
  },
];
