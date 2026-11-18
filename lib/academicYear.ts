import type { AcademicTermId } from "@/types";
import { todayIso } from "@/lib/revisionDates";

export const TERM_LABELS: Record<AcademicTermId, string> = {
  autumn: "Autumn (Sep–Dec)",
  spring: "Spring (Jan–Apr)",
  summer: "Summer (May–Jul)",
};

/** UK-style academic year label for a reference date. */
export function academicYearLabel(ref: Date = new Date()): string {
  const y = ref.getFullYear();
  const m = ref.getMonth();
  if (m >= 8) return `${y}–${String(y + 1).slice(2)}`;
  return `${y - 1}–${String(y).slice(2)}`;
}

export function termForDate(iso: string): AcademicTermId {
  const m = Number(iso.split("-")[1]);
  if (m >= 9) return "autumn";
  if (m >= 5) return "summer";
  return "spring";
}

export function weeksInTerm(termId: AcademicTermId): number {
  if (termId === "summer") return 8;
  return 12;
}

export type DefaultMilestone = {
  id: string;
  date: string;
  label: string;
  type: "mock" | "exam" | "custom";
};

export function defaultMilestonesForYear(
  yearLabel: string,
): DefaultMilestone[] {
  const startYear = Number(yearLabel.slice(0, 4)) || new Date().getFullYear();
  return [
    {
      id: `ms-${startYear}-autumn-mock`,
      date: `${startYear}-11-15`,
      label: "Autumn mock week",
      type: "mock",
    },
    {
      id: `ms-${startYear + 1}-spring-mock`,
      date: `${startYear + 1}-02-10`,
      label: "Spring mock week",
      type: "mock",
    },
    {
      id: `ms-${startYear + 1}-past-papers`,
      date: `${startYear + 1}-04-01`,
      label: "Start past papers",
      type: "custom",
    },
    {
      id: `ms-${startYear + 1}-gcse`,
      date: `${startYear + 1}-05-15`,
      label: "GCSE exams begin",
      type: "exam",
    },
  ];
}

export function termStartIso(termId: AcademicTermId, ref = new Date()): string {
  const y = ref.getFullYear();
  const label = academicYearLabel(ref);
  const startYear = Number(label.slice(0, 4)) || y;
  switch (termId) {
    case "autumn":
      return `${startYear}-09-01`;
    case "spring":
      return `${startYear + 1}-01-06`;
    case "summer":
      return `${startYear + 1}-05-01`;
    default:
      return todayIso(ref);
  }
}