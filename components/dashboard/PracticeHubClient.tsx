"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { StudyStreakIndicator } from "@/components/dashboard/StudyStreakIndicator";
import { PracticeQuizSection } from "@/components/quiz/PracticeQuizSection";
import { SyllabusNavigator } from "@/components/topic/SyllabusNavigator";
import { SyllabusNavigatorPanel } from "@/components/topic/SyllabusNavigatorPanel";
import {
  getSubtopicById,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import { useStudyTopicSelection } from "@/hooks/useStudyTopicSelection";
import { notifyShellDataChanged, SHELL_DATA_CHANGED } from "@/lib/shellEvents";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats, recordQuestionAnswered } from "@/services/userService";
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
  questions: initialQuestions,
  yearGroup: initialYearGroup,
  userStats,
}: PracticeHubClientProps) {
  const router = useRouter();
  const topic = useStudyTopicSelection();
  const [questions, setQuestions] = useState(initialQuestions);
  const [yearGroup, setYearGroup] = useState(initialYearGroup);

  const reloadQuestionPool = useCallback(async () => {
    const stats = await fetchUserStats();
    const next = await fetchPracticeQuestions({
      yearGroup: stats.yearGroup,
      examBoard: stats.examBoard ?? "AQA",
    });
    setQuestions(next);
    setYearGroup(stats.yearGroup);
  }, []);

  useEffect(() => {
    setQuestions(initialQuestions);
    setYearGroup(initialYearGroup);
  }, [initialQuestions, initialYearGroup]);

  useEffect(() => {
    void reloadQuestionPool();
    const onShell = () => void reloadQuestionPool();
    window.addEventListener(SHELL_DATA_CHANGED, onShell);
    return () => window.removeEventListener(SHELL_DATA_CHANGED, onShell);
  }, [reloadQuestionPool]);

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

  const handlePinForSubject = useCallback(
    (code: SyllabusSubjectCode) => {
      topic.openSyllabusForSubject(code);
    },
    [topic],
  );

  const handlePracticeSubtopic = useCallback(
    (id: string) => {
      topic.practiceSubtopic(id);
      topic.setShowSyllabus(false);
      scrollToQuiz();
    },
    [scrollToQuiz, topic],
  );

  const handlePinSubtopic = useCallback(
    (id: string) => {
      topic.pinAsCurrent(id);
      topic.setShowSyllabus(false);
    },
    [topic],
  );

  const handlePracticeWhole = useCallback(() => {
    topic.practiceWholeMainTopic();
    scrollToQuiz();
  }, [scrollToQuiz, topic]);

  const bannerSubtopic =
    topic.focusSubtopic ?? getSubtopicById(topic.focusSubtopicId);

  if (!topic.hydrated) {
    return (
      <div className="space-y-5">
        <StudyStreakIndicator stats={userStats} onQuickPractice={scrollToQuiz} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <StudyStreakIndicator stats={userStats} onQuickPractice={scrollToQuiz} />

      <PracticeQuizSection
        questions={questions}
        yearGroup={yearGroup}
        practiceScope={topic.practiceScope}
        topicMasteryPercent={bannerSubtopic?.masteryPercent}
        pinnedBySubject={topic.currentBySubject}
        onPinTopic={handlePinForSubject}
        syllabusPanel={
          <SyllabusNavigatorPanel open={topic.showSyllabus}>
            <SyllabusNavigator
              syllabusSubject={topic.syllabusSubject}
              onSubjectChange={topic.setSyllabusSubject}
              mainTopics={topic.mainTopics}
              selectedMainTopicId={topic.selectedMainTopicId}
              onMainTopicSelect={topic.setSelectedMainTopicId}
              activeMainTopic={topic.activeMainTopic}
              pinnedSubtopicId={topic.currentBySubject[topic.syllabusSubject]}
              onPracticeSubtopic={handlePracticeSubtopic}
              onPinSubtopic={handlePinSubtopic}
              onPracticeWholeTopic={handlePracticeWhole}
              subjectPinFlow
              onClose={() => topic.setShowSyllabus(false)}
            />
          </SyllabusNavigatorPanel>
        }
        onQuestionAnswered={(correct, xp) =>
          void handleQuestionAnswered(correct, xp)
        }
      />
    </div>
  );
}