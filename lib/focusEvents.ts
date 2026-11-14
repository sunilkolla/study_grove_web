export const OPEN_FOCUS_TIMER = "studygrove:open-focus-timer";

export function requestOpenFocusTimer(): void {
  window.dispatchEvent(new CustomEvent(OPEN_FOCUS_TIMER));
}