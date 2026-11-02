export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  summary: string;
  weDo: string[];
  youDo: string[];
  youGet: string;
}

export interface PromiseItem {
  title: string;
  text: string;
}

export const showMoneySection = false; // TODO: set to true only after payment terms are decided and the MoneyNote copy is confirmed.

export const processSteps: ProcessStep[] = [
  {
    id: "tell",
    number: 1,
    title: "Tell us the mess.",
    summary:
      "A short call, no jargon. You explain what’s annoying you, and we ask the questions that matter.",
    weDo: [
      "Listen first, talk second",
      "Ask what the problem costs you today",
      "Tell you honestly if we’re the right fit",
    ],
    youDo: [
      "Describe the mess in your own words",
      "Share anything you already have (links, files, screenshots)",
      "Tell us what a good result looks like",
    ],
    youGet: "A clear picture of the problem, and an honest yes or no.",
  },
  {
    id: "plan",
    number: 2,
    title: "We make a plan.",
    summary:
      "Scope, timeline, and a fixed price. In writing, in plain English.",
    weDo: [
      "Turn the mess into a short, clear scope",
      "Break the work into stages",
      "Send a fixed-price quote with a timeline",
    ],
    youDo: [
      "Read it and ask questions (that’s the point)",
      "Tell us what to add or cut",
      "Say yes when you’re happy",
    ],
    youGet: "A written plan and a price you can hold us to.",
  },
  {
    id: "build",
    number: 3,
    title: "We build, you watch.",
    summary:
      "Regular updates, no disappearing acts. You see progress as it happens.",
    weDo: [
      "Build in stages and show you each one",
      "Send regular updates, not surprises",
      "Test properly before you ever see it",
    ],
    youDo: [
      "Give feedback when we ask",
      "Send content (text, photos, logos) when needed",
      "Name one person who can make decisions",
    ],
    youGet: "Working software you can click through, not a slide deck.",
  },
  {
    id: "launch",
    number: 4,
    title: "Launch, then we stick around.",
    summary:
      "Support after go-live, so you’re never left holding something you don’t understand.",
    weDo: [
      "Launch it, and check it works in the real world",
      "Walk you or your team through it",
      "Stay on hand for fixes and questions",
    ],
    youDo: [
      "Start using it, and tell us what feels awkward",
      "Keep us posted on what you want next",
    ],
    youGet: "A launched product, and someone to call afterwards.",
  },
];

// TODO: confirm every promise is something you will keep, every time.
export const promises: PromiseItem[] = [
  {
    title: "A fixed-price quote.",
    text: "The price in the quote is the price.",
  },
  {
    title: "Replies within 24 hours.",
    text: "From a real person, every time.",
  },
  {
    title: "No disappearing acts.",
    text: "Regular updates while we build.",
  },
  {
    title: "Support after launch.",
    text: "We stick around once it’s live.",
  },
];
