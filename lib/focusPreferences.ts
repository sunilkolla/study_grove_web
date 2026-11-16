import type { FocusDuration } from "@/services/focusService";
import type { SubjectCode } from "@/types";

const DURATION_KEY = "studygrove.focusDuration";
const SUBJECT_KEY = "studygrove.focusSubject";

export type FocusPreferences = {
  duration: FocusDuration;
  subject: SubjectCode;
};

export function loadFocusPreferences(): FocusPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const d = localStorage.getItem(DURATION_KEY);
    const duration =
      d === "50" ? 50 : d === "25" ? 25 : null;
    const subject = localStorage.getItem(SUBJECT_KEY) as SubjectCode | null;
    if (!duration || !subject) return null;
    return { duration, subject };
  } catch {
    return null;
  }
}

export function saveFocusPreferences(prefs: FocusPreferences): void {
  try {
    localStorage.setItem(DURATION_KEY, String(prefs.duration));
    localStorage.setItem(SUBJECT_KEY, prefs.subject);
  } catch {
    /* ignore */
  }
}