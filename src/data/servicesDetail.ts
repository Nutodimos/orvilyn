export interface BuildServiceItem {
  id: string;
  number: string;
  icon: "Globe" | "AppWindow" | "Wrench" | "Smartphone";
  title: string;
  description: string;
  tech: string;
  goodFor: string;
  gets: string[];
  // TODO: placeholder estimates, confirm before setting timelineConfirmed to true.
  timeline: string;
  timelineConfirmed: boolean;
}

export const buildServices: BuildServiceItem[] = [
  {
    id: "websites",
    number: "01",
    icon: "Globe",
    title: "A website that does its job.",
    description: "Shows what you sell and gets people to call, order, or book.",
    tech: "Websites",
    goodFor:
      "Shops, clinics, restaurants, consultants, and anyone who needs to be found and trusted.",
    gets: [
      "A design that looks like your business, not a template",
      "Pages that load fast on any phone",
      "Call, book, or order buttons that actually work",
      "Help at launch, and support after",
    ],
    timeline: "Usually 2 to 4 weeks",
    timelineConfirmed: true,
  },
  {
    id: "web-apps",
    number: "02",
    icon: "AppWindow",
    title: "An app your customers actually log into.",
    description: "Orders, bookings, accounts, all in one place.",
    tech: "Web apps",
    goodFor: "Businesses that take bookings, orders, or memberships online.",
    gets: [
      "Secure sign-up and login",
      "A dashboard for you and your team",
      "The features your customers actually use, nothing they don’t",
      "Built so it can grow with you",
    ],
    timeline: "Usually 6 to 12 weeks",
    timelineConfirmed: true,
  },
  {
    id: "internal-tools",
    number: "03",
    icon: "Wrench",
    title: "A tool that replaces the spreadsheet.",
    description:
      "Your team stops copy-pasting and starts getting things done.",
    tech: "Internal tools",
    goodFor: "Teams stuck in spreadsheets, WhatsApp threads, and copy-pasting.",
    gets: [
      "Screens built around how your team really works",
      "Roles, so people only see what they should",
      "Reports you can export when someone asks",
      "So simple nobody needs a manual. If they do, we got it wrong.",
    ],
    timeline: "Usually 4 to 10 weeks",
    timelineConfirmed: true,
  },
  {
    id: "mobile-apps",
    number: "04",
    icon: "Smartphone",
    title: "Your business, in their pocket.",
    description: "A proper app on iPhone and Android.",
    tech: "Mobile apps",
    goodFor: "Businesses whose customers or staff live on their phones.",
    gets: [
      "A proper app on iPhone and Android",
      "Screens that feel familiar from the first tap",
      "Connected to the same accounts and data as your website or web app",
      "Help with launch, and support after",
    ],
    timeline: "Usually 8 to 16 weeks",
    timelineConfirmed: true,
  },
];
