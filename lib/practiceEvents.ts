const PENDING_SUBTOPIC_KEY = "studygrove.pendingPracticeSubtopic";

export const PRACTICE_SUBTOPIC_PRESET = "studygrove:practice-subtopic-preset";

export function requestPracticeForSubtopic(subtopicId: string): void {
  try {
    localStorage.setItem(PENDING_SUBTOPIC_KEY, subtopicId);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(PRACTICE_SUBTOPIC_PRESET, {
        detail: { subtopicId },
      }),
    );
  }
}

export function consumePendingPracticeSubtopic(): string | null {
  try {
    const id = localStorage.getItem(PENDING_SUBTOPIC_KEY);
    if (id) localStorage.removeItem(PENDING_SUBTOPIC_KEY);
    return id;
  } catch {
    return null;
  }
}