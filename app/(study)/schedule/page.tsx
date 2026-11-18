import { connection } from "next/server";
import { Suspense } from "react";
import { ScheduleHubClient } from "@/components/schedule/ScheduleHubClient";
import { todayIso } from "@/lib/revisionDates";
import { buildDailySuggestions } from "@/services/revisionSuggester";
import { fetchAcademicYearPlan } from "@/services/scheduleService";
import { fetchTasks, getWeekProgress } from "@/services/taskService";

export default async function SchedulePage() {
  await connection();
  const today = todayIso();
  const [tasks, plan, weekProgress, suggestions] = await Promise.all([
    fetchTasks(),
    fetchAcademicYearPlan(),
    getWeekProgress(),
    buildDailySuggestions(today),
  ]);

  return (
    <Suspense fallback={<p className="p-6 text-sm text-slate-500">Loading schedule…</p>}>
      <ScheduleHubClient
        initialTasks={tasks}
        initialPlan={plan}
        initialWeekProgress={weekProgress}
        initialSuggestions={suggestions}
      />
    </Suspense>
  );
}