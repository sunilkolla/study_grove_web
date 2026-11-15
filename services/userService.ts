import type { ExamBoard, ShellUserStats, UserStats, YearGroup } from "@/types";
import {
  applyUserProfile,
  applyYearGroupToStats,
  getSessionUserStats,
  setSessionUserStats,
} from "./mockSessionStore";

export function toShellStats(stats: UserStats): ShellUserStats {
  return {
    name: stats.name,
    yearGroup: stats.yearGroup,
    examBoard: stats.examBoard,
    school: stats.school,
    dailyStreak: stats.dailyStreak,
    totalXP: stats.totalXP,
    level: stats.level,
    currentLevelXP: stats.currentLevelXP,
    xpForNextLevel: stats.xpForNextLevel,
    todayQuestionsSolved: stats.todayQuestionsSolved,
    forestTreesCount: stats.forestTreesCount,
  };
}

/** Mock-backed; returns a Promise for Supabase-shaped call sites. */
export async function fetchUserStats(): Promise<UserStats> {
  return getSessionUserStats();
}

export async function fetchShellUserStats(): Promise<ShellUserStats> {
  return toShellStats(getSessionUserStats());
}

export async function updateUserYearGroup(yearGroup: YearGroup): Promise<UserStats> {
  const current = getSessionUserStats();
  const next = applyUserProfile(yearGroup, current.examBoard);
  setSessionUserStats(next);
  return next;
}

export type UserProfileUpdate = {
  yearGroup: YearGroup;
  examBoard: ExamBoard;
};

export async function updateUserProfile(
  update: UserProfileUpdate,
): Promise<UserStats> {
  const next = applyUserProfile(update.yearGroup, update.examBoard);
  setSessionUserStats(next);
  return next;
}

export async function awardTaskCompletionXp(amount = 25): Promise<UserStats> {
  const current = getSessionUserStats();
  const next: UserStats = {
    ...current,
    totalXP: current.totalXP + amount,
  };
  setSessionUserStats(next);
  return next;
}

export async function awardFlashcardReviewXp(amount: number): Promise<UserStats> {
  const current = getSessionUserStats();
  const next: UserStats = {
    ...current,
    totalXP: current.totalXP + amount,
  };
  setSessionUserStats(next);
  return next;
}

export async function recordQuestionAnswered(
  isCorrect: boolean,
  xpAwarded: number,
): Promise<UserStats> {
  const current = getSessionUserStats();
  const next: UserStats = {
    ...current,
    todayQuestionsSolved: current.todayQuestionsSolved + 1,
    totalXP: current.totalXP + xpAwarded,
    accuracyToday: isCorrect
      ? Math.min(100, Math.round(current.accuracyToday * 0.9 + 10))
      : Math.max(40, Math.round(current.accuracyToday * 0.9)),
  };
  setSessionUserStats(next);
  return next;
}