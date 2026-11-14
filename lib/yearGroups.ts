import type { YearGroup } from "@/types";

export const YEAR_GROUPS: YearGroup[] = [
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
];

export function yearGroupTrackLabel(yearGroup: YearGroup): string {
  return yearGroup === "Year 8" ? `${yearGroup} · KS3` : `${yearGroup} · GCSE`;
}