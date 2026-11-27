import type { SyllabusSubjectCode } from "@/data/gcseSyllabus";
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

/** Maps quiz subject tab to syllabus navigator subject; ALL has no syllabus scope. */
export function subjectFilterToSyllabusCode(
  filter: SubjectFilter,
): SyllabusSubjectCode | null {
  if (filter === "ALL") return null;
  return filter as SyllabusSubjectCode;
}

export function subjectFilterLabel(filter: SubjectFilter): string {
  if (filter === "ALL") return "All";
  if (filter === "COMPUTER_SCIENCE") return "CS";
  return filter.charAt(0) + filter.slice(1).toLowerCase();
}