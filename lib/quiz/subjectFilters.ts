import type { SubjectCode } from "@/types";

export type SubjectFilter = "ALL" | SubjectCode;

export const QUIZ_SUBJECT_FILTERS: SubjectFilter[] = [
  "ALL",
  "BIOLOGY",
  "MATHS",
  "CHEMISTRY",
  "PHYSICS",
  "COMPUTER_SCIENCE",
];

export function subjectFilterLabel(filter: SubjectFilter): string {
  if (filter === "ALL") return "All";
  if (filter === "COMPUTER_SCIENCE") return "CS";
  return filter.charAt(0) + filter.slice(1).toLowerCase();
}