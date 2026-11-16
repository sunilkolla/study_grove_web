import {
  SYLLABUS_SUBJECTS,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import type { SubjectCode } from "@/types";
import {
  loadFocusPreferences,
  type FocusMode,
} from "@/lib/focusPreferences";

export const SYLLABUS_FOCUS_CHANGED = "studygrove:syllabus-focus-changed";

export const STORAGE_SYLLABUS_FOCUS = "studygrove.syllabusFocusSubject";
const LEGACY_FOCUS_KEY = "studygrove.focusSubject";

export function syllabusSubjectToSubjectCode(
  code: SyllabusSubjectCode,
): SubjectCode {
  const meta = SYLLABUS_SUBJECTS.find((s) => s.code === code);
  return meta?.mapsTo ?? "BIOLOGY";
}

export function readSyllabusFocusSubject(): SyllabusSubjectCode | null {
  if (typeof window === "undefined") return null;
  try {
    migrateLegacyFocusKeys();
    const stored = localStorage.getItem(STORAGE_SYLLABUS_FOCUS);
    const valid = new Set(SYLLABUS_SUBJECTS.map((s) => s.code));
    if (stored && valid.has(stored as SyllabusSubjectCode)) {
      return stored as SyllabusSubjectCode;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function notifySyllabusFocusChanged(
  code: SyllabusSubjectCode,
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(SYLLABUS_FOCUS_CHANGED, { detail: { code } }),
  );
}

export type ResolvedTimerFocus = {
  mode: FocusMode;
  subject: SubjectCode;
};

/** Default for idle timer start: syllabus focus unless user chose custom + sync off. */
export function resolveDefaultTimerFocus(): ResolvedTimerFocus {
  const prefs = loadFocusPreferences();
  if (prefs?.mode === "custom") {
    return { mode: "custom", subject: prefs.subject ?? "BIOLOGY" };
  }
  if (prefs && !prefs.syncWithSyllabus && prefs.subject) {
    return { mode: "subject", subject: prefs.subject };
  }
  const syllabus = readSyllabusFocusSubject();
  if (syllabus) {
    return {
      mode: "subject",
      subject: syllabusSubjectToSubjectCode(syllabus),
    };
  }
  return {
    mode: prefs?.mode ?? "subject",
    subject: prefs?.subject ?? "BIOLOGY",
  };
}

function migrateLegacyFocusKeys(): void {
  if (typeof window === "undefined") return;
  try {
    const legacy = localStorage.getItem(LEGACY_FOCUS_KEY);
    if (!legacy) return;
    const syllabusCodes = new Set(SYLLABUS_SUBJECTS.map((s) => s.code));
    if (syllabusCodes.has(legacy as SyllabusSubjectCode)) {
      if (!localStorage.getItem(STORAGE_SYLLABUS_FOCUS)) {
        localStorage.setItem(STORAGE_SYLLABUS_FOCUS, legacy);
      }
    }
    localStorage.removeItem(LEGACY_FOCUS_KEY);
  } catch {
    /* ignore */
  }
}

export function subjectCodeToLabel(code: SubjectCode): string {
  const fromSyllabus = SYLLABUS_SUBJECTS.find((s) => s.mapsTo === code);
  if (fromSyllabus) return fromSyllabus.label;
  if (code === "ENGLISH_LANGUAGE") return "English";
  if (code === "ENGLISH_LITERATURE") return "English";
  return code.replace(/_/g, " ");
}