"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  addDaysIso,
  formatDueDateLabel,
  mondayOfWeekIso,
  parseIso,
  todayIso,
} from "@/lib/revisionDates";
import { dismissSuggestionId, loadDismissedSuggestionIds } from "@/lib/dismissedSuggestions";
import { notifyTasksChanged, TASKS_CHANGED } from "@/lib/scheduleEvents";
import type { SyllabusSubjectCode } from "@/data/gcseSyllabus";
import {
  addMilestoneReminderTasks,
  fetchAcademicYearPlan,
  spreadMainTopicToWeekTasks,
} from "@/services/scheduleService";
import {
  buildDailySuggestions,
  type SuggestionDraft,
} from "@/services/revisionSuggester";
import {
  createTask,
  fetchTasks,
  getWeekProgress,
  toggleTaskCompletion,
} from "@/services/taskService";
import type { AcademicTermId, AcademicYearPlan, RevisionTaskKind, SubjectCode, TaskItem } from "@/types";
import { ScheduleDayView } from "./ScheduleDayView";
import { ScheduleWeekView } from "./ScheduleWeekView";
import { ScheduleYearView } from "./ScheduleYearView";

type ScheduleView = "day" | "week" | "year";

type ScheduleHubClientProps = {
  initialTasks: TaskItem[];
  initialPlan: AcademicYearPlan;
  initialWeekProgress: { completed: number; total: number };
  initialSuggestions: SuggestionDraft[];
};

function formatDayHeading(iso: string): string {
  const dt = parseIso(iso);
  return dt.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function ScheduleHubClient({
  initialTasks,
  initialPlan,
  initialWeekProgress,
  initialSuggestions,
}: ScheduleHubClientProps) {
  const searchParams = useSearchParams();
  const [view, setView] = useState<ScheduleView>(
    (searchParams.get("view") as ScheduleView) || "day",
  );
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date") ?? todayIso(),
  );
  const [tasks, setTasks] = useState(initialTasks);
  const [plan, setPlan] = useState(initialPlan);
  const [weekProgress, setWeekProgress] = useState(initialWeekProgress);
  const [suggestions, setSuggestions] =
    useState<SuggestionDraft[]>(initialSuggestions);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const weekMonday = useMemo(
    () => mondayOfWeekIso(selectedDate),
    [selectedDate],
  );

  const refresh = useCallback(async () => {
    const [nextTasks, nextPlan, nextWeek, nextSuggestions] = await Promise.all([
      fetchTasks(),
      fetchAcademicYearPlan(),
      getWeekProgress(),
      buildDailySuggestions(selectedDate),
    ]);
    setTasks(nextTasks);
    setPlan(nextPlan);
    setWeekProgress(nextWeek);
    setSuggestions(nextSuggestions);
  }, [selectedDate]);

  useEffect(() => {
    setDismissed(loadDismissedSuggestionIds());
  }, []);

  useEffect(() => {
    const onTasks = () => void refresh();
    window.addEventListener(TASKS_CHANGED, onTasks);
    return () => window.removeEventListener(TASKS_CHANGED, onTasks);
  }, [refresh]);

  useEffect(() => {
    void refresh();
  }, [selectedDate, refresh]);

  const visibleSuggestions = suggestions.filter((s) => !dismissed.has(s.id));

  const dayTasks = tasks.filter((t) => t.dueDate === selectedDate);
  const planned = dayTasks.filter(
    (t) => !t.isCompleted && t.source !== "suggested",
  );
  const completed = dayTasks.filter((t) => t.isCompleted);

  const handleToggle = async (id: string) => {
    await toggleTaskCompletion(id);
    notifyTasksChanged();
    await refresh();
  };

  const handleAcceptSuggestion = async (s: SuggestionDraft) => {
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
    await refresh();
  };

  const handleDismissSuggestion = (id: string) => {
    dismissSuggestionId(id);
    setDismissed(loadDismissedSuggestionIds());
  };

  const handleAddWeekTask = async (input: {
    title: string;
    subject: SubjectCode;
    dueDate: string;
    kind: RevisionTaskKind;
  }) => {
    await createTask({ ...input, source: "manual" });
    notifyTasksChanged();
    await refresh();
  };

  const handleSpreadTopic = async (
    syllabusSubject: SyllabusSubjectCode,
    mainTopicId: string,
    termId: AcademicTermId,
  ) => {
    await spreadMainTopicToWeekTasks({
      syllabusSubject,
      mainTopicId,
      termId,
    });
    notifyTasksChanged();
    setPlan(await fetchAcademicYearPlan());
    await refresh();
  };

  const handleMilestoneReminders = async () => {
    await addMilestoneReminderTasks();
    notifyTasksChanged();
    await refresh();
  };

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <header className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f5132] via-[#0f5132]/95 to-[#1e293b] px-5 py-6 text-white shadow-md sm:px-8">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-200/80">
          <Calendar className="h-3.5 w-3.5" aria-hidden />
          Plan your revision
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Schedule &amp; Revision Tasks
        </h1>
        <p className="mt-2 max-w-xl text-sm text-emerald-50/90">
          Build a daily habit, map your week, and see the whole academic year at
          a glance.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-lg bg-white/10 px-3 py-1 font-semibold">
            {plan.yearLabel}
          </span>
          <span className="text-emerald-100">
            This week: {weekProgress.completed}/{weekProgress.total} done
          </span>
          <button
            type="button"
            onClick={() => setView("week")}
            className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-[#0f5132] hover:bg-slate-100"
          >
            Plan my week
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl bg-slate-100 p-0.5 text-xs font-bold dark:bg-[#273853]">
          {(["day", "week", "year"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-lg px-4 py-2 capitalize transition ${
                view === v
                  ? "bg-white text-slate-900 shadow-sm dark:bg-[#1a2437] dark:text-white"
                  : "text-slate-500 dark:text-[#a0b9d9]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {view === "day" && (
          <div className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => setSelectedDate(addDaysIso(selectedDate, -1))}
              className="rounded-lg border border-slate-200 p-1.5 dark:border-[#2e4a73]"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedDate(todayIso())}
              className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-bold dark:border-[#2e4a73]"
            >
              Today
            </button>
            <span className="min-w-[140px] text-center font-semibold text-slate-800 dark:text-white">
              {formatDueDateLabel(selectedDate)}
            </span>
            <button
              type="button"
              onClick={() => setSelectedDate(addDaysIso(selectedDate, 1))}
              className="rounded-lg border border-slate-200 p-1.5 dark:border-[#2e4a73]"
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {view === "day" && (
        <ScheduleDayView
          dateLabel={formatDayHeading(selectedDate)}
          planned={planned}
          completed={completed}
          suggestions={visibleSuggestions}
          onToggle={(id) => void handleToggle(id)}
          onAcceptSuggestion={(s) => void handleAcceptSuggestion(s)}
          onDismissSuggestion={handleDismissSuggestion}
        />
      )}

      {view === "week" && (
        <ScheduleWeekView
          weekMonday={weekMonday}
          tasks={tasks}
          onToggle={(id) => void handleToggle(id)}
          onAddTask={(input) => void handleAddWeekTask(input)}
        />
      )}

      {view === "year" && (
        <ScheduleYearView
          plan={plan}
          onSpreadTopic={handleSpreadTopic}
          onMilestoneReminders={handleMilestoneReminders}
        />
      )}
    </section>
  );
}