"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TopicQuizSlideDeck } from "@/components/quiz/TopicQuizSlideDeck";
import { resolveMainTopicPractice } from "@/lib/quiz/quizTopicCards";
import { subjectFilterLabel } from "@/lib/quiz/subjectFilters";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats } from "@/services/userService";
import type { SubjectCode } from "@/types";

type SyllabusTopicQuizClientProps = {
  subject: SubjectCode;
  mainTopicId: string;
};

export function SyllabusTopicQuizClient({
  subject,
  mainTopicId,
}: SyllabusTopicQuizClientProps) {
  const searchParams = useSearchParams();
  const subjectQuery = searchParams.get("subject");
  const exitHref = subjectQuery
    ? `/quizzes?subject=${subjectQuery}`
    : `/quizzes?subject=${subject}`;

  const [loading, setLoading] = useState(true);
  const [pool, setPool] = useState<Awaited<ReturnType<typeof fetchPracticeQuestions>>>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const stats = await fetchUserStats();
    const next = await fetchPracticeQuestions({
      yearGroup: stats.yearGroup,
      examBoard: stats.examBoard ?? "AQA",
    });
    setPool(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const resolved = useMemo(
    () => resolveMainTopicPractice(pool, subject, mainTopicId),
    [pool, subject, mainTopicId],
  );

  if (loading) {
    return <p className="text-sm text-slate-500">Loading questions…</p>;
  }

  if (!resolved) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-500 dark:border-[#2e4a73] dark:bg-[#1a2437]/80 dark:text-[#a0b9d9]">
        No questions found for {subjectFilterLabel(subject)} — this topic.
      </p>
    );
  }

  return (
    <TopicQuizSlideDeck
      topicTitle={resolved.title}
      questions={resolved.questions}
      exitHref={exitHref}
    />
  );
}