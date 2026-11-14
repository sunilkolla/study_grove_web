import { mockTasks } from "@/data/mockTasks";
import { mockUserStats } from "@/data/mockUserStats";
import { yearGroupProfiles } from "@/data/yearGroupProfiles";
import type { TaskItem, UserStats, YearGroup } from "@/types";

/** In-memory session (swap for Supabase in Phase 7). */
let userStats: UserStats = { ...mockUserStats };
let tasks: TaskItem[] = mockTasks.map((t) => ({ ...t }));

export function getSessionUserStats(): UserStats {
  return { ...userStats };
}

export function setSessionUserStats(next: UserStats): void {
  userStats = { ...next };
}

export function getSessionTasks(): TaskItem[] {
  return tasks.map((t) => ({ ...t }));
}

export function setSessionTasks(next: TaskItem[]): void {
  tasks = next.map((t) => ({ ...t }));
}

export function applyYearGroupToStats(yearGroup: YearGroup): UserStats {
  const profile = yearGroupProfiles[yearGroup];
  if (!profile) {
    return { ...userStats, yearGroup };
  }
  return {
    ...userStats,
    yearGroup,
    targetDailyFocusMins: profile.targetFocusMins,
    targetDailyQuestions: profile.targetQuestions,
  };
}