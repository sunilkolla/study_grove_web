"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { PracticeQuestion, YearGroup } from "@/types";
import type { TopicPracticeScope } from "@/lib/topic/topicPractice";
import { SUBTOPICS_BY_ID } from "@/data/gcseSyllabus";
import {
  QUIZ_SUBJECT_FILTERS,
  subjectFilterLabel,
  type SubjectFilter,
} from "@/lib/quiz/subjectFilters";
import {
  questionsForSubjectFilter,
  subjectQuestionCount,
} from "@/lib/quiz/questionPool";
import { QuizCard } from "./QuizCard";

type PracticeQuizSectionProps = {
  questions: PracticeQuestion[];
  yearGroup: YearGroup;
  practiceScope: TopicPracticeScope;
  topicMasteryPercent?: number;
  onQuestionAnswered: (isCorrect: boolean, xp: number) => void;
};

export function PracticeQuizSection({
  questions,
  yearGroup,
  practiceScope,
  topicMasteryPercent,
  onQuestionAnswered,
}: PracticeQuizSectionProps) {
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floatingXp, setFloatingXp] = useState<number | null>(null);

  const filteredQuestions = useMemo(
    () =>
      questionsForSubjectFilter(
        questions,
        practiceScope,
        subjectFilter,
        SUBTOPICS_BY_ID,
      ),
    [questions, practiceScope, subjectFilter],
  );

  const visibleSubjectFilters = useMemo(() => {
    return QUIZ_SUBJECT_FILTERS.filter((f) => {
      if (f === "ALL") return true;
      if (f === "COMPUTER_SCIENCE") {
        return subjectQuestionCount(questions, f) > 0;
      }
      return true;
    });
  }, [questions]);

  const activeQuestion = filteredQuestions[activeIndex] ?? filteredQuestions[0];

  const resetQuestionState = useCallback(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, []);

  const handleSelectOption = useCallback(
    (idx: number) => {
      if (showFeedback || !activeQuestion) return;
      setSelectedOption(idx);
      setShowFeedback(true);
      const isCorrect = idx === activeQuestion.correctAnswerIndex;
      const xp = isCorrect ? activeQuestion.xpReward : 5;
      if (isCorrect) {
        setFloatingXp(xp);
        window.setTimeout(() => setFloatingXp(null), 1400);
      }
      onQuestionAnswered(isCorrect, xp);
    },
    [activeQuestion, onQuestionAnswered, showFeedback],
  );

  const handleNextOrSkip = useCallback(() => {
    resetQuestionState();
    if (filteredQuestions.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filteredQuestions.length);
  }, [filteredQuestions.length, resetQuestionState]);

  const handlePrevious = useCallback(() => {
    resetQuestionState();
    if (filteredQuestions.length === 0) return;
    setActiveIndex((prev) =>
      prev === 0 ? filteredQuestions.length - 1 : prev - 1,
    );
  }, [filteredQuestions.length, resetQuestionState]);

  const handleGoToQuestion = useCallback(
    (index: number) => {
      resetQuestionState();
      if (filteredQuestions.length === 0) return;
      setActiveIndex(
        Math.max(0, Math.min(index, filteredQuestions.length - 1)),
      );
    },
    [filteredQuestions.length, resetQuestionState],
  );

  const handleSubjectChange = (filter: SubjectFilter) => {
    setSubjectFilter(filter);
    setActiveIndex(0);
    resetQuestionState();
  };

  useEffect(() => {
    setSubjectFilter("ALL");
    setActiveIndex(0);
    resetQuestionState();
  }, [yearGroup, practiceScope, resetQuestionState]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (!activeQuestion) return;

      if (!showFeedback) {
        if (e.key === "1" || e.key.toLowerCase() === "a") handleSelectOption(0);
        if (e.key === "2" || e.key.toLowerCase() === "b") handleSelectOption(1);
        if (e.key === "3" || e.key.toLowerCase() === "c") handleSelectOption(2);
        if (e.key === "4" || e.key.toLowerCase() === "d") handleSelectOption(3);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNextOrSkip();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeQuestion, handleNextOrSkip, handleSelectOption, showFeedback]);

  const scopeHint =
    practiceScope.mode === "subtopic"
      ? `Practising ${practiceScope.subtopic.code} ${practiceScope.subtopic.name}`
      : practiceScope.mode === "mainTopic"
        ? "Practising whole main topic"
        : null;

  return (
    <section
      id="practice-quiz"
      className="scroll-mt-4 space-y-4"
      aria-labelledby="practice-center-heading"
    >
      {scopeHint && (
        <p className="text-xs font-semibold text-[#0F5132] dark:text-emerald-400">
          {scopeHint}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {visibleSubjectFilters.map((sub) => {
          const count =
            sub === "ALL"
              ? questionsForSubjectFilter(
                  questions,
                  practiceScope,
                  "ALL",
                  SUBTOPICS_BY_ID,
                ).length
              : subjectQuestionCount(questions, sub);
          const disabled = sub !== "ALL" && count === 0;
          return (
            <button
              key={sub}
              type="button"
              disabled={disabled}
              title={
                disabled
                  ? "No questions for your year and exam board yet"
                  : undefined
              }
              onClick={() => handleSubjectChange(sub)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-semibold transition-all active:scale-95 ${
                disabled
                  ? "cursor-not-allowed opacity-40"
                  : subjectFilter === sub
                    ? "bg-[#10B981] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#1a2437] dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
              }`}
            >
              {subjectFilterLabel(sub)}
              {sub !== "ALL" ? ` (${count})` : ` (${count})`}
            </button>
          );
        })}
      </div>

      {activeQuestion && filteredQuestions.length > 0 ? (
        <QuizCard
          question={activeQuestion}
          questionIndex={activeIndex}
          questionTotal={filteredQuestions.length}
          selectedOption={selectedOption}
          showFeedback={showFeedback}
          soundEnabled={soundEnabled}
          floatingXp={floatingXp}
          topicMasteryPercent={topicMasteryPercent}
          onToggleSound={() => setSoundEnabled((v) => !v)}
          onSelectOption={handleSelectOption}
          onSkip={handleNextOrSkip}
          onNext={handleNextOrSkip}
          onPrevious={handlePrevious}
          onGoToQuestion={handleGoToQuestion}
        />
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-500 dark:border-[#2e4a73] dark:bg-[#1a2437]/80 dark:text-[#a0b9d9]">
          {subjectFilter === "ALL"
            ? "No questions for this topic yet. Pin another subtopic or browse by subject."
            : `No ${subjectFilterLabel(subjectFilter)} questions for your year and exam board. Try another subject or open the question bank.`}
        </p>
      )}

      <p className="text-right text-xs">
        <Link
          href="/quizzes"
          className="font-semibold text-[#0F5132] hover:underline dark:text-[#10B981]"
        >
          Open full question bank →
        </Link>
      </p>
    </section>
  );
}