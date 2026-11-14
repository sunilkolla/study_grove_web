import Link from "next/link";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats } from "@/services/userService";

export default async function QuizzesPage() {
  const stats = await fetchUserStats();
  const questions = await fetchPracticeQuestions();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800 dark:text-[#f4f7fb]">
        Question Bank
      </h1>
      <p className="text-sm text-slate-500 dark:text-[#a0b9d9]">
        {questions.length} GCSE practice questions across Years 9–11. Play from
        the{" "}
        <Link
          href="/dashboard"
          className="font-medium text-[#0F5132] underline-offset-2 hover:underline dark:text-[#10B981]"
        >
          Practice Hub
        </Link>
        .
      </p>
      <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-[#2e4a73] dark:border-[#2e4a73] dark:bg-[#1a2437]">
        {questions.map((q) => (
          <li key={q.id} className="p-4 text-sm">
            <p className="text-xs font-semibold text-[#10B981]">
              {q.subjectName} · {q.yearGroup} · {q.examBoard}
            </p>
            <p className="mt-1 font-medium text-slate-800 dark:text-[#f4f7fb]">
              {q.questionText}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-[#a0b9d9]">
              {q.topicName} · +{q.xpReward} XP
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}