import { QuizInterface } from "@/components/quiz/quiz-interface";
import { getQuizById } from "@/lib/seed-data";

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const quiz = getQuizById(params.quizId);
  return <QuizInterface quiz={quiz} />;
}
