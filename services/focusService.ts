import type { SubjectCode, UserStats } from "@/types";
import {
  forestTreeFromFocusSession,
  recordForestTree,
} from "./groveService";
import { getSessionUserStats, setSessionUserStats } from "./mockSessionStore";

export type FocusDuration = 25 | 50;

export function treeLabelForDuration(durationMins: FocusDuration): string {
  return durationMins === 50 ? "Mature Tree" : "Sapling";
}

export function xpForFocusDuration(durationMins: FocusDuration): number {
  return durationMins === 50 ? 150 : 50;
}

/** Completed session: +1 tree, focus mins, XP (25m = Sapling, 50m = Mature Tree). */
export async function completeFocusSession(
  durationMins: FocusDuration,
  subject: SubjectCode,
): Promise<UserStats> {
  const current = getSessionUserStats();
  const next: UserStats = {
    ...current,
    totalXP: current.totalXP + xpForFocusDuration(durationMins),
    todayFocusMins: current.todayFocusMins + durationMins,
    forestTreesCount: current.forestTreesCount + 1,
  };
  setSessionUserStats(next);
  recordForestTree(forestTreeFromFocusSession(durationMins, subject));
  return next;
}