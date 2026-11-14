"use client";

import { FormEvent, useState } from "react";
import {
  BookOpen,
  CheckSquare,
  Plus,
  Square,
  Target,
} from "lucide-react";
import { yearGroupProfiles } from "@/data/yearGroupProfiles";
import type { SubjectCode, TaskItem, UserStats } from "@/types";
import type { TaskListFilter } from "@/services/taskService";

type ContextDockProps = {
  stats: UserStats;
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (
    title: string,
    subject: SubjectCode,
    dueDateLabel: string,
  ) => void;
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
  const [newTaskDue, setNewTaskDue] = useState("by Today");

  const profile = yearGroupProfiles[stats.yearGroup];
  const targetQuestions = profile?.targetQuestions ?? stats.targetDailyQuestions;

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "today") {
      return task.dueDateLabel.toLowerCase().includes("today");
    }
    if (taskFilter === "upcoming") {
      return !task.dueDateLabel.toLowerCase().includes("today");
    }
    return true;
  });

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const questionsProgressPercent = Math.min(
    100,
    Math.round((stats.todayQuestionsSolved / targetQuestions) * 100),
  );

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim(), newTaskSubject, newTaskDue);
    setNewTaskTitle("");
    setIsAddingTask(false);
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
            <button
              type="button"
              onClick={() => setIsAddingTask((v) => !v)}
              className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-100 dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
              title="Add task"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

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
              <div className="flex items-center gap-1.5">
                <select
                  value={newTaskSubject}
                  onChange={(e) =>
                    setNewTaskSubject(e.target.value as SubjectCode)
                  }
                  className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-700 dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#cdd9ea]"
                >
                  <option value="MATHS">Maths</option>
                  <option value="BIOLOGY">Biology</option>
                  <option value="CHEMISTRY">Chemistry</option>
                  <option value="PHYSICS">Physics</option>
                  <option value="COMPUTER_SCIENCE">CS</option>
                </select>
                <select
                  value={newTaskDue}
                  onChange={(e) => setNewTaskDue(e.target.value)}
                  className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-700 dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#cdd9ea]"
                >
                  <option value="by Today">by Today</option>
                  <option value="by Tomorrow">by Tomorrow</option>
                </select>
                <button
                  type="submit"
                  className="ml-auto rounded bg-[#10B981] px-2 py-0.5 text-[10px] font-semibold text-white"
                >
                  Add
                </button>
              </div>
            </form>
          )}

          <div className="max-h-[min(50vh,420px)] space-y-1 overflow-y-auto pr-0.5">
            {filteredTasks.length === 0 ? (
              <p className="py-6 text-center text-[11px] text-slate-400 dark:text-[#a0b9d9]">
                No tasks for this filter.
              </p>
            ) : (
              filteredTasks.map((task) => (
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
                      <span className="font-semibold text-[#10B981]">
                        {task.subject}
                      </span>
                      <span>·</span>
                      <span>{task.dueDateLabel}</span>
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}