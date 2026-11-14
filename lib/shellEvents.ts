export const SHELL_DATA_CHANGED = "studygrove:data-changed";

export function notifyShellDataChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SHELL_DATA_CHANGED));
  }
}