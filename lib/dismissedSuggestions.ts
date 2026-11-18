const KEY = "studygrove.dismissedRevisionSuggestions";

export function loadDismissedSuggestionIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set();
  }
}

export function dismissSuggestionId(id: string): void {
  try {
    const set = loadDismissedSuggestionIds();
    set.add(id);
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}