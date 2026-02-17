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

export type SkillGap = {
  skillId: string;
  skillName: string;
  strugglingCount: number;
  totalStudents: number;
  percentage: number;
  strugglingStudentIds: string[];
};

export type StudentProgress = {
  id: string;
  name: string;
  overallProgress: number; // 0-100
  lastActive: string; // "2 hrs ago", "1 day ago"
  streak: number;
  isAtRisk: boolean;
  skillMastery: { skillId: string; mastery: number }[];
};

export type AtRiskStudent = {
  id: string;
  name: string;
  reasons: string[]; // Multiple risk factors
  overallProgress: number;
  lastActive: string;
  riskLevel: 'high' | 'medium' | 'low';
};

export type InstructorState = {
  // Class selector
  currentClass: string;
  availableClasses: { id: string; name: string }[];

  // 4-card overview
  totalStudents: number;
  averageMastery: number;
  activeToday: number;
  atRiskCount: number;

  // Skill gaps
  skillGaps: SkillGap[];

  // Students table
  students: StudentProgress[];

  // At-risk students (enhanced)
  atRiskStudents: AtRiskStudent[];
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
