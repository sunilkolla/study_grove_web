import { Suspense } from "react";
import { connection } from "next/server";
import { QuizzesPageClient } from "@/components/quiz/QuizzesPageClient";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats } from "@/services/userService";

export default async function QuizzesPage() {
  await connection();
  const stats = await fetchUserStats();
  const questions = await fetchPracticeQuestions({
    yearGroup: stats.yearGroup,
    examBoard: stats.examBoard,
  });

  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
      <QuizzesPageClient
        questions={questions}
        yearGroup={stats.yearGroup}
        examBoard={stats.examBoard}
      />
    </Suspense>
  );
}