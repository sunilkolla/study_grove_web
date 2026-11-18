export const TASKS_CHANGED = "studygrove:tasks-changed";

export function notifyTasksChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TASKS_CHANGED));
  }
}