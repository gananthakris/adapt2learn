import { reactTopics } from "@/data/courses/react-basics";
import { reactQuizzes } from "@/data/quizzes/react-questions";
import { recommendNextSkills } from "@/lib/recommendation-rules";
import type { AnalyticsState, DashboardState, InstructorState, StudentProgress, SkillGap, AtRiskStudent } from "@/lib/types";

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

function calculateAtRiskStudents(students: StudentProgress[]): AtRiskStudent[] {
  return students
    .map(student => {
      const reasons: string[] = [];

      // Low mastery (<30%)
      if (student.overallProgress < 30) {
        reasons.push('Low overall mastery');
      }

      // Inactive (>3 days)
      if (student.lastActive.includes('day') && parseInt(student.lastActive) >= 3) {
        reasons.push('Inactive for 3+ days');
      }

      // No streak
      if (student.streak === 0) {
        reasons.push('No active streak');
      }

      if (reasons.length === 0) return null;

      return {
        id: student.id,
        name: student.name,
        reasons,
        overallProgress: student.overallProgress,
        lastActive: student.lastActive,
        riskLevel: (student.overallProgress < 20 ? 'high' :
                   student.overallProgress < 35 ? 'medium' : 'low') as 'high' | 'medium' | 'low'
      };
    })
    .filter((s): s is AtRiskStudent => s !== null);
}

export function getSeedInstructorState(): InstructorState {
  // Mock student data
  const students: StudentProgress[] = [
    { id: 's1', name: 'Emma Rodriguez', overallProgress: 85, lastActive: '2 hrs ago', streak: 12, isAtRisk: false, skillMastery: [] },
    { id: 's2', name: 'Liam Chen', overallProgress: 72, lastActive: '5 hrs ago', streak: 8, isAtRisk: false, skillMastery: [] },
    { id: 's3', name: 'Olivia Patel', overallProgress: 28, lastActive: '4 days ago', streak: 0, isAtRisk: true, skillMastery: [] },
    { id: 's4', name: 'Noah Kim', overallProgress: 91, lastActive: '1 hr ago', streak: 15, isAtRisk: false, skillMastery: [] },
    { id: 's5', name: 'Ava Thompson', overallProgress: 63, lastActive: '1 day ago', streak: 3, isAtRisk: false, skillMastery: [] },
    { id: 's6', name: 'Ethan Williams', overallProgress: 45, lastActive: '3 hrs ago', streak: 5, isAtRisk: false, skillMastery: [] },
    { id: 's7', name: 'Sophia Martinez', overallProgress: 78, lastActive: '4 hrs ago', streak: 9, isAtRisk: false, skillMastery: [] },
    { id: 's8', name: 'Mason Lee', overallProgress: 18, lastActive: '5 days ago', streak: 0, isAtRisk: true, skillMastery: [] },
    { id: 's9', name: 'Isabella Garcia', overallProgress: 82, lastActive: '2 hrs ago', streak: 11, isAtRisk: false, skillMastery: [] },
    { id: 's10', name: 'James Brown', overallProgress: 55, lastActive: '1 day ago', streak: 4, isAtRisk: false, skillMastery: [] },
    { id: 's11', name: 'Mia Davis', overallProgress: 67, lastActive: '6 hrs ago', streak: 7, isAtRisk: false, skillMastery: [] },
    { id: 's12', name: 'Lucas Wilson', overallProgress: 41, lastActive: '2 days ago', streak: 0, isAtRisk: false, skillMastery: [] },
    { id: 's13', name: 'Charlotte Anderson', overallProgress: 88, lastActive: '3 hrs ago', streak: 13, isAtRisk: false, skillMastery: [] },
    { id: 's14', name: 'Benjamin Taylor', overallProgress: 23, lastActive: '6 days ago', streak: 0, isAtRisk: true, skillMastery: [] },
    { id: 's15', name: 'Amelia Thomas', overallProgress: 74, lastActive: '5 hrs ago', streak: 6, isAtRisk: false, skillMastery: [] },
    { id: 's16', name: 'Oliver Jackson', overallProgress: 59, lastActive: '1 day ago', streak: 5, isAtRisk: false, skillMastery: [] },
    { id: 's17', name: 'Harper White', overallProgress: 92, lastActive: '1 hr ago', streak: 18, isAtRisk: false, skillMastery: [] },
    { id: 's18', name: 'Elijah Harris', overallProgress: 36, lastActive: '3 days ago', streak: 0, isAtRisk: true, skillMastery: [] },
    { id: 's19', name: 'Evelyn Martin', overallProgress: 80, lastActive: '4 hrs ago', streak: 10, isAtRisk: false, skillMastery: [] },
    { id: 's20', name: 'Alexander Clark', overallProgress: 48, lastActive: '2 days ago', streak: 2, isAtRisk: false, skillMastery: [] },
    { id: 's21', name: 'Abigail Lewis', overallProgress: 71, lastActive: '7 hrs ago', streak: 8, isAtRisk: false, skillMastery: [] },
    { id: 's22', name: 'Michael Robinson', overallProgress: 65, lastActive: '1 day ago', streak: 6, isAtRisk: false, skillMastery: [] },
    { id: 's23', name: 'Emily Walker', overallProgress: 53, lastActive: '5 hrs ago', streak: 4, isAtRisk: false, skillMastery: [] },
    { id: 's24', name: 'Daniel Hall', overallProgress: 77, lastActive: '3 hrs ago', streak: 9, isAtRisk: false, skillMastery: [] }
  ];

  // Mock skill gaps
  const skillGaps: SkillGap[] = [
    { skillId: 'state', skillName: 'State Management', strugglingCount: 8, totalStudents: 24, percentage: 33, strugglingStudentIds: ['s3', 's8', 's14', 's18', 's12', 's20', 's6', 's23'] },
    { skillId: 'hooks', skillName: 'React Hooks', strugglingCount: 8, totalStudents: 24, percentage: 33, strugglingStudentIds: ['s3', 's8', 's14', 's18', 's12', 's20', 's6', 's23'] },
    { skillId: 'props', skillName: 'Props & Data Flow', strugglingCount: 5, totalStudents: 24, percentage: 21, strugglingStudentIds: ['s3', 's8', 's14', 's18', 's12'] },
    { skillId: 'components', skillName: 'Component Design', strugglingCount: 3, totalStudents: 24, percentage: 13, strugglingStudentIds: ['s3', 's8', 's14'] },
    { skillId: 'jsx', skillName: 'JSX Syntax', strugglingCount: 2, totalStudents: 24, percentage: 8, strugglingStudentIds: ['s8', 's14'] }
  ];

  // Calculate at-risk students
  const atRiskStudents = calculateAtRiskStudents(students);

  // Calculate metrics
  const totalStudents = students.length;
  const averageMastery = Math.round(
    students.reduce((sum, s) => sum + s.overallProgress, 0) / totalStudents
  );
  const activeToday = students.filter(s => s.lastActive.includes('hr')).length;
  const atRiskCount = atRiskStudents.length;

  return {
    currentClass: 'react-101',
    availableClasses: [
      { id: 'react-101', name: 'React 101' },
      { id: 'python-201', name: 'Python 201' },
      { id: 'ts-fundamentals', name: 'TypeScript Fundamentals' }
    ],
    totalStudents,
    averageMastery,
    activeToday,
    atRiskCount,
    skillGaps,
    students,
    atRiskStudents
  };
}
