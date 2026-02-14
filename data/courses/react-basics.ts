import type { SeedTopic } from "@/lib/types";

export const reactTopics: SeedTopic[] = [
  {
    id: "topic-jsx",
    title: "JSX Basics",
    content:
      "JSX lets you write HTML-like syntax in JavaScript. Expressions use curly braces. Components must return a single root element."
  },
  {
    id: "topic-components",
    title: "Components",
    content:
      "Components are reusable UI units. Prefer functional components. Keep them focused and compose larger interfaces from smaller parts."
  },
  {
    id: "topic-props",
    title: "Props",
    content:
      "Props pass data from parent to child. Props are read-only in the child. Destructure them for readability and validate assumptions."
  },
  {
    id: "topic-state",
    title: "State",
    content:
      "State stores mutable data that affects rendering. Use useState for local state and update using functional updates when based on prior value."
  },
  {
    id: "topic-forms",
    title: "Forms",
    content:
      "Controlled inputs sync values with React state. This pattern enables validation, dynamic UI behavior, and submission handling."
  },
  {
    id: "topic-hooks",
    title: "Hooks",
    content:
      "Hooks allow function components to manage state and side effects. Follow Rules of Hooks: only top level and only in React functions."
  },
  {
    id: "topic-useeffect",
    title: "useEffect",
    content:
      "useEffect synchronizes with external systems and handles side effects. Keep dependency arrays accurate to avoid stale state or loops."
  },
  {
    id: "topic-custom-hooks",
    title: "Custom Hooks",
    content:
      "Custom hooks encapsulate reusable stateful logic. Name them with use* and compose built-in hooks to share behavior cleanly."
  }
];
