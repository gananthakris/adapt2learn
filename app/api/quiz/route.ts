import { NextResponse } from "next/server";
import { reactQuizzes } from "@/data/quizzes/react-questions";

export async function GET() {
  const sanitized = reactQuizzes.map((quiz) => ({
    ...quiz,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      options: question.options,
      explanation: question.explanation
    }))
  }));
  return NextResponse.json({ quizzes: sanitized });
}
