import type { FocusDuration } from "@/services/focusService";
import type { SubjectCode } from "@/types";

const PREFS_KEY = "studygrove.focusTimerPrefs";
const LEGACY_DURATION_KEY = "studygrove.focusDuration";
const LEGACY_SUBJECT_KEY = "studygrove.focusSubject";

export type FocusMode = "subject" | "custom";

export type FocusPreferences = {
  duration: FocusDuration;
  mode: FocusMode;
  subject?: SubjectCode;
  /** When true (default), idle starts follow syllabus focus chip. */
  syncWithSyllabus: boolean;
};

const DEFAULT_PREFS: FocusPreferences = {
  duration: 25,
  mode: "subject",
  subject: "BIOLOGY",
  syncWithSyllabus: true,
};

function migrateLegacyPrefs(): void {
  try {
    const existing = localStorage.getItem(PREFS_KEY);
    if (existing) return;
    const d = localStorage.getItem(LEGACY_DURATION_KEY);
    const duration: FocusDuration = d === "50" ? 50 : 25;
    const subject = localStorage.getItem(LEGACY_SUBJECT_KEY) as SubjectCode | null;
    const prefs: FocusPreferences = {
      duration,
      mode: "subject",
      subject: subject ?? "BIOLOGY",
      syncWithSyllabus: true,
    };
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    localStorage.removeItem(LEGACY_DURATION_KEY);
  } catch {
    /* ignore */
  }
}

export function loadFocusPreferences(): FocusPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    migrateLegacyPrefs();
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw) as Partial<FocusPreferences>;
    const duration: FocusDuration =
      parsed.duration === 50 ? 50 : 25;
    return {
      duration,
      mode: parsed.mode === "custom" ? "custom" : "subject",
      subject: parsed.subject ?? "BIOLOGY",
      syncWithSyllabus: parsed.syncWithSyllabus !== false,
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function saveFocusPreferences(prefs: FocusPreferences): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}