export interface StepItem {
  number: number;
  title: string;
  text: string;
}

export const steps: StepItem[] = [
  {
    number: 1,
    title: "Tell us the mess.",
    text: "A short call, no jargon.",
  },
  {
    number: 2,
    title: "We make a plan.",
    text: "Scope, timeline, and a fixed price.",
  },
  {
    number: 3,
    title: "We build, you watch.",
    text: "Regular updates, no disappearing acts.",
  },
  {
    number: 4,
    title: "Launch, then we stick around.",
    text: "Support after go-live.",
  },
];
