import type { FocusMode } from "@/lib/focusPreferences";
import type { SubjectCode } from "@/types";

export const OPEN_FOCUS_TIMER = "studygrove:open-focus-timer";
export const FOCUS_PRESET = "studygrove:focus-preset";

export type FocusPresetDetail = {
  subject?: SubjectCode;
  mode?: FocusMode;
};

export function requestOpenFocusTimer(): void {
  window.dispatchEvent(new CustomEvent(OPEN_FOCUS_TIMER));
}

export function requestFocusPresetForSubject(subject: SubjectCode): void {
  window.dispatchEvent(
    new CustomEvent(FOCUS_PRESET, { detail: { subject, mode: "subject" } }),
  );
  requestOpenFocusTimer();
}

export function requestFocusPresetCustom(): void {
  window.dispatchEvent(
    new CustomEvent(FOCUS_PRESET, { detail: { mode: "custom" } }),
  );
  requestOpenFocusTimer();
}