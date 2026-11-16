import type { MasteryStatus } from "@/types";

export function masteryStatusFromPercent(percent: number): MasteryStatus {
  if (percent >= 80) return "GREEN";
  if (percent >= 50) return "YELLOW";
  return "RED";
}

export function masteryLabel(status: MasteryStatus): string {
  if (status === "GREEN") return "Mastered";
  if (status === "YELLOW") return "Growing";
  return "Needs Work";
}

export function masteryBadgeClasses(status: MasteryStatus): string {
  switch (status) {
    case "GREEN":
      return "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800";
    case "YELLOW":
      return "bg-amber-100 text-amber-900 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:ring-amber-800";
    default:
      return "bg-rose-100 text-rose-800 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:ring-rose-800";
  }
}

export function masteryDotClasses(status: MasteryStatus): string {
  switch (status) {
    case "GREEN":
      return "bg-emerald-500";
    case "YELLOW":
      return "bg-amber-400";
    default:
      return "bg-rose-500";
  }
}