import type { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  const topicId = event?.arguments?.topicId;
  const difficulty = event?.arguments?.difficulty;
  const questionCount = event?.arguments?.questionCount ?? 5;

  return {
    topicId,
    difficulty,
    questionCount,
    questions: [
      {
        prompt: "What does React state represent?",
        questionType: "MCQ",
        options: ["Static constants", "Mutable UI data", "CSS declarations", "Build artifacts"],
        correctAnswer: "Mutable UI data"
      }
    ]
  };
};
