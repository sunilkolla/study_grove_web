"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  XCircle,
} from "lucide-react";
import { SubjectIcon } from "@/components/common/SubjectIcon";
import type { PracticeQuestion } from "@/types";
import { QuizDiagram } from "./QuizDiagram";

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

export type QuizCardProps = {
  question: PracticeQuestion;
  questionIndex: number;
  questionTotal: number;
  selectedOption: number | null;
  showFeedback: boolean;
  soundEnabled: boolean;
  floatingXp: number | null;
  onToggleSound: () => void;
  onSelectOption: (index: number) => void;
  onSkip: () => void;
  onNext: () => void;
  onBrowseAll?: () => void;
};

export function QuizCard({
  question,
  questionIndex,
  questionTotal,
  selectedOption,
  showFeedback,
  soundEnabled,
  floatingXp,
  onToggleSound,
  onSelectOption,
  onSkip,
  onNext,
  onBrowseAll,
}: QuizCardProps) {
  const showDiagram = ["q-y10-1", "q-y9-4", "q-y10-4"].includes(question.id);

  return (
    <article className="relative space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-[#2e4a73] dark:bg-[#273853] sm:p-6">
      {floatingXp !== null && (
        <div
          className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 animate-bounce"
          aria-live="polite"
        >
          <span className="flex items-center gap-1 rounded-full bg-[#10B981] px-3.5 py-1.5 text-sm font-extrabold text-white shadow-lg ring-2 ring-emerald-300">
            <Sparkles className="h-4 w-4 text-amber-300" />
            +{floatingXp} XP!
          </span>
        </div>
      )}

      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 dark:border-[#2e4a73] sm:flex-row sm:items-center">
        <p className="text-xs font-medium text-slate-500 dark:text-[#a0b9d9]">
          {questionIndex + 1} of {questionTotal}
        </p>
        <button
          type="button"
          onClick={onToggleSound}
          className="self-end rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 dark:text-[#a0b9d9] dark:hover:bg-[#1a2437]"
          aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 text-[#10B981]" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </button>
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <SubjectIcon subject={question.subject} size="sm" />
          <span className="font-bold text-slate-800 dark:text-[#f4f7fb]">
            {question.subjectName}
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-normal text-slate-500 dark:text-[#a0b9d9]">
            {question.examBoard}
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-normal text-slate-500 dark:text-[#a0b9d9]">
            {question.topicName}
          </span>
        </div>

        {showDiagram && (
          <div className="mb-4">
            <QuizDiagram questionId={question.id} />
          </div>
        )}

        <h2 className="text-base font-bold leading-snug text-slate-900 dark:text-white sm:text-lg">
          {question.questionText}
        </h2>
      </div>

      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="group"
        aria-label="Answer options"
      >
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.correctAnswerIndex;

          let cardStyles =
            "border-2 border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-[#10B981] dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#f4f7fb] dark:hover:border-emerald-400";
          let badgeStyles =
            "bg-slate-100 font-bold text-slate-700 dark:bg-[#273853] dark:text-[#a0b9d9]";

          if (showFeedback) {
            if (isCorrect) {
              cardStyles =
                "border-2 border-emerald-500 bg-emerald-50 font-bold text-emerald-950 ring-2 ring-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-100";
              badgeStyles = "bg-emerald-500 font-bold text-white";
            } else if (isSelected) {
              cardStyles =
                "border-2 border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950/60 dark:text-rose-100";
              badgeStyles = "bg-rose-500 font-bold text-white";
            } else {
              cardStyles =
                "border border-slate-200 bg-slate-50 text-slate-400 opacity-60 dark:border-[#2e4a73]/30 dark:bg-[#1a2437]/40";
              badgeStyles = "bg-slate-200 text-slate-400 dark:bg-slate-800";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectOption(idx)}
              disabled={showFeedback}
              className={`flex min-h-[58px] w-full items-center justify-between gap-3 rounded-xl p-3.5 text-left text-xs font-medium transition-all duration-150 active:scale-[0.98] sm:p-4 sm:text-sm ${cardStyles}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs ${badgeStyles}`}
                >
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="break-words leading-snug">{option}</span>
              </span>
              {showFeedback && isCorrect && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              )}
              {showFeedback && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5 shrink-0 text-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="space-y-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs dark:border-emerald-800/60 dark:bg-emerald-950/30">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>
              {selectedOption === question.correctAnswerIndex
                ? "Why this is right:"
                : "Explanation:"}
            </span>
          </div>
          <p className="leading-relaxed text-emerald-950 dark:text-emerald-100">
            {question.explanation}
          </p>
          {question.examTip && (
            <p className="pt-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
              💡 Quick tip:{" "}
              <span className="font-normal">{question.examTip}</span>
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col items-stretch justify-between gap-2 pt-2 text-xs sm:flex-row sm:items-center">
        <span className="hidden text-[11px] text-slate-400 sm:inline dark:text-[#a0b9d9]">
          Tip: Press 1–4 or A–D on your keyboard
        </span>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          {showFeedback ? (
            <button
              type="button"
              onClick={onNext}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-5 py-3 text-xs font-bold text-white shadow-md transition-transform active:scale-95 sm:w-auto sm:text-sm"
            >
              Next Question
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSkip}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-[#a0b9d9] dark:hover:text-white"
            >
              Skip Question →
            </button>
          )}
          {onBrowseAll && (
            <button
              type="button"
              onClick={onBrowseAll}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#cdd9ea]"
            >
              Browse All
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}