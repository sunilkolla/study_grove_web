import type { FocusMode } from "@/lib/focusPreferences";
import type { SubjectCode } from "@/types";

export type FocusSessionPhase = "idle" | "running" | "paused" | "completed";

export const OPEN_FOCUS_TIMER = "studygrove:open-focus-timer";
export const FOCUS_PRESET = "studygrove:focus-preset";
export const FOCUS_SESSION_CHANGED = "studygrove:focus-session-changed";
export const FOCUS_TOGGLE = "studygrove:focus-toggle";
export const FOCUS_RESET = "studygrove:focus-reset";

export type FocusSessionBroadcast = {
  phase: FocusSessionPhase;
  formattedTime: string;
  selectedDuration: number;
  isLive: boolean;
  focusMode: FocusMode;
  subject: SubjectCode;
  treeLabel: string;
};

export type FocusPresetDetail = {
  subject?: SubjectCode;
  mode?: FocusMode;
};

export function requestOpenFocusTimer(): void {
  window.dispatchEvent(new CustomEvent(OPEN_FOCUS_TIMER));
}

export function requestFocusToggle(): void {
  window.dispatchEvent(new CustomEvent(FOCUS_TOGGLE));
}

export function requestFocusReset(): void {
  window.dispatchEvent(new CustomEvent(FOCUS_RESET));
}

export function broadcastFocusSession(detail: FocusSessionBroadcast): void {
  window.dispatchEvent(
    new CustomEvent(FOCUS_SESSION_CHANGED, { detail }),
  );
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