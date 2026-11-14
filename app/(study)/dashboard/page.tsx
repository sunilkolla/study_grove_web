import { RoutePlaceholder } from "@/components/study/RoutePlaceholder";
import { fetchFlashcards } from "@/services/flashcardService";
import { fetchPracticeQuestions } from "@/services/questionService";
import { getTaskProgress } from "@/services/taskService";
import { fetchUserStats } from "@/services/userService";

export default async function DashboardPage() {
  const stats = await fetchUserStats();
  const questions = await fetchPracticeQuestions({ yearGroup: stats.yearGroup });
  const taskProgress = await getTaskProgress();
  const flashcards = await fetchFlashcards();

  return (
    <div className="space-y-4">
      <RoutePlaceholder
        title="Practice Hub"
        note="Quiz cards and streak widgets — Phase 3+."
      />
      <p className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-xs text-slate-600 dark:border-[#2e4a73] dark:bg-[#1a2437]/90 dark:text-[#a0b9d9]">
        <span className="font-semibold text-[#0F5132] dark:text-[#10B981]">
          Phase 2 data layer:
        </span>{" "}
        {questions.length} practice questions for {stats.yearGroup} ·{" "}
        {taskProgress.completed}/{taskProgress.total} revision tasks in mock
        store · {flashcards.length} flashcards loaded via{" "}
        <code className="font-mono">services/</code>.
      </p>
    </div>
  );
}