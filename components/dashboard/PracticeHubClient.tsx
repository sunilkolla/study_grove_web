"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { PracticeQuizSection } from "@/components/quiz/PracticeQuizSection";
import { notifyShellDataChanged } from "@/lib/shellEvents";
import { recordQuestionAnswered } from "@/services/userService";
import type { PracticeQuestion, YearGroup } from "@/types";

type PracticeHubClientProps = {
  questions: PracticeQuestion[];
  yearGroup: YearGroup;
};

export function PracticeHubClient({
  questions,
  yearGroup,
}: PracticeHubClientProps) {
  const router = useRouter();

  const handleQuestionAnswered = useCallback(
    async (isCorrect: boolean, xp: number) => {
      await recordQuestionAnswered(isCorrect, xp);
      router.refresh();
      notifyShellDataChanged();
    },
    [router],
  );

  return (
    <PracticeQuizSection
      questions={questions}
      yearGroup={yearGroup}
      onQuestionAnswered={(correct, xp) => void handleQuestionAnswered(correct, xp)}
    />
  );
}