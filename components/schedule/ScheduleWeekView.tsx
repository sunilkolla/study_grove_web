"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import { addDaysIso, parseIso } from "@/lib/revisionDates";
import { FOCUS_SUBJECT_OPTIONS } from "@/lib/focusSubjectOptions";
import type { RevisionTaskKind, SubjectCode, TaskItem } from "@/types";
import { RevisionTaskRow } from "./RevisionTaskRow";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type ScheduleWeekViewProps = {
  weekMonday: string;
  tasks: TaskItem[];
  onToggle: (id: string) => void;
  onAddTask: (input: {
    title: string;
    subject: SubjectCode;
    dueDate: string;
    kind: RevisionTaskKind;
  }) => void;
};

export function ScheduleWeekView({
  weekMonday,
  tasks,
  onToggle,
  onAddTask,
}: ScheduleWeekViewProps) {
  const [addDay, setAddDay] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<SubjectCode>("MATHS");
  const [kind, setKind] = useState<RevisionTaskKind>("practice");

  const days = DAY_NAMES.map((label, i) => ({
    label,
    iso: addDaysIso(weekMonday, i),
  }));

  const handleSubmit = (e: FormEvent, dueDate: string) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title: title.trim(), subject, dueDate, kind });
    setTitle("");
    setAddDay(null);
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {days.map((day) => {
        const dayTasks = tasks.filter((t) => t.dueDate === day.iso);
        const dt = parseIso(day.iso);
        const dateNum = dt.getDate();
        return (
          <div
            key={day.iso}
            className="flex min-h-[140px] flex-col rounded-xl border border-slate-200 bg-white p-2 dark:border-[#2e4a73] dark:bg-[#273853]"
          >
            <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-1 dark:border-[#2e4a73]">
              <span className="text-xs font-extrabold text-slate-800 dark:text-white">
                {day.label}{" "}
                <span className="font-semibold text-slate-400">{dateNum}</span>
              </span>
              <button
                type="button"
                onClick={() => setAddDay(addDay === day.iso ? null : day.iso)}
                className="rounded p-0.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1a2437]"
                aria-label={`Add task on ${day.label}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            {addDay === day.iso && (
              <form
                onSubmit={(e) => handleSubmit(e, day.iso)}
                className="mb-2 space-y-1 border-b border-dashed border-slate-200 pb-2 text-[10px] dark:border-[#2e4a73]"
              >
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full rounded border border-slate-200 px-1.5 py-1 dark:border-[#2e4a73] dark:bg-[#1a2437]"
                />
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as SubjectCode)}
                  className="w-full rounded border border-slate-200 px-1 dark:border-[#2e4a73] dark:bg-[#1a2437]"
                >
                  {FOCUS_SUBJECT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as RevisionTaskKind)}
                  className="w-full rounded border border-slate-200 px-1 dark:border-[#2e4a73] dark:bg-[#1a2437]"
                >
                  <option value="practice">Practice</option>
                  <option value="flashcards">Flashcards</option>
                  <option value="focus">Focus</option>
                  <option value="custom">Custom</option>
                </select>
                <button
                  type="submit"
                  className="w-full rounded bg-[#10B981] py-1 font-bold text-white"
                >
                  Add
                </button>
              </form>
            )}
            <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
              {dayTasks.length === 0 ? (
                <p className="py-4 text-center text-[10px] text-slate-400">
                  No tasks
                </p>
              ) : (
                dayTasks.map((t) => (
                  <RevisionTaskRow
                    key={t.id}
                    item={t}
                    onToggle={() => onToggle(t.id)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}