import type { ExamBoard, YearGroup } from "@/types";

export type PersistedUserProfile = {
  yearGroup: YearGroup;
  examBoard: ExamBoard;
};

export const USER_PROFILE_STORAGE_KEY = "studygrove.userProfile";
export const USER_PROFILE_COOKIE = "studygrove-user-profile";

const YEAR_GROUPS = new Set<YearGroup>([
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
]);

const EXAM_BOARDS = new Set<ExamBoard>([
  "AQA",
  "EDEXCEL",
  "OCR",
  "EDUQAS",
  "WJEC",
  "CCEA",
]);

export function parsePersistedProfile(
  raw: string | undefined | null,
): PersistedUserProfile | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedUserProfile>;
    if (
      parsed.yearGroup &&
      YEAR_GROUPS.has(parsed.yearGroup) &&
      parsed.examBoard &&
      EXAM_BOARDS.has(parsed.examBoard)
    ) {
      return {
        yearGroup: parsed.yearGroup,
        examBoard: parsed.examBoard,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function persistUserProfileOnClient(profile: PersistedUserProfile): void {
  try {
    const json = JSON.stringify(profile);
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, json);
    document.cookie = `${USER_PROFILE_COOKIE}=${encodeURIComponent(json)}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function readUserProfileFromClientStorage(): PersistedUserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    return parsePersistedProfile(
      localStorage.getItem(USER_PROFILE_STORAGE_KEY),
    );
  } catch {
    return null;
  }
}