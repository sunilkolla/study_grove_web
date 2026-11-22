import Link from "next/link";
import { Play } from "lucide-react";
import type { QuizTopicCardModel } from "@/lib/quiz/quizTopicCards";

type QuizTopicCardGridProps = {
  cards: QuizTopicCardModel[];
  showSubject?: boolean;
};

export function QuizTopicCardGrid({
  cards,
  showSubject = false,
}: QuizTopicCardGridProps) {
  if (cards.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-500 dark:border-[#2e4a73] dark:bg-[#1a2437]/80 dark:text-[#a0b9d9]">
        No topic banks for this filter yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-4">
      {cards.map((topic) => (
        <li
          key={`${topic.subjectLabel ?? ""}-${topic.id}`}
          className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]"
        >
          {showSubject && topic.subjectLabel && (
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#10B981]">
              {topic.subjectLabel}
            </p>
          )}
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {topic.title}
          </h2>
          <p className="mt-1 line-clamp-3 flex-1 text-sm text-slate-600 dark:text-[#a0b9d9]">
            {topic.description}
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-[#8fa8c9]">
            {topic.questionCount} practice questions
          </p>
          <Link
            href={topic.practiceHref}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.98]"
          >
            <Play className="h-4 w-4" aria-hidden fill="currentColor" />
            Practice all
          </Link>
        </li>
      ))}
    </ul>
  );
}