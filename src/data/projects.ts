export interface ProjectItem {
  slug: string;
  title: string;
  outcome: string;
  tags: string[];
  live: boolean;
  image: string;
}

export const projects: ProjectItem[] = [
  {
    slug: "project-one",
    title: "Project One (placeholder)",
    outcome: "One-line result goes here.",
    tags: ["Web app"],
    live: true,
    image: "",
  },
  {
    slug: "project-two",
    title: "Project Two (placeholder)",
    outcome: "One-line result goes here.",
    tags: ["Website"],
    live: false,
    image: "",
  },
  {
    slug: "project-three",
    title: "Project Three (placeholder)",
    outcome: "One-line result goes here.",
    tags: ["Internal tool"],
    live: false,
    image: "",
  },
];
