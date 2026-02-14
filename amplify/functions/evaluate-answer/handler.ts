import type { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  const userAnswer = String(event?.arguments?.userAnswer ?? "").trim().toLowerCase();
  const correctAnswer = String(event?.arguments?.correctAnswer ?? "").trim().toLowerCase();
  const isCorrect = userAnswer === correctAnswer;

  return {
    isCorrect,
    feedback: isCorrect
      ? "Correct. Move to a slightly harder item."
      : "Not quite. Review the concept and retry with a concrete code example."
  };
};
