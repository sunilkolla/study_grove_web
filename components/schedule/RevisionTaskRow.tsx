"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckSquare, Play, Square } from "lucide-react";
import { requestFocusPresetForSubject } from "@/lib/focusEvents";
import { requestPracticeForSubtopic } from "@/lib/practiceEvents";
import { TASK_KIND_META } from "@/lib/taskDisplay";
import type { SuggestionDraft } from "@/services/revisionSuggester";
import type { TaskItem } from "@/types";

type RowItem = TaskItem | SuggestionDraft;

type RevisionTaskRowProps = {
  item: RowItem;
  isSuggestion?: boolean;
  onToggle?: () => void;
  onDismiss?: () => void;
  onAcceptSuggestion?: () => void;
};

function isTaskItem(item: RowItem): item is TaskItem {
  return "isCompleted" in item;
}

export function RevisionTaskRow({
  item,
  isSuggestion,
  onToggle,
  onDismiss,
  onAcceptSuggestion,
}: RevisionTaskRowProps) {
  const router = useRouter();
  const meta = TASK_KIND_META[item.kind];
  const Icon = meta.Icon;
  const completed = isTaskItem(item) && item.isCompleted;

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.kind === "focus") {
      requestFocusPresetForSubject(item.subject);
      return;
    }
    if (item.kind === "flashcards") {
      router.push(`/flashcards?subject=${encodeURIComponent(item.subject)}`);
      return;
    }
    if (item.kind === "practice" && item.topicNodeId) {
      requestPracticeForSubtopic(item.topicNodeId);
      router.push("/dashboard#practice-quiz");
      return;
    }
    router.push("/dashboard#practice-quiz");
  };

  return (
    <div
      className={`flex w-full items-start gap-2 rounded-xl border p-3 text-left transition-all ${
        completed
          ? "border-slate-200/60 bg-slate-50/80 opacity-75 dark:border-[#2e4a73]/40 dark:bg-[#273853]/40"
          : isSuggestion
            ? "border-dashed border-emerald-400/60 bg-emerald-50/50 dark:border-emerald-500/40 dark:bg-emerald-950/20"
            : "border-slate-200 bg-white dark:border-[#2e4a73] dark:bg-[#273853]"
      }`}
    >
      {isTaskItem(item) ? (
        <button
          type="button"
          onClick={onToggle}
          className="mt-0.5 shrink-0 text-emerald-600"
          aria-label={completed ? "Mark incomplete" : "Mark complete"}
        >
          {completed ? (
            <CheckSquare className="h-4 w-4 fill-emerald-100 text-emerald-600" />
          ) : (
            <Square className="h-4 w-4 text-slate-300 hover:text-emerald-500" />
          )}
        </button>
      ) : (
        <span className="mt-0.5 text-emerald-500">
          <Icon className="h-4 w-4" />
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span
          className={`block text-sm font-medium leading-snug ${
            completed
              ? "text-slate-400 line-through"
              : "text-slate-900 dark:text-[#f4f7fb]"
          }`}
        >
          {item.title}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-500 dark:text-[#a0b9d9]">
          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-[#10B981] dark:bg-[#1a2437]">
            <Icon className="h-3 w-3" />
            {meta.label}
          </span>
          <span>{item.subject.replace(/_/g, " ")}</span>
          {isTaskItem(item) && (
            <Link
              href={`/schedule?view=day&date=${item.dueDate}`}
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {item.dueDateLabel}
            </Link>
          )}
        </span>
      </span>

      <div className="flex shrink-0 flex-col gap-1">
        {!completed && (
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-1 rounded-lg bg-[#1E293B] px-2 py-1 text-[10px] font-bold text-white hover:bg-slate-800"
          >
            <Play className="h-3 w-3" />
            Start
          </button>
        )}
        {isSuggestion && onAcceptSuggestion && (
          <button
            type="button"
            onClick={onAcceptSuggestion}
            className="rounded-lg border border-emerald-500/50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300"
          >
            Add today
          </button>
        )}
        {isSuggestion && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-[10px] text-slate-400 hover:text-slate-600"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}