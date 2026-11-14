import type { TaskItem } from "@/types";

export const mockTasks: TaskItem[] = [
  {
    "id": "task-1",
    "title": "Solve 10 GCSE practice questions on Science",
    "subject": "BIOLOGY",
    "dueDateLabel": "by Today",
    "isCompleted": false,
    "priority": "high"
  },
  {
    "id": "task-2",
    "title": "Complete Daily 5 Spaced Retrieval round",
    "subject": "BIOLOGY",
    "dueDateLabel": "by Today",
    "isCompleted": true,
    "priority": "medium"
  },
  {
    "id": "task-3",
    "title": "Edexcel Trigonometric Graphs practice set (Q1-Q8)",
    "subject": "MATHS",
    "dueDateLabel": "by Tomorrow",
    "isCompleted": false,
    "priority": "high"
  },
  {
    "id": "task-4",
    "title": "Review physics equation flashcards (Ek = ½mv², Ep = mgh)",
    "subject": "PHYSICS",
    "dueDateLabel": "by Tomorrow",
    "isCompleted": false,
    "priority": "medium"
  },
  {
    "id": "task-5",
    "title": "Practice half-equations on Electrolysis",
    "subject": "CHEMISTRY",
    "dueDateLabel": "by 5 Jul",
    "isCompleted": false,
    "priority": "low"
  }
];
