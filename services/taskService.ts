import type { SubjectCode, TaskItem } from "@/types";
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

export async function toggleTaskCompletion(taskId: string): Promise<{
  tasks: TaskItem[];
  justCompleted: boolean;
}> {
  let justCompleted = false;
  const next = getSessionTasks().map((t) => {
    if (t.id !== taskId) return t;
    const isCompleted = !t.isCompleted;
    if (isCompleted && !t.isCompleted) justCompleted = true;
    return { ...t, isCompleted };
  });
  setSessionTasks(next);
  return { tasks: next, justCompleted };
}

export async function createTask(input: {
  title: string;
  subject: SubjectCode;
  dueDateLabel: string;
}): Promise<TaskItem[]> {
  const newTask: TaskItem = {
    id: `task-${Date.now()}`,
    title: input.title,
    subject: input.subject,
    dueDateLabel: input.dueDateLabel,
    isCompleted: false,
    priority: "medium",
  };
  setSessionTasks([newTask, ...getSessionTasks()]);
  return getSessionTasks();
}

export async function getTaskProgress(): Promise<{
  completed: number;
  total: number;
}> {
  const tasks = await fetchTasks();
  const completed = tasks.filter((t) => t.isCompleted).length;
  return { completed, total: tasks.length };
}