import type { ShellUserStats, YearGroup } from "@/types/shell";

export const initialShellStats: ShellUserStats = {
  name: "Hansi",
  yearGroup: "Year 10",
  school: "St. Dunstan Academy",
  dailyStreak: 5,
  totalXP: 2450,
  level: 12,
  currentLevelXP: 450,
  xpForNextLevel: 1000,
  todayQuestionsSolved: 14,
  forestTreesCount: 18,
};

export function statsForYearGroup(
  base: ShellUserStats,
  yearGroup: YearGroup,
): ShellUserStats {
  return { ...base, yearGroup };
}