"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { notifyShellDataChanged } from "@/lib/shellEvents";
import { recordQuestionAnswered } from "@/services/userService";
import type { PracticeQuestion } from "@/types";
import { QuizCard } from "./QuizCard";

type TopicQuizSlideDeckProps = {
  topicTitle: string;
  questions: PracticeQuestion[];
  exitHref: string;
};

export function TopicQuizSlideDeck({
  topicTitle,
  questions,
  exitHref,
}: TopicQuizSlideDeckProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floatingXp, setFloatingXp] = useState<number | null>(null);

  const activeQuestion = questions[activeIndex] ?? questions[0];
  const questionTotal = questions.length;

  const resetQuestionState = useCallback(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, []);

  const handleQuestionAnswered = useCallback(
    async (isCorrect: boolean, xp: number) => {
      await recordQuestionAnswered(isCorrect, xp);
      router.refresh();
      notifyShellDataChanged();
    },
    [router],
  );

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
      void handleQuestionAnswered(isCorrect, xp);
    },
    [activeQuestion, handleQuestionAnswered, showFeedback],
  );

  const handleNextOrSkip = useCallback(() => {
    resetQuestionState();
    if (questions.length === 0) return;
    setActiveIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions.length, resetQuestionState]);

  const handlePrevious = useCallback(() => {
    resetQuestionState();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, [resetQuestionState]);

  const handleGoToQuestion = useCallback(
    (index: number) => {
      resetQuestionState();
      setActiveIndex(Math.max(0, Math.min(index, questions.length - 1)));
    },
    [questions.length, resetQuestionState],
  );

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

  if (questions.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-500 dark:border-[#2e4a73] dark:bg-[#1a2437]/80 dark:text-[#a0b9d9]">
        No questions in this topic yet.
      </p>
    );
  }

  const atLast = activeIndex >= questions.length - 1;

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={exitHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F5132] hover:underline dark:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Maths topics
        </Link>
        <h1 className="text-lg font-semibold text-slate-800 dark:text-[#f4f7fb]">
          {topicTitle}
        </h1>
        <p className="w-full text-xs text-slate-500 dark:text-[#a0b9d9] sm:w-auto">
          Slide {activeIndex + 1} of {questionTotal} · answer then tap Next
        </p>
      </header>

      {activeQuestion && (
        <QuizCard
          question={activeQuestion}
          questionIndex={activeIndex}
          questionTotal={questionTotal}
          selectedOption={selectedOption}
          showFeedback={showFeedback}
          soundEnabled={soundEnabled}
          floatingXp={floatingXp}
          onToggleSound={() => setSoundEnabled((v) => !v)}
          onSelectOption={handleSelectOption}
          onSkip={handleNextOrSkip}
          onNext={handleNextOrSkip}
          onPrevious={handlePrevious}
          onGoToQuestion={handleGoToQuestion}
        />
      )}

      {atLast && showFeedback && (
        <p className="text-center text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          You reached the last question in this topic.{" "}
          <Link href={exitHref} className="underline">
            Back to topics
          </Link>
        </p>
      )}
    </div>
  );
}