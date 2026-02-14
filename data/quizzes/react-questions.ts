import type { SeedQuiz } from "@/lib/types";

export const reactQuizzes: SeedQuiz[] = [
  {
    id: "quiz-jsx-basics",
    title: "JSX and Component Fundamentals",
    topicId: "topic-jsx",
    questions: [
      {
        id: "q1",
        prompt: "Which syntax embeds a JavaScript expression inside JSX?",
        options: ["<% expression %>", "{expression}", "${expression}", "(expression)"],
        correctAnswer: "{expression}",
        explanation: "JSX expressions are embedded with curly braces."
      },
      {
        id: "q2",
        prompt: "What is the recommended component style in modern React?",
        options: ["Class components only", "Functional components", "Template components", "Inline HTML components"],
        correctAnswer: "Functional components",
        explanation: "Functional components with hooks are the standard approach."
      },
      {
        id: "q3",
        prompt: "Props in a child component are:",
        options: ["Mutable", "Read-only", "Stored in localStorage", "Always numbers"],
        correctAnswer: "Read-only",
        explanation: "Children should treat incoming props as immutable."
      }
    ]
  }
];
