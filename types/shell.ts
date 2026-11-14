export type YearGroup = "Year 9" | "Year 10" | "Year 11";

export interface ShellUserStats {
  name: string;
  yearGroup: YearGroup;
  school: string;
  dailyStreak: number;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  xpForNextLevel: number;
  todayQuestionsSolved: number;
  forestTreesCount: number;
}

export const STUDY_NAV_ROUTES = [
  "/dashboard",
  "/focus",
  "/schedule",
  "/mindmaps",
  "/flashcards",
  "/quizzes",
  "/settings",
] as const;

export type StudyNavHref = (typeof STUDY_NAV_ROUTES)[number];