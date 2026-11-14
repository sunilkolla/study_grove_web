import { PracticeHubClient } from "@/components/dashboard/PracticeHubClient";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats } from "@/services/userService";

export default async function DashboardPage() {
  const stats = await fetchUserStats();
  const questions = await fetchPracticeQuestions({
    yearGroup: stats.yearGroup,
  });

  return (
    <PracticeHubClient questions={questions} yearGroup={stats.yearGroup} />
  );
}