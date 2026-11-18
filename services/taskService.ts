import type {
  AcademicTermId,
  RevisionTaskKind,
  RevisionTaskSource,
  SubjectCode,
  TaskItem,
} from "@/types";
import {
  addDaysIso,
  formatDueDateLabel,
  isUpcomingWithinDays,
  mondayOfWeekIso,
  parseLegacyDueLabel,
  todayIso,
} from "@/lib/revisionDates";
import { getSessionTasks, setSessionTasks } from "./mockSessionStore";

export type TaskListFilter = "all" | "today" | "upcoming";

const UPCOMING_DAYS = 14;

export function normalizeTask(raw: TaskItem): TaskItem {
  const dueDate =
    raw.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(raw.dueDate)
      ? raw.dueDate
      : parseLegacyDueLabel(raw.dueDateLabel ?? "by Today");
  return {
    ...raw,
    dueDate,
    dueDateLabel: formatDueDateLabel(dueDate),
    source: raw.source ?? "manual",
    kind: raw.kind ?? "custom",
    weekOf: raw.weekOf ?? mondayOfWeekIso(dueDate),
  };
}

function normalizeAll(tasks: TaskItem[]): TaskItem[] {
  return tasks.map(normalizeTask);
}

export async function fetchTasks(): Promise<TaskItem[]> {
  return normalizeAll(getSessionTasks());
}

function matchesFilter(task: TaskItem, filter: TaskListFilter): boolean {
  const today = todayIso();
  if (filter === "today") return task.dueDate === today;
  if (filter === "upcoming") {
    return isUpcomingWithinDays(task.dueDate, UPCOMING_DAYS);
  }
  return true;
}

export async function fetchTasksFiltered(
  filter: TaskListFilter,
): Promise<TaskItem[]> {
  const tasks = await fetchTasks();
  return tasks.filter((t) => matchesFilter(t, filter));
}

export async function fetchTasksForDate(iso: string): Promise<TaskItem[]> {
  const tasks = await fetchTasks();
  return tasks.filter((t) => t.dueDate === iso);
}

export async function fetchTasksForWeek(weekMonday: string): Promise<TaskItem[]> {
  const end = addDaysIso(weekMonday, 6);
  const tasks = await fetchTasks();
  return tasks.filter((t) => t.dueDate >= weekMonday && t.dueDate <= end);
}

export async function getWeekProgress(): Promise<{
  completed: number;
  total: number;
}> {
  const monday = mondayOfWeekIso(todayIso());
  const weekTasks = await fetchTasksForWeek(monday);
  return {
    completed: weekTasks.filter((t) => t.isCompleted).length,
    total: weekTasks.length,
  };
}

export async function toggleTaskCompletion(taskId: string): Promise<{
  tasks: TaskItem[];
  justCompleted: boolean;
}> {
  let justCompleted = false;
  const next = normalizeAll(getSessionTasks()).map((t) => {
    if (t.id !== taskId) return t;
    const isCompleted = !t.isCompleted;
    if (isCompleted && !t.isCompleted) justCompleted = true;
    return { ...t, isCompleted };
  });
  setSessionTasks(next);
  return { tasks: next, justCompleted };
}

export type CreateTaskInput = {
  title: string;
  subject: SubjectCode;
  dueDate?: string;
  dueDateLabel?: string;
  kind?: RevisionTaskKind;
  source?: RevisionTaskSource;
  topicNodeId?: string;
  plannedMinutes?: number;
  termId?: AcademicTermId;
  id?: string;
  priority?: TaskItem["priority"];
};

export async function createTask(input: CreateTaskInput): Promise<TaskItem[]> {
  const dueDate =
    input.dueDate ??
    (input.dueDateLabel
      ? parseLegacyDueLabel(input.dueDateLabel)
      : todayIso());
  const newTask = normalizeTask({
    id: input.id ?? `task-${Date.now()}`,
    title: input.title,
    subject: input.subject,
    dueDate,
    dueDateLabel: formatDueDateLabel(dueDate),
    isCompleted: false,
    priority: input.priority ?? "medium",
    source: input.source ?? "manual",
    kind: input.kind ?? "custom",
    topicNodeId: input.topicNodeId,
    plannedMinutes: input.plannedMinutes,
    termId: input.termId,
    weekOf: mondayOfWeekIso(dueDate),
  });
  const existing = normalizeAll(getSessionTasks());
  if (existing.some((t) => t.id === newTask.id)) return existing;
  setSessionTasks([newTask, ...existing]);
  return getSessionTasks();
}

/** @deprecated Use createTask with dueDate */
export async function createTaskLegacy(input: {
  title: string;
  subject: SubjectCode;
  dueDateLabel: string;
}): Promise<TaskItem[]> {
  return createTask({
    title: input.title,
    subject: input.subject,
    dueDateLabel: input.dueDateLabel,
  });
}

export async function updateTaskDueDate(
  taskId: string,
  dueDate: string,
): Promise<TaskItem[]> {
  const next = normalizeAll(getSessionTasks()).map((t) =>
    t.id === taskId
      ? {
          ...t,
          dueDate,
          dueDateLabel: formatDueDateLabel(dueDate),
          weekOf: mondayOfWeekIso(dueDate),
        }
      : t,
  );
  setSessionTasks(next);
  return next;
}

export async function upsertTask(task: TaskItem): Promise<TaskItem[]> {
  const normalized = normalizeTask(task);
  const existing = normalizeAll(getSessionTasks());
  const idx = existing.findIndex((t) => t.id === normalized.id);
  if (idx >= 0) {
    const next = [...existing];
    next[idx] = normalized;
    setSessionTasks(next);
    return next;
  }
  setSessionTasks([normalized, ...existing]);
  return getSessionTasks();
}

export async function bulkCreateTasks(
  items: CreateTaskInput[],
): Promise<TaskItem[]> {
  let list = normalizeAll(getSessionTasks());
  for (const input of items) {
    const dueDate =
      input.dueDate ??
      (input.dueDateLabel
        ? parseLegacyDueLabel(input.dueDateLabel)
        : todayIso());
    const newTask = normalizeTask({
      id: input.id ?? `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: input.title,
      subject: input.subject,
      dueDate,
      dueDateLabel: formatDueDateLabel(dueDate),
      isCompleted: false,
      priority: input.priority ?? "medium",
      source: input.source ?? "manual",
      kind: input.kind ?? "custom",
      topicNodeId: input.topicNodeId,
      plannedMinutes: input.plannedMinutes,
      termId: input.termId,
      weekOf: mondayOfWeekIso(dueDate),
    });
    if (!list.some((t) => t.id === newTask.id)) {
      list = [newTask, ...list];
    }
  }
  setSessionTasks(list);
  return list;
}

export async function getTaskProgress(): Promise<{
  completed: number;
  total: number;
}> {
  const tasks = await fetchTasks();
  const completed = tasks.filter((t) => t.isCompleted).length;
  return { completed, total: tasks.length };
}