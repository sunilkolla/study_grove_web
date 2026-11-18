import {
  DEFAULT_CURRENT_BY_SUBJECT,
  getSubtopicById,
  SYLLABUS_SUBJECTS,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import { todayIso } from "@/lib/revisionDates";
import type { RevisionTaskKind, SubjectCode, TaskItem } from "@/types";
import { fetchDeckSummaries } from "./flashcardService";
import { fetchTasks } from "./taskService";
import { getSessionUserStats } from "./mockSessionStore";

export type SuggestionDraft = {
  id: string;
  title: string;
  subject: SubjectCode;
  kind: RevisionTaskKind;
  topicNodeId?: string;
  plannedMinutes?: number;
  dueDate: string;
};

const MASTERY_THRESHOLD = 70;

function syllabusCodeFromSubject(subject: SubjectCode): SyllabusSubjectCode {
  const row = SYLLABUS_SUBJECTS.find((s) => s.mapsTo === subject);
  return row?.code ?? "PHYSICS";
}

export async function buildDailySuggestions(
  forDate: string = todayIso(),
): Promise<SuggestionDraft[]> {
  const stats = getSessionUserStats();
  const existing = await fetchTasks();
  const existingIds = new Set(existing.map((t) => t.id));
  const suggestions: SuggestionDraft[] = [];

  for (const sub of SYLLABUS_SUBJECTS) {
    const subtopicId = DEFAULT_CURRENT_BY_SUBJECT[sub.code];
    const st = getSubtopicById(subtopicId);
    if (st && st.masteryPercent < MASTERY_THRESHOLD) {
      const id = `suggest-practice-${st.id}-${forDate}`;
      if (!existingIds.has(id)) {
        suggestions.push({
          id,
          title: `Practice: ${st.name} (10 questions)`,
          subject: st.subject,
          kind: "practice",
          topicNodeId: st.id,
          dueDate: forDate,
        });
      }
    }
  }

  const decks = await fetchDeckSummaries();
  for (const deck of decks) {
    if (deck.dueToday <= 0) continue;
    const id = `suggest-flash-${deck.subject}-${forDate}`;
    if (!existingIds.has(id)) {
      suggestions.push({
        id,
        title: `Flashcard round: ${deck.label} (${deck.dueToday} due)`,
        subject: deck.subject,
        kind: "flashcards",
        dueDate: forDate,
      });
    }
  }

  if (stats.todayFocusMins < stats.targetDailyFocusMins) {
    const focusSubject =
      SYLLABUS_SUBJECTS.find((s) => s.code === "PHYSICS")?.mapsTo ?? "PHYSICS";
    const id = `suggest-focus-${focusSubject}-${forDate}`;
    if (!existingIds.has(id)) {
      suggestions.push({
        id,
        title: `25m Focus: ${focusSubject.replace(/_/g, " ")}`,
        subject: focusSubject,
        kind: "focus",
        plannedMinutes: 25,
        dueDate: forDate,
      });
    }
  }

  const weekAhead = existing.filter(
    (t) => !t.isCompleted && t.dueDate >= forDate && t.dueDate <= forDate,
  );
  void weekAhead;

  return suggestions.slice(0, 6);
}

export function partitionTasksForDay(
  tasks: TaskItem[],
  forDate: string,
  suggestionIds: Set<string>,
): {
  planned: TaskItem[];
  completed: TaskItem[];
  suggestedTaskRows: TaskItem[];
} {
  const dayTasks = tasks.filter((t) => t.dueDate === forDate);
  const completed = dayTasks.filter((t) => t.isCompleted);
  const planned = dayTasks.filter(
    (t) => !t.isCompleted && t.source !== "suggested",
  );
  const suggestedTaskRows = dayTasks.filter(
    (t) => !t.isCompleted && (t.source === "suggested" || suggestionIds.has(t.id)),
  );
  return { planned, completed, suggestedTaskRows };
}

export { syllabusCodeFromSubject };