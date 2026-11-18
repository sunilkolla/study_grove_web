"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SHELL_DATA_CHANGED } from "@/lib/shellEvents";
import { fetchPracticeQuestions } from "@/services/questionService";
import { fetchUserStats } from "@/services/userService";
import type { ExamBoard, PracticeQuestion, YearGroup } from "@/types";
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
};

export function QuizzesPageClient({
  questions: initialQuestions,
  yearGroup: initialYearGroup,
  examBoard: initialExamBoard,
}: QuizzesPageClientProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [yearGroup, setYearGroup] = useState(initialYearGroup);
  const [examBoard, setExamBoard] = useState(initialExamBoard);
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("ALL");

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

  const filtered = useMemo(() => {
    if (subjectFilter === "ALL") return questions;
    return questions.filter((q) => q.subject === subjectFilter);
  }, [questions, subjectFilter]);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-[#f4f7fb]">
          Question Bank
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-[#a0b9d9]">
          <span className="font-semibold text-slate-700 dark:text-[#cdd9ea]">
            {filtered.length}
          </span>
          {subjectFilter === "ALL"
            ? ` of ${questions.length} questions`
            : ` ${subjectFilterLabel(subjectFilter)} questions`}{" "}
          · {yearGroup} · {examBoard}. Play from the{" "}
          <Link
            href="/dashboard#practice-quiz"
            className="font-medium text-[#0F5132] underline-offset-2 hover:underline dark:text-[#10B981]"
          >
            Practice Hub
          </Link>
          .
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

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-500 dark:border-[#2e4a73] dark:bg-[#1a2437]/80 dark:text-[#a0b9d9]">
          No questions in this filter. Try another subject or change year/board in
          profile settings.
        </p>
      ) : (
        <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-[#2e4a73] dark:border-[#2e4a73] dark:bg-[#1a2437]">
          {filtered.map((q) => (
            <li key={q.id} className="p-4 text-sm">
              <p className="text-xs font-semibold text-[#10B981]">
                {q.subjectName} · {q.yearGroup} · {q.examBoard}
              </p>
              <p className="mt-1 font-medium text-slate-800 dark:text-[#f4f7fb]">
                {q.questionText}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-[#a0b9d9]">
                {q.topicName} · {q.topicCode} · +{q.xpReward} XP
              </p>
              <Link
                href="/dashboard#practice-quiz"
                className="mt-2 inline-block text-xs font-bold text-[#0F5132] hover:underline dark:text-emerald-400"
              >
                Practice on hub →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}