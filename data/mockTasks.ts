import type { TaskItem } from "@/types";
import {
  addDaysIso,
  formatDueDateLabel,
  todayIso,
} from "@/lib/revisionDates";

const today = todayIso();
const tomorrow = addDaysIso(today, 1);
const inWeek = addDaysIso(today, 5);

export const mockTasks: TaskItem[] = [
  {
    id: "task-1",
    title: "Solve 10 GCSE practice questions on Science",
    subject: "BIOLOGY",
    dueDate: today,
    dueDateLabel: formatDueDateLabel(today),
    isCompleted: false,
    priority: "high",
    source: "manual",
    kind: "practice",
    topicNodeId: "BIOLOGY-4.1.1",
  },
  {
    id: "task-2",
    title: "Complete Daily 5 Spaced Retrieval round",
    subject: "BIOLOGY",
    dueDate: today,
    dueDateLabel: formatDueDateLabel(today),
    isCompleted: true,
    priority: "medium",
    source: "manual",
    kind: "flashcards",
  },
  {
    id: "task-3",
    title: "Edexcel Trigonometric Graphs practice set (Q1-Q8)",
    subject: "MATHS",
    dueDate: tomorrow,
    dueDateLabel: formatDueDateLabel(tomorrow),
    isCompleted: false,
    priority: "high",
    source: "manual",
    kind: "practice",
  },
  {
    id: "task-4",
    title: "Review physics equation flashcards (Ek = ½mv², Ep = mgh)",
    subject: "PHYSICS",
    dueDate: tomorrow,
    dueDateLabel: formatDueDateLabel(tomorrow),
    isCompleted: false,
    priority: "medium",
    source: "manual",
    kind: "flashcards",
  },
  {
    id: "task-5",
    title: "Practice half-equations on Electrolysis",
    subject: "CHEMISTRY",
    dueDate: inWeek,
    dueDateLabel: formatDueDateLabel(inWeek),
    isCompleted: false,
    priority: "low",
    source: "manual",
    kind: "practice",
  },
];