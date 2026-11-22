"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QuizTopicCardGrid } from "@/components/quiz/QuizTopicCardGrid";
import { SHELL_DATA_CHANGED } from "@/lib/shellEvents";
import {
  buildTopicCardsForAll,
  buildTopicCardsForSubject,
} from "@/lib/quiz/quizTopicCards";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats } from "@/services/userService";
import type { ExamBoard, PracticeQuestion, SubjectCode, YearGroup } from "@/types";
import {
  QUIZ_SUBJECT_FILTERS,
  subjectFilterLabel,
  type SubjectFilter,
} from "@/lib/quiz/subjectFilters";
import { subjectQuestionCount } from "@/lib/quiz/questionPool";

type QuizzesPageClientProps = {
  questions: PracticeQuestion[];
  yearGroup: YearGroup;
  examBoard: ExamBoard;
  initialSubject?: SubjectFilter;
};

export function QuizzesPageClient({
  questions: initialQuestions,
  yearGroup: initialYearGroup,
  examBoard: initialExamBoard,
  initialSubject = "ALL",
}: QuizzesPageClientProps) {
  const searchParams = useSearchParams();
  const subjectFromUrl = searchParams.get("subject");
  const parsedInitial: SubjectFilter =
    subjectFromUrl && QUIZ_SUBJECT_FILTERS.includes(subjectFromUrl as SubjectFilter)
      ? (subjectFromUrl as SubjectFilter)
      : initialSubject;

  const [questions, setQuestions] = useState(initialQuestions);
  const [yearGroup, setYearGroup] = useState(initialYearGroup);
  const [examBoard, setExamBoard] = useState(initialExamBoard);
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>(parsedInitial);

  const reloadPool = useCallback(async () => {
    const stats = await fetchUserStats();
    const next = await fetchPracticeQuestions({
      yearGroup: stats.yearGroup,
      examBoard: stats.examBoard ?? "AQA",
    });
    setQuestions(next);
    setYearGroup(stats.yearGroup);
    setExamBoard(stats.examBoard ?? "AQA");
  }, []);

  useEffect(() => {
    setQuestions(initialQuestions);
    setYearGroup(initialYearGroup);
    setExamBoard(initialExamBoard);
  }, [initialQuestions, initialYearGroup, initialExamBoard]);

  useEffect(() => {
    setSubjectFilter(parsedInitial);
  }, [parsedInitial]);

  useEffect(() => {
    void reloadPool();
    const onShell = () => void reloadPool();
    window.addEventListener(SHELL_DATA_CHANGED, onShell);
    return () => window.removeEventListener(SHELL_DATA_CHANGED, onShell);
  }, [reloadPool]);

  const visibleSubjectFilters = useMemo(() => {
    return QUIZ_SUBJECT_FILTERS.filter((f) => {
      if (f === "ALL") return true;
      if (f === "COMPUTER_SCIENCE") {
        return subjectQuestionCount(questions, f) > 0;
      }
      return true;
    });
  }, [questions]);

  const filteredCount = useMemo(() => {
    if (subjectFilter === "ALL") return questions.length;
    return subjectQuestionCount(questions, subjectFilter);
  }, [questions, subjectFilter]);

  const topicCards = useMemo(() => {
    if (subjectFilter === "ALL") {
      return buildTopicCardsForAll(questions, yearGroup);
    }
    return buildTopicCardsForSubject(
      subjectFilter as SubjectCode,
      questions,
      yearGroup,
    );
  }, [questions, subjectFilter, yearGroup]);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-[#f4f7fb]">
          Question Bank
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-[#a0b9d9]">
          <span className="font-semibold text-slate-700 dark:text-[#cdd9ea]">
            {filteredCount}
          </span>
          {subjectFilter === "ALL"
            ? ` of ${questions.length} questions`
            : ` ${subjectFilterLabel(subjectFilter)} questions`}{" "}
          · {yearGroup} · {examBoard}. Pick a topic to practise.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {visibleSubjectFilters.map((sub) => {
          const count =
            sub === "ALL" ? questions.length : subjectQuestionCount(questions, sub);
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
              onClick={() => setSubjectFilter(sub)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-semibold transition-all active:scale-95 ${
                disabled
                  ? "cursor-not-allowed opacity-40"
                  : subjectFilter === sub
                    ? "bg-[#10B981] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#1a2437] dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
              }`}
            >
              {subjectFilterLabel(sub)}
              {` (${count})`}
            </button>
          );
        })}
      </div>

      <QuizTopicCardGrid
        cards={topicCards}
        showSubject={subjectFilter === "ALL"}
      />
    </div>
  );
}