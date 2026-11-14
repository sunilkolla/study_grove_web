import type { TaskItem } from "@/types";
import { getSessionTasks, setSessionTasks } from "./mockSessionStore";

export type TaskListFilter = "all" | "today" | "upcoming";

export async function fetchTasks(): Promise<TaskItem[]> {
  return getSessionTasks();
}

export async function fetchTasksFiltered(
  filter: TaskListFilter,
): Promise<TaskItem[]> {
  const tasks = await fetchTasks();
  if (filter === "today") {
    return tasks.filter((t) => t.dueDateLabel.toLowerCase().includes("today"));
  }
  if (filter === "upcoming") {
    return tasks.filter((t) => !t.dueDateLabel.toLowerCase().includes("today"));
  }
  return tasks;
}

export async function toggleTaskCompletion(taskId: string): Promise<TaskItem[]> {
  const next = getSessionTasks().map((t) =>
    t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t,
  );
  setSessionTasks(next);
  return next;
}

export async function getTaskProgress(): Promise<{
  completed: number;
  total: number;
}> {
  const tasks = await fetchTasks();
  const completed = tasks.filter((t) => t.isCompleted).length;
  return { completed, total: tasks.length };
}