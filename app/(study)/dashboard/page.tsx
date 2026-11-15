import { connection } from "next/server";
import { PracticeHubClient } from "@/components/dashboard/PracticeHubClient";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats } from "@/services/userService";

export default async function DashboardPage() {
  await connection();
  const stats = await fetchUserStats();
  const questions = await fetchPracticeQuestions({
    yearGroup: stats.yearGroup,
    examBoard: stats.examBoard,
  });

  return (
    <PracticeHubClient
      questions={questions}
      yearGroup={stats.yearGroup}
      userStats={{
        name: stats.name,
        yearGroup: stats.yearGroup,
        dailyStreak: stats.dailyStreak,
        todayQuestionsSolved: stats.todayQuestionsSolved,
      }}
    />
  );
}