export type MasteryLevel = "NOT_STARTED" | "BEGINNER" | "DEVELOPING" | "PROFICIENT" | "EXPERT";

export type SkillNode = {
  id: string;
  title: string;
  topicId: string;
  masteryLevel: MasteryLevel;
};

export type SkillEdge = {
  from: string;
  fromTitle: string;
  to: string;
};

export type SkillGraphData = {
  skills: SkillNode[];
  edges: SkillEdge[];
};

export type Recommendation = {
  skillId: string;
  topicId: string;
  title: string;
  reason: string;
};

export type DashboardState = {
  mastered: number;
  streak: number;
  minutesThisWeek: number;
  recommendations: Recommendation[];
};

export type AnalyticsState = {
  masteryTrend: { week: string; value: number }[];
  timeByTopic: { topic: string; minutes: number }[];
};

export type InstructorState = {
  activeLearners: number;
  atRisk: { id: string; name: string; reason: string }[];
};

export type SeedTopic = {
  id: string;
  title: string;
  content: string;
};

export type SeedQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type SeedQuiz = {
  id: string;
  title: string;
  topicId: string;
  questions: SeedQuizQuestion[];
};
