"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Plus,
  Square,
  Target,
} from "lucide-react";
import { yearGroupProfiles } from "@/data/yearGroupProfiles";
import { FOCUS_SUBJECT_OPTIONS } from "@/lib/focusSubjectOptions";
import {
  dismissSuggestionId,
  loadDismissedSuggestionIds,
} from "@/lib/dismissedSuggestions";
import {
  isUpcomingWithinDays,
  todayIso,
} from "@/lib/revisionDates";
import { TASK_KIND_META } from "@/lib/taskDisplay";
import {
  buildDailySuggestions,
  type SuggestionDraft,
} from "@/services/revisionSuggester";
import type { CreateTaskInput } from "@/services/taskService";
import type { RevisionTaskKind, SubjectCode, TaskItem, UserStats } from "@/types";
import type { TaskListFilter } from "@/services/taskService";
import { RevisionTaskRow } from "@/components/schedule/RevisionTaskRow";
import { createTask } from "@/services/taskService";
import { notifyTasksChanged } from "@/lib/scheduleEvents";

type ContextDockProps = {
  stats: UserStats;
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (input: CreateTaskInput) => void;
  onQuickPractice: () => void;
};

export function ContextDock({
  stats,
  tasks,
  onToggleTask,
  onAddTask,
  onQuickPractice,
}: ContextDockProps) {
  const [taskFilter, setTaskFilter] = useState<TaskListFilter>("all");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState<SubjectCode>("MATHS");
  const [newTaskDue, setNewTaskDue] = useState(todayIso());
  const [newTaskKind, setNewTaskKind] = useState<RevisionTaskKind>("custom");
  const [suggestions, setSuggestions] = useState<SuggestionDraft[]>([]);

  const profile = yearGroupProfiles[stats.yearGroup];
  const targetQuestions = profile?.targetQuestions ?? stats.targetDailyQuestions;
  const today = todayIso();

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "today") return task.dueDate === today;
    if (taskFilter === "upcoming") {
      return isUpcomingWithinDays(task.dueDate, 14);
    }
    return true;
  });

  useEffect(() => {
    void (async () => {
      const drafts = await buildDailySuggestions(today);
      const dismissed = loadDismissedSuggestionIds();
      setSuggestions(drafts.filter((d) => !dismissed.has(d.id)));
    })();
  }, [today, tasks]);

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const questionsProgressPercent = Math.min(
    100,
    Math.round((stats.todayQuestionsSolved / targetQuestions) * 100),
  );
  const focusProgressPercent = Math.min(
    100,
    Math.round(
      (stats.todayFocusMins / Math.max(1, stats.targetDailyFocusMins)) * 100,
    ),
  );

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask({
      title: newTaskTitle.trim(),
      subject: newTaskSubject,
      dueDate: newTaskDue,
      kind: newTaskKind,
      source: "manual",
    });
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  const acceptSuggestion = async (s: SuggestionDraft) => {
    await createTask({
      id: s.id,
      title: s.title,
      subject: s.subject,
      dueDate: s.dueDate,
      kind: s.kind,
      source: "suggested",
      topicNodeId: s.topicNodeId,
      plannedMinutes: s.plannedMinutes,
    });
    notifyTasksChanged();
    setSuggestions((prev) => prev.filter((x) => x.id !== s.id));
  };

  const dismissSuggestion = (id: string) => {
    dismissSuggestionId(id);
    setSuggestions((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <aside
      className="sticky top-0 flex h-[calc(100vh-4rem)] w-[320px] shrink-0 flex-col overflow-y-auto border-l border-slate-200/80 bg-white p-4 transition-colors duration-200 select-none dark:border-[#2e4a73]/60 dark:bg-[#1a2437]"
      aria-label="Practice target and tasks"
    >
      <div className="space-y-4">
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-[#2e4a73] dark:bg-[#273853]">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white">
              <Target className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Daily Practice Target</span>
            </div>
            <span className="rounded bg-emerald-100/80 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {stats.accuracyToday}% Acc
            </span>
          </div>

          <div>
            <div className="mb-1 flex items-baseline justify-between text-xs">
              <span className="font-mono text-base font-extrabold tabular-nums text-slate-800 dark:text-white">
                {stats.todayQuestionsSolved} / {targetQuestions} solved
              </span>
              <span className="text-[10px] text-slate-500 dark:text-[#a0b9d9]">
                {questionsProgressPercent}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-[#1a2437]">
              <div
                className="h-full rounded-full bg-[#10B981] transition-all duration-500"
                style={{ width: `${questionsProgressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onQuickPractice}
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#10B981] py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            <BookOpen className="h-3 w-3" />
            Quick Practice Next (+25 XP)
          </button>
        </div>

        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-[#f4f7fb]">
              <span>Revision Tasks</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-slate-600 dark:bg-[#273853] dark:text-[#a0b9d9]">
                {completedCount}/{tasks.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/schedule"
                className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-100 dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
                title="Open schedule"
              >
                <Calendar className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsAddingTask((v) => !v)}
                className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-100 dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
                title="Add task"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="mb-2 rounded-lg border border-emerald-200 bg-emerald-50/80 p-2 text-[10px] dark:border-emerald-800 dark:bg-emerald-950/30">
              <p className="mb-1 font-bold text-emerald-800 dark:text-emerald-300">
                {suggestions.length} suggestion{suggestions.length === 1 ? "" : "s"}{" "}
                for today
              </p>
              <Link href="/schedule" className="font-semibold text-emerald-700 underline dark:text-emerald-400">
                Review in Schedule →
              </Link>
            </div>
          )}

          <div className="mb-2 grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-0.5 text-center text-[10px] font-medium text-slate-500 dark:bg-[#273853] dark:text-[#a0b9d9]">
            {(["all", "today", "upcoming"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTaskFilter(filter)}
                className={`rounded-md py-1 capitalize transition-colors ${
                  taskFilter === filter
                    ? "bg-white font-semibold text-slate-800 shadow-sm dark:bg-[#1a2437] dark:text-[#f4f7fb]"
                    : "hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {isAddingTask && (
            <form
              onSubmit={handleCreateTask}
              className="mb-2 space-y-1.5 rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] dark:border-[#2e4a73] dark:bg-[#273853]"
            >
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. 5 Maths questions"
                className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-slate-800 placeholder:text-slate-400 focus:outline-none dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#f4f7fb]"
                autoFocus
              />
              <select
                value={newTaskKind}
                onChange={(e) =>
                  setNewTaskKind(e.target.value as RevisionTaskKind)
                }
                className="w-full rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] dark:border-[#2e4a73] dark:bg-[#1a2437]"
              >
                <option value="practice">Practice</option>
                <option value="flashcards">Flashcards</option>
                <option value="focus">Focus</option>
                <option value="custom">Custom</option>
              </select>
              <div className="flex items-center gap-1.5">
                <select
                  value={newTaskSubject}
                  onChange={(e) =>
                    setNewTaskSubject(e.target.value as SubjectCode)
                  }
                  className="min-w-0 flex-1 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-700 dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#cdd9ea]"
                >
                  {FOCUS_SUBJECT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newTaskDue}
                  onChange={(e) => setNewTaskDue(e.target.value)}
                  className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[10px] dark:border-[#2e4a73] dark:bg-[#1a2437]"
                />
                <button
                  type="submit"
                  className="ml-auto rounded bg-[#10B981] px-2 py-0.5 text-[10px] font-semibold text-white"
                >
                  Add
                </button>
              </div>
            </form>
          )}

          <div className="max-h-[min(40vh,360px)] space-y-1 overflow-y-auto pr-0.5">
            {suggestions.slice(0, 2).map((s) => (
              <RevisionTaskRow
                key={s.id}
                item={s}
                isSuggestion
                onAcceptSuggestion={() => void acceptSuggestion(s)}
                onDismiss={() => dismissSuggestion(s.id)}
              />
            ))}
            {filteredTasks.length === 0 && suggestions.length === 0 ? (
              <p className="py-6 text-center text-[11px] text-slate-400 dark:text-[#a0b9d9]">
                No tasks for this filter.
              </p>
            ) : (
              filteredTasks.map((task) => {
                const meta = TASK_KIND_META[task.kind];
                const Icon = meta.Icon;
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    className={`group flex w-full cursor-pointer items-start gap-2 rounded-lg border p-2 text-left transition-all ${
                      task.isCompleted
                        ? "border-slate-100 bg-slate-50/80 opacity-70 dark:border-[#2e4a73]/40 dark:bg-[#273853]/40"
                        : "border-slate-200 bg-white hover:border-[#10B981] dark:border-[#2e4a73] dark:bg-[#273853] dark:hover:border-emerald-500"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-emerald-600">
                      {task.isCompleted ? (
                        <CheckSquare className="h-3.5 w-3.5 fill-emerald-100 text-emerald-600 dark:fill-emerald-950" />
                      ) : (
                        <Square className="h-3.5 w-3.5 text-slate-300 group-hover:text-[#10B981] dark:text-[#a0b9d9]" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[11px] leading-tight ${
                          task.isCompleted
                            ? "text-slate-400 line-through"
                            : "font-medium text-slate-800 dark:text-[#f4f7fb]"
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[9px] text-slate-400 dark:text-[#a0b9d9]">
                        <Icon className="h-3 w-3 text-[#10B981]" />
                        <span className="font-semibold text-[#10B981]">
                          {task.subject.replace(/_/g, " ")}
                        </span>
                        <span>·</span>
                        <span>{task.dueDateLabel}</span>
                      </span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}