import { buildInitialFlashcardReviews } from "@/data/mockFlashcardReviews";
import { mockForestTrees } from "@/data/mockForestTrees";
import { mockTasks } from "@/data/mockTasks";
import { mockUserStats } from "@/data/mockUserStats";
import { yearGroupProfiles } from "@/data/yearGroupProfiles";
import type {
  ExamBoard,
  FlashcardReview,
  ForestTree,
  TaskItem,
  UserStats,
  YearGroup,
} from "@/types";

/** In-memory session (swap for Supabase in Phase 7). */
let userStats: UserStats = { ...mockUserStats };
let tasks: TaskItem[] = mockTasks.map((t) => ({ ...t }));
let forestTrees: ForestTree[] = mockForestTrees.map((t) => ({ ...t }));
let flashcardReviews: Record<string, FlashcardReview> = buildInitialFlashcardReviews();

export function getSessionUserStats(): UserStats {
  return {
    ...userStats,
    examBoard: userStats.examBoard ?? "AQA",
  };
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

export function getSessionForestTrees(): ForestTree[] {
  return forestTrees.map((t) => ({ ...t }));
}

export function prependSessionForestTree(tree: ForestTree): void {
  forestTrees = [{ ...tree }, ...forestTrees];
}

export function getSessionFlashcardReviews(): Record<string, FlashcardReview> {
  return Object.fromEntries(
    Object.entries(flashcardReviews).map(([id, r]) => [id, { ...r }]),
  );
}

export function getSessionFlashcardReview(
  flashcardId: string,
): FlashcardReview | undefined {
  const row = flashcardReviews[flashcardId];
  return row ? { ...row } : undefined;
}

export function setSessionFlashcardReview(review: FlashcardReview): void {
  flashcardReviews = {
    ...flashcardReviews,
    [review.flashcardId]: { ...review },
  };
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

export function applyUserProfile(
  yearGroup: YearGroup,
  examBoard: ExamBoard,
): UserStats {
  const withYear = applyYearGroupToStats(yearGroup);
  return { ...withYear, examBoard };
}