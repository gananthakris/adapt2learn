import { reactTopics } from "@/data/courses/react-basics";
import { reactQuizzes } from "@/data/quizzes/react-questions";
import { recommendNextSkills } from "@/lib/recommendation-rules";
import type { AnalyticsState, DashboardState, InstructorState } from "@/lib/types";

export function getTopicById(topicId: string) {
  return reactTopics.find((topic) => topic.id === topicId) ?? null;
}

export function getQuizById(quizId: string) {
  return reactQuizzes.find((quiz) => quiz.id === quizId) ?? null;
}

export function getSeedDashboardState(): DashboardState {
  return {
    mastered: 4,
    streak: 6,
    minutesThisWeek: 124,
    recommendations: recommendNextSkills(3)
  };
}

export function getSeedAnalyticsState(): AnalyticsState {
  return {
    masteryTrend: [
      { week: "W1", value: 0.32 },
      { week: "W2", value: 0.41 },
      { week: "W3", value: 0.56 },
      { week: "W4", value: 0.63 }
    ],
    timeByTopic: [
      { topic: "JSX", minutes: 28 },
      { topic: "Components", minutes: 24 },
      { topic: "State", minutes: 19 },
      { topic: "Hooks", minutes: 53 }
    ]
  };
}

export function getSeedInstructorState(): InstructorState {
  return {
    activeLearners: 52,
    atRisk: [
      { id: "u1", name: "Sarah Patel", reason: "Low mastery on Hooks and <30 min/week" },
      { id: "u2", name: "Leo Chen", reason: "Declining quiz performance for 2 weeks" }
    ]
  };
}
