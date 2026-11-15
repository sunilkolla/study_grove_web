"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { StudyStreakIndicator } from "@/components/dashboard/StudyStreakIndicator";
import { PracticeQuizSection } from "@/components/quiz/PracticeQuizSection";
import { notifyShellDataChanged } from "@/lib/shellEvents";
import { recordQuestionAnswered } from "@/services/userService";
import type { PracticeQuestion, UserStats, YearGroup } from "@/types";

type PracticeHubClientProps = {
  questions: PracticeQuestion[];
  yearGroup: YearGroup;
  userStats: Pick<
    UserStats,
    "name" | "yearGroup" | "dailyStreak" | "todayQuestionsSolved"
  >;
};

export function PracticeHubClient({
  questions,
  yearGroup,
  userStats,
}: PracticeHubClientProps) {
  const router = useRouter();

  const scrollToQuiz = useCallback(() => {
    document
      .getElementById("practice-quiz")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleQuestionAnswered = useCallback(
    async (isCorrect: boolean, xp: number) => {
      await recordQuestionAnswered(isCorrect, xp);
      router.refresh();
      notifyShellDataChanged();
    },
    [router],
  );

  return (
    <div className="space-y-2">
      <StudyStreakIndicator stats={userStats} onQuickPractice={scrollToQuiz} />
      <PracticeQuizSection
        questions={questions}
        yearGroup={yearGroup}
        onQuestionAnswered={(correct, xp) =>
          void handleQuestionAnswered(correct, xp)
        }
      />
    </div>
  );
}