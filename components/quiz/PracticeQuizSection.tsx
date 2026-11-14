"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { PracticeQuestion, YearGroup } from "@/types";
import { yearGroupProfiles } from "@/data/yearGroupProfiles";
import { yearGroupTrackLabel } from "@/lib/yearGroups";
import {
  QUIZ_SUBJECT_FILTERS,
  subjectFilterLabel,
  type SubjectFilter,
} from "@/lib/quiz/subjectFilters";
import { QuizCard } from "./QuizCard";

type PracticeQuizSectionProps = {
  questions: PracticeQuestion[];
  yearGroup: YearGroup;
  onQuestionAnswered: (isCorrect: boolean, xp: number) => void;
};

export function PracticeQuizSection({
  questions,
  yearGroup,
  onQuestionAnswered,
}: PracticeQuizSectionProps) {
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floatingXp, setFloatingXp] = useState<number | null>(null);

  const filteredQuestions = useMemo(() => {
    if (subjectFilter === "ALL") return questions;
    return questions.filter((q) => q.subject === subjectFilter);
  }, [questions, subjectFilter]);

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

  const handleSubjectChange = (filter: SubjectFilter) => {
    setSubjectFilter(filter);
    setActiveIndex(0);
    resetQuestionState();
  };

  useEffect(() => {
    setActiveIndex(0);
    resetQuestionState();
  }, [yearGroup, resetQuestionState]);

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

  const profile = yearGroupProfiles[yearGroup];

  return (
    <section
      id="practice-quiz"
      className="scroll-mt-4 space-y-4"
      aria-labelledby="practice-center-heading"
    >
      <div className="relative overflow-hidden rounded-2xl border border-emerald-900/40 bg-gradient-to-br from-[#1e3a34] via-[#244b43] to-[#142823] p-4 text-white shadow-sm sm:p-5 dark:from-[#132722] dark:via-[#1a3831] dark:to-[#0f1f1b]">
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-emerald-500/10 blur-2xl" />
        <div className="relative z-10 space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-emerald-300">
            <span>{yearGroupTrackLabel(yearGroup)}</span>
            <span className="text-emerald-400/40">·</span>
            <span className="font-medium text-emerald-200/70">
              {profile?.badgeLabel ?? "GCSE Practice"}
            </span>
          </div>
          <h1
            id="practice-center-heading"
            className="text-lg font-bold tracking-tight sm:text-xl"
          >
            {profile?.title ?? `${yearGroup} Practice`}
          </h1>
          <p className="text-xs text-emerald-100/80">
            Tap an answer to test your recall. Every question earns XP and grows
            your Grove.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {QUIZ_SUBJECT_FILTERS.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => handleSubjectChange(sub)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-semibold transition-all active:scale-95 ${
              subjectFilter === sub
                ? "bg-[#10B981] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#1a2437] dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
            }`}
          >
            {subjectFilterLabel(sub)}
          </button>
        ))}
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
          onToggleSound={() => setSoundEnabled((v) => !v)}
          onSelectOption={handleSelectOption}
          onSkip={handleNextOrSkip}
          onNext={handleNextOrSkip}
        />
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-500 dark:border-[#2e4a73] dark:bg-[#1a2437]/80 dark:text-[#a0b9d9]">
          No questions for this filter. Try another subject or year group.
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